import { requireUsuario } from "@/lib/progreso";
import { fechaCorta } from "@/lib/fecha";
import type { BodyLog } from "@/lib/types";
import AdSlot from "@/app/components/AdSlot";
import GraficaProgreso, { type PuntoProgreso } from "./GraficaProgreso";
import { registrarMedida, eliminarMedida } from "./actions";

export const metadata = { title: "Mi progreso" };

const MENSAJES: Record<string, { texto: string; ok: boolean }> = {
  guardado: { texto: "✓ Registro guardado.", ok: true },
  valor_invalido: { texto: "Revisa los valores: peso entre 20 y 400 kg, cintura entre 30 y 300 cm.", ok: false },
  vacio: { texto: "Escribe al menos el peso o la cintura.", ok: false },
  error: { texto: "No se pudo guardar. Intenta de nuevo.", ok: false },
};

const inputCls =
  "w-full rounded-lg border border-vk-border bg-vk-bg px-4 py-3 text-base outline-none focus:border-vk-gold";

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
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vk-gold">Medición</p>
        <h1 className="mt-2 text-2xl font-black">Mi progreso</h1>
        <p className="mt-1 text-sm text-vk-muted">
          Una vez por semana, mismo día y misma hora (ideal: en ayunas). No te peses a diario.
        </p>
      </header>

      {aviso && (
        <p
          className={`rounded-lg border px-4 py-3 text-sm ${
            aviso.ok ? "border-vk-green/40 bg-vk-green/10 text-vk-green" : "border-vk-red/40 bg-vk-red/10 text-vk-red"
          }`}
        >
          {aviso.texto}
        </p>
      )}

      <form action={registrarMedida} className="space-y-3 rounded-2xl border border-vk-border bg-vk-surface p-5">
        <p className="font-bold">Registrar hoy</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="mb-1 block text-vk-muted">Peso (kg)</span>
            <input name="peso_kg" type="number" inputMode="decimal" step="0.1" min={20} max={400} className={inputCls} placeholder="78.5" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-vk-muted">Cintura (cm)</span>
            <input name="medida_cintura_cm" type="number" inputMode="decimal" step="0.1" min={30} max={300} className={inputCls} placeholder="92" />
          </label>
        </div>
        <input name="nota" maxLength={200} className={inputCls} placeholder="Nota (opcional): cómo te sientes, qué cambiaste…" />
        <button type="submit" className="w-full rounded-lg bg-vk-gold px-4 py-3 font-bold text-vk-bg hover:bg-vk-gold-dark">
          Guardar
        </button>
      </form>

      <AdSlot position="top" />

      {logs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-vk-border p-6 text-center text-sm text-vk-muted">
          Aún no tienes registros. Tu primer dato es el punto de partida de la gráfica.
        </p>
      ) : (
        <>
          <GraficaProgreso datos={puntos} />

          <section>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-vk-muted">Historial</h2>
            <div className="overflow-x-auto rounded-xl border border-vk-border">
              <table className="w-full text-sm">
                <thead className="bg-vk-surface text-left text-xs uppercase text-vk-muted">
                  <tr>
                    <th className="px-3 py-2">Fecha</th>
                    <th className="px-3 py-2 text-right">Peso</th>
                    <th className="px-3 py-2 text-right">Cintura</th>
                    <th className="px-3 py-2">Nota</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {[...logs].reverse().map((l) => (
                    <tr key={l.id} className="border-t border-vk-border">
                      <td className="whitespace-nowrap px-3 py-2">{fechaCorta(l.logged_at)}</td>
                      <td className="px-3 py-2 text-right">{l.peso_kg ?? "—"}</td>
                      <td className="px-3 py-2 text-right">{l.medida_cintura_cm ?? "—"}</td>
                      <td className="max-w-[10rem] truncate px-3 py-2 text-vk-muted">{l.nota ?? ""}</td>
                      <td className="px-2 py-2 text-right">
                        <form action={eliminarMedida}>
                          <input type="hidden" name="id" value={l.id} />
                          <button type="submit" className="text-vk-muted hover:text-vk-red" aria-label="Eliminar registro">
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

      <AdSlot position="bottom" />
    </div>
  );
}
