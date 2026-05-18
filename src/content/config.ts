import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    category: z.enum(['住宅景观', '社区景观', '酒店景观', '示范区景观', '滨水景观']),
    location: z.string(),
    role: z.string(),
    year: z.number(),
    cover: z.string(),
    images: z.array(z.string()),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { projects };
