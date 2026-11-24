# AGENTS.md

Welcome to the **Francisco Gonzalez IV Portfolio** repository. This document provides essential context, architecture details, conventions, commands, and guidelines for AI agents working in this codebase.

---

## 1. Project Overview & Architecture

- **Site Purpose**: Personal portfolio and project showcase for **Francisco Gonzalez IV**, a software engineer based in Richmond, VA.
- **Production URL**: [https://worker.franciscogonzaleziv.com](https://worker.franciscogonzaleziv.com)
- **Active Branch**: `astro`
- **Current Framework**: **Astro v7** (Static Site Generation / SSG) with Content Layer API.
- **UI & Styling**: **Tailwind CSS v4** (`@tailwindcss/vite`) + **Starwind UI** source-owned Astro components (`src/components/starwind/`), using a mobile-first **Stone & Pine/Teal** light/dark design system.
- **Deployment Platform**: **Cloudflare Workers** (Assets mode via Wrangler).
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) deploying directly to Cloudflare Workers on pushes to `main` or `master`.

> [!IMPORTANT]
> **Migration Context**:
> This repository was originally migrated from Eleventy (`eleventy-duo`) + Bootstrap 5 + Sass to **Astro v7 + Tailwind CSS v4 + Starwind UI**.
> - Do **not** use, edit, or recreate `.njk` templates, Bootstrap classes, Sass files, or legacy `src/content/config.ts` collections.
> - All pages, components, and layouts must be written in Astro (`.astro`), TypeScript (`.ts`), and Tailwind CSS v4 utilities / Starwind tokens.

---

## 2. Tech Stack

- **Framework**: Astro `^7.4.13` (`output: "static"`, `trailingSlash: "always"`)
- **RSS Feed**: `@astrojs/rss` (`^4.0.19`)
- **Styling & UI**: Tailwind CSS `^4.3.5` (`@tailwindcss/vite`), Starwind UI (`@starwind-ui/astro`, `tw-animate-css`, `tailwind-merge`, `tailwind-variants`, `@tabler/icons`)
- **Deployment & Cloud**: Wrangler `^4.167.0` (Cloudflare Workers Static Assets)
- **Node / Runtime**: Node `>=22.23.4` (Astro 7 engine requirement; also compatible with Deno via `deno.json`)

---

## 3. Directory Structure

```text
eleventy-duo/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment to Cloudflare Workers
├── public/                         # Static assets served at the root URL
│   ├── images/                     # Public images (OG social images, animated GIFs, favicon)
│   └── favicon.ico                 # Site favicon
├── src/
│   ├── assets/
│   │   └── images/                 # Source images optimized by Astro <Image /> (WebP/srcset)
│   ├── components/
│   │   ├── starwind/               # Source-owned Starwind UI Astro components
│   │   ├── ProjectCard.astro       # Reusable mobile-first project card (grid & list variants)
│   │   ├── SiteFooter.astro        # Responsive site footer
│   │   └── SiteHeader.astro        # Sticky header + mobile Starwind Sheet drawer + ThemeToggle
│   ├── content/
│   │   └── blog/                   # Markdown content for projects / blog posts
│   │       ├── all-for-one-tattoo-shop.md
│   │       ├── circle-square-hair-salon.md
│   │       ├── hollybanks-lane.md
│   │       └── mother-of-suns.md
│   ├── content.config.ts           # Astro Content Layer collection schema (glob loader + astro/zod)
│   ├── data/
│   │   └── site.json               # Site metadata, author info, navigation & footer links
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Base HTML document, ThemeInitScript, meta/OG, GA, header & footer
│   │   ├── HomeLayout.astro        # Homepage layout (hero banner + responsive project grid)
│   │   └── PostLayout.astro        # Project detail layout (breadcrumb, metadata, showcase, pagination)
│   ├── lib/
│   │   └── images.ts               # Image metadata resolver, tag label formatter, URL display helper
│   ├── pages/
│   │   ├── index.astro             # Homepage (/)
│   │   ├── about.astro             # About page (/about/)
│   │   ├── projects.astro          # Projects index page (/projects/) with tag filter
│   │   ├── 404.astro               # 404 error page (/404.html)
│   │   ├── feed.xml.ts             # Dynamic RSS feed generator (/feed.xml)
│   │   ├── robots.txt.ts           # Dynamic robots.txt endpoint
│   │   ├── sitemap.xml.ts          # Dynamic XML sitemap generator (/sitemap.xml)
│   │   └── posts/
│   │       └── [...slug].astro     # Dynamic post page routing (/posts/<slug>/)
│   └── styles/
│       └── starwind.css            # Tailwind v4 entrypoint, Stone & Pine/Teal tokens, prose styles
├── astro.config.mjs                # Astro + @tailwindcss/vite configuration
├── starwind.config.json            # Starwind CLI configuration
├── tsconfig.json                   # TypeScript strict config with @/* -> ./src/* alias
├── wrangler.json                   # Cloudflare Workers configuration
├── package.json                    # Project dependencies and npm scripts
└── deno.json                       # Deno task definitions (alternative runner)
```

