"use client";

import type React from "react";
import { useState } from "react";

export const OnboardingRoadmapAndCode: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const curlCode = `curl -X POST https://ia.alcaldiabogota.gov/v1/consulta \\
  -H "Authorization: Bearer sec_distrital_98a72b..." \\
  -H "X-Entity-ID: SECRETARIA-DISTRITAL-MOVILIDAD" \\
  -H "Content-Type: application/json" \\
  -d '{
    "canal": "atencion_ciudadania",
    "consulta_ciudadana": "¿Cómo impugno un comparendo de tránsito en Bogotá?",
    "anonimizar_datos": true,
    "fuentes_estrictas": true,
    "umbral_consistencia": 0.985
  }'`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(curlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-surface py-12 sm:py-16" id="ruta-adopcion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-surface-container text-on-surface-variant text-xs font-semibold mb-2 border border-outline-variant/30">
            <span
              className="material-symbols-outlined text-[16px] text-tertiary"
              aria-hidden="true"
            >
              alt_route
            </span>
            <span>Ruta Institucional</span>
          </div>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1E1E] tracking-tight mb-3">
            Ruta de Adopción: De la Solicitud a Producción en 4 Pasos
          </h2>

          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Procedimiento estructurado y coordinado por la Secretaría General de la Alcaldía Mayor de
            Bogotá D.C. para acompañar a las entidades en la integración segura del modelo.
          </p>
        </div>

        {/* Ruta de 4 Pasos Requeridos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 sm:mb-12">
          {/* Paso 1 */}
          <div className="rounded-[15px] bg-surface-container-low p-6 flex flex-col justify-between border border-outline-variant/20 hover:border-primary/40 transition-colors">
            <div>
              <span className="font-heading text-4xl sm:text-5xl text-primary font-bold opacity-30 leading-none block">
                01
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#1E1E1E] mt-3 mb-1.5">
                Solicitud formal y diagnóstico de viabilidad técnica de la entidad
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Radicación de la solicitud institucional y evaluación conjunta de la arquitectura y
                necesidades de atención con el equipo técnico de la Secretaría General.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant font-sans">
              Fase 1: Diagnóstico inicial
            </div>
          </div>

          {/* Paso 2 */}
          <div className="rounded-[15px] bg-surface-container-low p-6 flex flex-col justify-between border border-outline-variant/20 hover:border-tertiary/40 transition-colors">
            <div>
              <span className="font-heading text-4xl sm:text-5xl text-tertiary font-bold opacity-30 leading-none block">
                02
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#1E1E1E] mt-3 mb-1.5">
                Parametrización y conexión de fuentes oficiales documentales
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Indexación rigurosa del repositorio normativo específico de la entidad, trámites oficiales
                validados y datos maestros correspondientes.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant font-sans">
              Fase 2: Conexión documental
            </div>
          </div>

          {/* Paso 3 */}
          <div className="rounded-[15px] bg-surface-container-low p-6 flex flex-col justify-between border border-outline-variant/20 hover:border-secondary/40 transition-colors">
            <div>
              <span className="font-heading text-4xl sm:text-5xl text-secondary font-bold opacity-30 leading-none block">
                03
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#1E1E1E] mt-3 mb-1.5">
                Validación de tono, precisión normativa y pruebas de lenguaje claro
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Pruebas de precisión jurídica con casos reales, asegurando que las respuestas sigan las pautas
                de lenguaje claro, empatía y accesibilidad para la ciudadanía.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant font-sans">
              Fase 3: Calibración y pruebas
            </div>
          </div>

          {/* Paso 4 */}
          <div className="rounded-[15px] bg-surface-container-low p-6 flex flex-col justify-between border border-outline-variant/20 hover:border-primary/40 transition-colors">
            <div>
              <span className="font-heading text-4xl sm:text-5xl text-primary font-bold opacity-30 leading-none block">
                04
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#1E1E1E] mt-3 mb-1.5">
                Habilitación en canales distritales y seguimiento operativo
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Despliegue controlado en las plataformas de atención de la entidad, con monitoreo técnico y
                acompañamiento operativo continuo.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant font-sans">
              Fase 4: Producción y monitoreo
            </div>
          </div>
        </div>

        {/* Panel Técnico Oscuro de Inspección REST API */}
        <div className="rounded-[15px] bg-[#181825] text-white p-5 sm:p-6 shadow-xl overflow-hidden border border-white/10">
          {/* Barra superior estilo ventana */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
              </div>
              <span className="text-xs text-white/80 font-mono font-medium">
                Punto de Conexión REST API · Consulta Distrital Autenticada
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold">
                POST /v1/consulta
              </span>
              <span className="px-2 py-0.5 rounded bg-primary/40 text-white font-semibold">
                TLS 1.3
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-2 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs transition-colors flex items-center gap-1 cursor-pointer"
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
                {"// Petición desde la Entidad Distrital"}
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
  "estado": "exitoso",
  "puntuacion_confianza": 0.994,
  "citas_normativas": [
    { "tipo": "Ley", "id": "Ley 769 de 2002", "articulo": "136" },
    { "tipo": "Decreto Distrital", "id": "Decreto Distrital 019 de 2022" }
  ],
  "texto_lenguaje_claro": "Para impugnar un comparendo en Bogotá, cuentas con 11 días hábiles para agendar audiencia virtual gratuita...",
  "enlace_oficial": "https://movilidadbogota.gov/audiencias",
  "datos_anonimizados": true,
  "escalado_humano": false
}`}</code>
              </pre>
            </div>
          </div>

          {/* Footer de la Consola Técnica */}
          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70 border-t border-white/10 font-sans">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[16px] text-secondary-container"
                aria-hidden="true"
              >
                code
              </span>
              <span>
                Conectores oficiales disponibles para las entidades de la Alcaldía Mayor de Bogotá D.C.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[16px] text-tertiary-fixed"
                aria-hidden="true"
              >
                shield
              </span>
              <span>Supervisado por la Secretaría General · Alcaldía Mayor de Bogotá D.C.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
