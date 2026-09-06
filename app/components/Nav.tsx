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
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-display text-lg tracking-wide">
          RETO VIKINGO
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink-dim">
          {racha > 0 && (
            <span className="text-ink" title="Tu racha actual">
              🔥 {racha}
            </span>
          )}
          <Link href="/progreso" className="hover:text-ink">Progreso</Link>
          <Link href="/recetas" className="hover:text-ink">Recetas</Link>
          <Link href="/faq" className="hover:text-ink">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
