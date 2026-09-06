export type Profile = {
  id: string;
  fecha_inicio: string; // 'YYYY-MM-DD'
  created_at: string;
};

export type BodyLog = {
  id: number;
  user_id: string;
  logged_at: string;
  peso_kg: number | null;
  medida_cintura_cm: number | null;
  nota: string | null;
};

export const DIAS_TOTALES = 30;
export const DIAS_CON_PIEZA = [7, 14, 21, 30] as const;
