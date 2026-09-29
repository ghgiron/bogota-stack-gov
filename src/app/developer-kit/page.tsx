"use client";

import { DarkIdeCodeConsole } from "@/components/dev-kit/DarkIdeCodeConsole";
import { DevSidebarTree } from "@/components/dev-kit/DevSidebarTree";
import { DevSupportBanner } from "@/components/dev-kit/DevSupportBanner";
import { DynamicPropsPanel } from "@/components/dev-kit/DynamicPropsPanel";
import { OnceOnlyPlayground } from "@/components/dev-kit/OnceOnlyPlayground";
import Link from "next/link";
import React, { useState } from "react";

export default function DeveloperKitPage() {
  const [selectedComponent, setSelectedComponent] = useState("once-only");
  const [actorType, setActorType] = useState<"natural" | "juridica" | "apoderado">("natural");
  const [isSSOAutofill, setIsSSOAutofill] = useState(true);
  const [simulateValidationError, setSimulateValidationError] = useState(false);
  const [isOnceOnlyLocked, setIsOnceOnlyLocked] = useState(true);
  const [isKafkaEnabled, setIsKafkaEnabled] = useState(true);
  const [installCopied, setInstallCopied] = useState(false);

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText("npm install @bogota/ui-kit");
      setInstallCopied(true);
      setTimeout(() => setInstallCopied(false), 2200);
    } catch (err) {
      console.error("Error al copiar comando:", err);
    }
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* 1. BREADCRUMB & HERO DE CABECERA */}
      <section className="w-full bg-surface-container-lowest shadow-xs border-b border-surface-container-highest/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-4">
          {/* Breadcrumb institucional */}
          <nav
            aria-label="Ruta de navegación"
            className="flex items-center gap-2 text-xs sm:text-sm font-body text-on-surface-variant flex-wrap"
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
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface-variant">Módulos</span>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface-variant font-medium">Developer KIT</span>
            <span className="text-outline-variant">/</span>
            <span aria-current="page" className="text-primary font-semibold">
              Sandbox &amp; Librerías
            </span>
          </nav>

          {/* Badges técnicos e Identificador de Versión */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-body text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#1B7A2E]/10 text-[#1B7A2E] font-semibold">
              <span
                className="w-2 h-2 rounded-full bg-[#1B7A2E] animate-pulse"
                aria-hidden="true"
              />
              <span>SDK Distrital v2.4.1 (Stable)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-tertiary/10 text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                accessibility_new
              </span>
              <span>WCAG 2.2 AA Nativo</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-surface-container-high text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                code_blocks
              </span>
              <span>TypeScript Ready (TS 5.4+)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-secondary-fixed/40 text-on-secondary-fixed font-semibold">
              <span
                className="material-symbols-outlined text-[15px] text-secondary"
                aria-hidden="true"
              >
                verified
              </span>
              <span> / TS Compliant</span>
            </span>
          </div>

          {/* Título y Lead */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
            <div className="max-w-3xl flex flex-col gap-2">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight font-bold">
                Developer KIT: <span className="text-primary">Sandbox &amp; Catálogo</span>
              </h1>
              <p className="font-body text-sm sm:text-base lg:text-lg text-on-surface-variant leading-relaxed">
                Librerías oficiales, web components y sandbox interactivo para acelerar el
                desarrollo y garantizar la interoperabilidad y el principio{" "}
                <strong className="text-on-surface font-semibold">Once-Only</strong> en todos los
                trámites digitales del Distrito.
              </p>
            </div>

            {/* Botonera de Acciones Rápidas */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-body">
              <button
                type="button"
                onClick={handleCopyInstall}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-primary text-on-primary font-heading text-xs sm:text-sm font-semibold hover:bg-primary-container focus-visible:ring-2 focus-visible:ring-tertiary transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  terminal
                </span>
                <span>{installCopied ? "¡Copiado npm i!" : "Instalar @bogota/ui-kit"}</span>
              </button>

              <a
                href="https://storybook.js.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[5px] bg-surface-container-lowest text-primary font-heading text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors shadow-xs border border-surface-container-highest focus-visible:ring-2 focus-visible:ring-tertiary"
              >
                <span
                  className="material-symbols-outlined text-[18px] text-tertiary"
                  aria-hidden="true"
                >
                  auto_stories
                </span>
                <span>Storybook Distrital</span>
              </a>

              <a
                href="/developer/building-blocks/pagos-distritales"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[5px] bg-surface-container-lowest text-on-surface font-heading text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors shadow-xs border border-surface-container-highest focus-visible:ring-2 focus-visible:ring-tertiary"
              >
                <span
                  className="material-symbols-outlined text-[18px] text-secondary"
                  aria-hidden="true"
                >
                  api
                </span>
                <span>Swagger / OpenAPI</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LAYOUT PRINCIPAL DE 3 COLUMNAS: SIDEBAR + PLAYGROUND + PANEL DE CONTROL */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMNA A: SIDEBAR TÉCNICA (3 columnas ~ 25%) */}
          <DevSidebarTree
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
          />

          {/* COLUMNA B: PLAYGROUND INTERACTIVO FORMULARIO ONCE-ONLY (6 columnas ~ 50%) */}
          <OnceOnlyPlayground
            actorType={actorType}
            isSSOAutofill={isSSOAutofill}
            simulateValidationError={simulateValidationError}
            isOnceOnlyLocked={isOnceOnlyLocked}
            isKafkaEnabled={isKafkaEnabled}
          />

          {/* COLUMNA C: PANEL DE PROPIEDADES DINÁMICAS / CONTROLES DE ESTADO (3 columnas ~ 25%) */}
          <DynamicPropsPanel
            actorType={actorType}
            onChangeActorType={setActorType}
            isSSOAutofill={isSSOAutofill}
            onToggleSSOAutofill={setIsSSOAutofill}
            simulateValidationError={simulateValidationError}
            onToggleValidationError={setSimulateValidationError}
            isOnceOnlyLocked={isOnceOnlyLocked}
            onToggleOnceOnlyLocked={setIsOnceOnlyLocked}
            isKafkaEnabled={isKafkaEnabled}
            onToggleKafka={setIsKafkaEnabled}
          />
        </div>

        {/* 3. CAJA INFERIOR OSCURA: CODE SNIPPETS & REPOSITORIO LISTO PARA COPIAR */}
        <DarkIdeCodeConsole />
      </main>

      {/* 4. BANNER DE RECURSOS PARA DESARROLLADORES Y SOPORTE B2G */}
      <DevSupportBanner />
    </div>
  );
}
