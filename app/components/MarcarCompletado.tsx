"use client";

import { useState } from "react";
import { marcarCompletado } from "@/app/reto/[dia]/actions";

const ANGULOS = [0, 45, 90, 135, 180, 225, 270, 315];

/** Checkbox simple de seguimiento personal — no desbloquea ni bloquea nada. */
export default function MarcarCompletado({ dia, completado }: { dia: number; completado: boolean }) {
  const [celebrando, setCelebrando] = useState(false);

  function celebrar() {
    if (completado) return; // el efecto es solo al marcar, no al desmarcar
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
    setCelebrando(true);
    window.setTimeout(() => setCelebrando(false), 1200);
  }

  return (
    <form action={marcarCompletado} className="relative inline-block w-full sm:w-auto">
      <input type="hidden" name="dia" value={dia} />
      <input type="hidden" name="accion" value={completado ? "desmarcar" : "marcar"} />
      <button
        type="submit"
        onClick={celebrar}
        className={`relative flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-3.5 font-semibold transition sm:w-auto ${
          completado
            ? "border-ember bg-ember/10 text-ember-2"
            : "border-line text-ink-dim hover:border-ember/60 hover:text-ink"
        }`}
      >
        <span aria-hidden>{completado ? "☑" : "☐"}</span>
        {completado ? "Completado" : "Marcar como completado"}
        {celebrando && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0" aria-hidden>
            {ANGULOS.map((angulo) => (
              <span
                key={angulo}
                className="ember-spark"
                style={{ "--angulo": `${angulo}deg` } as React.CSSProperties}
              />
            ))}
          </span>
        )}
      </button>
    </form>
  );
}
