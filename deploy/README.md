# Deployment runbook

One Docker image (React build + Express API) is built once per commit for both
arm64 and amd64, pushed to Docker Hub, and deployed by Docker Compose to an
**Oracle Cloud (OCI) Compute instance** per environment, next to official
`postgres:16` and `redis:7-alpine` containers with named volumes.

```
 push develop ──► Test ─► Build sha-abc1234 ─► Docker Hub   (Development deploy disabled)
 push uat ─────► Test ─► Build sha-bcd2345 ─► Docker Hub ─► UAT VM
 push main ─────► Test ─► Build sha-def5678 ─► Docker Hub ─► [approval, if set] ─► Production VM
 A deploy runs only if Test and Build of that same push succeeded.
 Each VM:  Caddy (HTTPS) ─► app:5000 ─► postgres (volume pgdata) + redis (volume redisdata)
```

| File | Purpose |
|---|---|
| `Dockerfile` | Multi-stage build → one runtime image, non-root, with a health check |
| `docker-compose.yml` | app + one-shot `migrate` + postgres + redis, identical in every environment |
| `docker-compose.local.yml` | Local override: build from source, expose DB ports on localhost |
| `deploy/.env.example` | Template for each environment's config (stored as a GitHub secret) |
| `deploy/deploy.sh` | Runs on the server: pull → backup → migrate → health-gated start → auto-rollback |
| `.github/workflows/ci-cd.yml` | Test → Build/Push → Deploy dev / UAT → approval → Production |
| `.github/workflows/deploy.yml` | Reusable deploy job (SSH + `deploy.sh`) |
| `.github/workflows/rollback.yml` | Manual "deploy this tag to that environment" |

---

## 1. Run it locally with Docker

```bash
cp deploy/.env.example .env          # fill in; set SMTP_* or sign-up emails will fail
docker compose -f docker-compose.yml -f docker-compose.local.yml build
docker compose -f docker-compose.yml -f docker-compose.local.yml run --rm migrate
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d
# open http://localhost:5000  ·  health: http://localhost:5000/api/v1/health
```

Normal development without Docker still works (`npm run dev`); the CRA `proxy`
setting forwards `/api` from :3000 to the API on :5000.

## 2. Docker Hub (once)

1. Create a repository `kind-food-app` (private recommended).
2. Account settings → Personal access tokens:
   - `kindfood-ci` with **Read & Write**: used by GitHub Actions to push.
   - `kindfood-servers` with **Read-only**: used by the servers to pull.
3. Tags: `sha-<7 chars>` per commit (immutable by convention; never re-push a sha tag)
   plus moving `develop` / `main` pointers. Deploys always use the sha tag.

## 3. Servers on Oracle Cloud (OCI), once per environment

### 3.1 Layout

| OCI resource | Development + UAT | Production |
|---|---|---|
| Compartment | `kindfood-nonprod` | `kindfood-prod` (separate IAM access) |
| VCN + public subnet | `kindfood-nonprod-vcn` | `kindfood-prod-vcn` |
| Compute instance | `VM.Standard.A1.Flex`, 2 OCPU / 12 GB | `VM.Standard.A1.Flex`, 2 OCPU / 12 GB |
| Image | Canonical Ubuntu 24.04 (aarch64) | Canonical Ubuntu 24.04 (aarch64) |
| Boot volume | 50 GB (Docker volumes live here) | 100 GB, with a backup policy |
| Public IP | **Reserved** public IP | **Reserved** public IP |

- The two A1 instances above use exactly the **Always Free** Ampere allowance (4 OCPU / 24 GB in total).
  The image is built for both arm64 and amd64, so a paid AMD shape (`VM.Standard.E5.Flex`) also works
  without any change. Avoid `VM.Standard.E2.1.Micro` (1 GB RAM): too small for app + Postgres + Redis.
- If creating an A1 instance fails with "Out of host capacity", try another availability domain or retry later.
- On a Free Tier account, Oracle may reclaim Always Free instances that sit idle for 7 days.
  Upgrading the account to Pay As You Go stops this, and the Always Free resources stay free.
- Use a **reserved** public IP (Networking → Reserved public IPs) so DNS keeps working if the instance is recreated.

