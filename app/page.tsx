import Link from "next/link";
import { requireUsuario, getPerfil, getFechasCompletado, calcularEstadoCurso } from "@/lib/progreso";
import { getTitulos, getFases } from "@/lib/contenido";
import { DIAS_TOTALES } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import ProgressBar from "@/app/components/ProgressBar";
import CompartirRacha from "@/app/components/CompartirRacha";
import NotificacionesPrompt from "@/app/components/NotificacionesPrompt";

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
  const [perfil, fechas, titulos, fases] = await Promise.all([
    getPerfil(supabase, user),
    getFechasCompletado(supabase, user),
    getTitulos(),
    getFases(),
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

          <NotificacionesPrompt habilitado={estado.diasCompletados.has(1)} />

          {/* Cerca del CTA pero no pegado — evita clicks accidentales sobre el botón de continuar. */}
          <div className="mt-8 flex justify-center sm:justify-start">
            <AdSlot slot="banner300x250Dashboard" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-10">
        {fases.map((fase) => (
          <section key={fase.numero} className="mb-10">
            <header className="mb-3">
              <p className="font-display text-xs text-ember-2">Fase {fase.numero}</p>
              <h2 className="font-display text-xl">{fase.nombre}</h2>
              <p className="mt-1 text-sm text-ink-dim">{fase.descripcion}</p>
            </header>

            <ol className="divide-y divide-line border-y border-line">
              {Array.from({ length: fase.diaFin - fase.diaInicio + 1 }, (_, i) => fase.diaInicio + i).map((d) => {
                const disponible = d <= estado.diaMaximo;
                const hecho = estado.diasCompletados.has(d);
                const titulo = titulos.find((t) => t.dia === d)?.titulo;

                const contenido = (
                  <div className="flex items-center justify-between gap-4 px-1 py-4">
                    <div>
                      <p className={disponible ? "font-semibold" : "font-semibold text-ink-faint blur-[3px] select-none"}>
                        Día {d}
                        {titulo ? ` — ${titulo}` : ""}
                      </p>
                      {!disponible && (
                        <p className="mt-0.5 text-xs text-ink-faint">
                          Se habilita en {d - estado.diaMaximo} {d - estado.diaMaximo === 1 ? "día" : "días"}
                        </p>
                      )}
                    </div>
                    {hecho && (
                      <span aria-hidden className="text-lg text-ok">
                        ✓
                      </span>
                    )}
                  </div>
                );

                return (
                  <li key={d}>
                    {disponible ? (
                      <Link href={`/reto/${d}`} className="block hover:bg-bg-2">
                        {contenido}
                      </Link>
                    ) : (
                      <div>{contenido}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <div className="space-y-1 border-t border-line pt-6 text-sm text-ink-dim">
          <p>Comunidad de Discord — Próximamente</p>
          <p>Guías descargables en PDF — Próximamente</p>
          <p>Testimonios del reto — Próximamente</p>
        </div>
      </div>
    </div>
  );
}
