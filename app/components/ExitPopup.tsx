"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VikingMascot } from "@/app/components/VikingMascot";
import BotonHotmart from "@/app/components/BotonHotmart";

/**
 * Popup de salida: escritorio (el cursor sale por arriba) y móvil (tras
 * inactividad). Una sola vez por sesión (sessionStorage). Sin descuento ni
 * fecha límite falsos — solo recuerda la oferta real que ya existe.
 */
export default function ExitPopup({ href }: { href: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("salida_mostrada")) return;
    const disparar = () => {
      if (sessionStorage.getItem("salida_mostrada")) return;
      sessionStorage.setItem("salida_mostrada", "1");
      setOpen(true);
    };
    const alSalir = (e: MouseEvent) => { if (e.clientY <= 0) disparar(); };
    document.addEventListener("mouseleave", alSalir);
    const temporizador = setTimeout(disparar, 45000);
    return () => {
      document.removeEventListener("mouseleave", alSalir);
      clearTimeout(temporizador);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="card-crema w-full max-w-sm p-6 text-center"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center">
              <VikingMascot pose="sorpresa" width={140} />
            </div>
            <span className="pill text-ember-deep">Espera un segundo</span>
            <h3 className="mt-2 font-display text-2xl">¿Te vas ya?</h3>
            <p className="mt-2 text-sm leading-relaxed">
              El Método Vikingo te da un plan claro de entrenamiento, mentalidad y nutrición para dejar de empezar de
              cero cada lunes.
            </p>
            <BotonHotmart href={href} ubicacion="exit_popup" className="mt-4 w-full" texto="Ver el Método" />
            <button onClick={() => setOpen(false)} className="mt-3 text-xs underline opacity-70">
              No, gracias
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
