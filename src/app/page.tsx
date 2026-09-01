import type { Metadata } from "next";
import { faqs } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { IntegrationStrip } from "@/components/home/integration-strip";
import { StatBand } from "@/components/home/stat-band";
import { ServicesBento } from "@/components/home/services-bento";
import { OnboardingTrack } from "@/components/home/onboarding-track";
import { PricingPreview } from "@/components/home/pricing-preview";
import { ContactSection } from "@/components/home/contact-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { Container, Heading, TextLink } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Zulaiz | Outsourced customer support for ecommerce",
  description:
    "Outsourced ecommerce customer support from $7 an hour. Named agents run your email, live chat, WISMO and returns inside your own helpdesk. Live in 7 days.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntegrationStrip />
      <StatBand />
      <ServicesBento />
      <PricingPreview />
      <OnboardingTrack />

      {/*
        Stacked rather than a left-heading split. The onboarding section above
        already uses that layout, and two in a row read as the same section
        twice.
      */}
      <section className="border-b border-line py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading className="max-w-[24ch]">
              The questions we get on every first call.
            </Heading>
            <TextLink href="/pricing">See all eight answers</TextLink>
          </div>
          <FaqAccordion items={faqs.slice(0, 6)} className="mt-12 max-w-[78ch]" />
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
