import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    tags: z.array(z.string()).default([]),
    description: z.string().default(''),
    screen: z.string().optional(),
    url: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
