import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { doorsFor, markets, partsOf, tools } from "@/lib/site";
import { ToolsSection } from "@/components/tools-section";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal } from "@/components/reveal";
import { Container, Heading } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Customer support for ecommerce brands, rental hosts and course creators, plus Virtual Assistance for the admin. Named human agents in your tools, $7 an hour.",
  path: "/services",
});

/*
  Organised by who the customer is, not by channel. Ecommerce, rentals and
  courses each get one door: a bundle that covers everything that customer
  needs, at the same rate. "For everyone" holds the channels any business
  uses, email and live chat, plus Virtual Assistance. The ecommerce door
  has five parts underneath it, because a store needs all of them at once
  and should not have to pick from a menu. Parts with their own page link
  to it; the two without one live here, with the anchors older links still
  point at.
*/
export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <PageHeader
        title="Support shaped to who your customers are."
        lead="One team for ecommerce brands, one for rental hosts, one for course creators, and Virtual Assistance for anyone drowning in admin. Each covers every channel that customer uses, at one rate."
      />

      {markets.map((market, mi) => {
        const doors = doorsFor(market);
        return (
          <section
            key={market.id}
            id={market.id}
            className={`scroll-mt-24 border-b border-line py-16 sm:py-20 ${
              mi % 2 === 1 ? "bg-sunken" : ""
            }`}
          >
            <Container>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {market.label}
              </p>

              {doors.map((door, di) => {
                const parts = partsOf(door);
                return (
                  <div key={door.slug} className={di > 0 ? "mt-10 border-t border-line pt-10" : ""}>
              <Reveal>
                <article className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-6">
                    <ServiceIcon name={door.icon} className="size-7 text-accent" />
                    <Heading as="h2" size="md" className="mt-4">
                      {door.name}
                    </Heading>
                    <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-muted">
                      {door.summary}
                    </p>
                    <Link
                      href={door.href}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
                    >
                      How we run it
                      <ArrowRightIcon
                        weight="bold"
                        className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
                      />
                    </Link>
                  </div>

                  <dl className="grid gap-6 sm:grid-cols-3 lg:col-span-6">
                    {door.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="sr-only">{metric.label}</dt>
                        <dd>
                          <span className="block font-mono text-2xl font-medium tracking-tight">
                            {metric.value}
                          </span>
                          <span className="mt-2 block text-sm leading-snug text-muted">
                            {metric.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>

              {parts.length ? (
                <div className="mt-12 border-t border-line pt-10">
                  <h3 className="text-sm font-semibold text-subtle">
                    What is inside, all at one rate
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {parts.map((part, i) => {
                      const inner = (
                        <>
                          <ServiceIcon name={part.icon} className="size-5 text-accent" />
                          <h4 className="mt-3 text-base font-semibold">{part.name}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {part.summary}
                          </p>
                          {part.featured ? (
                            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                              Detail
                              <ArrowUpRightIcon
                                weight="bold"
                                className="size-3.5 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </span>
                          ) : null}
                        </>
                      );
                      const shell =
                        "group flex h-full flex-col rounded-card border border-line bg-raised p-5 transition-colors duration-300";
                      return (
                        <Reveal key={part.slug} delay={0.05 + i * 0.04}>
                          {part.featured ? (
                            <Link href={part.href} className={`${shell} hover:border-accent-line`}>
                              {inner}
                            </Link>
                          ) : (
                            <div id={part.slug} className={`${shell} scroll-mt-28`}>
                              {inner}
                            </div>
                          )}
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              ) : null}
                  </div>
                );
              })}
            </Container>
          </section>
        );
      })}

      <ToolsSection tools={tools.filter((t) => t.orbit)} />

      <CtaBand />
    </>
  );
}
