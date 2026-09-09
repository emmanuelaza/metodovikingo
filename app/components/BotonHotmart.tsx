"use client";

import { track } from "@vercel/analytics";

/**
 * El único CTA que decide si el proyecto genera dinero de verdad. Sin este
 * evento, Analytics solo dice cuánta gente llega al día 30, nunca cuánta
 * gente intenta comprar — la métrica que más importa queda a ciegas.
 */
export default function BotonHotmart({ href, rachaMax }: { href: string; rachaMax: number }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("clic_hotmart", { rachaMax })}
      className="mt-4 block w-full rounded-lg bg-ember px-4 py-3 text-center font-semibold text-bg hover:bg-ember-deep"
    >
      Quiero el Método completo →
    </a>
  );
}
