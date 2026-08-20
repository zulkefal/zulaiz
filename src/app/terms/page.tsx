import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms that govern use of the zulaiz.com website and the customer support services Zulaiz provides to clients.",
  alternates: { canonical: "/terms/" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="19 August 2026"
      sections={[
        {
          heading: "Scope",
          prompt: "What these terms cover: use of this website, and the separate service agreement that governs paid engagements.",
        },
        {
          heading: "Engagement and term",
          prompt: "The initial term, the notice period, and how renewal works.",
        },
        {
          heading: "Fees and payment",
          prompt: "Invoicing cadence, payment window, how booked hours are recorded and billed, what happens when hours run over, and late payment.",
        },
        {
          heading: "Service levels",
          prompt: "The response and quality targets you commit to, how they are measured, and the remedy when they are missed.",
        },
        {
          heading: "Client responsibilities",
          prompt: "System access, policy decisions, escalation contacts and anything you need from the client to hit the SLA.",
        },
        {
          heading: "Confidentiality and data",
          prompt: "Mutual confidentiality, and a pointer to the data processing agreement.",
        },
        {
          heading: "Liability",
          prompt: "Limitation and exclusion of liability, reviewed against your insurance cover.",
        },
        {
          heading: "Governing law",
          prompt: "The jurisdiction and the dispute resolution route.",
        },
      ]}
    />
  );
}
