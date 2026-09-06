"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { completarDia, type ResultadoAccion } from "@/app/reto/[dia]/actions";
import PiezaDesbloqueada from "@/app/components/PiezaDesbloqueada";

export default function PalabraDelDiaInput({ dia }: { dia: number }) {
  const [palabra, setPalabra] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Extract<ResultadoAccion, { ok: true }> | null>(null);
  const [pending, startTransition] = useTransition();

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const r = await completarDia(dia, palabra);
      if (r.ok) setResultado(r);
      else setError(r.mensaje);
    });
  }

  if (resultado) {
    return (
      <div className="space-y-4">
        <div className="anim-pop rounded-2xl border border-vk-green/50 bg-vk-green/10 p-5 text-center">
          <p className="text-4xl" aria-hidden>
            ✅
          </p>
          <p className="mt-2 text-xl font-black">¡Día {dia} completado!</p>
          <p className="mt-1 text-vk-muted">
            🔥 Racha: <span className="font-bold text-vk-text">{resultado.nuevaRacha}</span>{" "}
            {resultado.nuevaRacha === 1 ? "día" : "días"}
          </p>
        </div>

        {resultado.pieza && <PiezaDesbloqueada pieza={resultado.pieza} final={resultado.retoCompletado} />}

        {resultado.retoCompletado ? (
          <Link
            href="/metodo-secreto"
            className="block w-full rounded-lg bg-vk-gold px-4 py-3 text-center font-bold text-vk-bg hover:bg-vk-gold-dark"
          >
            Ver el Método completo →
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="block w-full rounded-lg bg-vk-gold px-4 py-3 text-center font-bold text-vk-bg hover:bg-vk-gold-dark"
          >
            Volver al dashboard
          </Link>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="rounded-2xl border border-vk-gold/40 bg-vk-surface p-5">
      <label htmlFor="palabra" className="block font-bold">
        Escribe la palabra del día para completar
      </label>
      <p className="mt-1 text-sm text-vk-muted">Está dentro de la lección de hoy. Sin tildes ni mayúsculas, da igual.</p>
      <input
        id="palabra"
        value={palabra}
        onChange={(e) => setPalabra(e.target.value)}
        autoComplete="off"
        autoCapitalize="characters"
        placeholder="PALABRA"
        className={`mt-3 w-full rounded-lg border bg-vk-bg px-4 py-3 text-center text-xl font-bold uppercase tracking-widest outline-none focus:border-vk-gold ${
          error ? "anim-shake border-vk-red" : "border-vk-border"
        }`}
        required
      />
      {error && <p className="mt-2 text-sm text-vk-red">{error}</p>}
      <button
        type="submit"
        disabled={pending || palabra.trim().length === 0}
        className="anim-glow mt-3 w-full rounded-lg bg-vk-gold px-4 py-3 font-bold text-vk-bg transition hover:bg-vk-gold-dark disabled:animate-none disabled:opacity-60"
      >
        {pending ? "Verificando…" : "Completar día"}
      </button>
    </form>
  );
}
