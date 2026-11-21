"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type PoseVikingo =
  | "sonriente"
  | "esfuerzo"
  | "sorpresa"
  | "atento"
  | "orgulloso"
  | "apunta_abajo"
  | "pulgar"
  | "colgado";

/** Mascota: entra con rebote y flota suave. Un máximo de una por sección. */
export function VikingMascot({
  pose = "sonriente",
  width = 220,
  className = "",
  priority = false,
}: {
  pose?: PoseVikingo;
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const ratio = pose === "colgado" ? 1000 / 480 : 900 / 880;

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 240, damping: 14 }}
    >
      <motion.div animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <Image
          src={`/vikingo/viking_${pose}.png`}
          alt="Vikingo, guía del Método"
          width={width}
          height={Math.round(width * ratio)}
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
}
