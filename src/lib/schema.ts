import { commitments, markets, rate, site, ticketBundle, type Service } from "@/lib/site";
import { canonicalPath } from "@/lib/seo";

/*
  Structured data for the whole site, built as one entity graph.

  Every entity gets a stable @id, so the Organization declared once in the
  root layout is the same node that each page's WebPage, Service and
  FAQPage point at. Google and other parsers merge nodes by @id across
  blocks on a page, which is what turns a pile of separate snippets into
  "this page is about this service, provided by this company".
*/

export const absoluteUrl = (path: string) => `${site.url}${canonicalPath(path)}`;

export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  logo: `${site.url}/#logo`,
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
  service: (path: string) => `${absoluteUrl(path)}#service`,
  faq: (path: string) => `${absoluteUrl(path)}#faq`,
};

const context = "https://schema.org";

/* The site-wide pair: who runs it, and the site itself. */
export function organizationGraph() {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "Organization",
        "@id": ids.organization,
        name: site.name,
        url: `${site.url}/`,
        logo: {
          "@type": "ImageObject",
          "@id": ids.logo,
          url: `${site.url}/apple-touch-icon.png`,
          width: 180,
          height: 180,
          caption: site.name,
        },
        image: { "@id": ids.logo },
        description: site.description,
        email: site.email,
        foundingDate: "2019",
        numberOfEmployees: { "@type": "QuantitativeValue", value: 60 },
        sameAs: [site.social.linkedin, site.social.instagram],
        areaServed: { "@type": "Place", name: "Worldwide" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          url: absoluteUrl("/contact"),
          availableLanguage: ["English"],
        },
        knowsAbout: [
          "Customer support outsourcing",
          "Ecommerce customer support",
          "Shopify customer service",
          "Live chat support",
          "Email support",
          "Order tracking and WISMO",
          "Returns and exchanges",
          "Short-term rental guest communication",
          "Airbnb guest messaging",
          "Student and member support",
          "Virtual assistance",
          "Virtual assistance for notaries and signing agents",
          "Virtual assistance for real estate agents",
        ],
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: `${site.url}/`,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": ids.organization },
      },
    ],
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

/* The page node. Ties the URL to the site, the company and its breadcrumb. */
export function webPageNode({
  path,
  name,
  description,
  type = "WebPage",
  image,
  hasBreadcrumb = true,
  mainEntity,
}: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  image?: string;
  hasBreadcrumb?: boolean;
  mainEntity?: string;
}) {
  return {
    "@type": type,
    "@id": ids.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
    publisher: { "@id": ids.organization },
    ...(image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}${image}` } }
      : {}),
    ...(hasBreadcrumb ? { breadcrumb: { "@id": ids.breadcrumb(path) } } : {}),
    ...(mainEntity ? { mainEntity: { "@id": mainEntity } } : {}),
  };
}

/* Must mirror the questions visibly rendered on the same page. */
export function faqNode(path: string, items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": ids.faq(path),
    url: absoluteUrl(path),
    isPartOf: { "@id": ids.webpage(path) },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/* "$10" -> "10". The site writes prices for people; schema wants numbers. */
const amount = (price: string) => price.replace(/[^0-9.]/g, "");

function hourlyOffer(path: string, price: string) {
  return {
    "@type": "Offer",
    url: absoluteUrl(path),
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: amount(price),
      priceCurrency: "USD",
      unitCode: "HUR",
      unitText: "hour",
    },
  };
}

/* One Service entity per service page, offered by the Organization. */
export function serviceNode(service: Service) {
  const path = `/services/${service.slug}`;
  const market = markets.find((m) => m.id === service.market);
  return {
    "@type": "Service",
    "@id": ids.service(path),
    name: service.seoTitle ?? service.name,
    alternateName: service.name,
    serviceType: service.name,
    description: service.metaDescription ?? service.summary,
    url: absoluteUrl(path),
    ...(service.image ? { image: `${site.url}${service.image.src}` } : {}),
    provider: { "@id": ids.organization },
    brand: { "@id": ids.organization },
    areaServed: { "@type": "Place", name: "Worldwide" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/contact"),
      availableLanguage: "English",
    },
    ...(market
      ? {
          audience: {
            "@type": "BusinessAudience",
            audienceType: market.label.replace(/^For /, ""),
          },
        }
      : {}),
    ...(service.tools?.length ? { knowsAbout: service.tools } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} scope`,
      itemListElement: service.scope.map((group) => ({
        "@type": "OfferCatalog",
        name: group.group,
        itemListElement: group.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item },
        })),
      })),
    },
    offers: hourlyOffer(path, service.pricing?.rate ?? rate.amount),
  };
}

/* The pricing page: the core service with every package as an Offer. */
export function pricingServiceNode() {
  const path = "/pricing";
  const packages = [
    ...commitments.map((c) => ({ name: c.name, monthly: c.monthly, note: `${c.measure}, ${c.equivalent}` })),
    { name: ticketBundle.name, monthly: ticketBundle.monthly, note: `${ticketBundle.measure}, ${ticketBundle.equivalent}` },
  ];
  return {
    "@type": "Service",
    "@id": ids.service(path),
    name: "Outsourced customer support",
    serviceType: "Customer support outsourcing",
    url: absoluteUrl(path),
    provider: { "@id": ids.organization },
    areaServed: { "@type": "Place", name: "Worldwide" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...packages.map((p) => Number(amount(p.monthly)))),
      highPrice: Math.max(...packages.map((p) => Number(amount(p.monthly)))),
      offerCount: packages.length,
      offers: packages.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.note,
        url: absoluteUrl(path),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: amount(p.monthly),
          priceCurrency: "USD",
          unitCode: "MON",
          unitText: "month",
        },
      })),
    },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": context, "@graph": nodes };
}
