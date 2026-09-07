import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { featuredServices, getService, partsOf, services, toolsNamed } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { ServiceIcon } from "@/components/service-icon";
import { ScrollCue } from "@/components/scroll-cue";
import { PageHeader } from "@/components/page-header";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBand } from "@/components/cta-band";
import { ToolsSection } from "@/components/tools-section";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Heading } from "@/components/ui";
import { CTA } from "@/lib/site";

export function generateStaticParams() {
  return featuredServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: service.metaDescription ?? service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const parent = service.parent
    ? services.find((s) => s.slug === service.parent)
    : undefined;
  const parts = partsOf(service);

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          ...(parent
            ? [{ name: parent.name, path: `/services/${parent.slug}` }]
            : []),
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      />
      <PageHeader
        title={service.name}
        lead={service.summary}
        aside={
          <dl className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
            {service.metrics.map((metric) => (
              <div
                key={metric.label}
                className="lg:grid lg:grid-cols-[6.5rem_1fr] lg:items-baseline lg:gap-4"
              >
                <dt className="font-mono text-xl font-medium tracking-tight text-accent">
                  {metric.value}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug text-muted lg:mt-0">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/*
        The banner keeps 21:9 on phones, where it ends above the fold. On
        laptops it is capped at 40% of the viewport so the section below
        starts on screen, and the pinned arrow below covers anyone it does
        not. The photographs put their subject in the left two-thirds and
        the middle band, so the shorter crop keeps what matters.
      */}
      {service.image ? (
        <div className="border-b border-line">
          <div className="relative aspect-[21/9] w-full lg:aspect-auto lg:h-[clamp(280px,40vh,520px)]">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      {/* Pinned to the screen, not the photo; slides away on first scroll. */}
      <ScrollCue target={parts.length ? "#inside" : "#how"} />

      {parts.length ? (
        <section id="inside" className="scroll-mt-20 border-b border-line bg-sunken pb-20 pt-14 sm:pb-24 sm:pt-16">
          <Container>
            <Heading className="max-w-[20ch]">
              Five jobs. One team, one rate.
            </Heading>
            <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted">
              One team covers all five, and you buy hours, not services. Start
              with the one that hurts most and add the rest whenever you are
              ready, at the same rate. Each has its own page for the detail.
            </p>
            {/*
              Parts with a page link to it; the two without one are described
              here in full, since this page is where they live now.
            */}
            {/* Three across, then two wider: five cards with no empty cell. */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {parts.map((part, i) => {
                const inner = (
                  <>
                    <ServiceIcon name={part.icon} className="size-6 text-accent" />
                    <h3 className="mt-4 text-lg font-semibold">{part.name}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {part.summary}
                    </p>
                    {part.featured ? (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        How we run it
                        <ArrowUpRightIcon
                          weight="bold"
                          className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    ) : null}
                  </>
                );
                const shell = `group flex h-full flex-col rounded-card border border-line bg-raised p-6 transition-colors duration-300 ${
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3"
                }`;
                return part.featured ? (
                  <Link
                    key={part.slug}
                    href={part.href}
                    className={`${shell} hover:border-accent-line`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={part.slug} id={part.slug} className={shell}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <section
        id="how"
        className={`scroll-mt-20 border-b border-line ${
          parts.length ? "py-20 sm:py-24" : "pb-20 pt-14 sm:pb-24 sm:pt-16"
        }`}
      >
        <Container>
          <Heading className="max-w-[18ch]">How the work actually runs.</Heading>
          <ol className="mt-10">
            {service.approach.map((phase, i) => (
              <Reveal
                key={phase.title}
                delay={i * 0.05}
                as="li"
                className={`grid gap-3 py-7 lg:grid-cols-12 lg:gap-10 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <h3 className="text-xl font-semibold lg:col-span-4">
                  {phase.title}
                </h3>
                <p className="max-w-[62ch] text-base leading-relaxed text-muted lg:col-span-8">
                  {phase.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section
        className={`border-b border-line py-20 sm:py-24 ${
          parts.length ? "" : "bg-sunken"
        }`}
      >
        <Container>
          <Heading className="max-w-[18ch]">What is included.</Heading>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-12">
            {service.scope.map((group) => (
              <div key={group.group}>
                <h3 className="text-sm font-semibold text-subtle">
                  {group.group}
                </h3>
                <ul className="mt-5 grid gap-4">
                  {group.items.map((item) => (
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
            ))}
          </div>
        </Container>
      </section>

      {/*
        Only this service's tools, so a course creator is not shown Guesty.
        Plain background between the sunken "What is included" and the
        sunken FAQ keeps the page alternating.
      */}
      {service.tools ? (
        <ToolsSection
          tools={toolsNamed(service.tools)}
          body={service.toolsNote}
          tone={parts.length ? "sunken" : "plain"}
        />
      ) : null}

      {/*
        A page with its own rate gets the pricing cards here, the same card
        anatomy and widths as the pricing page so the two read as one system.
        Rate and intro sit above; the three cards take the full width, which
        is what keeps the price, "a month" and the badge on one line each.
      */}
      {service.pricing ? (
        <section className="border-b border-line py-20 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-6xl font-medium tracking-tight text-accent sm:text-7xl">
                    {service.pricing.rate}
                  </span>
                  <span className="text-xl text-muted">{service.pricing.unit}</span>
                </div>
                <Heading className="mt-6 max-w-[18ch]">
                  One rate, three ways to buy it.
                </Heading>
              </div>
              <p className="max-w-[46ch] text-base leading-relaxed text-muted lg:pb-2">
                {service.pricing.intro}
              </p>
            </div>

            <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
              {service.pricing.tiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.06} className={tier.featured ? "lg:-mt-6" : ""}>
                  <div
                    className={`flex h-full flex-col rounded-card border p-7 transition-colors duration-300 sm:p-8 ${
                      tier.featured
                        ? "accent-wash border-accent-line bg-raised lg:pb-14"
                        : "border-line bg-raised hover:border-line-strong"
                    }`}
                  >
                    <div className="flex min-h-7 items-center justify-between gap-3">
                      <h3 className="text-base font-semibold">{tier.name}</h3>
                      {tier.badge ? (
                        <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-contrast">
                          {tier.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-7 flex items-baseline gap-2">
                      <span className="font-mono text-5xl font-medium tracking-tight">
                        {tier.monthly}
                      </span>
                      <span className="whitespace-nowrap text-sm text-subtle">a month</span>
                    </p>
                    <div className="mt-5 border-t border-line pt-5">
                      <p className="text-base font-medium text-text">{tier.measure}</p>
                      <p className="mt-1 text-sm text-subtle">{tier.equivalent}</p>
                      {tier.bonus ? (
                        <p className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                          {tier.bonus}
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-subtle">{tier.suits}</p>
                    <ButtonLink
                      href={CTA.primaryHref}
                      variant={tier.featured ? "primary" : "secondary"}
                      className="mt-8 w-full"
                    >
                      {CTA.primary}
                    </ButtonLink>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 max-w-[74ch] text-sm leading-relaxed text-subtle">
              {service.pricing.note}
            </p>
          </Container>
        </section>
      ) : null}

      {/* Sunken on every page: it follows either the orbit or the pricing
          cards, both of which sit on the plain background. */}
      <section className="border-b border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Heading className="max-w-[14ch] lg:col-span-4">
              Before you ask.
            </Heading>
            <FaqAccordion items={service.faq} className="lg:col-span-8" />
          </div>
        </Container>
      </section>

      {service.related ? (
        <section className="border-b border-line py-16 sm:py-20">
          <Container>
            <div className="flex flex-col items-start gap-6 rounded-card border border-line bg-raised p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h2 className="text-xl font-semibold">{service.related.title}</h2>
                <p className="mt-2.5 max-w-[60ch] text-base leading-relaxed text-muted">
                  {service.related.body}
                </p>
              </div>
              <Link
                href={service.related.href}
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
              >
                {service.related.label}
                <ArrowRightIcon
                  weight="bold"
                  className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand title={service.cta?.title} body={service.cta?.body} />
    </>
  );
}
