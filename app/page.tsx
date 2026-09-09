import BotonHotmart from "@/app/components/BotonHotmart";

const HOTMART_URL = process.env.NEXT_PUBLIC_HOTMART_URL;
const PRECIO = process.env.NEXT_PUBLIC_PRECIO;
const GARANTIA_DIAS = process.env.NEXT_PUBLIC_GARANTIA_DIAS;

const PILARES = [
  {
    titulo: "Constancia",
    texto:
      "El cuerpo no cambia por intensidad, cambia por repetición. No necesitas la rutina perfecta — necesitas aparecer más veces que la mayoría. Un mal día no tiene que convertirse en una mala semana.",
  },
  {
    titulo: "Estructura",
    texto:
      "La motivación se acaba; la estructura se queda. Horarios de comida fijos, entrenamiento agendado como una cita que no se cancela, un plato armado con una fórmula en vez de improvisado cada vez.",
  },
  {
    titulo: "Medición",
    texto:
      "Lo que no se mide no se puede ajustar. Peso, medidas, rendimiento — no para juzgarte, para saber exactamente qué palanca mover cuando algo no funciona, en vez de adivinar o abandonar el plan completo.",
  },
];

const INCLUYE = [
  "Plan de alimentación completo, sin dietas raras",
  "Rutinas de fuerza organizadas por nivel (principiante a avanzado)",
  "Sistema de ajustes semana a semana según tus resultados reales",
  "12 semanas de programa estructurado, no contenido suelto",
];

const PREGUNTAS = [
  {
    q: "¿Necesito gimnasio?",
    a: "No es obligatorio. Las rutinas incluyen opciones para entrenar en casa; si tienes gimnasio, mejor, pero no es una excusa para no empezar.",
  },
  {
    q: "¿Sirve si quiero ganar músculo y no bajar grasa?",
    a: "Sí. Los principios (proteína, fuerza, estructura, medición) son los mismos; lo que cambia es el balance calórico según tu objetivo, y el plan lo ajusta.",
  },
  {
    q: "¿Cuánto tiempo toma al día?",
    a: "Las rutinas están pensadas para encajar en una vida real, no para vivir en el gimnasio. El plan es sostenible, no un sacrificio de tiempo completo.",
  },
  {
    q: "¿Es consejo médico?",
    a: "No. Es contenido educativo de entrenamiento y nutrición general. Si tienes una condición de salud, consulta con un profesional antes de empezar.",
  },
];

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Método Vikingo",
            description: "Sistema de 12 semanas de nutrición y entrenamiento con plan de alimentación y rutinas por nivel.",
            provider: { "@type": "Organization", name: "Método Vikingo" },
          }),
        }}
      />

      {/* Hero */}
      <section className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
          <p className="font-display text-xs text-ember-2">Método Vikingo</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            El sistema completo de 12 semanas para transformar tu cuerpo de verdad
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-ink-dim">
            Plan de alimentación, rutinas de fuerza por nivel y un sistema de ajustes semana a semana — no otro PDF
            genérico que se queda sin usar.
          </p>
          {HOTMART_URL && (
            <div className="mx-auto mt-8 max-w-xs">
              <BotonHotmart href={HOTMART_URL} ubicacion="hero" />
            </div>
          )}
        </div>
      </section>

      {/* Problema */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="font-display text-2xl">La mayoría de los planes fallan por lo mismo</h2>
        <p className="mt-4 leading-relaxed text-ink-dim">
          No es falta de fuerza de voluntad. Es intentar seguir una rutina genérica que no se ajusta a ti, sin saber
          qué cambiar cuando deja de funcionar, y depender de una motivación que baja a la tercera semana — siempre.
          El Método Vikingo no apuesta a la motivación: apuesta a un sistema que sigue funcionando cuando la
          motivación ya no está.
        </p>
      </section>

      {/* Los 3 pilares */}
      <section className="border-t border-line bg-bg-2">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="font-display text-2xl">Los tres pilares del Método</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {PILARES.map((p) => (
              <div key={p.titulo} className="rounded-xl border border-line bg-bg p-5">
                <h3 className="font-display text-lg text-ember-2">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="font-display text-2xl">Qué incluye</h2>
        <ul className="mt-6 space-y-3">
          {INCLUYE.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink/90">
              <span aria-hidden className="mt-1 text-ember-2">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Precio + garantía: nunca inventar un número, solo mostrar si viene configurado */}
      {(PRECIO || GARANTIA_DIAS) && (
        <section className="border-t border-line bg-bg-2">
          <div className="mx-auto max-w-3xl px-6 py-14 text-center">
            {PRECIO && (
              <p className="font-display text-4xl text-ember-2">
                {PRECIO}
                <span className="ml-2 font-sans text-sm normal-case tracking-normal text-ink-dim">pago único</span>
              </p>
            )}
            {GARANTIA_DIAS && (
              <p className="mt-3 text-sm text-ink-dim">
                Garantía de {GARANTIA_DIAS} días: si no te sirve, te devolvemos tu dinero.
              </p>
            )}
            {HOTMART_URL && (
              <div className="mx-auto mt-6 max-w-xs">
                <BotonHotmart href={HOTMART_URL} ubicacion="precio" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ / objeciones */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="font-display text-2xl">Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {PREGUNTAS.map((p) => (
            <details key={p.q} className="group py-4">
              <summary className="cursor-pointer list-none font-semibold marker:content-none">
                <span className="mr-2 text-ember-2 group-open:hidden">+</span>
                <span className="mr-2 hidden text-ember-2 group-open:inline">−</span>
                {p.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{p.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      {HOTMART_URL && (
        <section className="border-t border-line bg-bg-2">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            <h2 className="font-display text-3xl">Empieza el Método Vikingo hoy</h2>
            <div className="mx-auto mt-6 max-w-xs">
              <BotonHotmart href={HOTMART_URL} ubicacion="cta_final" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
