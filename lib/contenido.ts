import { SANITY_CONFIGURADO, sanityClient } from "@/lib/sanity/client";
import { LECCIONES_SEED, type LeccionSeed } from "@/content/lecciones-seed";
import { PIEZAS_SEED } from "@/content/piezas-seed";
import { FASES_SEED, type Fase } from "@/content/fases-seed";

/**
 * Capa de contenido. Todo el texto de lecciones, piezas y fases sale de
 * Sanity; si Sanity no está configurado (desarrollo local), se usa content/*.
 */

export type { Fase };

export type Leccion = {
  dia: number;
  fase: number;
  titulo: string;
  introduccion: string;
  concepto: string;
  rutinaTitulo: string;
  rutinaItems: string[];
  tipAccionable: string;
  previewSiguiente: string;
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
  fase,
  titulo,
  introduccion,
  concepto,
  rutinaTitulo,
  rutinaItems,
  tipAccionable,
  previewSiguiente,
  esDiaDePieza
}`;

const QUERY_PIEZAS = `*[_type == "piezaMetodo"] | order(numero asc){ numero, dia, titulo, texto }`;

const QUERY_TITULOS = `*[_type == "leccionDiaria"] | order(diaNumero asc){ "dia": diaNumero, titulo }`;

const QUERY_FASES = `*[_type == "fase"] | order(numero asc){ numero, nombre, descripcion, diaInicio, diaFin }`;

function seedALeccion(s: LeccionSeed): Leccion {
  return {
    dia: s.dia,
    fase: s.fase,
    titulo: s.titulo,
    introduccion: s.introduccion,
    concepto: s.concepto,
    rutinaTitulo: s.rutinaTitulo,
    rutinaItems: s.rutinaItems,
    tipAccionable: s.tipAccionable,
    previewSiguiente: s.previewSiguiente,
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
        rutinaItems: doc.rutinaItems ?? [],
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

export async function getFases(): Promise<Fase[]> {
  if (SANITY_CONFIGURADO) {
    const docs = await sanityClient().fetch<Fase[]>(QUERY_FASES, {}, { next: { revalidate: 300 } });
    if (docs?.length) return docs;
  }
  return FASES_SEED;
}
