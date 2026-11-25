import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    description: z.string().default(""),
    screen: z.string().optional(),
    url: z.string().url().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  blog,
};
