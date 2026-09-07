import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/Nav";
import AdSlot from "@/app/components/AdSlot";
import { ADS_ENABLED } from "@/lib/ads";

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
      <body className={`min-h-full flex flex-col ${ADS_ENABLED ? "pb-[50px] sm:pb-0" : ""}`}>
        <Nav />
        <main className="flex-1 w-full">{children}</main>
        <footer className="border-t border-line py-6 text-center text-xs text-ink-dim">
          <p>Método Vikingo · Contenido educativo, no sustituye consejo médico.</p>
          <p className="mt-2">
            <Link href="/privacidad" className="underline hover:text-ink">
              Privacidad
            </Link>
          </p>
          {/* Escritorio: banner 728x90 en el footer. Nunca junto al de 320x50 (móvil). */}
          {ADS_ENABLED && (
            <div className="mt-4 hidden justify-center sm:flex">
              <AdSlot slot="banner728x90HeaderDesktop" />
            </div>
          )}
        </footer>

        {/* Móvil: banner 320x50 fijo abajo. body tiene padding-bottom para no taparlo. */}
        {ADS_ENABLED && (
          <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center bg-bg sm:hidden">
            <AdSlot slot="banner320x50FooterMobile" />
          </div>
        )}
      </body>
    </html>
  );
}
