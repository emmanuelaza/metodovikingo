import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/Nav";
import { ADS_ENABLED, AD_PROVIDER, ADSENSE_CLIENT_ID } from "@/lib/ads";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Reto Vikingo — 30 días", template: "%s · Reto Vikingo" },
  description:
    "Curso gratuito de 30 días de nutrición y entrenamiento. Una lección nueva cada día y el Método completo al final.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0b0c0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {ADS_ENABLED && AD_PROVIDER === "adsense" && ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Nav />
        <main className="flex-1 w-full">{children}</main>
        <footer className="border-t border-line py-6 text-center text-xs text-ink-dim">
          <p>Método Vikingo · Contenido educativo, no sustituye consejo médico.</p>
        </footer>
      </body>
    </html>
  );
}
