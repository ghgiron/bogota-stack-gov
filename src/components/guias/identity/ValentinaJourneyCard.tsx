"use client";

import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  FileCheck2,
  Fingerprint,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";

interface JourneyStep {
  id: number;
  time: string;
  channel: string;
  title: string;
  description: string;
  technicalBehind: string;
  icon: React.ElementType;
  accentColor: string;
  accentBg: string;
}

const STEPS: JourneyStep[] = [
  {
    id: 1,
    time: "08:15 AM",
    channel: "Portal Transaccional de Bogotá",
    title: "Valida su identidad una sola vez",
    description:
      "Valentina ingresa desde su navegador, toma una fotografía de su documento y una selfie. El sistema valida su vigencia en la Registraduría (ANI) y emite su Credencial de Identidad Base.",
    technicalBehind:
      "bb-identity-access orquesta Azure Document Intelligence, Azure Face Liveness y ANI SOAP. Genera un IssuanceAuthorization con TTL efímero y entrega la credencial a BWallet vía OID4VCI.",
    icon: Fingerprint,
    accentColor: "text-[#CC0E35]",
    accentBg: "bg-[#CC0E35]/10",
  },
  {
    id: 2,
    time: "11:30 AM",
    channel: "SuperApp Bogotá",
    title: "Solicita un subsidio distrital sin papeles",
    description:
      "Valentina abre la app distrital para consultar subsidios de transporte. No anexa recibos ni fotocopias: la entidad consulta su caracterización Sisbén IV ya verificada.",
    technicalBehind:
      "Criterio Once-Only del Acuerdo 001 de 2026. La Secretaría de Planeación certifica su grupo Sisbén B2 mediante una credencial sectorial firmada con clave W3C, sin intermediación de bases de datos duplicadas.",
    icon: FileCheck2,
    accentColor: "text-[#0049AE]",
    accentBg: "bg-[#0049AE]/10",
  },
  {
    id: 3,
    time: "02:45 PM",
    channel: "Ventanilla Secretaría de Salud",
    title: "Realiza un trámite presencial con divulgación selectiva",
    description:
      "En el centro de atención le solicitan comprobar que es mayor de edad y reside en Bogotá. Valentina comparte solo esos dos atributos desde su BWallet escaneando un código QR, sin mostrar su dirección ni cédula completa.",
    technicalBehind:
      "Protocolo OID4VP con credenciales SD-JWT (Selective Disclosure). La ventanilla verifica la firma criptográfica del emisor distrital sin acceder a datos PII innecesarios.",
    icon: QrCode,
    accentColor: "text-[#1B7A2E]",
    accentBg: "bg-[#1B7A2E]/10",
  },
  {
    id: 4,
    time: "06:20 PM",
    channel: "Chatico (Canal WhatsApp)",
    title: "Consulta el estado de su trámite sin contraseñas",
    description:
      "Valentina chatea con Chatico para verificar una cita médica. El asistente le envía un enlace seguro que abre su BWallet y autoriza la sesión al instante con biometría del teléfono.",
    technicalBehind:
      "Autenticación descentralizada federada hacia Keycloak mediante vp-oidc-bridge. Cero contraseñas vulnerables a phishing; llaves custodiadas en el Secure Enclave (WSCD) del dispositivo.",
    icon: Bot,
    accentColor: "text-[#B37B00]",
    accentBg: "bg-[#FEF9E7]",
  },
];

