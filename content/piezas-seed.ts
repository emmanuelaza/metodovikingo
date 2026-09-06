import type { Pieza } from "@/lib/contenido";

/**
 * Piezas del Método Secreto (fallback local).
 * En producción se editan en Sanity (tipo `piezaMetodo`).
 */
export const PIEZAS_SEED: Pieza[] = [
  {
    numero: 1,
    dia: 7,
    titulo: "Constancia",
    texto:
      "El Método no funciona por intensidad, funciona por repetición. Siete días seguidos valen más que un mes perfecto que nunca llega. Tu primera pieza: hacer algo pequeño todos los días, sin excepción.",
  },
  {
    numero: 2,
    dia: 14,
    titulo: "Estructura",
    texto:
      "La motivación se acaba; la estructura se queda. Horarios de comida fijos, proteína en cada plato, entrenamiento agendado como una cita. Tu segunda pieza: decidir una vez, no cada día.",
  },
  {
    numero: 3,
    dia: 21,
    titulo: "Medición",
    texto:
      "Lo que no se mide no se puede ajustar. Peso semanal, cintura, fotos, pasos. No para juzgarte: para saber qué palanca mover. Tu tercera pieza: datos antes que sensaciones.",
  },
  {
    numero: 4,
    dia: 30,
    titulo: "Sistema",
    texto:
      "Constancia + Estructura + Medición = un sistema que corre solo. El Método Vikingo es eso: un ciclo de 4 semanas que repites, ajustas y vuelves a repetir. La cuarta pieza eres tú, ejecutándolo.",
  },
];
