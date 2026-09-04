import { CTA, onboarding } from "@/lib/site";
import { ButtonLink, Container, Heading } from "@/components/ui";
import { Reveal } from "@/components/reveal";

/*
  Sticky left column, scrolling right column. The heading stays put while the
  four moves pass it, which is the point being made: this is a sequence.
*/
export function OnboardingTrack() {
  return (
    <section className="border-b border-line bg-sunken py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Heading className="max-w-[16ch]">
                Two days from call to live queue.
              </Heading>
              <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-muted">
                No six week discovery phase. We read your tickets, write the
                playbook with you, and take the queue.
              </p>
              <ButtonLink href={CTA.primaryHref} className="mt-8">
                {CTA.primary}
              </ButtonLink>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {onboarding.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.05}
                as="li"
                className={`grid grid-cols-[2.5rem_1fr] gap-5 py-7 ${
                  i > 0 ? "border-t border-line" : "lg:pt-0"
                }`}
              >
                <span
                  aria-hidden
                  className="font-mono text-sm text-subtle tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2.5 max-w-[52ch] text-base leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
