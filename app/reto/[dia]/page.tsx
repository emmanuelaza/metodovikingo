import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { requireUsuario, getPerfil, getFechasCompletado, calcularEstadoCurso } from "@/lib/progreso";
import { getLeccion, getPiezaPorDia } from "@/lib/contenido";
import { DIAS_TOTALES, DIAS_CON_PIEZA } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import PiezaDesbloqueada from "@/app/components/PiezaDesbloqueada";
import MarcarCompletado from "@/app/components/MarcarCompletado";

export async function generateMetadata({ params }: { params: Promise<{ dia: string }> }) {
  const { dia } = await params;
  return { title: `Día ${dia}` };
}

export default async function DiaPage({ params }: { params: Promise<{ dia: string }> }) {
  const { dia: diaStr } = await params;
  const dia = Number(diaStr);
  if (!Number.isInteger(dia) || dia < 1 || dia > DIAS_TOTALES) notFound();

  const { supabase, user } = await requireUsuario();
  const [perfil, fechas] = await Promise.all([getPerfil(supabase, user), getFechasCompletado(supabase, user)]);
  const estado = calcularEstadoCurso(perfil, fechas);

  if (dia > estado.diaMaximo) redirect("/?msg=bloqueado");

  const leccion = await getLeccion(dia);
  const pieza = (DIAS_CON_PIEZA as readonly number[]).includes(dia) ? await getPiezaPorDia(dia) : null;
  const completado = estado.diasCompletados.has(dia);

  return (
    <article>
      <header className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Link href="/" className="text-sm text-ink-dim hover:text-ink">
            ← Temario
          </Link>
          <p className="mt-4 font-display text-xs text-ember-2">
            Día {dia} de {DIAS_TOTALES}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
            {leccion?.titulo ?? "Lección en preparación"}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        <AdSlot position="top" />

        {!leccion ? (
          <p className="text-ink-dim">Vuelve en un rato: estamos publicando el contenido de hoy.</p>
        ) : (
          <>
            {leccion.imagenUrl && (
              <Image
                src={leccion.imagenUrl}
                alt={leccion.titulo}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full rounded-xl"
                priority
              />
            )}

            <div className="prose-vk">
              <PortableText value={leccion.contenido} />
            </div>

            {leccion.tipAccionable && (
              <div className="rounded-xl border border-ember/40 bg-bg-2 p-5">
                <p className="font-display text-xs text-ember-2">Tip accionable de hoy</p>
                <p className="mt-2 leading-relaxed">{leccion.tipAccionable}</p>
              </div>
            )}

            {pieza && <PiezaDesbloqueada pieza={pieza} />}

            <AdSlot position="mid-content" />

            <div className="border-t border-line pt-6 text-sm text-ink-dim">
              <p>Comunidad de Discord — Próximamente</p>
              <p>Guía descargable en PDF — Próximamente</p>
            </div>

            <div className="border-t border-line pt-6">
              <MarcarCompletado dia={dia} completado={completado} />
            </div>

            {leccion.cliffhanger && <p className="text-sm italic text-ink-dim">{leccion.cliffhanger}</p>}
          </>
        )}

        <nav className="flex gap-3 border-t border-line pt-6 text-sm">
          {dia > 1 && (
            <Link href={`/reto/${dia - 1}`} className="flex-1 rounded-lg border border-line px-4 py-3 text-center hover:bg-bg-2">
              ← Día {dia - 1}
            </Link>
          )}
          {dia < estado.diaMaximo && (
            <Link href={`/reto/${dia + 1}`} className="flex-1 rounded-lg border border-line px-4 py-3 text-center hover:bg-bg-2">
              Día {dia + 1} →
            </Link>
          )}
        </nav>

        <AdSlot position="bottom" />
      </div>
    </article>
  );
}
