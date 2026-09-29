import { BbHeroHeader } from "@/components/building-blocks/BbHeroHeader";
import { BbTripleAudienceTabs } from "@/components/building-blocks/BbTripleAudienceTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Block: Pagos Distritales (bb-payment) | GovStack Bogotá Stack",
  description:
    "Solución compartida y desacoplada para recaudos integrados con la Secretaría Distrital de Hacienda (SDH) para todas las entidades públicas del Distrito.",
  keywords: [
    "bb-payment",
    "Pagos Distritales",
    "Building Blocks",
    "GovStack",
    "B-Pay",
    "Bogotá Stack",
    "Secretaría Distrital de Hacienda",
    "SDH",
  ],
};

export default function BbPaymentPage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface">
      {/* 1. Sub-Header, Breadcrumb y Hero del Building Block */}
      <BbHeroHeader />

      {/* 2. Barra Tripartita Sticky y Contenido Dinámico de las 3 Pestañas */}
      <BbTripleAudienceTabs />
    </div>
  );
}
