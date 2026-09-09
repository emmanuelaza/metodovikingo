import { createAdminClient } from "@/lib/supabase/admin";
import { webpushConfigurado } from "@/lib/push/server";
import { getTitulos } from "@/lib/contenido";
import { diasEntre, hoyISO } from "@/lib/fecha";
import { calcularEstadoCurso } from "@/lib/progreso";
import type { Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

type SuscripcionFila = { id: number; user_id: string; endpoint: string; p256dh: string; auth: string };
type CompletadoFila = { user_id: string; day_number: number; completed_at: string };

/**
 * Cron de la mañana (ver vercel.json): avisa a quien se le acaba de abrir
 * un día nuevo, es decir, a quien completó el día anterior *ayer* — el
 * desbloqueo está encadenado a completar (lib/progreso.ts), así que el
 * corte ocurre en la medianoche siguiente a marcar.
 *
 * A quien no completó nada no se le insiste aquí: de eso se encarga el
 * cron de la noche, que solo reengancha a los 3, 7 y 14 días de ausencia
 * en vez de repetir el mismo aviso cada mañana.
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

  const { data: suscripciones, error: errorSubs } = await admin
    .from("push_subscriptions")
    .select("id, user_id, endpoint, p256dh, auth")
    .returns<SuscripcionFila[]>();
  if (errorSubs || !suscripciones || suscripciones.length === 0) {
    return Response.json({ enviados: 0, error: errorSubs?.message ?? "sin suscripciones" });
  }

  const userIds = suscripciones.map((s) => s.user_id);
  const [{ data: perfiles }, { data: completados }, titulos] = await Promise.all([
    admin.from("profiles").select("id, fecha_inicio, created_at").in("id", userIds).returns<Profile[]>(),
    admin
      .from("daily_completions")
      .select("user_id, day_number, completed_at")
      .in("user_id", userIds)
      .returns<CompletadoFila[]>(),
    getTitulos(),
  ]);

  const perfilPorUsuario = new Map((perfiles ?? []).map((p) => [p.id, p]));
  const completadosPorUsuario = new Map<string, CompletadoFila[]>();
  for (const c of completados ?? []) {
    const lista = completadosPorUsuario.get(c.user_id) ?? [];
    lista.push(c);
    completadosPorUsuario.set(c.user_id, lista);
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
      const dia = estado.diaPendiente;
      if (dia === null || dia === 1) return;

      // El día se abrió esta medianoche solo si el anterior se completó ayer.
      const anterior = completadosUsuario.find((c) => c.day_number === dia - 1);
      if (!anterior || diasEntre(anterior.completed_at, hoy) !== 1) return;

      const titulo = titulos.find((t) => t.dia === dia)?.titulo;
      const prefijo = estado.racha > 1 ? `🔥 Llevas ${estado.racha} días seguidos. ` : "";

      const payload = JSON.stringify({
        titulo: "Reto Vikingo",
        cuerpo: titulo ? `${prefijo}Día ${dia} disponible: ${titulo}` : `${prefijo}Tu día ${dia} ya está disponible.`,
        url: `${siteUrl}/reto/${dia}`,
      });

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
