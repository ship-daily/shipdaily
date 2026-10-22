# Contributing to ShipDaily

Thanks for helping build ShipDaily! This guide gets you from clone to pull request.

## Ways to contribute

- **Pick up an issue.** Issues labelled [`good first issue`](https://github.com/ship-daily/shipdaily/labels/good%20first%20issue) are small and well-scoped. [`help wanted`](https://github.com/ship-daily/shipdaily/labels/help%20wanted) issues are bigger.
- **Report a bug** or **suggest a feature** with an [issue template](https://github.com/ship-daily/shipdaily/issues/new/choose).
- **Talk it through** on [Discord](https://discord.gg/ZeqkBS9nuu) if you're unsure where to start.

Comment on an issue before you start so nobody else picks it up at the same time. For anything bigger than a bug fix, agree on the approach in the issue first.

## Local setup

### Option 1: Docker (easiest)

Only [Docker](https://www.docker.com/products/docker-desktop/) needed:

```bash
git clone https://github.com/ship-daily/shipdaily.git
cd shipdaily
docker compose up
```

This starts Postgres, runs the migrations and starts the app with hot reload at http://localhost:3000. Edit files on your machine as usual; the app reloads.

- **Sign in:** use any email. The 6-digit code appears in `docker compose logs -f app`.
- **Optional keys:** GitHub/Google OAuth keys or `RESEND_API_KEY` in `.env.local` are picked up. The database settings in `docker-compose.yml` always win, so Docker never touches another database.
- **Added a dependency?** `docker compose build` and `docker compose up` again.
- **Start over with an empty database:** `docker compose down -v`.

### Option 2: Bun on your machine

**Requirements:** [Bun](https://bun.sh) 1.3+ and Postgres 15+ (`docker compose up -d db` gives you one).

```bash
git clone https://github.com/ship-daily/shipdaily.git
cd shipdaily
bun install

cp .env.example .env.local      # then set BETTER_AUTH_SECRET (openssl rand -base64 32)
docker compose up -d db         # Postgres on localhost:5432
bun run db:migrate              # create the tables

bun dev                         # http://localhost:3000
```

GitHub and Google sign-in are optional locally. Without them, sign in with email: without `RESEND_API_KEY`, the 6-digit code is printed in the terminal running `bun dev`. Preview emails at `/api/dev/emails/sign-in-code`.

### Useful commands

| Command | What it does |
|---|---|
| `bun dev` | Dev server |
| `bun run lint` | ESLint |
| `bun run typecheck` | Generate route types and run TypeScript |
| `bun run build` | Production build (Node) |
| `bun run preview` | Build for Cloudflare and run it locally in workerd |
| `bun run db:generate` | Create a migration after changing `src/db/schema.ts` |
| `bun run db:migrate` | Apply migrations |
| `bun run db:studio` | Browse the database |
| `bun run cf-typegen` | Regenerate `cloudflare-env.d.ts` after changing `wrangler.jsonc` |

### Troubleshooting

- **Pages reload in a loop in `bun dev`** (`HMR hash mismatch` in the browser console): the Turbopack dev cache is stale. Stop the server, run `rm -rf .next`, and start it again.
- **Using Neon instead of Docker:** put Neon's pooled URL in `DATABASE_URL` and the direct URL in `DATABASE_URL_UNPOOLED` (`neon env pull` does this). Migrations use the direct one.

## Project layout

```
src/
├── app/
│   ├── (marketing)/          # landing page
│   ├── (auth)/               # sign-in and onboarding
│   ├── (app)/                # signed-in app (home, …)
│   └── api/auth/[...all]/    # Better Auth endpoints
├── components/
│   ├── marketing/            # landing page sections
│   ├── app/                  # signed-in app shell
│   └── ui/                   # shared components
├── db/
│   ├── schema.ts             # Drizzle schema (all tables)
│   └── index.ts              # getDb(): per-request client
└── lib/
    ├── auth.ts               # getAuth(): Better Auth server config
    ├── auth-client.ts        # client-side auth helpers
    ├── session.ts            # getSession(), requireUser(), requireOnboardedUser()
    ├── email.ts              # sendEmail() through Resend
    ├── emails/               # email templates (layout.ts = shared branded look)
    └── site.ts               # URLs and links
drizzle/                      # generated SQL migrations (commit these)
```

## Conventions

- **Database access:** always call `getDb()` and `getAuth()` inside the request (component, action or route handler), never at module scope. On Cloudflare, a connection can't be reused across requests.
- **Schema changes:** edit `src/db/schema.ts`, run `bun run db:generate`, and commit the generated migration with your change. Never edit a migration that's already on `main`.
- **Anti-abuse and ranking:** thresholds and weights are read from environment variables with safe defaults in code. Don't hardcode production values; they're deliberately kept private.
- **Next.js 16:** APIs differ from older versions. Check `node_modules/next/dist/docs/` before using an API you're unsure of.
- **Style:** match the code around you. ESLint must pass.

## Pull requests

1. Fork the repo and create a branch from `main`.
2. Keep the PR focused on one issue, and link it (`Closes #123`).
3. Make sure `bun run lint`, `bun run typecheck` and `bun run build` pass. CI runs them too.
4. Add screenshots or a short video for UI changes.
5. On your first PR, the CLA bot asks you to sign the [Contributor License Agreement](./CLA.md) by posting a comment. It takes a few seconds and only happens once.

## Contributor License Agreement

ShipDaily is AGPL-3.0. The [CLA](./CLA.md) lets the project keep its licensing options open (for example, offering a commercial license alongside the AGPL) while you keep the copyright to your work.

## Code of Conduct

Everyone taking part in ShipDaily agrees to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Security

Please don't open public issues for security problems. See [SECURITY.md](./SECURITY.md).
