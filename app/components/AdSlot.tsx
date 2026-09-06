"use client";

import { useEffect, useRef } from "react";
import { AD_PROVIDER, ADS_ENABLED, ADSENSE_CLIENT_ID, ADSENSE_SLOTS, ADSTERRA_ZONE_ID } from "@/lib/ads";

type Position = "top" | "mid-content" | "bottom";

/**
 * Slot de anuncio reutilizable. Se apaga por completo con NEXT_PUBLIC_ADS_ENABLED=false
 * y cambia de red con NEXT_PUBLIC_AD_PROVIDER (adsense | adsterra).
 * Nunca colocar dentro del flujo del input de palabra del día.
 */
export default function AdSlot({ position, className = "" }: { position: Position; className?: string }) {
  if (!ADS_ENABLED) return null;
  if (AD_PROVIDER === "adsense" && !ADSENSE_CLIENT_ID) return null;
  if (AD_PROVIDER === "adsterra" && !ADSTERRA_ZONE_ID) return null;

  return (
    <div className={`my-4 flex min-h-[100px] justify-center overflow-hidden ${className}`} data-ad-position={position}>
      {AD_PROVIDER === "adsense" ? <AdSense position={position} /> : <Adsterra />}
    </div>
  );
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    atOptions?: Record<string, unknown>;
  }
}

function AdSense({ position }: { position: Position }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // El script de AdSense aún no cargó; se reintenta en el siguiente render.
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block w-full"
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={ADSENSE_SLOTS[position] ?? undefined}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

/** Banner estándar de Adsterra (300x250). */
function Adsterra() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contenedor = ref.current;
    if (!contenedor || contenedor.childElementCount > 0) return;

    window.atOptions = {
      key: ADSTERRA_ZONE_ID,
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };
    const script = document.createElement("script");
    script.src = `https://www.highperformanceformat.com/${ADSTERRA_ZONE_ID}/invoke.js`;
    script.async = true;
    contenedor.appendChild(script);
  }, []);

  return <div ref={ref} style={{ width: 300, height: 250 }} />;
}
