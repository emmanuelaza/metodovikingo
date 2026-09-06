"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUsuario } from "@/lib/progreso";
import { hoyISO } from "@/lib/fecha";
import type { ResultadoRecuperarRacha } from "@/lib/types";

/** "Perdón de racha": 1 vez al mes. Delegado a la función `recuperar_racha` de Postgres. */
export async function recuperarRacha() {
  const { supabase, user } = await requireUsuario();

  const { data, error } = await supabase.rpc("recuperar_racha", {
    p_user_id: user.id,
    p_hoy: hoyISO(),
  });

  if (error) {
    console.error("recuperar_racha rpc:", error);
    redirect("/dashboard?msg=error");
  }

  const r = data as ResultadoRecuperarRacha;
  revalidatePath("/dashboard");
  redirect("error" in r ? `/dashboard?msg=${r.error}` : "/dashboard?msg=racha_recuperada");
}
