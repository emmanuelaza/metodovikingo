import type { Pieza } from "@/lib/contenido";

export default function PiezaDesbloqueada({ pieza, final = false }: { pieza: Pieza; final?: boolean }) {
  return (
    <div className="anim-rise rounded-2xl border-2 border-vk-gold bg-gradient-to-b from-vk-gold/15 to-transparent p-5 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-vk-gold">
        {final ? "Método completo" : `Pieza ${pieza.numero} de 4 desbloqueada`}
      </p>
      <p className="my-3 text-5xl anim-pop" aria-hidden>
        🧩
      </p>
      <h3 className="text-2xl font-black">{pieza.titulo}</h3>
      <p className="mt-3 text-left leading-relaxed text-vk-text/90">{pieza.texto}</p>
    </div>
  );
}
