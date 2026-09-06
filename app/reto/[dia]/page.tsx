import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { requireUsuario, getProgreso, estadoRacha, completarDiaSiCorresponde } from "@/lib/progreso";
import { getLeccion, getPiezaPorDia } from "@/lib/contenido";
import { DIAS_TOTALES } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import PiezaDesbloqueada from "@/app/components/PiezaDesbloqueada";

export async function generateMetadata({ params }: { params: Promise<{ dia: string }> }) {
  const { dia } = await params;
  return { title: `Día ${dia}` };
}

export default async function DiaPage({ params }: { params: Promise<{ dia: string }> }) {
  const { dia: diaStr } = await params;
  const dia = Number(diaStr);
  if (!Number.isInteger(dia) || dia < 1 || dia > DIAS_TOTALES) notFound();

  const { supabase, user } = await requireUsuario();
  const progreso = await getProgreso(supabase, user);
  const estado = estadoRacha(progreso);

  const yaEstabaCompletado = dia < progreso.current_day;
  const esActual = dia === progreso.current_day && !progreso.reto_completado;

  if (!yaEstabaCompletado && !esActual) redirect("/dashboard?msg=bloqueado");
  if (esActual && estado.completadoHoy) redirect("/dashboard?msg=manana");

  // Visitar la lección del día pendiente la completa: no hace falta ninguna acción extra.
  const resultado = esActual ? await completarDiaSiCorresponde(supabase, user, dia, progreso) : null;
  const exito = resultado && "success" in resultado ? resultado : null;

  const leccion = await getLeccion(dia);
  const pieza = exito?.pieza ? await getPiezaPorDia(dia) : null;

  if (!leccion) {
    return (
      <div className="space-y-4 text-center">
        <p className="font-display text-xs text-ember-2">Día {dia}</p>
        <h1 className="font-display text-2xl">Lección en preparación</h1>
        <p className="text-ink-dim">Vuelve en un rato: estamos publicando el contenido de hoy.</p>
        <Link href="/dashboard" className="text-ember-2 underline">
          Volver al dashboard
        </Link>
      </div>
    );
  }

  const completado = yaEstabaCompletado || Boolean(exito);

  return (
    <article className="space-y-6">
      <header>
        <p className="font-display text-xs text-ember-2">
          Día {dia} de {DIAS_TOTALES}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight">{leccion.titulo}</h1>
      </header>

      <AdSlot position="top" />

      {leccion.imagenUrl && (
        <Image
          src={leccion.imagenUrl}
          alt={leccion.titulo}
          width={1200}
          height={675}
          sizes="(max-width: 640px) 100vw, 512px"
          className="h-auto w-full rounded-xl"
          priority
        />
      )}

      <div className="prose-vk">
        <PortableText value={leccion.contenido} />
      </div>

      <AdSlot position="mid-content" />

      {leccion.tipAccionable && (
        <div className="rounded-xl border border-line bg-bg-2 p-4">
          <p className="font-display text-xs text-ink-dim">Tip de hoy</p>
          <p className="mt-1 font-medium">{leccion.tipAccionable}</p>
        </div>
      )}

      {pieza && <PiezaDesbloqueada pieza={pieza} />}

      <nav className="flex gap-3 border-t border-line pt-5 text-sm">
        {dia > 1 && (
          <Link
            href={`/reto/${dia - 1}`}
            className="flex-1 rounded-lg border border-line px-4 py-3 text-center hover:bg-bg-2"
          >
            ← Día {dia - 1}
          </Link>
        )}
        <Link
          href="/dashboard"
          className="flex-1 rounded-lg border border-line px-4 py-3 text-center hover:bg-bg-2"
        >
          Dashboard
        </Link>
        {dia < DIAS_TOTALES && dia < progreso.current_day - 1 && (
          <Link
            href={`/reto/${dia + 1}`}
            className="flex-1 rounded-lg border border-line px-4 py-3 text-center hover:bg-bg-2"
          >
            Día {dia + 1} →
          </Link>
        )}
      </nav>

      {completado && !leccion.cliffhanger && (
        <p className="text-center text-sm text-ink-dim">✓ Día {dia} completado.</p>
      )}
      {leccion.cliffhanger && (
        <p className="text-center text-sm italic text-ink-dim">{leccion.cliffhanger}</p>
      )}
    </article>
  );
}
