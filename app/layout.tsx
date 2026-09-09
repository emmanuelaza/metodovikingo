import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({ variable: "--font-oswald", weight: ["500", "700"], subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

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
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${oswald.variable} ${inter.variable} h-full antialiased`}>
      {/* Landing de una sola página, sin anuncios: el único camino es
          comprar o irse — nada que le reste confianza al CTA. */}
      <body className="flex min-h-full flex-col">
        <main className="flex-1 w-full">{children}</main>
        <footer className="border-t border-line py-8 text-center text-xs text-ink-faint">
          <p className="font-display tracking-[0.2em] text-ink-dim">MÉTODO VIKINGO</p>
          <p className="mx-auto mt-3 max-w-xs leading-relaxed">
            Contenido educativo, no sustituye consejo médico.
          </p>
          <p className="mt-3">
            <Link href="/privacidad" className="text-ink-dim underline-offset-4 transition-colors hover:text-ink hover:underline">
              Privacidad
            </Link>
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
