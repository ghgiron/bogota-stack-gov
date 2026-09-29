"use client";

import { RadioPlayground } from "@/components/ui-kit/RadioPlayground";
import {
  Accessibility,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCheck2,
  HelpCircle,
  Info,
  Keyboard,
  Layers,
  MousePointer,
  RotateCcw,
  ShieldCheck,
  Sliders,
  Sparkles,
  XCircle,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export type TabKey = "guia" | "codigo" | "especificaciones" | "accesibilidad";

export const ComponentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("guia");

  // Estado para el ejemplo interactivo en la pestaña de Guía de uso
  const [guiaTurno, setGuiaTurno] = useState<string>("supercade");
  const [guiaBinario, setGuiaBinario] = useState<string>("si");

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Barra de Pestañas Superiores (Estilo Obelisco BA & SGDS Singapur) */}
      <div
        className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
        role="tablist"
        aria-label="Pestañas de documentación del componente"
      >
        <button
          type="button"
          role="tab"
          id="tab-guia"
          aria-controls="panel-guia"
          aria-selected={activeTab === "guia"}
          onClick={() => setActiveTab("guia")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "guia"
              ? "border-[#CC0E35] text-[#CC0E35]"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span>Guía de uso</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-codigo"
          aria-controls="panel-codigo"
          aria-selected={activeTab === "codigo"}
          onClick={() => setActiveTab("codigo")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "codigo"
              ? "border-[#CC0E35] text-[#CC0E35]"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]">code</span>
          <span>Código</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-especificaciones"
          aria-controls="panel-especificaciones"
          aria-selected={activeTab === "especificaciones"}
          onClick={() => setActiveTab("especificaciones")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${activeTab === "especificaciones"
              ? "border-[#CC0E35] text-[#CC0E35]"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]">design_services</span>
          <span>Especificaciones</span>
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
          <span>Accesibilidad (WCAG 2.2)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: GUÍA DE USO */}
      {/* ========================================================================= */}
      {activeTab === "guia" && (
        <section
          id="panel-guia"
          role="tabpanel"
          aria-labelledby="tab-guia"
          className="flex flex-col gap-8 animate-in fade-in duration-150"
        >
          {/* Cuándo usar y Cuándo no usar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cuándo usar */}
            <div className="p-6 rounded-[15px] bg-[#EAF5EC] border-l-4 border-l-[#1B7A2E] border border-[#1B7A2E]/30 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1B7A2E] font-heading font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Cuándo usar el botón de radio</span>
              </div>
              <ul className="space-y-2 font-body text-xs sm:text-sm text-green-950 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#1B7A2E] font-bold">•</span>
                  <span>
                    Cuando las personas usuarias deben elegir <strong>una sola opción</strong>{" "}
                    dentro de un conjunto cerrado y mutuamente excluyente.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B7A2E] font-bold">•</span>
                  <span>
                    Cuando hay <strong>5 opciones o menos</strong> y es vital que el ciudadano
                    compare todas las alternativas de inmediato sin abrir menús.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B7A2E] font-bold">•</span>
                  <span>
                    En preguntas binarias (ej. <em>&ldquo;¿Tienes Sisbén Bogotá? Sí / No&rdquo;</em>
                    ) donde se requiera una respuesta explícita.
                  </span>
                </li>
              </ul>
            </div>

            {/* Cuándo no usar */}
            <div className="p-6 rounded-[15px] bg-red-50/80 border-l-4 border-l-[#CC0E35] border border-red-200 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#CC0E35] font-heading font-bold text-base">
                <XCircle className="w-5 h-5" />
                <span>Cuándo NO usar el botón de radio</span>
              </div>
              <ul className="space-y-2 font-body text-xs sm:text-sm text-red-950 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#CC0E35] font-bold">•</span>
                  <span>
                    Si se permite seleccionar <strong>más de una opción</strong> a la vez: utiliza{" "}
                    <strong>Casillas de verificación (Checkbox)</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CC0E35] font-bold">•</span>
                  <span>
                    Si hay <strong>más de 5 o 6 opciones</strong> (ej. lista de las 20 localidades
                    de Bogotá): utiliza un <strong>Menú desplegable (Select)</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CC0E35] font-bold">•</span>
                  <span>
                    Si la acción tiene efecto inmediato sin pulsar un botón de enviar o guardar:
                    utiliza un <strong>Interruptor (Switch/Toggle)</strong>.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Disposición: Vertical vs Horizontal */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-5">
            <div>
              <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
                Estructura Visual
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mt-1">
                Disposición: Vertical (Recomendada) vs Horizontal
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                La orientación vertical es la preferida en los servicios del Distrito porque
                optimiza el escaneo visual en patrón F y se adapta de forma natural a pantallas
                móviles sin quiebres de línea confusos.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vertical Card */}
              <div className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Disposición Vertical (Recomendada)
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#1B7A2E]/10 text-[#1B7A2E] border border-[#1B7A2E]/30 font-body">
                    Estándar Distrital
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white rounded-[8px] border border-surface-container-high">
                  <div className="flex items-center gap-3 min-h-[36px]">
                    <span className="w-5 h-5 rounded-full border-2 border-[#CC0E35] flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35]" />
                    </span>
                    <span className="font-body text-xs text-on-surface font-semibold">
                      Opción 1: Persona Natural (Ciudadano)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 min-h-[36px]">
                    <span className="w-5 h-5 rounded-full border-2 border-[#666666]" />
                    <span className="font-body text-xs text-on-surface-variant">
                      Opción 2: Persona Jurídica (Empresa o Entidad)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 min-h-[36px]">
                    <span className="w-5 h-5 rounded-full border-2 border-[#666666]" />
                    <span className="font-body text-xs text-on-surface-variant">
                      Opción 3: Apoderado o Representante Legal
                    </span>
                  </div>
                </div>
                <p className="font-body text-xs text-on-surface-variant">
                  <strong>Ventaja:</strong> Cada etiqueta tiene su propia línea. Facilita la lectura
                  rápida en dispositivos móviles.
                </p>
              </div>

              {/* Horizontal Card */}
              <div className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Disposición Horizontal (Casos Restringidos)
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-body">
                    Solo 2 Opciones Cortas
                  </span>
                </div>
                <div className="flex items-center gap-6 p-4 bg-white rounded-[8px] border border-surface-container-high">
                  <div className="flex items-center gap-3 min-h-[36px]">
                    <span className="w-5 h-5 rounded-full border-2 border-[#CC0E35] flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35]" />
                    </span>
                    <span className="font-body text-xs text-on-surface font-semibold">Sí</span>
                  </div>
                  <div className="flex items-center gap-3 min-h-[36px]">
                    <span className="w-5 h-5 rounded-full border-2 border-[#666666]" />
                    <span className="font-body text-xs text-on-surface-variant">No</span>
                  </div>
                </div>
                <p className="font-body text-xs text-on-surface-variant">
                  <strong>Restricción:</strong> Solo admisible para decisiones binarias cortas.
                  Nunca usar horizontalmente si los textos superan 3 palabras.
                </p>
              </div>
            </div>
          </div>

          {/* Contextos de Uso en Trámites Reales */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-5">
            <div>
              <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
                Implementación en Escenarios Públicos
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mt-1">
                Contextos de Uso Demostrados
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contexto A: Selección de Canal */}
              <div className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-3">
                <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
                  Caso 1: Selección de Canal para Reclamar Documento
                </span>
                <fieldset className="flex flex-col gap-2 mt-1">
                  <legend className="sr-only">Seleccionar sede de entrega</legend>

                  <label
                    htmlFor="radio-ctx-supercade"
                    className={`flex items-start gap-3 p-3 rounded-[8px] border transition-colors cursor-pointer min-h-[44px] ${guiaTurno === "supercade"
                        ? "border-primary/50 bg-[#FAE7EB]/40"
                        : "border-surface-container-high bg-white hover:bg-surface-container-lowest"
                      }`}
                  >
                    <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px] mt-0.5">
                      <input
                        type="radio"
                        id="radio-ctx-supercade"
                        name="canal-entrega"
                        value="supercade"
                        checked={guiaTurno === "supercade"}
                        onChange={(e) => setGuiaTurno(e.target.value)}
                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                      />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading text-xs font-bold text-on-surface">
                        SuperCADE CAD (Carrera 30 con Calle 26)
                      </span>
                      <span className="font-body text-[11px] text-on-surface-variant">
                        Horario continuo 7:00 AM - 4:30 PM
                      </span>
                    </div>
                  </label>

                  <label
                    htmlFor="radio-ctx-suba"
                    className={`flex items-start gap-3 p-3 rounded-[8px] border transition-colors cursor-pointer min-h-[44px] ${guiaTurno === "suba"
                        ? "border-primary/50 bg-[#FAE7EB]/40"
                        : "border-surface-container-high bg-white hover:bg-surface-container-lowest"
                      }`}
                  >
                    <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px] mt-0.5">
                      <input
                        type="radio"
                        id="radio-ctx-suba"
                        name="canal-entrega"
                        value="suba"
                        checked={guiaTurno === "suba"}
                        onChange={(e) => setGuiaTurno(e.target.value)}
                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                      />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading text-xs font-bold text-on-surface">
                        SuperCADE Suba (Avenida Calle 145 # 103B-90)
                      </span>
                      <span className="font-body text-[11px] text-on-surface-variant">
                        Horario continuo 7:00 AM - 4:30 PM
                      </span>
                    </div>
                  </label>
                </fieldset>
              </div>

              {/* Contexto B: Selección Binaria */}
              <div className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-3">
                <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
                  Caso 2: Pregunta Binaria Condicional (Sisbén)
                </span>
                <fieldset className="flex flex-col gap-2 mt-1">
                  <legend className="font-heading text-xs font-bold text-on-surface mb-1">
                    ¿Tu núcleo familiar cuenta con encuesta Sisbén IV en Bogotá?
                  </legend>

                  <div className="flex items-center gap-6 p-3 bg-white rounded-[8px] border border-surface-container-high">
                    <label
                      htmlFor="radio-sisben-si"
                      className="flex items-center gap-2.5 cursor-pointer min-h-[44px]"
                    >
                      <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
                        <input
                          type="radio"
                          id="radio-sisben-si"
                          name="sisben-demo"
                          value="si"
                          checked={guiaBinario === "si"}
                          onChange={(e) => setGuiaBinario(e.target.value)}
                          className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                        />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <span className="font-heading text-xs font-bold text-on-surface">Sí</span>
                    </label>

                    <label
                      htmlFor="radio-sisben-no"
                      className="flex items-center gap-2.5 cursor-pointer min-h-[44px]"
                    >
                      <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
                        <input
                          type="radio"
                          id="radio-sisben-no"
                          name="sisben-demo"
                          value="no"
                          checked={guiaBinario === "no"}
                          onChange={(e) => setGuiaBinario(e.target.value)}
                          className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                        />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <span className="font-heading text-xs font-bold text-on-surface">No</span>
                    </label>
                  </div>

                  {guiaBinario === "si" ? (
                    <p className="text-[11px] text-[#1B7A2E] font-body bg-[#EAF5EC] p-2.5 rounded border border-[#1B7A2E]/20 mt-1">
                      ✓ El sistema consultará automáticamente tu puntaje y grupo mediante
                      interoperabilidad distrital.
                    </p>
                  ) : (
                    <p className="text-[11px] text-amber-900 font-body bg-[#FFF8E1] p-2.5 rounded border border-amber-300 mt-1">
                      ℹ Podrás agendar la visita de encuesta Sisbén en el siguiente paso de tu
                      trámite.
                    </p>
                  )}
                </fieldset>
              </div>
            </div>
          </div>

          {/* Pautas de Contenido y UX Writing */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-4">
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Lineamientos de Redacción
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
              Reglas de UX Writing para Botones de Radio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-body text-xs text-on-surface-variant mt-1">
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                <strong className="font-heading font-bold text-on-surface text-sm">
                  1. Título del Grupo (Legend)
                </strong>
                <p className="leading-relaxed">
                  Formula el <code>&lt;legend&gt;</code> como una pregunta clara o una instrucción
                  directa. Nunca omitas el título de grupo; si visualmente parece redundante, usa{" "}
                  <code>className=&quot;sr-only&quot;</code>.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                <strong className="font-heading font-bold text-on-surface text-sm">
                  2. Estructura de Etiqueta
                </strong>
                <p className="leading-relaxed">
                  Inicia la etiqueta con la palabra que marque la diferencia sustantiva entre las
                  opciones (ej. <em>&ldquo;Virtual&rdquo;</em> vs <em>&ldquo;Presencial&rdquo;</em>
                  ).
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                <strong className="font-heading font-bold text-on-surface text-sm">
                  3. Puntuación y Mayúsculas
                </strong>
                <p className="leading-relaxed">
                  No coloques punto final en etiquetas breves. Únicamente usa punto cuando la
                  descripción secundaria contenga dos o más oraciones completas.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: CÓDIGO (PLAYGROUND) */}
      {/* ========================================================================= */}
      {activeTab === "codigo" && (
        <section
          id="panel-codigo"
          role="tabpanel"
          aria-labelledby="tab-codigo"
          className="flex flex-col gap-6 animate-in fade-in duration-150"
        >
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div>
              <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
                Laboratorio Interactivo
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mt-1">
                Playground y Variantes del Botón de Radio
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                Interactúa con las 4 variantes estándar del Kit UI Bogotá. Puedes alternar entre la
                vista previa del componente y el código fuente en React / Tailwind CSS listo para
                copiar y pegar.
              </p>
            </div>

            {/* Componente Playground */}
            <RadioPlayground />
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 3: ESPECIFICACIONES */}
      {/* ========================================================================= */}
      {activeTab === "especificaciones" && (
        <section
          id="panel-especificaciones"
          role="tabpanel"
          aria-labelledby="tab-especificaciones"
          className="flex flex-col gap-8 animate-in fade-in duration-150"
        >
          {/* Anatomía del Componente */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div>
              <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
                Construcción y Geometría
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mt-1">
                Anatomía del Botón de Radio
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                Diagrama anatómico que desglosa las zonas interactivas, proporciones y etiquetas del
                componente.
              </p>
            </div>

            {/* Diagrama Simulado con HTML/CSS */}
            <div className="p-8 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col items-center justify-center gap-6">
              <div className="relative flex items-start gap-4 p-6 bg-white rounded-[10px] border border-surface-container-high shadow-sm max-w-md w-full">
                {/* 1. Indicador Radial */}
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full border-2 border-[#CC0E35] flex items-center justify-center bg-white relative">
                    <span className="w-3 h-3 rounded-full bg-[#CC0E35]" />
                    {/* Badge 1 */}
                    <span className="absolute -top-3 -left-3 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      1
                    </span>
                  </div>
                </div>

                {/* 2. Contenedor Textual */}
                <div className="flex flex-col flex-1 relative">
                  <span className="font-heading text-sm font-bold text-on-surface relative inline-block">
                    Etiqueta de la Opción (Label)
                    {/* Badge 2 */}
                    <span className="absolute -top-3 -right-6 w-5 h-5 rounded-full bg-tertiary text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      2
                    </span>
                  </span>
                  <span className="font-body text-xs text-on-surface-variant mt-0.5 relative inline-block">
                    Texto de ayuda secundario o descripción explicativa
                    {/* Badge 3 */}
                    <span className="absolute -bottom-2 -right-6 w-5 h-5 rounded-full bg-secondary text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      3
                    </span>
                  </span>
                </div>
              </div>

              {/* Leyenda de la Anatomía */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full font-body text-xs">
                <div className="flex items-start gap-2 p-3 bg-white rounded-[8px] border border-surface-container-high">
                  <span className="w-5 h-5 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <div>
                    <strong className="text-on-surface block font-semibold">Casilla Radial</strong>
                    <span className="text-on-surface-variant">
                      20x20px o 24x24px con borde de 2px y punto central de 10px en #CC0E35.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-white rounded-[8px] border border-surface-container-high">
                  <span className="w-5 h-5 rounded-full bg-tertiary text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <div>
                    <strong className="text-on-surface block font-semibold">
                      Etiqueta Principal
                    </strong>
                    <span className="text-on-surface-variant">
                      Fuente Montserrat 14px (font-bold) asociada mediante atributo htmlFor.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-white rounded-[8px] border border-surface-container-high">
                  <span className="w-5 h-5 rounded-full bg-secondary text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <div>
                    <strong className="text-on-surface block font-semibold">Texto de Ayuda</strong>
                    <span className="text-on-surface-variant">
                      Fuente Work Sans 12px con contraste accesible vinculada con aria-describedby.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matriz de Estados Visuales */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div>
              <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
                Tokens y Microinteracciones
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mt-1">
                Estados Visuales del Componente
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                Cada estado comunica al usuario el comportamiento actual del control mediante
                cambios de borde, fondo y foco accesible:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Estado 1: Predeterminado */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-on-surface-variant font-mono">
                  1. Predeterminado (Default)
                </span>
                <div className="flex items-center gap-3 p-3 bg-white rounded-[8px] border border-surface-container-high min-h-[44px]">
                  <span className="w-5 h-5 rounded-full border-2 border-[#666666] shrink-0" />
                  <span className="font-body text-xs text-on-surface">
                    Sin seleccionar (Borde #666666)
                  </span>
                </div>
              </div>

              {/* Estado 2: Sobre (Hover) */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-on-surface-variant font-mono">
                  2. Sobre (Hover)
                </span>
                <div className="flex items-center gap-3 p-3 bg-[#F6F3F2] rounded-[8px] border border-surface-container-highest min-h-[44px] cursor-pointer">
                  <span className="w-5 h-5 rounded-full border-2 border-[#333333] shrink-0 bg-white" />
                  <span className="font-body text-xs text-on-surface font-medium">
                    Fondo tenue #F6F3F2
                  </span>
                </div>
              </div>

              {/* Estado 3: En foco (Focus Accesible) */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-tertiary font-mono">
                  3. En foco (Focus)
                </span>
                <div className="flex items-center gap-3 p-3 bg-white rounded-[8px] border border-surface-container-high min-h-[44px] ring-2 ring-[#0049AE] ring-offset-2">
                  <span className="w-5 h-5 rounded-full border-2 border-[#CC0E35] flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35]" />
                  </span>
                  <span className="font-body text-xs text-on-surface font-semibold">
                    Anillo azul #0049AE
                  </span>
                </div>
              </div>

              {/* Estado 4: Seleccionado (Checked) */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-primary font-mono">
                  4. Seleccionado (Checked)
                </span>
                <div className="flex items-center gap-3 p-3 bg-[#FAE7EB]/40 rounded-[8px] border border-primary/30 min-h-[44px]">
                  <span className="w-5 h-5 rounded-full border-2 border-[#CC0E35] flex items-center justify-center shrink-0 bg-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35]" />
                  </span>
                  <span className="font-body text-xs text-primary font-bold">
                    Rojo Bogotá #CC0E35
                  </span>
                </div>
              </div>

              {/* Estado 5: Error de Validación */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#BA1A1A] font-mono">
                  5. Error (Invalid)
                </span>
                <div className="flex flex-col gap-1 p-3 bg-red-50/70 rounded-[8px] border border-[#BA1A1A] min-h-[44px]">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full border-2 border-[#BA1A1A] shrink-0 bg-white" />
                    <span className="font-body text-xs text-[#BA1A1A] font-semibold">Campo</span>
                  </div>
                  <span className="text-[10px] text-[#BA1A1A] pl-8 font-body">
                    Debes elegir una opción para continuar
                  </span>
                </div>
              </div>

              {/* Estado 6: Deshabilitado (Disabled) */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-on-surface-variant font-mono">
                  6. Deshabilitado
                </span>
                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-[8px] border border-surface-container-high min-h-[44px] opacity-50 cursor-not-allowed">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-400 shrink-0" />
                  <span className="font-body text-xs text-on-surface-variant">
                    Opción no editable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 4: ACCESIBILIDAD (WCAG 2.2 AA) */}
      {/* ========================================================================= */}
      {activeTab === "accesibilidad" && (
        <section
          id="panel-accesibilidad"
          role="tabpanel"
          aria-labelledby="tab-accesibilidad"
          className="flex flex-col gap-8 animate-in fade-in duration-150"
        >
          {/* Navegación por Teclado */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-5">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-heading">
              <Keyboard className="w-4 h-4" />
              <span>Navegación por Teclado Alternativa</span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
              Patrón de Teclado WAI-ARIA 1.2
            </h3>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              El componente implementa el comportamiento canónico de W3C para grupos de radio
              buttons, permitiendo la operación completa sin requerir ratón ni pantallas táctiles:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs sm:text-sm border-collapse">
                <caption className="sr-only">Atajos de teclado para el botón de radio</caption>
                <thead>
                  <tr className="border-b-2 border-surface-container-high bg-surface-container-low text-on-surface font-heading">
                    <th scope="col" className="p-3 font-bold w-1/4">
                      Tecla
                    </th>
                    <th scope="col" className="p-3 font-bold">
                      Comportamiento Accesible
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  <tr>
                    <td className="p-3 font-mono font-bold text-primary">
                      <kbd className="px-2 py-1 bg-surface-container-highest rounded border border-surface-container-high">
                        TAB
                      </kbd>
                    </td>
                    <td className="p-3 text-on-surface-variant leading-relaxed">
                      Mueve el foco dentro del grupo de radio buttons. Si una opción ya está
                      seleccionada, el foco se sitúa en ella; de lo contrario, se posiciona en la
                      primera opción disponible.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-primary">
                      <kbd className="px-2 py-1 bg-surface-container-highest rounded border border-surface-container-high">
                        SHIFT + TAB
                      </kbd>
                    </td>
                    <td className="p-3 text-on-surface-variant leading-relaxed">
                      Mueve el foco hacia el elemento interactivo inmediatamente anterior al grupo
                      de radio.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-primary">
                      <kbd className="px-2 py-1 bg-surface-container-highest rounded border border-surface-container-high">
                        ↓
                      </kbd>{" "}
                      /{" "}
                      <kbd className="px-2 py-1 bg-surface-container-highest rounded border border-surface-container-high">
                        →
                      </kbd>
                    </td>
                    <td className="p-3 text-on-surface-variant leading-relaxed">
                      Mueve el foco y <strong>selecciona automáticamente</strong> la siguiente
                      opción del conjunto. Si el foco está en la última opción, pasa cíclicamente a
                      la primera.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-primary">
                      <kbd className="px-2 py-1 bg-surface-container-highest rounded border border-surface-container-high">
                        ↑
                      </kbd>{" "}
                      /{" "}
                      <kbd className="px-2 py-1 bg-surface-container-highest rounded border border-surface-container-high">
                        ←
                      </kbd>
                    </td>
                    <td className="p-3 text-on-surface-variant leading-relaxed">
                      Mueve el foco y selecciona automáticamente la opción anterior del grupo. Si
                      está en la primera opción, salta a la última.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-primary">
                      <kbd className="px-2 py-1 bg-surface-container-highest rounded border border-surface-container-high">
                        SPACE
                      </kbd>
                    </td>
                    <td className="p-3 text-on-surface-variant leading-relaxed">
                      Selecciona la opción actualmente enfocada en caso de que no estuviese marcada
                      por defecto.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Etiquetado Semántico  */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-4">
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Marcado HTML Semántico
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
              Asociación con &lt;fieldset&gt;, &lt;legend&gt; y &lt;label&gt;
            </h3>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Para los usuarios de lectores de pantalla (NVDA, JAWS, VoiceOver), cada opción de
              radio es incomprensible si no se anuncia junto con la pregunta global a la que
              pertenece.
            </p>

            <div className="p-4 rounded-[10px] bg-[#E8F0FE] border-l-4 border-l-[#0066CC] border border-[#0066CC]/30 text-xs text-[#003366] font-body flex flex-col gap-2">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#0049AE]">
                <Info className="w-4 h-4" />
                <span>Reglas de Cumplimiento Técnico Distrital:</span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Todo grupo de opciones de radio debe envolverse obligatoriamente en un elemento{" "}
                  <code>&lt;fieldset&gt;</code>.
                </li>
                <li>
                  El título del conjunto debe definirse dentro de la etiqueta{" "}
                  <code>&lt;legend&gt;</code> como primer hijo del fieldset.
                </li>
                <li>
                  Cada <code>&lt;input type=&quot;radio&quot;&gt;</code> debe tener un{" "}
                  <code>id</code> único vinculado al atributo <code>for</code> (o{" "}
                  <code>htmlFor</code>) de su <code>&lt;label&gt;</code>.
                </li>
                <li>
                  Si existe texto de ayuda o error, debe asociarse con{" "}
                  <code>aria-describedby=&quot;id-error&quot;</code>.
                </li>
              </ul>
            </div>
          </div>

          {/* Criterios WCAG 2.2 AA Aplicables */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-5">
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Conformidad Normativa
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
              Criterios de Éxito WCAG 2.2 Nivel AA Verificados
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1.3.1 */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    1.3.1 Info and Relationships
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface font-body">
                    Nivel A
                  </span>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  La relación entre las opciones y su pregunta se preserva programáticamente
                  mediante <code>&lt;fieldset&gt;</code> y <code>&lt;legend&gt;</code>.
                </p>
              </div>

              {/* 1.4.11 */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    1.4.11 Non-Text Contrast
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B7A2E]/10 text-[#1B7A2E] font-body">
                    Nivel AA
                  </span>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  El borde exterior del radio tiene un contraste mínimo de 3:1 frente a superficies
                  claras tanto en estado no seleccionado (<code>#666666</code>) como seleccionado (
                  <code>#CC0E35</code>).
                </p>
              </div>

              {/* 2.1.1 */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">2.1.1 Keyboard</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface font-body">
                    Nivel A
                  </span>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  Toda la funcionalidad es operable mediante teclado estándar utilizando flechas de
                  dirección y tabulador sin trampas de foco.
                </p>
              </div>

              {/* 2.4.7 */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    2.4.7 Focus Visible
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B7A2E]/10 text-[#1B7A2E] font-body">
                    Nivel AA
                  </span>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  El indicador de foco visual está garantizado con un anillo azul distrital (
                  <code>ring-2 ring-[#0049AE] ring-offset-2</code>) claramente distinguible.
                </p>
              </div>

              {/* 2.5.8 */}
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    2.5.8 Target Size (Minimum)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B7A2E]/10 text-[#1B7A2E] font-body">
                    Nivel AA (WCAG 2.2)
                  </span>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  El contenedor clickeable garantiza un área de contacto mínima de{" "}
                  <strong>44×44 px</strong> (clase <code>min-h-[44px]</code>), evitando errores de
                  pulsación accidental en pantallas táctiles y dispositivos móviles.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
