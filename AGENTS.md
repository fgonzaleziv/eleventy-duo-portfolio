# AGENTS.md

Welcome to the **Francisco Gonzalez IV Portfolio** repository. This document provides essential context, architecture details, conventions, commands, and guidelines for AI agents working in this codebase.

---

## 1. Project Overview & Architecture Migration

- **Site Purpose**: Personal portfolio and project showcase for **Francisco Gonzalez IV**, a software engineer based in Richmond, VA.
- **Production URL**: [https://worker.franciscogonzaleziv.com](https://worker.franciscogonzaleziv.com)
- **Active Branch**: `astro`
- **Current Framework**: **Astro v5** (Static Site Generation / SSG).
- **Deployment Platform**: **Cloudflare Workers** (Assets mode via Wrangler).
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) deploying directly to Cloudflare Workers on pushes to `main` or `master`.

> [!IMPORTANT]
> **Eleventy Migration Context**:
> This repository was originally cloned from the `eleventy-duo` template (Eleventy, Nunjucks, Webpack, PostCSS).
> It has been **migrated to Astro v5**.
> - Do **not** use, edit, or recreate `.njk` templates, Webpack configs, or Eleventy plugins.
> - The files `.eleventy.js` and `.forestry/` are legacy artifacts from the original template and should not be modified unless performing a cleanup.
> - All new pages, components, and layouts must be written in Astro (`.astro`), TypeScript (`.ts`), and standard SCSS/CSS.

---

## 2. Tech Stack

- **Framework**: Astro `^5.4.2` (`output: "static"`, `trailingSlash: "always"`)
- **RSS Feed**: `@astrojs/rss` (`^4.0.11`)
- **Styling**: Bootstrap `^5.3.3`, Sass `^1.85.1`, custom modular CSS
- **Deployment & Cloud**: Wrangler `^3.111.0` (Cloudflare Workers Static Assets)
- **Node / Runtime**: Node 22 (also compatible with Deno via `deno.json`)

---

## 3. Directory Structure

```text
eleventy-duo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment to Cloudflare Workers
├── public/                     # Static assets served at the root URL
│   ├── images/                 # Project screenshots and public images
│   └── favicon.ico             # Site favicon
├── src/
│   ├── content/
│   │   ├── blog/               # Markdown content for projects / blog posts
│   │   │   ├── all-for-one-tattoo-shop.md
│   │   │   ├── circle-square-hair-salon.md
│   │   │   ├── hollybanks-lane.md
│   │   │   └── mother-of-suns.md
│   │   └── config.ts           # Astro content collection schema definition
│   ├── data/
│   │   └── site.json           # Site metadata, author info, navigation & footer links
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Base HTML document, head meta/OG, analytics, nav & footer
│   │   ├── HomeLayout.astro    # Homepage layout (hero banner + project grid)
│   │   └── PostLayout.astro    # Project / post detail layout (content + pagination)
│   ├── pages/
│   │   ├── index.astro         # Homepage (/)
│   │   ├── about.astro         # About page (/about/)
│   │   ├── projects.astro      # Projects index page (/projects/)
│   │   ├── 404.astro           # 404 error page (/404.html)
│   │   ├── feed.xml.ts         # Dynamic RSS feed generator (/feed.xml)
│   │   ├── robots.txt.ts       # Dynamic robots.txt endpoint
│   │   ├── sitemap.xml.ts      # Dynamic XML sitemap generator (/sitemap.xml)
│   │   └── posts/
│   │       └── [...slug].astro # Dynamic post page routing (/posts/<slug>/)
│   └── styles/
│       ├── main.scss           # Imports Bootstrap SCSS and footer.scss
│       ├── footer.scss         # Footer styling
│       ├── global.css          # Global page rules
│       ├── header.css          # Header & navigation styles
│       ├── hero.css            # Hero section styles
│       ├── post.css            # Single post layout styles
│       ├── post-list.css       # Project card and grid styles
│       ├── about.css           # About page styling
│       ├── not-found.css       # 404 page styling
│       ├── typography.css      # Typography rules
│       ├── variable.css        # CSS variables
│       └── prism-theme.css     # Code syntax highlighting theme
├── astro.config.mjs            # Astro configuration
├── wrangler.json               # Cloudflare Workers configuration
├── package.json                # Project dependencies and npm scripts
└── deno.json                   # Deno task definitions (alternative runner)
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

*Note: Deno tasks are also supported (`deno task dev`, `deno task build`, `deno task deploy`).*

---

## 5. Content Management & Data Schema

### Blog & Project Posts (`src/content/blog/`)

Posts are managed using Astro Content Collections defined in `src/content/config.ts`.

#### Frontmatter Schema:
```yaml
---
title: "Project Title"                      # Required: string
date: "2024-01-01"                          # Required: string or Date
tags: ["web-development", "react"]          # Optional: string array (defaults to [])
description: "Brief summary of project"    # Optional: string (defaults to '')
screen: "images/screenshot.png"             # Optional: string (path relative to root / public)
url: "https://example.com"                  # Optional: string (external live URL)
order: 1                                    # Optional: number (lower numbers appear first)
---
```

> [!TIP]
> - **Sorting**: Posts on the homepage and projects page are sorted by `order` ascending (`(a.data.order ?? 99) - (b.data.order ?? 99)`).
> - **Images**: Place screenshots in `public/images/`. The `screen` frontmatter should be formatted without a leading slash (e.g. `images/filename.png`), because the layout templates prefix it with `/${post.data.screen}`.

### Site Configuration (`src/data/site.json`)

Contains global site settings:
- `name`: Site name / Author name.
- `description`: Default meta description.
- `url`: Canonical base URL (`https://worker.franciscogonzaleziv.com`).
- `author`: Author details (`name`, `email`, `twitterHandle`).
- `headerLinks`: Array of `{ text, url, external }` for top navigation.
- `socialLinks`: Array of `{ text, url, external }` for social profiles.
- `footerLinks`: Array of `{ text, url, external }` for footer links.
- `showFooterAttribution`: Toggle footer attribution message.

