import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // cacheComponents and partialPrefetching are off: pages hang under OpenNext on Cloudflare
  // ("Cannot perform I/O on behalf of a different request"). Re-enable once OpenNext supports them.
  // pg loads pg-cloudflare at runtime only on workerd, so file tracing misses it.
  outputFileTracingIncludes: {
    "/*": ["./node_modules/pg-cloudflare/**/*"],
  },
  // Serve images as-is: the only image is the logo, and this avoids Cloudflare Images (a paid-capable
  // service) so hosting stays on the Workers free plan.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

// Exposes Cloudflare bindings (e.g. HYPERDRIVE) to `next dev` via getCloudflareContext().
initOpenNextCloudflareForDev();
