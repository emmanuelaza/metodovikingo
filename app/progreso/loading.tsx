export default function CargandoProgreso() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <div className="skeleton h-3 w-20" />
      <div className="skeleton h-8 w-40" />
      <div className="skeleton h-40 w-full" />
      <div className="skeleton h-56 w-full" />
    </div>
  );
}
