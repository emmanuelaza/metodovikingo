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
    <div className="flex items-baseline gap-2 text-sm text-ink-dim">
      <span className="font-display text-2xl text-ink">
        {racha} {racha === 1 ? "día" : "días"}
      </span>
      <span>{rota ? "· racha en pausa" : "de racha"} · máx. {rachaMax}</span>
    </div>
  );
}
