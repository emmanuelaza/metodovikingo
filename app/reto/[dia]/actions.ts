"use server";

import { revalidatePath } from "next/cache";
import { requireUsuario } from "@/lib/progreso";
import { getLeccion, getPiezaPorDia, type Pieza } from "@/lib/contenido";
import { palabrasCoinciden } from "@/lib/texto";
import { hoyISO } from "@/lib/fecha";
import type { ResultadoCompletarDia } from "@/lib/types";

export type ResultadoAccion =
  | {
      ok: true;
      nuevaRacha: number;
      rachaMax: number;
      retoCompletado: boolean;
      siguienteDia: number;
      pieza: Pieza | null;
    }
  | { ok: false; error: string; mensaje: string };

const MENSAJES_ERROR: Record<string, string> = {
  palabra_incorrecta: "Esa no es la palabra. Vuelve a leer la lección 👀",
  dia_no_valido: "Este día no está disponible para completar.",
  ya_completado_hoy: "Ya completaste un día hoy. El siguiente se abre mañana.",
  no_autorizado: "No tienes permiso para esta acción.",
  sin_progreso: "No encontramos tu progreso. Recarga la página.",
};

/**
 * Única vía para completar un día. Valida la palabra en el servidor
 * (la palabra correcta nunca viaja al cliente) y delega la lógica de
 * racha a la función `completar_dia` de Postgres.
 */
export async function completarDia(dia: number, palabra: string): Promise<ResultadoAccion> {
  const { supabase, user } = await requireUsuario();

  if (!Number.isInteger(dia) || dia < 1 || dia > 30) {
    return { ok: false, error: "dia_no_valido", mensaje: MENSAJES_ERROR.dia_no_valido };
  }

  const leccion = await getLeccion(dia);
  if (!leccion) {
    return { ok: false, error: "dia_no_valido", mensaje: "La lección de este día aún no está publicada." };
  }

  const palabraLimpia = String(palabra ?? "").slice(0, 100);
  if (!palabrasCoinciden(palabraLimpia, leccion.palabraDelDia)) {
    return { ok: false, error: "palabra_incorrecta", mensaje: MENSAJES_ERROR.palabra_incorrecta };
  }

  const { data, error } = await supabase.rpc("completar_dia", {
    p_user_id: user.id,
    p_day: dia,
    p_palabra: palabraLimpia,
    p_hoy: hoyISO(),
  });

  if (error) {
    console.error("completar_dia rpc:", error);
    return { ok: false, error: "rpc", mensaje: "Algo falló al guardar. Intenta de nuevo." };
  }

  const resultado = data as ResultadoCompletarDia;
  if ("error" in resultado) {
    return {
      ok: false,
      error: resultado.error,
      mensaje: MENSAJES_ERROR[resultado.error] ?? "No se pudo completar el día.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/reto/${dia}`);
  revalidatePath("/metodo-secreto");

  const pieza = resultado.pieza ? await getPiezaPorDia(dia) : null;

  return {
    ok: true,
    nuevaRacha: resultado.nueva_racha,
    rachaMax: resultado.racha_max,
    retoCompletado: resultado.reto_completado,
    siguienteDia: resultado.siguiente_dia,
    pieza,
  };
}
