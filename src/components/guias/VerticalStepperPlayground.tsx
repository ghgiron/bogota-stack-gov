"use client";

import type React from "react";
import { useEffect, useId, useState } from "react";

export const VerticalStepperPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"stepper" | "decision">("stepper");
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [chipCode, setChipCode] = useState<string>("AAA0123BDCF");
  const [useType, setUseType] = useState<string>("hab");
  const [syncSeconds, setSyncSeconds] = useState<number>(12);
  const [draftToast, setDraftToast] = useState<string | null>(null);

  const draftModalId = useId();

  // Timer reactivo para simular sincronización en EventStore Kafka
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncSeconds((prev) => (prev >= 30 ? 2 : prev + 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveDraft = () => {
    setDraftToast(
      "Borrador guardado en EventStore Kafka. Enlace de reanudación enviado por SMS/Email.",
    );
    setTimeout(() => {
      setDraftToast(null);
    }, 4000);
  };

  return (
    <section className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-sm flex flex-col gap-6 border border-surface-container-highest/60">
      {/* Header y Selector de Pestañas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>

          <h3 className="font-heading text-xl sm:text-2xl text-on-surface font-bold mt-1">
            2. Patrón de "pasos del trámite" (eje vertical)
          </h3>
        </div>

        {/* Interactive View Tabs */}
        <div
          className="flex items-center bg-surface-container-low p-1 rounded-[5px] self-start"
          role="tablist"
          aria-label="Vistas del patrón transaccional"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "stepper"}
            onClick={() => setActiveTab("stepper")}
            className={`px-3.5 py-1.5 rounded-[5px] text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none min-h-[36px] ${activeTab === "stepper"
              ? "bg-surface-container-lowest text-on-surface shadow-xs"
              : "text-on-surface-variant hover:text-on-surface"
              }`}
          >
            Stepper
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "decision"}
            onClick={() => setActiveTab("decision")}
            className={`px-3.5 py-1.5 rounded-[5px] text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none min-h-[36px] ${activeTab === "decision"
              ? "bg-surface-container-lowest text-on-surface shadow-xs"
              : "text-on-surface-variant hover:text-on-surface"
              }`}
          >
            Criterios
          </button>
        </div>
      </div>

      {/* Interactive Stepper Simulation Box */}
      <div className="bg-surface-container-low rounded-[15px] p-4 sm:p-6 shadow-xs border border-surface-container-highest/60">
        <div className="flex flex-col gap-6">
          {/* STEP 1: IDENTIFICACIÓN CIUDADANA */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xs font-heading ${currentStep > 1
                  ? "bg-[#1B7A2E] text-on-primary"
                  : "bg-tertiary text-on-primary ring-4 ring-tertiary/20"
                  }`}
              >
                {currentStep > 1 ? (
                  <span className="material-symbols-outlined text-[20px]">check</span>
                ) : (
                  "1"
                )}
              </div>
              <div
                className={`w-0.5 h-14 my-1 transition-colors ${currentStep > 1 ? "bg-[#1B7A2E]/50" : "bg-surface-container-highest"
                  }`}
              />
            </div>

            <div className="flex-1 bg-surface-container-lowest rounded-[10px] p-4 shadow-xs border border-surface-container-highest/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-heading text-base font-bold text-on-surface">
                    Paso 1: Identificación Ciudadana
                  </span>
                  <span className="font-body text-xs bg-[#1B7A2E]/10 text-[#1B7A2E] px-2 py-0.5 rounded-[5px] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">done_all</span>
                    <span>Verificado Registraduría</span>
                  </span>
                </div>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
                  C.C. 1.020.884.219 • Sofía María Restrepo Gómez • Correo autenticado
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-tertiary hover:text-tertiary-container font-body text-xs sm:text-sm font-semibold px-2 py-1 self-start sm:self-center hover:underline focus-visible:ring-1 focus-visible:ring-tertiary rounded"
              >
                {currentStep === 1 ? "Editando" : "Modificar"}
              </button>
            </div>
          </div>

          {/* STEP 2: DATOS DEL TRÁMITE / PREDIAL (ACTIVO POR DEFECTO) */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-md font-heading ${currentStep === 2
                  ? "bg-tertiary text-on-primary ring-4 ring-tertiary/20"
                  : currentStep > 2
                    ? "bg-[#1B7A2E] text-on-primary"
                    : "bg-surface-container-highest text-on-surface-variant"
                  }`}
              >
                {currentStep > 2 ? (
                  <span className="material-symbols-outlined text-[20px]">check</span>
                ) : (
                  "2"
                )}
              </div>
              <div
                className={`w-0.5 my-1 transition-all ${currentStep === 2 ? "h-64" : "h-12"
                  } ${currentStep > 2 ? "bg-[#1B7A2E]/50" : "bg-surface-container-highest"}`}
              />
            </div>

            {/* Active Form Container */}
            <div className="flex-1 bg-surface-container-lowest rounded-[10px] p-4 sm:p-6 shadow-sm border border-surface-container-highest/80">
              {currentStep === 2 ? (
                <>
                  {/* Once-Only Notice Banner */}
                  <div className="bg-secondary-fixed/30 rounded-[5px] p-3.5 mb-4 flex items-start gap-3 border border-secondary/20">
                    <span
                      className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      verified_user
                    </span>
                    <div>
                      <h4 className="font-heading text-xs sm:text-sm font-bold text-on-surface">
                        Principio &ldquo;Una Sola Vez&rdquo;
                      </h4>
                      <p className="font-body text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        El Distrito ya cuenta con tu información básica y predial vinculada a tu
                        Cédula. Los datos no son editables.
                      </p>
                    </div>
                  </div>

                  {/* Form Fields with Autocomplete & Readonly Security */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body">
                    <div>
                      <label
                        htmlFor="f-cedula"
                        className="block text-xs font-semibold text-on-surface uppercase mb-1"
                      >
                        Número de Cédula de Ciudadanía
                      </label>
                      <div className="relative">
                        <input
                          id="f-cedula"
                          type="text"
                          readOnly
                          value="1.020.884.219"
                          className="w-full min-h-[44px] px-3.5 bg-surface-container text-on-surface-variant font-body text-sm rounded-[5px] cursor-not-allowed border border-surface-container-highest"
                        />
                        <span
                          className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]"
                          title="Dato protegido y validado por RNEC"
                          aria-hidden="true"
                        >
                          lock
                        </span>
                      </div>
                      <span className="text-[11px] text-tertiary mt-1 block font-medium">
                        Validado vía interoperabilidad
                      </span>
                    </div>

                    <div>
                      <label
                        htmlFor="f-catastro"
                        className="block text-xs font-semibold text-on-surface uppercase mb-1"
                      >
                        Código CHIP o Cédula Catastral
                      </label>
                      <input
                        id="f-catastro"
                        type="text"
                        value={chipCode}
                        onChange={(e) => setChipCode(e.target.value)}
                        placeholder="Ej. AAA0192XXXX"
                        className="w-full min-h-[44px] px-3.5 bg-surface-container-lowest text-on-surface font-body text-sm rounded-[5px] border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none"
                      />
                      <span className="text-[11px] text-on-surface-variant mt-1 block">
                        Consulta automatizada con Catastro Bogotá
                      </span>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="f-tipo-uso"
                        className="block text-xs font-semibold text-on-surface uppercase mb-1"
                      >
                        Uso del Inmueble para Solicitud de Certificación
                      </label>
                      <select
                        id="f-tipo-uso"
                        value={useType}
                        onChange={(e) => setUseType(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 bg-surface-container-lowest text-on-surface font-body text-sm rounded-[5px] border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none"
                      >
                        <option value="hab">Habitacional / Residencial Unifamiliar</option>
                        <option value="com">Comercial de Bajo Impacto</option>
                        <option value="dot">Dotacional o Institucional</option>
                      </select>
                    </div>
                  </div>



                  {/* Stepper Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">


                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="min-h-[44px] px-4 py-2 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-on-surface font-heading text-xs sm:text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="min-h-[44px] px-5 py-2 rounded-[5px] bg-primary-container hover:bg-primary text-on-primary font-heading text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
                      >
                        <span>Continuar al Paso 3</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-base font-bold text-on-surface">
                      Paso 2: Información Predial y Uso de Suelo
                    </h4>
                    <p className="font-body text-xs text-on-surface-variant mt-0.5">
                      CHIP: {chipCode} • Uso: {useType === "hab" ? "Habitacional" : "Comercial"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-tertiary hover:underline text-xs sm:text-sm font-semibold"
                  >
                    Volver al Paso 2
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: LIQUIDACIÓN Y PAGO DISTRITAL */}
          <div className={`flex items-start gap-4 ${currentStep < 3 ? "opacity-75" : ""}`}>
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xs font-heading ${currentStep === 3
                  ? "bg-tertiary text-on-primary ring-4 ring-tertiary/20"
                  : currentStep > 3
                    ? "bg-[#1B7A2E] text-on-primary"
                    : "bg-surface-container-highest text-on-surface-variant"
                  }`}
              >
                {currentStep > 3 ? (
                  <span className="material-symbols-outlined text-[20px]">check</span>
                ) : (
                  "3"
                )}
              </div>
              <div className="w-0.5 h-12 bg-surface-container-highest my-1" />
            </div>

            <div className="flex-1 bg-surface-container-lowest rounded-[10px] p-4 shadow-xs border border-surface-container-highest/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-heading text-sm sm:text-base font-semibold text-on-surface">
                  Paso 3: Liquidación y Pago
                </h4>
                <p className="font-body text-xs text-on-surface-variant mt-0.5">
                  Integración con BB - Pagos
                </p>
              </div>
              {currentStep === 3 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="min-h-[44px] px-4 py-2 rounded-[5px] bg-primary text-on-primary text-xs font-semibold shadow-xs"
                  >
                    Iniciar pago $38.500 COP
                  </button>
                </div>
              ) : (
                <span className="font-body text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-[5px]">
                  {currentStep > 3 ? "Completado" : "Pendiente"}
                </span>
              )}
            </div>
          </div>

          {/* STEP 4: CONFIRMACIÓN Y ENTREGA */}
          <div className={`flex items-start gap-4 ${currentStep < 4 ? "opacity-75" : ""}`}>
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xs font-heading ${currentStep === 4
                  ? "bg-[#1B7A2E] text-on-primary ring-4 ring-green-200"
                  : "bg-surface-container-highest text-on-surface-variant"
                  }`}
              >
                {currentStep === 4 ? (
                  <span className="material-symbols-outlined text-[20px]">done_all</span>
                ) : (
                  "4"
                )}
              </div>
            </div>

            <div className="flex-1 bg-surface-container-lowest rounded-[10px] p-4 shadow-xs border border-surface-container-highest/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-heading text-sm sm:text-base font-semibold text-on-surface">
                  Paso 4: Confirmación, Radicación y Entrega
                </h4>
                <p className="font-body text-xs text-on-surface-variant mt-0.5">
                  Generación de radicado único y disponibilidad en Carpeta Ciudadana
                </p>
              </div>
              <span className="font-body text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-[5px]">
                {currentStep === 4 ? "Radicado BOG-2026-948" : "Pendiente"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Decision Rules Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="bg-surface-container-low rounded-[10px] p-5 border border-surface-container-highest/60">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="material-symbols-outlined text-primary-container text-[22px]"
              aria-hidden="true"
            >
              view_timeline
            </span>
            <h4 className="font-heading text-base font-bold text-on-surface">
              ¿Cuándo implementar Stepper Vertical?
            </h4>
          </div>
          <ul className="font-body text-xs sm:text-sm text-on-surface-variant space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5">
                check_circle
              </span>
              <span>
                <strong className="text-on-surface">Más de 3 secciones lógicas:</strong> Trámites
                que requieren recolección por fases o validaciones de terceros.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5">
                check_circle
              </span>
              <span>
                <strong className="text-on-surface">Dependencias intermedias:</strong> Cuando el
                paso siguiente requiere una respuesta síncrona o pago.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5">
                check_circle
              </span>
              <span>
                <strong className="text-on-surface">Sesión asíncrona:</strong> El ciudadano puede
                abandonar el trámite y continuarlo días después sin perder progreso.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-surface-container-low rounded-[10px] p-5 border border-surface-container-highest/60">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="material-symbols-outlined text-tertiary text-[22px]"
              aria-hidden="true"
            >
              feed
            </span>
            <h4 className="font-heading text-base font-bold text-on-surface">
              ¿Cuándo usar Formulario Simple?
            </h4>
          </div>
          <ul className="font-body text-xs sm:text-sm text-on-surface-variant space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
                check_circle
              </span>
              <span>
                <strong className="text-on-surface">Menos de 5 campos directos:</strong> Consultas
                de estado, peticiones ciudadanas puntuales o agendamiento simple.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
                check_circle
              </span>
              <span>
                <strong className="text-on-surface">Resolución en una sola pantalla:</strong> Cero
                paginaciones innecesarias que incrementen la tasa de rebote.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
                check_circle
              </span>
              <span>
                <strong className="text-on-surface">Sin pasarela de pago obligatoria</strong> previa
                a la radicación del servicio.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Toast Feedback */}
      {draftToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-[10px] bg-on-surface text-on-primary shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[#1B7A2E] text-[22px]">check_circle</span>
          <span className="text-xs sm:text-sm font-medium font-body">{draftToast}</span>
        </div>
      )}
    </section>
  );
};
