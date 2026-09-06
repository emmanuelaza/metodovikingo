import Link from "next/link";
import { requireUsuario, getProgreso, estadoRacha } from "@/lib/progreso";
import { getPiezas, getTitulos } from "@/lib/contenido";
import { DIAS_TOTALES } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import RachaBadge from "@/app/components/RachaBadge";
import ProgressBar from "@/app/components/ProgressBar";
import CompartirRacha from "@/app/components/CompartirRacha";
import { recuperarRacha } from "./actions";

export const metadata = { title: "Tu reto" };

const MENSAJES: Record<string, { texto: string; tipo: "info" | "ok" | "error" }> = {
  bloqueado: { texto: "Ese día aún no está desbloqueado. Sigue en orden 💪", tipo: "info" },
  manana: { texto: "Ya completaste hoy. El siguiente día se abre mañana.", tipo: "info" },
  secreto: { texto: "El Método completo se revela al terminar el día 30.", tipo: "info" },
  racha_recuperada: { texto: "🔥 Racha recuperada. Completa el día de hoy para mantenerla.", tipo: "ok" },
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
    <div className="space-y-6">
      <header>
        <p className="text-sm text-vk-muted">Hola{nombre ? `, ${nombre}` : ""} 👋</p>
        <h1 className="text-2xl font-black">
          {progreso.reto_completado ? "Reto completado" : `Día ${progreso.current_day} de ${DIAS_TOTALES}`}
        </h1>
      </header>

      {aviso && (
        <p
          className={`rounded-lg border px-4 py-3 text-sm ${
            aviso.tipo === "ok"
              ? "border-vk-green/40 bg-vk-green/10 text-vk-green"
              : aviso.tipo === "error"
                ? "border-vk-red/40 bg-vk-red/10 text-vk-red"
                : "border-vk-gold/40 bg-vk-gold/10 text-vk-gold"
          }`}
        >
          {aviso.texto}
        </p>
      )}

      <AdSlot position="top" />

      <RachaBadge racha={estado.rachaVisible} rachaMax={progreso.streak_max} rota={estado.rachaRota} />

      {estado.rachaRota && (
        <div className="rounded-xl border border-vk-red/40 bg-vk-red/10 p-4">
          <p className="font-semibold">
            Llevas {estado.diasSinCompletar} días sin entrar. Tu racha de {progreso.streak_current} está en pausa.
          </p>
          {estado.puedeRecuperar ? (
            <form action={recuperarRacha} className="mt-3">
              <p className="mb-2 text-sm text-vk-muted">
                Tienes 1 recuperación este mes. Úsala y completa el día de hoy para no perderla.
              </p>
              <button
                type="submit"
                className="w-full rounded-lg bg-vk-red px-4 py-2.5 font-bold text-white hover:opacity-90"
              >
                🛡️ Recuperar mi racha
              </button>
            </form>
          ) : (
            <p className="mt-2 text-sm text-vk-muted">
              Ya usaste la recuperación de este mes. Al completar hoy, tu racha empieza de nuevo. Lo importante es
              retomar donde quedaste.
            </p>
          )}
        </div>
      )}

      {!estado.rachaRota &&
        estado.diasSinCompletar !== null &&
        estado.diasSinCompletar >= 2 &&
        progreso.streak_current === 0 && (
          <p className="rounded-xl border border-vk-border bg-vk-surface p-4 text-sm text-vk-muted">
            Retoma donde quedaste: el día {progreso.current_day} te espera.
          </p>
        )}

      <section className="rounded-2xl border border-vk-border bg-vk-surface p-5">
        <ProgressBar completados={diasCompletados} total={DIAS_TOTALES} />

        <div className="mt-5">
          {progreso.reto_completado ? (
            <Link
              href="/metodo-secreto"
              className="block w-full rounded-lg bg-vk-gold px-4 py-3 text-center font-bold text-vk-bg hover:bg-vk-gold-dark"
            >
              🧩 Ver el Método completo
            </Link>
          ) : estado.diaBloqueadoHastaManana ? (
            <div className="text-center">
              <p className="font-semibold text-vk-green">✓ Día {progreso.current_day - 1} completado hoy</p>
              <p className="mt-1 text-sm text-vk-muted">
                El día {progreso.current_day} se desbloquea mañana. Vuelve a por tu racha 🔥
              </p>
              <Link
                href={`/reto/${progreso.current_day - 1}`}
                className="mt-3 inline-block text-sm text-vk-gold underline"
              >
                Releer el día {progreso.current_day - 1}
              </Link>
            </div>
          ) : (
            <Link
              href={`/reto/${progreso.current_day}`}
              className="anim-glow block w-full rounded-lg bg-vk-gold px-4 py-3 text-center font-bold text-vk-bg hover:bg-vk-gold-dark"
            >
              Ir a la lección del día {progreso.current_day} →
            </Link>
          )}
        </div>

        {diasCompletados > 0 && (
          <div className="mt-3">
            <CompartirRacha racha={estado.rachaVisible || progreso.streak_max} dia={diasCompletados} />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-vk-muted">Piezas del Método</h2>
        <div className="grid grid-cols-4 gap-2">
          {piezas.map((p) => {
            const abierta = progreso.pieces_unlocked.includes(p.dia);
            return (
              <div
                key={p.dia}
                className={`rounded-xl border p-3 text-center ${
                  abierta ? "border-vk-gold/60 bg-vk-gold/10" : "border-vk-border bg-vk-surface opacity-60"
                }`}
                title={abierta ? p.titulo : `Se desbloquea el día ${p.dia}`}
              >
                <p className="text-2xl" aria-hidden>
                  {abierta ? "🧩" : "🔒"}
                </p>
                <p className="mt-1 truncate text-[11px] font-semibold">{abierta ? p.titulo : `Día ${p.dia}`}</p>
              </div>
            );
          })}
        </div>
        {progreso.pieces_unlocked.length > 0 && !progreso.reto_completado && (
          <p className="mt-2 text-xs text-vk-muted">
            Las piezas se unen el día 30. Puedes releerlas en las lecciones de los días 7, 14 y 21.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-vk-muted">Los 30 días</h2>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: DIAS_TOTALES }, (_, i) => i + 1).map((d) => {
            const hecho = d < progreso.current_day;
            const actual = d === progreso.current_day && !progreso.reto_completado;
            const titulo = titulos.find((t) => t.dia === d)?.titulo;
            const base = "flex aspect-square flex-col items-center justify-center rounded-lg border text-sm font-bold";
            if (hecho) {
              return (
                <Link key={d} href={`/reto/${d}`} title={titulo} className={`${base} border-vk-green/40 bg-vk-green/10 text-vk-green`}>
                  {d}
                </Link>
              );
            }
            if (actual && !estado.diaBloqueadoHastaManana) {
              return (
                <Link key={d} href={`/reto/${d}`} title={titulo} className={`${base} border-vk-gold bg-vk-gold/15 text-vk-gold`}>
                  {d}
                </Link>
              );
            }
            return (
              <div key={d} className={`${base} border-vk-border bg-vk-surface text-vk-muted/50`}>
                {d}
              </div>
            );
          })}
        </div>
      </section>

      <Link
        href="/progreso"
        className="block rounded-xl border border-vk-border bg-vk-surface p-4 text-sm hover:border-vk-gold/40"
      >
        📈 <span className="font-semibold">Registrar mi peso y medidas</span>
        <span className="block text-vk-muted">Una vez por semana es suficiente.</span>
      </Link>

      <AdSlot position="bottom" />
    </div>
  );
}
