import Image from "next/image";
import { CTA } from "@/lib/site";
import { ButtonLink, Container, Heading } from "@/components/ui";

export function Hero() {
  return (
    <section className="accent-wash relative overflow-hidden border-b border-line">
      <Container className="pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Heading as="h1" size="xl" className="max-w-[20ch]">
              Support your shoppers and guests rate.
            </Heading>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
              Email, live chat, WISMO and guest messaging for ecommerce brands
              and rental hosts. From $4 an hour.
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
