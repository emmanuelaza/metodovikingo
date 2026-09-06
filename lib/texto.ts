/** Normaliza texto para comparar palabras: sin tildes, sin espacios extra, minúsculas. */
export function normalizarPalabra(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function palabrasCoinciden(a: string, b: string): boolean {
  return normalizarPalabra(a) === normalizarPalabra(b);
}
