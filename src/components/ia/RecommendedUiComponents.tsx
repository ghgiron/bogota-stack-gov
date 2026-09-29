"use client";

import type { UiComponentItem } from "@/lib/services/aiPredictorService";
import type React from "react";
import { useState } from "react";

interface RecommendedUiComponentsProps {
  uiComponents: UiComponentItem[];
}

export const RecommendedUiComponents: React.FC<RecommendedUiComponentsProps> = ({
  uiComponents,
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopySnippet = (item: UiComponentItem) => {
    navigator.clipboard?.writeText(item.codeSnippet);
    setCopiedCodeId(item.id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  return (
    <article
      aria-labelledby="ui-components-title"
      className="bg-surface-container-lowest rounded-[15px] p-4 sm:p-6 shadow-sm flex flex-col gap-4"
    >
      {/* Encabezado con Icono y Badge de WCAG 2.2 AA Nativo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[5px] bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              grid_view
            </span>
          </div>
          <h3
            className="font-heading text-lg sm:text-xl text-on-surface font-bold"
            id="ui-components-title"
          >
            4. Componentes UI Recomendados (Kit UI Bogotá)
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#1B7A2E] bg-[#EAF5EC] px-2.5 py-0.5 rounded-[5px] self-start sm:self-auto flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
            accessibility_new
          </span>
          WCAG 2.2 AA Nativo
        </span>
      </div>

      {/* Grid de 4 Componentes con Mini-Mockups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {uiComponents.map((item) => (
          <div
            key={item.id}
            className="bg-surface-container-low rounded-[15px] p-4 flex flex-col justify-between gap-3.5 hover:shadow-sm transition-shadow border border-outline-variant/20"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary-container font-semibold">
                  {item.code}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium">
                  {item.badge}
                </span>
              </div>
              <h4 className="font-heading text-base font-bold text-on-surface">{item.title}</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">{item.description}</p>
            </div>

            {/* Miniatura visual interactiva del componente */}
            <div className="pt-1">
              {item.type === "stepper" && (
                <div className="bg-surface-container p-2.5 rounded-[5px] flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span className="flex items-center gap-1 font-bold text-primary-container">
                    <span className="w-4 h-4 rounded-full bg-primary-container text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    ID
                  </span>
                  <span className="h-0.5 w-3 sm:w-4 bg-primary-container" />
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px]">
                      2
                    </span>
                    CHIP
                  </span>
                  <span className="h-0.5 w-3 sm:w-4 bg-surface-container-highest" />
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px]">
                      3
                    </span>
                    Pago
                  </span>
                  <span className="h-0.5 w-3 sm:w-4 bg-surface-container-highest" />
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px]">
                      4
                    </span>
                    Fin
                  </span>
                </div>
              )}

              {item.type === "onceonly" && (
                <div className="bg-surface-container p-2.5 rounded-[5px] flex items-center justify-between text-xs text-on-surface">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[16px] text-tertiary"
                      aria-hidden="true"
                    >
                      lock
                    </span>
                    <span className="font-mono text-[11px] font-semibold">CHIP: AAA0123ABCD</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#EAF5EC] text-[#1B7A2E] rounded font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                    Catastro OK
                  </span>
                </div>
              )}

              {item.type === "bpay" && (
                <div className="h-9 rounded-[5px] bg-[#FAB62D] text-[#271900] flex items-center justify-center gap-2 text-xs font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    payments
                  </span>
                  <span>Pagar con B-Pay / PSE ($245.000)</span>
                </div>
              )}

              {item.type === "pause" && (
                <div className="bg-surface-container p-2 rounded-[5px] flex items-center justify-between text-xs text-on-surface">
                  <span className="flex items-center gap-1 text-on-surface-variant text-[11px]">
                    <span
                      className="material-symbols-outlined text-[15px] text-[#FAB62D]"
                      aria-hidden="true"
                    >
                      pause_circle
                    </span>
                    Token de 48 hrs enviado al 315***89
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-surface-container-highest rounded font-mono font-bold">
                    OTP: 894-12
                  </span>
                </div>
              )}
            </div>

            {/* Botón Copiar Web Component */}
            <button
              type="button"
              onClick={() => handleCopySnippet(item)}
              className="h-10 w-full rounded-[5px] bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary border border-outline-variant/30 min-h-[40px]"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {copiedCodeId === item.id ? "done" : "code"}
              </span>
              <span>
                {copiedCodeId === item.id ? "¡Componente Copiado!" : "Copiar Web Component"}
              </span>
            </button>
          </div>
        ))}
      </div>
    </article>
  );
};
