export default function ProgressBar({
  completados,
  total,
}: {
  completados: number;
  total: number;
}) {
  const pct = Math.max(0, Math.min(100, Math.round((completados / total) * 100)));
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs text-ink-dim">
        <span>
          {completados} / {total} días
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-bg-3"
        role="progressbar"
        aria-valuenow={completados}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div className="h-full rounded-full bg-ember transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
