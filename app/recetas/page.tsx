import { RECETAS } from "@/content/recetas";
import AdSlot from "@/app/components/AdSlot";

export const metadata = {
  title: "Recetas",
  description: "Recetas altas en proteína, rápidas y pensadas para el Reto Vikingo.",
};

export default function Recetas() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vk-gold">Biblioteca</p>
        <h1 className="mt-2 text-3xl font-black">Recetas Vikingas</h1>
        <p className="mt-2 text-vk-muted">Altas en proteína, pocas cosas que lavar. Sin dietas raras.</p>
      </header>

      <AdSlot position="top" />

      <div className="space-y-4">
        {RECETAS.map((r, i) => (
          <div key={r.slug}>
            <article id={r.slug} className="rounded-2xl border border-vk-border bg-vk-surface p-5">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-vk-gold/15 px-2.5 py-1 font-semibold text-vk-gold">⏱ {r.tiempo}</span>
                <span className="rounded-full bg-vk-green/15 px-2.5 py-1 font-semibold text-vk-green">
                  💪 {r.proteina}
                </span>
                {r.etiquetas.map((e) => (
                  <span key={e} className="rounded-full bg-vk-surface-2 px-2.5 py-1 text-vk-muted">
                    {e}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 text-xl font-bold">{r.titulo}</h2>
              <h3 className="mt-3 text-xs font-bold uppercase tracking-widest text-vk-muted">Ingredientes</h3>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
                {r.ingredientes.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
              <h3 className="mt-3 text-xs font-bold uppercase tracking-widest text-vk-muted">Preparación</h3>
              <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm">
                {r.pasos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </article>
            {i === 1 && <AdSlot position="mid-content" />}
          </div>
        ))}
      </div>

      <AdSlot position="bottom" />
    </div>
  );
}
