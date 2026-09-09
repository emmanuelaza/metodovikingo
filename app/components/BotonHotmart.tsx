"use client";

import { track } from "@vercel/analytics";

/**
 * El único CTA que decide si el proyecto genera dinero. `ubicacion` (hero,
 * precio, cta_final...) dice en qué sección de la landing convierte más la
 * gente, dato clave para saber qué sección reforzar.
 */
export default function BotonHotmart({ href, ubicacion = "hero", className = "" }: { href: string; ubicacion?: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("clic_hotmart", { ubicacion })}
      className={`block w-full rounded-lg bg-ember px-5 py-3.5 text-center font-semibold text-bg hover:bg-ember-deep ${className}`}
    >
      Quiero el Método completo →
    </a>
  );
}
