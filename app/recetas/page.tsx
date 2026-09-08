import Link from "next/link";
import { RECETAS } from "@/content/recetas";

export const metadata = {
  title: "Recetas",
  description: "Recetas altas en proteína, rápidas y pensadas para el Reto Vikingo.",
};

export default function Recetas() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <header>
        <Link href="/" className="text-sm text-ink-dim hover:text-ink">
          ← Temario
        </Link>
        <p className="mt-4 font-display text-xs text-ember-2">Biblioteca</p>
        <h1 className="mt-2 font-display text-3xl">Recetas Vikingas</h1>
        <p className="mt-2 text-ink-dim">Altas en proteína, pocas cosas que lavar. Sin dietas raras.</p>
      </header>

      <div className="space-y-6">
        {RECETAS.map((r) => (
          <div key={r.slug}>
            <article id={r.slug} className="border-t border-line pt-5">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-dim">
                <span>{r.tiempo}</span>
                <span>{r.proteina} de proteína</span>
                <span>{r.etiquetas.join(" · ")}</span>
              </div>
              <h2 className="mt-2 font-display text-xl">{r.titulo}</h2>
              <h3 className="mt-3 text-xs text-ink-dim">Ingredientes</h3>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
                {r.ingredientes.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
              <h3 className="mt-3 text-xs text-ink-dim">Preparación</h3>
              <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm">
                {r.pasos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
