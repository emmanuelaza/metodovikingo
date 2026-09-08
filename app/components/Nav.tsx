import Link from "next/link";
import { createClient, SUPABASE_CONFIGURADO } from "@/lib/supabase/server";
import { getPerfil, getFechasCompletado, calcularEstadoCurso } from "@/lib/progreso";

export default async function Nav() {
  let racha = 0;

  if (SUPABASE_CONFIGURADO) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const [perfil, fechas] = await Promise.all([getPerfil(supabase, user), getFechasCompletado(supabase, user)]);
      racha = calcularEstadoCurso(perfil, fechas).racha;
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="font-display text-base tracking-wide sm:text-lg">
          RETO VIKINGO
        </Link>
        {/* En móvil las secciones viven en la barra inferior (NavMovil): aquí
            solo queda la racha, que es el dato que engancha. */}
        <nav className="flex items-center gap-5 text-sm text-ink-dim">
          {racha > 0 && (
            <span className="rounded-full border border-ember/40 px-2.5 py-1 text-ink" title="Tu racha actual">
              🔥 {racha}
            </span>
          )}
          <Link href="/progreso" className="hidden hover:text-ink sm:inline">Progreso</Link>
          <Link href="/recetas" className="hidden hover:text-ink sm:inline">Recetas</Link>
          <Link href="/faq" className="hidden hover:text-ink sm:inline">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
