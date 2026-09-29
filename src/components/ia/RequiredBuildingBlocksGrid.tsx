"use client";

import type { BuildingBlockItem } from "@/lib/services/aiPredictorService";
import type React from "react";
import { useState } from "react";

interface RequiredBuildingBlocksGridProps {
  buildingBlocks: BuildingBlockItem[];
}

export const RequiredBuildingBlocksGrid: React.FC<RequiredBuildingBlocksGridProps> = ({
  buildingBlocks,
}) => {
  const [selectedSpec, setSelectedSpec] = useState<BuildingBlockItem | null>(null);

  return (
    <article
      aria-labelledby="building-blocks-title"
      className="bg-surface-container-lowest rounded-[15px] p-4 sm:p-6 shadow-sm flex flex-col gap-4"
    >
      {/* Encabezado con Icono y Badge de Bloques Homologados */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[5px] bg-secondary-container/20 text-[#7E5700] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              widgets
            </span>
          </div>
          <h3
            className="font-heading text-lg sm:text-xl text-on-surface font-bold"
            id="building-blocks-title"
          >
            2. Building Blocks Requeridos (GovStack)
          </h3>
        </div>
        <span className="text-xs font-medium text-[#7E5700] bg-[#FFF8EA] px-2.5 py-0.5 rounded-[5px] border border-[#FAB62D]/30 self-start sm:self-auto">
          {buildingBlocks.length} Bloques Reutilizables Homologados
        </span>
      </div>

      {/* Grid de 4 Bloques con Estética Amarilla Distrital */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buildingBlocks.map((bb) => (
          <div
            key={bb.id}
            className="bg-[#FFF8EA] border border-[#FAB62D]/40 rounded-[15px] p-4 flex flex-col justify-between gap-3 shadow-xs transition-transform hover:-translate-y-0.5"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#7E5700] text-[22px]"
                    aria-hidden="true"
                  >
                    {bb.icon}
                  </span>
                  <h4 className="font-heading text-base font-bold text-on-surface leading-snug">
                    {bb.title}
                  </h4>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-[5px] bg-[#FAB62D] text-[#271900] shrink-0 font-mono">
                  {bb.code}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{bb.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-[#FAB62D]/30">
              <span className="text-[11px] font-semibold text-[#1B7A2E] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  trending_down
                </span>
                Ahorro estimado: {bb.savings}
              </span>
              <button
                type="button"
                onClick={() => setSelectedSpec(bb)}
                className="text-xs font-semibold text-[#7E5700] hover:underline flex items-center gap-0.5 min-h-[36px] px-1 focus:outline-none focus:ring-2 focus:ring-tertiary rounded-[5px]"
                aria-label={`Ver especificación técnica de ${bb.title}`}
              >
                Ver Especificación BB
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Especificación Técnica del Building Block */}
      {selectedSpec && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-0 m-0"
          aria-labelledby="spec-modal-title"
        >
          <div className="bg-surface-container-lowest rounded-[15px] p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-[5px] bg-[#FAB62D]/20 text-[#7E5700] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    {selectedSpec.icon}
                  </span>
                </span>
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAB62D] text-[#271900] font-bold">
                    {selectedSpec.code}
                  </span>
                  <h3
                    id="spec-modal-title"
                    className="font-heading text-lg font-bold text-on-surface mt-1"
                  >
                    {selectedSpec.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSpec(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
                aria-label="Cerrar modal de especificación"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              {selectedSpec.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs bg-surface-container-low p-3.5 rounded-[10px]">
              <div>
                <span className="text-[11px] text-on-surface-variant block font-medium">
                  Protocolo:
                </span>
                <span className="font-mono text-on-surface font-semibold">
                  {selectedSpec.specDetails.protocol}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant block font-medium">
                  Seguridad / Auth:
                </span>
                <span className="font-mono text-on-surface font-semibold">
                  {selectedSpec.specDetails.auth}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-on-surface-variant block font-medium">
                  Versión SDK:
                </span>
                <span className="font-mono text-[#1B7A2E] font-bold">
                  {selectedSpec.specDetails.version}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-on-surface-variant block font-medium">
                  SLA Garantizado:
                </span>
                <span className="font-mono text-primary font-bold">
                  {selectedSpec.specDetails.sla}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedSpec(null)}
                className="px-4 py-2 rounded-[5px] bg-primary text-on-primary font-semibold text-xs hover:bg-primary-hover transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
};
