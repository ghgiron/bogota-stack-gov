"use client";

import { SplitScreenSandbox } from "@/components/building-blocks/SplitScreenSandbox";
import { ButtonBogota } from "@/components/ui/ButtonBogota";
import { BUILDING_BLOCKS_CATALOG, type BuildingBlockDetail } from "@/lib/data/buildingBlocksData";
import {
  ArrowLeft,
  Blocks,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  FileCode,
  Layers,
  Layout,
  Lock,
  Palette,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function BuildingBlockDetailPage() {
  const params = useParams();
  const slugParam = typeof params?.slug === "string" ? params.slug : "pagos-distritales";
  const block: BuildingBlockDetail =
    BUILDING_BLOCKS_CATALOG[slugParam] || BUILDING_BLOCKS_CATALOG["pagos-distritales"];

  const [activeTab, setActiveTab] = useState<"strategic" | "design" | "technical">("technical");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-body">
      {/* Breadcrumb de Navegación GovStack */}
      <nav aria-label="Ruta de navegación" className="mb-4">
        <ol className="flex items-center gap-1.5 text-xs text-text-muted">
          <li>
            <Link href="/" className="hover:text-text-main transition-colors">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>
          <li>
            <Link href="/developer-kit" className="hover:text-text-main transition-colors">
              Developer KIT
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>
          <li>
            <span className="text-gray-400">Building Blocks</span>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>
          <li aria-current="page">
            <span className="font-semibold text-text-main">{block.name}</span>
          </li>
        </ol>
      </nav>

      {/* Encabezado del Building Block (GovStack Pattern) */}
      <header className="bg-surface rounded-card p-6 sm:p-8 border border-gray-200 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary/10 text-tertiary border border-tertiary/20">
                <Blocks className="w-3.5 h-3.5" aria-hidden="true" />
                {block.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                {block.status}
              </span>
              <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {block.version}
              </span>
              <span className="text-xs font-semibold text-secondary-dark bg-secondary/15 px-2.5 py-0.5 rounded-full">
                {block.govstackStandard}
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-text-main tracking-tight">
              {block.name}
            </h1>
            <p className="text-sm sm:text-base text-text-muted mt-2 max-w-3xl leading-relaxed">
              {block.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link href="/developer-kit">
              <ButtonBogota
                variant="outline"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Volver al KIT
              </ButtonBogota>
            </Link>
          </div>
        </div>

        {/* Barra de Pestañas (GovStack Standard: Adopción, Diseño, Integración) */}
        <div className="flex items-center gap-2 mt-6 -mb-6 sm:-mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("strategic")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-heading font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "strategic"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
            Adopción Estratégica
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("design")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-heading font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "design"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Palette className="w-4 h-4" aria-hidden="true" />
            Diseño & UX/UI
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("technical")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-heading font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "technical"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <Code2 className="w-4 h-4" aria-hidden="true" />
            Integración Técnica (API Sandbox)
          </button>
        </div>
      </header>

      {/* PESTAÑA 1: ADOPCIÓN ESTRATÉGICA */}
      {activeTab === "strategic" && (
        <section aria-label="Adopción estratégica y beneficios" className="space-y-8">
          <div className="bg-surface rounded-card p-6 sm:p-8 border border-gray-200 shadow-xs">
            <h2 className="font-heading font-bold text-xl text-text-main mb-3">
              Visión y Gobernanza para el Distrito
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              {block.documentation.strategicAdoption.summary}
            </p>

            {/* Métricas de Impacto */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-btn bg-gray-50 border border-gray-200 mb-8">
              {block.documentation.strategicAdoption.impactMetrics.map((metric) => (
                <div key={metric.label} className="text-center sm:text-left">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-primary block">
                    {metric.value}
                  </span>
                  <span className="text-xs text-text-muted mt-1 block">{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Cuadrícula de Beneficios */}
            <h3 className="font-heading font-bold text-base text-text-main mb-4">
              Beneficios Clave para las Entidades Distritales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {block.documentation.strategicAdoption.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-4 rounded-btn border border-gray-200 bg-white hover:border-tertiary/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2
                      className="w-4 h-4 text-emerald-600 shrink-0"
                      aria-hidden="true"
                    />
                    <h4 className="font-bold text-sm text-text-main">{benefit.title}</h4>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed pl-6">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 2: DISEÑO & UX/UI */}
      {activeTab === "design" && (
        <section aria-label="Directrices de diseño y experiencia de usuario" className="space-y-8">
          <div className="bg-surface rounded-card p-6 sm:p-8 border border-gray-200 shadow-xs">
            <h2 className="font-heading font-bold text-xl text-text-main mb-3">
              Directrices de Diseño Transaccional Ciudadano
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              {block.documentation.designUX.summary}
            </p>

            {/* Banner de Stepper */}
            <div className="mb-6 p-4 rounded-btn bg-tertiary/10 border border-tertiary/20 text-xs sm:text-sm text-text-main">
              <strong className="text-tertiary block mb-1">
                Integración con el Stepper Vertical SGDS:
              </strong>
              <span>{block.documentation.designUX.stepperGuidance}</span>
            </div>

            {/* Reglas de Diseño */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {block.documentation.designUX.rules.map((rule) => (
                <div key={rule.title} className="p-4 rounded-btn border border-gray-200 bg-gray-50">
                  <h4 className="font-heading font-bold text-sm text-text-main mb-1.5">
                    {rule.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 3: INTEGRACIÓN TÉCNICA (SPLIT-SCREEN SANDBOX) */}
      {activeTab === "technical" && (
        <section aria-label="Consola de pruebas y especificación técnica">
          <SplitScreenSandbox block={block} />
        </section>
      )}
    </div>
  );
}
