/** Íconos nórdicos minimalistas en SVG inline — sin archivos externos, cero peso extra de red. */

export function IconoEscudo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className}>
      <path d="M12 3 20 6.5V12c0 5-3.4 7.8-8 9-4.6-1.2-8-4-8-9V6.5L12 3Z" />
      <path d="M12 7v9M8.5 12h7" />
    </svg>
  );
}

/** Separador de sección: runa simple entre dos líneas cortas. */
export function SeparadorRuna({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-ember-2 ${className}`} aria-hidden>
      <span className="h-px w-8 bg-line" />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-4 w-4">
        <path d="M12 3v18M12 3 6 9M12 3l6 6" />
      </svg>
      <span className="h-px w-8 bg-line" />
    </div>
  );
}
