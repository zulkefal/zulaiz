import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder photography. Swap for real brand assets before launch.
      { protocol: "https", hostname: "picsum.photos" },
      // Simple Icons CDN, used for the integration logo strip.
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
  },
};

export default nextConfig;
