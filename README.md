<div align="center">

<a href="https://shipdaily.ai">
  <img src="./src/app/opengraph-image.jpg" alt="ShipDaily — Ship daily, together. A community where early-stage founders, indie hackers and SaaS builders back each other." width="100%" />
</a>

<h1>ShipDaily</h1>

<p><strong>The open-source launchpad where products grow in public.</strong><br />
Launch, get real feedback, ship updates, relaunch.</p>

<p>
  <a href="https://shipdaily.ai">Website</a> ·
  <a href="https://discord.gg/ZeqkBS9nuu">Discord</a> ·
  <a href="https://github.com/ship-daily/shipdaily/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22">Good first issues</a> ·
  <a href="./CONTRIBUTING.md">Contributing</a>
</p>

<p>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-34d399" alt="License: AGPL-3.0" /></a>
  <a href="https://github.com/ship-daily/shipdaily/actions/workflows/ci.yml"><img src="https://github.com/ship-daily/shipdaily/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://discord.gg/ZeqkBS9nuu"><img src="https://img.shields.io/badge/Discord-join%20the%20community-5865F2?logo=discord&logoColor=white" alt="Join the Discord" /></a>
  <a href="https://github.com/ship-daily/shipdaily/stargazers"><img src="https://img.shields.io/github/stars/ship-daily/shipdaily?style=flat&color=f6d365" alt="GitHub stars" /></a>
  <img src="https://img.shields.io/badge/status-building%20in%20public-f5a3b8" alt="Status: building in public" />
</p>

</div>

---

## Why ShipDaily

Building got cheap. Getting anyone to actually try what you built didn't.

Most launchpads give you one day of vote-begging, then nothing. ShipDaily is built around what happens *after* launch day: real people trying your product, telling you what's wrong, and coming back when you've fixed it.

## How it works

```
Launch your product ──▶ real founders try it and react ──▶ you ship updates
        ▲                                                        │
        └──────────── relaunch, past testers come back ◀─────────┘
```

| | |
|---|---|
| 🚀 **Launch Weeks** | Small weekly cohorts of up to 20 products, opening every Monday, so every launch actually gets seen. |
| ✅ **"Tried it" votes** | A vote only counts after someone opens your product and leaves a one-line reaction. |
| 🔁 **Feedback credits** | Give-to-get: try other products to earn credits, spend them to launch. Add the ShipDaily badge to your site for starter credits. |
| 🟩 **Ship graph** | A GitHub-style contribution graph for shipping. Updates and launches fill the squares. No streaks, no guilt. |
| 🧱 **Product pages** | A living page per product: changelog, launch history, and how reactions changed between launches. |
| 📣 **Relaunch** | Ship a big update, relaunch it, and everyone who tried the last version hears about it. |

## Status

ShipDaily is being built in the open. The landing page is live at [shipdaily.ai](https://shipdaily.ai); the app lives in this repo.

- [x] Landing page
- [x] Sign in with GitHub, Google or a 6-digit email code
- [x] Founder onboarding and the home board
- [x] Branded emails, rate limiting, CI
- [ ] Products, changelog and ship graph ([#8](https://github.com/ship-daily/shipdaily/issues/8), [#10](https://github.com/ship-daily/shipdaily/issues/10), [#11](https://github.com/ship-daily/shipdaily/issues/11))
- [ ] Credits ([#15](https://github.com/ship-daily/shipdaily/issues/15))
- [ ] Launch Weeks and tried-it feedback ([#19](https://github.com/ship-daily/shipdaily/issues/19), [#23](https://github.com/ship-daily/shipdaily/issues/23))
- [ ] Pro plan ([#26](https://github.com/ship-daily/shipdaily/issues/26))

See all [open issues](https://github.com/ship-daily/shipdaily/issues), grouped by `area:` labels.

## Quick start

The fastest way to run everything, with nothing installed but [Docker](https://www.docker.com/products/docker-desktop/):

```bash
git clone https://github.com/ship-daily/shipdaily.git
cd shipdaily
docker compose up
```

That starts Postgres, creates the tables and runs the app with hot reload at **http://localhost:3000**.

To sign in, use any email address. Locally no email is sent; the 6-digit code shows up in the logs:

```bash
docker compose logs -f app
```

No accounts, API keys or OAuth apps needed. Stop everything with `docker compose down` (your local data is kept).

<details>
<summary><strong>Prefer running it without Docker for the app?</strong></summary>

Requirements: [Bun](https://bun.sh) 1.3+ and any Postgres 15+ (`docker compose up -d db` gives you one).

```bash
bun install
cp .env.example .env.local      # set BETTER_AUTH_SECRET (openssl rand -base64 32)
docker compose up -d db         # Postgres on localhost:5432
bun run db:migrate
bun dev                         # http://localhost:3000
```

The sign-in code is printed in the terminal running `bun dev`.

</details>

[CONTRIBUTING.md](./CONTRIBUTING.md) covers every command, the project layout, conventions and troubleshooting.

## Tech stack

| Layer | Choice |
|---|---|
| App | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript, [Tailwind CSS v4](https://tailwindcss.com) |
| Data | [Postgres](https://www.postgresql.org) with [Drizzle ORM](https://orm.drizzle.team) ([Neon](https://neon.com) in production) |
| Auth | [Better Auth](https://www.better-auth.com): GitHub, Google and email codes |
| Email | [Resend](https://resend.com), with a shared branded template |
| Hosting | [Vercel](https://vercel.com) today; ready for [Cloudflare Workers](https://workers.cloudflare.com) via [OpenNext](https://opennext.js.org/cloudflare) |
| Tooling | [Bun](https://bun.sh), Docker, GitHub Actions |

## Self-hosting

ShipDaily runs anywhere Node.js and Postgres do. Build the production image:

```bash
docker build --target prod -t shipdaily .
docker run -p 3000:3000 \
  -e DATABASE_URL=postgres://user:pass@host:5432/shipdaily \
  -e BETTER_AUTH_SECRET=$(openssl rand -base64 32) \
  -e BETTER_AUTH_URL=https://your-domain.com \
  shipdaily
```

Create the tables first, with the same image:

```bash
docker run --rm -e DATABASE_URL=postgres://user:pass@host:5432/shipdaily shipdaily bun run db:migrate
```

All settings (OAuth, email and more) are documented in [`.env.example`](./.env.example).

## Contributing

Contributions of every size are welcome.

1. Pick an issue, ideally a [good first issue](https://github.com/ship-daily/shipdaily/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22), and comment on it so nobody doubles up.
2. Run the app with `docker compose up`.
3. Open a pull request. CI runs lint, typecheck and build, and the CLA bot asks you to sign once.

Bigger change in mind? Open an issue first so we can agree on the approach. Not sure where to start? Ask in [Discord](https://discord.gg/ZeqkBS9nuu).

## Open source

ShipDaily is [AGPL-3.0](./LICENSE). The whole platform is public and you're free to run it yourself. If you run a modified version as a service, you share your changes back.

The only things kept out of this repo are anti-abuse thresholds and ranking weights. Publishing them would make the system easy to game, so they're read from environment variables instead.

## Community

- 💬 [Discord](https://discord.gg/ZeqkBS9nuu): where the community lives
- 🌐 [shipdaily.ai](https://shipdaily.ai)
- 🔒 Security issues: please report privately, see [SECURITY.md](./SECURITY.md)

## License

[AGPL-3.0](./LICENSE) © ShipDaily
