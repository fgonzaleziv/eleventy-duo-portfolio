import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import site from '../data/site.json';

export async function GET(context: any) {
  const posts = await getCollection('blog');
  posts.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

  return rss({
    title: site.name,
    description: site.description,
    site: context.site || site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
  });
}
