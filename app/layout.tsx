import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Poppins } from "next/font/google";
import TikTokPixel from "@/app/components/TikTokPixel";
import { Embers } from "@/app/components/Embers";
import "./globals.css";

// display:"swap" → el texto se pinta al instante con la fuente de sistema y
// se cambia a la tipográfica al cargar (nunca texto invisible). Self-hosted
// por next/font: cero round-trip a Google, clave en el navegador de TikTok.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const TITULO = "El Método Vikingo";
const DESCRIPCION = "Gana tus primeros 5 kg de músculo en casa o en el gimnasio, con la disciplina, mentalidad y nutrición para lograrlo.";

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
  themeColor: "#12091a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      {/* Landing de una sola página, sin anuncios: el único camino es
          comprar o irse — nada que le reste confianza al CTA. */}
      <body className="relative flex min-h-full flex-col">
        <Embers />
        <main className="relative z-10 flex-1 w-full">{children}</main>
        <footer className="relative z-10 border-t border-line py-8 text-center text-xs text-ink-faint">
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
        <TikTokPixel />
      </body>
    </html>
  );
}
