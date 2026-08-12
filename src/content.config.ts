import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Used in <title>. Falls back to `title` if omitted. */
    seoTitle: z.string().optional(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    /** Set false to keep a post out of the index and the sitemap. */
    published: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    /** Path to an image under `public/`, e.g. `/images/post.jpg`. */
    heroImage: z.string().optional(),
    /** Alt text for `heroImage`. Falls back to the post title. */
    heroImageAlt: z.string().optional(),
  }),
});

export const collections = { blog };
