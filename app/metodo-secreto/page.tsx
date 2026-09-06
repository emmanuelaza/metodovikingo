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
    <div className="space-y-8">
      <header>
        <p className="font-display text-xs text-ember-2">Reto completado</p>
        <h1 className="mt-2 font-display text-3xl">El Método Vikingo</h1>
        <p className="mt-2 text-ink-dim">
          30 días. Racha máxima de {progreso.streak_max}. Estas son las 4 piezas que construiste.
        </p>
      </header>

      <ol className="space-y-6">
        {piezas.map((p) => (
          <li key={p.dia} className="border-t border-line pt-4">
            <p className="font-display text-xs text-ink-dim">
              Pieza {p.numero} · Día {p.dia}
            </p>
            <h2 className="mt-1 font-display text-xl">{p.titulo}</h2>
            <p className="mt-2 leading-relaxed text-ink/90">{p.texto}</p>
          </li>
        ))}
      </ol>

      <CompartirRacha racha={progreso.streak_max} dia={30} />

      {HOTMART_URL && (
        <section className="rounded-xl border border-ember/40 bg-bg-2 p-5">
          <p className="font-display text-xs text-ember-2">Siguiente nivel</p>
          <h2 className="mt-2 font-display text-2xl">El Método Vikingo completo</h2>
          <p className="mt-2 text-ink-dim">
            Plan de alimentación, rutinas de fuerza por nivel y el sistema de ajustes semana a semana. Todo lo que
            viste en el reto, llevado a la práctica durante 12 semanas.
          </p>
          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-lg bg-ember px-4 py-3 text-center font-semibold text-bg hover:bg-ember-deep"
          >
            Quiero el Método completo →
          </a>
        </section>
      )}

      <Link href="/dashboard" className="block text-sm text-ink-dim underline">
        Volver al dashboard
      </Link>
    </div>
  );
}
