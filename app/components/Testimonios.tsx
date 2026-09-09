import { IconoComillas } from "@/app/components/IconosNordicos";

/**
 * Marquesina de testimonios — 100% CSS (keyframes en globals.css), sin JS ni
 * imágenes, para no tocar la velocidad de carga. El track lleva DOS grupos
 * idénticos y se anima a -50%: al terminar el primero, el segundo ya está en
 * la misma posición, así el loop es continuo y sin saltos. Se pausa al pasar
 * el cursor o mantener el dedo encima (`:hover`/`:active`).
 */

export type Testimonio = { texto: string; autor: string };

function Tarjeta({ t }: { t: Testimonio }) {
  return (
    <figure className="borde-grad elev flex w-72 flex-none flex-col justify-between p-5 sm:w-80">
      <IconoComillas className="h-6 w-6 text-ember/50" />
      <blockquote className="mt-3 text-sm leading-relaxed text-ink/90">{t.texto}</blockquote>
      <figcaption className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-wide text-ember-2">
        <span className="h-px w-4 bg-ember/40" />
        {t.autor}
      </figcaption>
    </figure>
  );
}

function Grupo({ items, oculto }: { items: Testimonio[]; oculto?: boolean }) {
  return (
    <div className="marquesina-grupo flex flex-none gap-4 pr-4" aria-hidden={oculto || undefined}>
      {items.map((t, i) => (
        <Tarjeta key={`${t.autor}-${i}`} t={t} />
      ))}
    </div>
  );
}

export default function Testimonios({ items }: { items: Testimonio[] }) {
  if (items.length === 0) return null;

  return (
    <div className="marquesina relative overflow-hidden">
      {/* Difuminado en los bordes para que las tarjetas entren y salgan suave. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent sm:w-20" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent sm:w-20" />
      <div className="marquesina-track flex w-max">
        <Grupo items={items} />
        <Grupo items={items} oculto />
      </div>
    </div>
  );
}
