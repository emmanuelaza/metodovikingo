import type { Pieza } from "@/lib/contenido";

/** Insignias de las 4 Runas (días 7/14/21/30) — refuerzo de retención en el temario. */
export default function Logros({ piezas, diasCompletados }: { piezas: Pieza[]; diasCompletados: Set<number> }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {piezas.map((pieza) => {
        const conseguido = diasCompletados.has(pieza.dia);
        return (
          <div
            key={pieza.dia}
            className={`rounded-lg border px-3 py-3 text-center ${
              conseguido ? "border-ember/40 bg-bg-2" : "border-line"
            }`}
          >
            <p className="text-lg">{conseguido ? "🏆" : "🔒"}</p>
            <p className={`mt-1 text-xs ${conseguido ? "text-ink" : "text-ink-faint"}`}>{pieza.titulo}</p>
          </div>
        );
      })}
    </div>
  );
}
