"use client";

import { useState } from "react";

const SMARTLINK = "https://www.profitableratecpmnetwork.com/ce0p1b1w?key=45e230f9180f496ca2b60ebf9b17fbe2";
const SEGUNDOS_ESPERA = 5;

/**
 * Flujo transparente: el botón dice desde el inicio que hay un anuncio de
 * por medio. Al hacer click se abre el Smartlink en pestaña nueva y arranca
 * una cuenta regresiva visible en esta página; al llegar a 0 se habilita la
 * descarga real, haya interactuado o no con la pestaña del anuncio (no se
 * verifica ni se reabre nada).
 */
export default function DescargaPdfDia({ archivo }: { archivo: string | null }) {
  const [segundos, setSegundos] = useState<number | null>(null);

  if (!archivo) {
    return <p className="text-xs text-ink-faint">La guía en PDF de este día no está disponible por ahora.</p>;
  }

  if (segundos === null) {
    return (
      <button
        type="button"
        onClick={() => {
          window.open(SMARTLINK, "_blank", "noopener,noreferrer");
          setSegundos(SEGUNDOS_ESPERA);
          const id = setInterval(() => {
            setSegundos((actual) => {
              if (actual === null || actual <= 1) {
                clearInterval(id);
                return 0;
              }
              return actual - 1;
            });
          }, 1000);
        }}
        className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-bg hover:bg-ember-deep"
      >
        Ver un anuncio para desbloquear tu PDF
      </button>
    );
  }

  if (segundos > 0) {
    return <p className="text-sm text-ink-dim">Genera tu descarga en: {segundos}s...</p>;
  }

  return (
    <a href={archivo} download className="inline-block rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-bg hover:bg-ember-deep">
      Descargar tu PDF →
    </a>
  );
}
