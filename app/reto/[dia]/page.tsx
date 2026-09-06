import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { requireUsuario, getProgreso, estadoRacha } from "@/lib/progreso";
import { getLeccion } from "@/lib/contenido";
import { DIAS_TOTALES } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import PalabraDelDiaInput from "@/app/components/PalabraDelDiaInput";

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

  const completado = dia < progreso.current_day;
  const esActual = dia === progreso.current_day && !progreso.reto_completado;

  // Día futuro: bloqueado.
  if (!completado && !esActual) redirect("/dashboard?msg=bloqueado");
  // Día de hoy pero ya completó uno hoy: se abre mañana.
  if (esActual && estado.completadoHoy) redirect("/dashboard?msg=manana");

  const leccion = await getLeccion(dia);

  if (!leccion) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vk-gold">Día {dia}</p>
        <h1 className="text-2xl font-black">Lección en preparación</h1>
        <p className="text-vk-muted">Vuelve en un rato: estamos publicando el contenido de hoy.</p>
        <Link href="/dashboard" className="text-vk-gold underline">
          Volver al dashboard
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      <header>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vk-gold">
            Día {dia} de {DIAS_TOTALES}
          </p>
          {completado && (
            <span className="rounded-full bg-vk-green/15 px-2.5 py-1 text-xs font-semibold text-vk-green">
              ✓ Completado
            </span>
          )}
          {leccion.esDiaDePieza && !completado && (
            <span className="rounded-full bg-vk-gold/15 px-2.5 py-1 text-xs font-semibold text-vk-gold">
              🧩 Día de pieza
            </span>
          )}
        </div>
        <h1 className="mt-2 text-3xl font-black leading-tight">{leccion.titulo}</h1>
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
        <div className="rounded-xl border border-vk-green/40 bg-vk-green/10 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-vk-green">Tip de hoy</p>
          <p className="mt-1 font-medium">{leccion.tipAccionable}</p>
        </div>
      )}

      {esActual ? (
        <PalabraDelDiaInput dia={dia} />
      ) : (
        <div className="flex gap-3">
          {dia > 1 && (
            <Link
              href={`/reto/${dia - 1}`}
              className="flex-1 rounded-lg border border-vk-border px-4 py-3 text-center text-sm font-semibold hover:bg-vk-surface"
            >
              ← Día {dia - 1}
            </Link>
          )}
          <Link
            href={dia < progreso.current_day - 1 || progreso.reto_completado ? `/reto/${Math.min(dia + 1, DIAS_TOTALES)}` : "/dashboard"}
            className="flex-1 rounded-lg bg-vk-gold px-4 py-3 text-center text-sm font-bold text-vk-bg hover:bg-vk-gold-dark"
          >
            {dia < progreso.current_day - 1 || (progreso.reto_completado && dia < DIAS_TOTALES)
              ? `Día ${dia + 1} →`
              : "Dashboard →"}
          </Link>
        </div>
      )}

      {leccion.cliffhanger && (
        <p className="border-t border-vk-border pt-4 text-center text-sm italic text-vk-muted">
          {leccion.cliffhanger}
        </p>
      )}
    </article>
  );
}
