import { createAdminClient } from "@/lib/supabase/admin";
import { webpushConfigurado } from "@/lib/push/server";
import { getTitulos } from "@/lib/contenido";
import { hoyISO, esDomingo, diasEntre } from "@/lib/fecha";
import { calcularEstadoCurso } from "@/lib/progreso";
import type { Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

type SuscripcionFila = { id: number; user_id: string; endpoint: string; p256dh: string; auth: string };
type CompletadoFila = { user_id: string; day_number: number; completed_at: string };
type LogFila = { user_id: string; logged_at: string };

/**
 * Cron nocturno (ver vercel.json): manda uno de dos avisos honestos por
 * usuario, nunca los dos.
 * 1. Racha en riesgo: tiene una racha real y todavía no completó el día
 *    disponible de hoy — se rompe a medianoche si no entra.
 * 2. Recordatorio de progreso (solo domingos): no registró peso/cintura en
 *    los últimos 7 días.
 * Nada de esto es una amenaza inventada: ambas son consecuencias reales de
 * la mecánica ya existente (racha) o del hábito que la app promueve
 * (medición semanal en /progreso).
 */
export async function GET(request: Request) {
  const secreto = process.env.CRON_SECRET;
  if (secreto && request.headers.get("authorization") !== `Bearer ${secreto}`) {
    return new Response("No autorizado", { status: 401 });
  }

  const webpush = webpushConfigurado();
  if (!webpush) return Response.json({ enviados: 0, motivo: "VAPID no configurado" });

  const admin = createAdminClient();
  const hoy = hoyISO();
  const domingo = esDomingo(hoy);

  const { data: suscripciones, error: errorSubs } = await admin
    .from("push_subscriptions")
    .select("id, user_id, endpoint, p256dh, auth")
    .returns<SuscripcionFila[]>();
  if (errorSubs || !suscripciones || suscripciones.length === 0) {
    return Response.json({ enviados: 0, error: errorSubs?.message ?? "sin suscripciones" });
  }

  const userIds = suscripciones.map((s) => s.user_id);

  const [{ data: perfiles }, { data: completados }, { data: logs }, titulos] = await Promise.all([
    admin.from("profiles").select("id, fecha_inicio, created_at").in("id", userIds).returns<Profile[]>(),
    admin.from("daily_completions").select("user_id, day_number, completed_at").in("user_id", userIds).returns<CompletadoFila[]>(),
    domingo
      ? admin.from("body_progress_logs").select("user_id, logged_at").in("user_id", userIds).returns<LogFila[]>()
      : Promise.resolve({ data: [] as LogFila[] }),
    getTitulos(),
  ]);

  const perfilPorUsuario = new Map((perfiles ?? []).map((p) => [p.id, p]));

  const completadosPorUsuario = new Map<string, CompletadoFila[]>();
  for (const c of completados ?? []) {
    const lista = completadosPorUsuario.get(c.user_id) ?? [];
    lista.push(c);
    completadosPorUsuario.set(c.user_id, lista);
  }

  const ultimoLogPorUsuario = new Map<string, string>();
  for (const l of logs ?? []) {
    const actual = ultimoLogPorUsuario.get(l.user_id);
    if (!actual || l.logged_at > actual) ultimoLogPorUsuario.set(l.user_id, l.logged_at);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  let enviados = 0;
  const idsExpiradas: number[] = [];

  await Promise.all(
    suscripciones.map(async (sub) => {
      const perfil = perfilPorUsuario.get(sub.user_id);
      if (!perfil) return;

      const estado = calcularEstadoCurso(perfil, completadosPorUsuario.get(sub.user_id) ?? [], hoy);
      let payload: string | null = null;

      if (estado.racha > 0 && estado.diaPendiente !== null) {
        const titulo = titulos.find((t) => t.dia === estado.diaPendiente)?.titulo;
        // Completar hoy dejaría la racha por encima del récord histórico: mismo aviso, en positivo.
        const rompeRecord = estado.racha + 1 > estado.rachaMax;
        const cuerpo = rompeRecord
          ? `🏆 Si completas hoy, superas tu récord de ${estado.rachaMax} días seguidos. Termina el Día ${estado.diaPendiente}${titulo ? `: ${titulo}` : ""} antes de medianoche.`
          : `🔥 Tu racha de ${estado.racha} ${estado.racha === 1 ? "día se rompe" : "días se rompe"} a medianoche. Termina el Día ${estado.diaPendiente}${titulo ? `: ${titulo}` : ""} antes de que se acabe hoy.`;
        payload = JSON.stringify({
          titulo: "Reto Vikingo",
          cuerpo,
          url: `${siteUrl}/reto/${estado.diaPendiente}`,
        });
      } else if (domingo && estado.diaMaximo >= 7) {
        const ultimoLog = ultimoLogPorUsuario.get(sub.user_id);
        const sinRegistroReciente = !ultimoLog || diasEntre(ultimoLog.slice(0, 10), hoy) >= 7;
        if (sinRegistroReciente) {
          payload = JSON.stringify({
            titulo: "Reto Vikingo",
            cuerpo: "📏 ¿Ya te pesaste esta semana? Un dato a la semana es todo lo que necesitas para ver tu progreso real.",
            url: `${siteUrl}/progreso`,
          });
        }
      }

      if (!payload) return;

      try {
        await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        enviados++;
      } catch (err) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) idsExpiradas.push(sub.id);
      }
    }),
  );

  if (idsExpiradas.length > 0) {
    await admin.from("push_subscriptions").delete().in("id", idsExpiradas);
  }

  return Response.json({ enviados, expiradas: idsExpiradas.length });
}
