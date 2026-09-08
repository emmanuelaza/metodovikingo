"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ICONO_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

const ITEMS = [
  {
    href: "/",
    etiqueta: "Reto",
    // Activo también dentro de una lección o del Método: son parte del mismo flujo.
    activo: (ruta: string) => ruta === "/" || ruta.startsWith("/reto") || ruta.startsWith("/metodo-secreto"),
    icono: (
      <svg {...ICONO_PROPS}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
      </svg>
    ),
  },
  {
    href: "/progreso",
    etiqueta: "Progreso",
    activo: (ruta: string) => ruta.startsWith("/progreso"),
    icono: (
      <svg {...ICONO_PROPS}>
        <path d="M4 20V10M10 20V5M16 20v-7M22 20H2" />
      </svg>
    ),
  },
  {
    href: "/recetas",
    etiqueta: "Recetas",
    activo: (ruta: string) => ruta.startsWith("/recetas"),
    icono: (
      <svg {...ICONO_PROPS}>
        <path d="M4 4v7a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V4M7 14v6" />
        <path d="M17 4c-1.5 1.5-2 3-2 5s.5 2.5 2 2.5V20" />
      </svg>
    ),
  },
  {
    href: "/faq",
    etiqueta: "FAQ",
    activo: (ruta: string) => ruta.startsWith("/faq"),
    icono: (
      <svg {...ICONO_PROPS}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.6.2-.7.6-.7 1.1v.5" />
        <path d="M12 16.8v.2" />
      </svg>
    ),
  },
];

/**
 * Barra de navegación inferior, solo móvil. En una web que se abre casi
 * siempre desde una notificación, tener el panel principal a un toque
 * importa más que un menú arriba: el pulgar llega abajo, no al header.
 * `pb-[env(safe-area-inset-bottom)]` evita quedar debajo de la barra de
 * gestos del iPhone.
 */
export default function NavMovil() {
  const ruta = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
    >
      <div className="flex">
        {ITEMS.map((item) => {
          const activo = item.activo(ruta);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activo ? "page" : undefined}
              className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition ${
                activo ? "text-ember" : "text-ink-faint"
              }`}
            >
              {item.icono}
              {item.etiqueta}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
