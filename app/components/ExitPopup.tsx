"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, X as IconoCerrar } from "lucide-react";
import BotonHotmart from "@/app/components/BotonHotmart";

/**
 * Popup de salida — SOLO por intención real de salir, nunca por tiempo.
 * Tres señales, todas de comportamiento real (no un temporizador):
 *   1. Escritorio: el cursor sale por arriba de la ventana.
 *   2. Móvil: el usuario presiona "atrás" (intercepta el primer popstate).
 *      No es 100% fiable en todos los navegadores móviles (Safari/Chrome en
 *      iOS no siempre disparan popstate con el gesto de volver), por eso
 *      nunca es la única señal.
 *   3. Móvil: scroll rápido hacia arriba cerca del tope de la página — el
 *      gesto típico de alguien que ya terminó de leer y va a cerrar/salir.
 *      Es la señal más confiable en touch, usada por la mayoría de
 *      herramientas de exit-intent para celular.
 * Una vez por sesión (sessionStorage). El video (public/popup/salida.mp4)
 * solo se descarga cuando esto se monta en el DOM al abrirse — nunca en la
 * carga inicial de la página.
 */
export default function ExitPopup({ href }: { href: string }) {
  const [open, setOpen] = useState(false);
  const [conSonido, setConSonido] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

    // Móvil: scroll rápido hacia arriba cerca del tope de la página. Solo en
    // pantallas táctiles — en desktop ya cubre el mouseleave. Usa una ventana
    // deslizante de 350ms (no el cuadro anterior nada más) porque
    // `scroll-behavior: smooth` reparte cada salto en muchos pasos chicos por
    // cuadro — comparar solo el cuadro previo nunca ve la velocidad real.
    const esTactil = window.matchMedia("(pointer: coarse)").matches;
    const historial: { y: number; t: number }[] = [];
    const alScrollear = () => {
      const ahora = performance.now();
      const y = window.scrollY;
      historial.push({ y, t: ahora });
      while (historial.length > 1 && ahora - historial[0].t > 350) historial.shift();
      const subioRapido = historial[0].y - y; // positivo = se movió hacia arriba
      if (subioRapido > 140 && y < 600) disparar();
    };
    if (esTactil) window.addEventListener("scroll", alScrollear, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", alSalirCursor);
      window.removeEventListener("popstate", alIntentarVolver);
      if (esTactil) window.removeEventListener("scroll", alScrollear);
    };
  }, []);

  const alternarSonido = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = conSonido;
    setConSonido(!conSonido);
  };

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
            className="card-vikingo relative w-full max-w-xs overflow-hidden p-0 sm:max-w-sm"
            initial={{ scale: 0.75, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
            >
              <IconoCerrar className="h-4 w-4" />
            </button>

            <div className="relative aspect-[9/16] w-full bg-black">
              <video
                ref={videoRef}
                src="/popup/salida.mp4"
                autoPlay
                loop
                muted={!conSonido}
                playsInline
                className="h-full w-full object-cover"
              />
              <button
                onClick={alternarSonido}
                aria-label={conSonido ? "Silenciar" : "Activar sonido"}
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white"
              >
                {conSonido ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
            </div>

            <div className="p-5 text-center sm:p-6">
              <BotonHotmart href={href} ubicacion="exit_popup" className="w-full" texto="Quiero mi acceso ahora" pulso />
              <button onClick={() => setOpen(false)} className="mt-3 text-xs text-ink-faint underline opacity-70">
                No, gracias
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
