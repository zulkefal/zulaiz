import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { doorsFor, markets, partsOf } from "@/lib/site";
import { Container, Eyebrow, Heading, TextLink } from "@/components/ui";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal } from "@/components/reveal";

/*
  Six doors grouped by kind of customer, rather than a menu of channels.
  The ecommerce door is the lead tile with the photograph and carries its
  five parts as small links, because a store needs all of them at once.
  Beside it, rentals and courses; beneath, the three for everyone. The grid
  stays exact: 18 units across three full rows of six, with no empty cell.
*/
const layout: Record<string, string> = {
  "ecommerce-support": "lg:col-span-4 lg:row-span-2",
  "guest-communication": "lg:col-span-2",
  "student-support": "lg:col-span-2",
  "email-support": "lg:col-span-2",
  "live-chat": "lg:col-span-2",
  "virtual-assistance": "lg:col-span-2",
};

export function ServicesBento() {
  const doors = markets.flatMap((m) => doorsFor(m).map((d) => ({ door: d, label: m.label })));
  const [{ door: lead }, ...rest] = doors;
  const parts = partsOf(lead);

  return (
    <section id="services" className="border-b border-line py-24 sm:py-32">
      <Container>
        <Eyebrow>What we run</Eyebrow>
        <Heading className="mt-4 max-w-[20ch]">
          Support shaped to your kind of business.
        </Heading>

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {/* Lead tile: ecommerce, with the photograph and its parts. */}
          <Reveal className={layout[lead.slug]}>
            <div className="group relative flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-card border border-line p-7">
              <Image
                src={lead.tileImage!.src}
                alt={lead.tileImage!.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/94 via-[#0c0e12]/72 to-[#0c0e12]/20" />
              <div className="relative">
                <ServiceIcon name={lead.icon} className="size-7 text-[#e78350]" />
                <h3 className="mt-4 text-2xl font-semibold text-[#edeff2]">
                  <Link href={lead.href} className="after:absolute after:inset-0">
                    {lead.name}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-[#c3c9d2]">
                  {lead.summary}
                </p>
                {/*
                  The parts as pills. They sit above the tile-wide link
                  (relative + z) so each is its own target.
                */}
                <ul className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {parts.map((part) => (
                    <li key={part.slug}>
                      <Link
                        href={part.href}
                        className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-[#edeff2] backdrop-blur transition-colors hover:bg-white/20"
                      >
                        {part.navLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#e78350]">
                  How we run it
                  <ArrowUpRightIcon
                    weight="bold"
                    className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </div>
          </Reveal>

          {rest.map(({ door, label }, i) => (
            <Reveal
              key={door.slug}
              delay={0.05 + i * 0.05}
              className={layout[door.slug]}
            >
              <Link
                href={door.href}
                className={`group flex h-full flex-col rounded-card border border-line bg-raised p-6 transition-colors duration-300 hover:border-accent-line ${
                  i === rest.length - 1 ? "accent-wash" : ""
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {label}
                </p>
                <ServiceIcon name={door.icon} className="mt-4 size-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold">{door.name}</h3>
                <p className="mt-2.5 max-w-[56ch] text-sm leading-relaxed text-muted">
                  {door.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  How we run it
                  <ArrowUpRightIcon
                    weight="bold"
                    className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <TextLink href="/services">See every service</TextLink>
        </div>
      </Container>
    </section>
  );
}
