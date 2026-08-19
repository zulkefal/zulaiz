"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/*
  Entry motion, used to give a section a reading order as it arrives.
  Collapses to static under prefers-reduced-motion.

  `as` matters for semantics: wrapping an <li> in a <div> breaks the list, so
  ordered content passes as="li" and the motion element becomes the list item.
*/
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Motion = as === "li" ? motion.li : motion.div;

  return (
    <Motion
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Motion>
  );
}
