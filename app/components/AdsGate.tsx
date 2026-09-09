"use client";

import { usePathname } from "next/navigation";

/** Rutas donde el anuncio le resta confianza justo al momento de decidir una compra. */
const RUTAS_SIN_ADS = ["/metodo-secreto"];

/**
 * Envuelve el Popunder/Social Bar del layout raíz para que no carguen en la
 * página de ventas (/metodo-secreto): ahí el objetivo es un solo camino
 * (comprar o no comprar), y un anuncio que interrumpe o desconfía le resta
 * a una conversión que vale mucho más que el anuncio mismo.
 */
export default function AdsGate({ children }: { children: React.ReactNode }) {
  const ruta = usePathname();
  if (RUTAS_SIN_ADS.some((r) => ruta.startsWith(r))) return null;
  return <>{children}</>;
}
