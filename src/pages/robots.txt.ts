import site from '../data/site.json';

export async function GET(context: any) {
  const siteUrl = context.site ? context.site.href.replace(/\/+$/, '') : site.url.replace(/\/+$/, '');
  const robotsTxt = `User-agent: *\nSitemap: ${siteUrl}/sitemap.xml\n`;
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
