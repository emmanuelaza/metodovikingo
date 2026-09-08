import type { Pieza } from "@/lib/contenido";

/** Resumen de una línea por Runa — texto propio, no el párrafo completo de la lección. */
const RESUMENES: Record<number, string> = {
  7: "La constancia pesa más que la perfección: cuenta que aparezcas, no que nunca falles.",
  14: "La estructura sostiene lo que la motivación sola no puede sostener.",
  21: "Medir tu progreso te dice qué ajustar, en vez de adivinar.",
  30: "Las tres runas juntas forman el sistema completo del Método.",
};

/** Insignias de las 4 Runas (días 7/14/21/30) — refuerzo de retención en el temario. */
export default function Logros({ piezas, diasCompletados }: { piezas: Pieza[]; diasCompletados: Set<number> }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {piezas.map((pieza) => {
        const conseguido = diasCompletados.has(pieza.dia);
        return (
          <div key={pieza.dia} className={`rounded-lg border px-4 py-3 ${conseguido ? "border-ember/40 bg-bg-2" : "border-line"}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{conseguido ? "🏆" : "🔒"}</span>
              <p className={`text-sm font-semibold ${conseguido ? "text-ink" : "text-ink-faint"}`}>{pieza.titulo}</p>
            </div>
            {RESUMENES[pieza.dia] && (
              <p className={`mt-1.5 text-xs leading-relaxed ${conseguido ? "text-ink-dim" : "text-ink-faint"}`}>
                {RESUMENES[pieza.dia]}
              </p>
            )}
            <p className="mt-1.5 text-[11px] text-ink-faint">
              {conseguido ? `Conseguida en el Día ${pieza.dia}` : `Se desbloquea al completar el Día ${pieza.dia}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
