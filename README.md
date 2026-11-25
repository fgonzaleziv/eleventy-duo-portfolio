# Francisco Gonzalez IV — Portfolio

Personal portfolio and project showcase for **Francisco Gonzalez IV**, a software engineer based in Richmond, VA.

Live site: [https://worker.franciscogonzaleziv.com](https://worker.franciscogonzaleziv.com)

## Tech Stack

- **Framework**: [Astro 7](https://astro.build/) (Static Site Generation + Content Layer API)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) + [Starwind UI](https://starwind.dev/) source-owned Astro components (`Stone & Pine/Teal` light/dark theme)
- **Icons & Fonts**: `@tabler/icons`, IBM Plex Sans & IBM Plex Mono
- **Hosting & CI/CD**: [Cloudflare Workers](https://workers.cloudflare.com/) Static Assets via Wrangler + GitHub Actions

## Prerequisites

- **Node.js `>= 22.23.4`** (required by Astro 7) and npm (or Deno via `deno.json`)

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:4321/)
npm run dev

# Build static production site into ./dist/
npm run build

# Preview production build locally
npm run preview

# Preview in the Cloudflare Workers runtime
npm run preview:worker
```

## Project Structure

```text
├── .github/workflows/deploy.yml   # Cloudflare Workers CI/CD
├── public/                        # Static files (favicon, OG images, animated GIFs)
├── src/
│   ├── assets/images/             # Raster images optimized to responsive WebP via Astro <Image />
│   ├── components/
│   │   ├── starwind/              # Source-owned Starwind UI components
│   │   ├── ProjectCard.astro      # Mobile-first project card (grid & list variants)
│   │   ├── SiteHeader.astro       # Sticky header, mobile Sheet drawer & ThemeToggle
│   │   └── SiteFooter.astro       # Responsive footer
│   ├── content/blog/              # Project case studies (Markdown)
│   ├── content.config.ts          # Astro Content Layer schema (glob loader + astro/zod)
│   ├── data/site.json             # Site metadata & navigation links
│   ├── layouts/                   # BaseLayout, HomeLayout, PostLayout
│   ├── lib/images.ts              # Image asset & tag formatting helpers
│   ├── pages/                     # Routes (/, /projects/, /about/, /posts/<id>/, /404.html, RSS, sitemap, robots)
│   └── styles/starwind.css        # Tailwind v4 entrypoint & Stone/Pine-Teal theme tokens
├── astro.config.mjs               # Astro + @tailwindcss/vite config
├── starwind.config.json           # Starwind CLI config
├── tsconfig.json                  # TypeScript strict config (@/* -> ./src/*)
└── wrangler.json                  # Cloudflare Workers static assets config
```

## Adding or Editing Content

### Projects (`src/content/blog/`)

Create a Markdown file in `src/content/blog/` with the following frontmatter:

```yaml
---
title: "Project Title"
date: "2024-01-01"
tags: ["small-business", "javascript", "web-development"]
description: "Brief summary of the project."
screen: "images/screenshot.png"
order: 1
---

Project details in Markdown...
```

- Place raster screenshots in both `src/assets/images/` (for responsive WebP optimization) and `public/images/` (for Open Graph metadata). Animated GIFs belong in `public/images/`.
- Projects are ordered ascending by `order`.

### Site Metadata (`src/data/site.json`)

Edit `src/data/site.json` to update site title, description, navigation links, social/footer links, and default Open Graph image.

### Adding Starwind UI Components

```bash
npx starwind@latest add <component-name>
```

## Deployment

Production deployments run automatically via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on pushes to `main` or `master` (requiring `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets).

To deploy manually with Wrangler:

```bash
npm run deploy
```

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE).
