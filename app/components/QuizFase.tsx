"use client";

import { useState } from "react";
import type { PreguntaQuiz } from "@/content/quizzes-seed";

/**
 * Repaso de autoevaluación al cierre de fase. Puramente informativo — no
 * bloquea nada ni se guarda en la base de datos, igual que "marcar
 * completado": es para que el usuario confirme que el concepto le quedó
 * claro antes de recibir la Runa, no un gate.
 */
export default function QuizFase({ preguntas }: { preguntas: PreguntaQuiz[] }) {
  const [respuestas, setRespuestas] = useState<(number | null)[]>(() => preguntas.map(() => null));
  const [revisado, setRevisado] = useState(false);

  const todasRespondidas = respuestas.every((r) => r !== null);
  const aciertos = respuestas.filter((r, i) => r === preguntas[i].correcta).length;

  return (
    <div className="rounded-xl border border-line bg-bg-2 p-5">
      <p className="font-display text-xs text-ember-2">Repaso rápido</p>
      <h3 className="mt-1 font-display text-lg">¿Te quedó claro?</h3>

      <div className="mt-4 space-y-5">
        {preguntas.map((p, i) => (
          <div key={p.pregunta}>
            <p className="text-sm font-semibold">{p.pregunta}</p>
            <div className="mt-2 space-y-1.5">
              {p.opciones.map((opcion, j) => {
                const seleccionada = respuestas[i] === j;
                const esCorrecta = j === p.correcta;

                let estilo = "border-line";
                if (revisado && esCorrecta) estilo = "border-ok text-ok";
                else if (revisado && seleccionada) estilo = "border-err text-err";
                else if (seleccionada) estilo = "border-ember";

                return (
                  <button
                    key={opcion}
                    type="button"
                    disabled={revisado}
                    onClick={() => setRespuestas((actual) => actual.map((r, idx) => (idx === i ? j : r)))}
                    className={`block w-full rounded-lg border px-3 py-2 text-left text-sm ${estilo} disabled:cursor-default`}
                  >
                    {opcion}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!revisado ? (
        <button
          type="button"
          disabled={!todasRespondidas}
          onClick={() => setRevisado(true)}
          className="mt-5 rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-bg hover:bg-ember-deep disabled:opacity-40"
        >
          Comprobar respuestas
        </button>
      ) : (
        <p className="mt-5 text-sm text-ink-dim">
          Acertaste {aciertos} de {preguntas.length}.{" "}
          {aciertos === preguntas.length ? "Perfecto, quedó claro." : "Vale la pena releer lo que falló arriba."}
        </p>
      )}
    </div>
  );
}
