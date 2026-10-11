// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bodco.pm',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    routing: { prefixDefaultLocale: false },
  },
});
