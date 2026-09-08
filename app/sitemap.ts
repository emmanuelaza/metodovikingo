import type { MetadataRoute } from "next";

/**
 * Solo las páginas de marketing/contenido estático: /reto/[dia] y
 * /metodo-secreto dependen de la sesión (progreso, redirects) y no aportan
 * valor SEO como URLs indexables independientes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const rutas: { ruta: string; prioridad: number }[] = [
    { ruta: "", prioridad: 1 },
    { ruta: "/faq", prioridad: 0.6 },
    { ruta: "/recetas", prioridad: 0.6 },
    { ruta: "/privacidad", prioridad: 0.2 },
  ];

  return rutas.map(({ ruta, prioridad }) => ({
    url: `${siteUrl}${ruta}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: prioridad,
  }));
}
