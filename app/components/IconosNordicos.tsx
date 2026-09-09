/** Set de íconos línea (estilo Lucide/Feather) en SVG inline — cero peso de red, cero CLS. */

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconoEscudo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M12 3 20 6.5V12c0 5-3.4 7.8-8 9-4.6-1.2-8-4-8-9V6.5L12 3Z" />
      <path d="M12 7v9M8.5 12h7" />
    </svg>
  );
}

/** Separador de sección: runa simple entre dos líneas cortas. */
export function SeparadorRuna({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-ember ${className}`} aria-hidden>
      <span className="h-px w-8 bg-line" />
      <svg {...BASE} className="h-4 w-4">
        <path d="M12 3v18M12 3 6 9M12 3l6 6" />
      </svg>
      <span className="h-px w-8 bg-line" />
    </div>
  );
}

/** Chevron sólido — reemplaza el ❌ de la agitación del problema. */
export function IconoChevron({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function IconoPesa({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 9v6M2 10v4M20 9v6M22 10v4M6 7v10M18 7v10M8 12h8" />
    </svg>
  );
}

export function IconoCerebro({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 2.8V13a3 3 0 0 0 2 2.8V17a3 3 0 0 0 3 3" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 2.8V13a3 3 0 0 1-2 2.8V17a3 3 0 0 1-3 3" />
      <path d="M9 4v16M15 4v16" />
    </svg>
  );
}

export function IconoNutricion({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M12 3c-3 0-5 2.5-5 6 0 5 2.5 9.5 4.2 11.2a1.1 1.1 0 0 0 1.6 0C14.5 18.5 17 14 17 9c0-3.5-2-6-5-6Z" />
      <path d="M12 3c0-1 .8-2 2-2" />
    </svg>
  );
}

export function IconoTelefono({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

export function IconoCandado({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <rect x="4" y="11" width="16" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function IconoMas({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...BASE} className={`transition-transform duration-200 ${className}`}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconoCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** Rayo — acceso instantáneo. */
export function IconoRayo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M13 2 4 14h7l-2 8 9-12h-7l2-8Z" />
    </svg>
  );
}

/** Sobre — soporte por correo. */
export function IconoSobre({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/** Flechas de refresco — actualizaciones incluidas. */
export function IconoActualizar({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-8-5" />
      <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 8 5" />
      <path d="M21 3v5h-5M3 21v-5h5" />
    </svg>
  );
}
