"use server";

import { requireUsuario } from "@/lib/progreso";

export type SuscripcionPush = { endpoint: string; keys: { p256dh: string; auth: string } };

/** Guarda/actualiza la suscripción push del navegador actual. Simple insert/upsert, sin gates. */
export async function guardarSuscripcion(sub: SuscripcionPush) {
  const { supabase, user } = await requireUsuario();
  await supabase.from("push_subscriptions").upsert(
    { user_id: user.id, endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
    { onConflict: "endpoint" },
  );
}
