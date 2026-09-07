export const metadata = {
  title: "Privacidad",
  description: "Política de privacidad del Reto Vikingo.",
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
          Al entrar a esta plataforma se crea automáticamente una sesión anónima para guardar tu progreso en el reto
          (qué día vas, tu racha, tus registros de peso y medidas si decides usarlos). No pedimos correo, contraseña
          ni ningún dato de registro visible.
        </p>
        <h2 className="font-display text-lg text-ink">Cookies</h2>
        <p>
          Usamos una cookie técnica para mantener tu sesión anónima activa entre visitas. Sin ella no podríamos
          recordar en qué día del reto vas.
        </p>
        <h2 className="font-display text-lg text-ink">Publicidad de terceros</h2>
        <p>
          Este sitio muestra anuncios de la red Adsterra. Adsterra puede usar sus propias cookies de terceros para
          medir y segmentar publicidad. No controlamos ni vemos los datos que esas cookies recolectan — te
          recomendamos revisar la política de privacidad de Adsterra si quieres el detalle completo.
        </p>
        <h2 className="font-display text-lg text-ink">Notificaciones</h2>
        <p>
          Si aceptas activar los avisos de nuevo contenido, guardamos únicamente la suscripción técnica de tu
          navegador (necesaria para poder enviarte la notificación) — no un correo ni un número de teléfono.
        </p>
        <h2 className="font-display text-lg text-ink">Contacto</h2>
        <p>Si tienes preguntas sobre estos datos, escríbenos por los canales de contacto de Método Vikingo.</p>
      </div>
    </div>
  );
}
