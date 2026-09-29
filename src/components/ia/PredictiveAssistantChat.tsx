"use client";

import type React from "react";
import { useState } from "react";

interface PredictiveAssistantChatProps {
  entity: string;
  onEntityChange: (entity: string) => void;
  promptText: string;
  onPromptTextChange: (text: string) => void;
  onGeneratePlan: (customPrompt?: string) => Promise<void>;
  isGenerating: boolean;
  onResetConversation: () => void;
  chatHistory: Array<{
    role: "assistant" | "user";
    sender: string;
    time: string;
    text: string;
  }>;
}

const QUICK_PROMPTS = [
  {
    label: "Certificado Catastral",
    entity: "Catastro Distrital (UAECD)",
    prompt:
      "Emisión y certificación catastral de predios en Bogotá con firma electrónica y consulta de linderos jurídicos sin fotocopias.",
  },
  {
    label: "Permiso Espacio Público",
    entity: "Secretaría Distrital de Movilidad (SDM)",
    prompt:
      "Solicitud de Planes de Manejo de Tránsito (PMT) y uso temporal de espacio público para obras civiles con inspección georreferenciada.",
  },
  {
    label: "Inscripción RIT",
    entity: "Secretaría Distrital de Hacienda (SHD)",
    prompt:
      "Inscripción y actualización en el Registro de Información Tributaria (RIT) para personas naturales y jurídicas con validación de actividad económica CIIU.",
  },
  {
    label: "Subsidio de Vivienda",
    entity: "Secretaría Distrital de Planeación (SDP)",
    prompt:
      "Postulación de hogares vulnerables con cruce automático con Sisbén IV, DNP, Registro Social de Hogares y B-Pay para dispersión de subsidios.",
  },
];

