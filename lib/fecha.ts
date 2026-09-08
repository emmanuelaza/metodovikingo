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

/** Offset (ms) de `timeZone` respecto a UTC en el instante `fecha`. */
function offsetZonaMs(timeZone: string, fecha: Date): number {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(fecha);

  const get = (t: string) => Number(partes.find((p) => p.type === t)?.value);
  const comoUTC = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return comoUTC - fecha.getTime();
}

/** Epoch (ms) de la medianoche de mañana en RETO_TIMEZONE, tomando `hoy` ('YYYY-MM-DD') como referencia. */
export function proximaMedianocheEpoch(hoy: string = hoyISO()): number {
  const [y, m, d] = hoy.split("-").map(Number);
  let epoch = Date.UTC(y, m - 1, d + 1, 0, 0, 0);
  // Dos pasadas para converger incluso si el offset cambia cerca de la transición (DST).
  for (let i = 0; i < 2; i++) {
    const offset = offsetZonaMs(ZONA, new Date(epoch));
    epoch = Date.UTC(y, m - 1, d + 1, 0, 0, 0) - offset;
  }
  return epoch;
}

/** true si `hoy` ('YYYY-MM-DD') cae en domingo. */
export function esDomingo(hoy: string): boolean {
  const [y, m, d] = hoy.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() === 0;
}

/** Formatea 'YYYY-MM-DD' a algo legible en español, ej. "6 sep". */
export function fechaCorta(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es", { day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
