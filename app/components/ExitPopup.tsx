"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { VikingMascot } from "@/app/components/VikingMascot";
import BotonHotmart from "@/app/components/BotonHotmart";

/**
 * Popup de salida — SOLO por intención real de salir, nunca por tiempo:
 * escritorio, el cursor sale por arriba de la ventana; móvil, el usuario
 * presiona "atrás". Una vez por sesión (sessionStorage). El precio tachado
 * es real (el producto costaba eso antes), nunca un descuento inventado.
 */
export default function ExitPopup({
  href,
  precio,
  precioAnterior,
  precioMoneda,
}: {
  href: string;
  precio: string;
  precioAnterior?: string;
  precioMoneda: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("salida_mostrada")) return;

    const disparar = () => {
      if (sessionStorage.getItem("salida_mostrada")) return;
      sessionStorage.setItem("salida_mostrada", "1");
      setOpen(true);
    };

    // Escritorio: el cursor sale por el borde superior de la ventana.
    const alSalirCursor = (e: MouseEvent) => {
      if (e.clientY <= 0) disparar();
    };
    document.addEventListener("mouseleave", alSalirCursor);

    // Móvil: intenta volver atrás (no hay "cursor que sale" en touch).
    // Empuja un estado extra al historial para interceptar el primer "atrás"
    // sin sacar al usuario de la página; si vuelve a presionar atrás después,
    // ya no interceptamos — se va normal, como espera.
    history.pushState({ salidaCentinela: true }, "");
    const alIntentarVolver = () => {
      disparar();
      window.removeEventListener("popstate", alIntentarVolver);
    };
    window.addEventListener("popstate", alIntentarVolver);

    return () => {
      document.removeEventListener("mouseleave", alSalirCursor);
      window.removeEventListener("popstate", alIntentarVolver);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="card-vikingo relative w-full max-w-sm overflow-hidden p-6 text-center sm:p-8"
            initial={{ scale: 0.75, y: 40, rotate: -2 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="pill text-err">Antes de irte</span>

            <div className="mt-2 flex justify-center">
              <VikingMascot pose="sorpresa" width={150} priority />
            </div>

            <h3 className="texto-glow mt-1 font-display text-2xl text-ember-2 sm:text-3xl">
              TU FÍSICO PUEDE
              <br />
              EMPEZAR HOY
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink-dim">
              Un plan claro de entrenamiento, mentalidad y nutrición — sin relleno, directo a lo que funciona.
            </p>

            <div className="mx-auto mt-5 max-w-[14rem] text-ember-2">
              <div className="barra-pesas">
                <span />
              </div>
            </div>

            <div className="mt-4">
              {precioAnterior && (
                <p className="text-base text-ink-faint line-through sm:text-lg">
                  Antes costaba {precioAnterior} {precioMoneda}
                </p>
              )}
              <p className="texto-glow mt-1 font-display text-4xl text-ember sm:text-5xl">
                {precio} {precioMoneda}
              </p>
            </div>

            <p className="mt-5 flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wide text-ember-2">
              Dale al botón
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </p>
            <BotonHotmart href={href} ubicacion="exit_popup" className="mt-2 w-full" texto="Quiero mi acceso ahora" pulso />

            <button onClick={() => setOpen(false)} className="mt-4 text-xs text-ink-faint underline opacity-70">
              No, gracias
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
