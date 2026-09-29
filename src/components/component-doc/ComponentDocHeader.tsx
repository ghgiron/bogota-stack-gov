"use client";

import Link from "next/link";
import type React from "react";

export const ComponentDocHeader: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-lowest border-b border-surface-container-highest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Ruta de navegación"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant mb-4 flex-wrap"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <span className="material-symbols-outlined text-[14px] opacity-40" aria-hidden="true">
            chevron_right
          </span>
          <span className="hover:text-primary transition-colors cursor-pointer">Módulos</span>
          <span className="material-symbols-outlined text-[14px] opacity-40" aria-hidden="true">
            chevron_right
          </span>
          <Link href="/developer-kit" className="hover:text-primary transition-colors">
            Developer KIT
          </Link>
          <span className="material-symbols-outlined text-[14px] opacity-40" aria-hidden="true">
            chevron_right
          </span>
          <span className="hover:text-primary transition-colors cursor-pointer">
            Catálogo de Componentes
          </span>
          <span className="material-symbols-outlined text-[14px] opacity-40" aria-hidden="true">
            chevron_right
          </span>
          <span aria-current="page" className="text-on-surface font-semibold">
            Acordeón
          </span>
        </nav>

        {/* Institutional Badges Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-on-surface text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" /> UI Kit
            v2.4.1
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EAF5EC] text-[#1B7A2E] text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              verified
            </span>{" "}
            WCAG 2.2 Nivel AA Acreditado
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed text-xs font-medium">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              accessibility_new
            </span>{" "}
            WAI-ARIA Accordion Pattern Compliant
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              code
            </span>{" "}
            Web Component Nativo
          </span>
        </div>

        {/* Main Title and Actions Bar */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pt-1">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight">
              Colapsables
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant mt-2 leading-relaxed">
              Elemento de interfaz interactivo que permite desplegar y contraer bloques de contenido
              relacionados. Optimiza el espacio visual y reduce la sobrecarga cognitiva en trámites
              distritales extensos sin romper la jerarquía del flujo de información.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://storybook.gobiernobogota.gov.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] border-2 border-primary-container text-primary-container font-heading text-sm font-semibold hover:bg-primary-fixed/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                auto_stories
              </span>
              Ver en Storybook Distrital
            </a>

            <button
              type="button"
              onClick={() => {
                const token = {
                  component: "bogota-accordion",
                  version: "2.4.1",
                  wcag: "2.2 AA",
                  tokens: {
                    focusRing: "#CC0E35",
                    activeBg: "#FAE7EB",
                    minHeight: "48px",
                  },
                };
                const blob = new Blob([JSON.stringify(token, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "token-accordion-distrital.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-primary-container text-on-primary font-heading text-sm font-semibold hover:bg-primary transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                download
              </span>
              Descargar Token JSON
            </button>
          </div>
        </div>

        {/* Quick Technical Specifications Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-surface-container-high">
          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Estado del Ciclo
            </span>
            <span className="font-semibold text-xs sm:text-sm text-on-surface flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#1B7A2E]" aria-hidden="true" /> Estable /
              Producción
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Cobertura ARIA
            </span>
            <span className="font-semibold text-xs sm:text-sm text-on-surface flex items-center gap-1 mt-0.5">
              <span
                className="material-symbols-outlined text-[#1B7A2E] text-[18px]"
                aria-hidden="true"
              >
                verified_user
              </span>{" "}
              100% Validado W3C
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Token de Foco
            </span>
            <span className="font-semibold text-xs sm:text-sm text-on-surface flex items-center gap-1.5 mt-0.5 font-mono">
              <span
                className="w-3.5 h-3.5 rounded-xs bg-[#CC0E35] border border-surface-container-high inline-block shrink-0"
                aria-hidden="true"
              />{" "}
              #CC0E35 Rojo Bogotá
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Soporte Teclado
            </span>
            <span className="font-semibold text-xs sm:text-sm text-on-surface mt-0.5 font-mono">
              Tab, Enter, Space, ↑ / ↓, Home, End
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
