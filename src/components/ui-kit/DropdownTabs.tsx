"use client";

import { DropdownPlayground } from "@/components/ui-kit/DropdownPlayground";
import { DropdownStateMatrix } from "@/components/ui-kit/DropdownStateMatrix";
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

export type DropdownTabKey = "guia" | "especificaciones" | "codigo" | "accesibilidad";

export const DropdownTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DropdownTabKey>("guia");

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
        aria-label="Pestañas de documentación del componente Dropdowns"
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

      {/* CONTENIDO 1: GUÍA DE USO */}
      {activeTab === "guia" && (
        <section
          id="panel-guia"
          role="tabpanel"
          aria-labelledby="tab-guia"
          className="flex flex-col gap-8 w-full animate-fade-in"
        >
          {/* Tarjeta de Principios de Uso */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-surface-container-high pb-4">
              <span className="material-symbols-outlined text-primary text-[24px]">lightbulb</span>
              <h3 className="font-heading text-lg font-bold text-on-surface">
                Principios de Selección y Criterios de Decisión
              </h3>
            </div>

            <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
              El selector desplegable (Dropdown) está pensado para simplificar la toma de decisiones
              del ciudadano al presentar opciones excluyentes de manera compacta. Elegir el control
              correcto evita fricción y agiliza la radicación de trámites públicos.
            </p>

            {/* Cuándo Usar vs Cuándo NO Usar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Cuándo USAR */}
              <div className="p-6 rounded-[12px] bg-[#EAF5EC] border border-[#1B7A2E]/30 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#1B7A2E]">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h4 className="font-heading font-bold text-base">Cuándo SÍ usar Dropdowns</h4>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-body text-[#1B1C1C]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1B7A2E] font-bold">✓</span>
                    <span>
                      <strong>Lista de 5 a 15 opciones:</strong> Cuando el catálogo de alternativas
                      es moderadamente extenso (ej. localidades de Bogotá, estratos, tipos de
                      documento o sedes distritales de atención).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1B7A2E] font-bold">✓</span>
                    <span>
                      <strong>Optimización de espacio:</strong> En formularios complejos donde
                      mostrar todas las opciones visibles saturaría la interfaz vertical.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1B7A2E] font-bold">✓</span>
                    <span>
                      <strong>Selección única obligatoria:</strong> Cuando el ciudadano debe escoger
                      una y solo una alternativa excluyente.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Cuándo NO USAR */}
              <div className="p-6 rounded-[12px] bg-[#FFF0F2] border border-[#CC0E35]/30 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <h4 className="font-heading font-bold text-base">Cuándo NO usar Dropdowns</h4>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-body text-[#1B1C1C]">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✗</span>
                    <span>
                      <strong>Menos de 5 opciones:</strong> Usa{" "}
                      <em>Botones de Radio (Radio Buttons)</em>. Permiten al usuario ver todas las
                      alternativas con cero clics adicionales.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✗</span>
                    <span>
                      <strong>Más de 20 opciones extensas:</strong> No uses dropdown estándar;
                      implementa la variante con <em>Búsqueda y Autocompletado (Typeahead)</em> para
                      evitar navegación tediosa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✗</span>
                    <span>
                      <strong>Selección múltiple:</strong> Si el usuario puede marcar varios ítems a
                      la vez, usa un grupo de <em>Casillas de Verificación (Checkboxes)</em> o
                      etiquetas seleccionables.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Anatomía Funcional del Componente */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-surface-container-high pb-4">
              <span className="material-symbols-outlined text-primary text-[24px]">
                account_tree
              </span>
              <h3 className="font-heading text-lg font-bold text-on-surface">
                Anatomía Funcional de 5 Partes
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 rounded-[10px] bg-surface-container border border-surface-container-high flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
                  1
                </span>
                <h5 className="font-heading font-bold text-sm text-on-surface">Etiqueta (Label)</h5>
                <p className="font-body text-xs text-on-surface-variant">
                  Work Sans Medium 18px. Visible, concisa y obligatoria. Incluye asterisco rojo (*)
                  si es campo requerido.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container border border-surface-container-high flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
                  2
                </span>
                <h5 className="font-heading font-bold text-sm text-on-surface">Caja Selectora</h5>
                <p className="font-body text-xs text-on-surface-variant">
                  Altura de 40px (base) / 44px (área táctil accesible). Borde #B0B0B0, radio 5px y
                  padding horizontal de 16px.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container border border-surface-container-high flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
                  3
                </span>
                <h5 className="font-heading font-bold text-sm text-on-surface">Chevron Oficial</h5>
                <p className="font-body text-xs text-on-surface-variant">
                  Contenedor circular de 17x17px en amarillo institucional #FAB62D con flecha que
                  rota 180° al abrirse.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container border border-surface-container-high flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
                  4
                </span>
                <h5 className="font-heading font-bold text-sm text-on-surface">Menú Desplegado</h5>
                <p className="font-body text-xs text-on-surface-variant">
                  Overlay con sombra elevada (shadow-lg), opciones en Work Sans 16px y scroll
                  independiente si supera 5 ítems.
                </p>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container border border-surface-container-high flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
                  5
                </span>
                <h5 className="font-heading font-bold text-sm text-on-surface">
                  Texto Asistencial
                </h5>
                <p className="font-body text-xs text-on-surface-variant">
                  Work Sans Regular 12px. Instrucción orientadora en gris (#43474E) o mensaje de
                  error preventivo en rojo (#BA1A1A).
                </p>
              </div>
            </div>
          </div>

          {/* UX Writing Distrital */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-surface-container-high pb-4">
              <span className="material-symbols-outlined text-primary text-[24px]">edit_note</span>
              <h3 className="font-heading text-lg font-bold text-on-surface">
                Lineamientos de UX Writing Distrital
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-[10px] bg-[#FAF9F5] border border-[#E4E2E1] flex flex-col gap-3">
                <h5 className="font-heading font-bold text-sm text-[#1B1C1C] flex items-center gap-2">
                  <span className="text-[#0049AE]">●</span> Texto por Defecto (Placeholder
                  Orientativo)
                </h5>
                <p className="font-body text-xs text-[#43474E] leading-relaxed">
                  El texto por defecto debe ser descriptivo de la acción específica y anticipar el
                  tipo de dato que se elegirá. <strong>Nunca uses textos vacíos o genéricos</strong>{" "}
                  como *"Seleccionar..."* o *"Elige una opción"*.
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="text-[#1B7A2E] bg-[#EAF5EC] px-3 py-1.5 rounded border border-[#1B7A2E]/20">
                    ✓ Bien: "Selecciona una localidad", "Elige un tipo de documento"
                  </div>
                  <div className="text-[#BA1A1A] bg-[#FFF0F2] px-3 py-1.5 rounded border border-[#BA1A1A]/20">
                    ✗ Evitar: "Seleccione...", "Haga clic aquí", "Opciones"
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-[10px] bg-[#FAF9F5] border border-[#E4E2E1] flex flex-col gap-3">
                <h5 className="font-heading font-bold text-sm text-[#1B1C1C] flex items-center gap-2">
                  <span className="text-[#CC0E35]">●</span> Mensajes de Error Resolutivos
                </h5>
                <p className="font-body text-xs text-[#43474E] leading-relaxed">
                  Cuando un dropdown requerido no ha sido diligenciado, el mensaje de error no debe
                  ser acusatorio ni técnico. Debe indicar con claridad{" "}
                  <strong>qué falta y cómo solucionarlo</strong>.
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="text-[#1B7A2E] bg-[#EAF5EC] px-3 py-1.5 rounded border border-[#1B7A2E]/20">
                    ✓ Bien: "* Campo : selecciona una sede para continuar con tu turno"
                  </div>
                  <div className="text-[#BA1A1A] bg-[#FFF0F2] px-3 py-1.5 rounded border border-[#BA1A1A]/20">
                    ✗ Evitar: "Valor inválido", "Error en campo 4", "Requerido"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTENIDO 2: ESPECIFICACIONES (MATRIZ Y COTAS) */}
      {activeTab === "especificaciones" && (
        <section
          id="panel-especificaciones"
          role="tabpanel"
          aria-labelledby="tab-especificaciones"
          className="flex flex-col gap-8 w-full animate-fade-in"
        >
          <DropdownStateMatrix />
        </section>
      )}

      {/* CONTENIDO 3: CÓDIGO (PLAYGROUND INTERACTIVO) */}
      {activeTab === "codigo" && (
        <section
          id="panel-codigo"
          role="tabpanel"
          aria-labelledby="tab-codigo"
          className="flex flex-col gap-8 w-full animate-fade-in"
        >
          <DropdownPlayground />
        </section>
      )}

      {/* CONTENIDO 4: ACCESIBILIDAD (WCAG 2.2 AA) */}
      {activeTab === "accesibilidad" && (
        <section
          id="panel-accesibilidad"
          role="tabpanel"
          aria-labelledby="tab-accesibilidad"
          className="flex flex-col gap-8 w-full animate-fade-in"
        >
          {/* Tarjeta de Resumen de Acreditación */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                <h3 className="font-heading text-lg font-bold text-on-surface">
                  Acreditación de Accesibilidad Distrital (WCAG 2.2 Nivel AA)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#EAF5EC] text-[#1B7A2E] border border-[#1B7A2E]/30 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Acreditado AA (100% Conforme)
              </span>
            </div>

            {/* Grid de 4 Pilares de Accesibilidad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pilar 1: Patrón WAI-ARIA 1.2 */}
              <div className="p-5 rounded-[12px] bg-[#FAF9F5] border border-[#E4E2E1] flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0049AE]">
                  <Keyboard className="w-5 h-5 shrink-0" />
                  <h4 className="font-heading font-bold text-sm">
                    1. Patrón Semántico WAI-ARIA 1.2 Combobox
                  </h4>
                </div>
                <p className="font-body text-xs text-[#43474E] leading-relaxed">
                  El selector implementa el rol formal <code>role="combobox"</code> junto con los
                  atributos
                  <code>aria-expanded</code>, <code>aria-haspopup="listbox"</code> y{" "}
                  <code>aria-controls="id-lista"</code>. El menú desplegado utiliza{" "}
                  <code>role="listbox"</code> y cada ítem contiene <code>role="option"</code> y
                  <code>aria-selected</code> dinámico.
                </p>
              </div>

              {/* Pilar 2: Navegación por Teclado Estricta */}
              <div className="p-5 rounded-[12px] bg-[#FAF9F5] border border-[#E4E2E1] flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0049AE]">
                  <MousePointer className="w-5 h-5 shrink-0" />
                  <h4 className="font-heading font-bold text-sm">
                    2. Navegación por Teclado Estricta
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs font-body text-[#43474E]">
                  <div>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#B0B0B0] font-mono text-[11px] font-bold">
                      Tab
                    </kbd>
                    : Entra y sale del control en el orden natural del formulario.
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#B0B0B0] font-mono text-[11px] font-bold">
                      Space / Enter
                    </kbd>
                    : Abre el menú o confirma la opción enfocada.
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#B0B0B0] font-mono text-[11px] font-bold">
                      Flechas ↑ / ↓
                    </kbd>
                    : Navega secuencialmente entre las opciones.
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#B0B0B0] font-mono text-[11px] font-bold">
                      Esc
                    </kbd>
                    : Cierra inmediatamente el menú sin modificar la selección y retorna el foco.
                  </div>
                </div>
              </div>

              {/* Pilar 3: Ratios de Contraste Cromático */}
              <div className="p-5 rounded-[12px] bg-[#FAF9F5] border border-[#E4E2E1] flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#1B7A2E]">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <h4 className="font-heading font-bold text-sm">
                    3. Ratios de Contraste Cromático
                  </h4>
                </div>
                <p className="font-body text-xs text-[#43474E] leading-relaxed">
                  El texto digitado y las opciones (<code>#1B1C1C</code>) superan un ratio de{" "}
                  <strong>14.2:1</strong>
                  contra el fondo blanco (mínimo exigido 4.5:1). Los bordes y chevrons superan{" "}
                  <strong>3:1</strong>
                  para delimitar de forma inequívoca el área interactiva.
                </p>
              </div>

              {/* Pilar 4: Área Táctil Accesible */}
              <div className="p-5 rounded-[12px] bg-[#FAF9F5] border border-[#E4E2E1] flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#694C13]">
                  <Sliders className="w-5 h-5 shrink-0" />
                  <h4 className="font-heading font-bold text-sm">
                    4. Área Táctil Mínima (WCAG 2.5.8)
                  </h4>
                </div>
                <p className="font-body text-xs text-[#43474E] leading-relaxed">
                  Aunque la base visual del Kit UI establece una caja de 40px, el área interactiva
                  se extiende a<strong>44px</strong> mediante padding perimetral accesible,
                  garantizando compatibilidad con dispositivos móviles y personas con destreza
                  motriz reducida.
                </p>
              </div>
            </div>
          </div>

          {/* Tabla de Criterios WCAG 2.2 AA */}
          <div className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col gap-6">
            <h4 className="font-heading text-base font-bold text-on-surface">
              Matriz de Cumplimiento Técnico de Pautas WCAG 2.2
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-surface-container-high bg-surface-container text-on-surface font-heading">
                    <th className="p-3">Criterio WCAG</th>
                    <th className="p-3">Nivel</th>
                    <th className="p-3">Implementación Técnica en Kit UI</th>
                    <th className="p-3 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  <tr>
                    <td className="p-3 font-semibold text-on-surface">
                      1.3.1 Info and Relationships
                    </td>
                    <td className="p-3 font-mono">A</td>
                    <td className="p-3 text-on-surface-variant">
                      Etiqueta <code>&lt;label&gt;</code> vinculada con <code>htmlFor/id</code>,
                      patrón combobox y listbox.
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[#1B7A2E] font-bold bg-[#EAF5EC] px-2 py-0.5 rounded">
                        Pasa
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-on-surface">1.4.3 Contrast (Minimum)</td>
                    <td className="p-3 font-mono">AA</td>
                    <td className="p-3 text-on-surface-variant">
                      Texto 16px con contraste &gt;14:1 contra blanco. Opciones seleccionadas con
                      fondo amarillo #FFF8EA y texto #694C13 (&gt;7:1).
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[#1B7A2E] font-bold bg-[#EAF5EC] px-2 py-0.5 rounded">
                        Pasa
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-on-surface">2.1.1 Keyboard Accessible</td>
                    <td className="p-3 font-mono">A</td>
                    <td className="p-3 text-on-surface-variant">
                      Navegación completa por Tab, Enter, Space, Flechas y Escape sin trampas de
                      foco.
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[#1B7A2E] font-bold bg-[#EAF5EC] px-2 py-0.5 rounded">
                        Pasa
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-on-surface">2.4.7 Focus Visible</td>
                    <td className="p-3 font-mono">AA</td>
                    <td className="p-3 text-on-surface-variant">
                      Doble anillo de foco visible #0049AE (2px ring + 2px offset) para navegación
                      por teclado.
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[#1B7A2E] font-bold bg-[#EAF5EC] px-2 py-0.5 rounded">
                        Pasa
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-on-surface">
                      2.5.8 Target Size (Minimum)
                    </td>
                    <td className="p-3 font-mono">AA</td>
                    <td className="p-3 text-on-surface-variant">
                      Dimensiones interactivas mínimas de 44x44px en desktop y pantallas táctiles
                      móviles.
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[#1B7A2E] font-bold bg-[#EAF5EC] px-2 py-0.5 rounded">
                        Pasa
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-on-surface">
                      3.3.1 Error Identification
                    </td>
                    <td className="p-3 font-mono">A</td>
                    <td className="p-3 text-on-surface-variant">
                      Borde rojo #BA1A1A, icono de alerta visual y mensaje explicativo vinculado por
                      aria-describedby.
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[#1B7A2E] font-bold bg-[#EAF5EC] px-2 py-0.5 rounded">
                        Pasa
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-on-surface">4.1.2 Name, Role, Value</td>
                    <td className="p-3 font-mono">A</td>
                    <td className="p-3 text-on-surface-variant">
                      Roles aria completos, anuncio de opciones seleccionadas y total de ítems para
                      lectores de pantalla.
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[#1B7A2E] font-bold bg-[#EAF5EC] px-2 py-0.5 rounded">
                        Pasa
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
