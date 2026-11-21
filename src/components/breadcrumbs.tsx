import { site } from "@/lib/site";
import { canonicalPath } from "@/lib/seo";
import { ids } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

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
    /* Same @id the page's WebPage node points at as its breadcrumb. */
    "@id": ids.breadcrumb(trail[trail.length - 1].path),
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${canonicalPath(crumb.path)}`,
    })),
  };

  return <JsonLd data={data} />;
}
