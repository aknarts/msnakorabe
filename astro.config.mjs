// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { remarkBasePath } from './src/remark-base-path.mjs';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.msnakorabe.cz',
  base: process.env.BASE_PATH || '/',
  markdown: {
    remarkPlugins: [remarkBasePath],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});