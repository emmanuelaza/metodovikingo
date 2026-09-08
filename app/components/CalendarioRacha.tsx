import { DIAS_TOTALES } from "@/lib/types";

/**
 * Vista compacta de los 30 días (estilo "calendario de commits"): mucho más
 * visual que solo el número de racha. Un día "perdido" (disponible pero
 * nunca marcado) se distingue del pendiente de hoy — es información real,
 * no decoración.
 */
export default function CalendarioRacha({ diaMaximo, diasCompletados }: { diaMaximo: number; diasCompletados: Set<number> }) {
  return (
    <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10">
      {Array.from({ length: DIAS_TOTALES }, (_, i) => i + 1).map((d) => {
        const hecho = diasCompletados.has(d);
        const disponible = d <= diaMaximo;
        const esHoyPendiente = d === diaMaximo && !hecho;
        const perdido = disponible && !hecho && !esHoyPendiente;

        let clases = "border-line text-ink-faint";
        if (hecho) clases = "border-ember bg-ember/15 text-ember-2";
        else if (esHoyPendiente) clases = "border-ember-2 text-ember-2";
        else if (perdido) clases = "border-err/40 text-err";

        return (
          <div
            key={d}
            title={hecho ? `Día ${d}: completado` : perdido ? `Día ${d}: no completado` : `Día ${d}`}
            className={`flex aspect-square items-center justify-center rounded border text-xs font-semibold sm:text-[10px] ${clases}`}
          >
            {d}
          </div>
        );
      })}
    </div>
  );
}
