# Momentum Mentoring

One-page site for Momentum Mentoring, built with **Next.js (App Router)** and a
**Sanity** headless CMS (Studio embedded at `/studio`).

## Setup

1. Install deps:
   ```bash
   npm install
   ```
2. Create / link a Sanity project:
   ```bash
   npx sanity login
   npx sanity init --env .env.local
   ```
   Choose **Create new project**, dataset `production`, and let it write env vars.
3. Add a write token for seeding (sanity.io/manage → API → Tokens → Editor),
   then add it to `.env.local` as `SANITY_API_WRITE_TOKEN`.
4. Seed content + images:
   ```bash
   npm run seed
   ```
5. Run:
   ```bash
   npm run dev
   ```
   - Site: http://localhost:3000
   - Studio: http://localhost:3000/studio

## Edit content

All copy, team members, services, and success stories are editable in the
Studio at `/studio`. Re-deploy is not required — the site revalidates every 60s.

## Deploy

Pushed to Vercel. Set the three `NEXT_PUBLIC_SANITY_*` env vars in the Vercel
project (the write token is **not** needed in production).
