import type { Pieza } from "@/lib/contenido";

/**
 * Runas del Método Secreto (fallback local).
 * En producción se editan en Sanity (tipo `piezaMetodo`).
 * Día 30 no es una runa más: es la síntesis completa (Valhalla).
 */
export const PIEZAS_SEED: Pieza[] = [
  {
    numero: 1,
    dia: 7,
    titulo: "La Primera Runa: Constancia",
    texto:
      "El Método no funciona por intensidad, funciona por repetición. La gente que transforma su cuerpo no es la que tiene la rutina más perfecta, es la que apareció más veces. Constancia no significa nunca fallar: significa que un mal día no se convierte en una mala semana. Guárdala — la vas a necesitar cuando la motivación baje en la Fase 3.",
  },
  {
    numero: 2,
    dia: 14,
    titulo: "La Segunda Runa: Estructura",
    texto:
      "La motivación se acaba; la estructura se queda. Horarios de comida fijos, entrenamiento agendado como una cita que no se cancela, un plato armado con una fórmula en vez de improvisado cada vez. Cuando decides las cosas una sola vez, dejas de gastar energía negociando contigo mismo cada día — esa energía la usas para ejecutar.",
  },
  {
    numero: 3,
    dia: 21,
    titulo: "La Tercera Runa: Medición",
    texto:
      "Lo que no se mide no se puede ajustar. Peso semanal, cintura, fotos, rendimiento en el gimnasio. No para juzgarte: para saber exactamente qué palanca mover cuando algo no funciona, en vez de adivinar o abandonar el plan completo. Constancia + Estructura + Medición son la base de cualquier sistema que funciona a largo plazo.",
  },
  {
    numero: 4,
    dia: 30,
    titulo: "Valhalla: el sistema completo",
    texto:
      "Un vikingo no era el guerrero más fuerte del pueblo — era el que salía a remar todos los días, lloviera o no. Constancia para aparecer en los días difíciles, Estructura para no depender de la motivación, Medición para saber siempre qué ajustar. Las tres juntas forman un sistema que se sostiene solo. La cuarta pieza, la que lo pone en marcha, eres tú ejecutándolo a partir de mañana.",
  },
];
