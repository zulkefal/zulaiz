import { headlineStats } from "@/lib/site";
import { Container, Metric } from "@/components/ui";
import { Reveal } from "@/components/reveal";

/* Hairlines instead of cards. Metrics do not need containers to feel grouped. */
export function StatBand() {
  return (
    <section className="border-b border-line py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {headlineStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className={`lg:px-8 ${
                i > 0 ? "lg:border-l lg:border-line" : "lg:pl-0"
              }`}
            >
              <Metric value={stat.value} label={stat.label} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
