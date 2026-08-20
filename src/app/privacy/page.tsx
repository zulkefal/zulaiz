import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Zulaiz handles personal data belonging to visitors and to our clients' customers.",
  alternates: { canonical: "/privacy/" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="19 August 2026"
      sections={[
        {
          heading: "Who we are",
          prompt: "Your legal entity name, registered address, and the contact route for privacy questions.",
        },
        {
          heading: "Data we collect from this website",
          prompt: "Demo request form fields, any analytics you run, and cookies set on the site.",
        },
        {
          heading: "Data we process on behalf of clients",
          prompt: "Customer records we see inside client helpdesks, the lawful basis, and the fact that you act as a processor rather than a controller for it.",
        },
        {
          heading: "How long we keep it",
          prompt: "Retention periods per category, and what happens to client data when a contract ends.",
        },
        {
          heading: "Sub-processors",
          prompt: "The named third parties in your chain, including your email provider, helpdesk tooling and hosting.",
        },
        {
          heading: "Your rights",
          prompt: "Access, correction, deletion, portability and objection, plus how someone exercises them and how fast you respond.",
        },
        {
          heading: "International transfers",
          prompt: "Where your team works from, and the transfer mechanism you rely on for each region.",
        },
        {
          heading: "Contact",
          prompt: "The mailbox that receives privacy requests, and your supervisory authority if one applies.",
        },
      ]}
    />
  );
}
