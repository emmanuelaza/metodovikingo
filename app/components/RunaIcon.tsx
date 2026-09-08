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
      // Jera: dos chevrones desplazados en diagonal, nunca cruzados — una "X"
      // en un logro bloqueado se lee como "fallaste", no como "pendiente".
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 3 L13 9 L6 15" />
          <path d="M18 21 L11 15 L18 9" />
        </svg>
      );
    case "medicion":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M7 3 L7 21 M7 6 L17 3 M7 12 L17 9" />
        </svg>
      );
    case "valhalla":
      // Valknut: tres triángulos entrelazados. Los ángulos NO pueden ser
      // múltiplos de 120° — un triángulo equilátero tiene simetría de orden 3
      // y las tres copias caerían exactamente una sobre otra.
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" className={className}>
          <polygon points="12,3 20,17 4,17" transform="rotate(0 12 12)" />
          <polygon points="12,3 20,17 4,17" transform="rotate(40 12 12)" />
          <polygon points="12,3 20,17 4,17" transform="rotate(80 12 12)" />
        </svg>
      );
  }
}
