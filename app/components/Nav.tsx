import Link from "next/link";
import { createClient, SUPABASE_CONFIGURADO } from "@/lib/supabase/server";
import { cerrarSesion } from "@/app/auth/actions";

export default async function Nav() {
  let sesion = false;
  if (SUPABASE_CONFIGURADO) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    sesion = Boolean(user);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-vk-border bg-vk-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href={sesion ? "/dashboard" : "/"} className="font-bold tracking-wider">
          <span className="text-vk-gold">⚔</span> RETO VIKINGO
        </Link>
        <nav className="flex items-center gap-4 text-sm text-vk-muted">
          {sesion ? (
            <>
              <Link href="/dashboard" className="hover:text-vk-text">Reto</Link>
              <Link href="/progreso" className="hover:text-vk-text">Progreso</Link>
              <form action={cerrarSesion}>
                <button type="submit" className="hover:text-vk-text">Salir</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/recetas" className="hover:text-vk-text">Recetas</Link>
              <Link href="/faq" className="hover:text-vk-text">FAQ</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
