# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# ShipDaily image.
#   dev:  used by `docker compose up` (source is mounted, hot reload)
#   prod: a self-hostable production server (`docker build --target prod .`)
# ---------------------------------------------------------------------------

# Real Node.js runs Next.js (Bun's node shim can't resolve Turbopack's external packages);
# Bun installs dependencies and runs the package.json scripts.
FROM node:24-slim AS base
COPY --from=oven/bun:1.3 /usr/local/bin/bun /usr/local/bin/bun
RUN ln -s /usr/local/bin/bun /usr/local/bin/bunx \
  && apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Dependencies, installed from the lockfile so everyone gets the same versions.
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Development: the source code is bind-mounted by docker-compose.yml.
FROM deps AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["bun", "run", "dev", "--hostname", "0.0.0.0"]

# Production build.
FROM deps AS build
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Production server for self-hosting. Needs DATABASE_URL, BETTER_AUTH_SECRET and BETTER_AUTH_URL at runtime.
FROM base AS prod
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/bun.lock ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./next.config.ts
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /app/src/db ./src/db
EXPOSE 3000
CMD ["bun", "run", "start"]
