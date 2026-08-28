import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Every route on this site is static, so we export plain HTML rather than
   * running a Next.js server on Netlify. That means no serverless runtime, no
   * cold starts, and nothing that can break when the host bumps its Next.js
   * adapter version.
   */
  output: "export",

  images: {
    /**
     * A static export has no built-in image optimizer, so requests are routed
     * to Netlify's Image CDN instead. See src/lib/netlifyImageLoader.ts.
     */
    loader: "custom",
    loaderFile: "./src/lib/netlifyImageLoader.ts",
  },

  /**
   * Emit `about/index.html` rather than `about.html`, which is the shape
   * Netlify's static file serving expects for clean URLs.
   */
  trailingSlash: true,

  // Surface type errors at build time rather than shipping them.
  // (Next 16 no longer accepts an `eslint` key here — lint runs via
  // `npm run lint` in the build script instead.)
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
