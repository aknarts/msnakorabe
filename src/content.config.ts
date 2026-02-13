import { defineCollection, z } from 'astro:content';

const announcements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    priority: z.enum(['normal', 'high', 'urgent']).default('normal'),
    active: z.boolean().default(true),
  }),
});

export const collections = {
  announcements,
};
