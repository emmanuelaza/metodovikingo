import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/Nav";
import { ADS_ENABLED, AD_PROVIDER, ADSENSE_CLIENT_ID } from "@/lib/ads";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Reto Vikingo — 30 días", template: "%s · Reto Vikingo" },
  description:
    "Reto gratuito de 30 días de nutrición y entrenamiento. Una lección al día, una palabra para desbloquearla, y el Método completo al final.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0b0e13",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
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
        <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-5 pb-16">{children}</main>
        <footer className="border-t border-vk-border py-6 text-center text-xs text-vk-muted">
          <div className="flex justify-center gap-4 mb-2">
            <Link href="/recetas" className="hover:text-vk-text">Recetas</Link>
            <Link href="/faq" className="hover:text-vk-text">Preguntas frecuentes</Link>
          </div>
          <p>Método Vikingo · Contenido educativo, no sustituye consejo médico.</p>
        </footer>
      </body>
    </html>
  );
}
