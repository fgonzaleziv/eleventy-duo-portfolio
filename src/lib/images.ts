import type { ImageMetadata } from "astro";

const assetModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/*.{png,jpg,jpeg,webp,avif}",
  { eager: true }
);

/**
 * Resolves a frontmatter image path (e.g. "images/tattoorva.com.png" or "/images/about_me.jpg")
 * to its corresponding Astro ImageMetadata in src/assets/images/ for responsive optimization.
 */
export function resolvePortfolioImage(screenPath?: string): ImageMetadata | null {
  if (!screenPath) return null;
  const filename = screenPath.split("/").pop();
  if (!filename) return null;

  const key = `/src/assets/images/${filename}`;
  return assetModules[key]?.default ?? null;
}

/**
 * Formats a kebab-case project tag (e.g. "web-development") into a readable label.
 */
export function formatTag(tag: string): string {
  const overrides: Record<string, string> = {
    javascript: "JavaScript",
    grav: "Grav",
    squarespace: "Squarespace",
    "web-development": "Web Dev",
    "small-business": "Small Business",
    "e-commerce": "E-Commerce",
    shopify: "Shopify",
    liquid: "Liquid",
    "static-site": "Static Site",
    "deno-deploy": "Deno Deploy",
    "ui-customization": "UI Customization",
    "mobile-first": "Mobile-First",
  };
  if (overrides[tag]) return overrides[tag];
  return tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Extracts a clean hostname (e.g. "tattoorva.com") from a URL string.
 */
export function formatDisplayUrl(url?: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
