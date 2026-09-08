import { createAdminClient } from "@/lib/supabase/admin";
import { webpushConfigurado } from "@/lib/push/server";
import { getTitulos } from "@/lib/contenido";
import { diasEntre, hoyISO } from "@/lib/fecha";
import { calcularRacha } from "@/lib/progreso";
import { DIAS_TOTALES } from "@/lib/types";

export const dynamic = "force-dynamic";

type PerfilFila = { id: string; fecha_inicio: string };
type SuscripcionFila = { id: number; user_id: string; endpoint: string; p256dh: string; auth: string };
type CompletadoFila = { user_id: string; completed_at: string };

/**
 * Cron diario (ver vercel.json): a cada usuario cuyo siguiente día del reto se
 * habilitó justo hoy le manda un push simple. No hay "completar" que rastrear:
 * el desbloqueo ya es puro calendario (lib/progreso.ts), este cron solo avisa.
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

  const [{ data: perfiles, error: errorPerfiles }, titulos] = await Promise.all([
    admin.from("profiles").select("id, fecha_inicio").returns<PerfilFila[]>(),
    getTitulos(),
  ]);
  if (errorPerfiles || !perfiles) {
    return Response.json({ enviados: 0, error: errorPerfiles?.message ?? "sin perfiles" }, { status: 500 });
  }

  // user_id -> día que se acaba de habilitar hoy (solo días 2..30; el día 1 no necesita aviso).
  const usuariosANotificar = new Map<string, number>();
  for (const perfil of perfiles) {
    const dia = diasEntre(perfil.fecha_inicio, hoy) + 1;
    if (dia >= 2 && dia <= DIAS_TOTALES) usuariosANotificar.set(perfil.id, dia);
  }
  if (usuariosANotificar.size === 0) return Response.json({ enviados: 0 });

  const { data: suscripciones, error: errorSubs } = await admin
    .from("push_subscriptions")
    .select("id, user_id, endpoint, p256dh, auth")
    .in("user_id", Array.from(usuariosANotificar.keys()))
    .returns<SuscripcionFila[]>();
  if (errorSubs || !suscripciones) {
    return Response.json({ enviados: 0, error: errorSubs?.message ?? "sin suscripciones" }, { status: 500 });
  }

  // Racha de cada usuario (antes del día que se acaba de habilitar) para
  // variar el mensaje: motivar a no romperla en vez de un aviso genérico.
  const { data: completados } = await admin
    .from("daily_completions")
    .select("user_id, completed_at")
    .in("user_id", suscripciones.map((s) => s.user_id))
    .returns<CompletadoFila[]>();

  const fechasPorUsuario = new Map<string, string[]>();
  for (const c of completados ?? []) {
    const lista = fechasPorUsuario.get(c.user_id) ?? [];
    lista.push(c.completed_at);
    fechasPorUsuario.set(c.user_id, lista);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  let enviados = 0;
  const idsExpiradas: number[] = [];

  await Promise.all(
    suscripciones.map(async (sub) => {
      const dia = usuariosANotificar.get(sub.user_id);
      if (!dia) return;
      const titulo = titulos.find((t) => t.dia === dia)?.titulo;
      const { racha } = calcularRacha(fechasPorUsuario.get(sub.user_id) ?? [], hoy);
      const prefijo = racha > 1 ? `🔥 Llevas ${racha} días seguidos. ` : "";

      const payload = JSON.stringify({
        titulo: "Reto Vikingo",
        cuerpo: titulo ? `${prefijo}Día ${dia} disponible: ${titulo}` : `${prefijo}Tu día ${dia} ya está disponible.`,
        url: `${siteUrl}/reto/${dia}`,
      });

      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload,
        );
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
