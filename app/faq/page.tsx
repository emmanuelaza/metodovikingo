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
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vk-gold">Ayuda</p>
        <h1 className="mt-2 text-3xl font-black">Preguntas frecuentes</h1>
      </header>

      <AdSlot position="top" />

      <div className="space-y-2">
        {FAQ.map((p, i) => (
          <div key={p.q}>
            <details className="group rounded-xl border border-vk-border bg-vk-surface">
              <summary className="cursor-pointer list-none px-4 py-3 font-semibold marker:content-none">
                <span className="mr-2 text-vk-gold group-open:hidden">+</span>
                <span className="mr-2 hidden text-vk-gold group-open:inline">−</span>
                {p.q}
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-vk-muted">{p.a}</p>
            </details>
            {i === 3 && <AdSlot position="mid-content" />}
          </div>
        ))}
      </div>

      <AdSlot position="bottom" />
    </div>
  );
}
