import { AdoptionCtaBanner } from "@/components/ia-landing/AdoptionCtaBanner";
import { AdoptionUseCases } from "@/components/ia-landing/AdoptionUseCases";
import { DistritalBrainGrid } from "@/components/ia-landing/DistritalBrainGrid";
import { GovLlmHero } from "@/components/ia-landing/GovLlmHero";
import { GovernanceSecurityCards } from "@/components/ia-landing/GovernanceSecurityCards";
import { OnboardingRoadmapAndCode } from "@/components/ia-landing/OnboardingRoadmapAndCode";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IA Distrital | Modelo de IA de Servicio a la Ciudadanía (Bogotá GovLLM)",
  description:
    "Landing oficial B2G del modelo Bogotá GovLLM para secretarías y entidades de la Alcaldía Mayor de Bogotá D.C. RAG normativo cerrado, cero alucinaciones y cumplimiento Ley 1581.",
};

export default function IADistritalLandingPage() {
  return (
    <div className="flex flex-col w-full bg-surface min-h-screen text-on-surface">
      {/* 1. Hero Section B2G (Orientado a Directores y Secretarías) */}
      <GovLlmHero />

      {/* 3. Sección: El Cerebro Distrital (RAG Indexado a Fuentes Oficiales) */}
      <DistritalBrainGrid />

      {/* 4. Sección: Tres Formas Inmediatas de Adoptar el Modelo */}
      <AdoptionUseCases />

      {/* 5. Sección: Gobernanza Institucional, Seguridad y Cumplimiento Normativo */}
      <GovernanceSecurityCards />

      {/* 6. Sección: De la Solicitud a Producción en 4 Pasos + Consola Técnica */}
      <OnboardingRoadmapAndCode />

      {/* 7. Sección Final: CTA de Adopción y Contacto OTIC */}
      <AdoptionCtaBanner />
    </div>
  );
}
