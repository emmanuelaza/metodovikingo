import { marcarCompletado } from "@/app/reto/[dia]/actions";

/** Checkbox simple de seguimiento personal — no desbloquea ni bloquea nada. */
export default function MarcarCompletado({ dia, completado }: { dia: number; completado: boolean }) {
  return (
    <form action={marcarCompletado}>
      <input type="hidden" name="dia" value={dia} />
      <input type="hidden" name="accion" value={completado ? "desmarcar" : "marcar"} />
      <button
        type="submit"
        className={`flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-3.5 font-semibold transition sm:w-auto ${
          completado
            ? "border-ember bg-ember/10 text-ember-2"
            : "border-line text-ink-dim hover:border-ember/60 hover:text-ink"
        }`}
      >
        <span aria-hidden>{completado ? "☑" : "☐"}</span>
        {completado ? "Completado" : "Marcar como completado"}
      </button>
    </form>
  );
}
