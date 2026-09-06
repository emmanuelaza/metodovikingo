import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUsuario, getProgreso } from "@/lib/progreso";
import { getPiezas } from "@/lib/contenido";
import CompartirRacha from "@/app/components/CompartirRacha";

export const metadata = { title: "El Método completo" };

const HOTMART_URL = process.env.NEXT_PUBLIC_HOTMART_URL;

export default async function MetodoSecreto() {
  const { supabase, user } = await requireUsuario();
  const progreso = await getProgreso(supabase, user);
  if (!progreso.reto_completado) redirect("/dashboard?msg=secreto");

  const piezas = await getPiezas();

  return (
    <div className="space-y-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vk-gold">Reto completado</p>
        <h1 className="mt-2 text-3xl font-black">El Método Vikingo</h1>
        <p className="mt-2 text-vk-muted">
          30 días. Racha máxima de {progreso.streak_max}. Estas son las 4 piezas que construiste.
        </p>
      </header>

      <ol className="space-y-4">
        {piezas.map((p, i) => (
          <li
            key={p.dia}
            className="anim-rise rounded-2xl border border-vk-gold/50 bg-gradient-to-b from-vk-gold/10 to-transparent p-5"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-vk-gold">
              Pieza {p.numero} · Día {p.dia}
            </p>
            <h2 className="mt-1 text-xl font-black">{p.titulo}</h2>
            <p className="mt-2 leading-relaxed text-vk-text/90">{p.texto}</p>
          </li>
        ))}
      </ol>

      <CompartirRacha racha={progreso.streak_max} dia={30} />

      {HOTMART_URL && (
        <section className="rounded-2xl border-2 border-vk-gold bg-vk-surface p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-vk-gold">Siguiente nivel</p>
          <h2 className="mt-2 text-2xl font-black">El Método Vikingo completo</h2>
          <p className="mt-2 text-vk-muted">
            Plan de alimentación, rutinas de fuerza por nivel y el sistema de ajustes semana a semana. Todo lo que
            viste en el reto, llevado a la práctica durante 12 semanas.
          </p>
          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-lg bg-vk-gold px-4 py-3 font-bold text-vk-bg hover:bg-vk-gold-dark"
          >
            Quiero el Método completo →
          </a>
        </section>
      )}

      <Link href="/dashboard" className="block text-center text-sm text-vk-muted underline">
        Volver al dashboard
      </Link>
    </div>
  );
}
