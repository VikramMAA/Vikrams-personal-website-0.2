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
    /**
     * Optional FAQ block, rendered at the foot of the post and emitted as
     * FAQPage JSON-LD by the post template. Use it to signal that one page
     * answers a cluster of near-duplicate queries, rather than hand-writing
     * JSON-LD per post.
     *
     * Keep every answer visible in the rendered page — FAQPage markup that
     * does not match on-page content is a manual-action risk.
     */
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { blog };
