import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { additionalServices, featuredServices, tools } from "@/lib/site";
import { ToolsSection } from "@/components/tools-section";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal } from "@/components/reveal";
import { Container, Heading } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Six support services run by named agents inside your helpdesk: email, live chat, WISMO, returns, guest messaging and social. One rate, $7 an hour.",
  path: "/services",
});

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
        title="Seven services. One team that knows your business."
        lead="Start with the channel that hurts most. Ecommerce brands usually begin with WISMO or email, rental hosts with guest messaging, and course creators with student enquiries."
      />

      {/* Grouped rows rather than tiles: the numbers are the argument here. */}
      <section className="border-b border-line">
        <Container>
          {featuredServices.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.05}>
              <article
                className={`grid gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <div className="lg:col-span-6">
                  <ServiceIcon name={service.icon} className="size-7 text-accent" />
                  <Heading as="h2" size="md" className="mt-4">
                    {service.name}
                  </Heading>
                  <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-muted">
                    {service.summary}
                  </p>
                  <Link
                    href={service.href}
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
                  {service.metrics.map((metric) => (
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
          ))}
        </Container>
      </section>

      <section className="border-b border-line py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Heading className="max-w-[16ch] lg:col-span-4">
              Bolt these on when you need them.
            </Heading>
            <div className="lg:col-span-8">
              {additionalServices.map((service, i) => (
                <article
                  key={service.slug}
                  id={service.slug}
                  className={`scroll-mt-28 grid grid-cols-[2rem_1fr] gap-5 py-7 ${
                    i > 0 ? "border-t border-line" : "lg:pt-0"
                  }`}
                >
                  <ServiceIcon
                    name={service.icon}
                    className="mt-1 size-6 text-accent"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="mt-2 max-w-[56ch] text-base leading-relaxed text-muted">
                      {service.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ToolsSection tools={tools.filter((t) => t.orbit)} />

      <CtaBand />
    </>
  );
}
