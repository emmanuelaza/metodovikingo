/**
 * Utilidades de fecha en la zona horaria del reto.
 * "Hoy" se calcula siempre en RETO_TIMEZONE (no en UTC) para que el corte
 * diario coincida con el día real de los usuarios.
 */

const ZONA = process.env.RETO_TIMEZONE || "America/Bogota";

/** Devuelve la fecha de hoy como 'YYYY-MM-DD' en la zona horaria del reto. */
export function hoyISO(): string {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Diferencia en días enteros entre dos fechas 'YYYY-MM-DD' (b - a). */
export function diasEntre(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const utcA = Date.UTC(ay, am - 1, ad);
  const utcB = Date.UTC(by, bm - 1, bd);
  return Math.round((utcB - utcA) / 86_400_000);
}

/** Formatea 'YYYY-MM-DD' a algo legible en español, ej. "6 sep". */
export function fechaCorta(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es", { day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
