import BotonHotmart, { HOTMART_URL_DEFAULT } from "@/app/components/BotonHotmart";
import StickyCTA from "@/app/components/StickyCTA";
import Acordeon from "@/app/components/Acordeon";
import Testimonios, { type Testimonio } from "@/app/components/Testimonios";
import ExitPopup from "@/app/components/ExitPopup";
import { Reveal, Stagger } from "@/app/components/Reveal";
import { VikingMascot } from "@/app/components/VikingMascot";
import {
  Dumbbell,
  Brain,
  Apple,
  Smartphone,
  Lock,
  Check,
  Zap,
  Mail,
  RefreshCw,
  X,
} from "lucide-react";

const HOTMART_URL = process.env.NEXT_PUBLIC_HOTMART_URL || HOTMART_URL_DEFAULT;
const PRECIO = process.env.NEXT_PUBLIC_PRECIO || "$23.00";
const PRECIO_MONEDA = process.env.NEXT_PUBLIC_PRECIO_MONEDA || "USD";
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
    Icono: Dumbbell,
    titulo: "Físico de guerrero",
    texto: "Rutinas exactas para ganar músculo y fuerza. Para el gimnasio o para tu casa con lo que tengas a la mano.",
  },
  {
    Icono: Brain,
    titulo: "Mentalidad y disciplina",
    texto: "El método diario para vencer la flojera, romper malos hábitos y mantenerte enfocado sin depender de la motivación.",
  },
  {
    Icono: Apple,
    titulo: "Nutrición sin complicaciones",
    texto: "Guía de alimentación económica: qué comer para ponerte fuerte sin gastar de más en el supermercado.",
  },
  {
    Icono: Smartphone,
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
  { Icono: Zap, texto: "Acceso instantáneo apenas pagas" },
  { Icono: Mail, texto: "Enlace seguro a tu correo" },
  { Icono: RefreshCw, texto: "Actualizaciones incluidas" },
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

/** Encabezado de sección: pill + título en dos tonos. */
function EncabezadoSeccion({ pill, titulo, resaltar, sub }: { pill: string; titulo: string; resaltar: string; sub?: string }) {
  const [antes, despues] = titulo.split(resaltar);
  return (
    <div className="flex flex-col items-center text-center">
      <span className="pill text-ember">{pill}</span>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl">
        {antes}
        <span className="resalta">{resaltar}</span>
        {despues}
      </h2>
      {sub && <p className="mt-2 text-sm text-ink-dim sm:text-base">{sub}</p>}
    </div>
  );
}

/** Llama de antorcha decorativa — oculta en móvil pequeño para no saturar. */
function Antorcha({ lado }: { lado: "left" | "right" }) {
  return (
    <div className={`pointer-events-none absolute top-10 ${lado === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"} hidden sm:block`} aria-hidden>
      <div className="mx-auto h-16 w-2 rounded-full bg-gradient-to-b from-[#5a3820] to-[#2a1a10]" />
      <div className="antorcha-llama -mt-3 h-10 w-10 rounded-full" />
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

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <Antorcha lado="left" />
        <Antorcha lado="right" />
        <div className="relative mx-auto max-w-md px-6 py-16 text-center sm:max-w-xl sm:py-24 lg:max-w-2xl lg:py-28">
          <Reveal>
            <span className="pill text-ember">Método Vikingo</span>
          </Reveal>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            EL MÉTODO
            <br />
            <span className="resalta">VIKINGO</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-xl font-semibold leading-snug sm:max-w-lg sm:text-2xl lg:max-w-xl">
            Gana tus <span className="resalta">primeros 5 kg de músculo</span>, en casa o en el gimnasio.
          </p>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-dim sm:max-w-md sm:text-base">
            Más la disciplina, la mentalidad y la nutrición para construir un físico imponente y no rendirte a los tres
            días. El mapa paso a paso para hombres jóvenes, sin importar tu genética.
          </p>

          <div className="mt-7 flex justify-center">
            <VikingMascot pose="colgado" width={150} priority />
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="font-display text-2xl text-ember-2">{PRECIO}</span>
            <span className="text-sm text-ink-dim">{PRECIO_MONEDA} · pago único</span>
          </div>
          <CTAWrap className="mt-5">
            <BotonHotmart href={HOTMART_URL} ubicacion="hero" texto="Empezar el Método" className="w-full" pulso />
          </CTAWrap>

          <div className="mx-auto mt-6 flex max-w-sm flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-faint">
            <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-ember-2" /> Acceso al momento</span>
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-ember-2" /> Soporte por correo</span>
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-ember-2" /> Pago seguro</span>
          </div>
        </div>
      </section>
      {/* Sentinel: cuando esto sale de pantalla hacia arriba, aparece la barra fija. */}
      <div id="fin-hero" />

      {/* ¿TE PASA ESTO? */}
      <section className="mx-auto max-w-md px-6 py-16 sm:max-w-2xl sm:py-24 lg:max-w-4xl">
        <EncabezadoSeccion pill="El problema" titulo="¿TE PASA ESTO?" resaltar="ESTO" />
        <div className="mt-9 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
          <div className="hidden justify-self-center sm:block">
            <VikingMascot pose="esfuerzo" width={160} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROBLEMAS.map((p, i) => (
              <Reveal key={p} delay={i * 0.08}>
                <div className="card-vikingo card-vikingo-err flex h-full items-start gap-3 p-4">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-err/15 text-err">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm leading-relaxed sm:text-base">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.2}>
          <div className="card-crema mt-6 p-5 text-center sm:p-6">
            <p className="text-sm leading-relaxed sm:text-base">
              Por eso existe el Método Vikingo: un sistema diario, paso a paso, que te explica qué hacer y por qué —
              sin relleno, sin excusas para no empezar.
            </p>
          </div>
        </Reveal>
      </section>

      {/* TODO LO QUE RECIBES */}
      <section className="mx-auto max-w-md px-6 py-16 sm:max-w-2xl sm:py-24 lg:max-w-6xl">
        <EncabezadoSeccion pill="La solución" titulo="EL CAMBIO EMPIEZA HOY" resaltar="HOY" sub="Esto es lo que incluye el Método." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <Stagger>
            {INCLUYE.map(({ Icono, titulo, texto }, i) => (
              <div key={titulo} className="card-vikingo p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember/15 text-ember">
                    <Icono className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm text-ink-faint">0{i + 1}</span>
                </div>
                <p className="mt-4 font-display text-base tracking-wide">{titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{texto}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TESTIMONIOS — marquesina infinita 100% CSS, pausa al mantener el dedo */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-6xl">
          <EncabezadoSeccion pill="Lo que dicen" titulo="LA TRIBU YA ESTÁ ENTRENANDO" resaltar="ENTRENANDO" />
        </div>
        <div className="mt-10">
          <Testimonios items={TESTIMONIOS} />
        </div>
      </section>

      {/* PAGO SIN TARJETA */}
      <section className="mx-auto max-w-md px-6 py-16 sm:max-w-2xl sm:py-24">
        <EncabezadoSeccion pill="Sin barreras" titulo="¿NO TIENES TARJETA?" resaltar="TARJETA?" />
        <Reveal delay={0.1}>
          <div className="card-vikingo card-vikingo-ice mt-9 p-6 sm:p-8">
            <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-ink-dim sm:text-base">
              Paga en <strong className="text-ink">efectivo</strong> en la tienda más cercana o con tu{" "}
              <strong className="text-ink">billetera digital</strong> favorita. Genera tu código en el botón de abajo.
            </p>
            <ul className="mx-auto mt-6 grid max-w-xl gap-2.5 sm:grid-cols-2">
              {METODOS_PAGO.map((m) => (
                <li
                  key={m.pais}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-bg-2/60 px-3.5 py-2.5 text-sm"
                >
                  <span className="flex items-center gap-2.5 text-ink-dim">
                    <span className="rounded-md bg-ice/15 px-1.5 py-0.5 font-display text-[10px] tracking-wider text-ice">
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
              <Lock className="h-3.5 w-3.5" />
              Conexión segura vía Hotmart
            </p>
          </div>
        </Reveal>
      </section>

      {/* PRECIO — tarjeta crema destacada */}
      <section className="relative overflow-hidden border-y border-line py-16 sm:py-24">
        <div className="relative mx-auto max-w-md px-6 sm:max-w-lg">
          <Reveal>
            <div className="card-crema overflow-hidden p-7 text-center sm:p-9">
              <div className="mx-auto -mt-2 mb-1 flex justify-center">
                <VikingMascot pose="orgulloso" width={120} />
              </div>
              <span className="pill text-ember-deep">Acceso completo</span>
              {PRECIO_ANTERIOR && <p className="mt-5 text-xl opacity-50 line-through sm:text-2xl">{PRECIO_ANTERIOR}</p>}
              <p className="mt-3 flex items-baseline justify-center gap-x-2 font-display leading-none text-ember-deep">
                <span className="text-5xl sm:text-7xl">{PRECIO}</span>
                <span className="text-xl opacity-70 sm:text-3xl">{PRECIO_MONEDA}</span>
              </p>
              <p className="mt-3 text-xs opacity-70 sm:text-sm">O el equivalente en la moneda de tu país</p>

              <ul className="mx-auto mt-7 grid max-w-sm gap-2.5 text-left">
                {LO_QUE_OBTIENES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-[0.95rem]">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ok/20 text-[#2f8f55]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <CTAWrap className="mt-8">
                <BotonHotmart href={HOTMART_URL} ubicacion="precio" pulso texto="Quiero mi acceso ahora" className="w-full" />
              </CTAWrap>
              <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed opacity-70 sm:text-sm">
                Al hacer clic, Hotmart convierte el precio a tu moneda local y te muestra las opciones de pago de tu país.
              </p>
            </div>
          </Reveal>

          {/* Strip de confianza — reformatea el bloque "compra segura" en íconos. */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {CONFIANZA.map(({ Icono, texto }) => (
              <div
                key={texto}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-bg-2/60 px-3.5 py-3 text-xs text-ink-dim sm:flex-col sm:items-center sm:text-center"
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
        <EncabezadoSeccion pill="Dudas frecuentes" titulo="PREGUNTAS FRECUENTES" resaltar="FRECUENTES" />
        <div className="card-vikingo mt-9 px-5 sm:px-7">
          <Acordeon items={PREGUNTAS} />
        </div>
      </section>

      {/* CIERRE */}
      <section className="relative overflow-hidden border-t border-line pb-24 pt-16 sm:pb-16 sm:pt-24">
        <div className="relative mx-auto max-w-md px-6 text-center sm:max-w-xl">
          <div className="flex justify-center">
            <VikingMascot pose="apunta_abajo" width={150} />
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl">
            ÚNETE A LA <span className="resalta">TRIBU</span> HOY
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-dim sm:text-base">
            El primer paso es una decisión. El resto es método.
          </p>
          <CTAWrap className="mt-8">
            <BotonHotmart href={HOTMART_URL} ubicacion="cta_final" pulso texto="Quiero mi acceso ahora" className="w-full" />
          </CTAWrap>
        </div>
      </section>

      <StickyCTA href={HOTMART_URL} sentinelId="fin-hero" precio={`${PRECIO} ${PRECIO_MONEDA}`} />
      <ExitPopup href={HOTMART_URL} />
    </div>
  );
}
