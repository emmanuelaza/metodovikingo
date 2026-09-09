import { createAdminClient } from "@/lib/supabase/admin";
import { webpushConfigurado } from "@/lib/push/server";
import { getTitulos } from "@/lib/contenido";
import { hoyISO, esDomingo, diasEntre } from "@/lib/fecha";
import { calcularEstadoCurso } from "@/lib/progreso";
import { DIAS_TOTALES, type Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

type SuscripcionFila = { id: number; user_id: string; endpoint: string; p256dh: string; auth: string };
type CompletadoFila = { user_id: string; day_number: number; completed_at: string };
type LogFila = { user_id: string; logged_at: string };

/**
 * Cron nocturno (ver vercel.json): manda como mucho UN aviso por usuario,
 * en este orden de prioridad.
 * 1. Racha en riesgo: tiene racha activa y no completó el día de hoy — se
 *    rompe a medianoche. Si completar hoy supera su récord, el mismo aviso
 *    va en positivo.
 * 2. Resumen semanal (domingos, desde el día 7): días completados de los
 *    últimos 7, su récord, y el recordatorio de pesarse si hace 7+ días que
 *    no registra nada.
 * 3. Reenganche: quien lleva exactamente 3, 7 o 14 días sin actividad. Solo
 *    en esos tres cortes, para que sea un recordatorio y no una molestia
 *    cada noche.
 * Nada de esto es una amenaza inventada: son consecuencias reales de la
 * mecánica que ya existe (racha) o datos propios del usuario.
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

      const completadosUsuario = completadosPorUsuario.get(sub.user_id) ?? [];
      const estado = calcularEstadoCurso(perfil, completadosUsuario, hoy);
      let payload: string | null = null;

      if (estado.racha > 0 && estado.diaPendiente !== null) {
        const titulo = titulos.find((t) => t.dia === estado.diaPendiente)?.titulo;
        // Completar hoy dejaría la racha por encima del récord histórico: mismo aviso, en positivo.
        const rompeRecord = estado.racha + 1 > estado.rachaMax;
        // Con el desbloqueo encadenado, no completar hoy también deja el
        // siguiente día sin abrir mañana — salvo en el día 30, que no tiene.
        const frenaElSiguiente = estado.diaPendiente < DIAS_TOTALES ? ` y mañana no se abre el Día ${estado.diaPendiente + 1}` : "";
        const cuerpo = rompeRecord
          ? `🏆 Si completas hoy, superas tu récord de ${estado.rachaMax} días seguidos. Termina el Día ${estado.diaPendiente}${titulo ? `: ${titulo}` : ""} antes de medianoche.`
          : `🔥 Si no completas hoy pierdes tu racha de ${estado.racha} ${estado.racha === 1 ? "día" : "días"}${frenaElSiguiente}. Te espera el Día ${estado.diaPendiente}${titulo ? `: ${titulo}` : ""}.`;
        payload = JSON.stringify({
          titulo: "Reto Vikingo",
          cuerpo,
          url: `${siteUrl}/reto/${estado.diaPendiente}`,
        });
      } else if (domingo && estado.diaMaximo >= 7) {
        // Resumen de la semana: días distintos con actividad en los últimos 7.
        const fechasUnicas = new Set(completadosUsuario.map((c) => c.completed_at));
        const diasSemana = Array.from(fechasUnicas).filter((f) => {
          const distancia = diasEntre(f, hoy);
          return distancia >= 0 && distancia <= 6;
        }).length;

        const ultimoLog = ultimoLogPorUsuario.get(sub.user_id);
        const sinPesarse = !ultimoLog || diasEntre(ultimoLog.slice(0, 10), hoy) >= 7;

        payload = JSON.stringify({
          titulo: "Reto Vikingo",
          cuerpo: `📊 Tu semana: ${diasSemana}/7 días. Tu récord son ${estado.rachaMax} seguidos.${sinPesarse ? " Te falta pesarte esta semana." : ""}`,
          url: `${siteUrl}${sinPesarse ? "/progreso" : "/"}`,
        });
      } else if (estado.diaPendiente !== null) {
        // Reenganche de inactivos: solo a los 3, 7 y 14 días sin actividad,
        // para que sea un recordatorio y no una molestia cada noche.
        const ultimaActividad = completadosUsuario.reduce<string | null>(
          (max, c) => (max === null || c.completed_at > max ? c.completed_at : max),
          null,
        );
        const diasInactivo = diasEntre(ultimaActividad ?? perfil.fecha_inicio, hoy);

        if (diasInactivo === 3 || diasInactivo === 7 || diasInactivo === 14) {
          payload = JSON.stringify({
            titulo: "Reto Vikingo",
            cuerpo: `Tu Día ${estado.diaPendiente} sigue ahí esperándote. Retomarlo hoy te toma 5 minutos.`,
            url: `${siteUrl}/reto/${estado.diaPendiente}`,
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
