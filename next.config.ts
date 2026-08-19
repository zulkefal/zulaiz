import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Still used only by the testimonial portraits in voices.tsx, which are
      // placeholders pending a decision on the testimonials themselves.
      // Remove this entry once those are resolved. See IMAGES.md.
      { protocol: "https", hostname: "picsum.photos" },
      // Simple Icons CDN, used for the integration logo strip.
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
  },
};

export default nextConfig;
