import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', (post) => !post.data.draft);
  
  return rss({
    title: 'Akrom.dev Blog',
    description: 'Articles about web development, React, and modern frontend technologies.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.createdAt,
        description: post.data.description,
        link: `/blog/${post.id}/`,
      })),
  });
}

