"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";

/*
  A scroll hint for pages that open with a full-width banner. On laptop
  screens the photograph runs to the fold and a calm photo edge reads as
  the end of the page, so people stopped scrolling. The arrow is pinned to
  the bottom centre of the screen for the whole scroll, nods gently, and
  slides away only when the reader reaches the end of the page. Scroll
  back up and it returns. It is also a real link to the next section. Motion's scroll value rather
  than a scroll listener, as in the header, and the nod is switched off
  under prefers-reduced-motion.
*/
export function ScrollCue({ target }: { target: string }) {
  const [gone, setGone] = useState(false);
  /* Progress through the document, 0 at the top and 1 at the end. Gone in
     the last few percent, so it disappears as the footer comes into view. */
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (p) => setGone(p > 0.97));

  return (
    <a
      href={target}
      aria-label="Scroll to the next section"
      aria-hidden={gone}
      tabIndex={gone ? -1 : 0}
      className={`fixed bottom-6 left-1/2 z-40 grid size-12 -translate-x-1/2 place-items-center rounded-full border border-line bg-white text-accent shadow-[0_14px_34px_-12px_rgba(0,0,0,0.45)] transition-[opacity,translate] duration-400 ease-out ${
        gone
          ? "pointer-events-none translate-y-8 opacity-0"
          : "animate-cue translate-y-0 opacity-100"
      }`}
    >
      <ArrowDownIcon weight="bold" className="size-5" />
    </a>
  );
}
