import Image from "next/image";
import { testimonials } from "@/lib/site";
import { Container, Heading } from "@/components/ui";
import { Reveal } from "@/components/reveal";

function Attribution({
  name,
  role,
  company,
  seed,
  size = "sm",
}: {
  name: string;
  role: string;
  company: string;
  seed: string;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? 48 : 40;
  return (
    <div className="mt-6 flex items-center gap-3">
      {/* TODO: replace with real customer portraits, square crop. */}
      <Image
        src={`https://picsum.photos/seed/${seed}/${dim * 2}/${dim * 2}`}
        alt=""
        width={dim}
        height={dim}
        className="rounded-full object-cover"
      />
      <div className="text-sm leading-snug">
        <div className="font-semibold text-text">{name}</div>
        <div className="text-subtle">
          {role}, {company}
        </div>
      </div>
    </div>
  );
}

export function Voices() {
  const [lead, ...others] = testimonials;

  return (
    <section className="border-b border-line py-20 sm:py-28">
      <Container>
        <Heading className="max-w-[18ch]">
          What the ops leads say afterwards.
        </Heading>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <figure className="accent-wash flex h-full flex-col justify-between rounded-card border border-line p-8 sm:p-10">
              <blockquote className="text-xl font-medium leading-snug sm:text-2xl">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <figcaption>
                <Attribution {...lead} size="lg" />
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-4 lg:col-span-2">
            {others.map((t, i) => (
              <Reveal key={t.name} delay={0.08 + i * 0.06}>
                <figure className="flex h-full flex-col justify-between rounded-card border border-line bg-raised p-6">
                  <blockquote className="text-base leading-relaxed text-text">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption>
                    <Attribution {...t} />
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
