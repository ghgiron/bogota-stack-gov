"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Edit2,
  Loader2,
  Maximize2,
  Send,
  Trash2,
  XCircle,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export type ButtonSectionVariant = "types" | "sizes" | "expandable" | "icons" | "loading";

export const ButtonPlayground: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"visual" | "code">("visual");
  const [activeSection, setActiveSection] = useState<ButtonSectionVariant>("types");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  const toggleLoading = () => {
    setIsLoadingDemo(true);
    setTimeout(() => {
      setIsLoadingDemo(false);
    }, 2500);
  };

  const getCodeSnippet = (): string => {
    switch (activeSection) {
      case "types":
        return `// 1. Tipos de Botones Oficiales Kit UI Bogotá (rounded-full + Transición Amarillo / Rojo)

// Botón Primario: Default Amarillo (#FAB62D), Hover Rojo (#CC0E35), Anillo de Foco (#CC0E35)
<button
  type="button"
  className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 active:scale-[0.98]"
>
  Botón Primario
</button>

// Botón Secundario: Fondo Transparente, Texto Rojo (#CC0E35), Sin Borde, Hover Rosado (#FAE7EB)
<button
  type="button"
  className="bg-transparent text-[#CC0E35] hover:bg-[#FAE7EB] hover:text-[#A80B2B] rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 active:scale-[0.98]"
>
  Botón Secundario
</button>

// Botón Terciario (Ghost / Retorno)
<button
  type="button"
  className="bg-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-full font-semibold px-6 py-3 min-h-[44px] inline-flex items-center justify-center font-body text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 active:scale-[0.98]"
>
  Cancelar / Volver
</button>

// Botón de Éxito (#1B7A2E)
<button
  type="button"
  className="bg-[#1B7A2E] text-white hover:bg-[#145d23] rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1B7A2E] focus:ring-offset-2 active:scale-[0.98]"
>
  Confirmar Pago
</button>

// Botón de Error / Destructivo (#BA1A1A)
<button
  type="button"
  className="bg-[#BA1A1A] text-white hover:bg-[#931313] rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#BA1A1A] focus:ring-offset-2 active:scale-[0.98]"
>
  Eliminar Solicitud
</button>`;

      case "sizes":
        return `// 2. Variantes de Tamaño Oficiales (Sistema Obelisco + Kit UI Bogotá)

// Tamaño Chico (py-1.5 px-4 text-sm)
<button
  type="button"
  className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold py-1.5 px-4 text-sm min-h-[36px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
>
  Chico
</button>

// Tamaño Mediano - Estándar (py-2.5 px-6 text-base)
<button
  type="button"
  className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold py-2.5 px-6 text-base min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
>
  Mediano (Base)
</button>

// Tamaño Grande (py-3.5 px-8 text-lg)
<button
  type="button"
  className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold py-3.5 px-8 text-lg min-h-[52px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
>
  Grande
</button>`;

      case "expandable":
        return `// 3. Botón Expandible (100% Ancho del Contenedor - w-full)
<div className="w-full max-w-md">
  <button
    type="button"
    className="w-full bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold px-8 py-3.5 text-[16px] min-h-[48px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 active:scale-[0.99]"
  >
    <span>Continuar al Pago del Trámite</span>
  </button>
</div>`;

      case "icons":
        return `// 4. Botones con Ícono y Botón Circular (w-12 h-12 rounded-full)

// Con Ícono a la Izquierda
<button
  type="button"
  className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
>
  <span className="material-symbols-outlined text-[20px]">download</span>
  <span>Descargar Certificado</span>
</button>

// Con Ícono a la Derecha
<button
  type="button"
  className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
>
  <span>Continuar al Paso 2</span>
  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>

// Botón Circular Solo Ícono (Mandatorio aria-label descriptivo)
<button
  type="button"
  aria-label="Editar registro catastral"
  className="w-12 h-12 rounded-full p-0 flex items-center justify-center bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
>
  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">edit</span>
</button>`;

      case "loading":
        return `// 5. Botón con Spinner (Cargando / Procesamiento Asíncrono)
<button
  type="button"
  disabled={isLoading}
  aria-busy={isLoading}
  className="bg-[#FAB62D] text-[#1B1C1C] rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2.5 font-body text-[16px] shadow-xs cursor-wait opacity-90 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
>
  <span className="material-symbols-outlined animate-spin text-[20px]" aria-hidden="true">
    progress_activity
  </span>
  <span>Cargando...</span>
</button>`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Selector de 5 Variantes y Sub-tabs (Componente vs HTML/React) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-high pb-4">
        {/* Selector de Sección */}
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="Variantes de botones del Kit UI"
        >
          <button
            type="button"
            onClick={() => setActiveSection("types")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[34px] ${
              activeSection === "types"
                ? "bg-primary text-white shadow-xs font-bold"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            1. Tipos
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("sizes")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[34px] ${
              activeSection === "sizes"
                ? "bg-primary text-white shadow-xs font-bold"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            2. Tamaños
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("expandable")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[34px] ${
              activeSection === "expandable"
                ? "bg-primary text-white shadow-xs font-bold"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            3. Expandible
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("icons")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[34px] ${
              activeSection === "icons"
                ? "bg-primary text-white shadow-xs font-bold"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            4. Con Ícono
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("loading")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[34px] ${
              activeSection === "loading"
                ? "bg-primary text-white shadow-xs font-bold"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            5. Con Spinner (Cargando)
          </button>
        </div>

        {/* Sub-tabs Visual / Código */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-full self-start">
          <button
            type="button"
            onClick={() => setActiveSubTab("visual")}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all min-h-[32px] flex items-center gap-1.5 ${
              activeSubTab === "visual"
                ? "bg-surface-container-lowest text-on-surface shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Componente</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("code")}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all min-h-[32px] flex items-center gap-1.5 ${
              activeSubTab === "code"
                ? "bg-surface-container-lowest text-on-surface shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span>HTML / React</span>
          </button>
        </div>
      </div>

      {/* Panel 1: Renderizado Visual Interactivo */}
      {activeSubTab === "visual" && (
        <div className="p-8 sm:p-12 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-xs flex flex-col items-center justify-center gap-6">
          {/* SECCIÓN 1: TIPOS */}
          <div
            hidden={activeSection !== "types"}
            className={
              activeSection === "types" ? "flex flex-col items-center gap-6 w-full" : "hidden"
            }
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Primario: Default Amarillo (#FAB62D), Hover Rojo (#CC0E35) */}
              <button
                type="button"
                className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 active:scale-[0.98]"
              >
                Botón Primario
              </button>

              {/* Secundario: Transparente, Texto Rojo, Sin Borde, Hover Rosado */}
              <button
                type="button"
                className="bg-transparent text-[#CC0E35] hover:bg-[#FAE7EB] hover:text-[#A80B2B] rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 active:scale-[0.98]"
              >
                Botón Secundario
              </button>

              {/* Terciario / Ghost */}
              <button
                type="button"
                className="bg-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-full font-semibold px-6 py-3 min-h-[44px] inline-flex items-center justify-center font-body text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 active:scale-[0.98]"
              >
                Cancelar / Volver
              </button>

              {/* Éxito */}
              <button
                type="button"
                className="bg-[#1B7A2E] text-white hover:bg-[#145d23] rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1B7A2E] focus:ring-offset-2 active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar Pago</span>
              </button>

              {/* Error */}
              <button
                type="button"
                className="bg-[#BA1A1A] text-white hover:bg-[#931313] rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#BA1A1A] focus:ring-offset-2 active:scale-[0.98]"
              >
                <XCircle className="w-4 h-4" />
                <span>Eliminar Solicitud</span>
              </button>
            </div>

            <span className="text-xs text-on-surface-variant font-body text-center max-w-lg">
              Los botones del Kit UI Bogotá emplean forma estricta de píldora (
              <code>rounded-full</code>). El botón primario transiciona elegantemente de{" "}
              <strong>Amarillo (#FAB62D)</strong> en estado base a <strong>Rojo (#CC0E35)</strong>{" "}
              en estado hover.
            </span>
          </div>

          {/* SECCIÓN 2: TAMAÑOS (SISTEMA OBELISCO) */}
          <div
            hidden={activeSection !== "sizes"}
            className={
              activeSection === "sizes" ? "flex flex-col items-center gap-6 w-full" : "hidden"
            }
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Chico */}
              <button
                type="button"
                className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold py-1.5 px-4 text-sm min-h-[36px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                Chico (py-1.5 px-4)
              </button>

              {/* Mediano */}
              <button
                type="button"
                className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold py-2.5 px-6 text-base min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                Mediano (py-2.5 px-6)
              </button>

              {/* Grande */}
              <button
                type="button"
                className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold py-3.5 px-8 text-lg min-h-[52px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                Grande (py-3.5 px-8)
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-surface-container-high w-full max-w-lg">
              {/* Secundario Chico */}
              <button
                type="button"
                className="bg-transparent text-[#CC0E35] hover:bg-[#FAE7EB] rounded-full font-semibold py-1.5 px-4 text-sm min-h-[36px] inline-flex items-center justify-center font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                Secundario Chico
              </button>
              {/* Secundario Mediano */}
              <button
                type="button"
                className="bg-transparent text-[#CC0E35] hover:bg-[#FAE7EB] rounded-full font-semibold py-2.5 px-6 text-base min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                Secundario Mediano
              </button>
              {/* Secundario Grande */}
              <button
                type="button"
                className="bg-transparent text-[#CC0E35] hover:bg-[#FAE7EB] rounded-full font-semibold py-3.5 px-8 text-lg min-h-[52px] inline-flex items-center justify-center font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                Secundario Grande
              </button>
            </div>
          </div>

          {/* SECCIÓN 3: EXPANDIBLE (100% ANCHO) */}
          <div
            hidden={activeSection !== "expandable"}
            className={
              activeSection === "expandable"
                ? "flex flex-col items-center gap-6 w-full max-w-lg"
                : "hidden"
            }
          >
            <div className="w-full flex flex-col gap-3">
              <button
                type="button"
                className="w-full bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold px-8 py-3.5 text-[16px] min-h-[48px] inline-flex items-center justify-center gap-2 font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 active:scale-[0.99]"
              >
                <span>Continuar al Pago del Trámite (100% Ancho)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="w-full bg-transparent text-[#CC0E35] hover:bg-[#FAE7EB] hover:text-[#A80B2B] rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                <span>Guardar Borrador y Salir</span>
              </button>
            </div>

            <span className="text-xs text-on-surface-variant font-body text-center">
              La variante expandible ocupa el 100% del contenedor padre (<code>w-full</code>). Ideal
              para formularios móviles y diálogos modales.
            </span>
          </div>

          {/* SECCIÓN 4: CON ÍCONO Y BOTÓN CIRCULAR */}
          <div
            hidden={activeSection !== "icons"}
            className={
              activeSection === "icons" ? "flex flex-col items-center gap-6 w-full" : "hidden"
            }
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Ícono Izquierda */}
              <button
                type="button"
                className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Certificado</span>
              </button>

              {/* Ícono Derecha */}
              <button
                type="button"
                className="bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
              >
                <span>Continuar al Paso 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Botón Circular Solo Ícono (Primario w-12 h-12) */}
              <button
                type="button"
                aria-label="Editar registro catastral de predio"
                className="w-12 h-12 rounded-full p-0 flex items-center justify-center bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
                title="Editar registro catastral"
              >
                <Edit2 className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Botón Circular Solo Ícono (Secundario w-12 h-12) */}
              <button
                type="button"
                aria-label="Eliminar documento adjunto"
                className="w-12 h-12 rounded-full p-0 flex items-center justify-center bg-transparent text-[#CC0E35] hover:bg-[#FAE7EB] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
                title="Eliminar documento adjunto"
              >
                <Trash2 className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-3 bg-surface-container-low rounded-[8px] border border-surface-container-high text-xs text-on-surface-variant font-body max-w-lg text-center">
              <strong>Regla de Accesibilidad:</strong> Si el botón es circular o de solo ícono (
              <code>w-12 h-12 rounded-full</code>), el atributo <code>aria-label</code> es{" "}
              <strong>estrictamente </strong>.
            </div>
          </div>

          {/* SECCIÓN 5: CON SPINNER (CARGANDO) */}
          <div
            hidden={activeSection !== "loading"}
            className={
              activeSection === "loading" ? "flex flex-col items-center gap-6 w-full" : "hidden"
            }
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Botón reactivo con spinner animado */}
              <button
                type="button"
                disabled={isLoadingDemo}
                aria-busy={isLoadingDemo}
                onClick={toggleLoading}
                className={`font-semibold rounded-full px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2.5 font-body text-[16px] transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 ${
                  isLoadingDemo
                    ? "bg-[#FAB62D] text-[#1B1C1C] cursor-wait select-none opacity-90"
                    : "bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white active:scale-[0.98]"
                }`}
              >
                {isLoadingDemo ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#1B1C1C]" aria-hidden="true" />
                    <span>Cargando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Radicar Trámite (Probar Carga)</span>
                  </>
                )}
              </button>

              {/* Botón estático cargando */}
              <button
                type="button"
                disabled
                aria-busy="true"
                className="bg-[#FAB62D]/60 text-[#1B1C1C]/70 rounded-full font-semibold px-8 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 font-body text-[16px] cursor-wait select-none shadow-xs"
              >
                <Loader2 className="w-5 h-5 animate-spin text-[#1B1C1C]" aria-hidden="true" />
                <span>Cargando...</span>
              </button>
            </div>

            <span className="text-xs text-on-surface-variant font-body text-center max-w-md">
              Pulsa el botón de arriba para probar el estado reactivo con el spinner animado (
              <code>animate-spin</code>) y el texto oficial{" "}
              <strong>&ldquo;Cargando...&rdquo;</strong> durante 2.5 segundos.
            </span>
          </div>
        </div>
      )}

      {/* Panel 2: Código Fuente Oscuro */}
      {activeSubTab === "code" && (
        <div className="relative rounded-[12px] bg-[#1E1E24] text-white p-5 font-mono text-xs overflow-x-auto shadow-md border border-gray-800">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-700">
            <span className="text-gray-400 font-sans text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Snippet React / Tailwind CSS
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 text-xs text-gray-200 transition-colors focus:outline-none focus:ring-1 focus:ring-primary min-h-[32px]"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-sans">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="font-sans">Copiar Código</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-gray-200 leading-relaxed font-mono whitespace-pre-wrap">
            {getCodeSnippet()}
          </pre>
        </div>
      )}
    </div>
  );
};
