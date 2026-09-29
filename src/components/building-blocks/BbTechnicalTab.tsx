"use client";

import type React from "react";
import { useState } from "react";
import { BbDarkSandboxConsole } from "./BbDarkSandboxConsole";

export const BbTechnicalTab: React.FC = () => {
  const [copiedKafka, setCopiedKafka] = useState(false);

  const handleCopyKafkaTopic = () => {
    try {
      navigator.clipboard.writeText("distrital.pagos.transaccion-confirmada");
      setCopiedKafka(true);
      setTimeout(() => setCopiedKafka(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full"
      id="tab-tecnica"
      role="tabpanel"
      aria-labelledby="btn-tab-tecnica"
    >
      {/* LADO IZQUIERDO (6 Col / 50%): Markdown API Reference & Spec */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        {/* Security & Auth Protocol Callout */}
        <div className="rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col gap-3 p-6 border border-surface-container-high">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              verified_user
            </span>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
              Protocolo de Seguridad &amp; API Rest
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Toda comunicación hacia el Building Block de Pagos Distritales debe canalizarse mediante
            API Rest con cifrado mutuo mTLS y tokens Bearer emitidos por el Servidor Central de
            Autenticación de la Secretaría General.
          </p>
        </div>

        {/* RESTful Endpoints Documentation */}
        <div className="rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col gap-4 p-6 border border-surface-container-high">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface">
              Endpoints RESTful del Building Block
            </h3>
            <span className="px-2.5 py-0.5 rounded-[5px] bg-surface-container text-xs text-on-surface-variant font-semibold">
              API v2
            </span>
          </div>

          {/* Endpoint Item 1: POST initiate */}
          <div className="flex flex-col gap-2 p-4 rounded-[8px] bg-surface-container-low transition-colors hover:bg-surface-container border border-surface-container-high/60">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[5px] font-mono text-xs font-bold text-on-primary bg-primary">
                POST
              </span>
              <code className="font-mono text-xs sm:text-sm font-bold text-on-surface">
                /api/v2/payments/initiate
              </code>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Genera la intención de recaudo, bloquea temporalmente la liquidación y devuelve el URL
              de redirección segura hacia el gateway bancario institucional.
            </p>
          </div>

          {/* Endpoint Item 2: GET status */}
          <div className="flex flex-col gap-2 p-4 rounded-[8px] bg-surface-container-low transition-colors hover:bg-surface-container border border-surface-container-high/60">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[5px] font-mono text-xs font-bold text-on-tertiary bg-tertiary">
                GET
              </span>
              <code className="font-mono text-xs sm:text-sm font-bold text-on-surface">
                /api/v2/payments/&#123;payment_id&#125;/status
              </code>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Consulta el estado sincrónico de la transacción (PENDING, APPROVED, REJECTED, EXPIRED)
              para conciliación por polling o fallback.
            </p>
          </div>

          {/* Endpoint Item 3: POST refund */}
          <div className="flex flex-col gap-2 p-4 rounded-[8px] bg-surface-container-low transition-colors hover:bg-surface-container border border-surface-container-high/60">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[5px] font-mono text-xs font-bold text-on-primary bg-primary">
                POST
              </span>
              <code className="font-mono text-xs sm:text-sm font-bold text-on-surface">
                /api/v2/payments/refund
              </code>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Solicitud de reversión automática por fallas en el servicio prestado o anulación
              formal del acto administrativo.
            </p>
          </div>
        </div>

        {/* Códigos de Respuesta Distrital Table */}
        <div className="rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col gap-3 p-6 border border-surface-container-high">
          <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface">
            Códigos de Respuesta y Manejo de Errores
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant text-xs font-semibold">
                  <th scope="col" className="py-2.5 px-3 rounded-l-[5px]">
                    HTTP Status
                  </th>
                  <th scope="col" className="py-2.5 px-3">
                    Código Error
                  </th>
                  <th scope="col" className="py-2.5 px-3 rounded-r-[5px]">
                    Descripción Distrital
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/40">
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold" style={{ color: "#1B7A2E" }}>
                    200 / 201
                  </td>
                  <td className="py-2.5 px-3 font-mono text-on-surface font-semibold">
                    OK_CREATED
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">
                    Transacción iniciada con URL de checkout.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-primary">401 Unauthorized</td>
                  <td className="py-2.5 px-3 font-mono text-on-surface font-semibold">
                    INVALID_SECURITY_TOKEN
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">
                    Token mTLS caducado o entidad sin aval.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#B07300]">409 Conflict</td>
                  <td className="py-2.5 px-3 font-mono text-on-surface font-semibold">
                    DUPLICATE_IDEMPOTENCY_KEY
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">
                    Intento repetido de pago ya registrado.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold text-error">422 Unprocessable</td>
                  <td className="py-2.5 px-3 font-mono text-on-surface font-semibold">
                    INVALID_INVOICE_DATA
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">
                    Monto inconsistente con BOGDATA.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Webhooks Kafka Event Stream Info */}
        <div className="rounded-[15px] bg-surface-container-low flex flex-col gap-2 p-6 border border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary" aria-hidden="true">
              hub
            </span>
            <span className="font-heading text-sm sm:text-base font-bold text-on-surface">
              Notificaciones Asíncronas (Kafka Distrital)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Recomendamos consumir eventos del clúster Distrital Kafka en vez de polling constante.
          </p>
          <div className="mt-1 p-3 rounded-[8px] bg-surface-container-lowest font-mono text-xs text-primary flex items-center justify-between border border-surface-container-high/60">
            <span className="truncate">topic: distrital.pagos.transaccion-confirmada</span>
            <button
              type="button"
              onClick={handleCopyKafkaTopic}
              className="p-1 hover:text-primary-container text-on-surface-variant transition-colors ml-2 shrink-0 cursor-pointer"
              title="Copiar topic de Kafka"
              aria-label="Copiar topic de Kafka"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {copiedKafka ? "check" : "content_copy"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* LADO DERECHO (6 Col / 50%): Interactive Developer Dark Console */}
      <div className="lg:col-span-6 lg:sticky lg:top-36">
        <BbDarkSandboxConsole />
      </div>
    </div>
  );
};
