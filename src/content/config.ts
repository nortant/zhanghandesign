import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    category: z.enum(['公园绿地', '居住区', '商业景观', '屋顶花园', '滨水景观', '文旅景观', '城市更新']),
    location: z.string(),
    area: z.string(),
    year: z.number(),
    cover: z.string(),
    images: z.array(z.string()),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { projects };
