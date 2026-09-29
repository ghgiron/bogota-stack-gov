"use client";

import { SidebarKitUi } from "@/components/ui-kit/SidebarKitUi";
import {
  Box,
  CheckCircle2,
  Copy,
  Layers,
  Maximize2,
  ShieldCheck,
  Sparkles,
  Square,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type BorderTabKey = "radios" | "sombras" | "trazos";

const RADIOS_CONFIG = [
  {
    token: "rounded-[5px]",
    name: "Radio Rectangular (5px)",
    role: "Controles de Entrada y Badges",
    description:
      "Aplicado a inputs de formulario, selectores desplegables, textareas y badges rectangulares.",
    tailwind: "rounded-[5px]",
    css: "border-radius: 5px;",
    sample: "Input / Badge (5px)",
    sampleClass: "rounded-[5px]",
  },
  {
    token: "rounded-[15px]",
    name: "Radio Contenedor (15px)",
    role: "Tarjetas, Modales y Superficies",
    description:
      "Aplicado a tarjetas principales de trámite, paneles de contenido, diálogos modales y sidebars.",
    tailwind: "rounded-[15px]",
    css: "border-radius: 15px;",
    sample: "Tarjeta / Contenedor (15px)",
    sampleClass: "rounded-[15px]",
  },
  {
    token: "rounded-full",
    name: "Radio Píldora (Full / 9999px)",
    role: "Botones y Chips de Filtro",
    description:
      "Forma de píldora oficial para todos los botones de acción (Primario, Secundario, Terciario) y chips.",
    tailwind: "rounded-full",
    css: "border-radius: 9999px;",
    sample: "Botón de Acción (Píldora)",
    sampleClass: "rounded-full",
  },
];

const SHADOWS_CONFIG = [
  {
    level: "Reposo Sutil (shadow-xs)",
    role: "Controles de formulario y tarjetas en estado normal",
    tailwind: "shadow-xs",
    css: "box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);",
    previewClass: "shadow-xs",
  },
  {
    level: "Elevación Media (shadow-sm / shadow)",
    role: "Tarjetas destacadas y menús desplegables / dropdowns",
    tailwind: "shadow-sm",
    css: "box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);",
    previewClass: "shadow-sm",
  },
  {
    level: "Elevación Activa (shadow-md)",
    role: "Feedback visual en estado hover de tarjetas y botones",
    tailwind: "shadow-md",
    css: "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);",
    previewClass: "shadow-md",
  },
  {
    level: "Flotante Máximo (shadow-lg / shadow-xl)",
    role: "Diálogos modales, alertas superpuestas y drawers",
    tailwind: "shadow-lg",
    css: "box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);",
    previewClass: "shadow-lg",
  },
];

const STROKES_CONFIG = [
  {
    name: "Trazo Base Neutro (1px)",
    hex: "#B0B0B0 / #E4E2E1",
    role: "Bordes perimetrales de inputs, tarjetas inactivas y divisores",
    borderClass: "border border-[#B0B0B0]",
    tailwind: "border border-surface-container-high / border-[#B0B0B0]",
  },
  {
    name: "Trazo de Foco Accesible (2px)",
    hex: "#0049AE",
    role: "Anillo de foco por teclado visible y  según WCAG 2.4.7",
    borderClass: "border-2 border-[#0049AE] ring-2 ring-[#0049AE]/20",
    tailwind: "border-2 border-[#0049AE] focus-visible:ring-2",
  },
  {
    name: "Trazo de Selección / Activo (3px o 4px)",
    hex: "#CC0E35",
    role: "Indicador de navegación activa en sidebars y tarjetas seleccionadas",
    borderClass: "border-l-4 border-l-[#CC0E35] border border-surface-container-high",
    tailwind: "border-l-4 border-l-[#CC0E35]",
  },
];

export default function BordesPage() {
  const [activeTab, setActiveTab] = useState<BorderTabKey>("radios");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

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
              Bordes y Sombras
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
                  <span className="material-symbols-outlined text-[18px]">border_style</span>
                  <span>Fundamento de Geometría y Superficies</span>
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-medium">
                  Geometría Oficial • v1.0
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                  Bordes, Radios y Elevación
                </h1>
                <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">
                  Directrices geométricas de curvatura y profundidad que definen la jerarquía de las
                  superficies y contenedores del ecosistema digital distrital de Bogotá.
                </p>
              </div>

              {/* Franja de especificaciones rápidas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-surface-container-high font-body text-xs mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-on-surface-variant">Radios:</span>
                  <strong className="text-on-surface font-semibold">
                    5px · 15px · rounded-full
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="text-on-surface-variant">Trazos:</span>
                  <strong className="text-on-surface font-semibold">
                    1px · 2px (foco) · 3px (activo)
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B7A2E]" />
                  <span className="text-on-surface-variant">Elevación:</span>
                  <strong className="text-[#1B7A2E] font-semibold">shadow-xs a shadow-lg</strong>
                </div>
              </div>
            </article>

            {/* Pestañas Internas */}
            <div className="flex flex-col gap-6 w-full">
              <div
                className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
                role="tablist"
                aria-label="Pestañas de Bordes y Sombras"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-radios"
                  aria-controls="panel-radios"
                  aria-selected={activeTab === "radios"}
                  onClick={() => setActiveTab("radios")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${
                    activeTab === "radios"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">rounded_corner</span>
                  <span>Radios de Esquina</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-sombras"
                  aria-controls="panel-sombras"
                  aria-selected={activeTab === "sombras"}
                  onClick={() => setActiveTab("sombras")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${
                    activeTab === "sombras"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">layers</span>
                  <span>Sombras y Elevación</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-trazos"
                  aria-controls="panel-trazos"
                  aria-selected={activeTab === "trazos"}
                  onClick={() => setActiveTab("trazos")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${
                    activeTab === "trazos"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">line_weight</span>
                  <span>Trazos y Bordes</span>
                </button>
              </div>

              {/* TAB 1: RADIOS DE ESQUINA */}
              {activeTab === "radios" && (
                <section
                  id="panel-radios"
                  role="tabpanel"
                  aria-labelledby="tab-radios"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Radios Oficiales de Curvatura
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        El Kit UI Bogotá estandariza tres familias de curvatura para mantener
                        consistencia en los puntos de contacto.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {RADIOS_CONFIG.map((item) => (
                        <div
                          key={item.token}
                          className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col justify-between gap-5"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
                              <span className="font-heading font-bold text-sm text-primary">
                                {item.name}
                              </span>
                              <span className="font-mono text-xs text-on-surface-variant font-bold">
                                {item.token}
                              </span>
                            </div>

                            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                              {item.description}
                            </p>

                            {/* Muestra Visual */}
                            <div className="pt-2 flex justify-center">
                              <div
                                className={`w-full h-20 bg-surface-container-low border-2 border-primary/40 flex items-center justify-center font-heading text-xs font-semibold text-primary transition-all hover:scale-[1.02] shadow-xs ${item.sampleClass}`}
                              >
                                {item.sample}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-surface-container-high">
                            <span className="font-mono text-[11px] text-on-surface-variant">
                              {item.css}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(item.tailwind)}
                              className="text-[11px] font-mono text-primary flex items-center gap-1 hover:underline"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedToken === item.tailwind ? "Copiado" : "Copiar"}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 2: SOMBRAS Y ELEVACIÓN */}
              {activeTab === "sombras" && (
                <section
                  id="panel-sombras"
                  role="tabpanel"
                  aria-labelledby="tab-sombras"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Escala de Elevación y Sombras
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Proporciona pistas visuales de profundidad en el eje Z para diferenciar
                        contenedores base de elementos interactivos superpuestos.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {SHADOWS_CONFIG.map((shadow) => (
                        <div
                          key={shadow.level}
                          className="bg-white rounded-[15px] p-5 border border-surface-container-high flex flex-col justify-between gap-4"
                        >
                          <div className="flex flex-col gap-2">
                            <span className="font-heading font-bold text-sm text-on-surface">
                              {shadow.level}
                            </span>
                            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                              {shadow.role}
                            </p>
                          </div>

                          {/* Visual Demo Card */}
                          <div className="pt-2 flex justify-center">
                            <div
                              className={`w-full h-24 bg-white rounded-[10px] border border-surface-container-high flex items-center justify-center font-heading text-xs font-bold text-primary transition-all hover:scale-105 ${shadow.previewClass}`}
                            >
                              {shadow.tailwind}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between">
                            <span className="font-mono text-[10px] text-on-surface-variant truncate">
                              {shadow.tailwind}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(shadow.tailwind)}
                              className="text-[11px] font-mono text-primary flex items-center gap-1 hover:underline"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedToken === shadow.tailwind ? "Copiado" : "Copiar"}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 3: TRAZOS Y BORDES */}
              {activeTab === "trazos" && (
                <section
                  id="panel-trazos"
                  role="tabpanel"
                  aria-labelledby="tab-trazos"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Grosor y Función de Trazos
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Los trazos estructuran los límites de componentes y comunican estados de
                        foco, selección y reposo.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {STROKES_CONFIG.map((stroke) => (
                        <div
                          key={stroke.name}
                          className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col justify-between gap-4"
                        >
                          <div className="flex flex-col gap-2">
                            <h3 className="font-heading font-bold text-sm text-on-surface">
                              {stroke.name}
                            </h3>
                            <span className="font-mono text-xs text-primary font-bold">
                              {stroke.hex}
                            </span>
                            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                              {stroke.role}
                            </p>
                          </div>

                          {/* Visual Demonstration */}
                          <div className="pt-2">
                            <div
                              className={`w-full p-4 rounded-[8px] bg-surface-container-low font-body text-xs text-on-surface flex items-center justify-between ${stroke.borderClass}`}
                            >
                              <span>Ejemplo de Control</span>
                              <span className="font-mono text-[10px] text-on-surface-variant">
                                Activo
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between">
                            <span className="font-mono text-[10px] text-on-surface-variant">
                              {stroke.tailwind}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(stroke.tailwind)}
                              className="text-[11px] font-mono text-primary flex items-center gap-1 hover:underline"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedToken === stroke.tailwind ? "Copiado" : "Copiar"}</span>
                            </button>
                          </div>
                        </div>
                      ))}
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
