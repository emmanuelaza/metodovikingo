"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUsuario } from "@/lib/progreso";
import { hoyISO } from "@/lib/fecha";

function numeroOpcional(valor: FormDataEntryValue | null, min: number, max: number): number | null {
  const texto = String(valor ?? "")
    .trim()
    .replace(",", ".");
  if (!texto) return null;
  const n = Number(texto);
  if (!Number.isFinite(n) || n < min || n > max) return Number.NaN;
  return Math.round(n * 100) / 100;
}

export async function registrarMedida(formData: FormData) {
  const { supabase, user } = await requireUsuario();

  const peso = numeroOpcional(formData.get("peso_kg"), 20, 400);
  const cintura = numeroOpcional(formData.get("medida_cintura_cm"), 30, 300);
  const nota = String(formData.get("nota") ?? "")
    .trim()
    .slice(0, 200);

  if (Number.isNaN(peso) || Number.isNaN(cintura)) redirect("/progreso?msg=valor_invalido");
  if (peso === null && cintura === null) redirect("/progreso?msg=vacio");

  const { error } = await supabase.from("body_progress_logs").insert({
    user_id: user.id,
    logged_at: hoyISO(),
    peso_kg: peso,
    medida_cintura_cm: cintura,
    nota: nota || null,
  });

  if (error) {
    console.error("registrarMedida:", error);
    redirect("/progreso?msg=error");
  }

  revalidatePath("/progreso");
  redirect("/progreso?msg=guardado");
}

export async function eliminarMedida(formData: FormData) {
  const { supabase, user } = await requireUsuario();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) redirect("/progreso");

  // RLS garantiza que solo borra registros propios; el filtro por user_id es defensa extra.
  await supabase.from("body_progress_logs").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/progreso");
  redirect("/progreso");
}
