export type PreguntaQuiz = {
  pregunta: string;
  opciones: string[];
  correcta: number;
};

export type QuizFase = {
  /** Día de cierre de fase donde aparece este repaso (7, 14, 21, 29, 30). */
  dia: number;
  preguntas: PreguntaQuiz[];
};

/**
 * Repaso de 2 preguntas por cierre de fase, escrito a partir del contenido
 * real de esos días (ver content/lecciones-seed.ts, días 7/14/21/29/30 —
 * todos ya son "días de repaso" en el guion original).
 */
export const QUIZZES_SEED: QuizFase[] = [
  {
    dia: 7,
    preguntas: [
      {
        pregunta: "Según la Runa de la Constancia, ¿qué es lo que realmente transforma el cuerpo?",
        opciones: ["Tener la rutina más perfecta", "Aparecer más veces, incluso en los días malos", "No fallar nunca, ni un solo día"],
        correcta: 1,
      },
      {
        pregunta: "¿Qué significa que \"un mal día no se convierte en una mala semana\"?",
        opciones: [
          "Que un tropiezo puntual no debe hacerte abandonar el plan completo",
          "Que si fallas un día debes repetir la semana",
          "Que los días malos no cuentan para la racha",
        ],
        correcta: 0,
      },
    ],
  },
  {
    dia: 14,
    preguntas: [
      {
        pregunta: "¿Cuál es la diferencia clave entre motivación y estructura?",
        opciones: [
          "Son exactamente lo mismo",
          "La estructura sigue funcionando cuando la motivación ya no está",
          "La motivación dura más tiempo que la estructura",
        ],
        correcta: 1,
      },
      {
        pregunta: "¿Para qué sirve fijar tus horarios de comida y entrenamiento una sola vez?",
        opciones: [
          "Para no tener que decidir (y negociar contigo mismo) cada día",
          "Para poder improvisar mejor cada día",
          "No tiene ningún beneficio real",
        ],
        correcta: 0,
      },
    ],
  },
  {
    dia: 21,
    preguntas: [
      {
        pregunta: "Según la Runa de la Medición, ¿para qué sirve medir tu progreso?",
        opciones: [
          "Para juzgarte si el número no cambia",
          "Es solo un dato decorativo sin uso real",
          "Para saber exactamente qué ajustar, en vez de adivinar",
        ],
        correcta: 2,
      },
      {
        pregunta: "¿Cuáles son las tres runas que ya tienes reunidas en el día 21?",
        opciones: [
          "Fuerza, Velocidad, Resistencia",
          "Constancia, Estructura, Medición",
          "Disciplina, Motivación, Suerte",
        ],
        correcta: 1,
      },
    ],
  },
  {
    dia: 29,
    preguntas: [
      {
        pregunta: "¿Qué construyó específicamente la Fase 1 del reto?",
        opciones: ["El split de entrenamiento de 4 días", "Las bases: alimentación, descanso y medición", "El Juramento Vikingo"],
        correcta: 1,
      },
      {
        pregunta: "Según el repaso del día 29, las 30 lecciones del reto son…",
        opciones: [
          "30 lecciones sueltas, cada una independiente de las demás",
          "Solo válidas si no fallaste ningún día",
          "Un solo sistema donde cada fase construye sobre la anterior",
        ],
        correcta: 2,
      },
    ],
  },
  {
    dia: 30,
    preguntas: [
      {
        pregunta: "En la metáfora del Método, ¿qué hacía un vikingo distinto al resto?",
        opciones: [
          "Era el guerrero más fuerte del pueblo",
          "Salía a remar todos los días, lloviera o no",
          "Nunca tuvo un mal día de entrenamiento",
        ],
        correcta: 1,
      },
      {
        pregunta: "Según la lección final, el día 31 es…",
        opciones: [
          "El final del Método, ya no hay nada más que hacer",
          "El primer día en que aplicas el Método sin que nadie te lo recuerde",
          "Un día de descanso obligatorio antes de empezar de nuevo",
        ],
        correcta: 1,
      },
    ],
  },
];

export function quizDelDia(dia: number): QuizFase | undefined {
  return QUIZZES_SEED.find((q) => q.dia === dia);
}
