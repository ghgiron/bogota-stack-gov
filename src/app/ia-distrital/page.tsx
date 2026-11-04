import { AdoptionCtaBanner } from "@/components/ia-landing/AdoptionCtaBanner";
import { AdoptionUseCases } from "@/components/ia-landing/AdoptionUseCases";
import { DistritalBrainGrid } from "@/components/ia-landing/DistritalBrainGrid";
import { GovLlmHero } from "@/components/ia-landing/GovLlmHero";
import { GovernanceSecurityCards } from "@/components/ia-landing/GovernanceSecurityCards";
import { OnboardingRoadmapAndCode } from "@/components/ia-landing/OnboardingRoadmapAndCode";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IA Distrital | Alcaldía Mayor de Bogotá D.C.",
  description:
    "Inteligencia Artificial al servicio de la administración distrital. Herramienta oficial de apoyo a la gestión pública desarrollada para entidades de la Alcaldía Mayor de Bogotá D.C. y la Secretaría General.",
};

export default function IADistritalLandingPage() {
  return (
    <div className="flex flex-col w-full bg-surface min-h-screen text-on-surface">
      {/* 1. Hero Institucional Centrado y Limpio */}
      <GovLlmHero />

      {/* 2. Arquitectura de Recuperación (RAG Distrital) y Fuentes de Información */}
      <DistritalBrainGrid />

      {/* 3. Casos de Uso en la Administración Distrital */}
      <AdoptionUseCases />

      {/* 4. Gobernanza Institucional, Seguridad y Cumplimiento Normativo */}
      <GovernanceSecurityCards />

      {/* 5. Ruta de Adopción en 4 Pasos + Consola Técnica */}
      <OnboardingRoadmapAndCode />

      {/* 6. CTA Institucional de Acompañamiento Técnico con la Secretaría General */}
      <AdoptionCtaBanner />
    </div>
  );
}
