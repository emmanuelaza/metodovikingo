export type Objetivo = "bajar_grasa" | "ganar_musculo" | "ambos";

export type Profile = {
  id: string;
  nombre: string | null;
  whatsapp: string | null;
  objetivo: Objetivo | null;
  created_at: string;
};

export type UserProgress = {
  user_id: string;
  current_day: number;
  streak_current: number;
  streak_max: number;
  last_completed_at: string | null; // 'YYYY-MM-DD'
  streak_freezes_used: number;
  streak_freeze_reset_month: string;
  pieces_unlocked: number[];
  reto_completado: boolean;
  updated_at: string;
};

export type BodyLog = {
  id: number;
  user_id: string;
  logged_at: string;
  peso_kg: number | null;
  medida_cintura_cm: number | null;
  nota: string | null;
};

export type ResultadoCompletarDia =
  | {
      success: true;
      nueva_racha: number;
      racha_max: number;
      pieza: boolean;
      reto_completado: boolean;
      siguiente_dia: number;
    }
  | { error: "dia_no_valido" | "ya_completado_hoy" | "no_autorizado" | "sin_progreso" };

export type ResultadoRecuperarRacha =
  | { success: true; racha: number }
  | { error: "sin_racha" | "racha_intacta" | "sin_recuperaciones" | "no_autorizado" | "sin_progreso" };

export const DIAS_TOTALES = 30;
export const DIAS_CON_PIEZA = [7, 14, 21, 30] as const;
