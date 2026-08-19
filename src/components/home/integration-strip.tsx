import Image from "next/image";
import { integrations } from "@/lib/site";
import { Container } from "@/components/ui";

/*
  The only marquee on the site. It is here because the point is breadth,
  and no single logo needs individual attention.
*/
export function IntegrationStrip() {
  const track = [...integrations, ...integrations];

  return (
    <section className="border-b border-line py-12" aria-labelledby="stack-heading">
      <Container>
        <h2
          id="stack-heading"
          className="text-center text-sm font-medium text-subtle"
        >
          Works inside the tools you already run
        </h2>
      </Container>
      <div className="mask-edges mt-8 overflow-hidden">
        <div className="animate-track flex w-max items-center gap-14 pr-14">
          {track.map((brand, i) => (
            <Image
              key={`${brand.slug}-${i}`}
              src={`https://cdn.simpleicons.org/${brand.slug}/8b95a3`}
              alt={brand.name}
              width={24}
              height={24}
              unoptimized
              aria-hidden={i >= integrations.length}
              className="size-7 shrink-0 opacity-75"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
