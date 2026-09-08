"use client";

import { useEffect, useRef } from "react";

/**
 * Inyecta manualmente el <div id="container-..."> + <script> de Adsterra en
 * cada montaje (useEffect + document.createElement), en vez de next/script.
 *
 * next/script deduplica por `src` a nivel de documento: al navegar entre
 * lecciones con <Link> (client-side routing) el contenedor se recrea vacío
 * pero el script ya "cargado" globalmente no se vuelve a ejecutar, así que
 * el anuncio solo aparecía en la primera carga completa de página.
 * Montando el <script> de nuevo en cada efecto se fuerza a Adsterra a
 * rellenar el contenedor fresco de cada lección.
 */
export default function NativeAdSlot({ containerId, src, minHeight }: { containerId: string; src: string; minHeight: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const contenedor = document.createElement("div");
    contenedor.id = containerId;
    contenedor.className = "w-full";
    wrapper.appendChild(contenedor);

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = src;
    wrapper.appendChild(script);

    return () => {
      wrapper.innerHTML = "";
    };
  }, [containerId, src]);

  return <div ref={wrapperRef} className="flex w-full justify-center overflow-hidden" style={{ minHeight }} />;
}
