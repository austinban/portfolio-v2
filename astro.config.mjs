// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://austinban.com",
  integrations: [react(), mdx(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr", "it", "de", "zh", "ja", "ar"],
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["@resvg/resvg-js"],
    },
  },
});
