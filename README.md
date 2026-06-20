# WASSI GLOBAL SERVICES LLC — Landing Website

Lead-generation landing website and quote/appointment intake system for
WASSI GLOBAL SERVICES LLC, built with Next.js, TypeScript, Tailwind CSS,
Prisma, and PostgreSQL.

## Local Development

### Prerequisites

- Node.js 20+
- A PostgreSQL database (local, Docker, or a managed provider like Neon/Supabase)

### Setup

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL at minimum to run locally
# example: DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
npx prisma migrate dev --name init
npm run dev
```

The site runs at http://localhost:3000.

### Commands

```bash
npm run dev         # local dev server
npm run build       # production build
npm run start       # run production build
npm run lint        # ESLint
npm run typecheck   # TypeScript, no emit
npm run test        # unit tests (Vitest)
npm run test:e2e    # browser smoke tests (Playwright)
```

`npm install` automatically runs `prisma generate` via a `postinstall` hook.
If you change `prisma/schema.prisma`, run `npx prisma generate` again and
create a migration with `npx prisma migrate dev`.

## Environment Variables

See `.env.example`. Required for full functionality:

```txt
DATABASE_URL=                  # PostgreSQL connection string
RESEND_API_KEY=                # Resend API key for transactional email
COMPANY_NOTIFICATION_EMAIL=    # Inbox that receives new leads
NEXT_PUBLIC_SITE_URL=          # Public site URL, used in metadata
ALLOWED_ORIGINS=               # Comma-separated allowed POST origins (production)
SENTRY_DSN=                    # Optional, for error monitoring
```

- Local development: use a local or development database and a Resend test/sandbox key.
- Pull request previews (Vercel): use preview-safe secrets, ideally a separate dev database.
- Production: separate, production-only secrets. Never reuse preview secrets in production.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Add the environment variables above in the Vercel project settings
   (set per-environment: Development / Preview / Production).
4. Provision a managed PostgreSQL database (Neon, Supabase, or similar) and
   set `DATABASE_URL` accordingly for Preview and Production.
5. Run `npx prisma migrate deploy` against the production database before
   the first production deploy (or via a release step in CI).
6. Connect your production domain in Vercel and confirm HTTPS is active.
7. Confirm `www` and apex domain behavior (redirect one to the other).
8. Set `ALLOWED_ORIGINS` to your public domain origins.
   Example: `https://wassinextmove.com,https://www.wassinextmove.com`

### Recommended Vercel Build/Deploy Setup

Use these commands in Vercel project settings:

- Install Command: `npm install`
- Build Command: `npx prisma migrate deploy ; npm run build`
- Output Command: default (Next.js)

This ensures schema migrations are applied before each production build.

## Security Hardening (Production)

- Keep all secrets in Vercel environment variables (never in Git).
- Use separate databases for Preview and Production.
- Rotate `RESEND_API_KEY` and database credentials periodically.
- Restrict database network access to trusted hosts where possible.
- Configure `ALLOWED_ORIGINS` for CSRF-style origin enforcement on API POST endpoints.
- Keep DNS email authentication enabled (SPF, DKIM, DMARC).
- Enable database backups and rehearse restore at least once.
- Monitor 4xx/5xx spikes and rate-limit events in logs.

## Email Authentication (for deliverability)

Configure these DNS records with your domain registrar / Resend dashboard:

- SPF
- DKIM
- DMARC

Without these, notification and confirmation emails are more likely to be
marked as spam.

## Monitoring & Backups

- Set `SENTRY_DSN` and confirm a test error appears in Sentry from a preview deployment.
- Enable automated backups on your PostgreSQL provider (e.g. daily, with a 24-hour Recovery Point Objective).
- Set up uptime monitoring (UptimeRobot, Better Stack, or Vercel monitoring) against the production domain.

## Rollback

- Vercel keeps prior deployments; promote a previous deployment to production if a release has issues.
- Database changes use Prisma migrations, so schema rollbacks should go through a corresponding down-migration or restored backup.

## Launch Checklist

- [ ] Company name, phone, email, address, and hours confirmed across the site.
- [ ] MC/USDOT numbers added, if available.
- [ ] Privacy Policy and Terms of Service reviewed.
- [ ] Hero image replaced with a licensed or generated image.
- [ ] Quote form tested end to end (submission stored + both emails received).
- [ ] Appointment form tested end to end (submission stored + both emails received).
- [ ] Mobile, tablet, and desktop layouts reviewed.
- [ ] Lighthouse performance/accessibility pass reviewed.
- [ ] CI pipeline passing on `main`.
- [ ] Production domain connected, HTTPS verified, `www`/apex redirects verified.
- [ ] DNS email authentication records (SPF/DKIM/DMARC) configured.
- [ ] Production environment variables configured in Vercel.
- [ ] Uptime monitoring enabled.
- [ ] Error monitoring (Sentry) enabled.
- [ ] Database backups enabled.

## Project Structure

```txt
src/
  app/              routes, pages, API handlers
  components/       layout, sections, forms, ui primitives
  content/          centralized site copy and contact info
  lib/
    validation/     Zod schemas (+ unit tests)
    security/       rate limiting, sanitization (+ unit tests)
    db/             Prisma client
    email/          email senders
prisma/
  schema.prisma     QuoteRequest, AppointmentRequest models
e2e/                Playwright smoke tests
.github/workflows/  CI pipeline
```

## Known Local-Environment Note

This project was scaffolded in a network-restricted sandbox that could not
reach `binaries.prisma.sh` or `fonts.googleapis.com`. The site no longer
depends on Google Fonts (it uses the system font stack instead), but
`npx prisma generate` still needs to be run once on a machine/CI with normal
network access before `npm run build` will fully type-check and build.
