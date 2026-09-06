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
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vk-gold">Reto gratuito</p>
        <h1 className="mt-3 text-4xl font-black leading-tight">
          30 días.
          <br />
          Una palabra al día.
          <br />
          <span className="text-vk-gold">Un método.</span>
        </h1>
        <p className="mt-4 text-vk-muted">
          Cada día una lección corta de nutrición y entrenamiento. Mantén tu racha y desbloquea las 4 piezas del
          Método Vikingo.
        </p>
      </section>

      {msg && MENSAJES[msg] && (
        <p className="rounded-lg border border-vk-gold/40 bg-vk-gold/10 px-4 py-3 text-sm text-vk-gold">
          {MENSAJES[msg]}
        </p>
      )}

      <LandingForm />

      <section className="grid gap-3">
        {[
          ["🔥", "Racha diaria", "Cada día que completas suma. Si fallas, tienes 1 recuperación al mes."],
          ["🧩", "Piezas del Método", "Días 7, 14 y 21 desbloquean una pieza. El día 30, el Método completo."],
          ["📈", "Tu progreso", "Registra peso y cintura cada semana y mira tu gráfica."],
        ].map(([icono, titulo, texto]) => (
          <div key={titulo} className="flex gap-3 rounded-xl border border-vk-border bg-vk-surface p-4">
            <span className="text-2xl">{icono}</span>
            <div>
              <p className="font-semibold">{titulo}</p>
              <p className="text-sm text-vk-muted">{texto}</p>
            </div>
          </div>
        ))}
      </section>

      <p className="text-center text-sm text-vk-muted">
        Mientras tanto: <Link href="/recetas" className="text-vk-gold underline">recetas</Link> ·{" "}
        <Link href="/faq" className="text-vk-gold underline">preguntas frecuentes</Link>
      </p>
    </div>
  );
}
