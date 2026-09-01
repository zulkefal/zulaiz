import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/lib/site";
import { Container, Eyebrow, Heading, TextLink } from "@/components/ui";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal } from "@/components/reveal";

/*
  Seven services, seven cells. Sizes vary deliberately, and the grid stays
  exact: 24 units across four full rows of six, with no empty cell.
*/
const layout: Record<string, string> = {
  wismo: "lg:col-span-4 lg:row-span-2",
  "email-support": "lg:col-span-2",
  "live-chat": "lg:col-span-2",
  "returns-and-exchanges": "lg:col-span-2",
  "guest-communication": "lg:col-span-2",
  "student-support": "lg:col-span-2",
  "reviews-and-social": "lg:col-span-6",
};

export function ServicesBento() {
  const [wismo, ...rest] = [
    services.find((s) => s.slug === "wismo")!,
    ...services.filter((s) => s.slug !== "wismo"),
  ];

  return (
    <section id="services" className="border-b border-line py-24 sm:py-32">
      <Container>
        <Eyebrow>What we run</Eyebrow>
        <Heading className="mt-4 max-w-[20ch]">
          Every channel your customers actually use.
        </Heading>

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {/* Lead tile: the biggest driver, with the photograph. */}
          <Reveal className={layout[wismo.slug]}>
            <Link
              href={wismo.href}
              className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-card border border-line p-7"
            >
              <Image
                src={wismo.tileImage!.src}
                alt={wismo.tileImage!.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/92 via-[#0c0e12]/70 to-[#0c0e12]/20" />
              <div className="relative">
                <ServiceIcon name={wismo.icon} className="size-7 text-[#e78350]" />
                <h3 className="mt-4 text-2xl font-semibold text-[#edeff2]">
                  {wismo.name}
                </h3>
                <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[#c3c9d2]">
                  {wismo.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#e78350]">
                  How we run it
                  <ArrowUpRightIcon
                    weight="bold"
                    className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          {rest.map((service, i) => {
            const tinted = i === 0 || i === rest.length - 1;
            const inner = (
              <>
                <ServiceIcon name={service.icon} className="size-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold">{service.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {service.summary}
                </p>
                {service.featured ? (
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
              tinted ? "accent-wash" : ""
            }`;

            return (
              <Reveal
                key={service.slug}
                delay={0.05 + i * 0.05}
                className={layout[service.slug]}
              >
                {service.featured ? (
                  <Link
                    href={service.href}
                    className={`${shell} hover:border-accent-line`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={shell}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10">
          <TextLink href="/services">See every service</TextLink>
        </div>
      </Container>
    </section>
  );
}
