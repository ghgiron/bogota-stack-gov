"use client";

import type React from "react";
import { useId, useState } from "react";

export const DevSupportBanner: React.FC = () => {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [entity, setEntity] = useState("");
  const [systemName, setSystemName] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const modalTitleId = useId();

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketModalOpen(false);
      setEntity("");
      setSystemName("");
      setTicketDescription("");
    }, 2500);
  };

  return (
    <section className="w-full bg-surface-container py-8 border-t border-surface-container-highest/60 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-[10px] bg-primary flex items-center justify-center shrink-0 shadow-sm text-on-primary">
            <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
              support_agent
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-heading text-lg sm:text-xl text-on-surface font-bold">
              ¿Necesitas soporte para homologar tu micro-frontend o API distrital?
            </h4>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              La Oficina de Tecnologías de la Información y las Comunicaciones (OTIC) acompaña la
              integración arquitectural de entidades y contratistas.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 font-body">
          <a
            href="https://slack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-5 py-2.5 rounded-[5px] bg-surface-container-lowest text-on-surface hover:bg-surface-container-high text-xs sm:text-sm font-semibold transition-colors shadow-xs border border-surface-container-highest focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none flex items-center gap-2"
          >
            <span
              className="material-symbols-outlined text-[16px] text-tertiary"
              aria-hidden="true"
            >
              forum
            </span>
            <span>Unirse a Slack #dev-bogota</span>
          </a>

          <button
            type="button"
            onClick={() => setTicketModalOpen(true)}
            className="min-h-[44px] px-5 py-2.5 rounded-[5px] bg-primary text-on-primary hover:bg-primary-container text-xs sm:text-sm font-semibold transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              confirmation_number
            </span>
            <span>Abrir Ticket en OTIC DevDesk</span>
          </button>
        </div>
      </div>

      {/* Modal de Ticket DevDesk */}
      {ticketModalOpen && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-none m-0"
        >
          <div className="bg-surface rounded-[15px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between gap-4 border-b border-surface-container-highest pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[5px] bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </div>
                <div>
                  <h3 id={modalTitleId} className="font-heading text-lg font-bold text-on-surface">
                    Mesa Técnica OTIC DevDesk
                  </h3>
                  <span className="text-xs text-on-surface-variant font-body">
                    Acompañamiento a Desarrolladores y Contratistas
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTicketModalOpen(false)}
                aria-label="Cerrar formulario de ticket"
                className="w-9 h-9 flex items-center justify-center rounded-[5px] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {ticketSubmitted ? (
              <div className="p-6 rounded-[10px] bg-green-50 border border-green-200 text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-[#1B7A2E]">verified</span>
                <h4 className="font-heading font-bold text-base text-[#1B7A2E]">
                  ¡Ticket DevDesk Creado Exitosamente!
                </h4>
                <p className="text-xs text-green-900 font-body">
                  Tu solicitud ha sido asignada a la célula de arquitectura de interoperabilidad
                  OTIC. Número de seguimiento: #OTIC-DEV-8924.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="flex flex-col gap-3 font-body">
                <div>
                  <label
                    htmlFor="ticket-entity"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Entidad Distrital o Contratista *
                  </label>
                  <input
                    id="ticket-entity"
                    type="text"
                    required
                    value={entity}
                    onChange={(e) => setEntity(e.target.value)}
                    placeholder="Ej. Secretaría de Hacienda / Contratista Consorcio TIC"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest text-sm focus:ring-2 focus:ring-tertiary focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="ticket-system"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Nombre del Trámite o Micro-frontend *
                  </label>
                  <input
                    id="ticket-system"
                    type="text"
                    required
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    placeholder="Ej. Consulta ICA Distrital (Lit Component)"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest text-sm focus:ring-2 focus:ring-tertiary focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="ticket-desc"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Consulta Técnica o Bloqueo *
                  </label>
                  <textarea
                    id="ticket-desc"
                    required
                    rows={3}
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    placeholder="Describe el reto de homologación, interoperabilidad con  o tokens de diseño..."
                    className="w-full p-3 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest text-sm focus:ring-2 focus:ring-tertiary focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 border-t border-surface-container-highest flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setTicketModalOpen(false)}
                    className="min-h-[44px] px-4 py-2 rounded-[5px] text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 py-2.5 rounded-[5px] bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow-xs"
                  >
                    Radicar Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}
    </section>
  );
};
