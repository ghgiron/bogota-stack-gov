import { getGuias } from "@/lib/firebase/db";
import GuidesCatalogContainer from "@/components/guias/GuidesCatalogContainer";
import GuidesCatalogHero from "@/components/guias/GuidesCatalogHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Guías de Vinculación Distrital | Bogotá Stack",
  description:
    "Documentación oficial, estándares y metodologías para integrar los trámites y servicios de tu entidad al Portal Transaccional de Bogotá D.C.",
};

export default async function GuiasDeVinculacionPage() {
  const guias = await getGuias();

  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface">
      {/* 1. Hero Section Institucional */}
      <GuidesCatalogHero />

      {/* 2. Contenido Principal: Filtros y Grilla de Guías */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex flex-col gap-12">
        <GuidesCatalogContainer initialGuides={guias} />
      </main>
    </div>
  );
}
