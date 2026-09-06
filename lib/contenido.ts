import type { PortableTextBlock } from "@portabletext/types";
import { SANITY_CONFIGURADO, sanityClient } from "@/lib/sanity/client";
import { LECCIONES_SEED, type LeccionSeed } from "@/content/lecciones-seed";
import { PIEZAS_SEED } from "@/content/piezas-seed";

/**
 * Capa de contenido. Todo el texto de lecciones y piezas sale de Sanity;
 * si Sanity no está configurado (desarrollo local), se usa content/*.
 */

export type Leccion = {
  dia: number;
  titulo: string;
  palabraDelDia: string;
  contenido: PortableTextBlock[];
  imagenUrl: string | null;
  tipAccionable: string | null;
  cliffhanger: string | null;
  esDiaDePieza: boolean;
};

export type Pieza = {
  numero: number; // 1..4
  dia: number; // 7, 14, 21, 30
  titulo: string;
  texto: string;
};

const QUERY_LECCION = `*[_type == "leccionDiaria" && diaNumero == $dia][0]{
  "dia": diaNumero,
  titulo,
  palabraDelDia,
  contenido,
  "imagenUrl": imagen.asset->url,
  tipAccionable,
  cliffhanger,
  esDiaDePieza
}`;

const QUERY_PIEZAS = `*[_type == "piezaMetodo"] | order(numero asc){ numero, dia, titulo, texto }`;

const QUERY_TITULOS = `*[_type == "leccionDiaria"] | order(diaNumero asc){ "dia": diaNumero, titulo }`;

/** Convierte párrafos de texto plano a bloques Portable Text (para el seed local). */
function parrafosABloques(parrafos: string[]): PortableTextBlock[] {
  return parrafos.map((texto, i) => ({
    _type: "block",
    _key: `p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text: texto, marks: [] }],
  }));
}

function seedALeccion(s: LeccionSeed): Leccion {
  return {
    dia: s.dia,
    titulo: s.titulo,
    palabraDelDia: s.palabraDelDia,
    contenido: parrafosABloques(s.parrafos),
    imagenUrl: null,
    tipAccionable: s.tipAccionable,
    cliffhanger: s.cliffhanger,
    esDiaDePieza: s.esDiaDePieza ?? false,
  };
}

export async function getLeccion(dia: number): Promise<Leccion | null> {
  if (!Number.isInteger(dia) || dia < 1 || dia > 30) return null;

  if (SANITY_CONFIGURADO) {
    const doc = await sanityClient().fetch<Leccion | null>(
      QUERY_LECCION,
      { dia },
      { next: { revalidate: 300 } },
    );
    if (doc) {
      return {
        ...doc,
        contenido: doc.contenido ?? [],
        imagenUrl: doc.imagenUrl ?? null,
        tipAccionable: doc.tipAccionable ?? null,
        cliffhanger: doc.cliffhanger ?? null,
        esDiaDePieza: Boolean(doc.esDiaDePieza),
      };
    }
    // Sin documento en Sanity para este día: cae al seed para no romper el reto.
  }

  const seed = LECCIONES_SEED.find((l) => l.dia === dia);
  return seed ? seedALeccion(seed) : null;
}

export async function getPiezas(): Promise<Pieza[]> {
  if (SANITY_CONFIGURADO) {
    const docs = await sanityClient().fetch<Pieza[]>(QUERY_PIEZAS, {}, { next: { revalidate: 300 } });
    if (docs?.length) return docs;
  }
  return PIEZAS_SEED;
}

export async function getPiezaPorDia(dia: number): Promise<Pieza | null> {
  const piezas = await getPiezas();
  return piezas.find((p) => p.dia === dia) ?? null;
}

export async function getTitulos(): Promise<{ dia: number; titulo: string }[]> {
  if (SANITY_CONFIGURADO) {
    const docs = await sanityClient().fetch<{ dia: number; titulo: string }[]>(
      QUERY_TITULOS,
      {},
      { next: { revalidate: 300 } },
    );
    if (docs?.length) return docs;
  }
  return LECCIONES_SEED.map((l) => ({ dia: l.dia, titulo: l.titulo }));
}
