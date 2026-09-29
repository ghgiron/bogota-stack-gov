"use client";

import { ArrowRight, Keyboard, Search } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";

export const FACETS = ["Todo", "Guías", "APIs & SDK", "Kit UI", "Normativa"] as const;
export type FacetType = (typeof FACETS)[number];

export interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFacet: FacetType;
  onFacetChange: (facet: FacetType) => void;
  onSearchSubmit?: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  activeFacet,
  onFacetChange,
  onSearchSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Atajo de teclado global '/' para enfocar el buscador principal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getDynamicPlaceholder = (facet: FacetType): string => {
    switch (facet) {
      case "Guías":
        return 'Buscando en "Guías"... Ej: cómo digitalizar un trámite, checklists distritales';
      case "APIs & SDK":
        return 'Buscando en "APIs & SDK"... Ej: B-Pay, tokens mTLS, endpoints ';
      case "Kit UI":
        return 'Buscando en "Kit UI"... Ej: paleta de color, botones píldora, inputs accesibles';
      case "Normativa":
        return 'Buscando en "Normativa"... Ej: SUIT, lineamientos DAFP, cero papel';
      default:
        return "¿Qué necesitas integrar hoy? Ej: Cómo implementar pagos, o cómo garantizar accesibilidad";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    } else {
      const el = document.getElementById("jtbd-heading");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="w-full bg-surface py-12 lg:py-16 relative overflow-hidden"
    >
      {/* Fondos institucionales con gradientes difuminados */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-tertiary/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        {/* Insignia superior de contexto */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-btn bg-surface-container mb-6 shadow-xs border border-surface-container-highest">
          <span aria-hidden="true" className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-on-surface uppercase font-heading">
            Estándar oficial de diseño, interoperabilidad y servicios compartidos de la Alcaldía Mayor de Bogotá
          </span>
        </div>

        {/* Título H1 imponente */}
        <h1
          id="hero-title"
          className="font-heading text-3xl lg:text-[36px] max-w-4xl tracking-tight mb-4 leading-tight text-[#1b1c1c]"
        >
          <span className="font-extrabold">Bogotá Stack:</span>{" "}
          <span className="font-normal">Diseña, Construye</span>{" "}
          <span className="font-normal text-[#CC0E35]">e Integra</span>
        </h1>

        {/* Subtítulo en Work Sans */}
        <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-3xl mb-8 leading-relaxed">
          Sistema de diseño, interoperabilidad y hub de conocimiento para integración al Portal
          Transaccional de Bogotá.
        </p>

        {/* BUSCADOR SEMÁNTICO GIGANTE (Área central prominente) */}
        <div className="w-full max-w-3xl bg-surface-container-lowest rounded-card p-3 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-surface-container-highest">
          {/* Filtros rápidos por faceta */}
          <div
            aria-label="Filtro de búsqueda por categoría"
            className="flex items-center gap-1.5 sm:gap-2 mb-3 overflow-x-auto pb-1 text-left"
            role="tablist"
          >
            <span className="text-xs text-on-surface-variant px-1 font-medium hidden sm:inline">
              Filtrar por:
            </span>
            {FACETS.map((facet) => {
              const isSelected = activeFacet === facet;
              return (
                <button
                  key={facet}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    onFacetChange(facet);
                    inputRef.current?.focus();
                  }}
                  className={`search-filter-btn px-3 py-1.5 rounded-btn text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none whitespace-nowrap ${isSelected
                    ? "bg-primary-container text-on-primary shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container bg-transparent"
                    }`}
                >
                  {facet}
                </button>
              );
            })}

            {activeFacet !== "Todo" && (
              <a
                href={
                  activeFacet === "Guías"
                    ? "/guias-de-vinculacion"
                    : activeFacet === "APIs & SDK"
                      ? "/soluciones-compartidas"
                      : activeFacet === "Kit UI"
                        ? "/kit-ui/colores"
                        : "/hub-de-conocimiento#repositorio-normativo"
                }
                className="text-xs font-heading font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0 ml-auto"
              >
                <span>Ver módulo →</span>
              </a>
            )}
          </div>

          {/* Input Gigante y Botón Primario */}
          <search>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-2.5"
            >
              <div className="relative flex-1 flex items-center">
                <label htmlFor="search-input" className="sr-only">
                  ¿Qué necesitas integrar hoy en el Bogotá Stack?
                </label>
                <Search
                  className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  id="search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={getDynamicPlaceholder(activeFacet)}
                  className="w-full min-h-[56px] pl-12 pr-12 py-3 bg-surface-container-low text-on-surface font-body text-sm sm:text-base rounded-btn border border-outline-variant/60 focus:border-tertiary focus:bg-surface-container-lowest focus:ring-2 focus:ring-tertiary focus:outline-none transition-all placeholder:text-on-surface-variant/60"
                />
                <kbd
                  className="hidden sm:inline-flex items-center justify-center absolute right-3 w-6 h-6 text-xs font-mono font-semibold text-on-surface-variant bg-surface-container-highest rounded border border-gray-300"
                  title="Presiona / para enfocar"
                >
                  /
                </kbd>
              </div>

              <button
                type="submit"
                className="min-h-[56px] min-w-[44px] px-6 py-3 bg-primary-container hover:bg-primary text-on-primary font-heading text-base font-semibold rounded-btn shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 outline-none active:scale-[0.99]"
              >
                <span>Buscar</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>
          </search>

          {/* Indicador de Accesibilidad e Integración Rápida */}
          <div className="flex items-center justify-start mt-3 pt-3 border-t border-surface-container px-1 text-left">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <Keyboard className="w-3.5 h-3.5 text-tertiary" aria-hidden="true" />
              <span>
                Tip: Presiona{" "}
                <kbd className="px-1.5 py-0.5 bg-surface-container rounded text-[11px] font-mono font-semibold border border-gray-300">
                  /
                </kbd>{" "}
                en cualquier lugar para buscar
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
