"use client";

import type React from "react";
import { useId, useState } from "react";

export interface DevSidebarTreeProps {
  selectedComponent: string;
  onSelectComponent: (id: string) => void;
}

export const DevSidebarTree: React.FC<DevSidebarTreeProps> = ({
  selectedComponent,
  onSelectComponent,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCore, setOpenCore] = useState(true);
  const [openInterop, setOpenInterop] = useState(true);
  const [openUiKit, setOpenUiKit] = useState(true);
  const [jwtToken, setJwtToken] = useState("eyJh...bog_sbx_9921kLmQ");
  const [regenerating, setRegenerating] = useState(false);

  const searchInputId = useId();

  const handleRegenerateToken = () => {
    setRegenerating(true);
    setTimeout(() => {
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      setJwtToken(`eyJh...bog_sbx_${randomSuffix}`);
      setRegenerating(false);
    }, 600);
  };

  const q = searchQuery.toLowerCase().trim();

  const uiComponents = [
    { id: "once-only", label: "Formulario Once-Only", active: true },
    { id: "stepper", label: "Stepper Transaccional" },
    { id: "bpay", label: "Botón B-Pay Distrital" },
    { id: "cedula", label: "Selector Cédula Digital" },
    { id: "pausa", label: "Modal de Pausa Programada" },
    { id: "alerta", label: "Alerta Accesible (Live ARIA)" },
  ];

  const filteredUiComponents = uiComponents.filter((c) => !q || c.label.toLowerCase().includes(q));

  return (
    <aside className="lg:col-span-3 flex flex-col gap-4 bg-surface-container-lowest rounded-[15px] p-4 shadow-sm border border-surface-container-highest/60 lg:sticky lg:top-28">
      {/* Buscador de componentes */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor={searchInputId}
          className="font-body text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
        >
          Búsqueda rápida
        </label>
        <div className="relative">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none"
            aria-hidden="true"
          >
            search
          </span>
          <input
            id={searchInputId}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar componentes, hooks..."
            className="w-full h-10 pl-9 pr-3 rounded-[5px] bg-surface-container-low font-body text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-tertiary border border-transparent focus:border-tertiary transition-all"
          />
        </div>
      </div>

      {/* Árbol de categorías navegable */}
      <div className="flex flex-col gap-2 pt-1 font-body">
        {/* Categoría 1: APIs Core & Gateway */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setOpenCore(!openCore)}
            className="w-full flex items-center justify-between py-1.5 px-2 rounded-[5px] text-left text-xs sm:text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px] text-tertiary"
                aria-hidden="true"
              >
                hub
              </span>
              <span>APIs Core &amp; Gateway</span>
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-on-surface-variant transition-transform"
              aria-hidden="true"
            >
              {openCore ? "expand_less" : "expand_more"}
            </span>
          </button>
          {openCore && (
            <div className="pl-7 flex flex-col gap-0.5 text-xs text-on-surface-variant">
              <a
                href="#keycloak"
                className="py-1 px-2 rounded-[5px] hover:text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Keycloak OIDC Distrital
              </a>
              <a
                href="#interop"
                className="py-1 px-2 rounded-[5px] hover:text-on-surface hover:bg-surface-container-low transition-colors"
              >
                SDK Interoperabilidad
              </a>
              <a
                href="#dwh"
                className="py-1 px-2 rounded-[5px] hover:text-on-surface hover:bg-surface-container-low transition-colors"
              >
                DWH Datos Maestros
              </a>
            </div>
          )}
        </div>

        {/* Categoría 2: @bogota/bb-interop */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setOpenInterop(!openInterop)}
            className="w-full flex items-center justify-between py-1.5 px-2 rounded-[5px] text-left text-xs sm:text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px] text-secondary"
                aria-hidden="true"
              >
                lan
              </span>
              <span>@bogota/bb-interop</span>
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-on-surface-variant transition-transform"
              aria-hidden="true"
            >
              {openInterop ? "expand_less" : "expand_more"}
            </span>
          </button>
          {openInterop && (
            <div className="pl-7 flex flex-col gap-0.5 text-xs text-on-surface-variant">
              <a
                href="#api-rest"
                className="py-1 px-2 rounded-[5px] hover:text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Cliente API Rest
              </a>
              <a
                href="#kafka"
                className="py-1 px-2 rounded-[5px] hover:text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Kafka EventStore Client
              </a>
              <a
                href="/developer/building-blocks/pagos-distritales"
                className="py-1 px-2 rounded-[5px] hover:text-on-surface hover:bg-surface-container-low transition-colors flex items-center justify-between"
              >
                <span>Building Blocks</span>
                <span className="text-[10px] bg-secondary/15 text-secondary px-1.5 py-0.5 rounded font-bold">
                  B-Pay
                </span>
              </a>
            </div>
          )}
        </div>

        {/* Categoría 3: Catálogo UI Kit Bogotá (ACTIVO) */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setOpenUiKit(!openUiKit)}
            className="w-full flex items-center justify-between py-1.5 px-2 rounded-[5px] text-xs sm:text-sm font-semibold text-primary bg-primary/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px] text-primary"
                aria-hidden="true"
              >
                widgets
              </span>
              <span>UI Kit Bogotá (Web)</span>
            </span>
            <span
              className="material-symbols-outlined text-[16px] transition-transform"
              aria-hidden="true"
            >
              {openUiKit ? "expand_less" : "expand_more"}
            </span>
          </button>
          {openUiKit && (
            <div className="pl-2 flex flex-col gap-0.5 text-xs">
              {filteredUiComponents.map((item) => {
                const isSelected = selectedComponent === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectComponent(item.id)}
                    className={`w-full flex items-center justify-between py-2 px-3 rounded-[5px] text-left transition-colors font-body ${
                      isSelected
                        ? "bg-primary text-on-primary font-semibold shadow-xs"
                        : "text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelected && (
                      <span
                        className="w-2 h-2 rounded-full bg-secondary-container"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Widget Sandbox API Token */}
      <div className="mt-2 p-3.5 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-highest/60 font-body">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-on-surface">Token Sandbox</span>
          <span className="inline-flex items-center gap-1 text-xs text-[#1B7A2E] font-medium">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#1B7A2E] animate-pulse"
              aria-hidden="true"
            />
            <span>Activo</span>
          </span>
        </div>
        <div
          className={`font-mono text-[11px] p-2 rounded-[5px] bg-surface-container-lowest text-on-surface-variant truncate border border-surface-container-highest transition-opacity ${
            regenerating ? "opacity-40" : "opacity-100"
          }`}
          title={jwtToken}
        >
          {jwtToken}
        </div>
        <button
          type="button"
          onClick={handleRegenerateToken}
          disabled={regenerating}
          className="w-full text-center text-xs text-tertiary hover:underline font-semibold py-1 focus-visible:ring-1 focus-visible:ring-tertiary rounded min-h-[36px]"
        >
          {regenerating ? "Regenerando..." : "Regenerar JWT de Pruebas"}
        </button>
      </div>
    </aside>
  );
};
