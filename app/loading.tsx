export default function CargandoTemario() {
  return (
    <div>
      <section className="border-b border-line bg-bg-2">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="skeleton h-3 w-32" />
          <div className="skeleton mt-3 h-9 w-56" />
          <div className="skeleton mt-6 h-4 w-64" />
          <div className="skeleton mt-4 h-2 w-full max-w-sm" />
          <div className="skeleton mt-7 h-11 w-48" />
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 py-10">
        {[1, 2].map((i) => (
          <div key={i} className="mb-10">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton mt-2 h-5 w-48" />
            <div className="mt-3 divide-y divide-line border-y border-line">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center justify-between px-1 py-4">
                  <div className="skeleton h-4 w-56" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
