"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function formatear(ms: number): string {
  const totalSeg = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeg / 3600);
  const m = Math.floor((totalSeg % 3600) / 60);
  const s = totalSeg % 60;
  return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

/**
 * Cuenta regresiva hacia `objetivoEpoch` (medianoche del reto, ver
 * `proximaMedianocheEpoch` en lib/fecha.ts). Al llegar a cero refresca la
 * ruta para que el servidor recalcule `diaMaximo` sin que el usuario tenga
 * que recargar manualmente.
 */
export default function ContadorSiguienteDia({ objetivoEpoch }: { objetivoEpoch: number }) {
  const router = useRouter();
  // null hasta el primer efecto client-side: Date.now() difiere entre el
  // render en servidor y la hidratación en cliente, así que calcularlo
  // durante el render (incluso en el estado inicial) provoca un mismatch
  // de hidratación (React #418). Arrancar en null mantiene el primer
  // render idéntico en servidor y cliente.
  const [restante, setRestante] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const nuevo = objetivoEpoch - Date.now();
      setRestante((actual) => {
        if (nuevo <= 0 && actual !== null && actual > 0) router.refresh();
        return nuevo;
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [objetivoEpoch, router]);

  if (restante === null) return null;

  if (restante <= 0) {
    return <p className="text-ink-dim">Tu siguiente lección ya está disponible.</p>;
  }

  return (
    <p className="text-ink-dim">
      Tu siguiente lección se desbloquea en: <span className="font-semibold text-ink">{formatear(restante)}</span>
    </p>
  );
}
