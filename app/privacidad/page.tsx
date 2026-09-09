export const metadata = {
  title: "Privacidad",
  description: "Política de privacidad de Método Vikingo.",
};

export default function Privacidad() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <header>
        <p className="font-display text-xs text-ember-2">Legal</p>
        <h1 className="mt-2 font-display text-3xl">Política de privacidad</h1>
      </header>

      <div className="space-y-4 text-sm leading-relaxed text-ink-dim">
        <p>
          Esta página no pide registro ni guarda ningún dato personal tuyo. No hay cuentas, ni formularios, ni
          cookies de sesión.
        </p>
        <h2 className="font-display text-lg text-ink">Analítica</h2>
        <p>
          Usamos Vercel Analytics para medir visitas de forma agregada y anónima (qué tanto tráfico llega, qué
          secciones se visitan). No identifica a personas individuales.
        </p>
        <h2 className="font-display text-lg text-ink">Compra</h2>
        <p>
          El botón de compra te lleva a Hotmart, una plataforma externa que procesa el pago. Nosotros no vemos ni
          almacenamos tus datos de pago — revisa la política de privacidad de Hotmart para el detalle completo de esa
          parte del proceso.
        </p>
        <h2 className="font-display text-lg text-ink">Contacto</h2>
        <p>Si tienes preguntas sobre estos datos, escríbenos por los canales de contacto de Método Vikingo.</p>
      </div>
    </div>
  );
}
