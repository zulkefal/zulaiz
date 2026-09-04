import { CTA } from "@/lib/site";
import { ButtonLink, Container, Heading } from "@/components/ui";

export function CtaBand({
  title = "Tell us what your inbox looks like.",
  body = "Thirty minutes and your recent tickets. You get an hours estimate priced from real volume, not a guess, and you keep it whether or not you hire us.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="accent-wash border-b border-line bg-sunken py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Heading className="max-w-[18ch]">{title}</Heading>
            <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-muted">
              {body}
            </p>
          </div>
          <ButtonLink href={CTA.primaryHref} className="shrink-0">
            {CTA.primary}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
