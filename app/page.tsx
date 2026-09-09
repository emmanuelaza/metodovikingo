import Link from "next/link";
import { requireUsuario, getPerfil, getFechasCompletado, calcularEstadoCurso, contarCompletadosHoy } from "@/lib/progreso";
import { getTitulos, getFases, getPiezas } from "@/lib/contenido";
import { DIAS_TOTALES } from "@/lib/types";
import { hoyISO, proximaMedianocheEpoch } from "@/lib/fecha";
import ProgressBar from "@/app/components/ProgressBar";
import CompartirRacha from "@/app/components/CompartirRacha";
import NotificacionesPrompt from "@/app/components/NotificacionesPrompt";
import ContadorSiguienteDia from "@/app/components/ContadorSiguienteDia";
import Logros from "@/app/components/Logros";
import TestimoniosCarrusel from "@/app/components/TestimoniosCarrusel";
import CalendarioRacha from "@/app/components/CalendarioRacha";

const JSON_LD_CURSO = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Reto Vikingo — 30 días",
  description: "Curso gratuito de 30 días de nutrición y entrenamiento, una lección nueva cada día.",
  provider: { "@type": "Organization", name: "Método Vikingo" },
};

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
  const hoy = hoyISO();
  const [perfil, fechas, titulos, fases, piezas, completadosHoy] = await Promise.all([
    getPerfil(supabase, user),
    getFechasCompletado(supabase, user),
    getTitulos(),
    getFases(),
    getPiezas(),
    contarCompletadosHoy(supabase, hoy),
  ]);
  const estado = calcularEstadoCurso(perfil, fechas, hoy);
  const aviso = msg ? MENSAJES[msg] : undefined;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_CURSO) }} />

      <section className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-4xl px-6 py-10 sm:py-12">
          <p className="font-display text-xs text-ember-2">Reto Vikingo · 30 días</p>
          <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Tu temario</h1>

          {aviso && <p className="mt-4 text-sm text-ember-2">{aviso}</p>}

          {/* Quien vuelve tras ausentarse no perdió nada: el desbloqueo está
              encadenado, así que su día sigue intacto. Decirlo evita que
              sienta que fracasó y abandone. */}
          {estado.diasDesdeUltimaActividad !== null &&
            estado.diasDesdeUltimaActividad >= 2 &&
            estado.diaPendiente !== null && (
              <p className="mt-4 rounded-lg border border-ember/40 bg-bg-3 p-4 text-sm">
                Estuviste {estado.diasDesdeUltimaActividad} días fuera y no perdiste nada: tu Día{" "}
                <strong className="text-ember-2">{estado.diaPendiente}</strong> sigue justo donde lo dejaste. Se retoma
                hoy.
              </p>
            )}

          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            {estado.racha > 0 && (
              <span className="text-ink">
                🔥 <strong>{estado.racha}</strong> {estado.racha === 1 ? "día" : "días"} de racha
              </span>
            )}
            {estado.rachaMax > estado.racha && (
              <span className="text-ink-dim">
                Récord: <strong className="text-ink">{estado.rachaMax}</strong> {estado.rachaMax === 1 ? "día" : "días"}
              </span>
            )}
            <span className="text-ink-dim">
              {estado.diasCompletados.size} / {DIAS_TOTALES} lecciones completadas
            </span>
          </div>

          {/* Prueba social real. Se oculta con números bajos: "2 personas" desmotiva
              más de lo que motiva, y no se va a inflar la cifra. */}
          {completadosHoy !== null && completadosHoy >= 5 && (
            <p className="mt-3 text-sm text-ink-dim">
              <strong className="text-ink">{completadosHoy}</strong> personas ya completaron su día de hoy.
            </p>
          )}

          {/* La acción principal va antes de las métricas: en móvil tiene que
              alcanzarse sin scroll, sobre todo si se llegó desde un push. */}
          <div className="mt-5">
            {estado.cursoCompletado ? (
              <Link
                href="/metodo-secreto"
                className="block w-full rounded-lg bg-ember px-5 py-3.5 text-center font-semibold text-bg hover:bg-ember-deep sm:inline-block sm:w-auto"
              >
                Ver el Método completo →
              </Link>
            ) : estado.diaPendiente ? (
              <Link
                href={`/reto/${estado.diaPendiente}`}
                className="block w-full rounded-lg bg-ember px-5 py-3.5 text-center font-semibold text-bg hover:bg-ember-deep sm:inline-block sm:w-auto"
              >
                Continuar: Día {estado.diaPendiente} →
              </Link>
            ) : (
              <ContadorSiguienteDia objetivoEpoch={proximaMedianocheEpoch(hoy)} />
            )}
          </div>

          <div className="mt-6 max-w-sm">
            <ProgressBar completados={estado.diasCompletados.size} total={DIAS_TOTALES} />
          </div>

          <div className="mt-5 max-w-md">
            <CalendarioRacha diaMaximo={estado.diaMaximo} diasCompletados={estado.diasCompletados} />
          </div>

          {estado.racha > 0 && (
            <div className="mt-5 max-w-xs">
              <CompartirRacha racha={estado.racha} dia={estado.diasCompletados.size} />
            </div>
          )}

          <div className="mt-7">
            <p className="mb-3 font-display text-xs text-ink-dim">Runas del Método Secreto</p>
            <Logros piezas={piezas} diasCompletados={estado.diasCompletados} />
          </div>

          <NotificacionesPrompt habilitado={estado.diasCompletados.has(1)} />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-10">
        {fases.map((fase) => {
          const diasFase = fase.diaFin - fase.diaInicio + 1;
          const completadosFase = Array.from(estado.diasCompletados).filter(
            (d) => d >= fase.diaInicio && d <= fase.diaFin,
          ).length;

          return (
          <section key={fase.numero} className="mb-10">
            <header className="mb-3">
              <p className="font-display text-xs text-ember-2">Fase {fase.numero}</p>
              <h2 className="font-display text-xl">{fase.nombre}</h2>
              <p className="mt-1 text-sm text-ink-dim">{fase.descripcion}</p>
              <div className="mt-3 max-w-xs">
                <ProgressBar completados={completadosFase} total={diasFase} />
              </div>
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
                          {d === estado.diaMaximo + 1
                            ? `Se abre mañana, al completar el Día ${estado.diaMaximo}`
                            : `Se abre al completar el Día ${d - 1}`}
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
          );
        })}

        <div className="border-t border-line pt-6">
          <p className="mb-4 font-display text-xs text-ink-dim">Lo que dice quien ya lo hizo</p>
          <TestimoniosCarrusel />
        </div>

        <div className="space-y-1 border-t border-line pt-6 text-sm text-ink-dim">
          <p>Comunidad de Discord — Próximamente</p>
          <p>Guías descargables en PDF — dentro de cada lección</p>
        </div>
      </div>
    </div>
  );
}
