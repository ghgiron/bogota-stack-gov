"use client";

import type React from "react";
import { useId, useState } from "react";

export interface OnceOnlyPlaygroundProps {
  actorType: "natural" | "juridica" | "apoderado";
  isSSOAutofill: boolean;
  simulateValidationError: boolean;
  isOnceOnlyLocked: boolean;
  isKafkaEnabled: boolean;
}

export const OnceOnlyPlayground: React.FC<OnceOnlyPlaygroundProps> = ({
  actorType,
  isSSOAutofill,
  simulateValidationError,
  isOnceOnlyLocked,
  isKafkaEnabled,
}) => {
  const [email, setEmail] = useState("sofia.restrepo@gobiernobogota.gov.co");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const errorBannerId = useId();
  const emailHintId = useId();
  const modalTitleId = useId();

  // Datos reactivos según el rol del actor
  const actorData = {
    natural: {
      docType: "Cédula Ciudadanía",
      docNumber: "1.020.884.219",
      name: "Sofía María Restrepo Gómez",
      chip: "AAA0123BDCF",
      property: "Cl. 26 # 57-41 Edificio Distrito",
      folio: "50C-1299834",
    },
    juridica: {
      docType: "NIT Empresa",
      docNumber: "900.823.141-5",
      name: "Consorcio Bogotá Inteligente S.A.S.",
      chip: "AAA0992KLMN",
      property: "Cra. 7 # 71-21 Torre Distrital",
      folio: "50C-9876543",
    },
    apoderado: {
      docType: "Cédula Apoderado",
      docNumber: "79.482.910",
      name: "Dr. Carlos Eduardo Mendoza Ramos (T.P. 182.990 CSJ)",
      chip: "AAA0123BDCF",
      property: "Cl. 26 # 57-41 Edificio Distrito",
      folio: "50C-1299834",
    },
  }[actorType];

  const handleSaveDraft = () => {
    setToastMessage(
      "Borrador guardado en Kafka EventStore. Enlace de reanudación enviado por SMS.",
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessModalOpen(true);
  };

  return (
    <section className="lg:col-span-6 flex flex-col gap-4">
      {/* Header del Sandbox */}
      <div className="bg-surface-container-lowest p-6 rounded-[15px] shadow-sm border border-surface-container-highest/60 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 font-body text-xs">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-[#1B7A2E]/10 text-[#1B7A2E] font-semibold">
              WCAG 2.2 Nivel AA
            </span>
            <span className="px-2.5 py-0.5 rounded-[5px] bg-tertiary/10 text-tertiary font-semibold">
              Conectado
            </span>
            <span className="px-2.5 py-0.5 rounded-[5px] bg-secondary-fixed/40 text-on-secondary-fixed font-semibold">
              Cero Papel / No Fotocopia
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant font-body">
            <span
              className="material-symbols-outlined text-[16px] text-tertiary"
              aria-hidden="true"
            >
              devices
            </span>
            <span>Modo Canvas Live</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-xl sm:text-2xl text-on-surface font-bold">
            Componente Transaccional: Formulario Once-Only
          </h2>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Previene la duplicidad de captura autocompletando información ya validada por la
            Registraduría Nacional y Catastro Distrital.
          </p>
        </div>
      </div>

      {/* CANVAS DE PREVISUALIZACIÓN INTERACTIVA (Simulación de trámite) */}
      <div className="bg-surface-container-lowest rounded-[15px] p-6 shadow-sm border border-surface-container-highest/60 flex flex-col gap-6">
        {/* Banner de Estado Once-Only en Formulario */}
        <div className="p-4 rounded-[10px] bg-tertiary/5 border border-tertiary/20 flex items-start gap-3">
          <span
            className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5"
            aria-hidden="true"
          >
            verified_user
          </span>
          <div className="flex flex-col gap-0.5 font-body">
            <h3 className="font-heading text-sm font-bold text-tertiary">
              Principio Once-Only Activo
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              La identidad del solicitante y la referencia del inmueble han sido sincronizadas
              automáticamente con la base de datos distrital. No requieres adjuntar fotocopia de
              cédula ni certificado catastral.
            </p>
          </div>
        </div>

        {/* Mensaje de Error Accesible (Condicional visual interactivo simulado) */}
        {simulateValidationError && (
          <div
            id={errorBannerId}
            role="alert"
            aria-live="assertive"
            className="p-3.5 rounded-[10px] bg-red-50 text-red-900 border border-red-200 flex items-center gap-2.5 animate-in fade-in duration-200"
          >
            <span
              className="material-symbols-outlined text-[#BA1A1A] text-[20px] shrink-0"
              aria-hidden="true"
            >
              error
            </span>
            <p className="font-body text-xs sm:text-sm">
              <strong className="font-semibold">Error de Validación (ARIA live):</strong> El formato
              del correo electrónico institucional no pertenece al dominio permitido
              (@bogota.gov.co).
            </p>
          </div>
        )}

        {/* Formulario Simulado */}
        <form onSubmit={handleContinue} className="flex flex-col gap-4 font-body">
          {/* Campo 1: Identificación Bloqueada con Certificación */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="input-doc"
                className="text-xs font-semibold text-on-surface flex items-center gap-1.5 uppercase"
              >
                <span>Documento de Identidad</span>
                <span
                  className="material-symbols-outlined text-[16px] text-on-surface-variant"
                  title={
                    isOnceOnlyLocked ? "Dato inmutable bloqueado" : "Campo editable para pruebas"
                  }
                  aria-hidden="true"
                >
                  {isOnceOnlyLocked ? "lock" : "lock_open"}
                </span>
              </label>
              <span className="inline-flex items-center gap-1 text-xs text-[#1B7A2E] bg-[#1B7A2E]/10 px-2 py-0.5 rounded-[5px] font-semibold">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  check_circle
                </span>
                <span>Validado Registraduría</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="h-11 px-3.5 rounded-[5px] bg-surface-container text-on-surface-variant text-sm font-medium flex items-center border border-surface-container-highest">
                {isSSOAutofill ? actorData.docType : "Seleccionar..."}
              </div>
              <div className="sm:col-span-2 h-11 px-3.5 rounded-[5px] bg-surface-container text-on-surface font-mono font-medium flex items-center justify-between border border-surface-container-highest">
                <span>{isSSOAutofill ? actorData.docNumber : "---"}</span>
                <span
                  className="material-symbols-outlined text-[18px] text-tertiary"
                  title="Biometría RNEC verificada"
                  aria-hidden="true"
                >
                  fingerprint
                </span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant">
              Dato inmutable certificado mediante cédula digital y .
            </p>
          </div>

          {/* Campo 2: Nombre Completo con Chip Oficial */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="input-name"
                className="text-xs font-semibold text-on-surface uppercase"
              >
                Nombre Completo del Ciudadano / Razón Social
              </label>
              <span className="inline-flex items-center gap-1 text-xs text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-[5px] font-semibold">
                Dato Oficial Distrital
              </span>
            </div>
            <div className="relative">
              <input
                id="input-name"
                type="text"
                readOnly={isOnceOnlyLocked}
                value={isSSOAutofill ? actorData.name : ""}
                placeholder="Nombre oficial..."
                className={`w-full h-11 px-3.5 pr-10 rounded-[5px] font-body text-sm text-on-surface border border-surface-container-highest focus:outline-none ${
                  isOnceOnlyLocked
                    ? "bg-surface-container cursor-not-allowed select-all"
                    : "bg-surface-container-lowest focus:ring-2 focus:ring-tertiary"
                }`}
              />
              <span
                className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-tertiary text-[20px] pointer-events-none"
                aria-hidden="true"
              >
                badge
              </span>
            </div>
          </div>

          {/* Campo 3: Correo Electrónico (Editable en tiempo real) */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="input-email"
              className="text-xs font-semibold text-on-surface uppercase"
            >
              Correo Electrónico de Contacto Institucional
            </label>
            <div className="relative">
              <input
                id="input-email"
                type="email"
                required
                aria-describedby={emailHintId}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sofia.restrepo@gobiernobogota.gov.co"
                className="w-full h-11 px-3.5 pr-10 rounded-[5px] bg-surface-container-lowest font-body text-sm text-on-surface border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-tertiary"
              />
              <span
                className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none"
                aria-hidden="true"
              >
                mail
              </span>
            </div>
            <p id={emailHintId} className="text-xs text-on-surface-variant">
              Se enviará una confirmación transaccional con hash de trazabilidad.
            </p>
          </div>

          {/* Campo 4: Código Catastral / CHIP Predial Sincronizado */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="input-chip"
                className="text-xs font-semibold text-on-surface uppercase"
              >
                CHIP Predial Asociado al Trámite
              </label>
              <span className="inline-flex items-center gap-1 text-xs text-[#1B7A2E] bg-[#1B7A2E]/10 px-2 py-0.5 rounded-[5px] font-semibold">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  domain
                </span>
                <span>Catastro Sincronizado</span>
              </span>
            </div>
            <div className="relative">
              <input
                id="input-chip"
                type="text"
                readOnly={isOnceOnlyLocked}
                value={isSSOAutofill ? actorData.chip : ""}
                placeholder="CHIP catastral..."
                className={`w-full h-11 px-3.5 pr-10 rounded-[5px] font-mono text-sm text-on-surface border border-surface-container-highest focus:outline-none ${
                  isOnceOnlyLocked
                    ? "bg-surface-container cursor-not-allowed select-all"
                    : "bg-surface-container-lowest focus:ring-2 focus:ring-tertiary"
                }`}
              />
              <span
                className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none"
                aria-hidden="true"
              >
                location_city
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-0.5">
              <span>Predio: {actorData.property}</span>
              <span className="text-tertiary font-medium">Folio: {actorData.folio}</span>
            </div>
          </div>

          {/* Autoguardado Kafka Notice */}
          {isKafkaEnabled && (
            <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-[5px] border border-surface-container text-xs text-on-surface">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-[#1B7A2E] animate-pulse"
                  aria-hidden="true"
                />
                <span>
                  Sincronización en caliente activa: <strong>Kafka EventStore</strong>
                </span>
              </div>
              <span className="text-on-surface-variant">Snapshot cada 15 seg.</span>
            </div>
          )}

          {/* Botones de Acción del Formulario */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-[5px] bg-surface-container text-on-surface hover:bg-surface-container-high font-heading text-xs sm:text-sm font-semibold transition-colors border border-surface-container-highest focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
            >
              Guardar Borrador (Pausa Programada)
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-[5px] bg-primary text-on-primary hover:bg-primary-container font-heading text-xs sm:text-sm font-semibold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
            >
              Continuar Trámite Seguro
            </button>
          </div>
        </form>
      </div>

      {/* Toast de Guardado de Borrador */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-[10px] bg-on-surface text-on-primary shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[#1B7A2E] text-[22px]">check_circle</span>
          <span className="text-xs sm:text-sm font-medium font-body">{toastMessage}</span>
        </div>
      )}

      {/* Modal de Simulación Exitosa */}
      {successModalOpen && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-none m-0"
        >
          <div className="bg-surface rounded-[15px] max-w-md w-full p-6 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between gap-4 border-b border-surface-container-highest pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[5px] bg-[#1B7A2E]/10 text-[#1B7A2E] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <h3 id={modalTitleId} className="font-heading text-lg font-bold text-on-surface">
                    Simulación Exitosa
                  </h3>
                  <span className="text-xs text-on-surface-variant font-body">
                    Trámite Verificado Once-Only
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSuccessModalOpen(false)}
                aria-label="Cerrar modal de simulación"
                className="w-9 h-9 flex items-center justify-center rounded-[5px] text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant font-body leading-relaxed">
              El formulario Once-Only validó las credenciales contra la base de datos maestra y
              emitió el evento a{" "}
              <code className="bg-surface-container px-1 py-0.5 rounded text-primary font-mono font-bold">
                EventStore Kafka
              </code>
              .
            </p>

            <div className="p-3 bg-surface-container-low rounded-[8px] text-xs font-mono space-y-1">
              <p className="text-on-surface font-semibold">Trazabilidad Distrital:</p>
              <p className="text-on-surface-variant">Hash: 8f94e2...a90b1</p>
              <p className="text-on-surface-variant">Titular: {actorData.name}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSuccessModalOpen(false)}
                className="min-h-[44px] px-5 py-2 rounded-[5px] bg-primary text-on-primary text-xs font-semibold"
              >
                Aceptar y Continuar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};
