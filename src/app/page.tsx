import { faqs } from "@/lib/site";
import { Hero } from "@/components/home/hero";
import { IntegrationStrip } from "@/components/home/integration-strip";
import { StatBand } from "@/components/home/stat-band";
import { ServicesBento } from "@/components/home/services-bento";
import { OnboardingTrack } from "@/components/home/onboarding-track";
import { Voices } from "@/components/home/voices";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBand } from "@/components/cta-band";
import { Container, Heading, TextLink } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntegrationStrip />
      <StatBand />
      <ServicesBento />
      <OnboardingTrack />
      <Voices />

      <section className="border-b border-line py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Heading className="max-w-[14ch]">
                The questions we get on every first call.
              </Heading>
              <TextLink href="/pricing" className="mt-6">
                See all eight answers
              </TextLink>
            </div>
            <FaqAccordion items={faqs.slice(0, 6)} className="lg:col-span-8" />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
