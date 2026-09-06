import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient, SUPABASE_CONFIGURADO } from "@/lib/supabase/server";
import LandingForm from "@/app/components/LandingForm";

const MENSAJES: Record<string, string> = {
  login: "Inicia sesión para continuar con tu reto.",
  link_invalido: "Ese link ya venció. Pide uno nuevo o usa el código de 6 dígitos del correo.",
};

export default async function Landing({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;

  if (SUPABASE_CONFIGURADO) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/dashboard");
  }

  return (
    <div className="space-y-8">
      <section className="pt-6 text-center">
        <p className="font-display text-xs text-ember-2">Reto gratuito</p>
        <h1 className="mt-3 text-4xl leading-tight">
          30 días.
          <br />
          <span className="text-ember">Un método.</span>
        </h1>
        <p className="mt-4 text-ink-dim">
          Una lección nueva cada día. Entras, la lees, y tu racha sigue. Al final, el Método Vikingo completo.
        </p>
      </section>

      {msg && MENSAJES[msg] && (
        <p className="rounded-lg border border-ember/40 bg-bg-2 px-4 py-3 text-sm text-ember-2">{MENSAJES[msg]}</p>
      )}

      <LandingForm />

      <section className="space-y-3 border-t border-line pt-6">
        {[
          ["Racha diaria", "Cada día que entras suma. Si fallas uno, tienes 1 recuperación al mes."],
          ["Piezas del Método", "Los días 7, 14 y 21 suman una pieza. El día 30, el Método completo."],
          ["Tu progreso", "Registra peso y cintura cada semana y mira tu evolución en una gráfica."],
        ].map(([titulo, texto]) => (
          <div key={titulo}>
            <p className="font-semibold text-ink">{titulo}</p>
            <p className="text-sm text-ink-dim">{texto}</p>
          </div>
        ))}
      </section>

      <p className="text-center text-sm text-ink-dim">
        Mientras tanto: <Link href="/recetas" className="text-ember-2 underline">recetas</Link> ·{" "}
        <Link href="/faq" className="text-ember-2 underline">preguntas frecuentes</Link>
      </p>
    </div>
  );
}
