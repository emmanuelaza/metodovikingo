import type { MetadataRoute } from "next";

/**
 * `display: "browser"` es deliberado: al tocar el ícono la web se abre en el
 * navegador normal, NO como app en modo standalone. Así el atajo solo sirve
 * de camino de regreso (mucha gente rechaza las notificaciones y se quedaría
 * sin ninguno) sin cambiar en nada cómo se comportan los anuncios — el
 * Popunder necesita poder abrir otra ventana, y en modo app eso se rompe.
 * No cambiar a "standalone" sin medir antes el impacto en impresiones.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reto Vikingo — 30 días",
    short_name: "Reto Vikingo",
    description: "Curso gratuito de 30 días de nutrición y entrenamiento.",
    start_url: "/",
    display: "browser",
    background_color: "#0b0c0f",
    theme_color: "#0b0c0f",
    lang: "es",
    icons: [
      { src: "/icono-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icono-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icono-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
