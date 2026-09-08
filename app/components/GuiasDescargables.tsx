import fs from "node:fs";
import path from "node:path";
import { GUIAS } from "@/lib/guiasConfig";

/**
 * Lista las guías PDF desbloqueadas hasta `faseMaxima`. Si el archivo real
 * todavía no está en /public/guias (ver lib/guiasConfig.ts), muestra "Muy
 * pronto" en vez de un link roto. `soloFase` filtra a una sola guía (uso en
 * la página de lección); sin ese prop se listan todas las desbloqueadas
 * (uso en el temario).
 */
export default function GuiasDescargables({ faseMaxima, soloFase }: { faseMaxima: number; soloFase?: number }) {
  const disponibles = GUIAS.filter((g) => g.fase <= faseMaxima && (soloFase === undefined || g.fase === soloFase));
  if (disponibles.length === 0) return null;

  return (
    <div className="space-y-3 border-t border-line pt-6">
      <p className="font-display text-xs text-ink-dim">Guías descargables</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {disponibles.map((guia) => {
          const existe = fs.existsSync(path.join(process.cwd(), "public", guia.archivo));
          return (
            <div key={guia.archivo} className="rounded-xl border border-line bg-bg-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold">{guia.nombre}</p>
                <span className="whitespace-nowrap rounded-full border border-ember/40 px-2 py-0.5 text-xs text-ember-2">
                  Valor ${guia.valorUsd} USD
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-dim">{guia.descripcion}</p>
              {existe ? (
                <a
                  href={guia.archivo}
                  download
                  className="mt-3 inline-block rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-bg hover:bg-ember-deep"
                >
                  Descargar gratis →
                </a>
              ) : (
                <p className="mt-3 text-xs text-ink-faint">Muy pronto disponible.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
