import { A11yMatrixTable } from "@/components/component-doc/A11yMatrixTable";
import { CodeSnippetViewer } from "@/components/component-doc/CodeSnippetViewer";
import { ComponentDocHeader } from "@/components/component-doc/ComponentDocHeader";
import { ComponentSidebarNav } from "@/components/component-doc/ComponentSidebarNav";
import { InteractiveAccordionPlayground } from "@/components/component-doc/InteractiveAccordionPlayground";
import { UsageGuidelinesGrid } from "@/components/component-doc/UsageGuidelinesGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colapsables (Acordeón Accesible) | Catálogo Kit UI Bogotá Stack",
  description:
    "Especificación técnica oficial, patrones WAI-ARIA 1.2, WCAG 2.2 AA y playground interactivo para el componente Colapsables de la Alcaldía Mayor de Bogotá D.C.",
};

export default function AccordionComponentPage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface">
      {/* 1. Hero Header del Componente y Badges Técnicos */}
      <ComponentDocHeader />

      {/* 2. Layout Maestro de 2 Columnas (Sidebar ~25% / Showcase ~75%) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMNA IZQUIERDA: Sidebar del Catálogo de Componentes (~3 cols) */}
          <ComponentSidebarNav />

          {/* COLUMNA DERECHA: Showcase, Playground y Documentación Técnica (~9 cols) */}
          <main className="lg:col-span-9 flex flex-col gap-10" id="component-main-content">
            {/* Barra de Pestañas Superiores (Obelisco & SGDS Inspired) */}
            <div className="border-b border-surface-container-high flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                className="pb-3 px-1 border-b-2 border-primary text-primary font-heading text-sm sm:text-base font-bold flex items-center gap-2 focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  palette
                </span>
                Diseño y UX
              </button>
              <button
                type="button"
                className="pb-3 px-1 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-heading text-sm sm:text-base font-medium flex items-center gap-2 transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  accessibility_new
                </span>
                Accesibilidad &amp; ARIA (WCAG 2.2)
              </button>
              <button
                type="button"
                className="pb-3 px-1 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-heading text-sm sm:text-base font-medium flex items-center gap-2 transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  terminal
                </span>
                Implementación &amp; Código
              </button>
              <button
                type="button"
                className="pb-3 px-1 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-heading text-sm sm:text-base font-medium flex items-center gap-2 transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  tune
                </span>
                Propiedades (Props &amp; Slots)
              </button>
            </div>

            {/* Subsección 1: Vista Previa Interactiva (Playground en Vivo) */}
            <InteractiveAccordionPlayground />

            {/* Subsección 2: Implementación en Código */}
            <CodeSnippetViewer />

            {/* Subsección 3: Pautas de Uso (Cuándo SÍ y cuándo NO usarlo) */}
            <UsageGuidelinesGrid />

            {/* Subsección 4: Matriz de Cumplimiento de Accesibilidad (WAI-ARIA 1.2 / WCAG 2.2 AA) */}
            <A11yMatrixTable />
          </main>
        </div>
      </div>
    </div>
  );
}
