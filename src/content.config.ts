import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Existing collection — keep legacy API (works with src/content/announcements/)
const announcements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    priority: z.enum(['normal', 'high', 'urgent']).default('normal'),
    pinned: z.boolean().default(false),
    active: z.boolean().default(true),
  }),
});

// FAQ — individual markdown files, one per question
const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
    active: z.boolean().default(true),
  }),
});

// Site-wide configuration (single entry)
const site = defineCollection({
  loader: file('src/data/site.yaml'),
  schema: z.object({
    name: z.string(),
    short_name: z.string(),
    ico: z.string(),
    data_box: z.string(),
    founder: z.object({ name: z.string(), url: z.string() }),
    motto: z.string(),
    philosophy: z.string(),
    goal: z.string(),
    intro: z.string(),
    school_type: z.string(),
    program_name: z.string(),
    program_description: z.string(),
    garden: z.string(),
    kitchen_description: z.string(),
    kitchen_awards: z.array(z.string()),
    hours: z.string(),
    hours_note: z.string(),
    absence_email: z.string(),
    moodle_url: z.string(),
    moodle_description: z.string(),
    virtual_tour_url: z.string(),
    buildings: z.array(z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      email: z.string().optional(),
      cafeteria_phone: z.string(),
      image: z.string(),
      garden: z.string().optional(),
    })),
  }),
});

// Personnel — management, classes, kitchen, other staff
const personnel = defineCollection({
  loader: file('src/data/personnel.yaml'),
  schema: z.object({
    section: z.enum(['management', 'classes', 'kitchen', 'other']),
    name: z.string().optional(),
    title: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    class_name: z.string().optional(),
    emoji: z.string().optional(),
    building: z.string().optional(),
    teachers: z.array(z.object({
      name: z.string(),
      role: z.string().nullable(),
    })).optional(),
    staff: z.array(z.object({
      name: z.string(),
      role: z.string(),
    })).optional(),
  }),
});

// Documents manifest — maps PDF files to display titles and categories
const documents = defineCollection({
  loader: file('src/data/documents.yaml'),
  schema: z.object({
    filename: z.string(),
    title: z.string(),
    category: z.enum(['enrollment', 'rules', 'nature-school', 'gdpr', 'budget']),
    active: z.boolean().default(true),
  }),
});

// Useful links — mandated by city council, must be easily verifiable
const links = defineCollection({
  loader: file('src/data/useful-links.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    description: z.string().optional(),
    category: z.enum(['portal', 'municipality', 'budget', 'regulation']),
    order: z.number(),
    active: z.boolean().default(true),
  }),
});

export const collections = { announcements, faq, site, personnel, documents, links };
