import type { Metadata } from "next";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA, faqs, plans } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Heading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Monthly retainers based on ticket volume, channel mix and coverage hours. No per ticket pricing, no per ticket incentives.",
};

const priceDrivers = [
  {
    title: "Ticket volume",
    body: "The single biggest factor. We size the pod from your last three months, then agree what happens when a month runs 30% over.",
  },
  {
    title: "Coverage hours",
    body: "Business hours in one time zone costs less than weekends, and a lot less than around the clock. You pick the windows that match your traffic.",
  },
  {
    title: "Channel mix",
    body: "Email is the cheapest to staff. Live chat and voice need people on shift rather than in a queue, so they carry a higher seat cost.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Priced per month, not per ticket."
        lead="Paying by the ticket rewards whoever closes fastest. We would rather be paid to make your ticket count go down, so the retainer is fixed and the volume band is agreed up front."
      />

      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-5 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal
                key={plan.name}
                delay={i * 0.06}
                className={plan.featured ? "lg:-mt-6" : ""}
              >
                <div
                  className={`flex h-full flex-col rounded-card border p-7 ${
                    plan.featured
                      ? "accent-wash border-accent-line bg-raised lg:p-8"
                      : "border-line bg-raised"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold">{plan.name}</h2>
                    {plan.featured ? (
                      <span className="rounded-full border border-accent-line px-2.5 py-0.5 text-xs font-semibold text-accent">
                        Most brands start here
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 font-mono text-3xl font-medium tracking-tight">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-sm text-subtle">{plan.cadence}</p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {plan.blurb}
                  </p>

                  <dl className="mt-7 grid gap-3.5 border-t border-line pt-6 text-sm">
                    {(
                      [
                        ["Volume", plan.volume],
                        ["Channels", plan.channels],
                        ["Coverage", plan.coverage],
                        ["Team", plan.team],
                        ["Reporting", plan.reporting],
                      ] as const
                    ).map(([label, value]) => (
                      <div
                        key={label}
                        className="grid grid-cols-[6rem_1fr] items-baseline gap-3"
                      >
                        <dt className="text-subtle">{label}</dt>
                        <dd className="text-text">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 grid gap-2.5 text-sm">
                    {plan.extras.map((extra) => (
                      <li key={extra} className="flex gap-2.5">
                        <CheckIcon
                          weight="bold"
                          aria-hidden
                          className="mt-1 size-3.5 shrink-0 text-accent"
                        />
                        <span className="leading-relaxed text-muted">{extra}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={CTA.primaryHref}
                    variant={plan.featured ? "primary" : "secondary"}
                    className="mt-8 w-full"
                  >
                    {CTA.primary}
                  </ButtonLink>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 max-w-[70ch] text-sm leading-relaxed text-subtle">
            Prices exclude tax. Three month initial term, then rolling monthly
            with 30 days notice. Peak season staffing is quoted separately and
            agreed before the season starts.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Heading className="max-w-[15ch] lg:col-span-4">
              What moves the number.
            </Heading>
            <div className="lg:col-span-8">
              {priceDrivers.map((driver, i) => (
                <div
                  key={driver.title}
                  className={`py-6 ${i > 0 ? "border-t border-line" : "lg:pt-0"}`}
                >
                  <h3 className="text-lg font-semibold">{driver.title}</h3>
                  <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-muted">
                    {driver.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-20 sm:py-24">
        <Container>
          <Heading className="max-w-[16ch]">Everything else you asked.</Heading>
          <FaqAccordion items={faqs} className="mt-10 max-w-[75ch]" />
        </Container>
      </section>

      <CtaBand
        title="Not sure which band you land in?"
        body="Send us three months of ticket exports. We will tell you the pod size and the number, in writing, before you commit to anything."
      />
    </>
  );
}
