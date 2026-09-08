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
  const [restante, setRestante] = useState(() => objetivoEpoch - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRestante((actual) => {
        const nuevo = objetivoEpoch - Date.now();
        if (nuevo <= 0 && actual > 0) router.refresh();
        return nuevo;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [objetivoEpoch, router]);

  if (restante <= 0) {
    return <p className="text-ink-dim">Tu siguiente lección ya está disponible.</p>;
  }

  return (
    <p className="text-ink-dim">
      Tu siguiente lección se desbloquea en: <span className="font-semibold text-ink">{formatear(restante)}</span>
    </p>
  );
}
