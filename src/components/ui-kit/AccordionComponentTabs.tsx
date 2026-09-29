"use client";

import { A11yMatrixTable } from "@/components/component-doc/A11yMatrixTable";
import { CodeSnippetViewer } from "@/components/component-doc/CodeSnippetViewer";
import { InteractiveAccordionPlayground } from "@/components/component-doc/InteractiveAccordionPlayground";
import { UsageGuidelinesGrid } from "@/components/component-doc/UsageGuidelinesGrid";
import type React from "react";
import { useEffect, useState } from "react";

export type AccordionTabKey = "playground" | "codigo" | "guia" | "accesibilidad";

export const AccordionComponentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AccordionTabKey>("playground");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("accesibilidad")) {
        setActiveTab("accesibilidad");
      } else if (hash.includes("codigo")) {
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
        aria-label="Pestañas de documentación del componente Colapsables"
      >
        <button
          type="button"
          role="tab"
          id="tab-playground"
          aria-controls="panel-playground"
          aria-selected={activeTab === "playground"}
          onClick={() => setActiveTab("playground")}
          className={`pb-3 px-2 sm:px-3 text-xs sm:text-sm font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-4 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0E35] ${
            activeTab === "playground"
              ? "border-[#CC0E35] text-[#CC0E35]"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">palette</span>
          <span>Diseño y Playground</span>
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
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          <span>Implementación &amp; Código</span>
        </button>

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
          <span>Pautas de Uso</span>
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
          <span>Accesibilidad &amp; ARIA</span>
        </button>
      </div>

      {/* Contenido de Cada Pestaña */}
      <div className="w-full">
        {activeTab === "playground" && (
          <div
            id="panel-playground"
            role="tabpanel"
            aria-labelledby="tab-playground"
            className="flex flex-col gap-6"
          >
            <InteractiveAccordionPlayground />
          </div>
        )}

        {activeTab === "codigo" && (
          <div
            id="panel-codigo"
            role="tabpanel"
            aria-labelledby="tab-codigo"
            className="flex flex-col gap-6"
          >
            <CodeSnippetViewer />
          </div>
        )}

        {activeTab === "guia" && (
          <div
            id="panel-guia"
            role="tabpanel"
            aria-labelledby="tab-guia"
            className="flex flex-col gap-6"
          >
            <UsageGuidelinesGrid />
          </div>
        )}

        {activeTab === "accesibilidad" && (
          <div
            id="panel-accesibilidad"
            role="tabpanel"
            aria-labelledby="tab-accesibilidad"
            className="flex flex-col gap-6"
          >
            <A11yMatrixTable />
          </div>
        )}
      </div>
    </div>
  );
};
