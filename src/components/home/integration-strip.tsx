import Image from "next/image";
import { integrations } from "@/lib/site";
import { Container } from "@/components/ui";

/*
  The only marquee on the site. It is here because the point is breadth,
  and no single logo needs individual attention. Marks are in brand colour
  on white chips, the same treatment as the orbit on /services; the chips
  are what keep BigCommerce, Zendesk and Expedia visible in dark mode.
  loading="eager" because the second copy of the list starts off-screen and
  Next would otherwise leave it undecoded until it scrolls into view.
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
        <div className="animate-track flex w-max items-center gap-5 pr-5">
          {track.map((brand, i) => {
            const duplicate = i >= integrations.length;
            return (
              <span
                key={`${brand.name}-${i}`}
                aria-hidden={duplicate}
                className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-white dark:border-white/15"
              >
                <Image
                  src={brand.logo}
                  alt={duplicate ? "" : brand.name}
                  width={28}
                  height={28}
                  unoptimized
                  loading="eager"
                  className="size-7 object-contain"
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
