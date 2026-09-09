"use server";

import { revalidatePath } from "next/cache";
import { requireUsuario, getPerfil, getFechasCompletado, diaMaximoDisponible } from "@/lib/progreso";
import { hoyISO } from "@/lib/fecha";
import { DIAS_TOTALES } from "@/lib/types";

/**
 * Marcar un día como completado es lo que abre el siguiente: el desbloqueo
 * está encadenado (ver `diaMaximoDisponible` en lib/progreso.ts), así que
 * este insert/delete sí decide qué puede ver el usuario. Igual no hace
 * falta guardar contadores: el estado se deriva al leer.
 */
export async function marcarCompletado(formData: FormData) {
  const dia = Number(formData.get("dia"));
  const marcar = formData.get("accion") === "marcar";
  if (!Number.isInteger(dia) || dia < 1 || dia > DIAS_TOTALES) return;

  const { supabase, user } = await requireUsuario();
  // getPerfil garantiza que exista la fila de profiles a la que apunta la FK.
  const [, fechas] = await Promise.all([getPerfil(supabase, user), getFechasCompletado(supabase, user)]);
  if (dia > diaMaximoDisponible(fechas)) return;

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
