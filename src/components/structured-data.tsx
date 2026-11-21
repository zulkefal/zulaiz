import { organizationGraph } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

/*
  The Organization and WebSite entities, on every page. Each page adds its
  own WebPage, Service or FAQPage nodes that point back at these by @id.
  The logo was previously /icon1.png, which does not exist on the deployed
  site and returned a 404 to Google.
*/
export function StructuredData() {
  return <JsonLd data={organizationGraph()} />;
}
