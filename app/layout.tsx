import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

const TITULO = "El Método Vikingo";
const DESCRIPCION = "Rutinas de fuerza, nutrición sin complicaciones y disciplina diaria para construir un físico imponente.";

export const metadata: Metadata = {
  title: { default: TITULO, template: "%s · Método Vikingo" },
  description: DESCRIPCION,
  keywords: ["método vikingo", "plan de entrenamiento", "nutrición y fuerza", "rutina de 12 semanas"],
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: TITULO,
    title: TITULO,
    description: DESCRIPCION,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: TITULO }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/api/og"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${manrope.variable} h-full antialiased`}>
      {/* Landing de una sola página, sin anuncios: el único camino es
          comprar o irse — nada que le reste confianza al CTA. */}
      <body className="flex min-h-full flex-col">
        <main className="flex-1 w-full">{children}</main>
        <footer className="border-t border-line py-6 text-center text-xs text-ink-dim">
          <p>Método Vikingo · Contenido educativo, no sustituye consejo médico.</p>
          <p className="mt-2">
            <Link href="/privacidad" className="underline hover:text-ink">
              Privacidad
            </Link>
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
