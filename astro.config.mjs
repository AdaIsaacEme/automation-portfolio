// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // The live Vercel domain — used for canonical URLs, structured data and the sitemap.
  site: "https://emechukwu-nkechi-automation-portfolio.vercel.app",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
  image: {
    // Build-time optimisation with sharp — nothing runs on Vercel's image service.
    responsiveStyles: false,
  },
});
