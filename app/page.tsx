import Link from "next/link";
import { requireUsuario, getPerfil, getFechasCompletado, calcularEstadoCurso } from "@/lib/progreso";
import { getTitulos } from "@/lib/contenido";
import { DIAS_TOTALES } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import ProgressBar from "@/app/components/ProgressBar";
import CompartirRacha from "@/app/components/CompartirRacha";

const MENSAJES: Record<string, string> = {
  bloqueado: "Ese día todavía no está disponible. Vuelve cuando le toque a tu calendario.",
};

export default async function Temario({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const { supabase, user } = await requireUsuario();
  const [perfil, fechas, titulos] = await Promise.all([
    getPerfil(supabase, user),
    getFechasCompletado(supabase, user),
    getTitulos(),
  ]);
  const estado = calcularEstadoCurso(perfil, fechas);
  const aviso = msg ? MENSAJES[msg] : undefined;

  return (
    <div>
      <section className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="font-display text-xs text-ember-2">Reto Vikingo · 30 días</p>
          <h1 className="mt-2 font-display text-4xl leading-tight">Tu temario</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            {estado.racha > 0 && (
              <span className="text-ink">
                🔥 <strong>{estado.racha}</strong> {estado.racha === 1 ? "día" : "días"} de racha
              </span>
            )}
            <span className="text-ink-dim">
              {estado.diasCompletados.size} / {DIAS_TOTALES} lecciones completadas
            </span>
          </div>

          <div className="mt-4 max-w-sm">
            <ProgressBar completados={estado.diasCompletados.size} total={DIAS_TOTALES} />
          </div>

          {aviso && <p className="mt-5 text-sm text-ember-2">{aviso}</p>}

          <div className="mt-7">
            {estado.cursoCompletado ? (
              <Link href="/metodo-secreto" className="inline-block rounded-lg bg-ember px-5 py-3 font-semibold text-bg hover:bg-ember-deep">
                Ver el Método completo →
              </Link>
            ) : estado.diaPendiente ? (
              <Link
                href={`/reto/${estado.diaPendiente}`}
                className="inline-block rounded-lg bg-ember px-5 py-3 font-semibold text-bg hover:bg-ember-deep"
              >
                Continuar: Día {estado.diaPendiente} →
              </Link>
            ) : (
              <p className="text-ink-dim">Ya viste todo lo disponible por hoy. Vuelve mañana para el siguiente día.</p>
            )}
          </div>

          {estado.racha > 0 && (
            <div className="mt-4 max-w-xs">
              <CompartirRacha racha={estado.racha} dia={estado.diasCompletados.size} />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <AdSlot position="top" />

        <ol className="divide-y divide-line border-y border-line">
          {Array.from({ length: DIAS_TOTALES }, (_, i) => i + 1).map((d) => {
            const disponible = d <= estado.diaMaximo;
            const hecho = estado.diasCompletados.has(d);
            const titulo = titulos.find((t) => t.dia === d)?.titulo;

            const contenido = (
              <div className="flex items-center justify-between gap-4 px-1 py-4">
                <div>
                  <p className={disponible ? "font-semibold" : "font-semibold text-ink-faint"}>
                    Día {d}
                    {titulo ? ` — ${titulo}` : ""}
                  </p>
                  {!disponible && <p className="mt-0.5 text-xs text-ink-faint">Se habilita en {d - estado.diaMaximo} {d - estado.diaMaximo === 1 ? "día" : "días"}</p>}
                </div>
                <span aria-hidden className="text-lg">
                  {hecho ? "✓" : disponible ? "" : "🔒"}
                </span>
              </div>
            );

            return (
              <li key={d}>
                {disponible ? (
                  <Link href={`/reto/${d}`} className="block hover:bg-bg-2">
                    {contenido}
                  </Link>
                ) : (
                  <div className="opacity-60">{contenido}</div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-8 border-t border-line pt-6 text-sm text-ink-dim">Comunidad de Discord — Próximamente</p>

        <div className="mt-8">
          <AdSlot position="bottom" />
        </div>
      </div>
    </div>
  );
}
