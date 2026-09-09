"use client";

import { useState } from "react";
import { IconoMas } from "@/app/components/IconosNordicos";

/**
 * Acordeón con transición fluida real (grid-template-rows 0fr→1fr en
 * globals.css) — `<details>` nativo no anima el alto de forma consistente
 * entre navegadores, esto sí, sin librerías.
 */
export default function Acordeon({ items }: { items: { q: string; a: string }[] }) {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const estaAbierto = abierto === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setAbierto(estaAbierto ? null : i)}
              aria-expanded={estaAbierto}
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold sm:text-base"
            >
              {item.q}
              <IconoMas className={`h-4 w-4 flex-none text-ember ${estaAbierto ? "rotate-45" : ""}`} />
            </button>
            <div className="acordeon-contenido" data-abierto={estaAbierto}>
              <div>
                <p className="pb-4 text-sm leading-relaxed text-ink-dim sm:text-base">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
