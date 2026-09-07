/**
 * A diferencia de layout.tsx, este archivo se vuelve a montar en cada
 * navegación — por eso la animación CSS se repite cada vez que cambias de
 * página, en vez de correr solo una vez al cargar el sitio.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="anim-rise">{children}</div>;
}
