"use client";

import type React from "react";
import { useState } from "react";

const CODE_STRING = `// Registro de componente de Stepper Vertical según Guía 1.3
import { BogotaTransactionStepper } from '@sgab-bb/ui-stepper';
import { EventStorePublisher } from '@sgab-bb/interop';

const stepper = new BogotaTransactionStepper({
  tramiteId: 'BOG-TRA-2025-089',
  citizenId: '1020884219',
  onPausaProgramada: async (draftState) => {
    await EventStorePublisher.emit('TRAMITE_PAUSADO_USUARIO', draftState);
    showNotice('Borrador guardado. Te enviamos enlace de reanudación al correo.');
  }
});`;

export const SdkCodeSnippet: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE_STRING);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <section className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-sm border border-surface-container-highest/60 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="font-heading text-base font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">
            terminal
          </span>
          <span>SDK Bogotá Transaccional: Implementación de Stepper</span>
        </span>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="font-mono text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-[5px]">
            TypeScript / Lit v3
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`min-h-[36px] px-3 py-1 rounded-[5px] text-xs font-semibold flex items-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none ${
              copied
                ? "bg-[#1B7A2E]/15 text-[#1B7A2E] border border-[#1B7A2E]/30"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {copied ? "check" : "content_copy"}
            </span>
            <span>{copied ? "¡Copiado!" : "Copiar"}</span>
          </button>
        </div>
      </div>

      <pre className="bg-[#1E1E24] text-[#E4E2E1] p-4 sm:p-6 rounded-[10px] overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed shadow-inner border border-gray-800">
        <code>{CODE_STRING}</code>
      </pre>
    </section>
  );
};
