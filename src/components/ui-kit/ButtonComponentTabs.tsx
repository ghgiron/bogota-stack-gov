"use client";

import { ButtonPlayground } from "@/components/ui-kit/ButtonPlayground";
import { CheckCircle2, Keyboard, ShieldAlert, Sparkles, XCircle } from "lucide-react";
import type React from "react";
import { useState } from "react";

export type ButtonTabKey = "especificaciones" | "codigo" | "guia" | "accesibilidad";

export const ButtonComponentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ButtonTabKey>("especificaciones");

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Barra de Pestañas Superiores (Estilo Obelisco BA & SGDS Singapur) */}
      <div
        className="border-b-2 border-surface-container-high flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar"
        role="tablist"
        aria-label="Pestañas de documentación del componente Botones"
      >
        <button
          type="button"
          role="tab"
          id="tab-especificaciones"
          aria-controls="panel-especificaciones"
          aria-selected={activeTab === "especificaciones"}
          onClick={() => setActiveTab("especificaciones")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${activeTab === "especificaciones"
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
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${activeTab === "codigo"
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
          id="tab-guia"
          aria-controls="panel-guia"
          aria-selected={activeTab === "guia"}
          onClick={() => setActiveTab("guia")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${activeTab === "guia"
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
          id="tab-accesibilidad"
          aria-controls="panel-accesibilidad"
          aria-selected={activeTab === "accesibilidad"}
          onClick={() => setActiveTab("accesibilidad")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${activeTab === "accesibilidad"
              ? "border-[#CC0E35] text-[#CC0E35]"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
        >
          <span className="material-symbols-outlined text-[18px]">accessibility_new</span>
          <span>Accesibilidad (WCAG 2.2)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: ESPECIFICACIONES (MATRIZ DE ESTADOS OFICIAL DEL KIT UI) */}
      {/* ========================================================================= */}
      <section
        id="panel-especificaciones"
        role="tabpanel"
        aria-labelledby="tab-especificaciones"
        hidden={activeTab !== "especificaciones"}
        className={
          activeTab === "especificaciones"
            ? "flex flex-col gap-8 animate-in fade-in duration-150"
            : "hidden"
        }
      >
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
          <div>
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Manual de Marca y Diseño Institucional
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mt-1">
              Matriz de Estados Interactivos
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              Disposición exacta de los estados interactivos del Kit UI de Bogotá. Los botones se
              construyen con geometría en forma de píldora (<code>rounded-full</code>) y tipografía{" "}
              <strong>Work Sans 500/600</strong>. El botón primario presenta una transición
              distintiva de <strong>Amarillo (#FAB62D)</strong> a <strong>Rojo (#CC0E35)</strong> en
              hover, mientras que el secundario no posee contenedor sólido en su estado base para no
              competir en peso visual.
            </p>
          </div>

          {/* Grilla de 2 Columnas Grandes con Fondo Gris Tenue bg-[#F6F3F2] */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna 1: BOTÓN PRIMARIO */}
            <div className="bg-[#F6F3F2] rounded-[15px] p-6 border border-surface-container-high flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-2">
                <span className="font-heading font-bold text-sm text-[#CC0E35] uppercase tracking-wider">
                  BOTÓN PRIMARIO
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300">
                  Amarillo ➔ Rojo
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {/* 1. Default */}
                <div className="bg-white rounded-[10px] p-4 flex justify-between items-center shadow-xs">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-on-surface">
                      Default (Base)
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      Fondo Amarillo #FAB62D
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-[#FAB62D] text-[#1B1C1C] rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] font-body transition-all duration-200 shadow-xs select-none"
                  >
                    Botón Primario
                  </button>
                </div>

                {/* 2. Focus */}
                <div className="bg-white rounded-[10px] p-4 flex justify-between items-center shadow-xs">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-on-surface">
                      Focus (Accesible)
                    </span>
                    <span className="font-mono text-[10px] text-primary font-bold">
                      Anillo Rojo #CC0E35
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-[#FAB62D] text-[#1B1C1C] rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] font-body ring-2 ring-offset-2 ring-[#CC0E35] shadow-xs select-none"
                  >
                    Botón Primario
                  </button>
                </div>

                {/* 3. Hover */}
                <div className="bg-white rounded-[10px] p-4 flex justify-between items-center shadow-xs">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-on-surface">
                      Hover (Interactivo)
                    </span>
                    <span className="font-mono text-[10px] text-primary font-bold">
                      Fondo Rojo #CC0E35
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-[#CC0E35] text-white rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] font-body shadow-sm select-none"
                  >
                    Botón Primario
                  </button>
                </div>

                {/* 4. Disabled */}
                <div className="bg-white rounded-[10px] p-4 flex justify-between items-center shadow-xs">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-on-surface-variant">
                      Disabled
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      Fondo Gris #8A8A8A
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="bg-[#8A8A8A] text-white cursor-not-allowed rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] font-body select-none"
                  >
                    Botón Primario
                  </button>
                </div>
              </div>
            </div>

            {/* Columna 2: BOTÓN SECUNDARIO */}
            <div className="bg-[#F6F3F2] rounded-[15px] p-6 border border-surface-container-high flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-2">
                <span className="font-heading font-bold text-sm text-[#CC0E35] uppercase tracking-wider">
                  BOTÓN SECUNDARIO
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-900 border border-red-300">
                  Sin Borde Sólido
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {/* 1. Default */}
                <div className="bg-white rounded-[10px] p-4 flex justify-between items-center shadow-xs">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-on-surface">
                      Default (Base)
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      Fondo Transparente / Texto Rojo
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-transparent text-[#CC0E35] rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] font-body select-none"
                  >
                    Botón Secundario
                  </button>
                </div>

                {/* 2. Focus */}
                <div className="bg-white rounded-[10px] p-4 flex justify-between items-center shadow-xs">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-on-surface">
                      Focus (Accesible)
                    </span>
                    <span className="font-mono text-[10px] text-primary font-bold">
                      Anillo Rojo #CC0E35
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-transparent text-[#CC0E35] rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] font-body ring-2 ring-offset-2 ring-[#CC0E35] select-none"
                  >
                    Botón Secundario
                  </button>
                </div>

                {/* 3. Hover */}
                <div className="bg-white rounded-[10px] p-4 flex justify-between items-center shadow-xs">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-on-surface">
                      Hover (Interactivo)
                    </span>
                    <span className="font-mono text-[10px] text-primary font-bold">
                      Fondo Tenue #FAE7EB
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-[#FAE7EB] text-[#A80B2B] rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] font-body select-none"
                  >
                    Botón Secundario
                  </button>
                </div>

                {/* 4. Disabled */}
                <div className="bg-white rounded-[10px] p-4 flex justify-between items-center shadow-xs">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-on-surface-variant">
                      Disabled
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      Texto Gris #8A8A8A
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="bg-transparent text-[#8A8A8A] cursor-not-allowed rounded-full font-semibold px-8 py-3 text-[16px] min-h-[44px] font-body select-none"
                  >
                    Botón Secundario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PESTAÑA 2: CÓDIGO (PLAYGROUND EXPANDIDO ESTILO OBELISCO) */}
      {/* ========================================================================= */}
      <section
        id="panel-codigo"
        role="tabpanel"
        aria-labelledby="tab-codigo"
        hidden={activeTab !== "codigo"}
        className={
          activeTab === "codigo" ? "flex flex-col gap-6 animate-in fade-in duration-150" : "hidden"
        }
      >
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
          <div>
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Playground Interactivo
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mt-1">
              Playground de Variantes de Botones
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              Explora las 5 sub-secciones de variantes inspiradas en el sistema Obelisco y adaptadas
              al Kit UI de Bogotá: tipos funcionales, tamaños (Chico, Mediano, Grande), botón
              expandible (100% ancho), botones con ícono (incluyendo botón circular accesible) y
              estado de carga reactivo con spinner animado.
            </p>
          </div>

          {/* Componente Playground */}
          <ButtonPlayground />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PESTAÑA 3: GUÍA DE USO (JERARQUÍA Y TOMA DE DECISIONES) */}
      {/* ========================================================================= */}
      <section
        id="panel-guia"
        role="tabpanel"
        aria-labelledby="tab-guia"
        hidden={activeTab !== "guia"}
        className={
          activeTab === "guia" ? "flex flex-col gap-8 animate-in fade-in duration-150" : "hidden"
        }
      >
        {/* Jerarquía Visual y Cuándo usar */}
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
          <div>
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Jerarquía y Toma de Decisiones
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mt-1">
              Jerarquía Visual de Acciones en la Interfaz
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              El botón <strong>Primario</strong> llama fuertemente la atención del ciudadano gracias
              a su color amarillo institucional (<code>#FAB62D</code>) con transición a rojo (
              <code>#CC0E35</code>) en hover. Por regla estricta de usabilidad cívica, debe existir{" "}
              <strong>solo un botón primario por vista o pantalla principal</strong>. El botón{" "}
              <strong>Secundario</strong> carece de contenedor sólido en su estado base para
              acompañar el flujo sin competir en peso visual.
            </p>
          </div>

          {/* Grilla de 3 Tarjetas Blancas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta 1: Botón Primario */}
            <div className="bg-white rounded-[15px] p-6 shadow-sm border border-surface-container-high flex flex-col justify-between gap-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-heading font-bold text-base text-on-surface">
                    Botón Primario
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 font-body">
                    ACCIÓN CLAVE
                  </span>
                </div>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Representa la acción principal o el siguiente paso natural en el flujo (ej.{" "}
                  <em>&ldquo;Guardar y continuar&rdquo;</em>, <em>&ldquo;Pagar trámite&rdquo;</em>,{" "}
                  <em>&ldquo;Radicar solicitud&rdquo;</em>).
                </p>
              </div>

              <div className="pt-4 border-t border-surface-container-high">
                <button
                  type="button"
                  className="w-full bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white font-semibold rounded-full px-8 py-3 text-[16px] min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
                >
                  Acción Principal
                </button>
              </div>
            </div>

            {/* Tarjeta 2: Botón Secundario */}
            <div className="bg-white rounded-[15px] p-6 shadow-sm border border-surface-container-high flex flex-col justify-between gap-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-heading font-bold text-base text-on-surface">
                    Botón Secundario
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 font-body">
                    ALTERNATIVA
                  </span>
                </div>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Acción complementaria que acompaña a la principal sin competir en peso visual (ej.{" "}
                  <em>&ldquo;Descargar borrador&rdquo;</em>,{" "}
                  <em>&ldquo;Guardar para después&rdquo;</em>,{" "}
                  <em>&ldquo;Imprimir constancia&rdquo;</em>).
                </p>
              </div>

              <div className="pt-4 border-t border-surface-container-high">
                <button
                  type="button"
                  className="w-full bg-transparent text-[#CC0E35] hover:bg-[#FAE7EB] hover:text-[#A80B2B] font-semibold rounded-full px-8 py-3 text-[16px] min-h-[44px] inline-flex items-center justify-center font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
                >
                  Acción Secundaria
                </button>
              </div>
            </div>

            {/* Tarjeta 3: Botón Terciario (Ghost) */}
            <div className="bg-white rounded-[15px] p-6 shadow-sm border border-surface-container-high flex flex-col justify-between gap-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-heading font-bold text-base text-on-surface">
                    Botón Terciario (Ghost)
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-body">
                    RETORNO / NEUTRO
                  </span>
                </div>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Acciones de bajo riesgo, cancelación o retorno al paso anterior donde no se desea
                  destacar el control sobre el contenido de la pantalla.
                </p>
              </div>

              <div className="pt-4 border-t border-surface-container-high">
                <button
                  type="button"
                  className="w-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-semibold rounded-full px-6 py-3 min-h-[44px] inline-flex items-center justify-center font-body text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
                >
                  Cancelar / Regresar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Anatomía del Componente */}
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-5">
          <div>
            <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
              Estructura del Botón
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mt-1">
              Anatomía y Geometría en Forma de Píldora
            </h3>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              Cada botón del Kit UI Bogotá incorpora tres elementos estructurados:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-on-surface">
                <span className="w-6 h-6 rounded-full bg-[#FAB62D] text-[#1B1C1C] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span>Contenedor en Píldora</span>
              </div>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Geometría <code>rounded-full</code> con altura mínima accesible de{" "}
                <strong>44px</strong> (<code>min-h-[44px]</code>).
              </p>
            </div>

            <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-on-surface">
                <span className="w-6 h-6 rounded-full bg-[#CC0E35] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span>Etiqueta Tipográfica</span>
              </div>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Fuente <strong>Work Sans</strong> seminegrita (500/600), tamaño base 16px con
                contraste óptimo garantizado.
              </p>
            </div>

            <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-on-surface">
                <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <span>Ícono de Apoyo (Opcional)</span>
              </div>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Glifo Material Symbols o Lucide de 18-20px que refuerza visualmente la acción
                cívica.
              </p>
            </div>
          </div>
        </div>

        {/* Microcopy y Redacción Cívica */}
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-4">
          <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
            Microcopy y Redacción
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
            Lineamientos de Redacción para Botones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            <div className="p-4 rounded-[10px] bg-green-50/70 border-l-4 border-l-[#1B7A2E] border border-green-200 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#1B7A2E] font-heading font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verbos de Acción en Infinitivo o Imperativo</span>
              </div>
              <p className="text-green-950 leading-relaxed text-xs">
                Usa verbos directos que comuniquen qué pasará al pulsar:{" "}
                <em>&ldquo;Guardar&rdquo;</em>, <em>&ldquo;Enviar solicitud&rdquo;</em>,{" "}
                <em>&ldquo;Descargar certificado&rdquo;</em>,{" "}
                <em>&ldquo;Pagar liquidación&rdquo;</em>.
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-red-50/70 border-l-4 border-l-[#CC0E35] border border-red-200 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#CC0E35] font-heading font-bold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Evitar Textos Ambiguos o Pasivos</span>
              </div>
              <p className="text-red-950 leading-relaxed text-xs">
                Prohibido usar palabras como <em>&ldquo;Aceptar&rdquo;</em>,{" "}
                <em>&ldquo;Hacer clic aquí&rdquo;</em>, <em>&ldquo;OK&rdquo;</em> o{" "}
                <em>&ldquo;Procesar&rdquo;</em> que no le explican al ciudadano el resultado de su
                acción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PESTAÑA 4: ACCESIBILIDAD (WCAG 2.2) */}
      {/* ========================================================================= */}
      <section
        id="panel-accesibilidad"
        role="tabpanel"
        aria-labelledby="tab-accesibilidad"
        hidden={activeTab !== "accesibilidad"}
        className={
          activeTab === "accesibilidad"
            ? "flex flex-col gap-8 animate-in fade-in duration-150"
            : "hidden"
        }
      >
        {/* Mandamientos de Accesibilidad */}
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-5">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-heading">
            <ShieldAlert className="w-4 h-4" />
            <span>Mandamientos de Accesibilidad para Botones</span>
          </div>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
            Estándares s WCAG 2.2 Nivel AA
          </h2>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Todos los botones del Kit UI Bogotá deben garantizar conformidad absoluta con las pautas
            WCAG 2.2:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mandamiento 1: aria-label en botones de solo ícono */}
            <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
              <span className="font-heading font-bold text-xs uppercase text-primary">
                1. aria-label en Botones de Solo Ícono
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Cuando el botón carece de texto visible (ej. botón circular{" "}
                <code>w-12 h-12 rounded-full</code>), es <strong>estrictamente </strong> incluir un{" "}
                <code>aria-label</code> descriptivo que anuncie la acción exacta a lectores de
                pantalla (NVDA, JAWS, VoiceOver).
              </p>
            </div>

            {/* Mandamiento 2: Contraste dinámico */}
            <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
              <span className="font-heading font-bold text-xs uppercase text-primary">
                2. Contraste Dinámico Riguroso (≥ 4.5:1)
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                El texto oscuro <code>#1B1C1C</code> sobre el fondo amarillo <code>#FAB62D</code>{" "}
                alcanza una relación de contraste superior a <strong>8.5:1</strong>. En estado
                hover, el texto blanco sobre el rojo distrital <code>#CC0E35</code> supera{" "}
                <strong>4.8:1</strong>.
              </p>
            </div>

            {/* Mandamiento 3: No depender exclusivamente del color */}
            <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
              <span className="font-heading font-bold text-xs uppercase text-primary">
                3. Indicador de Foco Visible y Distintivo
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                El estado de foco no depende exclusivamente del color, sino de un{" "}
                <strong>anillo rojo visible con desplazamiento</strong> (
                <code>ring-2 ring-offset-2 ring-[#CC0E35]</code>) que destaca nítidamente en
                cualquier navegación por teclado.
              </p>
            </div>

            {/* Mandamiento 4: Área táctil mínima */}
            <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
              <span className="font-heading font-bold text-xs uppercase text-primary">
                4. Área Táctil Mínima ≥ 44×44 px (WCAG 2.5.8)
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Todos los tamaños de botones, incluidos los circulares de solo ícono, garantizan
                dimensiones iguales o superiores a <strong>44×44 px</strong> para prevenir toques
                involuntarios en dispositivos táctiles.
              </p>
            </div>
          </div>
        </div>

        {/* Navegación por Teclado */}
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-heading">
            <Keyboard className="w-4 h-4" />
            <span>Navegación Alternativa por Teclado</span>
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
            Operación Mediante Teclas TAB, ENTER y SPACE
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-xs mt-1">
            <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
              <span className="font-mono font-bold text-primary text-sm flex items-center gap-2">
                <kbd className="px-2 py-0.5 bg-surface-container-highest rounded border border-surface-container-high">
                  TAB
                </kbd>
                <span>Mover Foco</span>
              </span>
              <p className="text-on-surface-variant leading-relaxed">
                Desplaza el foco secuencialmente entre elementos interactivos en un orden lógico y
                predecible.
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1.5">
              <span className="font-mono font-bold text-primary text-sm flex items-center gap-2">
                <kbd className="px-2 py-0.5 bg-surface-container-highest rounded border border-surface-container-high">
                  ENTER
                </kbd>
                <span>/</span>
                <kbd className="px-2 py-0.5 bg-surface-container-highest rounded border border-surface-container-high">
                  SPACE
                </kbd>
                <span>Activar</span>
              </span>
              <p className="text-on-surface-variant leading-relaxed">
                Ejecuta inmediatamente la acción asociada al botón enfocado sin disparar eventos
                repetidos.
              </p>
            </div>
          </div>
        </div>

        {/* Bloque de Código de Ejemplo Accesible */}
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-4">
          <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
            Etiquetado Accesible
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
            Uso de aria-label en Botones Circulares de Solo Ícono
          </h3>

          <div className="rounded-[10px] bg-[#1E1E24] text-white p-4 font-mono text-xs overflow-x-auto border border-gray-800 shadow-xs">
            <pre className="text-gray-200 leading-relaxed font-mono">
              {`// Botón Circular Oficial Accesible (Kit UI Bogotá)
<button
  type="button"
  aria-label="Editar registro catastral del predio"
  className="w-12 h-12 rounded-full p-0 flex items-center justify-center bg-[#FAB62D] text-[#1B1C1C] hover:bg-[#CC0E35] hover:text-white transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2"
>
  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
    edit
  </span>
</button>`}
            </pre>
          </div>
        </div>

        {/* Reglas de Accesibilidad del Manual */}
        <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-4">
          <span className="font-heading text-xs font-bold text-primary uppercase tracking-wider">
            Lineamientos Oficiales del Distrito
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
            Lista de Chequeo Oficial del Manual
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {[
              "Todos los botones deben tener un texto descriptivo que indique claramente la acción.",
              "Si el botón es circular o solo tiene ícono, debe incluir un aria-label accesible descriptivo.",
              "Todos los botones deben ser accesibles mediante teclado (Tab).",
              "El orden de navegación debe ser lógico y predecible.",
              "El botón debe activarse con las teclas Enter y/o Space.",
              "Debe haber suficiente espacio entre botones para evitar errores de toque involuntario.",
              "El área clickeable debe ser mayor o igual a 44x44px (WCAG 2.5.8).",
              "Los íconos deben complementar el texto, no reemplazarlo herméticamente.",
              "Mantener consistencia en estilo y significado: botones con la misma función deben verse y comportarse igual en toda la interfaz.",
            ].map((rule) => (
              <div
                key={rule.slice(0, 30)}
                className="flex items-start gap-3 p-3.5 rounded-[8px] bg-surface-container-low border border-surface-container-high hover:border-green-300 transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[18px] text-[#1B7A2E] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-body text-xs text-on-surface font-medium leading-relaxed">
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
