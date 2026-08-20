import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA, commitments, faqs, included, rate, rateNotes, ticketBundle } from "@/lib/site";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Heading } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Four dollars an hour, one rate for every channel. Hours a week from $160 a month, or a fixed 500 ticket bundle at $200.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      {/* The rate is the whole pitch, so it gets the hero rather than a table. */}
      <section className="accent-wash border-b border-line py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-6xl font-medium tracking-tight text-accent sm:text-7xl">
                  {rate.amount}
                </span>
                <span className="text-xl text-muted">{rate.unit}</span>
              </div>
              <Heading as="h1" size="lg" className="mt-6 max-w-[18ch]">
                One rate, three ways to buy it.
              </Heading>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
                Every channel bills at the same rate. Buy it as hours a week or
                as a fixed bundle of tickets, and change that when it changes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={CTA.primaryHref}>{CTA.primary}</ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-sm font-semibold text-text">
                Included at every hour
              </h2>
              <ul className="mt-5 grid gap-3.5">
                {included.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon
                      weight="bold"
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-accent"
                    />
                    <span className="text-base leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <Heading className="max-w-[22ch]">
            What that looks like in practice.
          </Heading>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted">
            The same rate, packaged three ways. Most brands land on Standard,
            which bills 80 hours and delivers 100.
          </p>

          {/*
            Separate cards with the featured one lifted, rather than one joined
            grid. items-stretch keeps the three the same height so the buttons
            line up, and mt-auto pins each button to the bottom regardless of
            how much copy sits above it.
          */}
          <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <Reveal
                key={c.name}
                delay={i * 0.06}
                className={c.featured ? "lg:-mt-6" : ""}
              >
                <div
                  className={`flex h-full flex-col rounded-card border p-7 transition-colors duration-300 sm:p-8 ${
                    c.featured
                      ? "accent-wash border-accent-line bg-raised lg:pb-14"
                      : "border-line bg-raised hover:border-line-strong"
                  }`}
                >
                  <div className="flex min-h-7 items-center justify-between gap-3">
                    <h3 className="text-base font-semibold">{c.name}</h3>
                    {c.badge ? (
                      <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-contrast">
                        {c.badge}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-7 flex items-baseline gap-2">
                    <span className="font-mono text-5xl font-medium tracking-tight">
                      {c.monthly}
                    </span>
                    <span className="text-sm text-subtle">a month</span>
                  </p>

                  <div className="mt-5 border-t border-line pt-5">
                    <p className="text-base font-medium text-text">{c.measure}</p>
                    <p className="mt-1 text-sm text-subtle">{c.equivalent}</p>
                    {c.bonus ? (
                      <p className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                        {c.bonus}
                      </p>
                    ) : null}
                  </div>

                  <ul className="mt-6 grid gap-3">
                    {c.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <CheckIcon
                          weight="bold"
                          aria-hidden
                          className="mt-1 size-3.5 shrink-0 text-accent"
                        />
                        <span className="text-sm leading-relaxed text-muted">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm leading-relaxed text-subtle">
                    {c.suits}
                  </p>

                  <ButtonLink
                    href={CTA.primaryHref}
                    variant={c.featured ? "primary" : "secondary"}
                    className="mt-8 w-full"
                  >
                    {CTA.primary}
                  </ButtonLink>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start gap-6 rounded-card border border-line bg-raised p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-xl font-semibold">{ticketBundle.name}</h3>
                <span className="font-mono text-2xl font-medium tracking-tight">
                  {ticketBundle.monthly}
                </span>
                <span className="text-sm text-subtle">
                  a month, {ticketBundle.equivalent}
                </span>
              </div>
              <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
                {ticketBundle.body}
              </p>
            </div>
            <ButtonLink
              href={CTA.primaryHref}
              variant="secondary"
              className="shrink-0"
            >
              {CTA.primary}
            </ButtonLink>
          </div>

          <p className="mt-8 max-w-[74ch] text-sm leading-relaxed text-subtle">
            Every figure above is the hourly rate times the hours involved, so
            nothing is a made up band. Prices exclude tax. Three month initial
            term, then rolling monthly with 30 days notice, and you can move
            between the three at any point.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Heading className="max-w-[15ch] lg:col-span-4">
              Why it is priced this way.
            </Heading>
            <div className="lg:col-span-8">
              {rateNotes.map((note, i) => (
                <div
                  key={note.title}
                  className={`py-6 ${i > 0 ? "border-t border-line" : "lg:pt-0"}`}
                >
                  <h3 className="text-lg font-semibold">{note.title}</h3>
                  <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-muted">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-card border border-line bg-raised p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="text-xl font-semibold">
                Around the clock, multi brand or multi language?
              </h2>
              <p className="mt-2.5 max-w-[60ch] text-base leading-relaxed text-muted">
                Coverage that never sleeps needs enough agents to rotate through
                the night, so it is quoted rather than listed. Contractual SLAs,
                a named account manager, security review, DPA and BAA are all on
                the table.
              </p>
            </div>
            <ButtonLink
              href={CTA.primaryHref}
              variant="secondary"
              className="shrink-0"
            >
              {CTA.primary}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-20 sm:py-24">
        <Container>
          <Heading className="max-w-[16ch]">Everything else you asked.</Heading>
          <FaqAccordion items={faqs} className="mt-10 max-w-[78ch]" />
        </Container>
      </section>

      <CtaBand
        title="Not sure how many hours you need?"
        body="Send us three months of ticket exports. We will come back with an hours estimate and what it costs, in writing, before you commit to anything."
      />
    </>
  );
}
