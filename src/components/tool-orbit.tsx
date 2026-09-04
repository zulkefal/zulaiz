import Image from "next/image";
import type { Tool } from "@/lib/site";

/*
  Tools orbiting a centre mark on concentric rings, like a small solar
  system. Each ring is a centred square with a circular border that rotates;
  each chip sits on the ring's circumference by angle and runs the inverse
  rotation so it stays upright while it travels. Rings turn at different
  speeds and alternate direction so the cluster never reads as one rigid
  wheel.

  The overview at /services passes all 23 curated tools and gets three
  rings. A service page passes only the tools for that job, eight to ten,
  and gets a single ring: split over two, the inner ring held three chips
  and the whole thing read as scattered. Eleven to sixteen get two rings.
  The split is decided by count alone, so callers never think about rings.
  `compact` shrinks the container so a small set sits closer together.

  Logos are the brands' own marks, served from /images/tools; anything
  without one shows a monogram in the accent, so nothing is dropped for lack
  of an SVG. Sizes are percentages of the container so the whole thing scales
  with the viewport. Motion is switched off under prefers-reduced-motion.
*/
function monogram(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return /^\d/.test(name) ? name.slice(0, 2) : name[0].toUpperCase();
}

/* chips on the ring, diameter as % of the container, seconds per revolution */
type RingSpec = { count: number; diameter: number; duration: number; reverse: boolean };

const THREE_RINGS: RingSpec[] = [
  { count: 6, diameter: 40, duration: 48, reverse: false },
  { count: 8, diameter: 69, duration: 76, reverse: true },
  { count: 10, diameter: 96, duration: 104, reverse: false },
];

function layoutFor(total: number): RingSpec[] {
  /* Three rings only from seventeen up. Below that the outer ring of the
     three-ring layout would hold one or two stragglers. */
  if (total > 16) return THREE_RINGS;
  if (total <= 10) {
    return [{ count: total, diameter: 86, duration: 64, reverse: false }];
  }
  /* Roughly a third inside, the rest outside. Never fewer than three inside
     or the inner ring reads as a pair of stragglers. */
  const inner = Math.min(total, Math.max(3, Math.round(total * 0.35)));
  return [
    { count: inner, diameter: 46, duration: 48, reverse: false },
    { count: total - inner, diameter: 92, duration: 76, reverse: true },
  ];
}

/* Deal the tools onto the rings in order. The last ring takes any overflow,
   and a ring left with nothing is dropped rather than drawn empty. */
function dealRings(tools: Tool[], specs: RingSpec[]) {
  return specs
    .map((spec, i) => {
      const start = specs.slice(0, i).reduce((n, r) => n + r.count, 0);
      const items =
        i === specs.length - 1
          ? tools.slice(start)
          : tools.slice(start, start + spec.count);
      return { ...spec, items };
    })
    .filter((ring) => ring.items.length > 0);
}

export function ToolOrbit({
  tools,
  compact = false,
}: {
  tools: Tool[];
  compact?: boolean;
}) {
  const rings = dealRings(tools, layoutFor(tools.length));

  return (
    <div
      className={`relative mx-auto aspect-square w-full ${
        compact ? "max-w-[460px]" : "max-w-[640px]"
      }`}
      role="img"
      aria-label={`Tools we work in: ${tools.map((t) => t.name).join(", ")}`}
    >
      {/* centre mark */}
      <div className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-raised shadow-[0_18px_40px_-20px_hsl(var(--shadow-tint)/0.5)]">
        <svg viewBox="0 0 32 32" aria-hidden className="size-9">
          <rect x="1.55" y="1.55" width="28.9" height="28.9" rx="8.4" fill="none" stroke="var(--accent)" strokeWidth="2.9" />
          <path d="M10.2 11.2h11.6L10.2 20.8h11.6" fill="none" stroke="var(--accent)" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {rings.map((ring, ri) => {
        const spin = ring.reverse ? "animate-orbit-reverse" : "animate-orbit";
        const counter = ring.reverse ? "animate-orbit" : "animate-orbit-reverse";
        const dur = `${ring.duration}s`;
        return (
          <div
            key={ri}
            aria-hidden
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line ${spin}`}
            style={{ width: `${ring.diameter}%`, height: `${ring.diameter}%`, animationDuration: dur }}
          >
            {ring.items.map((t, i) => {
              const angle = (i / ring.items.length) * 2 * Math.PI - Math.PI / 2;
              const left = 50 + 50 * Math.cos(angle);
              const top = 50 + 50 * Math.sin(angle);
              return (
                <div
                  key={t.name}
                  className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 ${counter}`}
                  style={{ left: `${left}%`, top: `${top}%`, animationDuration: dur }}
                  title={t.name}
                >
                  {/* Smaller chips and no labels below sm: 23 labelled chips
                      do not fit a 350px circle without overlapping. The
                      logo or monogram still identifies each one, and the
                      full list is in the aria-label. */}
                  <span className="grid size-8 place-items-center rounded-full border border-line bg-white shadow-[0_10px_24px_-14px_hsl(var(--shadow-tint)/0.5)] dark:border-white/15 sm:size-11">
                    {t.logo ? (
                      <Image
                        src={t.logo}
                        alt=""
                        width={22}
                        height={22}
                        unoptimized
                        loading="eager"
                        className="size-4 object-contain sm:size-[22px]"
                      />
                    ) : (
                      <span className="text-[10px] font-semibold tracking-tight text-accent sm:text-xs">
                        {monogram(t.name)}
                      </span>
                    )}
                  </span>
                  <span className="hidden whitespace-nowrap text-[11px] font-medium leading-none text-muted sm:block">
                    {t.name}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
