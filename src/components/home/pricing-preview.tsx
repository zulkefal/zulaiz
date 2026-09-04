import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA, commitments, rate } from "@/lib/site";
import { ButtonLink, Container, Heading, TextLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

/*
  The featured plan is deliberately larger than its neighbours rather than just
  tinted: negative vertical margins push it past the top and bottom of the row,
  and the extra padding makes it physically taller. Scaling with transform was
  the other option and it blurs text, so the size difference is real geometry.
*/
export function PricingPreview() {
  return (
    <section className="border-b border-line py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading className="max-w-[20ch]">
              {rate.amount} {rate.unit}. That is the whole price list.
            </Heading>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
              One rate for every channel, and for the back office too. Standard
              pays for 80 hours and gets 100, and you can start with a two-week
              pilot before committing to anything.
            </p>
          </div>
          <TextLink href="/pricing">See what moves the number</TextLink>
        </div>

        <div className="mt-14 grid items-stretch gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {commitments.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 0.06}
              className={c.featured ? "lg:-my-8" : ""}
            >
              <div
                className={`flex h-full flex-col rounded-card border transition-colors duration-300 ${
                  c.featured
                    ? "accent-wash border-accent-line bg-raised p-8 shadow-[0_28px_70px_-30px_hsl(var(--shadow-tint)/0.5)] sm:p-10 lg:py-14"
                    : "border-line bg-raised p-7 hover:border-line-strong sm:p-8"
                }`}
              >
                <div className="flex min-h-8 flex-wrap items-center gap-3">
                  <h3
                    className={`font-semibold ${
                      c.featured ? "text-xl" : "text-base"
                    }`}
                  >
                    {c.name}
                  </h3>
                  {c.badge ? (
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-contrast">
                      {c.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-7 flex items-baseline gap-2">
                  <span
                    className={`font-mono font-medium tracking-tight ${
                      c.featured ? "text-6xl sm:text-7xl" : "text-4xl"
                    }`}
                  >
                    {c.monthly}
                  </span>
                  <span className="text-sm text-subtle">a month</span>
                </p>

                <div className="mt-6 border-t border-line pt-5">
                  <p
                    className={`font-medium text-text ${
                      c.featured ? "text-lg" : "text-base"
                    }`}
                  >
                    {c.measure}
                  </p>
                  <p className="mt-1 text-sm text-subtle">{c.equivalent}</p>
                  {c.bonus ? (
                    <p className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                      {c.bonus}
                    </p>
                  ) : null}
                </div>

                <ul className="mt-6 grid gap-3">
                  {c.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <CheckIcon
                        weight="bold"
                        aria-hidden
                        className="mt-1 size-3.5 shrink-0 text-accent"
                      />
                      <span
                        className={`leading-relaxed text-muted ${
                          c.featured ? "text-base" : "text-sm"
                        }`}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={CTA.primaryHref}
                  variant={c.featured ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {CTA.primary}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
