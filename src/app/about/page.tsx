import type { Metadata } from "next";
import Image from "next/image";
import { differentiators, teamFacts } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { Container, Heading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zulaiz has run ecommerce support since 2019. Named pods, your helpdesk, and a mandate to make your ticket count go down.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="The support team we wanted to hire."
        lead="Two of us ran support at DTC brands and kept hiring agencies that treated replies as piecework. So we built the alternative."
        aside={
          <dl className="grid gap-6 sm:grid-cols-3 lg:gap-5">
            {teamFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block font-mono text-2xl font-medium tracking-tight text-accent">
                    {fact.value}
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-muted">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="border-b border-line py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line lg:col-span-5">
              <Image
                src="/images/about-team.jpg"
                alt="Four colleagues around a table, one showing something on a laptop"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7">
              <Heading className="max-w-[20ch]">
                Support is an operations problem wearing a customer service hat.
              </Heading>
              <div className="mt-6 grid max-w-[62ch] gap-4 text-base leading-relaxed text-muted">
                <p>
                  Most support agencies are paid to answer tickets, so they
                  optimise for reply speed and nothing else. The queue never
                  shrinks, because nobody upstream ever hears why it exists.
                </p>
                <p>
                  We do the same job from the other end. Agents answer fast, and
                  the team lead brings the recurring drivers back to your ops,
                  product and merchandising people every month with a
                  recommendation attached.
                </p>
                <p>
                  It is slower to set up and cheaper to keep. Brands that stay
                  with us past a year usually have a smaller inbox than the day
                  they started.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Heading className="max-w-[16ch]">How we are different in practice.</Heading>
          <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="grid grid-cols-[2.25rem_1fr] gap-4">
                  <span
                    aria-hidden
                    className="font-mono text-sm text-subtle tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Come and check the claims."
        body="Ask us for a reference call with a brand your size. We will set it up, and we will not sit in on it."
      />
    </>
  );
}
