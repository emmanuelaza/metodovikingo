import { TESTIMONIOS_SEED } from "@/content/testimonios-seed";

/**
 * Carrusel infinito en bucle, puro CSS (@keyframes marquee en globals.css):
 * no necesita scroll ni interacción del usuario. La lista se duplica una
 * vez y se anima -50% para que el loop sea perfectamente continuo. Server
 * component: no hay estado ni JS de por medio.
 */
export default function TestimoniosCarrusel() {
  const items = [...TESTIMONIOS_SEED, ...TESTIMONIOS_SEED];

  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div className="flex w-max gap-4 animate-marquee">
        {items.map((t, i) => (
          <div key={i} className="w-64 flex-none rounded-xl border border-line bg-bg-2 p-5 sm:w-72">
            <p className="text-sm leading-relaxed text-ink/90">&ldquo;{t.texto}&rdquo;</p>
            <p className="mt-3 text-xs text-ink-dim">{t.alias}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
