"use client";

import type React from "react";
import { useState } from "react";

type Environment = "sandbox" | "production";
type ClientLanguage = "curl" | "ts" | "python" | "java";

const INITIAL_JSON = `{
  "entidad_codigo": "BOG-SDH-001",
  "tramite_id": "PREDIAL-2025-X89",
  "contribuyente": {
    "tipo_documento": "CC",
    "numero_documento": "1020884219",
    "nombre": "Sofia María Restrepo",
    "correo": "sofia.restrepo@correo.gov.co"
  },
  "monto_total": 450000.00,
  "concepto": "Impuesto Predial Unificado Vigencia 2025",
  "url_retorno": "https://haciendabogota.gov.co/tramites/resultado",
  "medio_pago_preferido": "PSE"
}`;

export const BbDarkSandboxConsole: React.FC = () => {
  const [environment, setEnvironment] = useState<Environment>("sandbox");
  const [language, setLanguage] = useState<ClientLanguage>("curl");
  const [payload, setPayload] = useState<string>(INITIAL_JSON);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [latency, setLatency] = useState("142ms");
  const [responseStatus, setResponseStatus] = useState("201 Created");
  const [simulatedData, setSimulatedData] = useState({
    status: "SUCCESS",
    payment_id: "PAY-2025-BOG-992381",
    redirect_url: "https://pasarela.bogota.gov.co/checkout/sess_89a1c900e4",
    expiration_utc: 1747589920,
    xroad_receipt_hash: "sha256:d8a9f24b8109ca82fe...",
  });

  const endpointUrl =
    environment === "sandbox"
      ? "https://sandbox.api.bogota.gov.co/v2/payments/initiate"
      : "https://xroad.bogota.gov.co/r1/DIST/SDH/v2/payments/initiate";

  const handleReset = () => {
    setPayload(INITIAL_JSON);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setCopiedSuccess(false);

    // Also copy snippet to clipboard
    try {
      navigator.clipboard.writeText(payload);
    } catch {
      // Ignore clipboard error if running in headless environment
    }

    setTimeout(() => {
      const randomId = `PAY-2025-BOG-${Math.floor(100000 + Math.random() * 900000)}`;
      const randomLatency = `${Math.floor(115 + Math.random() * 55)}ms`;
      const randomSess = Math.random().toString(36).substring(2, 12);
      const randomHash = `sha256:${Math.random().toString(36).substring(2, 16)}...`;
      const expTime = Math.floor(Date.now() / 1000) + 1800;

      setLatency(randomLatency);
      setResponseStatus("201 Created");
      setSimulatedData({
        status: "SUCCESS",
        payment_id: randomId,
        redirect_url: `https://pasarela.bogota.gov.co/checkout/sess_${randomSess}`,
        expiration_utc: expTime,
        xroad_receipt_hash: randomHash,
      });

      setIsExecuting(false);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    }, 600);
  };

  return (
    <div className="rounded-[15px] overflow-hidden shadow-2xl flex flex-col bg-[#121316] text-white border border-[#2B2D31]">
      {/* Header de la Consola: Selector de Entorno & Lenguaje */}
      <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 bg-[#1A1C20] border-b border-[#2B2D31]">
        {/* Environment Pills */}
        <div className="flex items-center gap-1.5 p-0.5 rounded-[5px] bg-[#121316]">
          <button
            type="button"
            onClick={() => setEnvironment("sandbox")}
            className={`px-3 py-1 rounded-[5px] text-xs font-semibold transition-all min-h-[32px] cursor-pointer ${
              environment === "sandbox"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Sandbox / Pruebas
          </button>
          <button
            type="button"
            onClick={() => setEnvironment("production")}
            className={`px-3 py-1 rounded-[5px] text-xs font-medium transition-all min-h-[32px] cursor-pointer ${
              environment === "production"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Producción (mTLS)
          </button>
        </div>

        {/* Language Selectors */}
        <div className="flex items-center gap-1 text-xs">
          {(["curl", "ts", "python", "java"] as ClientLanguage[]).map((lang) => {
            const labels: Record<ClientLanguage, string> = {
              curl: "cURL",
              ts: "TypeScript",
              python: "Python",
              java: "Java",
            };
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-[5px] font-mono text-xs font-medium transition-colors min-h-[30px] cursor-pointer ${
                  language === lang
                    ? "bg-white/10 text-white font-semibold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {labels[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Endpoint URL Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2 bg-[#15171B] border-b border-[#24262B]">
        <div className="flex items-center gap-2 overflow-x-auto font-mono text-xs sm:text-sm">
          <span className="px-2 py-0.5 rounded-[5px] text-xs font-bold text-white uppercase bg-[#CC0E35] shrink-0">
            POST
          </span>
          <span className="text-neutral-400 truncate">{endpointUrl}</span>
        </div>
        <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono uppercase font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 shrink-0">
          SSL Valid
        </span>
      </div>

      {/* Editor / Code Area */}
      <div className="p-4 flex flex-col gap-2 font-mono text-xs sm:text-sm leading-relaxed bg-[#0E0F12]">
        <div className="flex items-center justify-between text-neutral-500 text-[11px] uppercase tracking-wider pb-1">
          <span>Request Payload (JSON editable)</span>
          <span className="text-neutral-400 flex items-center gap-1 font-sans text-xs">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              edit_note
            </span>
            Modificable en vivo
          </span>
        </div>

        {/* Interactive Textarea for JSON */}
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={9}
          spellCheck={false}
          className="w-full bg-transparent font-mono text-xs sm:text-sm text-slate-200 focus:outline-none resize-none leading-relaxed border-none p-0 selection:bg-primary selection:text-white"
        />
      </div>

      {/* Console Action Bar */}
      <div className="px-4 py-3 flex items-center justify-between gap-3 bg-[#17191D] border-t border-[#2B2D31]">
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-2 rounded-[5px] text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1 min-h-[40px] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            restart_alt
          </span>
          Restablecer
        </button>

        <button
          type="button"
          onClick={handleExecute}
          disabled={isExecuting}
          className="px-5 py-2.5 rounded-[5px] font-heading text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary-container transition-all flex items-center gap-2 shadow-lg min-h-[44px] cursor-pointer disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#17191D]"
        >
          <span
            className={`material-symbols-outlined text-[18px] ${isExecuting ? "animate-spin" : ""}`}
            aria-hidden="true"
          >
            {isExecuting ? "refresh" : copiedSuccess ? "check" : "bolt"}
          </span>
          {isExecuting
            ? "Procesando..."
            : copiedSuccess
              ? "¡Ejecutado con Éxito!"
              : "Copiar y Probar en Sandbox"}
        </button>
      </div>

      {/* Simulated Output Terminal Panel */}
      <div className="flex flex-col bg-[#0B0C0E] border-t border-[#202227]">
        <div className="px-4 py-2 flex items-center justify-between text-neutral-400 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">
              terminal
            </span>
            <span>Simulación de Respuesta Distrital</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-emerald-400">{responseStatus}</span>
            <span className="text-neutral-500">{latency}</span>
          </div>
        </div>

        {/* Output Body */}
        <div className="px-4 py-2 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-[#A6ACCD]">
          <pre className="m-0">
            <code>
              {"{\n"}
              {"  "}
              <span style={{ color: "#82AAFF" }}>&quot;status&quot;</span>:{" "}
              <span style={{ color: "#C3E88D" }}>&quot;{simulatedData.status}&quot;</span>,{"\n"}
              {"  "}
              <span style={{ color: "#82AAFF" }}>&quot;payment_id&quot;</span>:{" "}
              <span style={{ color: "#C3E88D" }}>&quot;{simulatedData.payment_id}&quot;</span>,
              {"\n"}
              {"  "}
              <span style={{ color: "#82AAFF" }}>&quot;redirect_url&quot;</span>:{" "}
              <span style={{ color: "#C3E88D" }}>&quot;{simulatedData.redirect_url}&quot;</span>,
              {"\n"}
              {"  "}
              <span style={{ color: "#82AAFF" }}>&quot;expiration_utc&quot;</span>:{" "}
              <span style={{ color: "#F78C6C" }}>{simulatedData.expiration_utc}</span>,{"\n"}
              {"  "}
              <span style={{ color: "#82AAFF" }}>&quot;xroad_receipt_hash&quot;</span>:{" "}
              <span style={{ color: "#C3E88D" }}>
                &quot;{simulatedData.xroad_receipt_hash}&quot;
              </span>
              {"\n"}
              {"}"}
            </code>
          </pre>
        </div>

        {/* Interactive Hint Footer in Console */}
        <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-500 bg-[#08080A]">
          <span>Audit log persistido en Graylog Distrital</span>
          <span className="text-neutral-400">Rate Limit: 10,000 req/min por entidad</span>
        </div>
      </div>
    </div>
  );
};