### 3.2 Open the network (OCI side)

VCN → Security Lists (or a Network Security Group on the instance) → add **ingress** rules:

| Source | Protocol / port | Why |
|---|---|---|
| `0.0.0.0/0` | TCP 80 | HTTP (Let's Encrypt challenge + redirect) |
| `0.0.0.0/0` | TCP 443 | HTTPS |
| your office IP/32 (and GitHub Actions, see note) | TCP 22 | SSH / deploys |

Never open 5000, 5432 or 6379. The app binds to `127.0.0.1`, and Postgres and Redis are not published.

> GitHub-hosted runners use many changing IP addresses, so deploys need port 22 reachable from the internet.
> That is acceptable with key-only SSH (the default on OCI) and the dedicated `deploy` user.
> To close port 22 later, use a self-hosted runner inside the VCN, or the OCI Bastion service.

### 3.3 Prepare the instance

Connect with the key you chose when creating the instance: `ssh ubuntu@<reserved-ip>`.

```bash
sudo apt update && sudo apt -y full-upgrade
curl -fsSL https://get.docker.com | sh                 # Docker Engine + compose plugin (arm64 is supported)
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG docker deploy                         # docker group = root-equivalent; dedicated VM only
sudo mkdir -p /opt/kindfood && sudo chown deploy:deploy /opt/kindfood

# OCI Ubuntu images ship their own iptables rules that block everything except SSH.
# Do NOT enable ufw on OCI (it conflicts with these rules); open 80/443 in iptables instead:
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80  -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

Each environment's traffic therefore passes two firewalls: the OCI security list and the instance's iptables.
Postgres and Redis are not published at all.

**Deploy SSH key** (on your machine):

```bash
ssh-keygen -t ed25519 -f kindfood_deploy -N "" -C "github-actions-deploy"
# append kindfood_deploy.pub to /home/deploy/.ssh/authorized_keys on the VM
ssh-keyscan -H <reserved-public-ip>      # output -> SSH_KNOWN_HOSTS secret
```

**HTTPS with Caddy** (automatic Let's Encrypt certificates):

```bash
sudo apt install -y caddy
# /etc/caddy/Caddyfile
#   dev.kindfood.example.com  { reverse_proxy 127.0.0.1:5001 }
#   uat.kindfood.example.com  { reverse_proxy 127.0.0.1:5002 }
#   kindfood.example.com      { reverse_proxy 127.0.0.1:5000 }
sudo systemctl reload caddy
```

**Sharing a VM between Dev and UAT:** give each environment its own `DEPLOY_PATH`
(`/opt/kindfood-dev`, `/opt/kindfood-uat`), its own `APP_PORT`, and its own `APP_ENV`.
`APP_ENV` is part of the Compose project name, so containers, networks and
volumes stay separate.

## 4. GitHub configuration (once)

1. Create the `develop` and `uat` branches. Protect `develop`, `uat` and `main`: require a PR and the
   **Test & validate** check.
2. **Settings → Secrets and variables → Actions** (repository level):
   - Variables: `DOCKERHUB_USERNAME`, `DOCKERHUB_IMAGE` (e.g. `myuser/kind-food-app`)
   - Secrets: `DOCKERHUB_TOKEN` (read/write), `DOCKERHUB_PULL_TOKEN` (read-only)
3. **Settings → Environments**: create `development`, `uat`, `production`.

   | | development | uat | production |
   |---|---|---|---|
   | Deployment branches | `develop` | `uat` | `main` |
   | Required reviewers | – | – | **yes** (enable "prevent self-review") |
   | Var `SSH_HOST`, `SSH_USER` (`deploy`) | dev VM | uat VM | prod VM |
   | Var `DEPLOY_PATH` (optional) | `/opt/kindfood-dev` | `/opt/kindfood-uat` | `/opt/kindfood` |
   | Var `PUBLIC_URL` | https://dev… | https://uat… | https://… |
   | Secret `SSH_PRIVATE_KEY` | contents of `kindfood_deploy` | ← (or a separate key per VM) | separate key recommended |
   | Secret `SSH_KNOWN_HOSTS` | `ssh-keyscan` output | ← | ← |
   | Secret `APP_ENV_FILE` | full filled-in `.env` (APP_ENV=development) | APP_ENV=uat | APP_ENV=production |

   Use **different** database and Redis passwords for each environment. Leave
   `DOCKERHUB_IMAGE`/`IMAGE_TAG` out of `APP_ENV_FILE`; CI adds them.

> Required reviewers on environments are free for public repositories. For private
> repositories they depend on your GitHub plan; check before relying on them.

## 5. Day-to-day flow

1. Feature branch → PR to `develop` → CI tests + test image build.
2. Merge → image `sha-xxxxxxx` pushed → **Development** deployed automatically.
3. PR `develop` → `uat` → merge → test + build → **UAT** deployed automatically.
4. After QA signs off, PR `uat` → `main` → merge → test + build → **Production**
   deployed (after reviewer approval, if the environment requires it).

## 6. Rollback

- **Automatic:** if the new container fails its health check within 3 minutes,
  `deploy.sh` restarts the previous tag and the workflow fails (red).
- **Manual:** Actions → **Rollback / redeploy** → choose environment + tag.
  Previous tags are in the GitHub *Deployments* history and in `.deployed-tag` on the server.
- **Database:** rolling back the app does **not** undo migrations. So write migrations
  that the previous release can still run against (expand → migrate → contract: add
  columns/tables first, remove old ones in a later release). Never edit an applied
  migration. Restoring a backup is the last resort, because it discards newer data:

  ```bash
  cd /opt/kindfood
  docker compose stop app
  docker compose exec -T postgres sh -c 'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists' < backups/pre-sha-xxxxxxx-....dump
  docker compose start app
  ```

## 7. Data persistence and backups

- Data lives in the named volumes `kindfood-<env>_pgdata` and `kindfood-<env>_redisdata`.
  They survive restarts, `docker compose down`, container recreation, image updates and reboots.
- They are destroyed only by `docker compose down -v`, `docker volume rm/prune`, or losing
  the VM disk. **Never run `down -v` on a server.**
- `deploy.sh` takes a `pg_dump` before every deploy (keeps 14). For Production also add a
  nightly backup and copy it **off the VM** to **OCI Object Storage** (Always Free includes 20 GB):

  1. Object Storage → create a private bucket `kindfood-prod-backups` in the `kindfood-prod` compartment.
     Add a lifecycle rule to delete objects after 30 days.
  2. On the instance, as `deploy`, install the OCI CLI (`bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"`)
     and authenticate it. Simplest: `oci setup config` with an API key for a user that can only
     write to that bucket. Cleaner: an instance principal (dynamic group + policy), then use `--auth instance_principal` below.
  3. `crontab -e` as `deploy`:

  ```cron
  0 2 * * * cd /opt/kindfood && f=backups/daily-$(date +\%F).dump && docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > $f && ~/bin/oci os object put -bn kindfood-prod-backups --file $f --force && find backups -name 'daily-*' -mtime +7 -delete
  ```

- Also attach a **boot volume backup policy** to the Production instance (Block Storage →
  Backup policies, e.g. Bronze). It snapshots the whole disk, including the Docker volumes. Use it as a
  second safety net, not instead of `pg_dump` (a disk snapshot of a running database is only crash-consistent).
- Later, Production can move to **OCI Database with PostgreSQL** (managed, paid) by pointing the
  connection settings at it. The image does not change.

## 8. Logs and health

- `docker compose ps` shows health status; `docker compose logs -f app` follows the logs.
  Logs rotate at 10 MB × 5 files per container.
- `GET /api/v1/health` returns 200 only when the API can reach Postgres. It is used by the
  Docker health check, `deploy.sh` and the post-deploy smoke test.

## Gotchas

- `POSTGRES_PASSWORD` only takes effect when the volume is first created. To rotate it, run
  `ALTER USER kindfood WITH PASSWORD '...'` in the database **and then** update `APP_ENV_FILE`.
- The image runs with `NODE_ENV=production`, so SMTP must be configured in every environment.
  Use a sandbox inbox for Dev/UAT.
- Keep DB passwords alphanumeric (they are embedded in a connection URL).
