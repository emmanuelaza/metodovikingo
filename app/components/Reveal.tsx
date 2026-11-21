"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Entrada con rebote al aparecer en pantalla. Para tarjetas, titulares y listas. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Lista escalonada: <Stagger>{items.map(...)}</Stagger> */
export function Stagger({ children, gap = 0.08 }: { children: ReactNode[]; gap?: number }) {
  return <>{children.map((c, i) => <Reveal key={i} delay={i * gap}>{c}</Reveal>)}</>;
}