export const ValentinaJourneyCard: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];
  const IconComponent = current.icon;

  return (
    <div className="rounded-[15px] p-6 sm:p-8 bg-gradient-to-br from-white via-surface-container-lowest to-[#EBF2FC]/30 border border-surface-container-high shadow-xs space-y-6">
      {/* Encabezado de la historia */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-[#CC0E35]/10 text-[#CC0E35] font-heading font-bold text-[11px] uppercase tracking-wider">
              Historia de Uso Distrital
            </span>
            <span className="text-xs text-text-muted">• Acuerdo 001 de 2026</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-text-main flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FAB62D]" />
            Un día de Valentina en una Bogotá que funciona
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white border border-gray-200 text-xs text-text-muted shadow-2xs shrink-0">
          <Smartphone className="w-4 h-4 text-[#0049AE]" />
          <span>Experiencia Ciudadana Omnicanal</span>
        </div>
      </div>

      {/* Cita de Gobernanza */}
      <div className="p-4 rounded-[10px] bg-white border-l-4 border-l-[#CC0E35] border border-gray-200 shadow-2xs">
        <p className="text-xs sm:text-sm text-text-main font-medium italic leading-relaxed">
          &ldquo;No hace falta una sola app para toda la ciudad. Hace falta un solo idioma técnico
          para que las personas no tengan que peregrinar de entidad en entidad acreditando quiénes
          son ni entregando fotocopias de lo que el Distrito ya sabe.&rdquo;
        </p>
        <span className="block mt-1 text-[11px] font-heading font-bold text-[#CC0E35]">
          — Principio Rector de Soberanía e Interoperabilidad, Acuerdo 001 de 2026
        </span>
      </div>

      {/* Barra de progreso de los 4 momentos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STEPS.map((step, idx) => {
          const isSelected = idx === activeStep;
          const StepIcon = step.icon;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-[10px] text-left transition-all border flex flex-col gap-1.5 ${
                isSelected
                  ? "bg-white border-[#CC0E35] shadow-xs ring-1 ring-[#CC0E35]"
                  : "bg-surface-container-low/60 border-transparent hover:bg-white hover:border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                    isSelected ? "bg-[#CC0E35] text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.id}
                </span>
                <span className="text-[10px] font-mono text-text-muted">{step.time}</span>
              </div>
              <span className="font-heading font-bold text-xs text-text-main line-clamp-1">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detalle del Momento Seleccionado */}
      <div className="p-5 sm:p-6 rounded-[12px] bg-white border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-[10px] ${current.accentBg} ${current.accentColor} flex items-center justify-center shrink-0 shadow-2xs`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 font-mono">
                Paso {current.id} de 4 • {current.time}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">
                Canal: {current.channel}
              </span>
            </div>
            <h4 className="font-heading font-extrabold text-base sm:text-lg text-text-main">
              {current.title}
            </h4>
            <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
              {current.description}
            </p>
          </div>
        </div>

        {/* Ficha técnica detrás de escena */}
        <div className="p-3.5 rounded-[8px] bg-surface-container-low border border-gray-200 text-xs">
          <div className="flex items-center gap-1.5 font-heading font-bold text-text-main mb-1">
            <ShieldCheck className="w-4 h-4 text-[#0049AE]" />
            <span>Arquitectura GovStack detrás de escena:</span>
          </div>
          <p className="font-mono text-[11px] text-gray-700 leading-relaxed">
            {current.technicalBehind}
          </p>
        </div>
      </div>

      {/* Roles Institucionales del Distrito */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-[10px] bg-white border border-gray-200 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[6px] bg-[#CC0E35]/10 text-[#CC0E35] flex items-center justify-center font-bold">
              1
            </div>
            <h5 className="font-heading font-bold text-sm text-text-main">
              Subsecretaría de Servicio a la Ciudadanía
            </h5>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            <strong className="text-text-main font-semibold">
              &ldquo;La puerta de confianza&rdquo;:
            </strong>{" "}
            Valida la identidad de la ciudadanía contra la Registraduría (RNEC/ANI) y emite la{" "}
            <strong>Credencial de Identidad Base</strong> en nombre de la Alcaldía Mayor de Bogotá.
          </p>
        </div>

        <div className="p-4 rounded-[10px] bg-white border border-gray-200 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[6px] bg-[#0049AE]/10 text-[#0049AE] flex items-center justify-center font-bold">
              2
            </div>
            <h5 className="font-heading font-bold text-sm text-text-main">
              Consejería TIC y Entidades Sectoriales
            </h5>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            <strong className="text-text-main font-semibold">
              &ldquo;La llegada a los beneficios&rdquo;:
            </strong>{" "}
            Conectan sus trámites y emiten/verifican credenciales sectoriales (ej. Planeación con
            Sisbén IV, Salud, Educación) bajo un catálogo común de emisores y el estándar W3C.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValentinaJourneyCard;
