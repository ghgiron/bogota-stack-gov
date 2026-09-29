"use client";

import { SidebarKitUi } from "@/components/ui-kit/SidebarKitUi";
import {
  BookOpen,
  CheckCircle2,
  Copy,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles,
  Type,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type TypoTabKey = "jerarquia" | "especimenes" | "pautas";

const TYPOGRAPHY_SCALE = [
  {
    level: "Título H1",
    family: "Montserrat Bold",
    size: "34px",
    rem: "2.125rem",
    lineHeight: "1.2",
    weight: "700",
    role: "Títulos principales de vistas y páginas",
    sample: "Portal de Trámites y Servicios de Bogotá",
    tailwind: "font-heading font-bold text-[34px] leading-tight",
  },
  {
    level: "Título H2",
    family: "Montserrat Bold",
    size: "26px",
    rem: "1.625rem",
    lineHeight: "1.25",
    weight: "700",
    role: "Encabezados de sección y pestañas principales",
    sample: "Consulta del Impuesto Predial Unificado",
    tailwind: "font-heading font-bold text-[26px] leading-snug",
  },
  {
    level: "Título H3",
    family: "Montserrat Bold",
    size: "22px",
    rem: "1.375rem",
    lineHeight: "1.3",
    weight: "700",
    role: "Títulos de tarjetas y agrupadores secundarios",
    sample: "Requisitos s y tiempos de respuesta",
    tailwind: "font-heading font-bold text-[22px] leading-normal",
  },
  {
    level: "Título H4",
    family: "Montserrat Bold",
    size: "20px",
    rem: "1.25rem",
    lineHeight: "1.35",
    weight: "700",
    role: "Subsecciones y títulos de modales o drawers",
    sample: "Información de contacto y sedes SuperCADE",
    tailwind: "font-heading font-bold text-[20px] leading-normal",
  },
  {
    level: "Subtítulos",
    family: "Work Sans SemiBold",
    size: "18px",
    rem: "1.125rem",
    lineHeight: "1.4",
    weight: "600",
    role: "Bajadas explicativas y descripciones destacadas",
    sample:
      "Trámite 100% digital sin intermediarios a través de la Secretaría Distrital de Hacienda.",
    tailwind: "font-body font-semibold text-[18px] leading-relaxed",
  },
  {
    level: "Párrafos / Body",
    family: "Work Sans Regular",
    size: "16px",
    rem: "1rem",
    lineHeight: "1.5",
    weight: "400",
    role: "Cuerpo de lectura, instrucciones y campos de texto",
    sample:
      "El ciudadano podrá realizar la radicación de su documento presentando su cédula de ciudadanía original o contraseña vigente, previo agendamiento de cita en línea para garantizar una atención oportuna y sin filas.",
    tailwind: "font-body font-normal text-[16px] leading-relaxed",
  },
  {
    level: "Textos de ayuda / Captions",
    family: "Work Sans Regular",
    size: "12px",
    rem: "0.75rem",
    lineHeight: "1.4",
    weight: "400",
    role: "Textos de ayuda de inputs, notas al pie y metadatos",
    sample: "Ingrese el número de documento sin puntos, comas ni espacios.",
    tailwind: "font-body font-normal text-[12px] leading-normal",
  },
];

export default function TipografiaPage() {
  const [activeTab, setActiveTab] = useState<TypoTabKey>("jerarquia");
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
              Tipografía
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
                  <span className="material-symbols-outlined text-[18px]">text_fields</span>
                  <span>Fundamento de Lenguaje y Lectura</span>
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-medium">
                  Fuentes Oficiales • v1.0
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                  Tipografía (Montserrat y Work Sans)
                </h1>
                <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">
                  En esta sección se define el sistema de fuentes y su jerarquía dentro de la
                  interfaz. Incluye familias tipográficas, tamaños, pesos, interlineados y estilos
                  para títulos, textos y etiquetas, garantizando legibilidad óptima para todos los
                  ciudadanos en múltiples resoluciones.
                </p>
              </div>

              {/* Franja de especificaciones rápidas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-surface-container-high font-body text-xs mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-on-surface-variant">Familias:</span>
                  <strong className="text-on-surface font-semibold">
                    Montserrat &amp; Work Sans
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="text-on-surface-variant">Jerarquía:</span>
                  <strong className="text-on-surface font-semibold">
                    7 Niveles Estandarizados
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B7A2E]" />
                  <span className="text-on-surface-variant">Lecturabilidad:</span>
                  <strong className="text-[#1B7A2E] font-semibold">
                    50 – 75 Caracteres / Línea
                  </strong>
                </div>
              </div>
            </article>

            {/* Pestañas Internas */}
            <div className="flex flex-col gap-6 w-full">
              <div
                className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
                role="tablist"
                aria-label="Pestañas de Tipografía"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-jerarquia"
                  aria-controls="panel-jerarquia"
                  aria-selected={activeTab === "jerarquia"}
                  onClick={() => setActiveTab("jerarquia")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "jerarquia"
                    ? "border-[#CC0E35] text-[#CC0E35]"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">format_size</span>
                  <span>Jerarquía y Escala</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-especimenes"
                  aria-controls="panel-especimenes"
                  aria-selected={activeTab === "especimenes"}
                  onClick={() => setActiveTab("especimenes")}
                  className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "especimenes"
                    ? "border-[#CC0E35] text-[#CC0E35]"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">font_download</span>
                  <span>Ejemplos</span>
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
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>Pautas de Lectura</span>
                </button>
              </div>

              {/* TAB 1: JERARQUÍA Y ESCALA */}
              {activeTab === "jerarquia" && (
                <section
                  id="panel-jerarquia"
                  role="tabpanel"
                  aria-labelledby="tab-jerarquia"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Escala Visual y Renderizado en Vivo
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Cada elemento tipográfico cuenta con un tamaño de fuente, altura de línea e
                        intención de uso rigurosamente calculados para la lectura ágil de trámites
                        públicos.
                      </p>
                    </div>

                    <div className="flex flex-col gap-6 divide-y divide-surface-container-high bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs">
                      {TYPOGRAPHY_SCALE.map((item) => (
                        <div
                          key={item.level}
                          className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pt-5 first:pt-0"
                        >
                          <div className="lg:w-1/3 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-heading font-bold text-xs uppercase text-primary">
                                {item.level}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                                {item.size} / {item.rem}
                              </span>
                            </div>
                            <span className="font-mono text-xs text-on-surface-variant">
                              {item.family} • Line-Height: {item.lineHeight}
                            </span>
                            <span className="text-[11px] text-on-surface-variant font-body">
                              {item.role}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(item.tailwind)}
                              className="mt-1 text-[11px] font-mono text-primary flex items-center gap-1 hover:underline text-left"
                            >
                              <Copy className="w-3 h-3" />
                              <span>
                                {copiedToken === item.tailwind
                                  ? "¡Clases Copiadas!"
                                  : "Copiar clases Tailwind"}
                              </span>
                            </button>
                          </div>

                          <div className="lg:w-2/3 overflow-hidden">
                            {item.level === "Título H1" && (
                              <h1 className="font-heading font-bold text-[34px] leading-tight text-on-surface">
                                {item.sample}
                              </h1>
                            )}
                            {item.level === "Título H2" && (
                              <h2 className="font-heading font-bold text-[26px] leading-snug text-on-surface">
                                {item.sample}
                              </h2>
                            )}
                            {item.level === "Título H3" && (
                              <h3 className="font-heading font-bold text-[22px] leading-normal text-on-surface">
                                {item.sample}
                              </h3>
                            )}
                            {item.level === "Título H4" && (
                              <h4 className="font-heading font-bold text-[20px] leading-normal text-on-surface">
                                {item.sample}
                              </h4>
                            )}
                            {item.level === "Subtítulos" && (
                              <p className="font-body font-semibold text-[18px] leading-relaxed text-on-surface">
                                {item.sample}
                              </p>
                            )}
                            {item.level === "Párrafos / Body" && (
                              <p className="font-body font-normal text-[16px] leading-relaxed text-on-surface-variant">
                                {item.sample}
                              </p>
                            )}
                            {item.level === "Textos de ayuda / Captions" && (
                              <p className="font-body font-normal text-[12px] leading-normal text-on-surface-variant">
                                {item.sample}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 2: ESPECÍMENES */}
              {activeTab === "especimenes" && (
                <section
                  id="panel-especimenes"
                  role="tabpanel"
                  aria-labelledby="tab-especimenes"
                  className="flex flex-col gap-6 animate-in fade-in duration-150"
                >
                  <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                        Uso de Fuentes                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Muestras de caracteres de las familias oficiales en sus diferentes pesos de
                        renderizado.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Especimen Montserrat */}
                      <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-5">
                        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                          <span className="font-heading font-bold text-lg text-primary">
                            Montserrat
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-700 font-body">
                            Títulos &amp; Encabezados
                          </span>
                        </div>

                        <div className="font-heading font-bold text-4xl text-on-surface">
                          Aa Bb Cc 123
                        </div>

                        <div className="space-y-3 pt-2">
                          <div>
                            <span className="text-[11px] font-mono text-on-surface-variant block mb-1">
                              Bold (700) — Títulos y Acciones
                            </span>
                            <p className="font-heading font-bold text-sm text-on-surface">
                              A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z<br />a b c d e f
                              g h i j k l m n ñ o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9 ! @
                              # $ % &amp; * ( ) - _ + =
                            </p>
                          </div>

                          <div className="pt-2 border-t border-surface-container-high">
                            <span className="text-[11px] font-mono text-on-surface-variant block mb-1">
                              SemiBold (600) — Subencabezados
                            </span>
                            <p className="font-heading font-semibold text-sm text-on-surface">
                              A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z<br />a b c d e f
                              g h i j k l m n ñ o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9 ! @
                              # $ % &amp; * ( ) - _ + =
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-on-surface-variant font-body pt-3 border-t border-surface-container-high">
                          Diseñada con proporciones geométricas ideales para cartelería, rotulado y
                          títulos gubernamentales distritales de alto impacto.
                        </p>
                      </div>

                      {/* Especimen Work Sans */}
                      <div className="bg-white rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-5">
                        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                          <span className="font-body font-semibold text-lg text-tertiary">
                            Work Sans
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-body">
                            Lectura, Inputs &amp; UI
                          </span>
                        </div>

                        <div className="font-body font-semibold text-4xl text-on-surface">
                          Aa Bb Cc 123
                        </div>

                        <div className="space-y-3 pt-2">
                          <div>
                            <span className="text-[11px] font-mono text-on-surface-variant block mb-1">
                              SemiBold (600) — Subtítulos y Botones
                            </span>
                            <p className="font-body font-semibold text-sm text-on-surface">
                              A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z<br />a b c d e f
                              g h i j k l m n ñ o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9 ! @
                              # $ % &amp; * ( ) - _ + =
                            </p>
                          </div>

                          <div className="pt-2 border-t border-surface-container-high">
                            <span className="text-[11px] font-mono text-on-surface-variant block mb-1">
                              Regular (400) — Párrafos y Formularios
                            </span>
                            <p className="font-body font-normal text-sm text-on-surface">
                              A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z<br />a b c d e f
                              g h i j k l m n ñ o p q r s t u v w x y z<br />0 1 2 3 4 5 6 7 8 9 ! @
                              # $ % &amp; * ( ) - _ + =
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-on-surface-variant font-body pt-3 border-t border-surface-container-high">
                          Optimizada para pantallas de alta densidad y lectura prolongada en
                          formularios, párrafos y tablas del ecosistema B2G y ciudadano.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* TAB 3: PAUTAS DE LECTURA */}
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
                        Pautas de Legibilidad y Lenguaje Claro
                      </h2>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                        Recomendaciones ergonómicas para evitar fatiga cognitiva en el ciudadano
                        durante la realización de trámites distritales.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-2">
                        <span className="font-heading font-bold text-xs uppercase text-primary">
                          1. Longitud de Línea
                        </span>
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          Mantener párrafos entre <strong>50 y 75 caracteres por línea</strong>{" "}
                          (aprox. <code>max-w-3xl</code>). Líneas más largas dificultan el retorno
                          ocular y líneas muy cortas interrumpen el ritmo natural.
                        </p>
                      </div>

                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-2">
                        <span className="font-heading font-bold text-xs uppercase text-tertiary">
                          2. Altura de Línea Proporcional
                        </span>
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          Usar <code>leading-tight</code> (1.2) en títulos grandes y{" "}
                          <code>leading-relaxed</code> (1.5) en párrafos y cuerpos de texto para
                          garantizar aire suficiente entre renglones.
                        </p>
                      </div>

                      <div className="p-5 rounded-[12px] bg-white border border-surface-container-high shadow-xs flex flex-col gap-2">
                        <span className="font-heading font-bold text-xs uppercase text-[#1B7A2E]">
                          3. Zoom Accesible (WCAG 1.4.4)
                        </span>
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          Todos los textos deben especificarse en unidades relativas (
                          <code>rem</code>) para soportar ampliación de hasta el{" "}
                          <strong>200% sin pérdida de contenido</strong> ni truncamientos no
                          deseados.
                        </p>
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
