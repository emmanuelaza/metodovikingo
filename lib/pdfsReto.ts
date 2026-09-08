import fs from "node:fs";
import path from "node:path";

/** Fase (1-5) a la que pertenece un día, para ubicar su carpeta en public/pdfs/. */
function faseDelDia(dia: number): number {
  if (dia <= 7) return 1;
  if (dia <= 14) return 2;
  if (dia <= 21) return 3;
  if (dia <= 29) return 4;
  return 5;
}

/**
 * Busca el PDF de un día por su prefijo `dia-NN-` dentro de
 * public/pdfs/fase-X/, sin hardcodear los 30 nombres de archivo (el resto
 * del nombre, "-nombre-del-dia.pdf", puede variar). Devuelve la ruta
 * pública (para usar en un <a href>) o null si no se encontró — server-only
 * (usa fs), llamar solo desde un Server Component.
 */
export function pdfDelDia(dia: number): string | null {
  const fase = faseDelDia(dia);
  const carpeta = path.join(process.cwd(), "public", "pdfs", `fase-${fase}`);
  const prefijo = `dia-${String(dia).padStart(2, "0")}-`;

  try {
    const archivo = fs.readdirSync(carpeta).find((f) => f.toLowerCase().startsWith(prefijo) && f.toLowerCase().endsWith(".pdf"));
    return archivo ? `/pdfs/fase-${fase}/${archivo}` : null;
  } catch {
    return null;
  }
}