---

## 6. Styling & Layout Conventions

1. **Bootstrap 5 & Sass**:
   - Bootstrap is imported via Sass in `src/styles/main.scss`.
   - Bootstrap's JS bundle (`bootstrap.bundle.min.js`) is imported in `BaseLayout.astro`.
   - *Note*: Dart Sass emits deprecation notices during build regarding `@import` and `if()` inside Bootstrap 5.3. These are expected and do not prevent builds from succeeding.
2. **Modular CSS**:
   - Custom CSS is split into component-specific files in `src/styles/` and imported into `BaseLayout.astro`.
   - Prefer maintaining modularity when adding new styles.
3. **Responsive Images**:
   - Use `loading="lazy"` and `decoding="async"` on `<img>` tags.
   - Use Bootstrap's `img-fluid` class where appropriate.

---

## 7. Routing & SEO

- **Static Output**: Astro is configured with `output: "static"` and `trailingSlash: "always"`.
- **Dynamic Endpoints**:
  - `src/pages/feed.xml.ts`: RSS feed built with `@astrojs/rss`.
  - `src/pages/sitemap.xml.ts`: Generates `sitemap.xml` dynamically across all static pages and blog posts.
  - `src/pages/robots.txt.ts`: Serves robots instructions pointing to `sitemap.xml`.
- **Analytics**: Google Analytics tag (`gtag.js`, ID `G-RH0QSFHB54`) is loaded in `BaseLayout.astro`.

---

## 8. Deployment & Cloudflare Workers

- Configuration file: `wrangler.json`.
- Cloudflare Workers serves static assets from `./dist`.
- Custom domain: `worker.franciscogonzaleziv.com`.
- Not found routing: `404-page` routing to `404.html`.
- CI/CD workflow: `.github/workflows/deploy.yml` requires GitHub secrets:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

---

## 9. Guidelines for AI Agents

1. **Verification**: Always run `npm run build` after making modifications to ensure static generation and TypeScript checks pass.
2. **Content Collection Types**: When querying content, use `getCollection('blog')` from `astro:content`. Keep frontmatter aligned with the schema in `src/content/config.ts`.
3. **Avoid Eleventy Artifacts**: Do not add or edit `.eleventy.js`, `.forestry/`, or Nunjucks templates.
4. **Link Hygiene**: When linking within the site, respect the trailing slash convention (e.g., `/about/`, `/projects/`, `/posts/<slug>/`).
5. **Asset Placement**: Put web-facing static images in `public/images/`.
