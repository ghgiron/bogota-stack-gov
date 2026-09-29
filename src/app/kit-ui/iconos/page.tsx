"use client";

import { SidebarKitUi } from "@/components/ui-kit/SidebarKitUi";
import {
  Check,
  CheckCircle2,
  Copy,
  Eye,
  HelpCircle,
  Layers,
  ShieldCheck,
  Sparkles,
  Touchpad,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type IconTabKey = "libreria" | "pautas" | "accesibilidad";
type IconSize = "24px" | "36px" | "48px";
type IconColor = "rojo" | "amarillo" | "azul" | "verde" | "gris";

interface IconSampleItem {
  icon: string;
  name: string;
  category: string;
  role: string;
}

const ICONS_SAMPLE: IconSampleItem[] = [
  {
    icon: "smart_button",
    name: "Acción Clave",
    category: "Acción",
    role: "Botones principales y llamadas a la acción",
  },
  {
    icon: "warning",
    name: "Alerta / Acento",
    category: "Alerta",
    role: "Avisos importantes y requerimientos de atención",
  },
  {
    icon: "open_in_new",
    name: "Enlace Externo",
    category: "Navegación",
    role: "Vínculos a portales fuera del dominio distrital",
  },
  {
    icon: "check_circle",
    name: "Validado / Éxito",
    category: "Estado",
    role: "Operación completada con éxito o campo verificado",
  },
  {
    icon: "description",
    name: "Expediente / Trámite",
    category: "Contenido",
    role: "Documentos, constancias y archivos descargables",
  },
  {
    icon: "search",
    name: "Búsqueda Ciudadana",
    category: "Acción",
    role: "Campos de búsqueda semántica y filtros",
  },
  {
    icon: "calendar_today",
    name: "Cita / Agendamiento",
    category: "Servicio",
    role: "Fechas de atención en sedes SuperCADE",
  },
  {
    icon: "account_circle",
    name: "Identidad Ciudadana",
    category: "Usuario",
    role: "Perfil, autenticación y credenciales digitales",
  },
  {
    icon: "download",
    name: "Descarga Directa",
    category: "Acción",
    role: "Certificados PDF y formularios oficiales",
  },
  {
    icon: "help_outline",
    name: "Orientación / FAQ",
    category: "Soporte",
    role: "Guías, glosarios y asistencia en línea",
  },
];

const COLOR_MAP: Record<IconColor, { label: string; hex: string; bg: string; textClass: string }> =
{
  rojo: { label: "Primario (Rojo)", hex: "#CC0E35", bg: "#FAE7EB", textClass: "text-[#CC0E35]" },
  amarillo: {
    label: "Acentos (Amarillo)",
    hex: "#FAB62D",
    bg: "#FFF8EA",
    textClass: "text-[#FAB62D]",
  },
  azul: { label: "Enlaces (Azul)", hex: "#3366CC", bg: "#EBF0FA", textClass: "text-[#3366CC]" },
  verde: { label: "Éxito (Verde)", hex: "#1B7A2E", bg: "#E8F2EA", textClass: "text-[#1B7A2E]" },
  gris: { label: "Neutros (Gris)", hex: "#545454", bg: "#E6E6E6", textClass: "text-[#545454]" },
};

export default function IconosPage() {
  const [activeTab, setActiveTab] = useState<IconTabKey>("libreria");
  const [selectedSize, setSelectedSize] = useState<IconSize>("36px");
  const [selectedColor, setSelectedColor] = useState<IconColor>("rojo");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
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
              Íconos y símbolos
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
                  <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                  <span>Fundamento de Lenguaje Visual</span>
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-medium">
                  Material Symbols Outlined • v1.0
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                  Íconos y símbolos
                </h1>
                <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">
                  Elementos visuales que apoyan la comprensión rápida de acciones, estados y
                  contenidos, reduciendo la carga cognitiva y mejorando la escaneabilidad en todos
                  los portales y servicios de Bogotá.
                </p>
              </div>

              {/* Franja de especificaciones rápidas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-surface-container-high font-body text-xs mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-on-surface-variant">Librería:</span>
                  <strong className="text-on-surface font-semibold">
                    Material Symbols Outlined
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="text-on-surface-variant">Escala:</span>
                  <strong className="text-on-surface font-semibold">24px · 36px · 48px</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B7A2E]" />
                  <span className="text-on-surface-variant">Área Táctil:</span>
                  <strong className="text-[#1B7A2E] font-semibold">≥ 44×44 px (WCAG 2.5.8)</strong>
                </div>
              </div>
            </article>

            {/* Pestañas Internas */}
            <div className="flex flex-col gap-6 w-full">
              <div
                className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
                role="tablist"
                aria-label="Pestañas de Íconos"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-libreria"
                  aria-controls="panel-libreria"
                  aria-selected={activeTab === "libreria"}
                  onClick={() => setActiveTab("libreria")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "libreria"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">category</span>
                  <span>Librería y Tamaños</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-pautas"
                  aria-controls="panel-pautas"
                  aria-selected={activeTab === "pautas"}
                  onClick={() => setActiveTab("pautas")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "pautas"
                      ? "border-[#CC0E35] text-[#CC0E35]"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">rule</span>
                  <span>Pautas de Uso</span>
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
                  <span>Accesibilidad</span>
                </button>
              </div>

              {/* TAB 1: LIBRERÍA Y TAMAÑOS */}
              {activeTab === "libreria" && (
                <section
                  id="panel-libreria"
                  role="tabpanel"
                  aria-labelledby="tab-libreria"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-high pb-4">
                      <div>
                        <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                          Muestras Interactivas en la Paleta Distrital
                        </h2>
                        <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                          Experimenta cambiando el tamaño y el color institucional de los símbolos.
                        </p>
                      </div>

                      {/* Controles Interactivos */}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Selector de Tamaño */}
                        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-[8px] border border-surface-container-high">
                          {(["24px", "36px", "48px"] as IconSize[]).map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${selectedSize === size
                                  ? "bg-[#CC0E35] text-white shadow-xs"
                                  : "text-on-surface-variant hover:text-on-surface"
                                }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                        {/* Selector de Color */}
                        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-[8px] border border-surface-container-high">
                          {(["rojo", "amarillo", "azul", "verde", "gris"] as IconColor[]).map(
                            (colorKey) => {
                              const conf = COLOR_MAP[colorKey];
                              return (
                                <button
                                  key={colorKey}
                                  type="button"
                                  onClick={() => setSelectedColor(colorKey)}
                                  title={conf.label}
                                  className={`w-6 h-6 rounded-full border-2 transition-transform ${selectedColor === colorKey
                                      ? "scale-110 border-black"
                                      : "border-transparent"
                                    }`}
                                  style={{ backgroundColor: conf.hex }}
                                />
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Grid de Íconos */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                      {ICONS_SAMPLE.map((item) => {
                        const activeConf = COLOR_MAP[selectedColor];
                        const codeSnippet = `<span className="material-symbols-outlined text-[${selectedSize}] text-[${activeConf.hex}]" aria-hidden="true">${item.icon}</span>`;
                        const isCopied = copiedCode === codeSnippet;

                        return (
                          <div
                            key={item.icon}
                            className="p-4 rounded-[12px] bg-white border border-surface-container-high flex flex-col items-center text-center gap-3 hover:border-primary/40 transition-all shadow-xs hover:shadow-sm"
                          >
                            <div
                              style={{ backgroundColor: activeConf.bg, color: activeConf.hex }}
                              className="w-16 h-16 min-h-[44px] min-w-[44px] rounded-[8px] flex items-center justify-center shadow-xs transition-all"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: selectedSize }}
                                aria-hidden="true"
                              >
                                {item.icon}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                              <span className="font-heading font-bold text-xs text-on-surface truncate">
                                {item.name}
                              </span>
                              <span className="text-[10px] font-mono text-on-surface-variant truncate">
                                {item.icon}
                              </span>
                              <span className="text-[10px] text-on-surface-variant/80 font-body line-clamp-1">
                                {item.role}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyCode(codeSnippet)}
                              className="w-full mt-1 text-[11px] font-mono py-1 px-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1"
                            >
                              {isCopied ? (
                                <span className="text-emerald-700 font-bold flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Copiado
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Copy className="w-3 h-3" /> Copiar JSX
                                </span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 2: PAUTAS DE USO */}
              {activeTab === "pautas" && (
                <section
                  id="panel-pautas"
                  role="tabpanel"
                  aria-labelledby="tab-pautas"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Pautas Oficiales de Implementación de Íconos
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Criterios ergonómicos para asegurar que los símbolos apoyen y no entorpezcan
                        la experiencia del usuario.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-2">
                        <span className="font-heading font-bold text-xs uppercase text-primary">
                          1. Apoyo Contextual
                        </span>
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          Los íconos son elementos de apoyo que complementan el texto de botones o
                          tarjetas. No se deben utilizar íconos en soledad para acciones críticas
                          sin etiqueta visible.
                        </p>
                      </div>

                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-2">
                        <span className="font-heading font-bold text-xs uppercase text-tertiary">
                          2. Coherencia Semántica
                        </span>
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          Un ícono debe representar una única acción en todo el portal. Por ejemplo,{" "}
                          <code>open_in_new</code> se reserva exclusivamente para apertura de
                          enlaces en nuevas pestañas.
                        </p>
                      </div>

                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-2">
                        <span className="font-heading font-bold text-xs uppercase text-[#1B7A2E]">
                          3. Escala y Alineación Óptica
                        </span>
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          Dentro de botones, el ícono debe tener un tamaño de{" "}
                          <strong>20px o 24px</strong> y estar alineado ópticamente con la línea de
                          base del texto mediante flexbox (<code>items-center</code>).
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 3: ACCESIBILIDAD */}
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
                        Accesibilidad en Íconos (WCAG 2.2 AA / WAI-ARIA)
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Requisitos s para lectores de pantalla y usuarios con movilidad reducida.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-3">
                        <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Íconos Decorativos (Acompañados de Texto)</span>
                        </h3>
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          Cuando el ícono está junto a un texto descriptivo, debe ocultarse a las
                          tecnologías de asistencia con <code>aria-hidden=&quot;true&quot;</code>{" "}
                          para evitar anuncios redundantes.
                        </p>
                        <pre className="p-3 bg-surface-container-low rounded font-mono text-[11px] text-on-surface overflow-x-auto">
                          {`<button className="rounded-full bg-[#CC0E35] text-white px-5 py-2.5 flex items-center gap-2">
  <span>Descargar Certificado</span>
  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">download</span>
</button>`}
                        </pre>
                      </div>

                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-3">
                        <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Botones Sólo de Ícono (Icon-Only)</span>
                        </h3>
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          Si un botón no tiene texto visible, es <strong></strong> incluir un{" "}
                          <code>aria-label</code> descriptivo y garantizar un área táctil mínima de{" "}
                          <strong>44×44px</strong> conforme a WCAG 2.5.8.
                        </p>
                        <pre className="p-3 bg-surface-container-low rounded font-mono text-[11px] text-on-surface overflow-x-auto">
                          {`<button
  type="button"
  aria-label="Cerrar modal de información tributaria"
  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-[5px] flex items-center justify-center hover:bg-surface-container"
>
  <span className="material-symbols-outlined text-[24px]" aria-hidden="true">close</span>
</button>`}
                        </pre>
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