export const PredictiveAssistantChat: React.FC<PredictiveAssistantChatProps> = ({
  entity,
  onEntityChange,
  promptText,
  onPromptTextChange,
  onGeneratePlan,
  isGenerating,
  onResetConversation,
  chatHistory,
}) => {
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const handleSelectQuickPrompt = (item: (typeof QUICK_PROMPTS)[0]) => {
    onEntityChange(item.entity);
    onPromptTextChange(item.prompt);
    onGeneratePlan(item.prompt);
  };

  const handleAttachMock = (fileName: string) => {
    setAttachedFile(fileName);
    setShowAttachModal(false);
  };

  return (
    <div className="bg-surface-container-lowest rounded-[15px] p-4 sm:p-6 shadow-sm flex flex-col gap-4 sticky top-28 border border-outline-variant/20">
      {/* Assistant Header */}
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full bg-surface-container flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-primary-container text-[26px]"
              aria-hidden="true"
            >
              neurology
            </span>
            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#1B7A2E] rounded-full ring-2 ring-white"
              title="En línea"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h2 className="font-heading text-base font-bold text-on-surface" id="assistant-title">
                Asistente Predictivo IA
              </h2>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono font-semibold">
                v2.4
              </span>
            </div>
            <span className="text-xs text-[#1B7A2E] flex items-center gap-1 font-medium">
              <span className="inline-block w-1.5 h-1.5 bg-[#1B7A2E] rounded-full animate-pulse" />
              En línea • GovStack Agent
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onResetConversation}
          className="w-9 h-9 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary"
          title="Reiniciar conversación y parámetros"
          aria-label="Reiniciar conversación"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
        </button>
      </div>

      {/* Historial de Mensajes */}
      <div
        className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1 text-xs sm:text-sm scroll-smooth"
        role="log"
        aria-live="polite"
      >
        {chatHistory.map((msg, idx) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: mensaje conversacional secuencial en mock
            key={idx}
            className={`flex gap-2.5 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                msg.role === "assistant"
                  ? "bg-primary-container text-on-primary"
                  : "bg-tertiary text-on-tertiary"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                {msg.role === "assistant" ? "smart_toy" : "account_balance"}
              </span>
            </div>
            <div
              className={`flex flex-col gap-1 p-3.5 rounded-2xl text-on-surface max-w-[90%] leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-surface-container-low rounded-tl-sm"
                  : "bg-surface-container-high rounded-tr-sm"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-0.5">
                <span
                  className={`font-bold ${msg.role === "assistant" ? "text-primary-container" : ""}`}
                >
                  {msg.sender}
                </span>
                <span>{msg.time}</span>
              </div>
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Pill de estado de análisis activo */}
        <div className="p-2.5 bg-[#FFF8EA] rounded-[5px] border border-[#FAB62D]/30 flex items-center gap-2 text-xs text-[#7E5700]">
          <span
            className={`material-symbols-outlined text-[18px] text-[#FAB62D] ${
              isGenerating ? "animate-spin" : ""
            }`}
            aria-hidden="true"
          >
            sync
          </span>
          <span className="font-semibold text-[11px] sm:text-xs">
            {isGenerating
              ? "Calculando ponderaciones IAI,  endpoints y Building Blocks..."
              : "Analizando 14 APIs distritales, matriz de madurez BID y 6 Building Blocks..."}
          </span>
        </div>
      </div>

      {/* Prompts Rápidos Frecuentes */}
      <div className="flex flex-col gap-1.5 pt-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Prompts rápidos frecuentes:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSelectQuickPrompt(item)}
              className="text-xs px-2.5 py-1 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Formulario de Entrada */}
      <form
        className="flex flex-col gap-2.5 pt-1"
        onSubmit={(e) => {
          e.preventDefault();
          onGeneratePlan();
        }}
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-on-surface-variant" htmlFor="entity-select">
            Entidad Solicitante
          </label>
          <select
            id="entity-select"
            value={entity}
            onChange={(e) => onEntityChange(e.target.value)}
            className="h-11 px-3 rounded-[5px] bg-surface-container-low text-on-surface text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-tertiary border border-outline-variant/30"
          >
            <option>Secretaría Distrital de Hacienda (SHD)</option>
            <option>Secretaría Distrital de Movilidad (SDM)</option>
            <option>Secretaría Distrital de Planeación (SDP)</option>
            <option>Catastro Distrital (UAECD)</option>
            <option>Secretaría de Salud (SDS)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-on-surface-variant" htmlFor="prompt-input">
            Descripción del Trámite en Lenguaje Natural
          </label>
          <textarea
            id="prompt-input"
            rows={3}
            value={promptText}
            onChange={(e) => onPromptTextChange(e.target.value)}
            placeholder="Describe en lenguaje natural el trámite que deseas digitalizar..."
            className="w-full p-3 rounded-[5px] bg-surface-container-low text-on-surface text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-tertiary resize-none border border-outline-variant/30"
          />
        </div>

        {attachedFile && (
          <div className="flex items-center justify-between px-2.5 py-1 bg-surface-container rounded-[5px] text-xs text-on-surface">
            <span className="flex items-center gap-1 text-[11px] truncate">
              <span className="material-symbols-outlined text-[15px] text-tertiary">
                description
              </span>
              {attachedFile}
            </span>
            <button
              type="button"
              onClick={() => setAttachedFile(null)}
              className="text-on-surface-variant hover:text-primary text-[11px] ml-2"
            >
              Quitar
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => setShowAttachModal(true)}
            className="h-11 px-3 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-medium flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary min-h-[44px]"
            title="Adjuntar documento de requisitos o diagrama BPMN"
          >
            <span className="material-symbols-outlined text-[18px]">attachment</span>
            <span className="hidden sm:inline">Adjuntar Normativa / BPMN</span>
          </button>

          <button
            type="submit"
            disabled={isGenerating || !promptText.trim()}
            className="h-11 px-4 rounded-[5px] bg-primary-container hover:bg-primary text-on-primary font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-tertiary shrink-0 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generando...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>Generar Plan</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer de Telemetría */}
      <div className="flex items-center justify-between text-[11px] text-on-surface-variant px-1 pt-2 border-t border-outline-variant/20 opacity-85">
        <span>
          Latencia: <strong>240ms</strong>
        </span>
        <span>
          Seguridad: <strong>Nivel 4 GovStack</strong>
        </span>
        <span>
          Algoritmo: <strong>IAI v3-Distrital</strong>
        </span>
      </div>

      {/* Modal Accesible de Adjuntar Normativa / BPMN */}
      {showAttachModal && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-0 m-0"
          aria-labelledby="attach-modal-title"
        >
          <div className="bg-surface-container-lowest rounded-[15px] p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[22px]">
                  attachment
                </span>
                <h3
                  id="attach-modal-title"
                  className="font-heading text-base font-bold text-on-surface"
                >
                  Adjuntar Normativa o Diagrama BPMN
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAttachModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
                aria-label="Cerrar modal"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Sube la resolución de creación del trámite (PDF) o el modelo de proceso en formato
              BPMN / XML para que el agente extraiga las reglas de negocio y dependencias
              automáticamente.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleAttachMock("Resolucion_575_2023_Predial.pdf")}
                className="p-3 rounded-[5px] bg-surface-container-low hover:bg-surface-container text-left flex items-center justify-between text-xs transition-colors border border-outline-variant/20"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    picture_as_pdf
                  </span>
                  <span>Resolucion_575_2023_Predial.pdf (2.4 MB)</span>
                </div>
                <span className="text-[11px] text-tertiary font-semibold">Seleccionar</span>
              </button>

              <button
                type="button"
                onClick={() => handleAttachMock("Diagrama_BPMN_Paz_Salvo_v2.bpmn")}
                className="p-3 rounded-[5px] bg-surface-container-low hover:bg-surface-container text-left flex items-center justify-between text-xs transition-colors border border-outline-variant/20"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1B7A2E] text-[18px]">
                    account_tree
                  </span>
                  <span>Diagrama_BPMN_Paz_Salvo_v2.bpmn (410 KB)</span>
                </div>
                <span className="text-[11px] text-tertiary font-semibold">Seleccionar</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowAttachModal(false)}
                className="px-4 py-2 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface"
              >
                Cancelar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
