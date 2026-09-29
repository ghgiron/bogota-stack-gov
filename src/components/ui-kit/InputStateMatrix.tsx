"use client";

import { AlertCircle, CheckCircle2, Eye, Info, Lock } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const InputStateMatrix: React.FC = () => {
  const [activeInteractiveState, setActiveInteractiveState] = useState<string>("default");

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
              Anatomía y Cotas Técnicas del Input (44px)
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-surface-container text-on-surface-variant border border-surface-container-highest">
            WCAG 2.5.8 • Target Size
          </span>
        </div>

        {/* Diagrama con Cotas Superpuestas */}
        <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-[12px] border border-[#E4E2E1] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-lg flex flex-col gap-1.5 relative">
            {/* Cota Superior: Label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="diagram-input-demo"
                  className="font-body text-[18px] font-medium text-[#1B1C1C] leading-[24px]"
                >
                  Nombre completo del solicitante
                </label>
                <span className="text-xs text-primary font-semibold font-body" aria-hidden="true">
                  *
                </span>
              </div>
              <span className="text-[11px] font-mono font-medium text-[#0049AE] bg-[#E9F0FA] px-2 py-0.5 rounded border border-[#3366CC]/30">
                Work Sans Medium 18px
              </span>
            </div>

            {/* Caja del Input con Cotas Horizontales y Verticales */}
            <div className="relative group">
              <div className="h-[44px] w-full bg-white border border-[#B0B0B0] rounded-[5px] px-4 flex items-center justify-between shadow-xs transition-all relative">
                <span className="font-body text-[16px] text-[#1B1C1C]">María Camila Rodríguez</span>
                <span className="material-symbols-outlined text-[20px] text-[#1B7A2E]">
                  check_circle
                </span>
              </div>

              {/* Indicador de Altura 44px a la derecha */}
              <div className="hidden sm:flex absolute -right-24 top-0 bottom-0 items-center gap-1">
                <div className="h-full w-2 border-r-2 border-y-2 border-primary" />
                <span className="text-[11px] font-mono font-bold text-primary whitespace-nowrap">
                  44px Alto
                </span>
              </div>

              {/* Indicador de Radio 5px en la esquina */}
              <div className="hidden sm:flex absolute -left-20 top-2 items-center gap-1">
                <span className="text-[11px] font-mono font-bold text-tertiary">r: 5px</span>
                <div className="w-3 h-0.5 bg-tertiary" />
              </div>
            </div>

            {/* Cota Inferior: Helper Text */}
            <div className="flex items-center justify-between pt-1">
              <p className="font-body text-[12px] text-[#43474E] leading-[16px]">
                Tal como figura en el documento oficial de identidad distrital.
              </p>
              <span className="text-[11px] font-mono font-medium text-[#1B7A2E] bg-[#EAF5EC] px-2 py-0.5 rounded border border-[#1B7A2E]/30">
                Work Sans Regular 12px
              </span>
            </div>
          </div>
        </div>

        {/* Resumen de Valores de Cotas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high">
            <span className="text-[11px] text-on-surface-variant font-medium block">
              Altura de Caja:
            </span>
            <strong className="text-sm font-heading font-bold text-on-surface">
              44px (Strict)
            </strong>
          </div>
          <div className="p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high">
            <span className="text-[11px] text-on-surface-variant font-medium block">
              Radio de Esquinas:
            </span>
            <strong className="text-sm font-heading font-bold text-on-surface">
              5px (rounded-[5px])
            </strong>
          </div>
          <div className="p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high">
            <span className="text-[11px] text-on-surface-variant font-medium block">
              Padding Lateral:
            </span>
            <strong className="text-sm font-heading font-bold text-on-surface">16px (px-4)</strong>
          </div>
          <div className="p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high">
            <span className="text-[11px] text-on-surface-variant font-medium block">
              Borde Base:
            </span>
            <strong className="text-sm font-heading font-bold text-on-surface">
              1px (#B0B0B0)
            </strong>
          </div>
        </div>
      </div>

      {/* 2. MATRIZ DE ESTADOS DEL KIT UI (6 ESTADOS OFICIALES) */}
      <div className="bg-surface-container-lowest rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-4">
          <div>
            <h3 className="font-heading text-base font-bold text-on-surface">
              Matriz Oficial de Estados (Kit UI Bogotá)
            </h3>
            <p className="font-body text-xs text-on-surface-variant mt-0.5">
              Renderizado de los 6 estados de interacción documentados en el manual institucional.
            </p>
          </div>
          <span className="text-xs font-heading font-semibold text-primary px-2.5 py-1 rounded bg-primary/10 border border-primary/20 w-fit">
            6 Estados Visuales
          </span>
        </div>

        {/* Grid de 6 Estados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ESTADO 1: DEFAULT */}
          <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-on-surface uppercase tracking-wider">
                1. Default (Inactivo)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                #B0B0B0
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="state-default"
                className="font-body text-[16px] font-medium text-[#1B1C1C]"
              >
                Número de documento
              </label>
              <input
                id="state-default"
                type="text"
                readOnly
                placeholder="Ej: 1020304050"
                className="h-[44px] w-full px-4 rounded-[5px] border border-[#B0B0B0] bg-white font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] focus:outline-none"
              />
              <span className="font-body text-[12px] text-[#5E6061]">
                Sin puntos, comas ni espacios.
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 border-t border-surface-container-highest/60 pt-2">
              Estado de reposo antes del contacto. Borde neutro de 1px.
            </p>
          </div>

          {/* ESTADO 2: ACTIVO / HOVER */}
          <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-on-surface uppercase tracking-wider">
                2. Activo (Escribiendo)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9F0FA] text-[#0049AE] font-bold">
                #3366CC
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="state-active"
                className="font-body text-[16px] font-medium text-[#0049AE]"
              >
                Número de documento
              </label>
              <div className="relative">
                <input
                  id="state-active"
                  type="text"
                  readOnly
                  value="10203040"
                  className="h-[44px] w-full px-4 rounded-[5px] border-2 border-[#3366CC] bg-white font-body text-[16px] text-[#1B1C1C] focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#3366CC] animate-pulse" />
              </div>
              <span className="font-body text-[12px] text-[#5E6061]">
                Escribiendo 8 de 10 dígitos.
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 border-t border-surface-container-highest/60 pt-2">
              El cursor parpadea y el contorno adquiere el azul Bogotá (#3366CC).
            </p>
          </div>

          {/* ESTADO 3: FOCO ACCESIBLE */}
          <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-on-surface uppercase tracking-wider">
                3. Focus (Accesible)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-bold">
                ring-2 ring-[#0049AE]
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="state-focus"
                className="font-body text-[16px] font-medium text-[#1B1C1C]"
              >
                Número de documento
              </label>
              <input
                id="state-focus"
                type="text"
                readOnly
                value="1020304050"
                className="h-[44px] w-full px-4 rounded-[5px] border border-[#3366CC] bg-white font-body text-[16px] text-[#1B1C1C] ring-2 ring-[#0049AE] ring-offset-2 focus:outline-none"
              />
              <span className="font-body text-[12px] text-[#0049AE] font-medium">
                Navegando con teclado (Tab).
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 border-t border-surface-container-highest/60 pt-2">
              Anillo exterior de alto contraste para WCAG 2.4.7.
            </p>
          </div>

          {/* ESTADO 4: DISABLED */}
          <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-on-surface uppercase tracking-wider">
                4. Disabled (Inactivo)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">
                #E4E2E1
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="state-disabled"
                className="font-body text-[16px] font-medium text-[#8A8A8A]"
              >
                Número de documento
              </label>
              <div className="relative">
                <input
                  id="state-disabled"
                  type="text"
                  disabled
                  value="1020304050"
                  className="h-[44px] w-full px-4 pr-10 rounded-[5px] border border-[#B0B0B0] bg-[#E4E2E1] font-body text-[16px] text-[#8A8A8A] cursor-not-allowed"
                />
                <Lock className="w-4 h-4 text-[#8A8A8A] absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <span className="font-body text-[12px] text-[#8A8A8A]">
                Campo bloqueado por validación de seguridad.
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 border-t border-surface-container-highest/60 pt-2">
              Fondo gris tenue #E4E2E1, texto atenuado y cursor not-allowed.
            </p>
          </div>

          {/* ESTADO 5: ERROR */}
          <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">
                5. Error (Fallido)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAE7EB] text-[#BA1A1A] font-bold">
                #BA1A1A
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="state-error"
                className="font-body text-[16px] font-medium text-[#BA1A1A]"
              >
                Número de documento
              </label>
              <div className="relative">
                <input
                  id="state-error"
                  type="text"
                  readOnly
                  aria-invalid="true"
                  aria-describedby="err-desc"
                  value="1020-A3"
                  className="h-[44px] w-full px-4 pr-10 rounded-[5px] border-[1.5px] border-[#BA1A1A] bg-white font-body text-[16px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#BA1A1A]"
                />
                <span className="material-symbols-outlined text-[20px] text-[#BA1A1A] absolute right-3 top-1/2 -translate-y-1/2">
                  error
                </span>
              </div>
              <span
                id="err-desc"
                className="font-body text-[12px] text-[#BA1A1A] font-medium flex items-center gap-1"
              >
                <span>* Solo se permiten dígitos numéricos (6 a 10 dígitos).</span>
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 border-t border-surface-container-highest/60 pt-2">
              Borde rojo de 1.5px, icono de alerta circular y mensaje orientador.
            </p>
          </div>

          {/* ESTADO 6: SUCCESS */}
          <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-[#1B7A2E] uppercase tracking-wider">
                6. Success (Válido)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAF5EC] text-[#1B7A2E] font-bold">
                #1B7A2E
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="state-success"
                className="font-body text-[16px] font-medium text-[#1B7A2E]"
              >
                Número de documento
              </label>
              <div className="relative">
                <input
                  id="state-success"
                  type="text"
                  readOnly
                  value="1020304050"
                  className="h-[44px] w-full px-4 pr-10 rounded-[5px] border-[1.5px] border-[#1B7A2E] bg-white font-body text-[16px] text-[#1B1C1C] focus:outline-none"
                />
                <span className="material-symbols-outlined text-[20px] text-[#1B7A2E] absolute right-3 top-1/2 -translate-y-1/2">
                  check_circle
                </span>
              </div>
              <span className="font-body text-[12px] text-[#1B7A2E] font-medium flex items-center gap-1">
                <span>✓ Documento verificado con Registraduría Distrital.</span>
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 border-t border-surface-container-highest/60 pt-2">
              Borde verde de 1.5px con icono de check y confirmación explícita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
