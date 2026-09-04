import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
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
import { Container, Heading } from "@/components/ui";

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

      <section
        className={`border-b border-line py-20 sm:py-24 ${
          parts.length ? "" : "bg-sunken"
        }`}
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Heading className="max-w-[14ch] lg:col-span-4">
              Before you ask.
            </Heading>
            <FaqAccordion items={service.faq} className="lg:col-span-8" />
          </div>
        </Container>
      </section>

      <CtaBand title={service.cta?.title} body={service.cta?.body} />
    </>
  );
}
