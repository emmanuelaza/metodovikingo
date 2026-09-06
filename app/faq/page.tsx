import { FAQ } from "@/content/faq";
import AdSlot from "@/app/components/AdSlot";

export const metadata = {
  title: "Preguntas frecuentes",
  description: "Todo lo que necesitas saber sobre el Reto Vikingo de 30 días.",
};

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="font-display text-xs text-ember-2">Ayuda</p>
        <h1 className="mt-2 font-display text-3xl">Preguntas frecuentes</h1>
      </header>

      <AdSlot position="top" />

      <div>
        {FAQ.map((p, i) => (
          <div key={p.q}>
            <details className="group border-t border-line py-3">
              <summary className="cursor-pointer list-none font-semibold marker:content-none">
                <span className="mr-2 text-ember-2 group-open:hidden">+</span>
                <span className="mr-2 hidden text-ember-2 group-open:inline">−</span>
                {p.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{p.a}</p>
            </details>
            {i === 3 && <AdSlot position="mid-content" />}
          </div>
        ))}
      </div>

      <AdSlot position="bottom" />
    </div>
  );
}
