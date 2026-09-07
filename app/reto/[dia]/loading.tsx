export default function CargandoLeccion() {
  return (
    <article>
      <header className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton mt-4 h-3 w-40" />
          <div className="skeleton mt-2 h-9 w-3/4" />
        </div>
      </header>
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-32 w-full" />
        <div className="skeleton h-20 w-full" />
        <div className="skeleton h-11 w-48" />
      </div>
    </article>
  );
}
