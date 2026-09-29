"use client";

import type React from "react";
import { useState } from "react";
import { BbDesignTab } from "./BbDesignTab";
import { BbStrategicTab } from "./BbStrategicTab";
import { BbTechnicalTab } from "./BbTechnicalTab";

type TabId = "tab-estrategica" | "tab-diseno" | "tab-tecnica";

export const BbTripleAudienceTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("tab-tecnica");

  return (
    <>
      {/* Triple Audience GovStack Tabs Bar */}
      <section
        className="w-full bg-surface-container-lowest sticky top-20 z-40 border-b border-surface-container-high shadow-xs"
        aria-label="Pestañas de perfiles de adopción e integración"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none"
            id="bb-tabs-container"
            role="tablist"
          >
            {/* Tab 1: Adopcion Estrategica */}
            <button
              id="btn-tab-estrategica"
              role="tab"
              aria-selected={activeTab === "tab-estrategica"}
              aria-controls="tab-estrategica"
              onClick={() => setActiveTab("tab-estrategica")}
              type="button"
              className={`group py-4 px-1 flex items-center gap-2 hover:text-on-surface transition-all whitespace-nowrap bg-transparent cursor-pointer border-b-2 min-h-[48px] focus:outline-none ${
                activeTab === "tab-estrategica"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-on-surface-variant font-medium"
              }`}
            >
              <span className="font-heading text-sm sm:text-base">Adopción Estratégica</span>
              <span
                className={`px-2 py-0.5 rounded-[5px] text-xs transition-colors ${
                  activeTab === "tab-estrategica"
                    ? "bg-[#FAE7EB] text-primary font-semibold"
                    : "bg-surface-container text-on-surface-variant group-hover:bg-surface-container-high"
                }`}
              >
                Solución Compartida
              </span>
            </button>

            {/* Tab 2: Diseno & UX/UI */}
            <button
              id="btn-tab-diseno"
              role="tab"
              aria-selected={activeTab === "tab-diseno"}
              aria-controls="tab-diseno"
              onClick={() => setActiveTab("tab-diseno")}
              type="button"
              className={`group py-4 px-1 flex items-center gap-2 hover:text-on-surface transition-all whitespace-nowrap bg-transparent cursor-pointer border-b-2 min-h-[48px] focus:outline-none ${
                activeTab === "tab-diseno"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-on-surface-variant font-medium"
              }`}
            >
              <span className="font-heading text-sm sm:text-base">Diseño &amp; UX/UI</span>
              <span
                className={`px-2 py-0.5 rounded-[5px] text-xs transition-colors ${
                  activeTab === "tab-diseno"
                    ? "bg-[#FAE7EB] text-primary font-semibold"
                    : "bg-surface-container text-on-surface-variant group-hover:bg-surface-container-high"
                }`}
              >
                Web component
              </span>
            </button>

            {/* Tab 3: Integracion Tecnica (ACTIVE BY DEFAULT) */}
            <button
              id="btn-tab-tecnica"
              role="tab"
              aria-selected={activeTab === "tab-tecnica"}
              aria-controls="tab-tecnica"
              onClick={() => setActiveTab("tab-tecnica")}
              type="button"
              className={`group py-4 px-1 flex items-center gap-2 hover:text-on-surface transition-all whitespace-nowrap bg-transparent cursor-pointer border-b-2 min-h-[48px] focus:outline-none ${
                activeTab === "tab-tecnica"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-on-surface-variant font-medium"
              }`}
            >
              <span className="font-heading text-sm sm:text-base font-bold">
                Integración Técnica
              </span>
              <span
                className={`px-2 py-0.5 rounded-[5px] text-xs font-semibold ${
                  activeTab === "tab-tecnica"
                    ? "bg-primary-fixed text-on-primary-fixed"
                    : "bg-surface-container text-on-surface-variant group-hover:bg-surface-container-high"
                }`}
              >
                API Rest
              </span>
              <span className="w-2 h-2 rounded-full bg-primary ml-0.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Content Area */}
      <div className="w-full bg-background py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={activeTab === "tab-estrategica" ? "block" : "hidden"}>
            <BbStrategicTab />
          </div>
          <div className={activeTab === "tab-diseno" ? "block" : "hidden"}>
            <BbDesignTab />
          </div>
          <div className={activeTab === "tab-tecnica" ? "block" : "hidden"}>
            <BbTechnicalTab />
          </div>
        </div>
      </div>
    </>
  );
};
