import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ClockIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { callExpectations, site } from "@/lib/site";
import { DemoForm } from "@/components/demo-form";
import { Container, Heading } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Book a demo",
  description:
    "Thirty minutes on your volume, channels and tooling. You leave with a staffing and cost estimate whether or not you hire us.",
  path: "/contact",
});


export default function ContactPage() {
  return (
    <section className="accent-wash py-16 sm:py-20">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Heading as="h1" size="lg" className="max-w-[18ch]">
              Book a demo
            </Heading>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">
              Tell us what your inbox looks like today. We reply within one
              business day with times that work.
            </p>
            <div className="mt-10 rounded-card border border-line bg-raised p-6 sm:p-8">
              <DemoForm />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">What you get on the call</h2>
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
                  className="group flex items-center gap-3 text-base text-muted transition-colors hover:text-accent"
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
