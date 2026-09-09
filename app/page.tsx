import BotonHotmart, { HOTMART_URL_DEFAULT } from "@/app/components/BotonHotmart";
import StickyCTA from "@/app/components/StickyCTA";
import { IconoEscudo, SeparadorRuna } from "@/app/components/IconosNordicos";

const HOTMART_URL = process.env.NEXT_PUBLIC_HOTMART_URL || HOTMART_URL_DEFAULT;
const PRECIO = process.env.NEXT_PUBLIC_PRECIO || "$23 USD";

const PROBLEMAS = [
  "Cansado de mirarte al espejo y no ver el cambio físico que deseas.",
  "Sin disciplina: empiezas una rutina y la dejas a los tres días por pereza.",
  "Atrapado en la rutina: pegado al teléfono todo el día, sin energía.",
  "Frustrado por no saber qué comer o cómo entrenar sin gastar una fortuna.",
];

const INCLUYE = [
  {
    icono: "🏋️",
    titulo: "Físico de guerrero",
    texto: "Rutinas exactas para ganar músculo y fuerza. Para el gimnasio o para tu casa con lo que tengas a la mano.",
  },
  {
    icono: "🧠",
    titulo: "Mentalidad y disciplina",
    texto: "El método diario para vencer la flojera, romper malos hábitos y mantenerte enfocado sin depender de la motivación.",
  },
  {
    icono: "🥩",
    titulo: "Nutrición sin complicaciones",
    texto: "Guía de alimentación económica: qué comer para ponerte fuerte sin gastar de más en el supermercado.",
  },
  {
    icono: "📱",
    titulo: "Formato ultra-rápido",
    texto: "PDF optimizado para leerlo y aplicarlo directo desde tu celular en 10 minutos.",
  },
];

