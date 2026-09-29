// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://automation-portfolio.vercel.app",
  output: "static",
  trailingSlash: "ignore",
  image: {
    // Build-time optimisation with sharp — nothing runs on Vercel's image service.
    responsiveStyles: false,
  },
});
