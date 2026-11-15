import type { NextConfig } from "next";

// The site is fully static. `next build` writes plain files to ./out,
// which Cloudflare serves as static assets (see wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  // No image server on a static host. Photos must be exported at web size
  // before they are added (see SHOT_LIST.md, "File rules").
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
