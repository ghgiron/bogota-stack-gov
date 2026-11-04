import type { Metadata, Viewport } from "next";
import { Montserrat, Work_Sans } from "next/font/google";
import "./globals.css";
import { FooterBogota } from "@/components/layout/FooterBogota";
import { HeaderBogota } from "@/components/layout/HeaderBogota";
import { SkipToContent } from "@/components/layout/SkipToContent";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bogotá Stack | Plataforma B2G de Estandarización Digital",
  description:
    "Hub central de la Secretaría General de la Alcaldía Mayor de Bogotá para Guías de Vinculación, Developer KIT, Repositorio Normativo y herramientas de IA Distrital.",
  keywords: [
    "Bogotá Stack",
    "Alcaldía Mayor de Bogotá",
    "Secretaría General",
    "B2G",
    "Kit UI Bogotá",
    "Gobierno Digital",
    "Developer KIT",
  ],
  authors: [{ name: "Secretaría General - Alcaldía Mayor de Bogotá" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#CC0E35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${workSans.variable} ${montserrat.variable}`}>
      <body className={`${workSans.variable} ${montserrat.variable} font-sans bg-[#F8F9FA] text-[#1E1E1E] antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white`}>
        {/* Enlace accesible para saltar directo al contenido */}
        <SkipToContent />

        {/* Encabezado distrital institucional */}
        <HeaderBogota />

        {/* Contenedor principal accesible con id referenciado por el skip-link */}
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>

        {/* Pie de página distrital estándar */}
        <FooterBogota />
      </body>
    </html>
  );
}
