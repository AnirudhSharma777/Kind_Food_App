#!/usr/bin/env bash
# Runs ON the target server, from the directory that holds docker-compose.yml and .env.
# Usage: ./deploy.sh <image-tag>        e.g. ./deploy.sh sha-1a2b3c4
#
# Steps: pull image -> ensure DB/Redis up -> back up DB -> migrate -> start app
# and wait for its health check -> automatic rollback to the previous tag on failure.
set -euo pipefail

NEW_TAG="${1:?usage: deploy.sh <image-tag>}"
cd "$(dirname "$0")"

STATE_FILE=.deployed-tag   # tag currently running successfully
BACKUP_DIR=backups
KEEP_BACKUPS=14
WAIT_TIMEOUT=180

log() { echo "[deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)] $*"; }

# Keep IMAGE_TAG in .env equal to what is running, so manual
# `docker compose ps|logs|restart` on the server keeps working.
record_tag() {
  sed -i '/^IMAGE_TAG=/d' .env
  echo "IMAGE_TAG=$1" >> .env
}

PREV_TAG="$(cat "$STATE_FILE" 2>/dev/null || true)"
if [ -n "$PREV_TAG" ]; then record_tag "$PREV_TAG"; fi

export IMAGE_TAG="$NEW_TAG"   # shell env overrides .env for this run
log "Deploying $NEW_TAG (currently running: ${PREV_TAG:-nothing})"

docker compose pull app
docker compose up -d --wait postgres redis

mkdir -p "$BACKUP_DIR"
backup="$BACKUP_DIR/pre-${NEW_TAG}-$(date -u +%Y%m%d%H%M%S).dump"
log "Backing up database -> $backup"
if ! docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$backup"; then
  rm -f "$backup"
  log "Backup failed; aborting before any change was made"
  exit 1
fi
# Keep only the newest backups.
ls -1t "$BACKUP_DIR"/pre-*.dump 2>/dev/null | tail -n +$((KEEP_BACKUPS + 1)) | xargs -r rm -- || true

log "Applying database migrations"
docker compose run --rm migrate

log "Starting app and waiting for it to become healthy"
if docker compose up -d --wait --wait-timeout "$WAIT_TIMEOUT" app; then
  echo "$NEW_TAG" > "$STATE_FILE"
  record_tag "$NEW_TAG"
  # Remove unused images older than 10 days (a rollback re-pulls from Docker Hub if needed).
  docker image prune -af --filter "until=240h" >/dev/null || true
  log "Deployed $NEW_TAG successfully"
  exit 0
fi

log "ERROR: $NEW_TAG failed its health check. Last app logs:"
docker compose logs --tail 100 app || true

if [ -n "$PREV_TAG" ]; then
  log "Rolling back to $PREV_TAG"
  IMAGE_TAG="$PREV_TAG" docker compose up -d --wait --wait-timeout "$WAIT_TIMEOUT" app
  log "Rolled back to $PREV_TAG"
else
  log "No previous version to roll back to"
fi
exit 1
