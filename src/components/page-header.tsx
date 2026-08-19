import type { ReactNode } from "react";
import { Container, Heading } from "@/components/ui";

export function PageHeader({
  title,
  lead,
  aside,
}: {
  title: string;
  lead: string;
  aside?: ReactNode;
}) {
  return (
    <section className="accent-wash border-b border-line py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
            <Heading as="h1" size="xl" className="max-w-[17ch]">
              {title}
            </Heading>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">
              {lead}
            </p>
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
