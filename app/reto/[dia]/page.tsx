import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUsuario, getPerfil, getFechasCompletado, calcularEstadoCurso } from "@/lib/progreso";
import { getLeccion, getPiezaPorDia, getFases } from "@/lib/contenido";
import { DIAS_TOTALES, DIAS_CON_PIEZA } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import PiezaDesbloqueada from "@/app/components/PiezaDesbloqueada";
import MarcarCompletado from "@/app/components/MarcarCompletado";
import TestimoniosCarrusel from "@/app/components/TestimoniosCarrusel";
import QuizFase from "@/app/components/QuizFase";
import { quizDelDia } from "@/content/quizzes-seed";

/** Días de la Fase 3/4 donde se integra el carrusel de testimonios. */
const DIAS_CON_TESTIMONIO = [19, 26];

export async function generateMetadata({ params }: { params: Promise<{ dia: string }> }) {
  const { dia } = await params;
  return { title: `Día ${dia}` };
}

export default async function DiaPage({ params }: { params: Promise<{ dia: string }> }) {
  const { dia: diaStr } = await params;
  const dia = Number(diaStr);
  if (!Number.isInteger(dia) || dia < 1 || dia > DIAS_TOTALES) notFound();

  const { supabase, user } = await requireUsuario();
  const [perfil, fechas, leccion, fases] = await Promise.all([
    getPerfil(supabase, user),
    getFechasCompletado(supabase, user),
    getLeccion(dia),
    getFases(),
  ]);
  const estado = calcularEstadoCurso(perfil, fechas);

  if (dia > estado.diaMaximo) redirect("/?msg=bloqueado");

  const pieza = (DIAS_CON_PIEZA as readonly number[]).includes(dia) ? await getPiezaPorDia(dia) : null;
  const completado = estado.diasCompletados.has(dia);
  const fase = leccion ? fases.find((f) => f.numero === leccion.fase) : undefined;
  const quiz = quizDelDia(dia);

  return (
    <article>
      <header className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Link href="/" className="text-sm text-ink-dim hover:text-ink">
            ← Temario
          </Link>
          <p className="mt-4 font-display text-xs text-ember-2">
            {fase ? `Fase ${fase.numero} · ${fase.nombre} · ` : ""}Día {dia} de {DIAS_TOTALES}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
            {leccion?.titulo ?? "Lección en preparación"}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        {!leccion ? (
          <p className="text-ink-dim">Vuelve en un rato: estamos publicando el contenido de hoy.</p>
        ) : (
          <>
            <p className="leading-relaxed">{leccion.introduccion}</p>
            <p className="leading-relaxed text-ink/90">{leccion.concepto}</p>

            <AdSlot slot="nativeBannerLeccion" />

            <div className="rounded-xl border border-line bg-bg-2 p-5">
              <p className="font-display text-xs text-ink-dim">{leccion.rutinaTitulo}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {leccion.rutinaItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {leccion.tipAccionable && (
              <div className="rounded-xl border border-ember/40 bg-bg-2 p-5">
                <p className="font-display text-xs text-ember-2">Tip accionable de hoy</p>
                <p className="mt-2 leading-relaxed">{leccion.tipAccionable}</p>
              </div>
            )}

            {quiz && <QuizFase preguntas={quiz.preguntas} />}

            {pieza && <PiezaDesbloqueada pieza={pieza} />}

            {DIAS_CON_TESTIMONIO.includes(dia) && (
              <div>
                <p className="mb-4 font-display text-xs text-ink-dim">Lo que dice quien ya lo hizo</p>
                <TestimoniosCarrusel />
              </div>
            )}

            <div className="border-t border-line pt-6 text-sm text-ink-dim">
              <p>Comunidad de Discord — Próximamente</p>
              <p>Guía descargable en PDF — Próximamente</p>
            </div>

            <div className="border-t border-line pt-6">
              <MarcarCompletado dia={dia} completado={completado} />
            </div>

            {leccion.previewSiguiente && <p className="text-sm italic text-ink-dim">{leccion.previewSiguiente}</p>}
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
      </div>
    </article>
  );
}
