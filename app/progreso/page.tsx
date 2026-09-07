import { requireUsuario } from "@/lib/progreso";
import { fechaCorta } from "@/lib/fecha";
import type { BodyLog } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import GraficaProgreso, { type PuntoProgreso } from "./GraficaProgreso";
import { registrarMedida, eliminarMedida } from "./actions";

export const metadata = { title: "Mi progreso" };

const MENSAJES: Record<string, { texto: string; ok: boolean }> = {
  guardado: { texto: "Registro guardado.", ok: true },
  valor_invalido: { texto: "Revisa los valores: peso entre 20 y 400 kg, cintura entre 30 y 300 cm.", ok: false },
  vacio: { texto: "Escribe al menos el peso o la cintura.", ok: false },
  error: { texto: "No se pudo guardar. Intenta de nuevo.", ok: false },
};

const inputCls = "w-full rounded-lg border border-line bg-bg px-4 py-3 text-base outline-none focus:border-ember";

export default async function Progreso({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const { supabase, user } = await requireUsuario();

  const { data } = await supabase
    .from("body_progress_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("logged_at", { ascending: true })
    .order("id", { ascending: true });

  const logs = (data ?? []) as BodyLog[];
  const puntos: PuntoProgreso[] = logs.map((l) => ({
    fecha: l.logged_at,
    peso: l.peso_kg === null ? null : Number(l.peso_kg),
    cintura: l.medida_cintura_cm === null ? null : Number(l.medida_cintura_cm),
  }));
  const aviso = msg ? MENSAJES[msg] : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <header>
        <p className="font-display text-xs text-ember-2">Medición</p>
        <h1 className="mt-2 font-display text-2xl">Mi progreso</h1>
        <p className="mt-1 text-sm text-ink-dim">
          Una vez por semana, mismo día y misma hora (ideal: en ayunas). No te peses a diario.
        </p>
      </header>

      {aviso && (
        <p className={`rounded-lg border px-4 py-3 text-sm ${aviso.ok ? "border-ok/40 text-ok" : "border-err/40 text-err"}`}>
          {aviso.texto}
        </p>
      )}

      <form action={registrarMedida} className="space-y-3 border-t border-line pt-5">
        <p className="font-semibold">Registrar hoy</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="mb-1 block text-ink-dim">Peso (kg)</span>
            <input name="peso_kg" type="number" inputMode="decimal" step="0.1" min={20} max={400} className={inputCls} placeholder="78.5" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-ink-dim">Cintura (cm)</span>
            <input name="medida_cintura_cm" type="number" inputMode="decimal" step="0.1" min={30} max={300} className={inputCls} placeholder="92" />
          </label>
        </div>
        <input name="nota" maxLength={200} className={inputCls} placeholder="Nota (opcional): cómo te sientes, qué cambiaste…" />
        <button type="submit" className="w-full rounded-lg bg-ember px-4 py-3 font-semibold text-bg hover:bg-ember-deep">
          Guardar
        </button>
      </form>

      <AdSlot slot="banner300x250Dashboard" className="mx-auto" />

      {logs.length === 0 ? (
        <p className="border-t border-line pt-6 text-sm text-ink-dim">
          Aún no tienes registros. Tu primer dato es el punto de partida de la gráfica.
        </p>
      ) : (
        <>
          <GraficaProgreso datos={puntos} />

          <section className="border-t border-line pt-6">
            <h2 className="font-display text-xs text-ink-dim">Historial</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-ink-dim">
                  <tr>
                    <th className="py-2">Fecha</th>
                    <th className="py-2 text-right">Peso</th>
                    <th className="py-2 text-right">Cintura</th>
                    <th className="py-2">Nota</th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody>
                  {[...logs].reverse().map((l) => (
                    <tr key={l.id} className="border-t border-line">
                      <td className="whitespace-nowrap py-2">{fechaCorta(l.logged_at)}</td>
                      <td className="py-2 text-right">{l.peso_kg ?? "—"}</td>
                      <td className="py-2 text-right">{l.medida_cintura_cm ?? "—"}</td>
                      <td className="max-w-[10rem] truncate py-2 text-ink-dim">{l.nota ?? ""}</td>
                      <td className="py-2 text-right">
                        <form action={eliminarMedida}>
                          <input type="hidden" name="id" value={l.id} />
                          <button type="submit" className="text-ink-dim hover:text-err" aria-label="Eliminar registro">
                            ✕
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
