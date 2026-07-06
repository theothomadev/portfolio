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

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

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
