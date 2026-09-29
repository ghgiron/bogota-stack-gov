import { AccordionComponentTabs } from "@/components/ui-kit/AccordionComponentTabs";
import { SidebarKitUi } from "@/components/ui-kit/SidebarKitUi";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";

export const metadata: Metadata = {
  title: "Colapsables (Acordeón Accesible) | Kit UI Bogotá Stack",
  description:
    "Especificación técnica oficial, patrones WAI-ARIA 1.2, WCAG 2.2 AA y playground interactivo para el componente Colapsables de la Alcaldía Mayor de Bogotá D.C.",
};

export default function ColapsablesComponentPage() {
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
            <span className="text-on-surface-variant">Componentes</span>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-primary font-semibold" aria-current="page">
              Colapsables
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

          {/* COLUMNA DERECHA: Documentación Viva y Pestañas Interactivas */}
          <main className="flex-1 min-w-0 flex flex-col gap-8 w-full" id="main-content">
            {/* Encabezado del Componente */}
            <article className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-sm border border-surface-container-high flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-heading font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  <span>Componente de Contenido Progresivo</span>
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-medium">
                  @bogota/ui-accordion • v2.4.0
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                  Colapsables
                </h1>
                <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">
                  Son elementos interactivos diseñados para organizar y presentar información de
                  manera compacta. Permiten a los usuarios expandir o colapsar secciones de
                  contenido según sus necesidades, reduciendo la sobrecarga cognitiva en trámites
                  distritales densos.
                </p>
              </div>

              {/* Ficha Rápida de Propiedades */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-surface-container-high font-body text-xs mt-2">
                <div>
                  <span className="text-on-surface-variant block font-medium">Patrón ARIA:</span>
                  <strong className="text-on-surface font-semibold">WAI-ARIA Accordion 1.2</strong>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">Geometría:</span>
                  <strong className="text-on-surface font-semibold">rounded-[15px]</strong>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">Navegación:</span>
                  <strong className="text-primary font-semibold">Tab + Flechas Arriba/Abajo</strong>
                </div>
                <div>
                  <span className="text-on-surface-variant block font-medium">Accesibilidad:</span>
                  <strong className="text-tertiary font-semibold">WCAG 2.2 AA (4.5:1)</strong>
                </div>
              </div>
            </article>

            {/* Pestañas Interactivas */}
            <AccordionComponentTabs />
          </main>
        </div>
      </div>
    </div>
  );
}
