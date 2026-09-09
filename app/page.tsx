import BotonHotmart, { HOTMART_URL_DEFAULT } from "@/app/components/BotonHotmart";
import StickyCTA from "@/app/components/StickyCTA";
import Acordeon from "@/app/components/Acordeon";
import {
  IconoEscudo,
  SeparadorRuna,
  IconoChevron,
  IconoPesa,
  IconoCerebro,
  IconoNutricion,
  IconoTelefono,
  IconoCandado,
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

      {/* HERO — glow radial + trama de líneas geométricas, sin imágenes ni JS de parallax */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(230,57,70,0.16) 0%, rgba(230,57,70,0) 70%), radial-gradient(40% 40% at 85% 90%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
          preserveAspectRatio="none"
        >
          <pattern id="lineas-hero" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M0 42 42 0" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#lineas-hero)" />
        </svg>

        <div className="relative mx-auto max-w-md px-6 py-16 text-center sm:max-w-xl sm:py-24 lg:max-w-2xl lg:py-32">
          <IconoEscudo className="mx-auto h-12 w-12 text-ember-2 lg:h-14 lg:w-14" />
          <h1 className="mt-5 font-display text-4xl leading-tight tracking-tight text-ink sm:text-6xl lg:text-7xl">
            EL MÉTODO VIKINGO
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink sm:max-w-lg sm:text-xl lg:max-w-xl">
            Deja de ser el chico promedio. Construye un físico imponente, disciplina de acero y la fuerza de un
            guerrero.
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-dim sm:max-w-md sm:text-base">
            El mapa paso a paso para hombres jóvenes que quieren transformar su cuerpo y su mente, sin importar su
            genética actual.
          </p>
          <CTAWrap className="mt-8">
            <BotonHotmart href={HOTMART_URL} ubicacion="hero" texto="⚔ UNIRSE AL MÉTODO VIKINGO HOY" pulso />
          </CTAWrap>
          <p className="mt-3 text-xs tracking-wide text-ink-faint">ACCESO INMEDIATO EN TU CELULAR O COMPUTADOR</p>
        </div>
      </section>
      {/* Sentinel: cuando esto sale de pantalla hacia arriba, aparece el sticky CTA. */}
      <div id="fin-hero" />

      {/* AGITACIÓN — bento con borde tenue + blur */}
      <section className="mx-auto max-w-md px-6 py-14 sm:max-w-2xl sm:py-20 lg:max-w-3xl">
        <h2 className="text-center font-display text-2xl sm:text-3xl">¿TE SIENTES IDENTIFICADO CON ESTO?</h2>
        <div className="mt-7 grid gap-4 rounded border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md sm:grid-cols-2 sm:gap-5 sm:p-8">
          {PROBLEMAS.map((p) => (
            <p key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/90">
              <IconoChevron className="mt-0.5 h-4 w-4 flex-none text-ember" />
              {p}
            </p>
          ))}
        </div>
      </section>

      <SeparadorRuna />

      {/* SOLUCIÓN — tarjetas nítidas, esquinas afiladas, filo superior sutil */}
      <section className="mx-auto max-w-md px-6 py-14 sm:max-w-2xl sm:py-20 lg:max-w-5xl">
        <h2 className="text-center font-display text-2xl sm:text-3xl">EL CAMBIO EMPIEZA HOY</h2>
        <p className="mt-2 text-center text-sm text-ink-dim sm:text-base">¿Qué incluye el Método?</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUYE.map(({ Icono, titulo, texto }) => (
            <div key={titulo} className="relative rounded bg-bg-2 p-5">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/60 to-transparent" />
              <Icono className="h-6 w-6 text-ember" />
              <p className="mt-3 font-display text-base tracking-wide">{titulo}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      <SeparadorRuna />

      {/* PAGO SIN TARJETA — estética fintech, sin emojis de bandera */}
      <section className="mx-auto max-w-md px-6 py-14 sm:max-w-2xl sm:py-20">
        <div className="rounded border border-white/[0.08] bg-bg-2 p-6 sm:p-8">
          <h2 className="text-center font-display text-xl sm:text-2xl">¿NO TIENES TARJETA DE CRÉDITO?</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-ink-dim sm:text-base">
            Paga en <strong className="text-ink">efectivo</strong> en la tienda más cercana o con tu{" "}
            <strong className="text-ink">billetera digital</strong> favorita. Genera tu código en el botón de abajo.
          </p>
          <ul className="mx-auto mt-5 grid max-w-xl gap-2 sm:grid-cols-2">
            {METODOS_PAGO.map((m) => (
              <li key={m.pais} className="flex items-center justify-between rounded border border-line px-3 py-2 text-sm">
                <span className="flex items-center gap-2 text-ink-dim">
                  <span className="rounded-sm bg-bg-3 px-1.5 py-0.5 font-display text-[10px] tracking-wider text-ember-2">
                    {m.pais}
                  </span>
                  {m.nombre}
                </span>
                <span className="text-right text-ink">{m.opciones}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-xs text-ink-faint">Y más opciones disponibles según tu país al hacer clic.</p>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-ink-faint">
            <IconoCandado className="h-3.5 w-3.5" />
            Conexión segura vía Hotmart
          </p>
        </div>
      </section>

      {/* SOPORTE — sello fino en plata, sin lenguaje de garantía/reembolso */}
      <section className="mx-auto max-w-md px-6 py-14 sm:max-w-2xl sm:py-20">
        <div className="mx-auto max-w-xl rounded border border-[#c0c0c0]/25 bg-bg-2 p-6 text-center sm:p-8">
          <p className="font-display text-lg tracking-wide text-[#d8d8d8] sm:text-xl">COMPRA SEGURA</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim sm:text-base">
            Acceso instantáneo apenas pagas, soporte por correo si tienes dudas para adaptar las rutinas a tu cuerpo,
            y todas las actualizaciones futuras del método incluidas sin costo extra.
          </p>
        </div>
      </section>

      <SeparadorRuna />

      {/* PRECIO — número gigante, sin ancla inventada */}
      <section className="relative overflow-hidden border-y border-line bg-bg-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(50% 60% at 50% 40%, rgba(230,57,70,0.12) 0%, rgba(230,57,70,0) 70%)" }}
        />
        <div className="relative mx-auto max-w-md px-6 py-16 text-center sm:max-w-xl sm:py-24">
          <p className="font-display text-xs tracking-widest text-ember-2 sm:text-sm">ACCESO COMPLETO</p>
          {PRECIO_ANTERIOR && <p className="mt-4 text-xl text-ink-faint line-through sm:text-2xl">{PRECIO_ANTERIOR}</p>}
          <p className="mt-2 font-display text-6xl text-ember sm:text-7xl">{PRECIO}</p>
          <p className="mt-2 text-xs text-ink-faint sm:text-sm">O el equivalente en la moneda de tu país</p>
          <CTAWrap className="mt-8">
            <BotonHotmart href={HOTMART_URL} ubicacion="precio" pulso texto="⚔ QUIERO MI ACCESO AL MÉTODO VIKINGO" />
          </CTAWrap>
          <p className="mx-auto mt-4 max-w-sm text-xs text-ink-faint sm:text-sm">
            Al hacer clic, Hotmart convierte el precio a tu moneda local y te muestra las opciones de pago de tu país.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-md px-6 py-14 sm:max-w-2xl sm:py-20">
        <h2 className="text-center font-display text-2xl sm:text-3xl">PREGUNTAS FRECUENTES</h2>
        <div className="mt-7">
          <Acordeon items={PREGUNTAS} />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-line bg-bg-2 pb-20 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(230,57,70,0.14) 0%, rgba(230,57,70,0) 70%)" }}
        />
        <div className="relative mx-auto max-w-md px-6 py-16 text-center sm:max-w-xl sm:py-20">
          <h2 className="font-display text-2xl sm:text-3xl">ÚNETE A LA TRIBU HOY</h2>
          <CTAWrap className="mt-7">
            <BotonHotmart href={HOTMART_URL} ubicacion="cta_final" pulso texto="⚔ QUIERO MI ACCESO AL MÉTODO VIKINGO" />
          </CTAWrap>
        </div>
      </section>

      <StickyCTA href={HOTMART_URL} sentinelId="fin-hero" />
    </div>
  );
}
