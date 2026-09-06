export type Receta = {
  slug: string;
  titulo: string;
  tiempo: string;
  proteina: string;
  ingredientes: string[];
  pasos: string[];
  etiquetas: string[];
};

export const RECETAS: Receta[] = [
  {
    slug: "avena-proteica",
    titulo: "Avena proteica de la mañana",
    tiempo: "5 min",
    proteina: "30 g",
    ingredientes: ["50 g de avena", "1 scoop de proteína (o 150 g de yogur griego)", "200 ml de leche o agua", "1 fruta", "Canela"],
    pasos: [
      "Cocina la avena con la leche 3 minutos en microondas.",
      "Deja enfriar un poco y mezcla la proteína.",
      "Añade la fruta picada y canela.",
    ],
    etiquetas: ["desayuno", "rápido"],
  },
  {
    slug: "pollo-arroz-verduras",
    titulo: "Pollo, arroz y verduras (meal prep)",
    tiempo: "30 min",
    proteina: "40 g por porción",
    ingredientes: ["600 g de pechuga de pollo", "300 g de arroz crudo", "1 brócoli", "2 zanahorias", "Aceite de oliva, sal, pimentón, ajo"],
    pasos: [
      "Cocina el arroz. Mientras, corta el pollo en tiras y sazona.",
      "Saltea el pollo en una sartén con 1 cucharada de aceite hasta dorar.",
      "Cocina las verduras al vapor 6-8 minutos.",
      "Reparte en 4 recipientes. Aguanta 4 días en la nevera.",
    ],
    etiquetas: ["almuerzo", "meal prep"],
  },
  {
    slug: "tortilla-claras-espinaca",
    titulo: "Tortilla de claras y espinaca",
    tiempo: "10 min",
    proteina: "28 g",
    ingredientes: ["2 huevos + 4 claras", "1 puñado de espinaca", "30 g de queso fresco", "Sal y pimienta"],
    pasos: [
      "Bate los huevos con las claras.",
      "Saltea la espinaca 1 minuto y vierte el huevo.",
      "Añade el queso, dobla y sirve.",
    ],
    etiquetas: ["cena", "rápido"],
  },
  {
    slug: "yogur-frutos-secos",
    titulo: "Snack: yogur griego con frutos secos",
    tiempo: "2 min",
    proteina: "18 g",
    ingredientes: ["200 g de yogur griego natural", "15 g de nueces o almendras", "Un chorrito de miel (opcional)"],
    pasos: ["Mezcla todo. Listo."],
    etiquetas: ["snack"],
  },
  {
    slug: "atun-garbanzos",
    titulo: "Ensalada de atún y garbanzos",
    tiempo: "8 min",
    proteina: "35 g",
    ingredientes: ["1 lata de atún al natural", "150 g de garbanzos cocidos", "Tomate, cebolla morada, pepino", "Aceite de oliva, limón, sal"],
    pasos: ["Escurre el atún y los garbanzos.", "Pica las verduras.", "Mezcla y aliña con aceite y limón."],
    etiquetas: ["almuerzo", "sin cocinar"],
  },
  {
    slug: "batido-post-entreno",
    titulo: "Batido post-entreno",
    tiempo: "3 min",
    proteina: "30 g",
    ingredientes: ["1 scoop de proteína", "1 banano", "250 ml de leche", "Hielo"],
    pasos: ["Licúa todo 30 segundos."],
    etiquetas: ["post-entreno", "rápido"],
  },
];
