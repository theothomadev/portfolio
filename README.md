# Theo Thomas-Abeng — Portfolio

A modern, production-ready portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## Getting Started

**Use one dev server only** — running `npm run dev` on your Mac while DDEV also serves Next.js causes a corrupted `.next` cache and 500 errors on every save.

### Local (Mac)

```bash
npm run dev:clean   # kills stale servers, clears cache, starts fresh
```

Open **http://localhost:3000** — check the terminal for the exact port if 3000 was busy.

### DDEV

```bash
ddev mutagen reset   # once, after config changes
ddev start           # builds Next.js before dev server starts (~20s)
```

Open **https://portfolio.ddev.site** — first start takes ~20s while it builds.

Do **not** run `npm run dev` on your Mac while DDEV is running.

```bash
# Production build
npm run build
npm start
```

> **Note:** Don't run `npm run watch` alongside dev — Next.js already compiles CSS. The watch script is optional for CSS debugging only.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/
│   ├── contact/
│   ├── projects/
│   │   └── [slug]/       # Dynamic project pages
│   ├── skills/
│   ├── layout.tsx
│   ├── page.tsx          # Homepage
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── contact/          # Contact form
│   ├── home/             # Homepage sections
│   ├── layout/           # Navbar, Footer
│   ├── motion/           # Animation wrappers
│   ├── projects/         # Project cards
│   ├── skills/           # Skills grid
│   └── ui/               # shadcn/ui components
└── lib/
    ├── metadata.ts       # SEO helpers
    ├── projects-data.ts  # Project content
    ├── skills-data.ts    # Skills content
    ├── site-config.ts    # Site configuration
    └── utils.ts          # Utility functions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, about preview, skills, projects, and contact CTA |
| `/about` | About page with journey, education, goals, and interests |
| `/skills` | Skills organised by Frontend, Backend, and Tools |
| `/projects` | Project grid with individual project detail pages |
| `/contact` | Contact form with validation and social links |

## Customisation

Update personal information in `src/lib/site-config.ts`:

- Name, role, and tagline
- Email and social links
- Site URL for SEO

Add or edit projects in `src/lib/projects-data.ts` and skills in `src/lib/skills-data.ts`.

## Deployment

Deploy to Vercel with one click or connect your GitHub repository:

```bash
npx vercel
```

Update `siteConfig.url` in `src/lib/site-config.ts` to match your production domain.

## License

MIT
