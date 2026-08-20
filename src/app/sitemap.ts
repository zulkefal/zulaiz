import type { MetadataRoute } from "next";
import { featuredServices, site } from "@/lib/site";
import { canonicalPath } from "@/lib/seo";

/* Emitted as a file at build time, since the site is a static export. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/pricing",
    "/about",
    "/contact",
    ...featuredServices.map((s) => `/services/${s.slug}`),
  ];

  /*
    Trailing slashes matter here. With trailingSlash: true every one of these
    paths 301s to its slashed form, and a sitemap full of redirects is a
    sitemap Google will not index.
  */
  /*
    No lastModified on purpose. new Date() here meant the build time, so every
    page claimed to have changed on every deploy even when nothing had. Google
    treats a lastmod that always moves as unreliable and starts ignoring it,
    and it can surface as a misleading date beside the search result. Google's
    own guidance is that omitting lastmod beats publishing an inaccurate one.
  */
  return routes.map((route) => ({
    url: `${site.url}${canonicalPath(route)}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
