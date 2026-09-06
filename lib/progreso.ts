import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { diasEntre, hoyISO } from "@/lib/fecha";
import { DIAS_TOTALES, type UserProgress } from "@/lib/types";

/** Devuelve el cliente y el usuario autenticado; redirige a "/" si no hay sesión. */
export async function requireUsuario(): Promise<{ supabase: SupabaseClient; user: User }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/?msg=login");
  return { supabase, user };
}

/**
 * Lee el progreso del usuario. Si no existe (p. ej. el trigger no estaba
 * instalado cuando se registró), lo crea con valores por defecto.
 */
export async function getProgreso(supabase: SupabaseClient, user: User): Promise<UserProgress> {
  const { data } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (data) return data as UserProgress;

  const meta = (user.user_metadata ?? {}) as Record<string, string | undefined>;
  await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        nombre: meta.nombre ?? null,
        whatsapp: meta.whatsapp ?? null,
        objetivo: ["bajar_grasa", "ganar_musculo", "ambos"].includes(meta.objetivo ?? "")
          ? meta.objetivo
          : null,
      },
      { onConflict: "id" },
    );

  const { data: creado, error } = await supabase
    .from("user_progress")
    .insert({ user_id: user.id })
    .select("*")
    .single();

  if (error || !creado) {
    throw new Error(`No se pudo crear el progreso del usuario: ${error?.message ?? "sin datos"}`);
  }
  return creado as UserProgress;
}

export type EstadoRacha = {
  hoy: string;
  /** Días desde la última vez que completó (null si nunca). */
  diasSinCompletar: number | null;
  completadoHoy: boolean;
  /** true si dejó pasar ≥ 2 días: la racha se reiniciará al completar, salvo que la recupere. */
  rachaRota: boolean;
  /** Racha que se muestra al usuario (0 si está rota). */
  rachaVisible: number;
  recuperacionesDisponibles: number;
  puedeRecuperar: boolean;
  /** Día pendiente (1..30) o null si terminó el reto. */
  diaPendiente: number | null;
  /** Si hoy ya completó, el día pendiente se abre mañana. */
  diaBloqueadoHastaManana: boolean;
  porcentaje: number;
};

export function estadoRacha(p: UserProgress, hoy: string = hoyISO()): EstadoRacha {
  const diasSinCompletar = p.last_completed_at ? diasEntre(p.last_completed_at, hoy) : null;
  const completadoHoy = diasSinCompletar !== null && diasSinCompletar <= 0;
  const rachaRota = diasSinCompletar !== null && diasSinCompletar >= 2 && p.streak_current > 0;

  const mesActual = hoy.slice(0, 7);
  const mesReset = (p.streak_freeze_reset_month ?? "").slice(0, 7);
  const usadasEsteMes = mesActual > mesReset ? 0 : p.streak_freezes_used;
  const recuperacionesDisponibles = Math.max(0, 1 - usadasEsteMes);

  const diasCompletados = Math.min(p.current_day - 1, DIAS_TOTALES);
  const diaPendiente = p.reto_completado || p.current_day > DIAS_TOTALES ? null : p.current_day;

  return {
    hoy,
    diasSinCompletar,
    completadoHoy,
    rachaRota,
    rachaVisible: rachaRota ? 0 : p.streak_current,
    recuperacionesDisponibles,
    puedeRecuperar: rachaRota && recuperacionesDisponibles > 0 && !p.reto_completado,
    diaPendiente,
    diaBloqueadoHastaManana: diaPendiente !== null && completadoHoy,
    porcentaje: Math.round((diasCompletados / DIAS_TOTALES) * 100),
  };
}
