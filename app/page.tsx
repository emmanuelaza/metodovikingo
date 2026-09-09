import BotonHotmart, { HOTMART_URL_DEFAULT } from "@/app/components/BotonHotmart";
import StickyCTA from "@/app/components/StickyCTA";
import Acordeon from "@/app/components/Acordeon";
import Testimonios, { type Testimonio } from "@/app/components/Testimonios";
import {
  IconoEscudo,
  IconoChevron,
  IconoPesa,
  IconoCerebro,
  IconoNutricion,
  IconoTelefono,
  IconoCandado,
  IconoCheck,
  IconoRayo,
  IconoSobre,
  IconoActualizar,
} from "@/app/components/IconosNordicos";

const HOTMART_URL = process.env.NEXT_PUBLIC_HOTMART_URL || HOTMART_URL_DEFAULT;
const PRECIO = process.env.NEXT_PUBLIC_PRECIO || "$23 USD";
// Solo se muestra si es un precio anterior real — nunca un ancla inventada.
const PRECIO_ANTERIOR = process.env.NEXT_PUBLIC_PRECIO_ANTERIOR;

const PROBLEMAS = [
  "Cansado de mirarte al espejo y no ver el cambio físico que deseas.",
  "Sin disciplina: empiezas una rutina y la dejas a los tres días por pereza.",
  "Atrapado en la rutina: pegado al teléfono todo el día, sin energía.",
  "Frustrado por no saber qué comer o cómo entrenar sin gastar una fortuna.",
];

const INCLUYE = [
  {
    Icono: IconoPesa,
    titulo: "Físico de guerrero",
    texto: "Rutinas exactas para ganar músculo y fuerza. Para el gimnasio o para tu casa con lo que tengas a la mano.",
  },
  {
    Icono: IconoCerebro,
    titulo: "Mentalidad y disciplina",
    texto: "El método diario para vencer la flojera, romper malos hábitos y mantenerte enfocado sin depender de la motivación.",
  },
  {
    Icono: IconoNutricion,
    titulo: "Nutrición sin complicaciones",
    texto: "Guía de alimentación económica: qué comer para ponerte fuerte sin gastar de más en el supermercado.",
  },
  {
    Icono: IconoTelefono,
    titulo: "Formato ultra-rápido",
    texto: "PDF optimizado para leerlo y aplicarlo directo desde tu celular en 10 minutos.",
  },
];

const METODOS_PAGO = [
  { pais: "MX", nombre: "México", opciones: "OXXO / Mercado Pago" },
  { pais: "CO", nombre: "Colombia", opciones: "Efecty / Nequi / Daviplata" },
  { pais: "PE", nombre: "Perú", opciones: "PagoEfectivo / Yape / Plin" },
  { pais: "CL", nombre: "Chile", opciones: "Sencillito / Servipag / Mach" },
  { pais: "ES", nombre: "España", opciones: "Bizum / Tarjeta débito" },
];

// Lo que entra en el acceso — reordena en formato de oferta el mismo
// contenido de INCLUYE + soporte, para el checklist de la tarjeta de precio.
const LO_QUE_OBTIENES = [
  "Rutinas de fuerza para gimnasio o para casa",
  "Sistema diario de disciplina y hábitos",
  "Guía de nutrición económica",
  "PDF listo para leer desde tu celular",
  "Soporte por correo para adaptar las rutinas",
  "Actualizaciones futuras incluidas sin costo extra",
];

const CONFIANZA = [
  { Icono: IconoRayo, texto: "Acceso instantáneo apenas pagas" },
  { Icono: IconoSobre, texto: "Enlace seguro a tu correo" },
  { Icono: IconoActualizar, texto: "Actualizaciones incluidas" },
];

