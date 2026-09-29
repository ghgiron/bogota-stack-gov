"use client";

import type React from "react";
import { useState } from "react";

export const OnboardingRoadmapAndCode: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const curlCode = `curl -X POST https://api.govllm.bogota.gov.co/v1/query \\
  -H "Authorization: Bearer sec_distrito_98a72b..." \\
  -H "X-Entity-ID: SDM-SECRETARIA-MOVILIDAD" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channel": "whatsapp_official",
    "citizen_query": "¿Cómo impugno un comparendo de tránsito?",
    "scrub_pii": true,
    "strict_rag": true,
    "confidence_threshold": 0.985
  }'`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(curlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-surface py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-surface-container text-on-surface-variant text-xs font-semibold mb-2 border border-outline-variant/30">
            <span
              className="material-symbols-outlined text-[16px] text-tertiary"
              aria-hidden="true"
            >
              alt_route
            </span>
            <span>Despliegue Institucional Ágil</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight mb-3 font-bold">
            De la Solicitud a Producción en 4 Pasos
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Un proceso estandarizado diseñado junto a la Secretaría General para que tu equipo de
            tecnología comience a operar en menos de 96 horas.
          </p>
        </div>

        {/* Roadmap 4 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 sm:mb-12">
          {/* Step 1 */}
          <div className="rounded-[15px] bg-surface-container-low p-6 flex flex-col justify-between border border-outline-variant/20 hover:border-primary/40 transition-colors">
            <div>
              <span className="font-heading text-4xl sm:text-5xl text-primary font-bold opacity-30 leading-none block">
                01
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mt-3 mb-1.5">
                Solicitud Formal
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Radicación de la entidad vía Bogotá Stack con asignación inmediata de mesa técnica y
                asesor de integración OTIC.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant">
              Duración: 24 horas
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-[15px] bg-surface-container-low p-6 flex flex-col justify-between border border-outline-variant/20 hover:border-tertiary/40 transition-colors">
            <div>
              <span className="font-heading text-4xl sm:text-5xl text-tertiary font-bold opacity-30 leading-none block">
                02
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mt-3 mb-1.5">
                API Key Institucional
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Emisión de credenciales seguras mTLS y parametrización del corpus normativo
                particular de tu secretaría.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant">
              Duración: 24 horas
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-[15px] bg-surface-container-low p-6 flex flex-col justify-between border border-outline-variant/20 hover:border-secondary/40 transition-colors">
            <div>
              <span className="font-heading text-4xl sm:text-5xl text-secondary font-bold opacity-30 leading-none block">
                03
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mt-3 mb-1.5">
                Integración Multicanal
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Conexión ágil mediante SDK distrital o webhook seguro hacia tus servidores, canales
                WhatsApp o portales web.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant">
              Duración: 48 horas
            </div>
          </div>

          {/* Step 4 */}
          <div className="rounded-[15px] bg-surface-container-low p-6 flex flex-col justify-between border border-outline-variant/20 hover:border-primary/40 transition-colors">
            <div>
              <span className="font-heading text-4xl sm:text-5xl text-primary font-bold opacity-30 leading-none block">
                04
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mt-3 mb-1.5">
                Paso a Producción
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Acompañamiento en vivo, pruebas de carga con casos reales y monitoreo de
                satisfacción ciudadana en tiempo real.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant">
              Acompañamiento continuo
            </div>
          </div>
        </div>

        {/* Panel Técnico Oscuro de Inspección REST API */}
        <div className="rounded-[15px] bg-[#181825] text-white p-5 sm:p-6 shadow-xl overflow-hidden border border-white/10">
          {/* Barra superior estilo macOS */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
              </div>
              <span className="text-xs text-white/80 font-mono font-medium">
                REST API Endpoint · Consulta Distrital Autenticada
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold">
                POST /v1/citizen-service/query
              </span>
              <span className="px-2 py-0.5 rounded bg-primary/40 text-white font-semibold">
                TLS 1.3 Strict
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-2 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs transition-colors flex items-center gap-1"
                title="Copiar comando cURL"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {copied ? "done" : "content_copy"}
                </span>
                <span>{copied ? "Copiado" : "Copiar cURL"}</span>
              </button>
            </div>
          </div>

          {/* Grid de Petición cURL y Respuesta JSON */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 font-mono text-xs overflow-x-auto">
            {/* Request Payload */}
            <div className="bg-black/40 p-4 rounded-lg border border-white/5">
              <div className="text-white/50 mb-2 uppercase text-[11px] font-sans font-semibold">
                {"// Petición desde la Entidad (Canal WhatsApp / Web)"}
              </div>
              <pre className="text-[#FAB62D] leading-relaxed whitespace-pre-wrap">
                <code>{curlCode}</code>
              </pre>
            </div>

            {/* Response Payload with Citations */}
            <div className="bg-black/40 p-4 rounded-lg border border-white/5">
              <div className="text-white/50 mb-2 uppercase text-[11px] font-sans font-semibold">
                {"// Respuesta Estructurada con Trazabilidad Jurídica"}
              </div>
              <pre className="text-[#B1C5FF] leading-relaxed whitespace-pre-wrap">
                <code>{`{
  "status": "success",
  "confidence_score": 0.994,
  "normative_citations": [
    { "type": "Ley", "id": "Ley 769 de 2002", "art": "136" },
    { "type": "Decreto Distrital", "id": "Decreto 019 de 2022" }
  ],
  "clear_language_text": "Para impugnar un comparendo en Bogotá, cuentas con 11 días hábiles para agendar audiencia virtual gratuita...",
  "actionable_url": "https://movilidadbogota.gov.co/audiencias",
  "pii_redacted": true,
  "routed_to_human": false
}`}</code>
              </pre>
            </div>
          </div>

          {/* Footer de la Consola Técnica */}
          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[16px] text-secondary-container"
                aria-hidden="true"
              >
                code
              </span>
              <span>
                SDKs oficiales disponibles en: Python, Node.js, PHP y Java para GovStack Bogotá.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[16px] text-tertiary-fixed"
                aria-hidden="true"
              >
                lock_clock
              </span>
              <span>Firmado criptográficamente por la Alcaldía Mayor de Bogotá D.C.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
