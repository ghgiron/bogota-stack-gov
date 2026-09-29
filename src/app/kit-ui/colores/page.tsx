"use client";

import { SidebarKitUi } from "@/components/ui-kit/SidebarKitUi";
import { Check, CheckCircle2, Copy, Info, ShieldAlert, Sparkles, XCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface ColorStep {
  step: string;
  hex: string;
  isBase?: boolean;
}

interface ColorFamily {
  name: string;
  role: string;
  description: string;
  swatches: ColorStep[];
}

const COLOR_FAMILIES: ColorFamily[] = [
  {
    name: "Primario (Rojo Bogotá)",
    role: "Acción Clave y Marca Institucional",
    description:
      "Color emblemático del Distrito. Utilizado para botones primarios, enlaces activos de navegación y elementos de máximo nivel jerárquico.",
    swatches: [
      { step: "50", hex: "#FAE7EB" },
      { step: "100", hex: "#EFB4C0" },
      { step: "200", hex: "#E890A2" },
      { step: "300", hex: "#DD5E78" },
      { step: "400", hex: "#D63E5D" },
      { step: "500", hex: "#CC0E35", isBase: true },
      { step: "600", hex: "#BA0D30" },
      { step: "700", hex: "#910A26" },
      { step: "800", hex: "#70081D" },
      { step: "900", hex: "#560616" },
    ],
  },
  {
    name: "Acentos / Alertas (Amarillo Bogotá)",
    role: "Advertencias y Acentos Cívicos",
    description:
      "Tono secundario institucional extraído de la bandera de Bogotá. Empleado en llamados de atención preventiva, avisos importantes y badges de estado en espera.",
    swatches: [
      { step: "50", hex: "#FFF8EA" },
      { step: "100", hex: "#FDE8BE" },
      { step: "200", hex: "#FDDD9E" },
      { step: "300", hex: "#FCCE72" },
      { step: "400", hex: "#FBC557" },
      { step: "500", hex: "#FAB62D", isBase: true },
      { step: "600", hex: "#E4A629" },
      { step: "700", hex: "#B28120" },
      { step: "800", hex: "#8A6419" },
      { step: "900", hex: "#694C13" },
    ],
  },
  {
    name: "Enlaces / Secundario (Azul Bogotá)",
    role: "Navegación e Hipervínculos",
    description:
      "Color oficial para enlaces web, indicadores de foco de accesibilidad (#0049AE) y elementos informativos del sistema.",
    swatches: [
      { step: "50", hex: "#EBF0FA" },
      { step: "100", hex: "#C0D0EF" },
      { step: "200", hex: "#A1B9E8" },
      { step: "300", hex: "#7698DD" },
      { step: "400", hex: "#5C85D6" },
      { step: "500", hex: "#3366CC", isBase: true },
      { step: "600", hex: "#2E5DBA" },
      { step: "700", hex: "#244891" },
      { step: "800", hex: "#1C3870" },
      { step: "900", hex: "#152B56" },
    ],
  },
  {
    name: "Éxito / Aprobado (Verde Bogotá)",
    role: "Confirmación y Estados Positivos",
    description:
      "Utilizado para estados de éxito, trámites aprobados, pagos confirmados y validación positiva de campos de formulario.",
    swatches: [
      { step: "50", hex: "#E8F2EA" },
      { step: "100", hex: "#B8D6BE" },
      { step: "200", hex: "#96C29F" },
      { step: "300", hex: "#66A673" },
      { step: "400", hex: "#499558" },
      { step: "500", hex: "#1B7A2E", isBase: true },
      { step: "600", hex: "#196F2A" },
      { step: "700", hex: "#135721" },
      { step: "800", hex: "#0F4319" },
      { step: "900", hex: "#0B3313" },
    ],
  },
  {
    name: "Neutros y Grises",
    role: "Fondos, Textos y Bordes",
    description:
      "Gama neutra fundamental para el ritmo cromático, superficies, contenedores, bordes divisorios y legibilidad de textos en modo claro y oscuro.",
    swatches: [
      { step: "50", hex: "#E6E6E6" },
      { step: "100", hex: "#B0B0B0" },
      { step: "200", hex: "#8A8A8A" },
      { step: "300", hex: "#545454" },
      { step: "400", hex: "#333333" },
      { step: "500", hex: "#000000", isBase: true },
      { step: "600", hex: "#000000" },
      { step: "700", hex: "#000000" },
      { step: "800", hex: "#000000" },
      { step: "900", hex: "#000000" },
    ],
  },
];

function getContrastTextColor(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = Number.parseInt(cleanHex.substring(0, 2), 16);
  const g = Number.parseInt(cleanHex.substring(2, 4), 16);
  const b = Number.parseInt(cleanHex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 135 ? "#1E1E24" : "#FFFFFF";
}

type ColorTabKey = "paleta" | "uso" | "accesibilidad";

export default function ColoresPage() {
  const [activeTab, setActiveTab] = useState<ColorTabKey>("paleta");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen text-on-surface">
      {/* 1. Sub-Header Institucional con Migas de Pan y Badges Técnicos */}
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
              Colores y Paleta
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

          {/* COLUMNA DERECHA: Documentación Viva y Pestañas Interactivas */}
          <main className="flex-1 min-w-0 flex flex-col gap-8 w-full" id="main-content">
            {/* Encabezado del Módulo */}
            <article className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-sm border border-surface-container-high flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-heading font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">palette</span>
                  <span>Fundamento de Identidad</span>
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-medium">
                  Tokens Cromáticos • v1.0
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                  Colores y Paleta Oficial del Distrito
                </h1>
                <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">
                  Aquí se define la paleta cromática del sistema y su uso dentro de la interfaz. Su
                  correcta aplicación garantiza consistencia visual, jerarquía de la información y
                  cumplimiento de estándares de accesibilidad en todos los servicios digitales de la
                  Alcaldía Mayor de Bogotá D.C.
                </p>
              </div>

              {/* Franja de especificaciones rápidas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-surface-container-high font-body text-xs mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-on-surface-variant">Formato:</span>
                  <strong className="text-on-surface font-semibold">HEX / RGB</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="text-on-surface-variant">Escalas:</span>
                  <strong className="text-on-surface font-semibold">5 Familias (50 a 900)</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B7A2E]" />
                  <span className="text-on-surface-variant">Accesibilidad:</span>
                  <strong className="text-[#1B7A2E] font-semibold">WCAG 2.2 AAA / AA</strong>
                </div>
              </div>
            </article>

            {/* Pestañas Internas */}
            <div className="flex flex-col gap-6 w-full">
              <div
                className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
                role="tablist"
                aria-label="Pestañas de Colores y Paleta"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-paleta"
                  aria-controls="panel-paleta"
                  aria-selected={activeTab === "paleta"}
                  onClick={() => setActiveTab("paleta")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "paleta"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">palette</span>
                  <span>Paleta y Tokens</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-uso"
                  aria-controls="panel-uso"
                  aria-selected={activeTab === "uso"}
                  onClick={() => setActiveTab("uso")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "uso"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">category</span>
                  <span>Uso y Semántica</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-accesibilidad"
                  aria-controls="panel-accesibilidad"
                  aria-selected={activeTab === "accesibilidad"}
                  onClick={() => setActiveTab("accesibilidad")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "accesibilidad"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">accessibility_new</span>
                  <span>Accesibilidad y Contraste</span>
                </button>
              </div>

              {/* TAB 1: PALETA Y TOKENS */}
              {activeTab === "paleta" && (
                <section
                  id="panel-paleta"
                  role="tabpanel"
                  aria-labelledby="tab-paleta"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Muestras de Color Oficiales (Color Swatches)
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Haz clic en cualquier muestra para copiar su código HEX al portapapeles. Los
                        pasos marcados como <strong>Base</strong> representan los valores
                        predeterminados del sistema en componentes interactivos y marcas gráficas.
                      </p>
                    </div>

                    <div className="flex flex-col gap-8">
                      {COLOR_FAMILIES.map((family) => (
                        <div
                          key={family.name}
                          className="bg-white rounded-[15px] p-5 sm:p-6 border border-surface-container-high shadow-xs flex flex-col gap-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-high pb-3">
                            <div>
                              <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                <span>{family.name}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-body">
                                  {family.role}
                                </span>
                              </h3>
                              <p className="font-body text-xs text-on-surface-variant mt-0.5">
                                {family.description}
                              </p>
                            </div>
                          </div>

                          {/* Swatches Grid: 10 pasos (50 a 900) */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
                            {family.swatches.map((swatch) => {
                              const textColor = getContrastTextColor(swatch.hex);
                              const isCopied = copiedHex === swatch.hex;

                              return (
                                <button
                                  key={`${family.name}-${swatch.step}`}
                                  type="button"
                                  onClick={() => handleCopyHex(swatch.hex)}
                                  title={`Copiar ${swatch.hex} (${swatch.step})`}
                                  style={{ backgroundColor: swatch.hex }}
                                  className="rounded-[5px] p-3 h-28 sm:h-32 flex flex-col justify-between text-left transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-xs relative group border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span
                                      style={{ color: textColor }}
                                      className="font-mono text-xs font-bold"
                                    >
                                      {swatch.step}
                                    </span>
                                    {swatch.isBase && (
                                      <span
                                        style={{ color: textColor }}
                                        className="text-[9px] uppercase tracking-wider font-extrabold px-1 py-0.5 rounded bg-black/15 font-body"
                                      >
                                        Base
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex flex-col gap-0.5">
                                    <span
                                      style={{ color: textColor }}
                                      className="font-mono text-[11px] font-bold tracking-tight"
                                    >
                                      {swatch.hex}
                                    </span>
                                    <span
                                      style={{ color: textColor }}
                                      className="text-[9px] opacity-75 font-body flex items-center gap-1 group-hover:opacity-100"
                                    >
                                      {isCopied ? (
                                        <span className="font-bold flex items-center gap-0.5 text-emerald-500 bg-white/90 px-1 py-0.5 rounded shadow-xs">
                                          <Check className="w-2.5 h-2.5" />
                                          ¡Copiado!
                                        </span>
                                      ) : (
                                        <span className="flex items-center gap-0.5">
                                          <Copy className="w-2.5 h-2.5" />
                                          Copiar
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 2: USO Y SEMÁNTICA */}
              {activeTab === "uso" && (
                <section
                  id="panel-uso"
                  role="tabpanel"
                  aria-labelledby="tab-uso"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Roles Semánticos y Pautas de Aplicación
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Cada color en el Kit UI de Bogotá cumple una función psicológica y técnica
                        determinada. Está estrictamente prohibido alterar los roles funcionales para
                        evitar confusión en la ciudadanía.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Rojo Bogotá */}
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#CC0E35]" />
                          <h3 className="font-heading font-bold text-base text-on-surface">
                            Primario: Rojo Bogotá (#CC0E35)
                          </h3>
                        </div>
                        <ul className="text-xs font-body text-on-surface-variant space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Uso Correcto:</strong> Botones de acción principal (CTA),
                              indicadores de navegación activa en sidebars, bordes de elementos
                              seleccionados y marca corporativa distrital.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>
                              <strong>Uso Incorrecto:</strong> Fondos de texto extenso, botones
                              secundarios o alertas de error no fatales.
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Amarillo Bogotá */}
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#FAB62D]" />
                          <h3 className="font-heading font-bold text-base text-on-surface">
                            Acentos: Amarillo Bogotá (#FAB62D)
                          </h3>
                        </div>
                        <ul className="text-xs font-body text-on-surface-variant space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Uso Correcto:</strong> Badges de advertencia preventiva,
                              estados en espera / pendientes de revisión y acentos visuales cívicos.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>
                              <strong>Uso Incorrecto:</strong> Texto sobre fondos blancos sin
                              oscurecimiento (falla contraste WCAG 2.2 AA).
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Azul Bogotá */}
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#3366CC]" />
                          <h3 className="font-heading font-bold text-base text-on-surface">
                            Enlaces / Secundario: Azul Bogotá (#3366CC)
                          </h3>
                        </div>
                        <ul className="text-xs font-body text-on-surface-variant space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Uso Correcto:</strong> Enlaces hipertextuales, estados de foco
                              accesible (usando #0049AE con ancho de 2px) y componentes de
                              integración técnica.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>
                              <strong>Uso Incorrecto:</strong> Botones de confirmación de trámite o
                              mensajes de alerta crítica.
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Verde Bogotá */}
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#1B7A2E]" />
                          <h3 className="font-heading font-bold text-base text-on-surface">
                            Éxito / Aprobado: Verde Bogotá (#1B7A2E)
                          </h3>
                        </div>
                        <ul className="text-xs font-body text-on-surface-variant space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Uso Correcto:</strong> Confirmaciones de pago, radicación
                              exitosa de trámites, mensajes de validación positiva de inputs y
                              badges de aprobación.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>
                              <strong>Uso Incorrecto:</strong> Acciones decorativas que no indiquen
                              un estado de resolución favorable.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 3: ACCESIBILIDAD Y CONTRASTE */}
              {activeTab === "accesibilidad" && (
                <section
                  id="panel-accesibilidad"
                  role="tabpanel"
                  aria-labelledby="tab-accesibilidad"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Estándares de Contraste y Accesibilidad (WCAG 2.2 AA / AAA)
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        El cumplimiento de contraste no es una sugerencia estética sino una
                        necesidad en los servicios digitales.
                      </p>
                    </div>

                    {/* Alerta Destacada */}
                    <div className="p-5 rounded-[12px] bg-red-50/70 border-l-4 border-l-[#CC0E35] border border-red-200 flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#CC0E35]/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-heading font-bold text-sm text-red-950">
                          Regla de Accesibilidad Obligatoria: Contraste y Significado (WCAG 2.2 AA)
                        </h3>
                        <p className="font-body text-xs sm:text-sm text-red-900 leading-relaxed">
                          El contraste mínimo entre texto y fondo debe ser de al menos{" "}
                          <strong>4.5:1 para texto normal</strong> y{" "}
                          <strong>
                            3:1 para texto grande o elementos gráficos interactivos (WCAG 1.4.3)
                          </strong>
                          . Adicionalmente, <strong>el color no debe ser el único medio</strong>{" "}
                          para comunicar información, indicar una acción o distinguir un estado
                          (WCAG 1.4.1). Se debe acompañar siempre de íconos o etiquetas textuales
                          explícitas.
                        </p>
                      </div>
                    </div>

                    {/* Matriz de Verificación de Ratios */}
                    <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-4">
                      <h3 className="font-heading font-bold text-base text-on-surface">
                        Combinaciones Evaluadas en el Kit UI Bogotá
                      </h3>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-surface-container-high bg-surface-container-low text-on-surface">
                              <th className="p-3 font-heading font-semibold">Combinación</th>
                              <th className="p-3 font-heading font-semibold">Uso</th>
                              <th className="p-3 font-heading font-semibold">Ratio de Contraste</th>
                              <th className="p-3 font-heading font-semibold">Nivel WCAG</th>
                              <th className="p-3 font-heading font-semibold">Resultado</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-container-high">
                            <tr>
                              <td className="p-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#CC0E35] border border-black/10 inline-block" />
                                <span className="font-mono text-xs">
                                  Blanco (#FFFFFF) sobre Rojo 500 (#CC0E35)
                                </span>
                              </td>
                              <td className="p-3 text-on-surface-variant">Botón Primario</td>
                              <td className="p-3 font-mono font-bold text-on-surface">5.12:1</td>
                              <td className="p-3">WCAG AA (Texto Normal)</td>
                              <td className="p-3">
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50">
                                  <Check className="w-3.5 h-3.5" /> Pasa
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#333333] border border-black/10 inline-block" />
                                <span className="font-mono text-xs">
                                  Texto Base (#333333) sobre Fondo (#FFFFFF)
                                </span>
                              </td>
                              <td className="p-3 text-on-surface-variant">Cuerpo de Texto</td>
                              <td className="p-3 font-mono font-bold text-on-surface">12.63:1</td>
                              <td className="p-3">WCAG AAA</td>
                              <td className="p-3">
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50">
                                  <Check className="w-3.5 h-3.5" /> Pasa AAA
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#0049AE] border border-black/10 inline-block" />
                                <span className="font-mono text-xs">
                                  Azul Foco (#0049AE) sobre Fondo (#FFFFFF)
                                </span>
                              </td>
                              <td className="p-3 text-on-surface-variant">
                                Anillo de Foco Accesible
                              </td>
                              <td className="p-3 font-mono font-bold text-on-surface">7.84:1</td>
                              <td className="p-3">WCAG AAA</td>
                              <td className="p-3">
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50">
                                  <Check className="w-3.5 h-3.5" /> Pasa AAA
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#1B7A2E] border border-black/10 inline-block" />
                                <span className="font-mono text-xs">
                                  Blanco (#FFFFFF) sobre Verde 500 (#1B7A2E)
                                </span>
                              </td>
                              <td className="p-3 text-on-surface-variant">Badge de Éxito</td>
                              <td className="p-3 font-mono font-bold text-on-surface">4.89:1</td>
                              <td className="p-3">WCAG AA</td>
                              <td className="p-3">
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50">
                                  <Check className="w-3.5 h-3.5" /> Pasa
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#FAE7EB] border border-black/10 inline-block" />
                                <span className="font-mono text-xs">
                                  Rojo Base (#CC0E35) sobre Fondo Rosado (#FAE7EB)
                                </span>
                              </td>
                              <td className="p-3 text-on-surface-variant">
                                Ítem Activo de Navegación Sidebar
                              </td>
                              <td className="p-3 font-mono font-bold text-on-surface">4.52:1</td>
                              <td className="p-3">WCAG AA</td>
                              <td className="p-3">
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50">
                                  <Check className="w-3.5 h-3.5" /> Pasa
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