// Testimonios reales aportados por el negocio (verbatim).
const TESTIMONIOS: Testimonio[] = [
  {
    texto: "Tengo 16 años y me daba vergüenza ir al gimnasio porque estaba demasiado flaco. Empecé el Método en mi habitación hace un mes y ya gané 4 kilos de músculo puro.",
    autor: "Mateo R. (16 años)",
  },
  {
    texto: "Me pasaba 8 horas al día haciendo scroll, sin energía. Este mapa me dio la disciplina que me faltaba. Dejé de perder el tiempo y ahora entreno a diario.",
    autor: "Kevin M. (17 años)",
  },
  {
    texto: "Pensé que necesitaba comprar suplementos caros o pedirle dinero a mis padres. La guía de alimentación económica te enseña a comer con lo que hay en casa.",
    autor: "Santiago L.",
  },
  {
    texto: "Tengo 15 años y no tengo tarjeta. Generé el código en efectivo, fui a pagar a la tienda de la esquina y el acceso me llegó al correo en un minuto. Cero estafas.",
    autor: "Dylan C. (15 años)",
  },
  {
    texto: "Las rutinas en casa son brutales. No necesitas equipo raro. Con constancia y este PDF he construido más hombros y espalda que en 6 meses de gimnasio flojo.",
    autor: "Alejandro V. (18 años)",
  },
  {
    texto: "Lo que más me sirvió fue el sistema para destruir la pereza. La regla de los 5 segundos que enseña el método cambió por completo mis mañanas.",
    autor: "Carlos T. (16 años)",
  },
  {
    texto: "Tengo 17 años y tenía algo de sobrepeso. El método no te complica la vida con dietas imposibles. He bajado grasa manteniendo la fuerza de forma real.",
    autor: "Matías P. (17 años)",
  },
  {
    texto: "Un mapa directo al grano. Odio leer libros aburridos de escuela, pero este PDF te dice exactamente qué hacer en 10 minutos desde tu celular.",
    autor: "Nicolás B.",
  },
  {
    texto: "Hacer que mis padres me apoyaran era difícil, pero les mostré la parte educativa del método y ellos mismos me dieron el dinero para ir a pagar en efectivo.",
    autor: "Samuel G. (15 años)",
  },
  {
    texto: "La mentalidad vikinga es otro nivel. No solo cambió mi cuerpo, ahora tengo el enfoque necesario para estudiar y levantarme temprano sin dar excusas.",
    autor: "Esteban J. (19 años)",
  },
];

const PREGUNTAS = [
  {
    q: "¿No tengo tarjeta de crédito, puedo comprarlo igual?",
    a: "Sí. Al hacer clic en el botón, Hotmart te da la opción de generar un código y pagar en efectivo en la tienda más cercana, o usar tu billetera digital — sin necesitar ninguna tarjeta.",
  },
  {
    q: "¿Me va a llegar algo físico a mi casa?",
    a: "No. El acceso es digital e inmediato. Te llega un enlace seguro a tu correo un minuto después de pagar, para abrirlo directo en tu celular.",
  },
  {
    q: "¿Sirve si estoy muy flaco o con sobrepeso?",
    a: "Sí. El método enseña los principios de fuerza y disciplina que aplican para cualquier tipo de cuerpo — tú decides qué ajustes tomar según el tuyo.",
  },
  {
    q: "¿Necesito gimnasio?",
    a: "No es obligatorio. Las rutinas incluyen opciones para entrenar en casa; si tienes gimnasio, mejor, pero no es excusa para no empezar.",
  },
];

