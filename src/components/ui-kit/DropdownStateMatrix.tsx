"use client";

import { AlertCircle, Check, ChevronDown, Info, Layers, Sparkles } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const DropdownStateMatrix: React.FC = () => {
  const [activeInteractiveState, setActiveInteractiveState] = useState<string>("default");
  const [selectedOption, setSelectedOption] = useState<string>("Opción 3: Chapinero");
  const [isOpenInteractive, setIsOpenInteractive] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. DIAGRAMA VISUAL DE ANATOMÍA Y COTAS TÉCNICAS */}
      <div className="bg-surface-container-lowest rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">
              straighten
            </span>
            <h3 className="font-heading text-base font-bold text-on-surface">
              Anatomía y Cotas Técnicas del Dropdown (Kit UI Bogotá)
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-surface-container text-on-surface-variant border border-surface-container-highest">
            Cotas Oficiales • 40px / 44px
          </span>
        </div>

        {/* Diagrama con Cotas Superpuestas */}
        <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-[12px] border border-[#E4E2E1] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-lg flex flex-col gap-1.5 relative">
            {/* Cota Superior: Label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-body text-[18px] font-medium text-[#1B1C1C] leading-[24px]">
                  Localidad de residencia
                </span>
                <span className="text-xs text-primary font-semibold font-body" aria-hidden="true">
                  *
                </span>
              </div>
              <span className="text-[11px] font-mono font-medium text-[#0049AE] bg-[#E9F0FA] px-2 py-0.5 rounded border border-[#3366CC]/30">
                Work Sans Medium 18px
              </span>
            </div>

            {/* Caja del Dropdown con Cotas */}
            <div className="relative group">
              <div className="h-[40px] sm:h-[44px] w-full bg-white border border-[#B0B0B0] rounded-[5px] px-4 flex items-center justify-between shadow-xs transition-all relative">
                <span className="font-body text-[16px] text-[#1B1C1C]">
                  Selecciona una localidad
                </span>

                {/* Chevron Oficial 17x17px */}
                <div className="w-[17px] h-[17px] rounded-full bg-[#FAB62D] flex items-center justify-center text-[#1B1C1C] shrink-0 shadow-2xs">
                  <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>

              {/* Indicador de Altura a la derecha */}
              <div className="hidden sm:flex absolute -right-28 top-0 bottom-0 items-center gap-1">
                <div className="h-full w-2 border-r-2 border-y-2 border-primary" />
                <span className="text-[11px] font-mono font-bold text-primary whitespace-nowrap">
                  40px (Base) / 44px
                </span>
              </div>

              {/* Indicador de Radio 5px en la esquina */}
              <div className="hidden sm:flex absolute -left-20 top-2 items-center gap-1">
                <span className="text-[11px] font-mono font-bold text-tertiary">r: 5px</span>
                <div className="w-3 h-0.5 bg-tertiary" />
              </div>

              {/* Indicador de Chevron 17x17px */}
              <div className="hidden sm:flex absolute right-1 -bottom-7 items-center gap-1">
                <span className="text-[10px] font-mono font-bold text-[#694C13] bg-[#FDE8BE] px-1.5 py-0.5 rounded border border-[#FAB62D]">
                  17x17px (#FAB62D)
                </span>
              </div>
            </div>

            {/* Cota Inferior: Helper Text */}
            <div className="flex items-center justify-between pt-2">
              <p className="font-body text-[12px] text-[#43474E] leading-[16px]">
                Indica la localidad distrital correspondiente a tu domicilio principal.
              </p>
              <span className="text-[11px] font-mono font-medium text-[#1B7A2E] bg-[#EAF5EC] px-2 py-0.5 rounded border border-[#1B7A2E]/30">
                Work Sans Regular 12px
              </span>
            </div>
          </div>
        </div>

        {/* Resumen de Especificaciones Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-body">
          <div className="p-3 rounded-[8px] bg-surface-container border border-surface-container-high">
            <span className="text-on-surface-variant font-medium block">Altura de Caja</span>
            <strong className="text-on-surface font-semibold text-sm">
              40px Base / 44px Accesible
            </strong>
          </div>
          <div className="p-3 rounded-[8px] bg-surface-container border border-surface-container-high">
            <span className="text-on-surface-variant font-medium block">Radio de Esquina</span>
            <strong className="text-on-surface font-semibold text-sm">5px (rounded-[5px])</strong>
          </div>
          <div className="p-3 rounded-[8px] bg-surface-container border border-surface-container-high">
            <span className="text-on-surface-variant font-medium block">Padding Horizontal</span>
            <strong className="text-on-surface font-semibold text-sm">16px (px-4)</strong>
          </div>
          <div className="p-3 rounded-[8px] bg-surface-container border border-surface-container-high">
            <span className="text-on-surface-variant font-medium block">Chevron Oficial</span>
            <strong className="text-on-surface font-semibold text-sm">17x17px (#FAB62D)</strong>
          </div>
        </div>
      </div>

      {/* 2. MATRIZ OFICIAL DE 6 ESTADOS DEL KIT UI BOGOTÁ */}
      <div className="bg-surface-container-lowest rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">
              grid_view
            </span>
            <h3 className="font-heading text-base font-bold text-on-surface">
              Matriz Oficial de Estados (Manual del Kit UI Bogotá)
            </h3>
          </div>
          <span className="text-xs text-on-surface-variant font-mono">6 Estados Estándar</span>
        </div>

        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
          Cada estado visual responde de forma predecible a las interacciones del ciudadano y a las
          respuestas de validación del sistema, preservando el contraste cromático y la
          accesibilidad.
        </p>

        {/* Grilla de 6 Estados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ESTADO 1: Activo (Reposo) */}
          <div className="flex flex-col gap-2 p-4 rounded-[10px] border border-surface-container-high bg-surface-container-lowest hover:border-[#B0B0B0] transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B0B0B0]" />
                1. Activo (Reposo)
              </span>
              <span className="text-[10px] font-mono font-medium text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                Default
              </span>
            </div>
            <p className="font-body text-[11px] text-on-surface-variant">
              Borde neutro #B0B0B0, placeholder orientativo #8A8A8A y chevron amarillo #FAB62D
              cerrado.
            </p>
            <div className="pt-2 flex flex-col gap-1">
              <span className="font-body text-sm font-medium text-[#1B1C1C]">
                Tipo de documento
              </span>
              <div className="h-[40px] w-full bg-white border border-[#B0B0B0] rounded-[5px] px-4 flex items-center justify-between">
                <span className="font-body text-sm text-[#8A8A8A]">Selecciona un tipo</span>
                <div className="w-[17px] h-[17px] rounded-full bg-[#FAB62D] flex items-center justify-center text-[#1B1C1C] shrink-0">
                  <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              <span className="font-body text-[11px] text-[#43474E]">
                Requerido para la validación de identidad.
              </span>
            </div>
          </div>

          {/* ESTADO 2: Desactivado (Disabled) */}
          <div className="flex flex-col gap-2 p-4 rounded-[10px] border border-surface-container-high bg-surface-container-low/50">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E4E2E1]" />
                2. Desactivado (Disabled)
              </span>
              <span className="text-[10px] font-mono font-medium text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                disabled
              </span>
            </div>
            <p className="font-body text-[11px] text-on-surface-variant">
              Fondo #E4E2E1, texto atenuado #8A8A8A, chevron grisáceo y cursor not-allowed.
            </p>
            <div className="pt-2 flex flex-col gap-1 opacity-70">
              <span className="font-body text-sm font-medium text-on-surface-variant">
                Sede distrital asignada
              </span>
              <div className="h-[40px] w-full bg-[#E4E2E1] border border-[#B0B0B0] rounded-[5px] px-4 flex items-center justify-between cursor-not-allowed">
                <span className="font-body text-sm text-[#8A8A8A]">No disponible actualmente</span>
                <div className="w-[17px] h-[17px] rounded-full bg-[#C4C7C5] flex items-center justify-center text-[#747775] shrink-0">
                  <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              <span className="font-body text-[11px] text-[#747775]">
                Habilitado tras validar tu turno previo.
              </span>
            </div>
          </div>

          {/* ESTADO 3: Focus (Accesible) */}
          <div className="flex flex-col gap-2 p-4 rounded-[10px] border border-[#3366CC]/50 bg-surface-container-lowest shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-[#0049AE] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0049AE]" />
                3. Focus (Accesible)
              </span>
              <span className="text-[10px] font-mono font-medium text-[#0049AE] bg-[#E9F0FA] px-1.5 py-0.5 rounded border border-[#3366CC]/30">
                :focus-visible
              </span>
            </div>
            <p className="font-body text-[11px] text-on-surface-variant">
              Borde #3366CC y doble anillo exterior institucional #0049AE visible por teclado.
            </p>
            <div className="pt-2 flex flex-col gap-1">
              <span className="font-body text-sm font-medium text-[#1B1C1C]">
                Estrato socioeconómico
              </span>
              <div className="h-[40px] w-full bg-white border-2 border-[#3366CC] ring-2 ring-[#0049AE] ring-offset-2 rounded-[5px] px-4 flex items-center justify-between outline-none">
                <span className="font-body text-sm text-[#1B1C1C]">Selecciona un estrato</span>
                <div className="w-[17px] h-[17px] rounded-full bg-[#FAB62D] flex items-center justify-center text-[#1B1C1C] shrink-0">
                  <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              <span className="font-body text-[11px] text-[#0049AE] font-medium">
                Navegación activa por Tabulador.
              </span>
            </div>
          </div>

          {/* ESTADO 4: Desplegado (Abierto) */}
          <div className="flex flex-col gap-2 p-4 rounded-[10px] border border-[#FAB62D] bg-[#FFFDF7] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-[#694C13] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FAB62D]" />
                4. Desplegado (Abierto)
              </span>
              <span className="text-[10px] font-mono font-medium text-[#694C13] bg-[#FDE8BE] px-1.5 py-0.5 rounded">
                aria-expanded
              </span>
            </div>
            <p className="font-body text-[11px] text-on-surface-variant">
              Overlay desplegado hacia abajo con sombra, opción resaltada en fondo amarillo #FFF8EA.
            </p>
            <div className="pt-2 flex flex-col gap-1 relative">
              <span className="font-body text-sm font-medium text-[#1B1C1C]">
                Localidad de Bogotá
              </span>
              <div className="h-[40px] w-full bg-white border border-[#FAB62D] rounded-t-[5px] px-4 flex items-center justify-between">
                <span className="font-body text-sm text-[#1B1C1C] font-medium">
                  Elige una localidad
                </span>
                <div className="w-[17px] h-[17px] rounded-full bg-[#FAB62D] flex items-center justify-center text-[#1B1C1C] shrink-0 rotate-180 transition-transform">
                  <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              {/* Menú Flotante Visual */}
              <div className="w-full bg-white border border-[#B0B0B0] border-t-0 rounded-b-[5px] shadow-md overflow-hidden text-xs flex flex-col">
                <div className="px-4 py-2 hover:bg-[#FFF8EA] text-[#1B1C1C] font-medium cursor-pointer flex items-center justify-between">
                  <span>1. Usaquén</span>
                </div>
                <div className="px-4 py-2 bg-[#FFF8EA] text-[#694C13] font-bold border-l-4 border-[#FAB62D] flex items-center justify-between">
                  <span>2. Chapinero (Enfocada)</span>
                  <Check className="w-3.5 h-3.5 text-[#694C13]" />
                </div>
                <div className="px-4 py-2 hover:bg-[#FFF8EA] text-[#1B1C1C] font-medium cursor-pointer">
                  <span>3. Santa Fe</span>
                </div>
              </div>
            </div>
          </div>

          {/* ESTADO 5: Seleccionado */}
          <div className="flex flex-col gap-2 p-4 rounded-[10px] border border-surface-container-high bg-surface-container-lowest hover:border-[#B0B0B0] transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B7A2E]" />
                5. Seleccionado
              </span>
              <span className="text-[10px] font-mono font-medium text-[#1B7A2E] bg-[#EAF5EC] px-1.5 py-0.5 rounded">
                value !== ""
              </span>
            </div>
            <p className="font-body text-[11px] text-on-surface-variant">
              Valor elegido en tipografía regular 16px #1B1C1C, chevron amarillo listo para reabrir.
            </p>
            <div className="pt-2 flex flex-col gap-1">
              <span className="font-body text-sm font-medium text-[#1B1C1C]">
                Medio de pago distrital
              </span>
              <div className="h-[40px] w-full bg-white border border-[#B0B0B0] rounded-[5px] px-4 flex items-center justify-between">
                <span className="font-body text-sm text-[#1B1C1C] font-medium">
                  PSE (Débito en línea)
                </span>
                <div className="w-[17px] h-[17px] rounded-full bg-[#FAB62D] flex items-center justify-center text-[#1B1C1C] shrink-0">
                  <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              <span className="font-body text-[11px] text-[#43474E]">
                Serás redirigido a la pasarela financiera.
              </span>
            </div>
          </div>

          {/* ESTADO 6: Error */}
          <div className="flex flex-col gap-2 p-4 rounded-[10px] border border-[#BA1A1A]/40 bg-[#FFF5F5]">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-[#BA1A1A] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A]" />
                6. Error
              </span>
              <span className="text-[10px] font-mono font-medium text-[#BA1A1A] bg-[#FFDAD6] px-1.5 py-0.5 rounded">
                aria-invalid
              </span>
            </div>
            <p className="font-body text-[11px] text-[#BA1A1A]">
              Borde rojo #BA1A1A, icono circular de alerta a la derecha y mensaje orientador rojo.
            </p>
            <div className="pt-2 flex flex-col gap-1">
              <span className="font-body text-sm font-medium text-[#BA1A1A]">
                Punto de atención presencial
              </span>
              <div className="h-[40px] w-full bg-white border-2 border-[#BA1A1A] rounded-[5px] px-4 flex items-center justify-between">
                <span className="font-body text-sm text-[#BA1A1A] font-medium">
                  Selecciona un punto
                </span>
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#BA1A1A]" />
                  <div className="w-[17px] h-[17px] rounded-full bg-[#BA1A1A] flex items-center justify-center text-white shrink-0">
                    <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>
              </div>
              <span className="font-body text-[11px] text-[#BA1A1A] font-medium flex items-center gap-1">
                * Campo : selecciona una sede para continuar con tu turno.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SIMULADOR INTERACTIVO DINÁMICO */}
      <div className="bg-surface-container-lowest rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-base font-bold text-on-surface">
              Probador Interactivo de Estados Dinámicos
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
            Live Testing
          </span>
        </div>

        {/* Botones de Estado */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "default", label: "1. Activo" },
            { id: "disabled", label: "2. Desactivado" },
            { id: "focus", label: "3. Focus" },
            { id: "opened", label: "4. Desplegado" },
            { id: "selected", label: "5. Seleccionado" },
            { id: "error", label: "6. Error" },
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => {
                setActiveInteractiveState(st.id);
                setIsOpenInteractive(st.id === "opened");
              }}
              className={`px-3 py-1.5 rounded-[5px] text-xs font-medium font-body transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${
                activeInteractiveState === st.id
                  ? "bg-primary text-white font-semibold shadow-xs"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Área del Control con el estado activo */}
        <div className="p-8 rounded-[12px] bg-[#FAF9F5] border border-[#E4E2E1] flex flex-col items-center justify-center">
          <div className="w-full max-w-md flex flex-col gap-1.5 relative">
            <label
              htmlFor="simulated-dropdown-id"
              className={`font-body text-[18px] font-medium leading-[24px] ${
                activeInteractiveState === "error" ? "text-[#BA1A1A]" : "text-[#1B1C1C]"
              }`}
            >
              Trámite Distrital Solicitado
            </label>

            {/* Input / Control */}
            <div className="relative">
              <button
                type="button"
                id="simulated-dropdown-id"
                disabled={activeInteractiveState === "disabled"}
                onClick={() => setIsOpenInteractive(!isOpenInteractive)}
                className={`h-[44px] w-full rounded-[5px] px-4 flex items-center justify-between text-left transition-all ${
                  activeInteractiveState === "disabled"
                    ? "bg-[#E4E2E1] border border-[#B0B0B0] text-[#8A8A8A] cursor-not-allowed"
                    : activeInteractiveState === "focus"
                      ? "bg-white border-2 border-[#3366CC] ring-2 ring-[#0049AE] ring-offset-2 text-[#1B1C1C]"
                      : activeInteractiveState === "error"
                        ? "bg-white border-2 border-[#BA1A1A] text-[#BA1A1A]"
                        : activeInteractiveState === "opened"
                          ? "bg-white border border-[#FAB62D] rounded-b-none text-[#1B1C1C]"
                          : "bg-white border border-[#B0B0B0] text-[#1B1C1C] hover:border-[#8A8A8A]"
                }`}
              >
                <span className="font-body text-[16px]">
                  {activeInteractiveState === "default"
                    ? "Selecciona un trámite"
                    : activeInteractiveState === "disabled"
                      ? "Trámite inhabilitado"
                      : activeInteractiveState === "error"
                        ? "Selecciona un trámite"
                        : selectedOption}
                </span>

                <div className="flex items-center gap-2">
                  {activeInteractiveState === "error" && (
                    <AlertCircle className="w-5 h-5 text-[#BA1A1A]" />
                  )}
                  <div
                    className={`w-[17px] h-[17px] rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      activeInteractiveState === "disabled"
                        ? "bg-[#C4C7C5] text-[#747775]"
                        : activeInteractiveState === "error"
                          ? "bg-[#BA1A1A] text-white"
                          : "bg-[#FAB62D] text-[#1B1C1C]"
                    } ${isOpenInteractive ? "rotate-180" : ""}`}
                  >
                    <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>
              </button>

              {/* Menú Desplegable si está abierto */}
              {isOpenInteractive && (
                <div className="absolute left-0 right-0 top-full bg-white border border-[#B0B0B0] border-t-0 rounded-b-[5px] shadow-lg z-20 overflow-hidden text-sm">
                  {[
                    "Opción 1: Certificado de Residencia",
                    "Opción 2: Concepto de Uso de Suelo",
                    "Opción 3: Chapinero",
                    "Opción 4: Pago de Impuesto Predial",
                    "Opción 5: Registro de Veeduría Ciudadana",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedOption(opt);
                        setActiveInteractiveState("selected");
                        setIsOpenInteractive(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left font-body flex items-center justify-between transition-colors ${
                        selectedOption === opt
                          ? "bg-[#FFF8EA] text-[#694C13] font-bold border-l-4 border-[#FAB62D]"
                          : "text-[#1B1C1C] hover:bg-[#FFF8EA]"
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedOption === opt && <Check className="w-4 h-4 text-[#FAB62D]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mensajes inferiores */}
            {activeInteractiveState === "error" ? (
              <span className="font-body text-[12px] text-[#BA1A1A] font-medium flex items-center gap-1 pt-1">
                * Campo : selecciona una opción para continuar con tu solicitud.
              </span>
            ) : (
              <p className="font-body text-[12px] text-[#43474E] pt-1">
                Disponible de lunes a viernes en horario hábil distrital.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
