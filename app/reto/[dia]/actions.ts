"use server";

import { revalidatePath } from "next/cache";
import { requireUsuario, getPerfil, diaMaximoDisponible } from "@/lib/progreso";
import { hoyISO } from "@/lib/fecha";
import { DIAS_TOTALES } from "@/lib/types";

/**
 * Checkbox "marcar como completado": un simple hecho (insert/delete), sin
 * ninguna lógica de racha o desbloqueo que proteger — eso se calcula al
 * leer (ver lib/progreso.ts). No afecta qué días puedes ver, solo tu
 * seguimiento personal.
 */
export async function marcarCompletado(formData: FormData) {
  const dia = Number(formData.get("dia"));
  const marcar = formData.get("accion") === "marcar";
  if (!Number.isInteger(dia) || dia < 1 || dia > DIAS_TOTALES) return;

  const { supabase, user } = await requireUsuario();
  const perfil = await getPerfil(supabase, user);
  if (dia > diaMaximoDisponible(perfil)) return;

  if (marcar) {
    await supabase
      .from("daily_completions")
      .upsert({ user_id: user.id, day_number: dia, completed_at: hoyISO() }, { onConflict: "user_id,day_number" });
  } else {
    await supabase.from("daily_completions").delete().eq("user_id", user.id).eq("day_number", dia);
  }

  revalidatePath("/");
  revalidatePath(`/reto/${dia}`);
  revalidatePath("/metodo-secreto");
}
