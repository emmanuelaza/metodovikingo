"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BotonHotmart from "@/app/components/BotonHotmart";

/**
 * Barra fija inferior (solo móvil) que aparece al pasar el Hero. Usa
 * IntersectionObserver sobre un sentinel invisible — sin listeners de scroll
 * pesados, para no restarle nada a la velocidad de carga.
 */
export default function StickyCTA({
  href,
  sentinelId,
  precio,
}: {
  href: string;
  sentinelId: string;
  precio: string;
}) {
  const [visible, setVisible] = useState(false);
  const yaVioRef = useRef(false);
  const reduce = useReducedMotion();

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-white/10 bg-[#0a0610]/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg sm:hidden"
          initial={reduce ? undefined : { y: 80 }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <div className="leading-tight">
            <div className="font-display text-xl text-ember-2">{precio}</div>
            <div className="text-[11px] text-ink-dim">pago único</div>
          </div>
          <BotonHotmart href={href} ubicacion="sticky" className="w-auto px-5 py-3 text-sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