---

## 4. Key Workflows & Commands

All standard development tasks can be run using `npm`:

| Command | Action | Notes |
| :--- | :--- | :--- |
| `npm run dev` (or `npm start`) | Starts Astro local dev server | Runs at `http://localhost:4321/` |
| `npm run build` | Builds static production site | Generates static HTML/assets into `./dist/` |
| `npm run preview` | Previews the `./dist/` build | Uses Astro's built-in preview server |
| `npm run preview:worker` | Previews via Wrangler | Runs `wrangler dev` simulating Cloudflare Workers environment |
| `npm run deploy` | Builds and deploys | Runs `astro build && wrangler deploy` |
| `npx starwind@latest add <name>` | Adds a Starwind UI component | Installs native `.astro` files into `src/components/starwind/` |

---

## 5. Content Management & Data Schema

### Blog & Project Posts (`src/content/blog/`)

Posts are managed using Astro's Content Layer API defined in `src/content.config.ts` with `glob({ pattern: "**/*.md", base: "./src/content/blog" })` and `z` from `astro/zod`.

#### Frontmatter Schema:
```yaml
---
title: "Project Title"                      # Required: string
date: "2024-01-01"                          # Required: coerced Date
tags: ["web-development", "javascript"]     # Optional: string array (defaults to [])
description: "Brief summary of project"     # Optional: string (defaults to '')
screen: "images/screenshot.png"             # Optional: string (matches public/images/ & src/assets/images/)
url: "https://example.com"                  # Optional: URL string
order: 1                                    # Optional: number (lower numbers appear first)
---
```

> [!TIP]
> - **Sorting**: Posts on the homepage and projects page are sorted by `order` ascending (`(a.data.order ?? 99) - (b.data.order ?? 99)`).
> - **Slugs & Rendering**: Use `post.id` for route URLs (`/posts/${post.id}/`) and `render(post)` from `astro:content`.
> - **Images**: Place raster project screenshots in both `src/assets/images/` (for responsive WebP optimization via `<Image />` and `resolvePortfolioImage()`) and `public/images/` (for Open Graph metadata and direct static references). Animated GIFs live in `public/images/`.

### Site Configuration (`src/data/site.json`)

Contains global site settings (`name`, `description`, `url`, `author`, `defaultSocialImage`, `headerLinks`, `socialLinks`, `footerLinks`, `showFooterAttribution`).

---

## 6. Styling & Layout Conventions

1. **Starwind UI + Tailwind CSS v4**:
   - Design tokens (`--background`, `--foreground`, `--primary`, `--primary-accent`, etc.) live in `src/styles/starwind.css` using the **Stone & Pine/Teal** palette for light and `.dark` themes.
   - Prefer Starwind UI components (`@/components/starwind/*`) and Tailwind v4 utilities over custom CSS.
   - `ThemeInitScript` (from `@starwind-ui/astro/theme`) is loaded in `<head>` of `BaseLayout.astro` to prevent flash of wrong theme.
2. **Mobile-First Design**:
   - Design for `375px` mobile viewports first, scaling cleanly to `md:` and `lg:`.
   - Maintain accessible touch targets (`>= 44px`), single `<h1>` per page, and zero horizontal overflow.
3. **Portfolio UI Conventions**:
   - **Homepage project cards (`ProjectCard` `variant="grid"`)**: Wrap the entire card in a single `<a href="/posts/${post.id}/">` with no nested links so tapping anywhere opens the project details page.
   - **No external client live-site links**: Although `url` remains optional in frontmatter metadata, do **not** render links to client sites in cards or detail pages (some legacy sites are no longer live).
   - **No contact button**: Do **not** surface `site.author.email` or add contact/mailto buttons in the UI.
   - **Projects header**: Keep `/projects/` clean without a project-count badge.

---

## 7. Deployment & Cloudflare Workers

- Configuration file: `wrangler.json`.
- Cloudflare Workers serves static assets from `./dist`.
- Custom domain: `worker.franciscogonzaleziv.com`.
- Not found routing: `404-page` routing to `404.html`.
- CI/CD workflow: `.github/workflows/deploy.yml` requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

---

## 8. Guidelines for AI Agents

1. **Verification**: Always run `npm run build` after making modifications to verify Astro 7's strict HTML compiler, static generation, and TypeScript checks pass.
2. **Content Collections**: Use `getCollection("blog")` and `render(post)` from `astro:content`, `post.id` for slugs, and `z` from `astro/zod`.
3. **Avoid Legacy Artifacts**: Do not add Bootstrap, Sass, `.eleventy.js`, `.forestry/`, or Nunjucks templates.
4. **Link Hygiene**: Respect the trailing slash convention (`/about/`, `/projects/`, `/posts/<id>/`).
