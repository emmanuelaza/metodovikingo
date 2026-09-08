import Link from "next/link";
import { FAQ } from "@/content/faq";

export const metadata = {
  title: "Preguntas frecuentes",
  description: "Todo lo que necesitas saber sobre el Reto Vikingo de 30 días.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <header>
        <Link href="/" className="text-sm text-ink-dim hover:text-ink">
          ← Temario
        </Link>
        <p className="mt-4 font-display text-xs text-ember-2">Ayuda</p>
        <h1 className="mt-2 font-display text-3xl">Preguntas frecuentes</h1>
      </header>

      <div>
        {FAQ.map((p) => (
          <div key={p.q}>
            <details className="group border-t border-line py-3">
              <summary className="cursor-pointer list-none font-semibold marker:content-none">
                <span className="mr-2 text-ember-2 group-open:hidden">+</span>
                <span className="mr-2 hidden text-ember-2 group-open:inline">−</span>
                {p.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{p.a}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
