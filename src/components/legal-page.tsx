import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { Container, Heading } from "@/components/ui";

/*
  Structural scaffold only. The headings are the sections a policy of this kind
  needs, and the notice stays visible until real reviewed copy replaces them.
*/
export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; prompt: string }[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Heading as="h1" size="lg" className="max-w-[20ch]">
          {title}
        </Heading>
        <p className="mt-4 font-mono text-sm text-subtle">
          Last updated {updated}
        </p>

        <p className="mt-8 flex max-w-[70ch] items-start gap-3 rounded-card border border-accent-line bg-accent-soft p-5 text-sm leading-relaxed text-text">
          <WarningCircleIcon
            weight="fill"
            aria-hidden
            className="mt-0.5 size-5 shrink-0 text-accent"
          />
          <span>
            This page is a scaffold, not a policy. Replace each section below
            with copy your legal advisor has reviewed before the site goes live.
          </span>
        </p>

        <div className="mt-12 max-w-[70ch]">
          {sections.map((section, i) => (
            <div
              key={section.heading}
              className={`py-7 ${i > 0 ? "border-t border-line" : ""}`}
            >
              <h2 className="text-lg font-semibold">{section.heading}</h2>
              <p className="mt-2.5 text-base leading-relaxed text-muted">
                {section.prompt}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