/** Botón centrado con ancho de mobile completo, pero sin estirarse infinito en pantallas grandes. */
function CTAWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-xs sm:max-w-sm ${className}`}>{children}</div>;
}

/** Encabezado editorial de sección: eyebrow con índice + título. */
function EncabezadoSeccion({ indice, kicker, titulo, sub }: { indice: string; kicker: string; titulo: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="eyebrow centrado">
        {indice} · {kicker}
      </span>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl">{titulo}</h2>
      {sub && <p className="mt-2 text-sm text-ink-dim sm:text-base">{sub}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "El Método Vikingo",
            description: "Programa digital de entrenamiento, nutrición y disciplina para hombres jóvenes.",
            offers: { "@type": "Offer", priceCurrency: "USD", price: "23" },
          }),
        }}
      />

      {/* HERO — glow radial que respira + trama geométrica + escudo en anillo luminoso */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="respira pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(65% 55% at 50% -5%, rgba(230,57,70,0.22) 0%, rgba(230,57,70,0) 68%), radial-gradient(45% 45% at 88% 92%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full text-ink opacity-[0.035]"
          preserveAspectRatio="none"
        >
          <pattern id="lineas-hero" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M0 44 44 0" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#lineas-hero)" />
        </svg>
        {/* Vignette inferior para fundir el hero con la siguiente sección. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />

        <div className="relative mx-auto max-w-md px-6 py-20 text-center sm:max-w-xl sm:py-28 lg:max-w-2xl lg:py-36">
          <span className="mx-auto inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-sm glow-ember">
            <IconoEscudo className="h-9 w-9 text-ember-2 lg:h-10 lg:w-10" />
          </span>
          <p className="eyebrow centrado mt-7 justify-center">Transformación física y mental</p>
          <h1 className="titulo-degradado mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            EL MÉTODO
            <br />
            VIKINGO
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink sm:max-w-lg sm:text-xl lg:max-w-xl">
            Deja de ser el chico promedio. Construye un físico imponente, disciplina de acero y la fuerza de un
            guerrero.
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-dim sm:max-w-md sm:text-base">
            El mapa paso a paso para hombres jóvenes que quieren transformar su cuerpo y su mente, sin importar su
            genética actual.
          </p>
          <CTAWrap className="mt-9">
            <BotonHotmart href={HOTMART_URL} ubicacion="hero" texto="⚔ UNIRSE AL MÉTODO VIKINGO HOY" pulso />
          </CTAWrap>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs tracking-wide text-ink-faint">
            <IconoRayo className="h-3.5 w-3.5 text-ember-2" />
            ACCESO INMEDIATO EN TU CELULAR O COMPUTADOR
          </p>
        </div>
      </section>
      {/* Sentinel: cuando esto sale de pantalla hacia arriba, aparece el sticky CTA. */}
      <div id="fin-hero" />

      {/* AGITACIÓN — bento con borde en degradado */}
      <section className="mx-auto max-w-md px-6 py-16 sm:max-w-2xl sm:py-24 lg:max-w-3xl">
        <EncabezadoSeccion indice="01" kicker="El problema" titulo="¿TE SIENTES IDENTIFICADO?" />
        <div className="borde-grad elev mt-9 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {PROBLEMAS.map((p) => (
              <p key={p} className="flex items-start gap-3 text-sm leading-relaxed text-ink/90 sm:text-base">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border border-ember/25 bg-ember/10 text-ember">
                  <IconoChevron className="h-3.5 w-3.5" />
                </span>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUCIÓN — tarjetas con borde en degradado que levitan */}
      <section className="mx-auto max-w-md px-6 py-16 sm:max-w-2xl sm:py-24 lg:max-w-6xl">
        <EncabezadoSeccion indice="02" kicker="La solución" titulo="EL CAMBIO EMPIEZA HOY" sub="Esto es lo que incluye el Método." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {INCLUYE.map(({ Icono, titulo, texto }, i) => (
            <div key={titulo} className="borde-grad card-hover elev group p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-ember/20 bg-ember/10 text-ember transition-colors group-hover:bg-ember/15">
                  <Icono className="h-6 w-6" />
                </span>
                <span className="font-display text-sm text-ink-faint">0{i + 1}</span>
              </div>
              <p className="mt-4 font-display text-base tracking-wide text-ink">{titulo}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS — marquesina infinita 100% CSS, pausa al mantener el dedo */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-6xl">
          <EncabezadoSeccion indice="03" kicker="Lo que dicen" titulo="LA TRIBU YA ESTÁ ENTRENANDO" />
        </div>
        <div className="mt-10">
          <Testimonios items={TESTIMONIOS} />
        </div>
      </section>

      {/* PAGO SIN TARJETA — estética fintech, borde en degradado */}
      <section className="mx-auto max-w-md px-6 py-16 sm:max-w-2xl sm:py-24">
        <EncabezadoSeccion indice="04" kicker="Sin barreras" titulo="¿NO TIENES TARJETA?" />
        <div className="borde-grad elev mt-9 p-6 sm:p-8">
          <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-ink-dim sm:text-base">
            Paga en <strong className="text-ink">efectivo</strong> en la tienda más cercana o con tu{" "}
            <strong className="text-ink">billetera digital</strong> favorita. Genera tu código en el botón de abajo.
          </p>
          <ul className="mx-auto mt-6 grid max-w-xl gap-2.5 sm:grid-cols-2">
            {METODOS_PAGO.map((m) => (
              <li
                key={m.pais}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-bg-3/50 px-3.5 py-2.5 text-sm transition-colors hover:border-white/[0.14]"
              >
                <span className="flex items-center gap-2.5 text-ink-dim">
                  <span className="rounded-md border border-ember/20 bg-ember/10 px-1.5 py-0.5 font-display text-[10px] tracking-wider text-ember-2">
                    {m.pais}
                  </span>
                  {m.nombre}
                </span>
                <span className="text-right text-ink">{m.opciones}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-xs text-ink-faint">Y más opciones disponibles según tu país al hacer clic.</p>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-faint">
            <IconoCandado className="h-3.5 w-3.5" />
            Conexión segura vía Hotmart
          </p>
        </div>
      </section>

      {/* PRECIO — tarjeta destacada: borde carmesí, glow, checklist de oferta */}
      <section className="relative overflow-hidden border-y border-line">
        <div
          aria-hidden
          className="respira pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(55% 65% at 50% 45%, rgba(230,57,70,0.16) 0%, rgba(230,57,70,0) 70%)" }}
        />
        <div className="relative mx-auto max-w-md px-6 py-20 sm:max-w-lg sm:py-28">
          <div className="borde-grad borde-grad-ember glow-ember overflow-hidden p-7 text-center sm:p-9">
            <span className="eyebrow centrado justify-center">Acceso completo</span>
            {PRECIO_ANTERIOR && <p className="mt-5 text-xl text-ink-faint line-through sm:text-2xl">{PRECIO_ANTERIOR}</p>}
            <p className="mt-3 font-display text-7xl leading-none text-ember sm:text-8xl">{PRECIO}</p>
            <p className="mt-3 text-xs text-ink-faint sm:text-sm">O el equivalente en la moneda de tu país</p>

            <ul className="mx-auto mt-7 grid max-w-sm gap-2.5 text-left">
              {LO_QUE_OBTIENES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink sm:text-[0.95rem]">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ember/15 text-ember">
                    <IconoCheck className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <CTAWrap className="mt-8">
              <BotonHotmart href={HOTMART_URL} ubicacion="precio" pulso texto="⚔ QUIERO MI ACCESO AHORA" />
            </CTAWrap>
            <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-ink-faint sm:text-sm">
              Al hacer clic, Hotmart convierte el precio a tu moneda local y te muestra las opciones de pago de tu país.
            </p>
          </div>

          {/* Strip de confianza — reformatea el bloque "compra segura" en íconos. */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {CONFIANZA.map(({ Icono, texto }) => (
              <div
                key={texto}
                className="flex items-center gap-2.5 rounded-lg border border-line bg-bg-2/60 px-3.5 py-3 text-xs text-ink-dim sm:flex-col sm:items-center sm:text-center"
              >
                <Icono className="h-5 w-5 flex-none text-ember-2" />
                {texto}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-md px-6 py-16 sm:max-w-2xl sm:py-24">
        <EncabezadoSeccion indice="05" kicker="Dudas frecuentes" titulo="PREGUNTAS FRECUENTES" />
        <div className="borde-grad elev mt-9 px-5 sm:px-7">
          <Acordeon items={PREGUNTAS} />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-line pb-24 sm:pb-16">
        <div
          aria-hidden
          className="respira pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(65% 65% at 50% 0%, rgba(230,57,70,0.18) 0%, rgba(230,57,70,0) 70%)" }}
        />
        <div className="relative mx-auto max-w-md px-6 py-20 text-center sm:max-w-xl sm:py-24">
          <span className="mx-auto inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] p-3.5 backdrop-blur-sm glow-ember">
            <IconoEscudo className="h-8 w-8 text-ember-2" />
          </span>
          <h2 className="titulo-degradado mt-6 font-display text-3xl sm:text-4xl lg:text-5xl">ÚNETE A LA TRIBU HOY</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-dim sm:text-base">
            El primer paso es una decisión. El resto es método.
          </p>
          <CTAWrap className="mt-8">
            <BotonHotmart href={HOTMART_URL} ubicacion="cta_final" pulso texto="⚔ QUIERO MI ACCESO AHORA" />
          </CTAWrap>
        </div>
      </section>

      <StickyCTA href={HOTMART_URL} sentinelId="fin-hero" />
    </div>
  );
}
