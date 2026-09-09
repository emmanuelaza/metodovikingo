import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUsuario, getPerfil, getFechasCompletado, calcularEstadoCurso } from "@/lib/progreso";
import { getPiezas } from "@/lib/contenido";
import CompartirRacha from "@/app/components/CompartirRacha";
import BotonHotmart from "@/app/components/BotonHotmart";

export const metadata = { title: "El Método completo" };

const HOTMART_URL = process.env.NEXT_PUBLIC_HOTMART_URL;

export default async function MetodoSecreto() {
  const { supabase, user } = await requireUsuario();
  const [perfil, fechas] = await Promise.all([getPerfil(supabase, user), getFechasCompletado(supabase, user)]);
  const estado = calcularEstadoCurso(perfil, fechas);
  if (estado.diaMaximo < 30) redirect("/?msg=secreto");

  // Sin esta variable el CTA de venta desaparece por completo y sin aviso
  // visual — este log es la única señal de que algo falta, revisar en los
  // logs de Vercel si el botón "Quiero el Método completo" no aparece.
  if (!HOTMART_URL) console.warn("NEXT_PUBLIC_HOTMART_URL no está configurada: el CTA de venta no se muestra.");

  const piezas = await getPiezas();

  return (
    <div>
      <header className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link href="/" className="text-sm text-ink-dim hover:text-ink">
            ← Temario
          </Link>
          <p className="mt-4 font-display text-xs text-ember-2">Síntesis final</p>
          <h1 className="mt-2 font-display text-4xl">El Método Vikingo</h1>
          <p className="mt-2 text-ink-dim">
            30 días. Racha máxima de {estado.rachaMax}. Estas son las 4 piezas que construiste.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
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

        <CompartirRacha racha={estado.rachaMax} dia={30} />

        {HOTMART_URL && (
          <section className="rounded-xl border border-ember/40 bg-bg-2 p-5">
            <p className="font-display text-xs text-ember-2">Siguiente nivel</p>
            <h2 className="mt-2 font-display text-2xl">El Método Vikingo completo</h2>
            <p className="mt-2 text-ink-dim">
              Plan de alimentación, rutinas de fuerza por nivel y el sistema de ajustes semana a semana. Todo lo que
              viste en el reto, llevado a la práctica durante 12 semanas.
            </p>
            <BotonHotmart href={HOTMART_URL} rachaMax={estado.rachaMax} />
          </section>
        )}

        <Link href="/" className="block text-sm text-ink-dim underline">
          Volver al temario
        </Link>
      </div>
    </div>
  );
}
