import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import site from '../data/site.json';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  posts.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

  const siteUrl = context.site ? context.site.href.replace(/\/+$/, '') : site.url.replace(/\/+$/, '');
  const staticPages = ['', 'projects/', 'about/'];

  const urls = [
    ...staticPages.map((page) => `${siteUrl}/${page}`),
    ...posts.map((post) => `${siteUrl}/posts/${post.id}/`),
  ];

  const sitemap = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
