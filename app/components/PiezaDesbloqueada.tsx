import type { Pieza } from "@/lib/contenido";

/** Sección de contenido normal, no un "reveal" — se muestra dentro de la lección del día. */
export default function PiezaDesbloqueada({ pieza }: { pieza: Pieza }) {
  return (
    <div className="rounded-xl border border-ember/40 bg-bg-2 p-5">
      <p className="font-display text-xs text-ember-2">Runa {pieza.numero} de 4 · Método Secreto</p>
      <h3 className="mt-1 font-display text-xl">{pieza.titulo}</h3>
      <p className="mt-3 leading-relaxed text-ink/90">{pieza.texto}</p>
    </div>
  );
}
