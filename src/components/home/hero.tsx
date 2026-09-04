import Image from "next/image";
import { CTA, rate } from "@/lib/site";
import { ButtonLink, Container, Heading } from "@/components/ui";

export function Hero() {
  return (
    <section className="accent-wash relative overflow-hidden border-b border-line">
      <Container className="pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Heading as="h1" size="xl" className="max-w-[20ch]">
              We don’t just answer messages. We take care of people.
            </Heading>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
              Real people handling your emails, live chats, WISMO, guest
              messages and student enquiries, so your customers get the help
              they need without everything landing on your plate.
            </p>

            {/*
              The price is the strongest thing this page has to say, so it is
              display type rather than the tail of a sentence. The accent rule
              anchors it to the left margin so it reads as its own statement
              and not as a third paragraph. rate.amount keeps it in step with
              the pricing page.
            */}
            <p className="mt-8 flex items-baseline gap-3 border-l-2 border-accent pl-5">
              <span className="text-base font-medium text-muted">From</span>
              <span className="font-mono text-5xl font-semibold tracking-tight text-accent sm:text-6xl">
                {rate.amount}
              </span>
              <span className="text-lg font-medium text-muted">
                {rate.unit}
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={CTA.primaryHref}>{CTA.primary}</ButtonLink>
              <ButtonLink href={CTA.secondaryHref} variant="secondary">
                {CTA.secondary}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-line sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/hero-support-specialist.jpg"
                alt="A support specialist at a desk working through a customer queue"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
