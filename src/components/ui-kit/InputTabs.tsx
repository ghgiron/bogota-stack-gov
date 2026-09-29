"use client";

import { InputPlayground } from "@/components/ui-kit/InputPlayground";
import { InputStateMatrix } from "@/components/ui-kit/InputStateMatrix";
import {
  Accessibility,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCode2,
  HelpCircle,
  Keyboard,
  Layers,
  MousePointer,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  XCircle,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

export type InputTabKey = "guia" | "especificaciones" | "codigo" | "accesibilidad";

export const InputTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InputTabKey>("guia");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("accesibilidad")) {
        setActiveTab("accesibilidad");
      } else if (hash.includes("especificaciones") || hash.includes("estados")) {
        setActiveTab("especificaciones");
      } else if (hash.includes("codigo") || hash.includes("playground")) {
        setActiveTab("codigo");
      } else if (hash.includes("guia")) {
        setActiveTab("guia");
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Barra de Pestañas Superiores (Estilo Obelisco BA & SGDS Singapur) */}
      <div
        className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
        role="tablist"
        aria-label="Pestañas de documentación del componente Inputs"
      >
        <button
          type="button"
          role="tab"
          id="tab-guia"
          aria-controls="panel-guia"
          aria-selected={activeTab === "guia"}
          onClick={() => setActiveTab("guia")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${
            activeTab === "guia"
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
          id="tab-especificaciones"
          aria-controls="panel-especificaciones"
          aria-selected={activeTab === "especificaciones"}
          onClick={() => setActiveTab("especificaciones")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${
            activeTab === "especificaciones"
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
          id="tab-codigo"
          aria-controls="panel-codigo"
          aria-selected={activeTab === "codigo"}
          onClick={() => setActiveTab("codigo")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${
            activeTab === "codigo"
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
          id="tab-accesibilidad"
          aria-controls="panel-accesibilidad"
          aria-selected={activeTab === "accesibilidad"}
          onClick={() => setActiveTab("accesibilidad")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${
            activeTab === "accesibilidad"
              ? "border-[#CC0E35] text-[#CC0E35]"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">accessibility_new</span>
          <span>Accesibilidad (WCAG 2.2)</span>
        </button>
      </div>

      {/* CONTENIDO DE LAS PESTAÑAS */}

      {/* ========================================================= */}
      {/* PESTAÑA 1: GUÍA DE USO */}
      {/* ========================================================= */}
      {activeTab === "guia" && (
        <div
          id="panel-guia"
          role="tabpanel"
          aria-labelledby="tab-guia"
          className="flex flex-col gap-8 w-full"
        >
          {/* CUÁNDO USAR vs CUÁNDO NO USAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cuándo SÍ usar */}
            <div className="p-6 rounded-[12px] bg-[#EAF5EC]/40 border border-[#1B7A2E]/20 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#1B7A2E] font-heading font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Cuándo usar este componente</span>
              </div>
              <ul className="flex flex-col gap-2 font-body text-xs sm:text-sm text-on-surface leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#1B7A2E] font-bold">•</span>
                  <span>
                    <strong>Captura de datos en una sola línea:</strong> Nombres, apellidos, número
                    de cédula, NIT, correo electrónico o teléfono.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B7A2E] font-bold">•</span>
                  <span>
                    <strong>Valores variables o impredecibles:</strong> Cuando la información
                    solicitada no puede limitarse a una lista fija de opciones.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B7A2E] font-bold">•</span>
                  <span>
                    <strong>Búsquedas y filtros en tiempo real:</strong> En combinación con íconos
                    de lupa o prefijos identificadores.
                  </span>
                </li>
              </ul>
            </div>

            {/* Cuándo NO usar */}
            <div className="p-6 rounded-[12px] bg-[#FAE7EB]/40 border border-[#CC0E35]/20 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary font-heading font-bold text-sm">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>Cuándo NO usar (Alternativas)</span>
              </div>
              <ul className="flex flex-col gap-2 font-body text-xs sm:text-sm text-on-surface leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Textos largos (más de 3 líneas):</strong> No use un input simple; use el
                    componente <code>Textarea</code> (Área de texto).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Opciones fijas y reducidas (menores a 5):</strong> Use{" "}
                    <code>Botón de Radio</code> para permitir visualización inmediata de todas las
                    alternativas.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Opciones múltiples o listas largas (&gt; 5):</strong> Use un componente{" "}
                    <code>Select</code> o un campo con autocompletado y búsqueda.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* ANATOMÍA FUNCIONAL DEL INPUT */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-surface-container-high pb-4">
              <span className="material-symbols-outlined text-primary text-[22px]">view_quilt</span>
              <h3 className="font-heading text-base font-bold text-on-surface">
                Anatomía Funcional de un Campo de Entrada
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Mockup Interactivo de Partes */}
              <div className="p-6 rounded-[12px] bg-[#FAF9F5] border border-[#E4E2E1] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <label
                      htmlFor="anatomy-demo"
                      className="font-body text-[16px] font-medium text-[#1B1C1C]"
                    >
                      Número de teléfono móvil
                    </label>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-tertiary text-white text-[10px] font-bold flex items-center justify-center">
                    5
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="anatomy-demo"
                    type="tel"
                    readOnly
                    value="310 456 7890"
                    className="h-[44px] w-full px-4 rounded-[5px] border border-[#B0B0B0] bg-white font-body text-[16px] text-[#1B1C1C]"
                  />
                  <span className="w-5 h-5 rounded-full bg-[#1B7A2E] text-white text-[10px] font-bold flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2">
                    2
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="w-5 h-5 rounded-full bg-[#5E6061] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <span className="font-body text-[12px] text-[#5E6061]">
                    Se enviará un código de verificación vía SMS.
                  </span>
                </div>
              </div>

              {/* Lista Descriptiva de las 5 Partes */}
              <div className="flex flex-col gap-3 font-body text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-on-surface block font-semibold">
                      Etiqueta (Label) Visible y Obligatoria:
                    </strong>
                    <span className="text-on-surface-variant text-xs">
                      En Work Sans Medium (18px). Nunca debe ocultarse ni ser sustituida por el
                      placeholder.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1B7A2E] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-on-surface block font-semibold">
                      Caja de Entrada (Container de 44px):
                    </strong>
                    <span className="text-on-surface-variant text-xs">
                      Altura mínima de 44px con esquinas redondeadas <code>rounded-[5px]</code> y
                      trazo de 1px.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0049AE] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-on-surface block font-semibold">
                      Placeholder Orientativo:
                    </strong>
                    <span className="text-on-surface-variant text-xs">
                      Muestra un ejemplo de formato sugerido (#8A8A8A), no indicaciones críticas de
                      negocio.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#5E6061] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-on-surface block font-semibold">
                      Texto de Ayuda (Helper Text de 12px):
                    </strong>
                    <span className="text-on-surface-variant text-xs">
                      Proporciona contexto preventivo antes de que el usuario cometa un error.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-tertiary text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <strong className="text-on-surface block font-semibold">
                      Indicador de Obligatoriedad:
                    </strong>
                    <span className="text-on-surface-variant text-xs">
                      Asterisco rojo <code>*</code> o tag <code>(Opcional)</code> según la regla de
                      tramitación.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UX WRITING DISTRITAL: FÓRMULA DE ERROR EN 3 PASOS */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-surface-container-high pb-4">
              <span className="material-symbols-outlined text-primary text-[22px]">spellcheck</span>
              <h3 className="font-heading text-base font-bold text-on-surface">
                UX Writing Distrital: Fórmula de Errores Orientadores en 3 Pasos
              </h3>
            </div>

            <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              En las plataformas públicas de Bogotá, los mensajes de error no deben culpabilizar al
              usuario ni usar terminología técnica opaca. Todo mensaje debe estructurarse con la
              fórmula distrital:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mx-auto flex items-center justify-center">
                  1
                </span>
                <strong className="font-heading text-xs font-bold text-on-surface mt-1">
                  ¿Qué ocurrió?
                </strong>
                <span className="text-xs text-on-surface-variant">
                  Identificar el error de forma directa y neutra.
                </span>
              </div>
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1">
                <span className="w-6 h-6 rounded-full bg-tertiary text-white text-xs font-bold mx-auto flex items-center justify-center">
                  2
                </span>
                <strong className="font-heading text-xs font-bold text-on-surface mt-1">
                  ¿Por qué?
                </strong>
                <span className="text-xs text-on-surface-variant">
                  Indicar brevemente la regla de negocio incumplida.
                </span>
              </div>
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1">
                <span className="w-6 h-6 rounded-full bg-[#1B7A2E] text-white text-xs font-bold mx-auto flex items-center justify-center">
                  3
                </span>
                <strong className="font-heading text-xs font-bold text-on-surface mt-1">
                  ¿Cómo solucionarlo?
                </strong>
                <span className="text-xs text-on-surface-variant">
                  Dar la instrucción precisa y un ejemplo de formato.
                </span>
              </div>
            </div>

            {/* TABLA COMPARATIVA: ANTES VS DESPUÉS */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs sm:text-sm border border-surface-container-high rounded-[8px]">
                <thead className="bg-surface-container text-on-surface font-heading font-bold text-xs uppercase">
                  <tr>
                    <th className="p-3.5 border-b border-surface-container-high">Campo</th>
                    <th className="p-3.5 border-b border-surface-container-high text-primary">
                      Redacción Errónea (Evitar)
                    </th>
                    <th className="p-3.5 border-b border-surface-container-high text-[#1B7A2E]">
                      Redacción Distrital Accesible
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  <tr className="hover:bg-surface-container-low/60">
                    <td className="p-3.5 font-semibold text-on-surface">Correo Electrónico</td>
                    <td className="p-3.5 text-on-surface-variant">
                      <span className="inline-flex items-center gap-1 text-primary">
                        ✕ "Email inválido."
                      </span>
                    </td>
                    <td className="p-3.5 text-on-surface">
                      <span className="inline-flex items-center gap-1 text-[#1B7A2E] font-medium">
                        ✓ "El correo electrónico no es válido. Asegúrate de incluir el signo @ y un
                        dominio como @bogota.gov.co"
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60">
                    <td className="p-3.5 font-semibold text-on-surface">Documento de Identidad</td>
                    <td className="p-3.5 text-on-surface-variant">
                      <span className="inline-flex items-center gap-1 text-primary">
                        ✕ "Dato incorrecto."
                      </span>
                    </td>
                    <td className="p-3.5 text-on-surface">
                      <span className="inline-flex items-center gap-1 text-[#1B7A2E] font-medium">
                        ✓ "El número de documento debe contener entre 6 y 10 dígitos numéricos, sin
                        puntos ni espacios."
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60">
                    <td className="p-3.5 font-semibold text-on-surface">Contraseña</td>
                    <td className="p-3.5 text-on-surface-variant">
                      <span className="inline-flex items-center gap-1 text-primary">
                        ✕ "Clave no permitida."
                      </span>
                    </td>
                    <td className="p-3.5 text-on-surface">
                      <span className="inline-flex items-center gap-1 text-[#1B7A2E] font-medium">
                        ✓ "La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula y un
                        número."
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PESTAÑA 2: ESPECIFICACIONES (COTAS Y MATRIZ DE ESTADOS) */}
      {/* ========================================================= */}
      {activeTab === "especificaciones" && (
        <div
          id="panel-especificaciones"
          role="tabpanel"
          aria-labelledby="tab-especificaciones"
          className="flex flex-col gap-8 w-full"
        >
          <InputStateMatrix />
        </div>
      )}

      {/* ========================================================= */}
      {/* PESTAÑA 3: CÓDIGO (PLAYGROUND DE VARIANTES) */}
      {/* ========================================================= */}
      {activeTab === "codigo" && (
        <div
          id="panel-codigo"
          role="tabpanel"
          aria-labelledby="tab-codigo"
          className="flex flex-col gap-8 w-full"
        >
          <InputPlayground />
        </div>
      )}

      {/* ========================================================= */}
      {/* PESTAÑA 4: ACCESIBILIDAD (WCAG 2.2 AA) */}
      {/* ========================================================= */}
      {activeTab === "accesibilidad" && (
        <div
          id="panel-accesibilidad"
          role="tabpanel"
          aria-labelledby="tab-accesibilidad"
          className="flex flex-col gap-8 w-full"
        >
          {/* MATRIZ DE CRITERIOS WCAG 2.2 AA */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1B7A2E] text-[22px]">
                  verified
                </span>
                <h3 className="font-heading text-base font-bold text-on-surface">
                  Lista de Verificación de Accesibilidad (WCAG 2.2 Nivel AA)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#EAF5EC] text-[#1B7A2E] border border-[#1B7A2E]/20">
                Acreditado AA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-heading font-bold text-on-surface">
                    1. Etiquetado Semántico Estricto
                  </strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    WCAG 1.3.1 (A)
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Todo campo <code>&lt;input&gt;</code> posee un elemento <code>&lt;label&gt;</code>{" "}
                  con el atributo <code>for</code> correspondiente al <code>id</code> del campo,
                  garantizando que el lector de pantalla enuncie la etiqueta de inmediato.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-heading font-bold text-on-surface">
                    2. Prohibición de Sustitución
                  </strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    WCAG 3.3.2 (A)
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  El atributo <code>placeholder</code> jamás debe reemplazar la etiqueta visible.
                  Desaparece cuando el usuario escribe, genera pérdida de memoria de trabajo y
                  desorienta en formularios extensos.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-heading font-bold text-on-surface">
                    3. Ratios de Contraste Cromático
                  </strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    WCAG 1.4.3 / 1.4.11
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Texto digitado (#1B1C1C) supera 14.2:1 contra fondo blanco (mínimo 4.5:1). Los
                  bordes (#B0B0B0) superan 3:1 contra el fondo adyacente para delimitar claramente
                  el área activa.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-heading font-bold text-on-surface">
                    4. Lectores de Pantalla y ARIA
                  </strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    WCAG 3.3.1 (A)
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Asociación de textos de ayuda mediante <code>aria-describedby="help-id"</code> y
                  de mensajes de error con <code>aria-invalid="true"</code> para que los lectores
                  (JAWS, NVDA, VoiceOver) anuncien el error al entrar en el campo.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-heading font-bold text-on-surface">
                    5. Identificación del Propósito (Autocomplete)
                  </strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    WCAG 1.3.5 (AA)
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Inclusión de <code>autocomplete="name"</code>, <code>email</code>,{" "}
                  <code>tel</code>, <code>postal-code</code> para que los navegadores autocompleten
                  datos de forma inmediata conforme al principio Once-Only.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-heading font-bold text-on-surface">
                    6. Área Táctil Mínima de 44px
                  </strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    WCAG 2.5.8 (AA)
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  La caja de entrada posee una altura estricta de 44px (<code>h-[44px]</code>) que
                  garantiza activación cómoda y sin errores en pantallas táctiles y dispositivos
                  móviles.
                </p>
              </div>
            </div>
          </div>

          {/* NAVEGACIÓN POR TECLADO */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-surface-container-high pb-4">
              <Keyboard className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-base font-bold text-on-surface">
                Comportamiento y Navegación por Teclado
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs sm:text-sm border border-surface-container-high rounded-[8px]">
                <thead className="bg-surface-container text-on-surface font-heading font-bold text-xs uppercase">
                  <tr>
                    <th className="p-3.5 border-b border-surface-container-high">
                      Tecla / Comando
                    </th>
                    <th className="p-3.5 border-b border-surface-container-high">
                      Comportamiento en el Input
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  <tr className="hover:bg-surface-container-low/60">
                    <td className="p-3.5 font-mono font-bold text-primary">Tab</td>
                    <td className="p-3.5 text-on-surface">
                      Mueve el foco secuencialmente hacia el campo de texto y activa el anillo
                      exterior de foco accesible (<code>ring-2 ring-[#0049AE]</code>).
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60">
                    <td className="p-3.5 font-mono font-bold text-primary">Shift + Tab</td>
                    <td className="p-3.5 text-on-surface">
                      Mueve el foco en reversa hacia el elemento interactivo inmediatamente
                      anterior.
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60">
                    <td className="p-3.5 font-mono font-bold text-primary">
                      Enter / Espacio (en botón de ojo)
                    </td>
                    <td className="p-3.5 text-on-surface">
                      En campos de contraseña, activa el botón de alternar visibilidad y actualiza
                      el <code>aria-label</code> a "Ocultar contraseña".
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60">
                    <td className="p-3.5 font-mono font-bold text-primary">Esc</td>
                    <td className="p-3.5 text-on-surface">
                      En campos de búsqueda con botón de limpieza, limpia el contenido del input y
                      devuelve el foco al campo.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
