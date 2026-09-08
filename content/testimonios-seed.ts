export type Testimonio = {
  alias: string;
  texto: string;
};

/**
 * Testimonios ilustrativos, sin fotos ni afirmaciones médicas (nada de
 * testosterona, altura ni resultados imposibles) — solo lo que el reto
 * puede entregar de verdad: fuerza, constancia, medidas, hábitos.
 */
export const TESTIMONIOS_SEED: Testimonio[] = [
  { alias: "Camilo, día 30", texto: "Bajé 4 cm de cintura sin pasar hambre. La clave fue la estructura, no la fuerza de voluntad." },
  { alias: "Julián, día 22", texto: "Nunca había durado más de una semana en un reto. Con este llevo 22 días seguidos entrenando." },
  { alias: "Andrés, día 30", texto: "Subí peso en las tres rutinas principales del split. Se nota hasta cargando las bolsas del mercado." },
  { alias: "Felipe, día 18", texto: "Dejé de improvisar la comida cada día. Saber qué toca de antemano me quitó un estrés que ni sabía que tenía." },
  { alias: "Mateo, día 30", texto: "Duermo mejor desde que fijé un horario fijo de entrenamiento. No esperaba que algo tan simple cambiara tanto." },
  { alias: "Santiago, día 25", texto: "La racha me enganchó más que cualquier meta de peso. No quería ser el que rompía la cadena de días." },
];
