type Simbolo = "constancia" | "estructura" | "medicion" | "valhalla";

/**
 * Íconos de runas nórdicas dibujados a mano en SVG (sin assets externos):
 * Uruz (fuerza/resistencia), Jera (ciclo), Ansuz (conocimiento) y el
 * Valknut (las tres runas unidas — Valhalla). `currentColor` hereda el
 * color de texto del contenedor, así se ve ember cuando está conseguida
 * e ink-faint cuando está bloqueada.
 */
export default function RunaIcon({ simbolo, className = "h-5 w-5" }: { simbolo: Simbolo; className?: string }) {
  switch (simbolo) {
    case "constancia":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 3 L6 21 L18 21 L18 12 L6 3" />
        </svg>
      );
    case "estructura":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 4 L12 12 L6 20 M18 4 L12 12 L18 20" />
        </svg>
      );
    case "medicion":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M7 3 L7 21 M7 6 L17 3 M7 12 L17 9" />
        </svg>
      );
    case "valhalla":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className={className}>
          <polygon points="12,4 19,17 5,17" transform="rotate(0 12 12)" />
          <polygon points="12,4 19,17 5,17" transform="rotate(120 12 12)" />
          <polygon points="12,4 19,17 5,17" transform="rotate(240 12 12)" />
        </svg>
      );
  }
}
