import type { MetadataRoute } from "next";
import { featuredServices, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/pricing",
    "/about",
    "/contact",
    ...featuredServices.map((s) => `/services/${s.slug}`),
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
