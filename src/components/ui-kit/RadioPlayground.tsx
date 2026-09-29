"use client";

import { Check, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";

export type RadioVariant = "default" | "disabled" | "notext" | "right";

export const RadioPlayground: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"visual" | "code">("visual");
  const [activeVariant, setActiveVariant] = useState<RadioVariant>("default");

  // Estados interactivos para las variantes
  const [selectedDefault, setSelectedDefault] = useState<string>("presencial");
  const [selectedNoText, setSelectedNoText] = useState<string>("item-1");
  const [selectedRight, setSelectedRight] = useState<string>("right-1");
  const [copiedCode, setCopiedCode] = useState(false);

  const getCodeSnippet = (): string => {
    switch (activeVariant) {
      case "default":
        return `// Variante 1: Predeterminada (Accesible con fieldset y legend)
<fieldset className="flex flex-col gap-3">
  <legend className="font-heading text-sm font-bold text-on-surface mb-2">
    Modalidad de Atención para tu Trámite
  </legend>

  <label 
    htmlFor="radio-presencial" 
    className="flex items-start gap-3 min-h-[44px] p-3 rounded-[8px] border border-surface-container-high hover:bg-surface-container-low cursor-pointer transition-colors"
  >
    <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px] mt-0.5">
      <input
        type="radio"
        id="radio-presencial"
        name="modalidad-atencion"
        value="presencial"
        defaultChecked
        className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
      />
      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
    <div className="flex flex-col">
      <span className="font-heading text-sm font-bold text-on-surface">Atención Presencial en SuperCADE</span>
      <span className="font-body text-xs text-on-surface-variant">Acércate con tu documento original en la fecha seleccionada</span>
    </div>
  </label>

  <label 
    htmlFor="radio-virtual" 
    className="flex items-start gap-3 min-h-[44px] p-3 rounded-[8px] border border-surface-container-high hover:bg-surface-container-low cursor-pointer transition-colors"
  >
    <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px] mt-0.5">
      <input
        type="radio"
        id="radio-virtual"
        name="modalidad-atencion"
        value="virtual"
        className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
      />
      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
    <div className="flex flex-col">
      <span className="font-heading text-sm font-bold text-on-surface">Atención Virtual por Videollamada</span>
      <span className="font-body text-xs text-on-surface-variant">Recibe asesoría personalizada desde cualquier dispositivo</span>
    </div>
  </label>
</fieldset>`;

      case "disabled":
        return `// Variante 2: Deshabilitada (disabled + cursor-not-allowed + opacity-50)
<fieldset className="flex flex-col gap-3" disabled>
  <legend className="font-heading text-sm font-bold text-on-surface-variant mb-2">
    Horario de Atención (No disponible)
  </legend>

  <label className="flex items-center gap-3 min-h-[44px] p-3 rounded-[8px] border border-surface-container-high opacity-50 cursor-not-allowed bg-surface-container-low">
    <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
      <input
        type="radio"
        name="horario-disabled"
        disabled
        className="w-5 h-5 rounded-full border-2 border-[#666666] cursor-not-allowed"
      />
    </div>
    <span className="font-body text-sm text-on-surface-variant">Jornada Mañana (8:00 AM - 12:00 PM) - Agotado</span>
  </label>

  <label className="flex items-center gap-3 min-h-[44px] p-3 rounded-[8px] border border-surface-container-high opacity-60 cursor-not-allowed bg-surface-container-low">
    <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
      <input
        type="radio"
        name="horario-disabled"
        disabled
        defaultChecked
        className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#CC0E35] cursor-not-allowed"
      />
      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute" />
    </div>
    <span className="font-body text-sm font-semibold text-on-surface">Jornada Tarde (Previamente asignada)</span>
  </label>
</fieldset>`;

      case "notext":
        return `// Variante 3: Sin texto (Para tablas o matrices - Requiere aria-label)
<div className="flex items-center gap-6">
  <label htmlFor="radio-row-1" className="flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer">
    <span className="sr-only">Seleccionar fila 1: Predio Norte</span>
    <div className="relative flex items-center justify-center">
      <input
        type="radio"
        id="radio-row-1"
        name="table-select"
        value="item-1"
        aria-label="Seleccionar predio calle 72"
        className="peer appearance-none w-6 h-6 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
      />
      <span className="w-3 h-3 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
  </label>

  <label htmlFor="radio-row-2" className="flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer">
    <span className="sr-only">Seleccionar fila 2: Predio Centro</span>
    <div className="relative flex items-center justify-center">
      <input
        type="radio"
        id="radio-row-2"
        name="table-select"
        value="item-2"
        aria-label="Seleccionar predio carrera 7"
        className="peer appearance-none w-6 h-6 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
      />
      <span className="w-3 h-3 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
  </label>
</div>`;

      case "right":
        return `// Variante 4: Posicionamiento a la derecha (flex-row-reverse justify-between)
<fieldset className="flex flex-col gap-3">
  <legend className="font-heading text-sm font-bold text-on-surface mb-2">
    Tipo de Notificación Oficial
  </legend>

  <label 
    htmlFor="radio-right-1" 
    className="flex flex-row-reverse items-center justify-between min-h-[44px] p-3.5 rounded-[8px] border border-surface-container-high hover:bg-surface-container-low cursor-pointer transition-colors"
  >
    <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
      <input
        type="radio"
        id="radio-right-1"
        name="notif-type"
        value="right-1"
        defaultChecked
        className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
      />
      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
    <div className="flex flex-col">
      <span className="font-heading text-sm font-bold text-on-surface">Notificación Electrónica a Correo</span>
      <span className="font-body text-xs text-on-surface-variant">Envío inmediato con validez legal bajo Ley 527</span>
    </div>
  </label>

  <label 
    htmlFor="radio-right-2" 
    className="flex flex-row-reverse items-center justify-between min-h-[44px] p-3.5 rounded-[8px] border border-surface-container-high hover:bg-surface-container-low cursor-pointer transition-colors"
  >
    <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
      <input
        type="radio"
        id="radio-right-2"
        name="notif-type"
        value="right-2"
        className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
      />
      <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
    <div className="flex flex-col">
      <span className="font-heading text-sm font-bold text-on-surface">Notificación Física por Correspondencia</span>
      <span className="font-body text-xs text-on-surface-variant">Entrega certificada en la dirección de correspondencia</span>
    </div>
  </label>
</fieldset>`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Selector de Variantes y Sub-tabs (Componente vs HTML/React) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-high pb-4">
        {/* Selector de Variantes */}
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="Variantes del botón de radio"
        >
          <button
            type="button"
            onClick={() => setActiveVariant("default")}
            className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-colors min-h-[36px] ${
              activeVariant === "default"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            1. Predeterminada
          </button>
          <button
            type="button"
            onClick={() => setActiveVariant("disabled")}
            className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-colors min-h-[36px] ${
              activeVariant === "disabled"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            2. Deshabilitada
          </button>
          <button
            type="button"
            onClick={() => setActiveVariant("notext")}
            className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-colors min-h-[36px] ${
              activeVariant === "notext"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            3. Sin texto
          </button>
          <button
            type="button"
            onClick={() => setActiveVariant("right")}
            className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-colors min-h-[36px] ${
              activeVariant === "right"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            4. Posicionamiento (Derecha)
          </button>
        </div>

        {/* Sub-tabs Visual / Código */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-[5px] self-start">
          <button
            type="button"
            onClick={() => setActiveSubTab("visual")}
            className={`px-3.5 py-1.5 rounded-[5px] text-xs font-bold transition-all min-h-[34px] flex items-center gap-1.5 ${
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
            className={`px-3.5 py-1.5 rounded-[5px] text-xs font-bold transition-all min-h-[34px] flex items-center gap-1.5 ${
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
        <div className="p-6 sm:p-8 rounded-[12px] bg-surface-container-lowest border border-surface-container-high shadow-xs">
          {activeVariant === "default" && (
            <fieldset className="flex flex-col gap-3 max-w-lg">
              <legend className="font-heading text-sm font-bold text-on-surface mb-2">
                Modalidad de Atención para tu Trámite Distrital
              </legend>

              {/* Opción 1 */}
              <label
                htmlFor="radio-presencial-play"
                className={`flex items-start gap-3 min-h-[44px] p-3.5 rounded-[8px] border transition-all cursor-pointer ${
                  selectedDefault === "presencial"
                    ? "border-primary/50 bg-[#FAE7EB]/30 shadow-xs"
                    : "border-surface-container-high hover:bg-surface-container-low"
                }`}
              >
                <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px] mt-0.5">
                  <input
                    type="radio"
                    id="radio-presencial-play"
                    name="modalidad-playground"
                    value="presencial"
                    checked={selectedDefault === "presencial"}
                    onChange={(e) => setSelectedDefault(e.target.value)}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Atención Presencial en SuperCADE
                  </span>
                  <span className="font-body text-xs text-on-surface-variant mt-0.5">
                    Acércate con tu documento original en la fecha y hora seleccionada
                  </span>
                </div>
              </label>

              {/* Opción 2 */}
              <label
                htmlFor="radio-virtual-play"
                className={`flex items-start gap-3 min-h-[44px] p-3.5 rounded-[8px] border transition-all cursor-pointer ${
                  selectedDefault === "virtual"
                    ? "border-primary/50 bg-[#FAE7EB]/30 shadow-xs"
                    : "border-surface-container-high hover:bg-surface-container-low"
                }`}
              >
                <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px] mt-0.5">
                  <input
                    type="radio"
                    id="radio-virtual-play"
                    name="modalidad-playground"
                    value="virtual"
                    checked={selectedDefault === "virtual"}
                    onChange={(e) => setSelectedDefault(e.target.value)}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Atención Virtual por Videollamada
                  </span>
                  <span className="font-body text-xs text-on-surface-variant mt-0.5">
                    Recibe asesoría personalizada desde cualquier computador o celular
                  </span>
                </div>
              </label>

              {/* Opción 3 */}
              <label
                htmlFor="radio-tel-play"
                className={`flex items-start gap-3 min-h-[44px] p-3.5 rounded-[8px] border transition-all cursor-pointer ${
                  selectedDefault === "telefonico"
                    ? "border-primary/50 bg-[#FAE7EB]/30 shadow-xs"
                    : "border-surface-container-high hover:bg-surface-container-low"
                }`}
              >
                <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px] mt-0.5">
                  <input
                    type="radio"
                    id="radio-tel-play"
                    name="modalidad-playground"
                    value="telefonico"
                    checked={selectedDefault === "telefonico"}
                    onChange={(e) => setSelectedDefault(e.target.value)}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Orientación Telefónica Asistida
                  </span>
                  <span className="font-body text-xs text-on-surface-variant mt-0.5">
                    Un asesor de la Línea 195 te llamará al número registrado
                  </span>
                </div>
              </label>
            </fieldset>
          )}

          {activeVariant === "disabled" && (
            <fieldset className="flex flex-col gap-3 max-w-lg" disabled>
              <legend className="font-heading text-sm font-bold text-on-surface-variant mb-2">
                Horario de Atención (No disponible para agendamiento)
              </legend>

              <label className="flex items-center gap-3 min-h-[44px] p-3.5 rounded-[8px] border border-surface-container-high opacity-50 cursor-not-allowed bg-surface-container-low">
                <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
                  <input
                    type="radio"
                    name="horario-disabled-demo"
                    disabled
                    className="w-5 h-5 rounded-full border-2 border-[#666666] cursor-not-allowed"
                  />
                </div>
                <span className="font-body text-sm text-on-surface-variant">
                  Jornada Mañana (8:00 AM - 12:00 PM) — Cupos agotados
                </span>
              </label>

              <label className="flex items-center gap-3 min-h-[44px] p-3.5 rounded-[8px] border border-surface-container-high opacity-60 cursor-not-allowed bg-surface-container-low">
                <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
                  <input
                    type="radio"
                    name="horario-disabled-demo"
                    disabled
                    defaultChecked
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#CC0E35] cursor-not-allowed"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute" />
                </div>
                <span className="font-body text-sm font-semibold text-on-surface">
                  Jornada Tarde (2:00 PM - 5:00 PM) — Asignada previamente en tu solicitud
                </span>
              </label>
            </fieldset>
          )}

          {activeVariant === "notext" && (
            <div className="flex flex-col gap-4 max-w-md">
              <span className="font-heading text-sm font-bold text-on-surface">
                Selección de Elemento en Matriz / Tabla (Solo control visual)
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Cada control incluye un <code>aria-label</code> específico para garantizar que los
                lectores de pantalla anuncien el contexto del elemento seleccionado.
              </p>
              <div className="flex items-center gap-8 p-4 bg-surface-container-low rounded-[8px] border border-surface-container-high">
                <label
                  htmlFor="radio-notext-1"
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer rounded-[5px] hover:bg-surface-container p-2"
                >
                  <span className="sr-only">Seleccionar predio Calle 72</span>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      id="radio-notext-1"
                      name="notext-demo"
                      value="item-1"
                      checked={selectedNoText === "item-1"}
                      onChange={(e) => setSelectedNoText(e.target.value)}
                      aria-label="Seleccionar predio Calle 72 # 11-86"
                      className="peer appearance-none w-6 h-6 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                    />
                    <span className="w-3 h-3 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </label>

                <label
                  htmlFor="radio-notext-2"
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer rounded-[5px] hover:bg-surface-container p-2"
                >
                  <span className="sr-only">Seleccionar predio Carrera 7</span>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      id="radio-notext-2"
                      name="notext-demo"
                      value="item-2"
                      checked={selectedNoText === "item-2"}
                      onChange={(e) => setSelectedNoText(e.target.value)}
                      aria-label="Seleccionar predio Carrera 7 # 32-16"
                      className="peer appearance-none w-6 h-6 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                    />
                    <span className="w-3 h-3 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeVariant === "right" && (
            <fieldset className="flex flex-col gap-3 max-w-lg">
              <legend className="font-heading text-sm font-bold text-on-surface mb-2">
                Canal de Notificación Oficial del Trámite
              </legend>

              <label
                htmlFor="radio-right-1-play"
                className={`flex flex-row-reverse items-center justify-between min-h-[44px] p-4 rounded-[8px] border transition-all cursor-pointer ${
                  selectedRight === "right-1"
                    ? "border-primary/50 bg-[#FAE7EB]/30 shadow-xs"
                    : "border-surface-container-high hover:bg-surface-container-low"
                }`}
              >
                <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
                  <input
                    type="radio"
                    id="radio-right-1-play"
                    name="right-demo"
                    value="right-1"
                    checked={selectedRight === "right-1"}
                    onChange={(e) => setSelectedRight(e.target.value)}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Notificación Electrónica a Correo
                  </span>
                  <span className="font-body text-xs text-on-surface-variant">
                    Envío inmediato con validez probatoria bajo la Ley 527 de 1999
                  </span>
                </div>
              </label>

              <label
                htmlFor="radio-right-2-play"
                className={`flex flex-row-reverse items-center justify-between min-h-[44px] p-4 rounded-[8px] border transition-all cursor-pointer ${
                  selectedRight === "right-2"
                    ? "border-primary/50 bg-[#FAE7EB]/30 shadow-xs"
                    : "border-surface-container-high hover:bg-surface-container-low"
                }`}
              >
                <div className="relative flex items-center justify-center min-w-[24px] min-h-[24px]">
                  <input
                    type="radio"
                    id="radio-right-2-play"
                    name="right-demo"
                    value="right-2"
                    checked={selectedRight === "right-2"}
                    onChange={(e) => setSelectedRight(e.target.value)}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#666666] checked:border-[#CC0E35] focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 transition-all cursor-pointer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC0E35] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Notificación Física por Mensajería Certificada
                  </span>
                  <span className="font-body text-xs text-on-surface-variant">
                    Entrega postal en la dirección de residencia registrada
                  </span>
                </div>
              </label>
            </fieldset>
          )}
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
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-200 transition-colors focus:outline-none focus:ring-1 focus:ring-primary min-h-[32px]"
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
