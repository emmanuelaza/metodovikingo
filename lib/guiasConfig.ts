export type GuiaDescargable = {
  fase: number;
  nombre: string;
  descripcion: string;
  /** Ancla de percepción de marketing ("valor de $X, la damos gratis") — no es un precio real, el reto completo es gratuito. */
  valorUsd: number;
  /** Ruta dentro de /public. Coloca el PDF real en esa ruta para activar la descarga. */
  archivo: string;
};

/** Una guía por fase: coincide con la estructura de content/fases-seed.ts. */
export const GUIAS: GuiaDescargable[] = [
  {
    fase: 1,
    nombre: "Guía de Fundamentos",
    descripcion: "Checklist imprimible de la Fase 1: hábitos base para arrancar sin excusas.",
    valorUsd: 17,
    archivo: "/guias/fase-1-fundamentos.pdf",
  },
  {
    fase: 2,
    nombre: "Guía de Forjado",
    descripcion: "Rutinas y progresiones de la Fase 2, listas para imprimir.",
    valorUsd: 19,
    archivo: "/guias/fase-2-forjado.pdf",
  },
  {
    fase: 3,
    nombre: "Guía de Aplicación",
    descripcion: "Plan de ejecución semanal de la Fase 3, sin adivinar qué toca cada día.",
    valorUsd: 22,
    archivo: "/guias/fase-3-aplicacion.pdf",
  },
  {
    fase: 4,
    nombre: "Guía de Anticipación",
    descripcion: "Los ajustes finos de la Fase 4 antes del cierre del reto.",
    valorUsd: 24,
    archivo: "/guias/fase-4-anticipacion.pdf",
  },
  {
    fase: 5,
    nombre: "Manual Completo del Método Vikingo",
    descripcion: "Las 4 Runas y el sistema completo, todo en un solo PDF de referencia.",
    valorUsd: 47,
    archivo: "/guias/fase-5-metodo-completo.pdf",
  },
];
