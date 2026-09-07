/**
 * Lecciones de fallback (se usan solo si Sanity no está configurado o falta el día).
 * El contenido real se escribe en Sanity: tipo `leccionDiaria`.
 *
 * Estructura fija por lección: introducción, concepto, rutina/plan concreto,
 * tip accionable de cierre, y preview del día siguiente.
 */
export type LeccionSeed = {
  dia: number;
  fase: number;
  titulo: string;
  introduccion: string;
  concepto: string;
  rutinaTitulo: string;
  rutinaItems: string[];
  tipAccionable: string;
  previewSiguiente: string;
  esDiaDePieza?: boolean;
};

export const LECCIONES_SEED: LeccionSeed[] = [
  // ---------------------------------------------------------------
  // FASE 1 — Los Fundamentos del Vikingo (días 1-7)
  // ---------------------------------------------------------------
  {
    dia: 1,
    fase: 1,
    titulo: "El Llamado del Vikingo",
    introduccion:
      "Empiezas hoy, no el lunes que viene ni cuando \"tengas más tiempo\". Ese es el primer error que arruina el 90% de los intentos: esperar el momento perfecto. Este día 1 no es sobre resultados, es sobre romper la inercia. En 30 días vas a tener un cuerpo distinto, pero solo si el día de hoy termina con una acción concreta, no con otra lectura más sobre fitness que se queda en la cabeza.",
    concepto:
      "Las dietas normales fallan por una razón simple: dependen de fuerza de voluntad infinita, y la fuerza de voluntad se agota como cualquier otro recurso. Prometen resultados rápidos con reglas rígidas (nada de carbohidratos, nada de grasa, cero gusto), y en cuanto la vida real interrumpe -un viaje, un mal día, una celebración- el sistema completo colapsa porque no estaba diseñado para sostenerse, solo para impresionar al principio. El Método Vikingo funciona distinto: no te pide perfección, te pide presencia diaria. Un pequeño hábito ejecutado 30 días construye más músculo y pierde más grasa que un plan perfecto abandonado en el día 10. Por eso cada día de este reto es corto: la meta es que puedas hacerlo incluso en tu peor día.",
    rutinaTitulo: "Tu acción de hoy",
    rutinaItems: [
      "Pésate una vez, en ayunas, y anota el número (o guíate solo por medidas — pero elige ahora cómo vas a medir tu progreso).",
      "Toma una foto de frente y una de perfil, en ropa ajustada. No la vas a compartir, es tu punto de partida.",
      "Escribe en una nota de tu celular tu objetivo en una frase: \"Quiero ______ para el día 30\".",
    ],
    tipAccionable: "Guarda la foto y el peso de hoy en un solo lugar. Vas a compararlo el día 30, no cada mañana.",
    previewSiguiente: "Mañana: La Regla del Guerrero — las 3 comidas que sostienen todo el método.",
  },
  {
    dia: 2,
    fase: 1,
    titulo: "La Regla del Guerrero",
    introduccion:
      "No necesitas 7 comidas al día ni contar cada caloría para bajar grasa o ganar músculo. Necesitas 3 comidas bien construidas, todos los días, sin negociar. Este es el día en que dejas de improvisar qué comer y empiezas a construir tu plato con una fórmula simple que vas a repetir el resto del reto.",
    concepto:
      "La Regla del Guerrero es una fórmula para cada comida principal: media palma de proteína, un puño de carbohidrato, un puño de verdura, y una porción de grasa del tamaño de tu pulgar. No es una dieta de exclusión, es una plantilla que se adapta a lo que ya comes. Cuando tu comida sigue esta estructura, es casi imposible pasarte del déficit o superávit calórico que buscas, y automáticamente subes tu proteína -el nutriente que más te van a repetir en este reto porque protege tu músculo y te sacia por más tiempo-. La ventaja frente a contar calorías: puedes aplicar la Regla del Guerrero mirando tu plato, sin báscula de cocina, en cualquier restaurante o casa ajena.",
    rutinaTitulo: "Plan de comidas de hoy",
    rutinaItems: [
      "Desayuno (primera hora tras despertar): proteína (huevos, yogur griego, o proteína en polvo) + carbohidrato (avena, pan integral, fruta).",
      "Almuerzo: media palma de proteína (pollo, carne, pescado, legumbres) + puño de carbohidrato (arroz, papa, pasta) + puño de verdura + un poco de grasa (aceite de oliva, aguacate).",
      "Cena: misma estructura que el almuerzo, en porciones un poco más pequeñas si tu objetivo es bajar grasa.",
    ],
    tipAccionable: "En tu próxima comida, arma el plato mentalmente con la Regla del Guerrero antes de servirte, no después.",
    previewSiguiente: "Mañana: El Descanso que Construye — por qué entrenar todos los días te atrasa.",
  },
  {
    dia: 3,
    fase: 1,
    titulo: "El Descanso que Construye",
    introduccion:
      "Vas a sentir la tentación de entrenar todos los días esta primera semana, sobre todo si vienes motivado. Resiste. El músculo no crece durante el entrenamiento, crece durante el descanso que viene después. Un cuerpo que nunca descansa acumula fatiga, se lesiona más fácil, y termina rindiendo menos que uno que respeta sus días de recuperación.",
    concepto:
      "Cuando entrenas fuerza, generas micro-roturas en las fibras musculares. Tu cuerpo las repara durante el descanso -sobre todo durante el sueño profundo- y las reconstruye un poco más fuertes que antes. Si vuelves a entrenar el mismo grupo muscular antes de que termine esa reparación, no ganas el beneficio extra: solo acumulas desgaste. Por eso el Método Vikingo usa entre 3 y 4 días de entrenamiento de fuerza por semana, nunca el mismo grupo muscular en días consecutivos. Los días de descanso no significan sofá todo el día: puedes caminar, estirar, o hacer una actividad suave. Lo que evitas es el esfuerzo máximo que le pide más reparación al cuerpo de la que le estás dando tiempo a hacer.",
    rutinaTitulo: "Rutina de hoy: descanso activo",
    rutinaItems: [
      "Camina entre 20 y 30 minutos a paso ligero (afuera o cinta).",
      "Estira 5 minutos: cuádriceps, isquiotibiales, espalda baja y hombros, 30 segundos por lado.",
      "Duerme hoy con la meta de 7-8 horas: es la parte del \"entrenamiento\" que más se ignora.",
    ],
    tipAccionable: "Agenda ahora mismo en tu calendario los 3-4 días de esta semana que vas a entrenar fuerza. Verlo escrito reduce las excusas.",
    previewSiguiente: "Mañana: El Combustible Correcto — qué comer antes y después de entrenar.",
  },
  {
    dia: 4,
    fase: 1,
    titulo: "El Combustible Correcto",
    introduccion:
      "Lo que comes alrededor de tu entrenamiento cambia cuánto rindes y qué tan rápido te recuperas. No hace falta un batido carísimo ni cronometrar al minuto: hace falta entender dos ventanas simples -antes y después- y qué poner en cada una.",
    concepto:
      "Antes de entrenar necesitas energía rápida y digestión fácil: carbohidratos simples o de digestión media (fruta, pan, avena), poca grasa y poca fibra para no sentirte pesado. Después de entrenar tu cuerpo está más receptivo a reponer glucógeno y reparar músculo: ahí es donde la proteína rinde más, acompañada de carbohidrato para frenar el desgaste y acelerar la recuperación. Si entrenas en ayunas está bien -no es obligatorio comer antes-, pero después conviene comer dentro de la siguiente hora o dos, no dejar pasar 4-5 horas. El resto del día, vuelve a la Regla del Guerrero: esas dos comidas puntuales no reemplazan tu alimentación base, la complementan.",
    rutinaTitulo: "Plan alrededor de tu entrenamiento",
    rutinaItems: [
      "45-60 min antes de entrenar: una fruta (banano, manzana) o un puñado de avena con agua.",
      "Durante el entrenamiento: agua, nada más es necesario para sesiones de menos de 90 minutos.",
      "Dentro de las 2 horas después: proteína + carbohidrato (ej. pollo con arroz, o batido de proteína con fruta).",
    ],
    tipAccionable: "Si hoy entrenas, come tu proteína post-entreno antes de que pasen 2 horas. Si no entrenas, aplica la Regla del Guerrero normal.",
    previewSiguiente: "Mañana: La Señal del Cuerpo — cómo medir tu progreso sin depender de la báscula.",
  },
  {
    dia: 5,
    fase: 1,
    titulo: "La Señal del Cuerpo",
    introduccion:
      "La báscula miente más de lo que crees: puede subir por retención de líquidos, por la comida de ayer, por el ciclo hormonal, sin que hayas ganado un gramo de grasa real. Hoy aprendes a leer señales más confiables que un número que cambia por razones que no controlas.",
    concepto:
      "El peso corporal fluctúa día a día por agua, sodio, glucógeno y digestión -hasta 1-2 kg en cuestión de horas-, así que un solo dato no dice nada. Las señales que sí importan: cómo te queda la ropa, las medidas de cintura y cadera cada 1-2 semanas, fotos de progreso cada 2 semanas con la misma luz y pose, y tu rendimiento en el gimnasio. Combinadas, estas señales te dan una imagen mucho más real que pesarte a diario y angustiarte por 300 gramos que no significan nada. Vas a usar la sección Progreso de esta plataforma para registrar peso y cintura una vez por semana, no más seguido.",
    rutinaTitulo: "Cómo vas a medir tu progreso",
    rutinaItems: [
      "Pésate máximo 1 vez por semana, mismo día, misma hora, en ayunas.",
      "Mide tu cintura (a la altura del ombligo) cada 2 semanas.",
      "Toma fotos de progreso cada 2 semanas: misma luz, misma pose, misma hora del día.",
      "Anota qué pesos levantaste esta semana en tus ejercicios principales.",
    ],
    tipAccionable: "Ve a la sección Progreso de esta plataforma y registra tu primer dato de la semana ahora mismo.",
    previewSiguiente: "Mañana: El Ritual de la Mañana — el hábito de 5 minutos que activa tu metabolismo.",
  },
  {
    dia: 6,
    fase: 1,
    titulo: "El Ritual de la Mañana",
    introduccion:
      "Cómo empiezas la mañana decide, en gran parte, cómo termina el día. Un ritual corto -5 a 10 minutos- puede activar tu metabolismo, bajar tu ansiedad por comer, y ponerte en modo \"ejecutar el plan\" en vez de modo \"improvisar sobre la marcha\".",
    concepto:
      "No es magia ni biohacking: es consistencia aplicada al inicio del día. Exponerte a luz natural apenas te levantas ayuda a regular tu ritmo circadiano (el reloj interno que controla hambre, energía y sueño). Tomar agua al despertar rehidrata tras 7-8 horas sin líquidos y reduce el hambre falsa. Y mover el cuerpo unos minutos -aunque sea caminar o estirar- sube tu temperatura corporal y tu estado de alerta sin necesitar cafeína. Ninguno de estos 3 hábitos toma más de 10 minutos combinados, pero hacerlos en el mismo orden todos los días crea una señal clara para tu cerebro: \"empezó el día del plan\".",
    rutinaTitulo: "Tu ritual de mañana (5-10 min)",
    rutinaItems: [
      "Al despertar: un vaso grande de agua, antes que el celular.",
      "2-3 minutos de luz natural (ventana o afuera), sin lentes de sol.",
      "5 minutos de movimiento suave: caminar, estirar, o unas sentadillas sin peso.",
    ],
    tipAccionable: "Haz este ritual mañana antes de revisar el celular. El orden importa: cuerpo primero, pantalla después.",
    previewSiguiente: "Mañana cumples una semana y desbloqueas la Primera Runa del Método Secreto.",
  },
  {
    dia: 7,
    fase: 1,
    titulo: "🔓 La Primera Runa",
    introduccion:
      "Siete días. La mayoría de la gente que empieza un reto de 30 días no llega hasta acá. Tú sí. Esta semana sentaste las bases: cómo comer, cómo descansar, qué comer alrededor del entrenamiento, cómo medir tu progreso, y cómo empezar el día. Hoy no hay contenido nuevo que aprender -hoy es repaso y recompensa.",
    concepto:
      "El Método Secreto que vas a recibir completo el día 30 se construye en piezas, y hoy recibes la primera: la Runa de la Constancia. No es una técnica de entrenamiento ni un truco de nutrición -es el principio que hace que todo lo demás funcione. La gente que transforma su cuerpo no es la que tiene la rutina más perfecta ni la dieta más estricta: es la que apareció más veces. Constancia no significa nunca fallar; significa que un mal día no se convierte en una mala semana. Guarda esta runa, la vas a necesitar cuando la motivación baje -y va a bajar, eso es normal, ya lo vas a ver en la Fase 3.",
    rutinaTitulo: "Repaso de la semana",
    rutinaItems: [
      "Relee mentalmente los 6 días: alimentación, descanso, combustible pre/post-entreno, medición, ritual de mañana.",
      "Revisa tu registro de progreso: ¿ya cargaste tu primer peso/medida en la sección Progreso?",
      "Marca en tu calendario los días de entrenamiento de la próxima semana (Fase 2 empieza fuerte).",
    ],
    tipAccionable: "Comparte tu racha de 7 días si quieres — hacerlo público la hace más difícil de romper.",
    previewSiguiente: "Mañana empieza la Fase 2: La Rutina del Hierro — tu plan de entrenamiento semanal completo.",
    esDiaDePieza: true,
  },

  // ---------------------------------------------------------------
  // FASE 2 — El Forjado (días 8-14)
  // ---------------------------------------------------------------
  {
    dia: 8,
    fase: 2,
    titulo: "La Rutina del Hierro",
    introduccion:
      "Empieza la Fase 2: aquí es donde tu cuerpo empieza a cambiar de verdad. Hoy recibes la estructura completa de entrenamiento semanal del Método Vikingo -no ejercicios sueltos, un plan que se repite y sobre el que vas a construir las próximas 3 semanas.",
    concepto:
      "El Método Vikingo usa un split de 4 días que trabaja todo el cuerpo dos veces por semana, con al menos un día de descanso entre sesiones que usan los mismos músculos. No necesitas gimnasio de lujo: con mancuernas, banda de resistencia, o tu propio peso corporal puedes ejecutar los 4 días. La progresión importa más que la variedad: es mejor repetir estos 4 días 3 semanas seguidas, sumando peso o repeticiones cada semana, que cambiar de rutina cada pocos días sin dejar que tu cuerpo se adapte y progrese.",
    rutinaTitulo: "Tu split semanal (4 días)",
    rutinaItems: [
      "Día A — Tren inferior + core: sentadilla 4x10, zancadas 3x12 por pierna, puente de glúteo 3x15, plancha 3x30seg.",
      "Día B — Tren superior empuje: flexiones 4x10-15, press militar con mancuernas 3x10, fondos en silla 3x12.",
      "Día C — Descanso o cardio suave.",
      "Día D — Tren inferior + glúteo: peso muerto rumano 4x10, sentadilla búlgara 3x10 por pierna, elevación de pantorrilla 3x20.",
      "Día E — Tren superior tracción: remo con mancuerna 4x10 por lado, jalón o dominadas asistidas 3x8, curl de bíceps 3x12.",
    ],
    tipAccionable: "Elige hoy en qué 4 días de la semana vas a entrenar (A, B, D, E) y agéndalos ya.",
    previewSiguiente: "Mañana: El Plato Vikingo — cómo armar cada comida paso a paso, con ejemplos reales.",
  },
  {
    dia: 9,
    fase: 2,
    titulo: "El Plato Vikingo",
    introduccion:
      "Ya conoces la Regla del Guerrero: proteína, carbohidrato, verdura, grasa. Hoy la llevamos a la práctica con ejemplos concretos, plato por plato, para que dejes de preguntarte \"¿y esto qué como?\" cada vez que te sientas a comer.",
    concepto:
      "El error más común no es no saber la teoría, es no saber cómo se ve en un plato real. Por eso el Plato Vikingo son ejemplos armados: combinaciones que cumplen la Regla del Guerrero usando comida que probablemente ya tienes en tu cocina o puedes pedir en cualquier lado. La idea no es que comas exactamente estos platos todos los días -es que entiendas el patrón y puedas construir tus propias variaciones con lo que tengas disponible, sin depender de una lista rígida de \"alimentos permitidos\".",
    rutinaTitulo: "3 ejemplos de Plato Vikingo",
    rutinaItems: [
      "Plato 1: pechuga de pollo a la plancha + arroz + ensalada con aceite de oliva.",
      "Plato 2: salmón u otro pescado + papa al horno + brócoli al vapor.",
      "Plato 3 (vegetariano): garbanzos o lentejas + quinoa + verduras salteadas + aguacate.",
      "Snack entre comidas si tienes hambre: yogur griego con fruta, o un puñado de frutos secos.",
    ],
    tipAccionable: "Arma tu próxima comida siguiendo uno de estos 3 ejemplos, aunque cambies los ingredientes específicos.",
    previewSiguiente: "Mañana: El Error del Novato — lo que casi todos hacen mal en la semana 2.",
  },
  {
    dia: 10,
    fase: 2,
    titulo: "El Error del Novato",
    introduccion:
      "Llevas 9 días. Justo en este punto es donde la mayoría comete el mismo error: piensa que si un poco de ejercicio funciona, mucho más ejercicio funciona mucho más rápido. Entrenar de más, comer de menos de forma extrema, o querer ver resultados en la báscula cada mañana. Hoy corregimos eso antes de que te frene.",
    concepto:
      "El error del novato tiene tres versiones típicas. Primera: entrenar 6-7 días a la semana \"para acelerar\", lo que rompe la recuperación y termina en fatiga o lesión. Segunda: bajar las calorías demasiado agresivo, lo que hace que pierdas músculo junto con la grasa y te deje sin energía para entrenar bien -un déficit moderado y sostenido gana siempre contra uno extremo que no aguantas ni 2 semanas. Tercera: juzgar el progreso día a día en vez de semana a semana, lo que genera frustración por fluctuaciones normales. Ninguno de estos errores viene de falta de disciplina -vienen de impaciencia. El Método Vikingo es exactamente lo contrario a la prisa.",
    rutinaTitulo: "Auditoría rápida de tu semana 2",
    rutinaItems: [
      "Cuenta cuántos días entrenaste esta semana: si son más de 4-5, agenda un día extra de descanso.",
      "Revisa si estás comiendo por debajo de 2 de tus 3 comidas principales por \"acelerar\" resultados — corrígelo hoy mismo.",
      "Si te pesaste más de 1 vez esta semana, deja la báscula guardada hasta tu próxima medición programada.",
    ],
    tipAccionable: "Si te identificaste con alguno de los 3 errores, corrígelo en tu próxima comida o entrenamiento, no la próxima semana.",
    previewSiguiente: "Mañana: La Fuerza en Reposo — técnicas reales de recuperación muscular.",
  },
  {
    dia: 11,
    fase: 2,
    titulo: "La Fuerza en Reposo",
    introduccion:
      "Ya sabes que el descanso es necesario. Hoy vas un paso más allá: técnicas concretas para recuperarte más rápido y llegar a tu próximo entrenamiento con menos dolor muscular y más rendimiento.",
    concepto:
      "La recuperación activa no es estar quieto, es dar a tus músculos estímulos suaves que mejoran la circulación sin generar más fatiga. El dolor muscular de 24-48 horas después de entrenar (DOMS) es normal, especialmente cuando cambias de rutina, pero se puede reducir con las herramientas correctas: estiramientos sostenidos, movilidad articular, hidratación, y suficiente proteína para la reparación. El sueño sigue siendo la herramienta más poderosa y más ignorada: durante el sueño profundo se libera la mayor parte de la hormona de crecimiento que repara tejido muscular, así que dormir mal literalmente frena tus resultados en el gimnasio, sin importar qué tan bien entrenes.",
    rutinaTitulo: "Rutina de recuperación (15 min)",
    rutinaItems: [
      "Estiramiento de cuádriceps, isquiotibiales y glúteos: 45 segundos por lado.",
      "Movilidad de cadera y hombros: círculos amplios, 10 por lado.",
      "Hidratación: si entrenaste hoy, suma medio litro de agua extra a tu día.",
      "Meta de sueño esta noche: 7-8 horas, sin pantallas 30 minutos antes de dormir.",
    ],
    tipAccionable: "Si tienes dolor muscular fuerte hoy, no lo ignores ni lo empeores: haz la rutina de recuperación antes que otro entrenamiento intenso.",
    previewSiguiente: "Mañana: El Mapa del Progreso — cómo ajustar tu plan según tus resultados reales.",
  },
  {
    dia: 12,
    fase: 2,
    titulo: "El Mapa del Progreso",
    introduccion:
      "Dos semanas de datos ya te dicen algo. Hoy aprendes a leer tus propias señales -peso, medidas, rendimiento- y a decidir si tu plan necesita un ajuste, en vez de seguir en piloto automático o cambiar todo de golpe.",
    concepto:
      "Ajustar no es lo mismo que empezar de cero. Si en 2 semanas tu peso y cintura no se movieron y tu objetivo es bajar grasa, el ajuste es pequeño: agregar 1000-1500 pasos diarios, o reducir ligeramente las porciones de carbohidrato en la cena, nunca cortar comidas completas. Si tu objetivo es ganar músculo y no ves cambio en la fuerza que levantas, el ajuste es sumar un poco más de comida, especialmente carbohidratos alrededor del entrenamiento. La regla de oro: cambia una sola variable a la vez y dale al menos una semana antes de decidir si funcionó. Cambiar todo al mismo tiempo hace imposible saber qué fue lo que realmente movió la aguja.",
    rutinaTitulo: "Revisión de 2 semanas",
    rutinaItems: [
      "Compara tu peso/cintura de hoy con el del día 1 o día 5 (sección Progreso).",
      "Si no hay cambio y buscas bajar grasa: suma una caminata de 20 minutos a tu día.",
      "Si no hay cambio y buscas ganar músculo: suma una porción extra de carbohidrato post-entreno.",
      "Elige solo 1 ajuste, no varios a la vez.",
    ],
    tipAccionable: "Aplica tu único ajuste elegido a partir de mañana y no lo vuelvas a cambiar hasta la próxima revisión.",
    previewSiguiente: "Mañana: La Prueba de Fuego — el reto físico que cierra esta fase.",
  },
  {
    dia: 13,
    fase: 2,
    titulo: "La Prueba de Fuego",
    introduccion:
      "Llevas dos semanas construyendo base. Hoy es un día distinto: un reto físico corto para medir cuánto has avanzado en fuerza y resistencia desde el día 1, sin necesidad de básculas ni cintas de medir.",
    concepto:
      "Los retos físicos periódicos sirven como termómetro de tu condición real, más allá del espejo o la báscula. No es una competencia contra nadie más que tu propio punto de partida: la meta es hacer el circuito hoy, anotar tus números, y repetirlo en el día 27 para ver la diferencia con datos reales, no solo con sensaciones. Si hoy te cuesta mucho, no es una mala señal -es tu línea base real, y en 2 semanas más vas a poder compararla con evidencia concreta de progreso.",
    rutinaTitulo: "Circuito de la Prueba de Fuego (cronometra)",
    rutinaItems: [
      "Máximo de flexiones seguidas sin parar (anota el número).",
      "Plancha: sostén la posición el mayor tiempo posible (anota los segundos).",
      "Sentadillas con peso corporal: 60 repeticiones, cronometra cuánto tardas.",
      "Guarda estos 3 números en tu nota de progreso — los vas a repetir el día 27.",
    ],
    tipAccionable: "No compares tu resultado con nadie más. El único número que importa es contra el que tú mismo vas a hacer en 2 semanas.",
    previewSiguiente: "Mañana cumples 2 semanas y desbloqueas la Segunda Runa del Método Secreto.",
  },
  {
    dia: 14,
    fase: 2,
    titulo: "🔓 La Segunda Runa",
    introduccion:
      "Dos semanas. Ya tienes las bases (Fase 1) y ya empezaste a forjar tu cuerpo con entrenamiento y nutrición estructurada (Fase 2). Hoy es repaso, y recibes la segunda pieza del Método Secreto.",
    concepto:
      "La Runa de la Estructura es el complemento natural de la Constancia que recibiste en el día 7. La motivación es un impulso que aparece y desaparece; la estructura es lo que sigue funcionando cuando la motivación no está. Horarios de comida fijos, días de entrenamiento agendados como si fueran una cita médica que no puedes cancelar, un plato armado con una fórmula en vez de improvisado cada vez: todo eso es estructura. Cuando decides las cosas una sola vez dejas de gastar energía mental decidiendo cada día, y esa energía la usas para ejecutar en vez de negociar contigo mismo si hoy toca o no toca.",
    rutinaTitulo: "Repaso de la Fase 2",
    rutinaItems: [
      "Revisa si cumpliste el split de 4 días esta y la semana pasada.",
      "Confirma que tu ajuste del día 12 sigue en marcha.",
      "Guarda tus 3 números de la Prueba de Fuego (día 13) — los necesitas en el día 27.",
    ],
    tipAccionable: "Escribe tu horario fijo de entrenamiento de las próximas 2 semanas (Fase 3) antes de terminar el día de hoy.",
    previewSiguiente: "Mañana empieza la Fase 3: El Juramento Vikingo — tu compromiso para las próximas 2 semanas.",
    esDiaDePieza: true,
  },

  // ---------------------------------------------------------------
  // FASE 3 — La Aplicación (días 15-21)
  // ---------------------------------------------------------------
  {
    dia: 15,
    fase: 3,
    titulo: "El Juramento Vikingo",
    introduccion:
      "Empieza la Fase 3: de aprender a ejecutar sin excusas. Ya tienes todo el conocimiento que necesitas -alimentación, entrenamiento, descanso, medición-. Lo que falta ahora es la ejecución sostenida, y eso empieza con un compromiso explícito, no uno mental y vago.",
    concepto:
      "Un objetivo que solo existe en tu cabeza es fácil de negociar contigo mismo cuando aparece la pereza. Un compromiso escrito, con una fecha límite, es mucho más difícil de romper -es la misma razón por la que las citas médicas se cumplen más que los propósitos de año nuevo. Hoy escribes tu Juramento Vikingo: tu compromiso concreto para los próximos 14 días, hasta el día 29. No es una frase motivacional genérica, es una declaración específica de qué vas a hacer, cuántas veces, y qué vas a hacer si un día fallas (spoiler: seguir al día siguiente, nunca abandonar la semana completa).",
    rutinaTitulo: "Escribe tu Juramento (5 minutos)",
    rutinaItems: [
      "\"Me comprometo a entrenar ___ días por semana durante las próximas 2 semanas.\"",
      "\"Me comprometo a aplicar la Regla del Guerrero en al menos ___ de mis 3 comidas diarias.\"",
      "\"Si fallo un día, mi plan es: volver al plan al día siguiente, sin excepciones ni compensaciones extremas.\"",
      "Guarda este juramento donde lo veas todos los días (fondo de pantalla, nota fija, espejo).",
    ],
    tipAccionable: "Lee tu Juramento en voz alta una vez, ahora mismo, antes de seguir con tu día.",
    previewSiguiente: "Mañana: La Marcha Constante — cómo mantener el ritmo cuando baja la motivación.",
  },
  {
    dia: 16,
    fase: 3,
    titulo: "La Marcha Constante",
    introduccion:
      "En algún punto de estas dos semanas la motivación de los primeros días va a bajar -es normal, le pasa a todo el mundo, y no significa que estés fallando. Hoy hablamos de cómo seguir en marcha cuando las ganas no están, usando sistemas en vez de emociones.",
    concepto:
      "La motivación es una emoción, y las emociones son inestables por naturaleza: suben con una buena noticia, bajan con un mal día de trabajo. Si tu plan depende de sentirte motivado para ejecutarlo, vas a fallar tarde o temprano, porque nadie se siente motivado todos los días durante 30. La solución no es \"tener más disciplina\" en abstracto, es reducir la cantidad de decisiones que tomas en el momento: si ya decidiste (Juramento del día 15) que entrenas martes, jueves y sábado a las 6pm, no necesitas sentirte motivado a esa hora -solo necesitas seguir el plan que tu \"yo\" motivado de hace unos días ya decidió por ti.",
    rutinaTitulo: "Rutina de hoy",
    rutinaItems: [
      "Revisa tu horario de entrenamiento de la semana y confírmalo, no lo repienses.",
      "Si hoy te toca entrenar y no tienes ganas: comprométete solo a los primeros 10 minutos. Casi siempre, una vez empiezas, terminas.",
      "Aplica tu Regla del Guerrero en al menos 2 de tus 3 comidas de hoy.",
    ],
    tipAccionable: "Si hoy no tienes motivación, no esperes a tenerla. Ejecuta el plan igual — la motivación casi siempre llega después de empezar, no antes.",
    previewSiguiente: "Mañana: El Muro Invisible — qué hacer si sientes que no avanzas.",
  },
  {
    dia: 17,
    fase: 3,
    titulo: "El Muro Invisible",
    introduccion:
      "Alrededor de la semana 3 muchas personas sienten que \"dejaron de avanzar\", aunque estén haciendo todo bien. A esto lo llamamos el Muro Invisible: no es que tu progreso se haya detenido, es que se volvió menos visible a simple vista.",
    concepto:
      "El cuerpo se adapta rápido a los primeros cambios: la pérdida de peso inicial suele incluir agua y no solo grasa, y las primeras semanas de entrenamiento generan adaptaciones neuromusculares que se sienten como \"progreso rápido\". Después de esa fase inicial, los cambios se vuelven más lentos y más reales -grasa de verdad, músculo de verdad- pero también menos dramáticos día a día. Esto no es un estancamiento real en la mayoría de los casos: es una desaceleración normal y esperada. La forma de comprobarlo es volver a las señales del día 5 (medidas, fotos, rendimiento) en vez de confiar solo en cómo te sientes o en la báscula de hoy.",
    rutinaTitulo: "Rompiendo el Muro Invisible",
    rutinaItems: [
      "Compara tu foto de hoy con la del día 1, no con la de hace 3 días.",
      "Revisa tu rendimiento en el gimnasio: ¿levantas más peso o haces más repeticiones que en la semana 1?",
      "Si de verdad no hay ningún cambio en 3+ semanas, aplica el protocolo de ajuste del día 12.",
    ],
    tipAccionable: "Antes de asumir que no avanzas, compara datos de hace 2-3 semanas, no de hace 2-3 días.",
    previewSiguiente: "Mañana: La Voz de la Experiencia — los errores más comunes de la semana 3.",
  },
  {
    dia: 18,
    fase: 3,
    titulo: "La Voz de la Experiencia",
    introduccion:
      "A esta altura del reto, con el Muro Invisible reciente, aparecen tentaciones específicas: dietas milagro, entrenamientos \"quema grasa\" de 10 minutos, suplementos que prometen atajos. Hoy repasamos los errores más comunes de esta etapa antes de que te desvíen del plan que ya está funcionando.",
    concepto:
      "El error más frecuente en la semana 3 es el \"salto de método\": abandonar el plan actual (que apenas empieza a mostrar resultados reales) para probar algo nuevo que promete resultados más rápidos. Esto reinicia tu adaptación constantemente y es la razón número uno por la que la gente no ve resultados en un año, aunque \"pruebe de todo\". El segundo error es la comparación con el progreso de otras personas en redes sociales -ves el resultado final de 90 o 180 días de alguien, no su semana 3-. El tercer error es usar la frustración del Muro Invisible como excusa para abandonar el fin de semana completo. Ningún día perdido justifica perder la semana: vuelve al plan en la siguiente comida, no en el siguiente lunes.",
    rutinaTitulo: "Auditoría anti-desvíos",
    rutinaItems: [
      "Pregúntate: ¿estoy pensando en cambiar de rutina o dieta esta semana? Si sí, espera al menos hasta el día 25 antes de decidir.",
      "Deja de comparar tu semana 3 con el resultado final de otra persona en redes.",
      "Si fallaste una comida o un entrenamiento esta semana, tu única tarea es volver al plan en el siguiente, sin compensar de más.",
    ],
    tipAccionable: "Si sientes la tentación de \"empezar de cero\" con otro método, dale al Método Vikingo hasta el día 30 antes de decidir.",
    previewSiguiente: "Mañana: El Espejo — cómo evaluar tu transformación real hasta ahora.",
  },
  {
    dia: 19,
    fase: 3,
    titulo: "El Espejo",
    introduccion:
      "Casi 3 semanas. Hoy tomas un momento para evaluar tu transformación real -no la que imaginabas el día 1, la que realmente está pasando- usando los mismos datos que empezaste a recolectar desde el principio del reto.",
    concepto:
      "Evaluar tu progreso a mitad de camino tiene un propósito doble: reconocer lo que sí cambió (que casi siempre es más de lo que crees, sobre todo en fuerza y hábitos) y detectar temprano si algo necesita un ajuste antes de los últimos 11 días. Esta evaluación combina lo objetivo (peso, medidas, fotos, fuerza) con algo que rara vez medimos: cómo te sientes -nivel de energía, calidad de sueño, relación con la comida-. Muchas personas descubren que su transformación más grande no es visual todavía, es en cómo se relacionan con sus hábitos: comen con más intención, se mueven más, duermen mejor. Eso también es progreso, y es el que sostiene el resultado visual que viene después.",
    rutinaTitulo: "Tu evaluación del día 19",
    rutinaItems: [
      "Compara peso y cintura de hoy contra el día 1 (sección Progreso).",
      "Compara tu foto de hoy contra la del día 1: busca cambios en postura y composición, no solo en peso.",
      "Responde en una frase: ¿cómo cambió tu energía o tu relación con la comida en estas 3 semanas?",
    ],
    tipAccionable: "Escribe una frase reconociendo un progreso real, aunque sea pequeño o no visual todavía.",
    previewSiguiente: "Mañana: La Tormenta — el empuje físico de mitad de reto.",
  },
  {
    dia: 20,
    fase: 3,
    titulo: "La Tormenta",
    introduccion:
      "Hoy es un día de esfuerzo. Después de la evaluación de ayer, toca un entrenamiento más intenso que los anteriores -una \"tormenta\" corta y controlada que te empuja fuera de tu zona cómoda para cerrar esta fase con fuerza.",
    concepto:
      "El cuerpo necesita, de vez en cuando, un estímulo distinto al habitual para seguir progresando -es el mismo principio de sobrecarga progresiva que aplicas semana a semana, pero concentrado en un solo día de mayor intensidad. Esto no reemplaza tu split normal: es un evento puntual, algo que se hace 1 vez cada 2-3 semanas, no todos los días -si lo hicieras seguido, romperías la recuperación de la que hablamos antes. La Tormenta también tiene un componente mental: terminar un entrenamiento que te costó más de lo normal construye confianza real para lo que viene en la Fase 4.",
    rutinaTitulo: "Entrenamiento de La Tormenta",
    rutinaItems: [
      "Calienta 5 minutos: movilidad articular + 20 sentadillas sin peso.",
      "Circuito, 4 rondas sin parar entre ejercicios (descansa 90 segundos entre rondas): 15 sentadillas, 12 flexiones, 15 zancadas por pierna, 30 segundos de plancha.",
      "Cierra con 5 minutos de estiramiento.",
    ],
    tipAccionable: "Completa las 4 rondas aunque bajes el ritmo — terminar importa más que la velocidad hoy.",
    previewSiguiente: "Mañana cumples 3 semanas y desbloqueas la Tercera Runa del Método Secreto.",
  },
  {
    dia: 21,
    fase: 3,
    titulo: "🔓 La Tercera Runa",
    introduccion:
      "Tres semanas. Pasaste por el Muro Invisible, evitaste los errores comunes de la semana 3, evaluaste tu progreso real, y cerraste la fase con La Tormenta. Hoy es repaso, y recibes la tercera pieza del Método Secreto.",
    concepto:
      "La Runa de la Medición es el complemento de la Constancia y la Estructura que ya tienes. Lo que no se mide no se puede ajustar -eso ya lo aplicaste desde el día 5, y por eso pudiste hacer el ajuste del día 12 con datos reales en vez de solo sensaciones. Medir no es para juzgarte ni para obsesionarte con un número: es para saber exactamente qué palanca mover cuando algo no está funcionando, en vez de adivinar o abandonar el plan completo. Las tres runas juntas -Constancia, Estructura, Medición- son la base de cualquier sistema que funciona a largo plazo, dentro o fuera del fitness. La cuarta pieza, la que une todo, se revela el día 30.",
    rutinaTitulo: "Repaso de la Fase 3",
    rutinaItems: [
      "Revisa si cumpliste tu Juramento del día 15: ¿entrenaste los días que prometiste?",
      "Confirma tu último registro de peso/cintura en la sección Progreso.",
      "Prepárate mentalmente para la Fase 4: los últimos 9 días son de ajuste fino, no de cambios grandes.",
    ],
    tipAccionable: "Registra tu peso y cintura de esta semana en la sección Progreso antes de terminar el día.",
    previewSiguiente: "Mañana empieza la Fase 4: El Ajuste Fino — optimiza tu rutina para la recta final.",
    esDiaDePieza: true,
  },

  // ---------------------------------------------------------------
  // FASE 4 — La Anticipación (días 22-29)
  // ---------------------------------------------------------------
  {
    dia: 22,
    fase: 4,
    titulo: "El Ajuste Fino",
    introduccion:
      "Empieza la Fase 4: los últimos días antes de la revelación del Método completo. Ya no se trata de cambios grandes -se trata de afinar detalles pequeños que separan un resultado bueno de uno notable en los días que quedan.",
    concepto:
      "A esta altura, tu cuerpo ya se adaptó a tu rutina base y a tu alimentación. El ajuste fino consiste en pequeños cambios de calidad, no de cantidad: mejorar tu técnica en los ejercicios principales (una sentadilla bien ejecutada con menos peso construye más que una mal ejecutada con más peso), revisar si tu proteína diaria sigue siendo suficiente ahora que probablemente pesas o rindes distinto que el día 1, y asegurarte de que tu sueño -el factor más subestimado de todo el reto- sigue siendo de 7-8 horas y no se fue degradando con el estrés de las últimas semanas.",
    rutinaTitulo: "Tu chequeo de ajuste fino",
    rutinaItems: [
      "Revisa tu técnica en sentadilla y flexión: graba un video corto de perfil y compáralo con tutoriales confiables.",
      "Cuenta tus porciones de proteína de ayer: ¿tuviste una fuente clara en cada una de tus 3 comidas?",
      "Anota cuántas horas dormiste las últimas 3 noches. Si es menos de 7, ese es tu ajuste de esta semana.",
    ],
    tipAccionable: "Elige el único ajuste (técnica, proteína, o sueño) que más necesitas y aplícalo hoy mismo.",
    previewSiguiente: "Mañana: El Combustible Avanzado — suplementos: qué sirve de verdad y qué es solo marketing.",
  },
  {
    dia: 23,
    fase: 4,
    titulo: "El Combustible Avanzado",
    introduccion:
      "Ahora que tu base está sólida, es momento de hablar de suplementos con honestidad: qué tiene evidencia real detrás y qué es simplemente marketing bien diseñado apuntando a gente que busca atajos.",
    concepto:
      "El 95% de los suplementos del mercado no tienen evidencia sólida que respalde sus promesas -\"quemadores de grasa\", \"bloqueadores de carbohidratos\", complejos con 20 ingredientes en dosis mínimas-. Los que sí tienen evidencia consistente son pocos y aburridos: proteína en polvo (útil solo si no llegas a tu meta de proteína con comida, no es superior a la comida real), creatina monohidratada (mejora fuerza y rendimiento, es de los suplementos más estudiados que existen), cafeína (energía y foco, ojo con la hora para no afectar tu sueño), y vitamina D si vives en un lugar con poco sol o tienes déficit confirmado. Ninguno de estos reemplaza la Regla del Guerrero, el entrenamiento o el sueño.",
    rutinaTitulo: "Evaluación de suplementos",
    rutinaItems: [
      "Si tomas algún suplemento, revisa si es alguno de los 4 con evidencia real (proteína, creatina, cafeína, vitamina D).",
      "Si tomas algo que promete \"quemar grasa\" o \"bloquear carbohidratos\", considera que probablemente no hace nada más que la Regla del Guerrero ya hace gratis.",
      "Si no tomas ninguno: no es obligatorio empezar. Tu progreso hasta hoy viene de la base, no de suplementos.",
    ],
    tipAccionable: "Antes de comprar cualquier suplemento nuevo, pregúntate si ya estás cumpliendo la base (comida, entrenamiento, sueño) al 100%.",
    previewSiguiente: "Mañana: La Mente del Guerrero — cómo vencer el autosabotaje en la recta final.",
  },
  {
    dia: 24,
    fase: 4,
    titulo: "La Mente del Guerrero",
    introduccion:
      "Faltan pocos días para el final del reto, y es común que aparezca un tipo de autosabotaje sutil: \"ya casi llego, un descanso no hace daño\", que a veces se convierte en varios días perdidos justo antes de la meta. Hoy trabajamos la mente, no el cuerpo.",
    concepto:
      "El autosabotaje casi nunca se presenta como \"voy a rendirme\" -se presenta como pequeñas excepciones que parecen razonables una por una: \"hoy no entreno porque ya avancé mucho\", \"esta comida no cuenta porque es especial\". El problema no es la excepción puntual, es el patrón que se forma cuando se repite. La Mente del Guerrero no es no sentir la tentación -es reconocerla cuando aparece y decidir de todos modos seguir el plan, recordando que faltan pocos días para el día 30, el punto donde vas a poder decidir con calma qué sigue, no ahora en medio de un impulso pasajero.",
    rutinaTitulo: "Ejercicio mental de hoy",
    rutinaItems: [
      "Identifica una excusa que hayas usado esta semana (\"ya avancé mucho\", \"hoy es especial\").",
      "Escribe la respuesta que le vas a dar la próxima vez que aparezca esa excusa.",
      "Cuenta cuántos días te faltan para el día 30 y ponlo en un lugar visible.",
    ],
    tipAccionable: "La próxima vez que pienses \"un día no importa\", recuerda que llevas 23 días construyendo el patrón contrario.",
    previewSiguiente: "Mañana: El Plan de Mantenimiento — qué hacer después del día 30.",
  },
  {
    dia: 25,
    fase: 4,
    titulo: "El Plan de Mantenimiento",
    introduccion:
      "Aunque quedan 5 días de reto, hoy hablamos de después: qué pasa el día 31, cuando ya no haya una lección diaria guiándote. Un reto de 30 días que no tiene plan de continuidad suele perder todo su efecto en las semanas siguientes.",
    concepto:
      "El día 31 no es el final de nada -es el punto donde pasas de seguir instrucciones diarias a operar el sistema tú mismo. La buena noticia: ya tienes todas las piezas. La Regla del Guerrero no caduca, tu split de entrenamiento se puede repetir indefinidamente ajustando peso y repeticiones, y las 3 runas que ya recibiste (Constancia, Estructura, Medición) son un sistema completo, no algo exclusivo de este reto. Mantener resultados no requiere más esfuerzo que conseguirlos -requiere seguir aplicando lo mismo, sin la urgencia de un conteo regresivo.",
    rutinaTitulo: "Bosquejo de tu plan post-reto",
    rutinaItems: [
      "Decide cuántos días por semana vas a seguir entrenando después del día 30 (mínimo 3, usando tu split actual).",
      "Decide con qué frecuencia vas a seguir registrando peso/medidas (recomendado: cada 1-2 semanas, no a diario).",
      "Escribe una frase: \"Después del día 30, mi plan es ______.\"",
    ],
    tipAccionable: "No dejes el plan de mantenimiento para el día 30. Escríbelo hoy, mientras todavía tienes el impulso del reto activo.",
    previewSiguiente: "Mañana: La Fuerza que Ya Tienes — reconociendo tu progreso real hasta ahora.",
  },
  {
    dia: 26,
    fase: 4,
    titulo: "La Fuerza que Ya Tienes",
    introduccion:
      "A 4 días del final, es momento de reconocer -con datos, no solo con sensación- cuánto has cambiado desde el día 1. La mayoría de las personas subestiman su propio progreso porque lo viven día a día, sin comparar los extremos.",
    concepto:
      "Reconocer el progreso real no es una cuestión de autoestima vacía, es una herramienta práctica: te confirma que el sistema funciona, lo cual hace mucho más fácil sostenerlo después del día 30. La comparación correcta no es contra la persona que querías ser en una semana -es contra la persona que eras el día 1, con datos objetivos: peso, medidas, fotos, y algo que casi nadie mide pero que cambió seguro en 26 días: tu capacidad de sostener un hábito que antes no sostenías.",
    rutinaTitulo: "Tu comparación día 1 vs. día 26",
    rutinaItems: [
      "Pon lado a lado tu foto del día 1 y una de hoy.",
      "Compara tu peso y cintura del día 1 contra el registro más reciente (sección Progreso).",
      "Escribe una cosa que hoy haces de forma automática que el día 1 te costaba trabajo.",
    ],
    tipAccionable: "Guarda esta comparación — es la evidencia que vas a necesitar en los días difíciles después del reto.",
    previewSiguiente: "Mañana: El Umbral — la preparación final antes de la revelación del Método completo.",
  },
  {
    dia: 27,
    fase: 4,
    titulo: "El Umbral",
    introduccion:
      "Hoy repites la Prueba de Fuego del día 13 -mismo circuito, mismos ejercicios- para medir con números reales cuánto cambiaste en 14 días. Es tu último gran chequeo antes de los 3 días finales del reto.",
    concepto:
      "Comparar el mismo circuito exacto en dos momentos distintos elimina la subjetividad: no es cómo te sientes, es cuántas flexiones más hiciste, cuántos segundos más aguantaste la plancha, cuánto más rápido terminaste las sentadillas. Este tipo de comparación directa suele mostrar mejoras que el espejo o la báscula no capturan -tu sistema nervioso y tu resistencia muscular mejoran incluso en semanas donde el peso corporal casi no cambió. Este umbral marca el cierre de la parte de ejecución activa del reto: después de hoy, quedan 2 días de cierre y repaso antes de la revelación completa del Método.",
    rutinaTitulo: "Repite la Prueba de Fuego (día 13)",
    rutinaItems: [
      "Máximo de flexiones seguidas sin parar (compara con tu número del día 13).",
      "Plancha: sostén el mayor tiempo posible (compara los segundos).",
      "60 sentadillas con peso corporal: cronometra y compara el tiempo.",
      "Anota la diferencia exacta en cada uno de los 3 ejercicios.",
    ],
    tipAccionable: "Sea cual sea la diferencia, es información real sobre tu progreso — anótala en tu registro de progreso.",
    previewSiguiente: "Mañana: La Víspera — el último empuje antes de Valhalla.",
  },
  {
    dia: 28,
    fase: 4,
    titulo: "La Víspera",
    introduccion:
      "Dos días para el final. Hoy es un día de cierre suave -no un entrenamiento intenso ni una lección con mucha teoría nueva- para llegar con energía completa al día 30, el más importante de todo el reto.",
    concepto:
      "Así como los atletas reducen la carga de entrenamiento los días antes de una competencia importante (una técnica llamada tapering), tiene sentido bajar un poco la intensidad estos últimos días para llegar con el cuerpo recuperado y la mente clara al cierre. Esto no significa abandonar el plan -significa ejecutarlo con calidad en vez de buscar un último esfuerzo heroico que no cambia nada en 2 días pero sí puede dejarte agotado para la reflexión final que viene el día 30.",
    rutinaTitulo: "Rutina suave de hoy",
    rutinaItems: [
      "Entrenamiento ligero: 20 minutos de movimiento (caminar rápido, o un circuito suave sin buscar un máximo esfuerzo).",
      "Aplica la Regla del Guerrero con calma en tus 3 comidas.",
      "Repasa mentalmente tu plan de mantenimiento del día 25: ¿sigue siendo el mismo plan?",
    ],
    tipAccionable: "Duerme especialmente bien esta noche — quieres llegar con la mente clara al día 30.",
    previewSiguiente: "Mañana: El Último Paso — repaso general antes de Valhalla.",
  },
  {
    dia: 29,
    fase: 4,
    titulo: "El Último Paso",
    introduccion:
      "Un día antes de la revelación completa. Hoy no hay contenido nuevo: es un repaso general de las 4 fases que recorriste, para llegar al día 30 con todo el panorama claro, no solo con el recuerdo del último día.",
    concepto:
      "Los repasos generales sirven para algo que los repasos semanales no logran: ver el patrón completo. En la Fase 1 construiste las bases (alimentación, descanso, medición). En la Fase 2 empezaste a forjar tu cuerpo con entrenamiento estructurado. En la Fase 3 pasaste de la teoría a la ejecución sostenida, incluso cuando la motivación bajó. En la Fase 4 afinaste detalles y preparaste lo que sigue después del reto. Cada fase construyó sobre la anterior -no son 30 lecciones sueltas, son un solo sistema que ahora ya conoces completo, aunque todavía no hayas visto cómo se une todo. Eso es exactamente lo que revela mañana.",
    rutinaTitulo: "Repaso final (10 minutos)",
    rutinaItems: [
      "Fase 1: ¿recuerdas la Regla del Guerrero y por qué el descanso construye?",
      "Fase 2: ¿sigues el split de 4 días? ¿sabes ajustar tu plan con datos?",
      "Fase 3: ¿tienes claro qué hacer cuando la motivación baja o llegas al Muro Invisible?",
      "Fase 4: ¿tu Plan de Mantenimiento sigue vigente?",
    ],
    tipAccionable: "Si algo de este repaso no te quedó claro, relee esa lección específica antes de mañana.",
    previewSiguiente: "Mañana: 🏆 Valhalla — el Método Vikingo completo, todas las piezas juntas.",
  },

  // ---------------------------------------------------------------
  // FASE 5 — La Revelación (día 30)
  // ---------------------------------------------------------------
  {
    dia: 30,
    fase: 5,
    titulo: "🏆 Valhalla — El Método Vikingo Completo",
    introduccion:
      "Llegaste. 30 días, 5 fases, 3 runas recogidas en el camino. Hoy no es un día más de instrucciones -es el cierre donde todas las piezas que fuiste juntando se convierten en un sistema completo que ya es tuyo.",
    concepto:
      "Un vikingo no era el guerrero más fuerte del pueblo -era el que salía a remar todos los días, lloviera o no, porque entendía que la fuerza real se construye en la repetición, no en el arranque. Eso es el Método Vikingo completo: Constancia (Runa 1) para aparecer incluso en los días difíciles, Estructura (Runa 2) para no depender de la motivación, y Medición (Runa 3) para saber siempre qué ajustar. Las tres juntas forman un sistema que se sostiene solo -no porque seas una persona distinta a la que empezó el día 1, sino porque ahora tienes el mapa completo que antes no tenías.",
    rutinaTitulo: "Tu cierre del reto",
    rutinaItems: [
      "Compara tu foto y medidas del día 1 contra hoy (sección Progreso) una última vez, completas.",
      "Relee tu Plan de Mantenimiento del día 25 y confírmalo como tu plan real a partir de mañana.",
      "Comparte tu racha final si quieres — es información real para alguien que está donde tú estabas el día 1.",
    ],
    tipAccionable: "El día 31 no es el final del método, es el primer día en que lo aplicas sin que nadie te lo recuerde.",
    previewSiguiente: "El reto termina. El Método empieza — para siempre, si tú decides seguirlo.",
    esDiaDePieza: true,
  },
];
