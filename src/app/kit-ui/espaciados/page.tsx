"use client";

import { SidebarKitUi } from "@/components/ui-kit/SidebarKitUi";
import {
  ArrowRight,
  CheckCircle2,
  Columns,
  Grid,
  Layers,
  Layout,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type SpacingTabKey = "escala" | "grilla" | "cotas";

const SPACING_STEPS = [
  {
    token: "Space-01",
    px: 4,
    label: "4px",
    rem: "0.25rem",
    tailwind: "space-1 / p-1 / gap-1",
    use: "Micro-separaciones, padding en badges minúsculos",
  },
  {
    token: "Space-02",
    px: 8,
    label: "8px",
    rem: "0.5rem",
    tailwind: "space-2 / p-2 / gap-2",
    use: "Separación entre icono y texto, padding en chips",
  },
  {
    token: "Space-03",
    px: 12,
    label: "12px",
    rem: "0.75rem",
    tailwind: "space-3 / p-3 / gap-3",
    use: "Padding interno en campos de texto (inputs) y botones compactos",
  },
  {
    token: "Space-04",
    px: 16,
    label: "16px",
    rem: "1rem",
    tailwind: "space-4 / p-4 / gap-4",
    use: "Separación estándar entre párrafos, márgenes móviles, padding base",
  },
  {
    token: "Space-05",
    px: 24,
    label: "24px",
    rem: "1.5rem",
    tailwind: "space-6 / p-6 / gap-6",
    use: "Gutter entre columnas web, padding en tarjetas estándar",
  },
  {
    token: "Space-06",
    px: 32,
    label: "32px",
    rem: "2rem",
    tailwind: "space-8 / p-8 / gap-8",
    use: "Separación entre bloques funcionales y secciones secundarias",
  },
  {
    token: "Space-07",
    px: 48,
    label: "48px",
    rem: "3rem",
    tailwind: "space-12 / p-12 / gap-12",
    use: "Separación entre macro-secciones y padding en hero containers",
  },
  {
    token: "Space-08",
    px: 64,
    label: "64px",
    rem: "4rem",
    tailwind: "space-16 / p-16 / gap-16",
    use: "Márgenes superiores de página y espaciado de cabecera distrital",
  },
];

const WEB_COLUMNS = Array.from({ length: 12 }, (_, i) => `wc-${i + 1}`);
const TABLET_COLUMNS = Array.from({ length: 8 }, (_, i) => `tc-${i + 1}`);
const MOBILE_COLUMNS = Array.from({ length: 4 }, (_, i) => `mc-${i + 1}`);

export default function EspaciadosPage() {
  const [activeTab, setActiveTab] = useState<SpacingTabKey>("escala");

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen text-on-surface">
      {/* 1. Sub-Header Institucional con Migas de Pan */}
      <div className="w-full bg-surface-container-low py-3.5 border-b border-surface-container-high shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Ruta de navegación"
            className="flex items-center gap-1.5 font-body text-xs sm:text-sm text-on-surface-variant flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              Inicio
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <Link
              href="/kit-ui/colores"
              className="hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
            >
              Kit UI
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-on-surface-variant">Estilos y Fundamentos</span>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-primary font-semibold" aria-current="page">
              Grilla y Espaciados
            </span>
          </nav>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-[#CC0E35]/10 text-primary text-xs font-semibold border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Kit UI Bogotá
            </span>
          </div>
        </div>
      </div>

      {/* 2. Layout Maestro de 2 Columnas (Flujo Paralelo) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* COLUMNA IZQUIERDA: Sidebar Oficial del Kit UI */}
          <SidebarKitUi />

          {/* COLUMNA DERECHA: Documentación Viva */}
          <main className="flex-1 min-w-0 flex flex-col gap-8 w-full" id="main-content">
            {/* Encabezado del Módulo */}
            <article className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-sm border border-surface-container-high flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-heading font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  <span>Fundamento de Estructura y Ritmo</span>
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-medium">
                  Base = 4px • v1.0
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                  Grilla y Espaciados (Múltiplos de 4px)
                </h1>
                <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">
                  Establece el sistema de separación entre elementos mediante una escala definida
                  que garantiza alineación, consistencia en márgenes y equilibrio visual en todo el
                  ecosistema digital de la Alcaldía Mayor de Bogotá D.C.
                </p>
              </div>

              {/* Franja de especificaciones rápidas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-surface-container-high font-body text-xs mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-on-surface-variant">Escala Base:</span>
                  <strong className="text-on-surface font-semibold">Múltiplos de 4px</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="text-on-surface-variant">Grillas:</span>
                  <strong className="text-on-surface font-semibold">12, 8 y 4 Columnas</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B7A2E]" />
                  <span className="text-on-surface-variant">Cotas:</span>
                  <strong className="text-[#1B7A2E] font-semibold">16px, 24px y 48px</strong>
                </div>
              </div>
            </article>

            {/* Pestañas Internas */}
            <div className="flex flex-col gap-6 w-full">
              <div
                className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
                role="tablist"
                aria-label="Pestañas de Grilla y Espaciados"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-escala"
                  aria-controls="panel-escala"
                  aria-selected={activeTab === "escala"}
                  onClick={() => setActiveTab("escala")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${
                    activeTab === "escala"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">straighten</span>
                  <span>Escala de Espaciado</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-grilla"
                  aria-controls="panel-grilla"
                  aria-selected={activeTab === "grilla"}
                  onClick={() => setActiveTab("grilla")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${
                    activeTab === "grilla"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">view_column</span>
                  <span>Grilla Responsiva</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-cotas"
                  aria-controls="panel-cotas"
                  aria-selected={activeTab === "cotas"}
                  onClick={() => setActiveTab("cotas")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${
                    activeTab === "cotas"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
                  <span>Cotas de Componente</span>
                </button>
              </div>

              {/* TAB 1: ESCALA DE ESPACIADO */}
              {activeTab === "escala" && (
                <section
                  id="panel-escala"
                  role="tabpanel"
                  aria-labelledby="tab-escala"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Sistema Modular de Espaciados (Ritmo Base 4px)
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Toda distancia de márgenes, rellenos internos (paddings) y separaciones
                        flexibles (gaps) debe seleccionarse estrictamente de esta escala de 8
                        peldaños para mantener la armonía matemática del layout.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 font-body bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs">
                      {SPACING_STEPS.map((step) => (
                        <div
                          key={step.token}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[8px] bg-surface-container-low border border-surface-container-high hover:border-primary/40 transition-colors"
                        >
                          <div className="flex items-center gap-3 w-48 shrink-0">
                            <span className="font-mono text-xs font-bold text-primary">
                              {step.token}
                            </span>
                            <span className="font-mono text-xs text-on-surface font-semibold">
                              {step.label}
                            </span>
                            <span className="text-[11px] text-on-surface-variant">
                              ({step.rem})
                            </span>
                          </div>

                          <div className="flex-1 flex items-center gap-4">
                            <div
                              className="h-7 rounded-[4px] bg-[#CC0E35]/25 border border-[#CC0E35] flex items-center justify-center text-[10px] font-mono text-primary font-bold shadow-xs shrink-0"
                              style={{ width: `${Math.max(step.px * 3.5, 28)}px` }}
                            >
                              {step.label}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[11px] font-mono text-on-surface font-medium">
                                {step.tailwind}
                              </span>
                              <span className="text-[11px] text-on-surface-variant font-body hidden md:inline">
                                {step.use}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 2: GRILLA RESPONSIVA */}
              {activeTab === "grilla" && (
                <section
                  id="panel-grilla"
                  role="tabpanel"
                  aria-labelledby="tab-grilla"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Las 3 Grillas Responsivas Oficiales del Distrito
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Configuración geométrica recomendada para Web Desktop (12 columnas), Tablet
                        (8 columnas) y Dispositivos Móviles (4 columnas).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Web Desktop */}
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col justify-between gap-5">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-bold text-base text-primary">
                              Web (Desktop)
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                              ≥ 1024px
                            </span>
                          </div>
                          <ul className="text-xs font-body text-on-surface-variant space-y-2 mt-2">
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Columnas:</span>
                              <strong className="text-on-surface">12 Columnas</strong>
                            </li>
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Gutter (Canal):</span>
                              <strong className="text-on-surface">24px (Space-05)</strong>
                            </li>
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Margen Lateral:</span>
                              <strong className="text-on-surface">80px</strong>
                            </li>
                            <li className="flex justify-between">
                              <span>Ancho Máximo:</span>
                              <strong className="text-primary font-mono">1280px (max-w-7xl)</strong>
                            </li>
                          </ul>
                        </div>

                        {/* Miniatura visual 12 cols */}
                        <div className="grid grid-cols-12 gap-1 p-2.5 bg-surface-container-low rounded border border-surface-container-high">
                          {WEB_COLUMNS.map((colId) => (
                            <div
                              key={colId}
                              className="h-8 rounded-[2px] bg-primary/20 border border-primary/40 flex items-center justify-center text-[8px] font-mono text-primary font-bold"
                            >
                              1
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tablet */}
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col justify-between gap-5">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-bold text-base text-tertiary">
                              Tablet
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                              768px – 1023px
                            </span>
                          </div>
                          <ul className="text-xs font-body text-on-surface-variant space-y-2 mt-2">
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Columnas:</span>
                              <strong className="text-on-surface">8 Columnas</strong>
                            </li>
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Gutter (Canal):</span>
                              <strong className="text-on-surface">24px (Space-05)</strong>
                            </li>
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Margen Lateral:</span>
                              <strong className="text-on-surface">80px</strong>
                            </li>
                            <li className="flex justify-between">
                              <span>Fluidez:</span>
                              <strong className="text-tertiary font-mono">100% W-Fluid</strong>
                            </li>
                          </ul>
                        </div>

                        {/* Miniatura visual 8 cols */}
                        <div className="grid grid-cols-8 gap-1.5 p-2.5 bg-surface-container-low rounded border border-surface-container-high">
                          {TABLET_COLUMNS.map((colId) => (
                            <div
                              key={colId}
                              className="h-8 rounded-[2px] bg-tertiary/20 border border-tertiary/40 flex items-center justify-center text-[8px] font-mono text-tertiary font-bold"
                            >
                              1
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Móvil */}
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col justify-between gap-5">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-bold text-base text-[#1B7A2E]">
                              Móvil
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                              &lt; 768px
                            </span>
                          </div>
                          <ul className="text-xs font-body text-on-surface-variant space-y-2 mt-2">
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Columnas:</span>
                              <strong className="text-on-surface">4 Columnas</strong>
                            </li>
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Gutter (Canal):</span>
                              <strong className="text-on-surface">16px (Space-04)</strong>
                            </li>
                            <li className="flex justify-between border-b border-surface-container-high pb-1.5">
                              <span>Margen Lateral:</span>
                              <strong className="text-on-surface">24px</strong>
                            </li>
                            <li className="flex justify-between">
                              <span>Área Táctil Mín:</span>
                              <strong className="text-[#1B7A2E] font-mono">≥ 44×44 px</strong>
                            </li>
                          </ul>
                        </div>

                        {/* Miniatura visual 4 cols */}
                        <div className="grid grid-cols-4 gap-2 p-2.5 bg-surface-container-low rounded border border-surface-container-high">
                          {MOBILE_COLUMNS.map((colId) => (
                            <div
                              key={colId}
                              className="h-8 rounded-[2px] bg-[#1B7A2E]/20 border border-[#1B7A2E]/40 flex items-center justify-center text-[8px] font-mono text-[#1B7A2E] font-bold"
                            >
                              1
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 3: COTAS DE COMPONENTE */}
              {activeTab === "cotas" && (
                <section
                  id="panel-cotas"
                  role="tabpanel"
                  aria-labelledby="tab-cotas"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Diagrama de Cotas y Rellenos de Interfaz
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Demostración técnica de cómo se combinan paddings de 16px, 24px y 48px en
                        una tarjeta de trámite oficial distrital.
                      </p>
                    </div>

                    {/* Tarjeta de Trámite con Cotas Visuales */}
                    <div className="relative p-8 bg-surface-container-low rounded-[15px] border-2 border-dashed border-primary/40 flex flex-col items-center">
                      <div className="w-full max-w-xl bg-white rounded-[15px] p-6 border-2 border-[#CC0E35] shadow-md flex flex-col gap-4 relative">
                        {/* Indicador de Cota Superior 24px */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#CC0E35] text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                          <span>Padding Top: 24px (Space-05)</span>
                        </div>

                        {/* Contenido de la Tarjeta */}
                        <div className="flex items-start justify-between gap-3 border-b border-surface-container-high pb-4 relative">
                          {/* Cota de Separación 16px */}
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-tertiary text-white text-[10px] font-mono px-1.5 py-0.5 rounded rotate-90 shadow-xs">
                            <span>16px</span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-mono font-bold text-primary uppercase">
                              Trámite Destacado
                            </span>
                            <h3 className="font-heading font-bold text-lg text-on-surface">
                              Certificado Catastral en Línea
                            </h3>
                            <p className="font-body text-xs text-on-surface-variant">
                              Expedición inmediata con código de verificación QR y firma digital.
                            </p>
                          </div>

                          <span className="px-2.5 py-1 rounded-full bg-[#1B7A2E]/10 text-[#1B7A2E] text-xs font-semibold shrink-0">
                            Gratuito
                          </span>
                        </div>

                        {/* Bloque inferior con padding 16px y botón 48px */}
                        <div className="flex items-center justify-between gap-4 pt-2">
                          <span className="text-xs font-mono text-on-surface-variant">
                            Tiempo estimado: 5 minutos
                          </span>
                          <button
                            type="button"
                            className="min-h-[48px] h-12 px-6 rounded-full bg-[#CC0E35] text-white font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs hover:bg-[#BA0D30] transition-colors"
                          >
                            <span>Iniciar Trámite</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Cota Inferior */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#CC0E35] text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                          <span>Padding Bottom: 24px (Space-05)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
