import { ClockIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { callExpectations, site } from "@/lib/site";
import { DemoForm } from "@/components/demo-form";
import { Container, Heading } from "@/components/ui";

/*
  The form itself rather than another button to a form. It sits where the
  closing CTA band used to, so there is still exactly one contact intent on
  the page.
*/
export function ContactSection() {
  return (
    <section id="contact" className="accent-wash scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Heading className="max-w-[18ch]">
              Tell us what your inbox looks like.
            </Heading>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
              Thirty minutes, a real read on your volume, and an hours estimate
              you can keep whether or not you hire us.
            </p>
            <div className="mt-10 rounded-card border border-line bg-raised p-6 sm:p-8">
              <DemoForm />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h3 className="text-lg font-semibold">What you get on the call</h3>
              <ul className="mt-5 grid gap-4">
                {callExpectations.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line pt-4 text-base leading-relaxed text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-4 border-t border-line pt-8">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-base text-muted transition-colors hover:text-accent"
                >
                  <EnvelopeSimpleIcon
                    weight="duotone"
                    aria-hidden
                    className="size-5 text-accent"
                  />
                  {site.email}
                </a>
                <p className="flex items-center gap-3 text-base text-muted">
                  <ClockIcon
                    weight="duotone"
                    aria-hidden
                    className="size-5 text-accent"
                  />
                  Replies within one business day
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
