import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* Emitted as a file at build time, since the site is a static export. */
export const dynamic = "force-static";

/*
  Everything a person can visit stays crawlable, including /_next/ assets:
  Google needs the CSS and JavaScript to render the pages.

  The one thing blocked is the React Server Component payloads. The static
  export writes a set of .txt files next to every page (index.txt,
  __next._tree.txt and similar, 85 of them). They are fetched by the
  client router, not read by people, and Google can find them and report
  them as crawled-but-not-indexed URLs. robots.txt itself is always read
  regardless of this rule.

  Privacy and Terms are not blocked here on purpose: they carry a noindex
  meta tag, and Google can only see that tag if it is allowed to crawl them.
*/
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*.txt$"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
