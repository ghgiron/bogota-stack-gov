"use client";

import type React from "react";
import { useState } from "react";

export const AdoptionCtaBanner: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  const handleSubmitSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);
    setTimeout(() => {
      setScheduled(false);
      setShowModal(false);
    }, 2500);
  };

  return (
    <section className="w-full bg-surface-container-low py-12 sm:py-16" id="solicitud-integracion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[15px] bg-surface-container-lowest p-6 sm:p-10 shadow-md border border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col items-start">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1E1E] tracking-tight mb-3">
                ¿Deseas implementar el modelo oficial de IA en tu entidad?
              </h2>

              <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-2xl mb-6 leading-relaxed">
                Coordina una sesión de trabajo técnico con la Secretaría General de la Alcaldía Mayor de
                Bogotá D.C. para evaluar el diagnóstico de viabilidad y estructurar la hoja de ruta de vinculación
                de tus fuentes oficiales.
              </p>

              {/* Botonera de Acción */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-container hover:bg-primary text-on-primary font-heading font-bold text-sm sm:text-base rounded-[5px] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 min-h-[44px] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    calendar_today
                  </span>
                  Agendar Demostración
                </button>

                <a
                  href="#ruta-adopcion"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-heading font-semibold text-sm sm:text-base rounded-[5px] transition-all focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 border border-outline-variant/20 min-h-[44px]"
                >
                  <span
                    className="material-symbols-outlined text-[20px] text-tertiary"
                    aria-hidden="true"
                  >
                    alt_route
                  </span>
                  Ver Ruta de 4 Pasos
                </a>
              </div>

              {/* Datos de Contacto Directo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4 border-t border-outline-variant/20 text-on-surface-variant text-xs sm:text-sm font-sans">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary text-[18px]"
                    aria-hidden="true"
                  >
                    location_on
                  </span>
                  <span>Carrera 8 No. 10 - 65, Bogotá D.C.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-tertiary text-[18px]"
                    aria-hidden="true"
                  >
                    call
                  </span>
                  <span>Línea 195 · Alcaldía Mayor de Bogotá D.C.</span>
                </div>
              </div>
            </div>

            {/* Sello institucional decorativo */}
            <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center text-center p-6 bg-surface-container-low rounded-[15px] border border-outline-variant/20">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-[36px]" aria-hidden="true">
                  verified
                </span>
              </div>
              <span className="font-heading text-base font-bold text-[#1E1E1E] mb-1">
                Acompañamiento Distrital
              </span>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Coordinación técnica y metodológica con la Secretaría General de la Alcaldía Mayor de Bogotá D.C.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Accesible de Agendamiento Directivo */}
      {showModal && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-0 m-0"
          aria-labelledby="schedule-modal-title"
        >
          <div className="bg-surface-container-lowest rounded-[15px] p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  calendar_today
                </span>
                <h3
                  id="schedule-modal-title"
                  className="font-heading text-lg font-bold text-[#1E1E1E]"
                >
                  Agendar Demostración Institucional
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
                aria-label="Cerrar modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {scheduled ? (
              <div className="p-6 bg-[#EAF5EC] rounded-[10px] text-center flex flex-col items-center gap-2 text-[#1B7A2E]">
                <span className="material-symbols-outlined text-[40px]">check_circle</span>
                <span className="font-heading font-bold text-base">¡Solicitud Radicada con Éxito!</span>
                <p className="font-sans text-xs text-on-surface-variant">
                  El equipo técnico de la Secretaría General se comunicará con el enlace designado para
                  coordinar la sesión de trabajo.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmitSchedule}
                className="flex flex-col gap-3 text-xs sm:text-sm font-sans"
              >
                <div>
                  <label
                    htmlFor="entidad-input"
                    className="font-semibold text-on-surface block mb-1"
                  >
                    Entidad u Organismo Distrital:
                  </label>
                  <input
                    id="entidad-input"
                    required
                    type="text"
                    placeholder="Ej. Secretaría Distrital de Movilidad"
                    className="w-full h-11 px-3 rounded-[5px] bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-tertiary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="responsable-input"
                      className="font-semibold text-on-surface block mb-1"
                    >
                      Nombre del Servidor Responsable:
                    </label>
                    <input
                      id="responsable-input"
                      required
                      type="text"
                      placeholder="Nombre y Apellidos"
                      className="w-full h-11 px-3 rounded-[5px] bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-tertiary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email-input"
                      className="font-semibold text-on-surface block mb-1"
                    >
                      Correo Institucional:
                    </label>
                    <input
                      id="email-input"
                      required
                      type="email"
                      placeholder="responsable@entidad.distrital"
                      className="w-full h-11 px-3 rounded-[5px] bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-tertiary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="caso-select" className="font-semibold text-on-surface block mb-1">
                    Caso de Uso de Interés Primario:
                  </label>
                  <select
                    id="caso-select"
                    className="w-full h-11 px-3 rounded-[5px] bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-tertiary"
                  >
                    <option>Canal Oficial de Mensajería</option>
                    <option>Asistente Web en Sedes Electrónicas Distritales</option>
                    <option>Asistencia a Servidores en Gestión de PQRS</option>
                    <option>Integración Personalizada por API REST</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-[5px] bg-primary-container hover:bg-primary text-on-primary font-heading font-bold text-xs cursor-pointer"
                  >
                    Confirmar Solicitud
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
