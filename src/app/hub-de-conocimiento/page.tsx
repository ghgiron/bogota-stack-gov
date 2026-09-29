import { KnowledgeHeroCards } from "@/components/hub/KnowledgeHeroCards";
import { LearningRoutesGrid } from "@/components/hub/LearningRoutesGrid";
import { LegalConsultationBanner } from "@/components/hub/LegalConsultationBanner";
import { NormativaDataGrid } from "@/components/hub/NormativaDataGrid";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Hub de Conocimiento | Bogotá Stack - Innovación y Normativa",
  description:
    "Metodologías ágiles, políticas públicas, procesos de racionalización de trámites, innovación públic y normativa habilitante para transformar los servicios digitales del Distrito.",
};

export default function HubConocimientoPage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* 1. Sub-header / Breadcrumb Bar Semántico */}
      <section className="w-full bg-surface-container-low border-b border-surface-container-highest/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav
            aria-label="Ruta de navegación"
            className="flex items-center gap-1.5 font-body text-xs sm:text-sm text-on-surface-variant flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-tertiary rounded"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              <span>Inicio</span>
            </Link>
            <span
              className="material-symbols-outlined text-[14px] text-gray-400"
              aria-hidden="true"
            >
              chevron_right
            </span>
            <span className="text-on-surface-variant">Módulos</span>
            <span
              className="material-symbols-outlined text-[14px] text-gray-400"
              aria-hidden="true"
            >
              chevron_right
            </span>
            <span className="font-semibold text-primary" aria-current="page">
              Hub de Conocimiento
            </span>
          </nav>
        </div>
      </section>

      {/* 2. Module 3 Hero Section */}
      <section className="w-full bg-surface-container-lowest border-b border-surface-container-highest/60 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-6 border-b border-surface-container-highest/60">
            <div className="max-w-3xl flex flex-col gap-3">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-on-surface font-bold tracking-tight">
                Hub de Conocimiento
              </h1>
              <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Metodologías ágiles, marcos de racionalización de trámites, innovación pública con
                iBO y normativa habilitante para transformar los servicios del Distrito.
              </p>
            </div>
          </div>

          {/* 3 Quick Resolution Question Cards (Resolución rápida de dudas estratégicas) */}
          <KnowledgeHeroCards />
        </div>
      </section>

      {/* 3. Section 1: Rutas de Aprendizaje y Herramientas de Innovación Pública */}
      <LearningRoutesGrid />

      {/* 4. Section 2: Repositorio Normativo Distrital con Buscador Reactivo y DataGrid */}
      <NormativaDataGrid />

      {/* 5. Section 3: Banner de Soporte Técnico y Jurídico OTIC / Secretaría Jurídica */}
      <LegalConsultationBanner />
    </div>
  );
}
