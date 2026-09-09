"use client";

import { useEffect, useRef, useState } from "react";
import BotonHotmart from "@/app/components/BotonHotmart";

/**
 * Botón fijo abajo (solo móvil) que aparece al pasar el Hero. Usa
 * IntersectionObserver sobre un sentinel invisible — sin librerías, sin
 * listeners de scroll pesados, para no restarle nada a la velocidad de carga.
 */
export default function StickyCTA({ href, sentinelId }: { href: string; sentinelId: string }) {
  const [visible, setVisible] = useState(false);
  const yaVioRef = useRef(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        // Solo se activa cuando el sentinel ya se vio y salió de pantalla hacia arriba.
        if (entrada.isIntersecting) yaVioRef.current = true;
        setVisible(yaVioRef.current && !entrada.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.08] bg-bg/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg sm:hidden">
      <BotonHotmart href={href} ubicacion="sticky" className="py-3.5 text-sm" />
    </div>
  );
}
