import { site } from "@/lib/site";
import { canonicalPath } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/*
  BreadcrumbList structured data. Google renders this as the clickable
  "zulaiz.com > Services > WISMO" trail in a search result, which is one of
  the few ways to get extra links into your own listing. Unlike FAQ rich
  results, which Google restricted to government and health sites in 2023,
  breadcrumbs are still shown for ordinary sites.
*/
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${canonicalPath(crumb.path)}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
