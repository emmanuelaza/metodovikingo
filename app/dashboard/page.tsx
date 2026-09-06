import Link from "next/link";
import { requireUsuario, getProgreso, estadoRacha } from "@/lib/progreso";
import { getPiezas, getTitulos } from "@/lib/contenido";
import { DIAS_TOTALES } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import ProgressBar from "@/app/components/ProgressBar";
import CompartirRacha from "@/app/components/CompartirRacha";
import { recuperarRacha } from "./actions";

export const metadata = { title: "Tu reto" };

const MENSAJES: Record<string, { texto: string; tipo: "info" | "ok" | "error" }> = {
  bloqueado: { texto: "Ese día aún no está desbloqueado. Sigue en orden.", tipo: "info" },
  manana: { texto: "Ya completaste hoy. El siguiente día se abre mañana.", tipo: "info" },
  secreto: { texto: "El Método completo se revela al terminar el día 30.", tipo: "info" },
  racha_recuperada: { texto: "Racha recuperada. Entra hoy a tu lección para mantenerla.", tipo: "ok" },
  sin_recuperaciones: { texto: "Ya usaste tu recuperación de este mes.", tipo: "error" },
  racha_intacta: { texto: "Tu racha está intacta, no necesitas recuperarla.", tipo: "info" },
  sin_racha: { texto: "Todavía no tienes una racha que recuperar.", tipo: "info" },
  error: { texto: "Algo falló. Intenta de nuevo.", tipo: "error" },
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const { supabase, user } = await requireUsuario();
  const progreso = await getProgreso(supabase, user);
  const estado = estadoRacha(progreso);
  const [piezas, titulos] = await Promise.all([getPiezas(), getTitulos()]);

  const nombre = (user.user_metadata?.nombre as string | undefined)?.trim();
  const diasCompletados = Math.min(progreso.current_day - 1, DIAS_TOTALES);
  const aviso = msg ? MENSAJES[msg] : undefined;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm text-ink-dim">Hola{nombre ? `, ${nombre}` : ""}</p>
        <h1 className="mt-1 font-display text-2xl">
          {progreso.reto_completado ? "Reto completado" : `Día ${progreso.current_day} de ${DIAS_TOTALES}`}
        </h1>
      </header>

      {aviso && (
        <p
          className={`rounded-lg border px-4 py-3 text-sm ${
            aviso.tipo === "ok"
              ? "border-ok/40 text-ok"
              : aviso.tipo === "error"
                ? "border-err/40 text-err"
                : "border-line text-ink-dim"
          }`}
        >
          {aviso.texto}
        </p>
      )}

      <AdSlot position="top" />

      <section className="space-y-3">
        <ProgressBar completados={diasCompletados} total={DIAS_TOTALES} />

        {progreso.reto_completado ? (
          <Link href="/metodo-secreto" className="inline-block text-ember-2 underline">
            Ver el Método completo →
          </Link>
        ) : estado.diaBloqueadoHastaManana ? (
          <p className="text-sm text-ink-dim">
            Ya entraste hoy. El día {progreso.current_day} se abre mañana. Puedes{" "}
            <Link href={`/reto/${progreso.current_day - 1}`} className="text-ember-2 underline">
              releer el día {progreso.current_day - 1}
            </Link>{" "}
            mientras tanto.
          </p>
        ) : (
          <Link href={`/reto/${progreso.current_day}`} className="inline-block font-semibold text-ember-2 underline">
            Ir a la lección de hoy →
          </Link>
        )}

        {diasCompletados > 0 && <CompartirRacha racha={estado.rachaVisible || progreso.streak_max} dia={diasCompletados} />}
      </section>

      {estado.rachaRota && (
        <section className="border-t border-line pt-6 text-sm">
          <p className="text-ink-dim">
            Llevas {estado.diasSinCompletar} días sin entrar. Tu racha de {progreso.streak_current} está en pausa.
          </p>
          {estado.puedeRecuperar ? (
            <form action={recuperarRacha} className="mt-2">
              <p className="mb-2 text-ink-dim">Tienes 1 recuperación este mes.</p>
              <button type="submit" className="text-ember-2 underline">
                Recuperar mi racha
              </button>
            </form>
          ) : (
            <p className="mt-2 text-ink-dim">
              Ya usaste la recuperación de este mes. Al entrar hoy, tu racha empieza de nuevo.
            </p>
          )}
        </section>
      )}

      <section className="border-t border-line pt-6">
        <h2 className="font-display text-xs text-ink-dim">Piezas del método</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {piezas.map((p) => {
            const abierta = progreso.pieces_unlocked.includes(p.dia);
            return (
              <li key={p.dia} className={abierta ? "text-ink" : "text-ink-faint"}>
                {abierta ? p.titulo : `Pieza ${p.numero} — se desbloquea el día ${p.dia}`}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-line pt-6">
        <h2 className="font-display text-xs text-ink-dim">Los 30 días</h2>
        <ol className="mt-3 space-y-1 text-sm">
          {Array.from({ length: DIAS_TOTALES }, (_, i) => i + 1).map((d) => {
            const hecho = d < progreso.current_day;
            const actual = d === progreso.current_day && !progreso.reto_completado && !estado.diaBloqueadoHastaManana;
            const titulo = titulos.find((t) => t.dia === d)?.titulo;
            if (hecho || actual) {
              return (
                <li key={d}>
                  <Link href={`/reto/${d}`} className="text-ink hover:text-ember-2">
                    Día {d}{titulo ? ` — ${titulo}` : ""}
                  </Link>
                </li>
              );
            }
            return (
              <li key={d} className="text-ink-faint">
                Día {d}{titulo ? ` — ${titulo}` : ""}
              </li>
            );
          })}
        </ol>
      </section>

      <Link href="/progreso" className="block border-t border-line pt-6 text-sm hover:text-ember-2">
        <span className="font-semibold">Registrar mi peso y medidas →</span>
        <span className="block text-ink-dim">Una vez por semana es suficiente.</span>
      </Link>

      <AdSlot position="bottom" />
    </div>
  );
}
