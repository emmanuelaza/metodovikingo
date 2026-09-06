export default function RachaBadge({
  racha,
  rachaMax,
  rota = false,
}: {
  racha: number;
  rachaMax: number;
  rota?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-5 ${
        rota ? "border-vk-red/40 bg-vk-red/10" : "border-vk-gold/40 bg-vk-gold/10"
      }`}
    >
      <div className={`text-5xl ${racha > 0 ? "anim-pop" : "opacity-40 grayscale"}`} aria-hidden>
        🔥
      </div>
      <div>
        <p className="text-4xl font-black leading-none">
          {racha} <span className="text-base font-semibold text-vk-muted">{racha === 1 ? "día" : "días"}</span>
        </p>
        <p className="mt-1 text-sm text-vk-muted">
          {rota ? "Racha en pausa" : "de racha"} · Máx: <span className="font-semibold text-vk-text">{rachaMax}</span>
        </p>
      </div>
    </div>
  );
}
