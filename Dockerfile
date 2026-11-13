# syntax=docker/dockerfile:1
#
# One image for every environment (Development, UAT, Production).
# It holds the compiled React app plus the compiled Express API, and nothing
# environment-specific: configuration arrives at runtime through env vars.
# Database data never lives in this image; Postgres and Redis use volumes.

ARG NODE_VERSION=20

# ---------- 1. Build the React frontend ----------
# The output is plain HTML/JS/CSS (same for every CPU), so this stage always runs
# natively on the build machine, even when building the ARM image for OCI Ampere.
FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-bookworm AS client-build
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY public ./public
COPY src ./src
# Leave REACT_APP_API_URL unset so the app calls the relative "/api/v1" path.
RUN npm run build

# ---------- 2. Build the Express API ----------
# Built for the TARGET CPU: bcrypt and the Prisma engines are native binaries.
FROM node:${NODE_VERSION}-bookworm AS server-build
WORKDIR /build
COPY server/package.json server/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY server/prisma ./prisma
COPY server/tsconfig.json ./
COPY server/src ./src
RUN npx prisma generate \
 && npm run build \
 && npm prune --omit=dev

# ---------- 3. Runtime image ----------
FROM node:${NODE_VERSION}-bookworm-slim AS runtime

# Prisma's query engine needs OpenSSL; ca-certificates for outbound TLS (SMTP etc.).
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production \
    PORT=5000 \
    CLIENT_BUILD_DIR=/app/client

WORKDIR /app/server

COPY --from=server-build --chown=node:node /build/package.json ./package.json
COPY --from=server-build --chown=node:node /build/node_modules ./node_modules
COPY --from=server-build --chown=node:node /build/prisma ./prisma
COPY --from=server-build --chown=node:node /build/dist ./dist
COPY --from=client-build --chown=node:node /build/build /app/client

# Traceability: CI passes the git commit so `docker inspect` shows what is running.
ARG GIT_SHA=unknown
LABEL org.opencontainers.image.revision=$GIT_SHA
ENV APP_VERSION=$GIT_SHA

USER node
EXPOSE 5000

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||5000)+'/api/v1/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/server.js"]
