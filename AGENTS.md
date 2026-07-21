# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 15 (App Router) + TypeScript portfolio app (`theo-portfolio`). npm is the package manager (`package-lock.json`). Node 22 works. There is no separate backend, database, or test framework — the whole product is one Next.js app with static content plus one API route.

### Running / building
- Dev server: `npm run dev` (runs `next dev -H 0.0.0.0` on port 3000). Do not use `npm run dev:clean` in the cloud VM — it calls `pkill -f 'next dev'`, which is unsafe here.
- Standard commands live in `package.json` scripts: `build`, `start`, `lint`. Lint is `next lint` (deprecated warning is expected and harmless).
- Run only ONE dev server at a time; concurrent Next.js dev servers corrupt the `.next` cache (see README).

### Rocket League stats feature (only external dependency)
- `/rocket-league` + `/api/rocket-league/stats` call the external RapidAPI "Rocket League API" using `RAPIDAPI_KEY` (optional `RAPIDAPI_HOST`), configured via `.env.local` (see `.env.example`).
- Without `RAPIDAPI_KEY` the API route returns a graceful `503 MISSING_API_KEY` and the rest of the site works fine. Set the key only to exercise that feature end to end.

### Notes
- DDEV config (`.ddev/`) exists but is optional; plain `npm` is simpler and the declared MariaDB container is unused by the app.
- No automated tests exist; verify changes by running the dev server and exercising pages (e.g. the contact form has a client-side "Message sent!" success flow).
