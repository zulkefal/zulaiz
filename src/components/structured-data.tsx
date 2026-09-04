import { site } from "@/lib/site";

/*
  Organization schema, so a search for the brand name has something machine
  readable to attach to rather than only prose. JSON-LD is data, not an
  executable script, which is why it is safe to render from a component.
*/
export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/icon1.png`,
    image: `${site.url}/images/og.jpg`,
    description: site.description,
    email: site.email,
    sameAs: [site.social.linkedin, site.social.instagram],
    areaServed: "Worldwide",
    knowsAbout: [
      "Ecommerce customer support",
      "Live chat support",
      "Order tracking and WISMO",
      "Returns and exchanges",
      "Short-term rental guest communication",
      "Student and member support",
      "Virtual Assistance and back-office admin",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}
