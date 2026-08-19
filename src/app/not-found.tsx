import { CTA } from "@/lib/site";
import { ButtonLink, Container, Heading } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="accent-wash py-28 sm:py-36">
      <Container>
        <p className="font-mono text-sm text-accent">404</p>
        <Heading as="h1" size="lg" className="mt-4 max-w-[16ch]">
          That page is not here.
        </Heading>
        <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted">
          The link may be old, or we moved something. The services overview is
          probably what you were after.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/services">See what we run</ButtonLink>
          <ButtonLink href={CTA.primaryHref} variant="secondary">
            {CTA.primary}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
