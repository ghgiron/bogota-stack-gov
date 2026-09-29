"use client";

import { ButtonBogota } from "@/components/ui/ButtonBogota";
import type { BuildingBlockDetail } from "@/lib/data/buildingBlocksData";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  ExternalLink,
  Play,
  RotateCcw,
  Send,
  Terminal,
  Zap,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export interface SplitScreenSandboxProps {
  block: BuildingBlockDetail;
}

interface ApiResponseState {
  status: number;
  statusText: string;
  durationMs: number;
  data: Record<string, unknown> | null;
  headers: Record<string, string>;
  rawError?: string;
}

export const SplitScreenSandbox: React.FC<SplitScreenSandboxProps> = ({ block }) => {
  const [selectedPresetId, setSelectedPresetId] = useState(block.samplePayloads[0]?.id || "");
  const [requestJson, setRequestJson] = useState(() => {
    const initial = block.samplePayloads[0]?.payload || {};
    return JSON.stringify(initial, null, 2);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseState, setResponseState] = useState<ApiResponseState | null>(null);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [jsonParseError, setJsonParseError] = useState<string | null>(null);
  const [responseTab, setResponseTab] = useState<"body" | "headers">("body");

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = block.samplePayloads.find((p) => p.id === presetId);
    if (found) {
      setRequestJson(JSON.stringify(found.payload, null, 2));
      setJsonParseError(null);
    }
  };

  const handleJsonChange = (text: string) => {
    setRequestJson(text);
    try {
      JSON.parse(text);
      setJsonParseError(null);
    } catch (err) {
      if (err instanceof Error) {
        setJsonParseError(err.message);
      }
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(requestJson);
      setRequestJson(JSON.stringify(parsed, null, 2));
      setJsonParseError(null);
    } catch {
      // Dejar como está si no es JSON válido
    }
  };

  const handleReset = () => {
    const found = block.samplePayloads.find((p) => p.id === selectedPresetId);
    if (found) {
      setRequestJson(JSON.stringify(found.payload, null, 2));
      setJsonParseError(null);
    }
  };

  const handleExecuteRequest = async () => {
    let parsedBody: Record<string, unknown>;
    try {
      parsedBody = JSON.parse(requestJson);
    } catch {
      setJsonParseError("JSON inválido. Corrige la sintaxis antes de enviar.");
      return;
    }

    setIsLoading(true);
    setResponseState(null);
    const startTime = performance.now();

    try {
      const res = await fetch(block.endpointUrl, {
        method: block.documentation.technicalSpec.method,
        headers: {
          "Content-Type": "application/json",
          "X-Bogota-ApiKey": "bog_live_sec_demo_key_99812",
          "X-Entity-ID": "SGAB-DIR-TIC-01",
        },
        body: JSON.stringify(parsedBody),
      });

      const endTime = performance.now();
      const durationMs = Math.round(endTime - startTime);

      let data: Record<string, unknown> | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      const headersMap: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        headersMap[key] = val;
      });

      setResponseState({
        status: res.status,
        statusText: res.statusText || (res.status === 201 ? "Created" : "Bad Request"),
        durationMs,
        data,
        headers: headersMap,
      });
    } catch (err: unknown) {
      const endTime = performance.now();
      setResponseState({
        status: 0,
        statusText: "Network Error",
        durationMs: Math.round(endTime - startTime),
        data: null,
        headers: {},
        rawError: err instanceof Error ? err.message : "Error de red al conectar con el mock.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (responseState?.data) {
      navigator.clipboard.writeText(JSON.stringify(responseState.data, null, 2));
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  const curlCommand = `curl -X POST "https://api.bogota.gov.co${block.endpointUrl}" \\
  -H "Content-Type: application/json" \\
  -H "X-Bogota-ApiKey: bog_sec_token_99182" \\
  -d '${requestJson.replace(/'/g, "'\\''")}'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* PANEL IZQUIERDO: DOCUMENTACIÓN TÉCNICA (50%) */}
      <section aria-label="Especificación técnica del endpoint" className="lg:col-span-6 space-y-6">
        {/* Encabezado del Endpoint */}
        <div className="bg-surface rounded-card p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded font-mono font-bold text-xs bg-emerald-100 text-emerald-800 border border-emerald-300">
              {block.documentation.technicalSpec.method}
            </span>
            <code className="font-mono text-sm font-bold text-text-main">{block.endpointUrl}</code>
          </div>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Inicializa una sesión de recaudación fiscal o cobro de trámite en la pasarela distrital
            B-Pay. Genera un identificador de pago único con estampado cronológico y enlace seguro
            de liquidación ciudadana.
          </p>
        </div>

        {/* Parámetros de la Petición */}
        <div className="bg-surface rounded-card p-6 border border-gray-200 shadow-xs">
          <h3 className="font-heading font-bold text-base text-text-main mb-3">
            Cuerpo de la Petición (Request Body)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-text-muted">
                  <th className="py-2 pr-3 font-semibold">Campo</th>
                  <th className="py-2 pr-3 font-semibold">Tipo</th>
                  <th className="py-2 pr-3 font-semibold">Requerido</th>
                  <th className="py-2 font-semibold">Descripción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {block.documentation.technicalSpec.parameters.map((param) => (
                  <tr key={param.name} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2.5 pr-3 font-mono font-medium text-text-main">
                      {param.name}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-gray-500">{param.type}</td>
                    <td className="py-2.5 pr-3">
                      {param.required ? (
                        <span className="text-[11px] font-semibold text-primary"></span>
                      ) : (
                        <span className="text-[11px] text-gray-400">Opcional</span>
                      )}
                    </td>
                    <td className="py-2.5 text-text-muted leading-tight">{param.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cabeceras HTTP Requeridas */}
        <div className="bg-surface rounded-card p-6 border border-gray-200 shadow-xs">
          <h3 className="font-heading font-bold text-base text-text-main mb-3">
            Cabeceras HTTP (Headers)
          </h3>
          <div className="space-y-2">
            {block.documentation.technicalSpec.headers.map((hdr) => (
              <div
                key={hdr.key}
                className="flex items-start justify-between p-2.5 rounded-btn bg-gray-50 border border-gray-200 text-xs"
              >
                <div>
                  <code className="font-mono font-bold text-text-main">{hdr.key}</code>
                  <p className="text-text-muted text-[11px] mt-0.5">{hdr.desc}</p>
                </div>
                <span className="font-mono text-[11px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                  {hdr.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Códigos de Respuesta */}
        <div className="bg-surface rounded-card p-6 border border-gray-200 shadow-xs">
          <h3 className="font-heading font-bold text-base text-text-main mb-3">
            Códigos de Respuesta HTTP
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {block.documentation.technicalSpec.responseCodes.map((resp) => (
              <div
                key={resp.code}
                className="p-3 rounded-btn border border-gray-200 bg-gray-50 flex items-start gap-2.5"
              >
                <span
                  className={`px-1.5 py-0.5 rounded font-mono font-bold text-xs ${
                    resp.code === 201
                      ? "bg-emerald-100 text-emerald-800"
                      : resp.code === 400
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {resp.code}
                </span>
                <div>
                  <span className="font-bold text-xs text-text-main block">{resp.label}</span>
                  <span className="text-[11px] text-text-muted leading-tight block mt-0.5">
                    {resp.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Snippet cURL */}
        <div className="bg-surface rounded-card p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-bold text-sm text-text-main">Equivalente en cURL</h3>
            <button
              type="button"
              onClick={handleCopyCurl}
              className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-main px-2 py-1 rounded hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-tertiary"
              aria-label="Copiar comando cURL al portapapeles"
            >
              {copiedCurl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar cURL</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 rounded-btn bg-[#1A1C20] text-gray-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
            <code>{curlCommand}</code>
          </pre>
        </div>
      </section>

      {/* PANEL DERECHO: CONSOLA DE PRUEBAS / SANDBOX (50%) */}
      <section
        aria-label="Consola interactiva de pruebas de API"
        className="lg:col-span-6 bg-[#1A1C20] rounded-card border border-gray-800 shadow-xl overflow-hidden flex flex-col"
      >
        {/* Barra Superior estilo Terminal */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#23262C] border-b border-gray-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="font-mono text-xs text-gray-300 ml-2 font-medium">
              B-Pay API Sandbox (Emulado)
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Latencia ~500ms
          </span>
        </div>

        {/* Barra de Endpoint y Selector de Presets */}
        <div className="p-4 bg-[#1e2025] border-b border-gray-800 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded font-mono font-bold text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              POST
            </span>
            <input
              type="text"
              readOnly
              value={block.endpointUrl}
              className="flex-1 px-3 py-1.5 rounded bg-[#131417] text-gray-200 font-mono text-xs border border-gray-700 select-all focus:outline-none"
              aria-label="URL del endpoint a probar"
            />
          </div>

          {/* Selector de Presets de Prueba */}
          <div>
            <label
              htmlFor="preset-selector"
              className="block text-[11px] font-medium text-gray-400 mb-1"
            >
              Cargar ejemplo predefinido:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {block.samplePayloads.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`px-2.5 py-1.5 rounded text-[11px] font-medium text-left truncate transition-colors border ${
                      isSelected
                        ? "bg-tertiary/20 text-blue-300 border-tertiary/50"
                        : "bg-[#131417] text-gray-400 border-gray-700 hover:text-gray-200 hover:bg-gray-800"
                    }`}
                    title={preset.description}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editor de JSON */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              JSON Request Body
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFormatJson}
                className="hover:text-gray-200 text-[11px] transition-colors"
                title="Dar formato JSON"
              >
                Formatear
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={handleReset}
                className="hover:text-gray-200 text-[11px] transition-colors"
                title="Restablecer al preset"
              >
                Restablecer
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-[160px]">
            <textarea
              value={requestJson}
              onChange={(e) => handleJsonChange(e.target.value)}
              rows={10}
              aria-label="Cuerpo JSON de la solicitud"
              className="w-full h-full p-3 font-mono text-xs text-gray-100 bg-[#131417] border border-gray-700 rounded-btn focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          {jsonParseError && (
            <p className="flex items-center gap-1.5 text-xs text-red-400 font-medium mt-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{jsonParseError}</span>
            </p>
          )}

          {/* Botón de Envío / Probar */}
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-800">
            <span className="text-[11px] text-gray-400">
              Presiona para enviar la petición al mock con 500ms de latencia:
            </span>
            <ButtonBogota
              type="button"
              variant="primary"
              size="md"
              onClick={handleExecuteRequest}
              disabled={isLoading || !!jsonParseError}
              leftIcon={
                isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-white" aria-hidden="true" />
                )
              }
            >
              {isLoading ? "Procesando en Red..." : "Probar Endpoint"}
            </ButtonBogota>
          </div>
        </div>

        {/* Panel de Respuesta HTTP */}
        <div className="p-4 bg-[#181a1e] border-t border-gray-800">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-300 font-bold">HTTP Response:</span>
              {responseState ? (
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded font-mono font-bold text-xs border ${
                      responseState.status === 201
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-red-500/20 text-red-300 border-red-500/40"
                    }`}
                  >
                    {responseState.status} {responseState.statusText}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400">
                    <Clock className="w-3 h-3" />
                    {responseState.durationMs}ms
                  </span>
                </div>
              ) : (
                <span className="text-[11px] text-gray-500 italic">Esperando ejecución...</span>
              )}
            </div>

            {responseState?.data && (
              <div className="flex items-center gap-2">
                <div className="flex bg-[#131417] p-0.5 rounded border border-gray-700 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setResponseTab("body")}
                    className={`px-2 py-0.5 rounded ${
                      responseTab === "body"
                        ? "bg-gray-700 text-white font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Cuerpo JSON
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponseTab("headers")}
                    className={`px-2 py-0.5 rounded ${
                      responseTab === "headers"
                        ? "bg-gray-700 text-white font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Cabeceras
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyResponse}
                  className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors focus-visible:ring-1 focus-visible:ring-tertiary"
                  aria-label="Copiar respuesta JSON al portapapeles"
                >
                  {copiedResponse ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Contenido de la Respuesta */}
          {isLoading ? (
            <div className="py-8 flex flex-col items-center justify-center text-gray-400 space-y-2">
              <span className="w-6 h-6 border-2 border-tertiary/30 border-t-tertiary rounded-full animate-spin" />
              <span className="text-xs font-mono">
                Procesando en pasarela B-Pay (latencia artificial de 500ms)...
              </span>
            </div>
          ) : responseState ? (
            responseTab === "body" ? (
              <pre className="p-3 rounded-btn bg-[#131417] border border-gray-800 text-emerald-400 font-mono text-xs overflow-x-auto max-h-64 leading-relaxed">
                <code>{JSON.stringify(responseState.data, null, 2)}</code>
              </pre>
            ) : (
              <div className="p-3 rounded-btn bg-[#131417] border border-gray-800 text-gray-300 font-mono text-xs overflow-x-auto max-h-64 space-y-1">
                {Object.entries(responseState.headers).map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-gray-500 font-medium">{k}:</span>
                    <span className="text-gray-200">{v}</span>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="py-6 text-center text-xs text-gray-500 italic">
              Haz clic en &ldquo;Probar Endpoint&rdquo; para simular la petición en tiempo real.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
