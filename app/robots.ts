import type { MetadataRoute } from "next";

/**
 * /progreso y /api/ son datos personales/privados: no aportan nada indexados
 * y en el caso de /progreso exponen medidas del usuario en la URL del bot.
 * El resto queda abierto: la auth anónima no bloquea el render, todos los
 * visitantes (bots incluidos) ven el mismo contenido de la lección del día.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/progreso"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
