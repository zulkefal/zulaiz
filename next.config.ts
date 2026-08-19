import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    GitHub Pages serves static files only, so the whole site is prerendered to
    ./out. This works because nothing here needs a server: the contact form
    posts straight to Formspree from the browser, and there are no route
    handlers, server actions or middleware.
  */
  output: "export",

  /*
    Every route becomes a directory with an index.html, which is the shape
    GitHub Pages resolves reliably. Without it, /services would depend on the
    host guessing at /services.html.
  */
  trailingSlash: true,

  images: {
    /*
      The Next image optimiser is a server feature. Turning it off makes
      <Image> emit a plain <img>, so the files in public/images are served as
      generated. They were already converted to JPEG and sized for the web.
    */
    unoptimized: true,
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
