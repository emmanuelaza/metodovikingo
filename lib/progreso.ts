import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { diasEntre, hoyISO } from "@/lib/fecha";
import { DIAS_TOTALES, type Profile } from "@/lib/types";

/**
 * Devuelve el cliente y el usuario. El login es anónimo y sin fricción:
 * el middleware (lib/supabase/middleware.ts) ya crea la sesión anónima en
 * la primera visita, así que aquí siempre debería haber un usuario. Si por
 * lo que sea no lo hay (edge case), se reintenta recargando "/", que vuelve
 * a pasar por el middleware.
 */
export async function requireUsuario(): Promise<{ supabase: SupabaseClient; user: User }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");
  return { supabase, user };
}

/** Lee el perfil del usuario. Si no existe todavía (trigger en curso), lo crea. */
export async function getPerfil(supabase: SupabaseClient, user: User): Promise<Profile> {
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (data) return data as Profile;

  const { data: creado, error } = await supabase
    .from("profiles")
    .insert({ id: user.id })
    .select("*")
    .single();

  if (error || !creado) {
    throw new Error(`No se pudo crear el perfil del usuario: ${error?.message ?? "sin datos"}`);
  }
  return creado as Profile;
}

/**
 * Día máximo habilitado (1..30). El desbloqueo está **encadenado a
 * completar**: el día D+1 se abre en la medianoche siguiente a haber
 * completado el día D. Dos consecuencias buscadas: nadie se salta
 * contenido, y quien se ausenta no pierde nada — vuelve exactamente donde
 * lo dejó, porque el reloj no corre solo.
 */
export function diaMaximoDisponible(
  fechasCompletado: { day_number: number; completed_at: string }[],
  hoy: string = hoyISO(),
): number {
  const fechaPorDia = new Map(fechasCompletado.map((f) => [f.day_number, f.completed_at]));

  let dia = 1;
  while (dia < DIAS_TOTALES) {
    const completadoEl = fechaPorDia.get(dia);
    // Hace falta haberlo completado y que haya pasado al menos una medianoche.
    if (!completadoEl || diasEntre(completadoEl, hoy) < 1) break;
    dia++;
  }
  return dia;
}

export type EstadoCurso = {
  diaMaximo: number;
  /** Días completados (marcados con el checkbox), sin importar el orden. */
  diasCompletados: Set<number>;
  /** Primer día habilitado que aún no se marcó como completado (o null si no queda ninguno). */
  diaPendiente: number | null;
  cursoCompletado: boolean;
  racha: number;
  rachaMax: number;
  /** Días desde la última lección marcada; null si nunca marcó ninguna. */
  diasDesdeUltimaActividad: number | null;
};

/**
 * Calcula todo el estado visible del curso a partir de fecha_inicio y las
 * fechas en que se marcaron días como completados. No hay contadores
 * guardados: se deriva todo en cada lectura, así que nunca se desincroniza.
 */
export function calcularEstadoCurso(
  perfil: Profile,
  fechasCompletado: { day_number: number; completed_at: string }[],
  hoy: string = hoyISO(),
): EstadoCurso {
  const diaMaximo = diaMaximoDisponible(fechasCompletado, hoy);
  const diasCompletados = new Set(fechasCompletado.map((f) => f.day_number));

  let diaPendiente: number | null = null;
  for (let d = 1; d <= diaMaximo; d++) {
    if (!diasCompletados.has(d)) {
      diaPendiente = d;
      break;
    }
  }

  const { racha, rachaMax } = calcularRacha(
    fechasCompletado.map((f) => f.completed_at),
    hoy,
  );

  const ultimaActividad = fechasCompletado.reduce<string | null>(
    (max, f) => (max === null || f.completed_at > max ? f.completed_at : max),
    null,
  );

  return {
    diaMaximo,
    diasCompletados,
    diaPendiente,
    cursoCompletado: diasCompletados.has(DIAS_TOTALES),
    racha,
    rachaMax,
    diasDesdeUltimaActividad: ultimaActividad === null ? null : diasEntre(ultimaActividad, hoy),
  };
}

/**
 * Racha = días de calendario consecutivos con al menos una lección marcada
 * (como GitHub/Duolingo: importa que hayas entrado, no cuál día del curso).
 * Si el último día activo no fue hoy ni ayer, la racha visible es 0.
 */
export function calcularRacha(fechas: string[], hoy: string): { racha: number; rachaMax: number } {
  const unicas = Array.from(new Set(fechas)).sort();
  if (unicas.length === 0) return { racha: 0, rachaMax: 0 };

  let rachaMax = 1;
  let corrida = 1;
  for (let i = 1; i < unicas.length; i++) {
    corrida = diasEntre(unicas[i - 1], unicas[i]) === 1 ? corrida + 1 : 1;
    rachaMax = Math.max(rachaMax, corrida);
  }

  const ultima = unicas[unicas.length - 1];
  const diff = diasEntre(ultima, hoy);
  if (diff > 1) return { racha: 0, rachaMax };

  // Recorrer hacia atrás desde la última fecha activa para contar la racha vigente.
  let racha = 1;
  for (let i = unicas.length - 1; i > 0; i--) {
    if (diasEntre(unicas[i - 1], unicas[i]) === 1) racha++;
    else break;
  }
  return { racha, rachaMax };
}

/**
 * Cuántas personas distintas completaron alguna lección hoy (prueba social).
 * Va por la función RPC `completados_hoy` (migración 0005) porque RLS impide
 * contar filas de otros usuarios. Devuelve null si la migración todavía no
 * está aplicada — la página simplemente no muestra el dato en vez de romperse.
 */
export async function contarCompletadosHoy(
  supabase: SupabaseClient,
  hoy: string = hoyISO(),
): Promise<number | null> {
  const { data, error } = await supabase.rpc("completados_hoy", { fecha: hoy });
  if (error || typeof data !== "number") return null;
  return data;
}

export async function getFechasCompletado(
  supabase: SupabaseClient,
  user: User,
): Promise<{ day_number: number; completed_at: string }[]> {
  const { data } = await supabase
    .from("daily_completions")
    .select("day_number, completed_at")
    .eq("user_id", user.id);
  return data ?? [];
}
