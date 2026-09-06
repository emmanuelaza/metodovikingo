/**
 * Lecciones de fallback (se usan solo si Sanity no está configurado o falta el día).
 * El contenido real se escribe en Sanity: tipo `leccionDiaria`.
 *
 * Regla: la palabra del día debe aparecer dentro de la lección para que el
 * usuario la encuentre leyendo.
 */
export type LeccionSeed = {
  dia: number;
  titulo: string;
  palabraDelDia: string;
  parrafos: string[];
  tipAccionable: string;
  cliffhanger: string;
  esDiaDePieza?: boolean;
};

export const LECCIONES_SEED: LeccionSeed[] = [
  {
    dia: 1,
    titulo: "El punto de partida",
    palabraDelDia: "DÉFICIT",
    parrafos: [
      "Bienvenido al Reto Vikingo. Durante 30 días vas a recibir una lección corta, un tip que puedes aplicar hoy mismo y, cada semana, una pieza del método completo.",
      "Empecemos por la única regla que no se puede negociar: para bajar grasa necesitas un déficit calórico. Comer un poco menos energía de la que gastas. No hay alimento mágico ni horario mágico; hay balance.",
      "No te pido que cuentes calorías para siempre. Te pido que durante estos 30 días entiendas de dónde sale tu energía y a dónde va.",
    ],
    tipAccionable: "Hoy anota todo lo que comes, sin cambiar nada. Solo observa.",
    cliffhanger: "Mañana: por qué el 90 % de las dietas fallan antes del día 14.",
  },
  {
    dia: 2,
    titulo: "Por qué las dietas fallan",
    palabraDelDia: "HÁBITO",
    parrafos: [
      "Las dietas fallan porque dependen de motivación, y la motivación se agota. Lo que se queda es el hábito: la acción que haces sin discutir contigo mismo.",
      "Un hábito pequeño repetido 30 días le gana a un plan perfecto abandonado en 10. Por eso este reto es diario y corto.",
    ],
    tipAccionable: "Elige UNA acción mínima (un vaso de agua al despertar, por ejemplo) y hazla hoy.",
    cliffhanger: "Mañana hablamos del nutriente que decide si pierdes grasa o pierdes músculo.",
  },
  {
    dia: 3,
    titulo: "El pilar: proteína",
    palabraDelDia: "PROTEÍNA",
    parrafos: [
      "Si solo pudieras cambiar una cosa de tu alimentación, sería esta: más proteína. Te sacia más, protege tu músculo cuando estás en déficit y cuesta más energía digerirla.",
      "Referencia simple: una porción del tamaño de tu palma en cada comida principal. Huevos, pollo, pescado, carne magra, legumbres, yogur griego.",
    ],
    tipAccionable: "Agrega una fuente de proteína a tu desayuno de hoy.",
    cliffhanger: "Mañana: el hambre que no es hambre.",
  },
  {
    dia: 4,
    titulo: "Hambre falsa",
    palabraDelDia: "AGUA",
    parrafos: [
      "Muchas veces lo que sientes como hambre es sed, aburrimiento o cansancio. Antes de comer entre horas, toma un vaso de agua y espera 10 minutos.",
      "El agua también mejora tu rendimiento al entrenar y reduce la retención de líquidos que te hace ver más hinchado.",
    ],
    tipAccionable: "Ten una botella de agua visible todo el día. Meta: 2 litros.",
    cliffhanger: "Mañana: lo que pasa con tu grasa mientras duermes.",
  },
  {
    dia: 5,
    titulo: "Dormir también entrena",
    palabraDelDia: "SUEÑO",
    parrafos: [
      "Dormir poco sube el cortisol y la grelina (hormona del hambre) y baja la leptina (saciedad). Resultado: al día siguiente comes más y con más antojos.",
      "El sueño no es tiempo perdido; es cuando tu cuerpo repara músculo y regula el apetito. Apunta a 7-8 horas.",
    ],
    tipAccionable: "Hoy, pantallas fuera 30 minutos antes de dormir.",
    cliffhanger: "Mañana: el ejercicio más subestimado del mundo.",
  },
  {
    dia: 6,
    titulo: "El ejercicio invisible",
    palabraDelDia: "PASOS",
    parrafos: [
      "Caminar es el quemador de grasa más subestimado. No cansa, no genera hambre extra y suma cientos de calorías al día sin que lo notes.",
      "No necesitas 10.000 pasos desde hoy. Necesitas más que ayer. Sube 1.000 pasos cada semana.",
    ],
    tipAccionable: "Mira cuántos pasos hiciste ayer y súmale 1.000 hoy.",
    cliffhanger: "Mañana cumples una semana… y desbloqueas la primera pieza del Método.",
  },
  {
    dia: 7,
    titulo: "Primera pieza del Método",
    palabraDelDia: "CONSTANCIA",
    parrafos: [
      "Siete días. La mayoría de la gente nunca llega aquí. Tú sí. Y eso te enseña la primera pieza del Método: constancia.",
      "No importa si el día fue perfecto. Importa que apareciste. Ese músculo mental es el que va a mover todo lo demás.",
    ],
    tipAccionable: "Comparte tu racha de 7 días. Hacerlo público la protege.",
    cliffhanger: "Mañana: el macronutriente que te han hecho odiar sin razón.",
    esDiaDePieza: true,
  },
  {
    dia: 8,
    titulo: "Carbohidratos: no son el enemigo",
    palabraDelDia: "ENERGÍA",
    parrafos: [
      "Los carbohidratos no engordan por sí mismos; engorda el exceso total. Son tu fuente principal de energía para entrenar y pensar.",
      "La clave es la calidad y el momento: arroz, papa, avena, frutas alrededor del entrenamiento; menos ultraprocesados en cualquier momento.",
    ],
    tipAccionable: "Cambia un carbohidrato procesado de hoy por uno entero (pan blanco → avena, por ejemplo).",
    cliffhanger: "Mañana: las grasas que sí necesitas.",
  },
  {
    dia: 9,
    titulo: "Grasas buenas",
    palabraDelDia: "GRASA",
    parrafos: [
      "Comer grasa no es lo mismo que acumular grasa. Aguacate, aceite de oliva, frutos secos, huevo y pescado azul regulan tus hormonas y te sacian.",
      "Cuidado: la grasa es densa (9 kcal por gramo). Un puñado de frutos secos es porción; medio paquete no.",
    ],
    tipAccionable: "Mide con cuchara el aceite que usas al cocinar hoy.",
    cliffhanger: "Mañana aprenderás a leer una etiqueta en 10 segundos.",
  },
  {
    dia: 10,
    titulo: "Leer etiquetas en 10 segundos",
    palabraDelDia: "ETIQUETA",
    parrafos: [
      "Ignora el frente del empaque; es marketing. Ve a la etiqueta nutricional y mira tres cosas: calorías por porción, gramos de proteína y gramos de azúcar.",
      "Si la lista de ingredientes es más larga que tu brazo y no reconoces la mitad, no es comida de base.",
    ],
    tipAccionable: "Revisa la etiqueta de tres productos que tengas en casa.",
    cliffhanger: "Mañana: por qué levantar pesas cambia la ecuación.",
  },
  {
    dia: 11,
    titulo: "Fuerza: la palanca que cambia todo",
    palabraDelDia: "FUERZA",
    parrafos: [
      "El músculo es tejido metabólicamente activo: cuanto más tienes, más energía gastas en reposo. Entrenar fuerza le dice a tu cuerpo qué conservar cuando bajas grasa.",
      "No necesitas un gimnasio para empezar. Sentadillas, flexiones, remos con una mochila. Dos o tres veces por semana ya cambia tu cuerpo.",
    ],
    tipAccionable: "Haz 3 series de sentadillas hoy, hasta que cueste.",
    cliffhanger: "Mañana: la única regla para seguir progresando.",
  },
  {
    dia: 12,
    titulo: "Sobrecarga progresiva",
    palabraDelDia: "PROGRESO",
    parrafos: [
      "Tu cuerpo se adapta a lo que le pides. Si siempre haces lo mismo, deja de cambiar. Progreso = pedir un poco más cada semana: una repetición, un kilo, una serie.",
      "Anota lo que haces. Sin registro no hay progreso, solo movimiento.",
    ],
    tipAccionable: "Empieza una nota en tu celular con tu entrenamiento de hoy.",
    cliffhanger: "Mañana: por qué descansar también es entrenar.",
  },
  {
    dia: 13,
    titulo: "El descanso construye",
    palabraDelDia: "DESCANSO",
    parrafos: [
      "El músculo no crece en el gimnasio; crece cuando descansas. Entrenar todos los días sin recuperar es la forma más rápida de estancarte o lesionarte.",
      "Un día de descanso activo (caminar, estirar) vale más que un entrenamiento a medias por agotamiento.",
    ],
    tipAccionable: "Programa tu descanso de esta semana como si fuera una cita.",
    cliffhanger: "Mañana desbloqueas la segunda pieza del Método.",
  },
  {
    dia: 14,
    titulo: "Segunda pieza del Método",
    palabraDelDia: "ESTRUCTURA",
    parrafos: [
      "Dos semanas. Ya sabes qué comer y por qué entrenar. Ahora la segunda pieza: estructura.",
      "La estructura es decidir una vez para no decidir cada día: horarios de comida, días de entrenamiento, compras de la semana. Cuando está decidido, la voluntad deja de gastarse.",
    ],
    tipAccionable: "Escribe tus 3 horarios de comida y tus días de entrenamiento de esta semana.",
    cliffhanger: "Mañana: cómo salir a comer sin arruinar la semana.",
    esDiaDePieza: true,
  },
  {
    dia: 15,
    titulo: "Comer fuera sin culpa",
    palabraDelDia: "EQUILIBRIO",
    parrafos: [
      "Una comida no define tu progreso; lo define la semana completa. El equilibrio real es comer bien el 80 % del tiempo y disfrutar el 20 % sin culpa.",
      "Trucos: elige proteína como base del plato, pide las salsas aparte, agua en vez de refresco.",
    ],
    tipAccionable: "La próxima vez que salgas, elige el plato por su proteína.",
    cliffhanger: "Mañana: los snacks que sí te ayudan.",
  },
  {
    dia: 16,
    titulo: "Snacks inteligentes",
    palabraDelDia: "SNACK",
    parrafos: [
      "El problema no es picar; es picar lo que hay a mano. Un snack inteligente tiene proteína o fibra: yogur griego, fruta, huevo duro, un puñado de frutos secos.",
      "Prepáralos con antelación; el hambre no espera a que cocines.",
    ],
    tipAccionable: "Deja dos snacks listos en la nevera para mañana.",
    cliffhanger: "Mañana: la hormona que te hace guardar grasa en el abdomen.",
  },
  {
    dia: 17,
    titulo: "Estrés y cortisol",
    palabraDelDia: "CALMA",
    parrafos: [
      "El estrés crónico sube el cortisol, y el cortisol favorece guardar grasa abdominal y comer por ansiedad. No puedes eliminar el estrés, pero sí bajar su volumen.",
      "Diez minutos de calma al día (caminar sin celular, respirar, estirar) cambian más tu cuerpo de lo que crees.",
    ],
    tipAccionable: "Hoy: 5 minutos de respiración lenta antes de comer.",
    cliffhanger: "Mañana: cómo preparar la comida de la semana en una hora.",
  },
  {
    dia: 18,
    titulo: "Meal prep en una hora",
    palabraDelDia: "PREPARACIÓN",
    parrafos: [
      "La preparación es la diferencia entre 'quiero comer bien' y 'como bien'. Una hora el domingo: 2 proteínas cocinadas, 2 carbohidratos, verduras lavadas.",
      "No preparas platos completos; preparas piezas que combinas en 3 minutos.",
    ],
    tipAccionable: "Cocina hoy el doble de proteína y guarda la mitad.",
    cliffhanger: "Mañana hablamos de alcohol, sin sermones.",
  },
  {
    dia: 19,
    titulo: "Alcohol y progreso",
    palabraDelDia: "DECISIÓN",
    parrafos: [
      "El alcohol aporta calorías vacías, frena la quema de grasa mientras lo procesas y empeora tu sueño. No es prohibido; es una decisión con costo.",
      "Si vas a tomar: menos cantidad, sin mezclas azucaradas, agua entre medias. Y no compenses saltándote comidas.",
    ],
    tipAccionable: "Decide ahora cuántas bebidas tendrás este fin de semana.",
    cliffhanger: "Mañana: qué hacer cuando la báscula deja de moverse.",
  },
  {
    dia: 20,
    titulo: "Cuando te estancas",
    palabraDelDia: "AJUSTE",
    parrafos: [
      "El estancamiento es normal: tu cuerpo se adaptó. No es momento de rendirse ni de cortar todo a la mitad. Es momento de un ajuste pequeño.",
      "Opciones: sumar 1.500 pasos al día, quitar 100-150 kcal, revisar si el fin de semana está borrando la semana.",
    ],
    tipAccionable: "Elige un solo ajuste y mantenlo 7 días antes de juzgarlo.",
    cliffhanger: "Mañana desbloqueas la tercera pieza del Método.",
  },
  {
    dia: 21,
    titulo: "Tercera pieza del Método",
    palabraDelDia: "MEDICIÓN",
    parrafos: [
      "Tres semanas. Ya tienes constancia y estructura. La tercera pieza: medición.",
      "Lo que no se mide no se puede ajustar. Peso semanal (mismo día, misma hora), cintura, fotos y pasos. No para juzgarte; para saber qué palanca mover.",
    ],
    tipAccionable: "Registra hoy tu peso y cintura en la sección Progreso.",
    cliffhanger: "Mañana: el nutriente que te quita el hambre gratis.",
    esDiaDePieza: true,
  },
  {
    dia: 22,
    titulo: "Fibra y saciedad",
    palabraDelDia: "FIBRA",
    parrafos: [
      "La fibra llena, regula el azúcar en sangre y alimenta tu microbiota. Verduras, legumbres, avena, frutas con piel.",
      "Meta simple: verduras en al menos dos comidas al día.",
    ],
    tipAccionable: "Agrega un plato de verduras a tu almuerzo de hoy.",
    cliffhanger: "Mañana: cómo entrenar en casa sin equipo.",
  },
  {
    dia: 23,
    titulo: "Entrenar en casa",
    palabraDelDia: "CASA",
    parrafos: [
      "No hay excusa de tiempo ni de gimnasio. En casa puedes hacer un circuito completo en 20 minutos: sentadillas, flexiones, zancadas, plancha, remo con mochila.",
      "Tres rondas, descanso corto, y a subir repeticiones cada semana.",
    ],
    tipAccionable: "Haz hoy el circuito de 20 minutos.",
    cliffhanger: "Mañana: cuánto cardio necesitas realmente.",
  },
  {
    dia: 24,
    titulo: "Cardio: cuánto y cuándo",
    palabraDelDia: "CARDIO",
    parrafos: [
      "El cardio ayuda al corazón y suma gasto, pero no sustituye a la fuerza ni a la alimentación. Dos o tres sesiones de 20-30 minutos por semana son suficientes.",
      "Mejor un cardio que disfrutes (bici, caminar rápido, bailar) que uno perfecto que abandonas.",
    ],
    tipAccionable: "Elige el cardio que menos te cueste hacer y agéndalo.",
    cliffhanger: "Mañana: los únicos suplementos que valen la pena.",
  },
  {
    dia: 25,
    titulo: "Suplementos que sí sirven",
    palabraDelDia: "CREATINA",
    parrafos: [
      "El 95 % de los suplementos son ruido. Los que tienen evidencia: proteína en polvo (si no llegas con comida), creatina (fuerza y rendimiento), cafeína (energía) y vitamina D si tienes déficit.",
      "Ninguno sustituye lo básico: comida, sueño, entrenamiento.",
    ],
    tipAccionable: "Revisa qué suplementos tienes y cuáles realmente necesitas.",
    cliffhanger: "Mañana: la idea que cambia cómo te ves a ti mismo.",
  },
  {
    dia: 26,
    titulo: "Eres lo que repites",
    palabraDelDia: "IDENTIDAD",
    parrafos: [
      "No estás 'haciendo un reto'. Te estás convirtiendo en alguien que entrena, come bien y mide. Esa es la identidad que sostiene los hábitos cuando el reto termine.",
      "Cada día que apareces votas por esa versión de ti.",
    ],
    tipAccionable: "Escribe en una frase quién eres después de 26 días.",
    cliffhanger: "Mañana: cómo tu entorno decide por ti.",
  },
  {
    dia: 27,
    titulo: "El entorno decide",
    palabraDelDia: "ENTORNO",
    parrafos: [
      "Tu fuerza de voluntad pierde contra tu entorno. Si hay galletas a la vista, comes galletas. Si la fruta está al frente, comes fruta.",
      "Diseña tu entorno: lo que quieres comer, visible; lo que no, fuera de casa o guardado.",
    ],
    tipAccionable: "Reorganiza hoy la nevera y la despensa.",
    cliffhanger: "Mañana: la mentalidad de largo plazo.",
  },
  {
    dia: 28,
    titulo: "Paciencia estratégica",
    palabraDelDia: "PACIENCIA",
    parrafos: [
      "Bajar 0,5 kg por semana parece poco; son 25 kg en un año. La paciencia no es esperar; es seguir ejecutando sin necesitar resultados inmediatos.",
      "Los que llegan lejos no son los más intensos; son los que no se detienen.",
    ],
    tipAccionable: "Compara tu registro de hoy con el del día 1.",
    cliffhanger: "Mañana armas tu plan de los próximos 90 días.",
  },
  {
    dia: 29,
    titulo: "Tu plan de 90 días",
    palabraDelDia: "PLAN",
    parrafos: [
      "El reto termina mañana, pero tu proceso no. Un plan simple: 3 días de fuerza, 8.000+ pasos, proteína en cada comida, medición semanal, un ajuste cuando te estanques.",
      "Escríbelo. Un plan escrito se cumple el doble.",
    ],
    tipAccionable: "Escribe tu plan de 90 días en 5 líneas.",
    cliffhanger: "Mañana: el Método completo. Todas las piezas juntas.",
  },
  {
    dia: 30,
    titulo: "El Método completo",
    palabraDelDia: "VIKINGO",
    parrafos: [
      "Lo lograste. 30 días. Ya tienes las tres piezas: constancia, estructura y medición. La cuarta pieza es el sistema que las une, y ese sistema eres tú ejecutándolo.",
      "Un vikingo no es el más fuerte del pueblo; es el que sale a remar todos los días aunque llueva. Hoy desbloqueas el Método completo.",
    ],
    tipAccionable: "Comparte tu racha final y decide tu siguiente ciclo de 4 semanas.",
    cliffhanger: "El reto termina. El Método empieza.",
    esDiaDePieza: true,
  },
];
