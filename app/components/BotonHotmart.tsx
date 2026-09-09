"use client";

import { track } from "@vercel/analytics";

/** Link real de checkout dado por el negocio — nunca la home genérica de hotmart.com. */
export const HOTMART_URL_DEFAULT = "https://pay.hotmart.com/E94996678E?checkoutMode=2";

/**
 * El único CTA que decide si el proyecto genera dinero. `ubicacion` (hero,
 * pago, cta_final, sticky...) dice en qué sección de la landing convierte
 * más la gente, dato clave para saber qué sección reforzar.
 */
export default function BotonHotmart({
  href,
  ubicacion = "hero",
  texto = "⚔️ OBTENER EL MÉTODO VIKINGO AQUÍ",
  className = "",
  pulso = false,
}: {
  href: string;
  ubicacion?: string;
  texto?: string;
  className?: string;
  pulso?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("clic_hotmart", { ubicacion })}
      className={`block w-full rounded bg-ember px-5 py-4 text-center font-display text-sm tracking-wide text-ink transition-colors hover:bg-ember-deep sm:text-base ${pulso ? "animate-pulso-cta" : ""} ${className}`}
    >
      {texto}
    </a>
  );
}
