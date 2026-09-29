"use client";

import type React from "react";
import { useId, useState } from "react";

export const LegalConsultationBanner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [entity, setEntity] = useState("");
  const [requester, setRequester] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");

  const modalTitleId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setEntity("");
      setRequester("");
      setEmail("");
      setInquiry("");
    }, 2500);
  };

  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[15px] bg-surface-container p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-surface-container-highest/80">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-12 h-12 rounded-[5px] bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
                balance
              </span>
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface leading-snug">
                ¿Tu entidad necesita validar una innovación o sustentar la legalidad de un trámite?
              </h3>
              <p className="font-body text-sm sm:text-base text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
                La Secretaría Jurídica Distrital y el equipo OTIC proporcionan concepto previo
                vinculante para modificaciones normativas y digitalizaciones de alto impacto.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="min-h-[44px] px-6 py-2.5 rounded-[5px] bg-primary hover:bg-[#A80B2B] text-on-primary font-heading text-sm font-semibold flex items-center gap-2 whitespace-nowrap shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none shrink-0 active:scale-[0.99]"
          >
            <span>Consultar con Secretaría Jurídica y OTIC</span>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              open_in_new
            </span>
          </button>
        </div>
      </div>

      {/* Modal de Solicitud de Concepto Jurídico / Técnico */}
      {modalOpen && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-none m-0"
        >
          <div className="bg-surface rounded-[15px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-surface-container-highest pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[5px] bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">gavel</span>
                </div>
                <div>
                  <h3
                    id={modalTitleId}
                    className="font-heading text-lg sm:text-xl font-bold text-on-surface"
                  >
                    Solicitud de Concepto Previo
                  </h3>
                  <span className="text-xs text-on-surface-variant font-body">
                    Secretaría Jurídica Distrital &amp; Oficina OTIC
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Cerrar modal de consulta jurídica"
                className="w-9 h-9 flex items-center justify-center rounded-[5px] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {submitted ? (
              <div className="p-6 rounded-[10px] bg-green-50 border border-green-200 text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-[#1B7A2E]">
                  check_circle
                </span>
                <h4 className="font-heading font-bold text-lg text-[#1B7A2E]">
                  ¡Solicitud Enviada Exitosamente!
                </h4>
                <p className="text-sm text-green-900 font-body">
                  Se ha generado el radicado provisional. El equipo de enlace jurídico se comunicará
                  al correo proporcionado en un plazo de 3 días hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 font-body">
                <div>
                  <label
                    htmlFor="juridica-entity"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Entidad Distrital Solicitante *
                  </label>
                  <input
                    id="juridica-entity"
                    type="text"
                    required
                    value={entity}
                    onChange={(e) => setEntity(e.target.value)}
                    placeholder="Ej. Instituto Distrital de Recreación y Deporte"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="juridica-name"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Servidor o Funcionario Solicitante *
                  </label>
                  <input
                    id="juridica-name"
                    type="text"
                    required
                    value={requester}
                    onChange={(e) => setRequester(e.target.value)}
                    placeholder="Nombre y cargo del responsable"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="juridica-email"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Correo Institucional *
                  </label>
                  <input
                    id="juridica-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@entidad.gov.co"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="juridica-inquiry"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Descripción del Trámite o Modificación Normativa *
                  </label>
                  <textarea
                    id="juridica-inquiry"
                    required
                    rows={3}
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    placeholder="Describe brevemente el alcance del cambio normativo, eliminación de requisitos o interoperabilidad requerida..."
                    className="w-full p-3 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none text-sm resize-none"
                  />
                </div>

                <div className="pt-3 border-t border-surface-container-highest flex items-center justify-between gap-3">
                  <a
                    href="mailto:juridica@alcaldiabogota.gov.co?subject=Consulta%20Bogot%C3%A1%20Stack"
                    className="text-xs text-tertiary hover:underline flex items-center gap-1"
                  >
                    <span>Enviar correo directo</span>
                    <span className="material-symbols-outlined text-[14px]">email</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="min-h-[44px] px-4 py-2 rounded-[5px] text-sm font-semibold text-on-surface-variant hover:bg-surface-container"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="min-h-[44px] px-5 py-2.5 rounded-[5px] bg-primary hover:bg-[#A80B2B] text-on-primary text-sm font-semibold flex items-center gap-2 shadow-sm transition-all focus:ring-2 focus:ring-tertiary"
                    >
                      <span>Radicar Consulta</span>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}
    </section>
  );
};
