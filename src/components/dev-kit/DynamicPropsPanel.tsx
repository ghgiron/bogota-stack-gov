"use client";

import type React from "react";

export interface DynamicPropsPanelProps {
  actorType: "natural" | "juridica" | "apoderado";
  onChangeActorType: (type: "natural" | "juridica" | "apoderado") => void;
  isSSOAutofill: boolean;
  onToggleSSOAutofill: (val: boolean) => void;
  simulateValidationError: boolean;
  onToggleValidationError: (val: boolean) => void;
  isOnceOnlyLocked: boolean;
  onToggleOnceOnlyLocked: (val: boolean) => void;
  isKafkaEnabled: boolean;
  onToggleKafka: (val: boolean) => void;
}

export const DynamicPropsPanel: React.FC<DynamicPropsPanelProps> = ({
  actorType,
  onChangeActorType,
  isSSOAutofill,
  onToggleSSOAutofill,
  simulateValidationError,
  onToggleValidationError,
  isOnceOnlyLocked,
  onToggleOnceOnlyLocked,
  isKafkaEnabled,
  onToggleKafka,
}) => {
  return (
    <aside className="lg:col-span-3 flex flex-col gap-4 lg:sticky lg:top-28">
      <div className="bg-surface-container-lowest p-4 rounded-[15px] shadow-sm border border-surface-container-highest/60 flex flex-col gap-4 font-body">
        <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-3">
          <h3 className="font-heading text-sm sm:text-base text-on-surface font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">
              tune
            </span>
            <span>Controles (Props)</span>
          </h3>
          <span className="font-mono text-xs font-semibold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-[5px]">
            Live Mock
          </span>
        </div>

        {/* Selector de Contexto Ciudadano Mock */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider font-heading">
            Tipo de Solicitante
          </span>
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2.5 p-2 rounded-[5px] hover:bg-surface-container-low cursor-pointer transition-colors">
              <input
                type="radio"
                name="mock-actor"
                checked={actorType === "natural"}
                onChange={() => onChangeActorType("natural")}
                className="w-4 h-4 text-primary focus:ring-tertiary"
              />
              <span className="text-xs sm:text-sm text-on-surface font-medium">
                Persona Natural
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2 rounded-[5px] hover:bg-surface-container-low cursor-pointer transition-colors">
              <input
                type="radio"
                name="mock-actor"
                checked={actorType === "juridica"}
                onChange={() => onChangeActorType("juridica")}
                className="w-4 h-4 text-primary focus:ring-tertiary"
              />
              <span className="text-xs sm:text-sm text-on-surface font-medium">
                Persona Jurídica (NIT / CCB)
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2 rounded-[5px] hover:bg-surface-container-low cursor-pointer transition-colors">
              <input
                type="radio"
                name="mock-actor"
                checked={actorType === "apoderado"}
                onChange={() => onChangeActorType("apoderado")}
                className="w-4 h-4 text-primary focus:ring-tertiary"
              />
              <span className="text-xs sm:text-sm text-on-surface font-medium">
                Apoderado / Representante
              </span>
            </label>
          </div>
        </div>

        {/* Toggles Dinámicos */}
        <div className="flex flex-col gap-3 pt-2 border-t border-surface-container-highest/60">
          {/* Toggle 1: Prellenado SSO */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-on-surface">
                Prellenado SSO /
              </span>
              <span className="text-xs text-on-surface-variant">Keycloak + Registraduría</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isSSOAutofill}
              onClick={() => onToggleSSOAutofill(!isSSOAutofill)}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors focus:ring-2 focus:ring-tertiary focus:outline-none shrink-0 ${
                isSSOAutofill ? "bg-[#1B7A2E]" : "bg-surface-container-high"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full block shadow-xs transform transition-transform ${
                  isSSOAutofill ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Simular Error */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-on-surface">
                Simular Error Validación
              </span>
              <span className="text-xs text-on-surface-variant">Activa live region ARIA</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={simulateValidationError}
              onClick={() => onToggleValidationError(!simulateValidationError)}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors focus:ring-2 focus:ring-tertiary focus:outline-none shrink-0 ${
                simulateValidationError ? "bg-primary" : "bg-surface-container-high"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full block shadow-xs transform transition-transform ${
                  simulateValidationError ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Modo Solo Lectura / Once-Only */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-on-surface">
                Once-Only Bloqueado
              </span>
              <span className="text-xs text-on-surface-variant">Protege datos certificados</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isOnceOnlyLocked}
              onClick={() => onToggleOnceOnlyLocked(!isOnceOnlyLocked)}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors focus:ring-2 focus:ring-tertiary focus:outline-none shrink-0 ${
                isOnceOnlyLocked ? "bg-tertiary" : "bg-surface-container-high"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full block shadow-xs transform transition-transform ${
                  isOnceOnlyLocked ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Toggle 4: Autoguardado Kafka */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-on-surface">
                EventStore Kafka
              </span>
              <span className="text-xs text-on-surface-variant">Snapshot cada 15 seg</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isKafkaEnabled}
              onClick={() => onToggleKafka(!isKafkaEnabled)}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors focus:ring-2 focus:ring-tertiary focus:outline-none shrink-0 ${
                isKafkaEnabled ? "bg-[#1B7A2E]" : "bg-surface-container-high"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full block shadow-xs transform transition-transform ${
                  isKafkaEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Métricas de Accesibilidad Distrital */}
        <div className="mt-1 p-3.5 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-highest/60 text-xs">
          <span className="font-heading font-bold text-on-surface uppercase tracking-wider">
            Auditoría WCAG en Vivo
          </span>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Ratio Contraste:</span>
            <span className="font-mono font-bold text-[#1B7A2E]">7.4:1 (AAA)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Tab Order:</span>
            <span className="font-medium text-on-surface">100% Lógico</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">ARIA Live:</span>
            <span className="font-mono text-tertiary">aria-live=&quot;polite&quot;</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Touch Bounds:</span>
            <span className="font-medium text-on-surface">&ge; 44&times;44 px</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
