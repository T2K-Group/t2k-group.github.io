import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  site: "https://t2k.group",
  integrations: [sitemap(), compress(), mdx(), tailwind()]
});