"use client";

import { Check, Copy, ShieldAlert } from "lucide-react";
import type React from "react";
import { useState } from "react";

const WEB_COLUMNS = [
  "wc-1",
  "wc-2",
  "wc-3",
  "wc-4",
  "wc-5",
  "wc-6",
  "wc-7",
  "wc-8",
  "wc-9",
  "wc-10",
  "wc-11",
  "wc-12",
];
const TABLET_COLUMNS = ["tc-1", "tc-2", "tc-3", "tc-4", "tc-5", "tc-6", "tc-7", "tc-8"];
const MOBILE_COLUMNS = ["mc-1", "mc-2", "mc-3", "mc-4"];

export type FoundationsTabKey = "color" | "tipografia" | "grilla" | "iconos";

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
    name: "Enlaces (Azul Bogotá)",
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
    name: "Éxito (Verde Bogotá)",
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
    name: "Neutros (Grises)",
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

// Calcula si el texto sobre el fondo HEX debe ser blanco o negro (WCAG / YIQ)
function getContrastTextColor(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = Number.parseInt(cleanHex.substring(0, 2), 16);
  const g = Number.parseInt(cleanHex.substring(2, 4), 16);
  const b = Number.parseInt(cleanHex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 135 ? "#1E1E24" : "#FFFFFF";
}

const SPACING_STEPS = [
  { token: "Space-01", px: 4, label: "4px", rem: "0.25rem", tailwind: "space-1 / p-1" },
  { token: "Space-02", px: 8, label: "8px", rem: "0.5rem", tailwind: "space-2 / p-2" },
  { token: "Space-03", px: 12, label: "12px", rem: "0.75rem", tailwind: "space-3 / p-3" },
  { token: "Space-04", px: 16, label: "16px", rem: "1rem", tailwind: "space-4 / p-4" },
  { token: "Space-05", px: 24, label: "24px", rem: "1.5rem", tailwind: "space-6 / p-6" },
  { token: "Space-06", px: 32, label: "32px", rem: "2rem", tailwind: "space-8 / p-8" },
  { token: "Space-07", px: 48, label: "48px", rem: "3rem", tailwind: "space-12 / p-12" },
  { token: "Space-08", px: 64, label: "64px", rem: "4rem", tailwind: "space-16 / p-16" },
];

const ICONS_SAMPLE = [
  {
    icon: "smart_button",
    name: "Acción Clave",
    category: "Primario (Rojo)",
    hex: "#CC0E35",
    bg: "#FAE7EB",
    code: '<span className="material-symbols-outlined text-[#CC0E35]">smart_button</span>',
  },
  {
    icon: "warning",
    name: "Alerta / Acento",
    category: "Acentos (Amarillo)",
    hex: "#FAB62D",
    bg: "#FFF8EA",
    code: '<span className="material-symbols-outlined text-[#FAB62D]">warning</span>',
  },
  {
    icon: "open_in_new",
    name: "Enlace Externo",
    category: "Enlaces (Azul)",
    hex: "#3366CC",
    bg: "#EBF0FA",
    code: '<span className="material-symbols-outlined text-[#3366CC]">open_in_new</span>',
  },
  {
    icon: "check_circle",
    name: "Validado / Éxito",
    category: "Éxito (Verde)",
    hex: "#1B7A2E",
    bg: "#E8F2EA",
    code: '<span className="material-symbols-outlined text-[#1B7A2E]">check_circle</span>',
  },
  {
    icon: "description",
    name: "Expediente / Trámite",
    category: "Neutro (Gris)",
    hex: "#545454",
    bg: "#E6E6E6",
    code: '<span className="material-symbols-outlined text-[#545454]">description</span>',
  },
];

export const FoundationsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FoundationsTabKey>("color");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Barra de Pestañas Superiores (Estilo Obelisco BA & SGDS Singapur) */}
      <div
        className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
        role="tablist"
        aria-label="Pestañas de Fundamentos Visuales del Kit UI Bogotá"
      >
        <button
          type="button"
          role="tab"
          id="tab-color"
          aria-controls="panel-color"
          aria-selected={activeTab === "color"}
          onClick={() => setActiveTab("color")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "color"
            ? "border-[#CC0E35] text-[#CC0E35]"
            : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]">palette</span>
          <span>Color</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-tipografia"
          aria-controls="panel-tipografia"
          aria-selected={activeTab === "tipografia"}
          onClick={() => setActiveTab("tipografia")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "tipografia"
            ? "border-[#CC0E35] text-[#CC0E35]"
            : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]">text_fields</span>
          <span>Tipografía</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-grilla"
          aria-controls="panel-grilla"
          aria-selected={activeTab === "grilla"}
          onClick={() => setActiveTab("grilla")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "grilla"
            ? "border-[#CC0E35] text-[#CC0E35]"
            : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]">grid_view</span>
          <span>Grilla y Espaciados</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-iconos"
          aria-controls="panel-iconos"
          aria-selected={activeTab === "iconos"}
          onClick={() => setActiveTab("iconos")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "iconos"
            ? "border-[#CC0E35] text-[#CC0E35]"
            : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]">token</span>
          <span>Íconos</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: COLOR (PALETA CROMÁTICA) */}
      {/* ========================================================================= */}
      <section
        id="panel-color"
        role="tabpanel"
        aria-labelledby="tab-color"
        hidden={activeTab !== "color"}
        className={
          activeTab === "color" ? "flex flex-col gap-8 animate-in fade-in duration-150" : "hidden"
        }
      >
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
          <div>
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Sistema Cromático
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mt-1">
              Paleta Cromática Oficial del Distrito
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              Aquí se define la paleta cromática del sistema y su uso dentro de la interfaz. Cada
              color cumple un rol semántico específico para guiar la atención del ciudadano,
              garantizar el contraste de legibilidad y mantener una identidad unificada en todos los
              trámites de Bogotá.
            </p>
          </div>

          {/* Grillas de Muestras de Color (Color Swatches) */}
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

          {/* Tarjeta de Accesibilidad Normativa WCAG 1.4.1 y 1.4.3 */}
          <div className="p-5 rounded-[12px] bg-red-50/70 border-l-4 border-l-[#CC0E35] border border-red-200 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#CC0E35]/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="font-heading font-bold text-sm text-red-950">
                Regla de Accesibilidad Obligatoria: Contraste y Significado (WCAG 2.2 AA)
              </h4>
              <p className="font-body text-xs sm:text-sm text-red-900 leading-relaxed">
                El contraste mínimo entre texto y fondo debe ser de al menos{" "}
                <strong>4.5:1 para texto normal</strong> y{" "}
                <strong>
                  3:1 para texto grande o elementos gráficos interactivos (WCAG 1.4.3)
                </strong>
                . Adicionalmente, <strong>el color no debe ser el único medio</strong> para
                comunicar información, indicar una acción, solicitar una respuesta o distinguir un
                elemento visual (WCAG 1.4.1). Se debe acompañar siempre de íconos o etiquetas
                textuales explícitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PESTAÑA 2: TIPOGRAFÍA */}
      {/* ========================================================================= */}
      <section
        id="panel-tipografia"
        role="tabpanel"
        aria-labelledby="tab-tipografia"
        hidden={activeTab !== "tipografia"}
        className={
          activeTab === "tipografia"
            ? "flex flex-col gap-8 animate-in fade-in duration-150"
            : "hidden"
        }
      >
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
          <div>
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Familias Tipográficas
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mt-1">
              Sistema de Fuentes y Jerarquía
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              El Kit UI de Bogotá estandariza dos familias tipográficas: <strong>Montserrat</strong>{" "}
              para títulos e identidad gráfica con gran impacto cívico, y <strong>Work Sans</strong>{" "}
              para subtítulos, párrafos, formularios y botones, garantizando una lectura fluida en
              cualquier dispositivo.
            </p>
          </div>

          {/* Especímenes Tipográficos: Muestra de Caracteres (Aa) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                <span className="font-heading font-bold text-lg text-primary">Montserrat</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-700 font-body">
                  Títulos (Bold 700)
                </span>
              </div>
              <div className="font-heading font-bold text-4xl text-on-surface">Aa Bb Cc 123</div>
              <p className="font-heading font-bold text-xs text-on-surface-variant leading-relaxed tracking-wide">
                A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z<br />a b c d e f g h i j k l m
                n ñ o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9 ! @ # $ % &amp; * ( ) - _ + =
              </p>
              <span className="text-xs text-on-surface-variant font-body pt-2 border-t border-surface-container-high">
                Diseñada con proporciones geométricas ideales para cartelería, rotulado y títulos
                gubernamentales.
              </span>
            </div>

            <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                <span className="font-body font-semibold text-lg text-tertiary">Work Sans</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-body">
                  Lectura &amp; UI (400 / 600)
                </span>
              </div>
              <div className="font-body font-semibold text-4xl text-on-surface">Aa Bb Cc 123</div>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z<br />a b c d e f g h i j k l m
                n ñ o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9 ! @ # $ % &amp; * ( ) - _ + =
              </p>
              <span className="text-xs text-on-surface-variant font-body pt-2 border-t border-surface-container-high">
                Optimizada para pantallas de alta densidad y lectura prolongada en formularios,
                párrafos y tablas.
              </span>
            </div>
          </div>

          {/* Jerarquía Real de Textos con Estilos Aplicados */}
          <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <h3 className="font-heading font-bold text-base text-on-surface border-b border-surface-container-high pb-3">
              Escala de Jerarquía Visual en Interfaz
            </h3>

            <div className="flex flex-col gap-6 divide-y divide-surface-container-high">
              {/* H1 */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
                <div className="lg:w-1/4 flex flex-col gap-1">
                  <span className="font-heading font-bold text-xs uppercase text-primary">
                    Título H1
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Montserrat Bold • 34px
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-body">
                    Títulos principales de vistas y páginas
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <h1 className="font-heading font-bold text-[34px] leading-tight text-on-surface">
                    Portal de Trámites y Servicios de Bogotá
                  </h1>
                </div>
              </div>

              {/* H2 */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4">
                <div className="lg:w-1/4 flex flex-col gap-1">
                  <span className="font-heading font-bold text-xs uppercase text-primary">
                    Título H2
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Montserrat Bold • 26px
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-body">
                    Encabezados de sección y pestañas
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <h2 className="font-heading font-bold text-[26px] leading-snug text-on-surface">
                    Consulta del Impuesto Predial Unificado
                  </h2>
                </div>
              </div>

              {/* H3 */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4">
                <div className="lg:w-1/4 flex flex-col gap-1">
                  <span className="font-heading font-bold text-xs uppercase text-primary">
                    Título H3
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Montserrat Bold • 22px
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-body">
                    Títulos de tarjetas y agrupadores
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <h3 className="font-heading font-bold text-[22px] leading-normal text-on-surface">
                    Requisitos s y tiempos de respuesta
                  </h3>
                </div>
              </div>

              {/* H4 */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4">
                <div className="lg:w-1/4 flex flex-col gap-1">
                  <span className="font-heading font-bold text-xs uppercase text-primary">
                    Título H4
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Montserrat Bold • 20px
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-body">
                    Subsecciones y títulos de modales
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <h4 className="font-heading font-bold text-[20px] leading-normal text-on-surface">
                    Información de contacto y sedes SuperCADE
                  </h4>
                </div>
              </div>

              {/* Subtítulos */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4">
                <div className="lg:w-1/4 flex flex-col gap-1">
                  <span className="font-body font-bold text-xs uppercase text-tertiary">
                    Subtítulos
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Work Sans SemiBold • 18px
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-body">
                    Bajadas explicativas de cabecera
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <p className="font-body font-semibold text-[18px] leading-relaxed text-on-surface">
                    Trámite 100% digital sin intermediarios a través de la Secretaría Distrital de
                    Hacienda.
                  </p>
                </div>
              </div>

              {/* Párrafos */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4">
                <div className="lg:w-1/4 flex flex-col gap-1">
                  <span className="font-body font-bold text-xs uppercase text-on-surface-variant">
                    Párrafos
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Work Sans Regular • 16px
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-body">
                    Cuerpo de lectura y formularios
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <p className="font-body font-normal text-[16px] leading-relaxed text-on-surface-variant">
                    El ciudadano podrá realizar la radicación de su documento presentando su cédula
                    de ciudadanía original o contraseña vigente, previo agendamiento de cita en
                    línea para garantizar una atención oportuna y sin filas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PESTAÑA 3: GRILLA Y ESPACIADOS */}
      {/* ========================================================================= */}
      <section
        id="panel-grilla"
        role="tabpanel"
        aria-labelledby="tab-grilla"
        hidden={activeTab !== "grilla"}
        className={
          activeTab === "grilla" ? "flex flex-col gap-8 animate-in fade-in duration-150" : "hidden"
        }
      >
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
          <div>
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Ritmo y Composición
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mt-1">
              Grilla Responsiva y Sistema de Espaciados
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              Estructura geométrica y ritmo visual del Kit UI Bogotá. Basado en múltiplos estrictos
              de 4px para preservar armonía vertical y horizontal, junto con un layout de 12, 8 y 4
              columnas para adaptación en pantallas web, tablet y móvil.
            </p>
          </div>

          {/* Sistema de Espaciado (Múltiplos de 4px) */}
          <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3 flex-wrap gap-2">
              <h3 className="font-heading font-bold text-base text-on-surface">
                Escala de Espaciado (Ritmo Base 4px)
              </h3>
              <span className="font-mono text-xs text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
                Base Unit = 4px
              </span>
            </div>

            <div className="flex flex-col gap-3 font-body">
              {SPACING_STEPS.map((step) => (
                <div
                  key={step.token}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3 w-44 shrink-0">
                    <span className="font-mono text-xs font-bold text-primary">{step.token}</span>
                    <span className="font-mono text-xs text-on-surface font-semibold">
                      {step.label}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">({step.rem})</span>
                  </div>

                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className="h-6 rounded-[4px] bg-[#CC0E35]/25 border border-[#CC0E35] flex items-center justify-center text-[10px] font-mono text-primary font-bold"
                      style={{ width: `${Math.max(step.px * 3.5, 20)}px` }}
                    >
                      {step.label}
                    </div>
                    <span className="text-[11px] font-mono text-on-surface-variant hidden md:inline">
                      {step.tailwind}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grilla Responsiva: 3 Breakpoints */}
          <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-5">
            <h3 className="font-heading font-bold text-base text-on-surface border-b border-surface-container-high pb-3">
              Breakpoints y Distribución de Columnas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Web */}
              <div className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-primary">
                      Web (Desktop)
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                      ≥ 1024px
                    </span>
                  </div>
                  <ul className="text-xs font-body text-on-surface-variant space-y-1.5 mt-2">
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
                      <span>Columnas:</span>
                      <strong className="text-on-surface">12 Columnas</strong>
                    </li>
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
                      <span>Gutter (Canal):</span>
                      <strong className="text-on-surface">24px</strong>
                    </li>
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
                      <span>Margen Lateral:</span>
                      <strong className="text-on-surface">80px</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Ancho Máximo:</span>
                      <strong className="text-primary font-mono">1280px (7xl)</strong>
                    </li>
                  </ul>
                </div>

                {/* Miniatura visual 12 cols */}
                <div className="grid grid-cols-12 gap-1 p-2 bg-white rounded border border-surface-container-high">
                  {WEB_COLUMNS.map((colId) => (
                    <div
                      key={colId}
                      className="h-6 rounded-[2px] bg-primary/20 border border-primary/40"
                    />
                  ))}
                </div>
              </div>

              {/* Tablet */}
              <div className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-tertiary">Tablet</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                      768px – 1023px
                    </span>
                  </div>
                  <ul className="text-xs font-body text-on-surface-variant space-y-1.5 mt-2">
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
                      <span>Columnas:</span>
                      <strong className="text-on-surface">8 Columnas</strong>
                    </li>
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
                      <span>Gutter (Canal):</span>
                      <strong className="text-on-surface">24px</strong>
                    </li>
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
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
                <div className="grid grid-cols-8 gap-1.5 p-2 bg-white rounded border border-surface-container-high">
                  {TABLET_COLUMNS.map((colId) => (
                    <div
                      key={colId}
                      className="h-6 rounded-[2px] bg-tertiary/20 border border-tertiary/40"
                    />
                  ))}
                </div>
              </div>

              {/* Móvil */}
              <div className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-[#1B7A2E]">Móvil</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                      &lt; 768px
                    </span>
                  </div>
                  <ul className="text-xs font-body text-on-surface-variant space-y-1.5 mt-2">
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
                      <span>Columnas:</span>
                      <strong className="text-on-surface">4 Columnas</strong>
                    </li>
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
                      <span>Gutter (Canal):</span>
                      <strong className="text-on-surface">16px</strong>
                    </li>
                    <li className="flex justify-between border-b border-surface-container-high pb-1">
                      <span>Margen Lateral:</span>
                      <strong className="text-on-surface">24px</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Área Táctil:</span>
                      <strong className="text-[#1B7A2E] font-mono">≥ 44×44 px</strong>
                    </li>
                  </ul>
                </div>

                {/* Miniatura visual 4 cols */}
                <div className="grid grid-cols-4 gap-2 p-2 bg-white rounded border border-surface-container-high">
                  {MOBILE_COLUMNS.map((colId) => (
                    <div
                      key={colId}
                      className="h-6 rounded-[2px] bg-[#1B7A2E]/20 border border-[#1B7A2E]/40"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PESTAÑA 4: ÍCONOS */}
      {/* ========================================================================= */}
      <section
        id="panel-iconos"
        role="tabpanel"
        aria-labelledby="tab-iconos"
        hidden={activeTab !== "iconos"}
        className={
          activeTab === "iconos" ? "flex flex-col gap-8 animate-in fade-in duration-150" : "hidden"
        }
      >
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
          <div>
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Iconografía y símbolos
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mt-1">
              Librería de Íconos y Pautas de Uso
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              Los íconos refuerzan la comunicación visual y la escaneabilidad pero nunca deben
              reemplazar la etiqueta de texto en acciones clave, o deben acompañarse del atributo{" "}
              <code>aria-label</code> descriptivo. Área táctil mínima garantizada de{" "}
              <strong>44×44px</strong> conforme a WCAG 2.5.8.
            </p>
          </div>

          {/* Pautas Normativas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
              <span className="font-heading font-bold text-xs uppercase text-primary">
                1. Acompañamiento Textual
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Los íconos son elementos de apoyo que complementan el texto de los botones o
                tarjetas, nunca un sustituto hermético.
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
              <span className="font-heading font-bold text-xs uppercase text-tertiary">
                2. Área Táctil ≥ 44×44px
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Cuando un ícono actúa como control interactivo solitario, debe contar con un área de
                contacto mínima de 44×44px.
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
              <span className="font-heading font-bold text-xs uppercase text-[#1B7A2E]">
                3. Semántica ARIA
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Usar <code>aria-hidden="true"</code> si el ícono es puramente decorativo, o{" "}
                <code>aria-label</code> si es el único botón.
              </p>
            </div>
          </div>

          {/* Muestra de 5 Íconos en la Paleta Oficial */}
          <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-5">
            <h3 className="font-heading font-bold text-base text-on-surface border-b border-surface-container-high pb-3">
              Muestra de Íconos de Material Symbols Outlined (Paleta Oficial)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ICONS_SAMPLE.map((item) => (
                <div
                  key={item.icon}
                  className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col items-center text-center gap-3 hover:border-primary/40 transition-all hover:shadow-xs"
                >
                  <div
                    style={{ backgroundColor: item.bg, color: item.hex }}
                    className="w-16 h-16 min-h-[44px] min-w-[44px] rounded-[5px] flex items-center justify-center shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[32px]" aria-hidden="true">
                      {item.icon}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-heading font-bold text-xs text-on-surface">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">
                      {item.icon}
                    </span>
                    <span style={{ color: item.hex }} className="text-[10px] font-mono font-bold">
                      {item.hex}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Código de Ejemplo */}
            <div className="mt-2 rounded-[10px] bg-[#1E1E24] text-white p-4 font-mono text-xs overflow-x-auto border border-gray-800 shadow-xs">
              <span className="text-gray-400 font-sans text-xs block mb-2 font-medium">
                Implementación estándar en React / Next.js con Material Symbols
              </span>
              <pre className="text-gray-200 leading-relaxed font-mono">
                {`<button
  type="button"
  aria-label="Abrir enlace del trámite en nueva pestaña"
  className="w-11 h-11 min-h-[44px] min-w-[44px] bg-[#EBF0FA] text-[#3366CC] hover:bg-[#C0D0EF] rounded-[5px] inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
>
  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
    open_in_new
  </span>
</button>`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
