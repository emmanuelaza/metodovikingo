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
      <div className="mb-1.5 flex justify-between text-xs text-vk-muted">
        <span>
          {completados} / {total} días
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-vk-surface-2"
        role="progressbar"
        aria-valuenow={completados}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-vk-gold-dark to-vk-gold transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
