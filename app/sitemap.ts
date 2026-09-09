import type { MetadataRoute } from "next";

/** Landing de una sola página: solo la home y la política de privacidad son indexables. */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const rutas: { ruta: string; prioridad: number }[] = [
    { ruta: "", prioridad: 1 },
    { ruta: "/privacidad", prioridad: 0.2 },
  ];

  return rutas.map(({ ruta, prioridad }) => ({
    url: `${siteUrl}${ruta}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: prioridad,
  }));
}
