import { defineCollection, z } from 'astro:content';

const earlyExperience = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Residential', 'Community', 'Hotel', 'Waterfront', 'Show Suite']),
    location: z.string(),
    role: z.string(),
    year: z.number(),
    summary: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { earlyExperience };
