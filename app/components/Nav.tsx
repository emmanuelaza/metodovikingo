import Link from "next/link";
import { createClient, SUPABASE_CONFIGURADO } from "@/lib/supabase/server";
import { cerrarSesion } from "@/app/auth/actions";
import { estadoRacha } from "@/lib/progreso";
import type { UserProgress } from "@/lib/types";

export default async function Nav() {
  let sesion = false;
  let racha = 0;

  if (SUPABASE_CONFIGURADO) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    sesion = Boolean(user);

    if (user) {
      const { data } = await supabase.from("user_progress").select("*").eq("user_id", user.id).maybeSingle();
      if (data) racha = estadoRacha(data as UserProgress).rachaVisible;
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href={sesion ? "/dashboard" : "/"} className="font-display text-lg tracking-wide">
          RETO VIKINGO
        </Link>
        <nav className="flex items-center gap-4 text-sm text-ink-dim">
          {sesion ? (
            <>
              {racha > 0 && (
                <span className="text-ink" title="Tu racha actual">
                  🔥 {racha}
                </span>
              )}
              <Link href="/dashboard" className="hover:text-ink">Reto</Link>
              <Link href="/progreso" className="hover:text-ink">Progreso</Link>
              <form action={cerrarSesion}>
                <button type="submit" className="hover:text-ink">Salir</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/recetas" className="hover:text-ink">Recetas</Link>
              <Link href="/faq" className="hover:text-ink">FAQ</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
