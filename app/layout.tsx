import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/Nav";
import NavMovil from "@/app/components/NavMovil";
import PopunderGate from "@/app/components/PopunderGate";
import { ADS_ENABLED } from "@/lib/ads";

const SOCIAL_BAR_SRC = "https://pl31224703.profitableratecpmnetwork.com/ec/85/e8/ec85e8d57198e6ba577e1836d8860803.js";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

const TITULO = "Reto Vikingo — 30 días";
const DESCRIPCION =
  "Curso gratuito de 30 días de nutrición y entrenamiento. Una lección nueva cada día y el Método completo al final.";

export const metadata: Metadata = {
  title: { default: TITULO, template: "%s · Reto Vikingo" },
  description: DESCRIPCION,
  keywords: ["reto de 30 días", "reto fitness gratis", "nutrición y entrenamiento", "método vikingo", "reto vikingo"],
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Reto Vikingo",
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
  // Necesario para que env(safe-area-inset-*) tenga valor en iPhone con notch.
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${manrope.variable} h-full antialiased`}>
      {/* Deja libre la altura de NavMovil (3.5rem + su borde) más un respiro,
          para que el contenido no termine pegado a la barra. Solo móvil. */}
      <body className="flex min-h-full flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-0">
        {/* RootLayout no se vuelve a montar en navegación client-side (Link), así
            que estos scripts cargan una sola vez por sesión de navegación, no en
            cada cambio de ruta. strategy="afterInteractive": no bloquean el
            primer render. Apagar todo con NEXT_PUBLIC_ADS_ENABLED=false.
            PopunderGate además limita el Popunder a una vez cada 24h por navegador. */}
        {ADS_ENABLED && <PopunderGate />}

        <Nav />
        <main className="flex-1 w-full">{children}</main>
        <footer className="border-t border-line py-6 text-center text-xs text-ink-dim">
          <p>Método Vikingo · Contenido educativo, no sustituye consejo médico.</p>
          <p className="mt-2">
            <Link href="/privacidad" className="underline hover:text-ink">
              Privacidad
            </Link>
          </p>
        </footer>

        <NavMovil />

        {ADS_ENABLED && <Script src={SOCIAL_BAR_SRC} strategy="afterInteractive" />}
      </body>
    </html>
  );
}
