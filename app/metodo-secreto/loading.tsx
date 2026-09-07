export default function CargandoMetodoSecreto() {
  return (
    <div>
      <header className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton mt-3 h-10 w-72" />
          <div className="skeleton mt-3 h-4 w-56" />
        </div>
      </header>
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton h-20 w-full" />
        ))}
      </div>
    </div>
  );
}