const METODOS_PAGO = [
  { pais: "🇲🇽 México", opciones: "OXXO / Mercado Pago" },
  { pais: "🇨🇴 Colombia", opciones: "Efecty / Nequi / Daviplata" },
  { pais: "🇵🇪 Perú", opciones: "PagoEfectivo / Yape / Plin" },
  { pais: "🇨🇱 Chile", opciones: "Sencillito / Servipag / Mach" },
  { pais: "🇪🇸 España", opciones: "Bizum / Tarjeta débito" },
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

      {/* HERO */}
      <section className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-md px-6 py-14 text-center sm:max-w-xl sm:py-20 lg:max-w-2xl lg:py-28">
          <IconoEscudo className="mx-auto h-14 w-14 text-ember-2 lg:h-16 lg:w-16" />
          <h1 className="mt-4 font-display text-3xl leading-tight sm:text-5xl lg:text-6xl">🛡️ EL MÉTODO VIKINGO</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink sm:max-w-lg sm:text-xl lg:max-w-xl">
            Deja de ser el chico promedio. Construye un físico imponente, disciplina de acero y la fuerza de un
            guerrero.
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-dim sm:max-w-md sm:text-base">
            El mapa paso a paso para hombres jóvenes que quieren transformar su cuerpo y su mente, sin importar su
            genética actual.
          </p>
          <CTAWrap className="mt-7">
            <BotonHotmart href={HOTMART_URL} ubicacion="hero" texto="⚔️ OBTENER EL MÉTODO VIKINGO AQUÍ" />
          </CTAWrap>
          <p className="mt-2 text-xs text-ink-faint">(Acceso inmediato en tu celular o computador)</p>
        </div>
      </section>
      {/* Sentinel: cuando esto sale de pantalla hacia arriba, aparece el sticky CTA. */}
      <div id="fin-hero" />

      {/* AGITACIÓN */}
      <section className="mx-auto max-w-md px-6 py-12 sm:max-w-2xl sm:py-16 lg:max-w-3xl">
        <h2 className="text-center font-display text-2xl sm:text-3xl">¿Te sientes identificado con esto?</h2>
        <div className="mt-6 grid gap-3 rounded-xl border border-err/30 bg-bg-2 p-5 sm:grid-cols-2 sm:gap-4 sm:p-6">
          {PROBLEMAS.map((p) => (
            <p key={p} className="flex items-start gap-2 text-sm leading-relaxed text-ink/90">
              <span aria-hidden className="text-err">
                ❌
              </span>
              {p}
            </p>
          ))}
        </div>
      </section>

      <SeparadorRuna />

      {/* SOLUCIÓN */}
      <section className="mx-auto max-w-md px-6 py-12 sm:max-w-2xl sm:py-16 lg:max-w-5xl">
        <h2 className="text-center font-display text-2xl sm:text-3xl">El cambio empieza hoy: ¿qué incluye el Método?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUYE.map((item) => (
            <div key={item.titulo} className="rounded-xl border border-line bg-bg-2 p-5">
              <p className="font-display text-lg text-ember-2">
                {item.icono} {item.titulo}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <SeparadorRuna />

      {/* MÉTODOS DE PAGO SIN TARJETA */}
      <section className="mx-auto max-w-md px-6 py-12 sm:max-w-2xl sm:py-16">
        <div className="rounded-xl border border-ember/40 bg-bg-2 p-5 sm:p-8">
          <h2 className="text-center font-display text-xl sm:text-2xl">💳 ¿No tienes tarjeta de crédito?</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-ink-dim sm:text-base">
            No hay problema — puedes pagar en <strong className="text-ink">efectivo</strong> en la tienda más cercana
            o con tu <strong className="text-ink">billetera digital</strong> favorita. Genera tu código en el botón
            de abajo y listo.
          </p>
          <ul className="mx-auto mt-4 grid max-w-xl gap-x-8 gap-y-1.5 text-sm text-ink-dim sm:grid-cols-2">
            {METODOS_PAGO.map((m) => (
              <li key={m.pais} className="flex justify-between border-b border-line pb-1.5">
                <span>{m.pais}</span>
                <span className="text-ink">{m.opciones}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-xs text-ink-faint">Y más opciones disponibles según tu país al hacer clic.</p>
        </div>
      </section>

      {/* SOPORTE (sin lenguaje de garantía/reembolso que no respaldamos) */}
      <section className="mx-auto max-w-md px-6 py-12 sm:max-w-2xl sm:py-16">
        <div className="mx-auto max-w-xl rounded-xl border border-ember-2/40 bg-bg-2 p-5 text-center sm:p-8">
          <p className="font-display text-lg text-ember-2 sm:text-xl">🤝 Compra segura</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim sm:text-base">
            Acceso instantáneo apenas pagas, soporte por correo si tienes dudas para adaptar las rutinas a tu cuerpo,
            y todas las actualizaciones futuras del método incluidas sin costo extra.
          </p>
        </div>
      </section>

      <SeparadorRuna />

      {/* PRECIO */}
      <section className="border-y border-line bg-bg-2">
        <div className="mx-auto max-w-md px-6 py-14 text-center sm:max-w-xl sm:py-20">
          <p className="font-display text-xs text-ember-2 sm:text-sm">Acceso completo</p>
          <p className="mt-3 font-display text-5xl text-ember-2 sm:text-6xl">{PRECIO}</p>
          <p className="mt-1 text-xs text-ink-faint sm:text-sm">O el equivalente en la moneda de tu país</p>
          <CTAWrap className="mt-7">
            <BotonHotmart href={HOTMART_URL} ubicacion="precio" pulso texto="🛡️ QUIERO MI ACCESO AL MÉTODO VIKINGO" />
          </CTAWrap>
          <p className="mx-auto mt-3 max-w-sm text-xs text-ink-faint sm:text-sm">
            Al hacer clic, Hotmart convierte el precio a tu moneda local y te muestra las opciones de pago de tu país.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-md px-6 py-12 sm:max-w-2xl sm:py-16">
        <h2 className="text-center font-display text-2xl sm:text-3xl">Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {PREGUNTAS.map((p) => (
            <details key={p.q} className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold marker:content-none sm:text-base">
                <span className="mr-2 text-ember-2 group-open:hidden">+</span>
                <span className="mr-2 hidden text-ember-2 group-open:inline">−</span>
                {p.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim sm:text-base">{p.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-line bg-bg-2 pb-20 sm:pb-16">
        <div className="mx-auto max-w-md px-6 py-14 text-center sm:max-w-xl sm:py-20">
          <h2 className="font-display text-2xl sm:text-3xl">Únete a la tribu hoy</h2>
          <CTAWrap className="mt-6">
            <BotonHotmart href={HOTMART_URL} ubicacion="cta_final" pulso texto="🛡️ QUIERO MI ACCESO AL MÉTODO VIKINGO" />
          </CTAWrap>
        </div>
      </section>

      <StickyCTA href={HOTMART_URL} sentinelId="fin-hero" />
    </div>
  );
}
