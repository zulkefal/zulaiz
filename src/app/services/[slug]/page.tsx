import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { featuredServices, getService } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBand } from "@/components/cta-band";
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

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
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

      {service.image ? (
        <div className="border-b border-line">
          <div className="relative aspect-[21/9] w-full">
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

      <section className="border-b border-line py-20 sm:py-24">
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

      <section className="border-b border-line bg-sunken py-20 sm:py-24">
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

      <section className="border-b border-line py-20 sm:py-24">
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
