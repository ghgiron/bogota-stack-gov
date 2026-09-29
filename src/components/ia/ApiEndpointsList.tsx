"use client";

import type { ApiEndpointItem } from "@/lib/services/aiPredictorService";
import type React from "react";
import { useState } from "react";

interface ApiEndpointsListProps {
  apiEndpoints: ApiEndpointItem[];
}

export const ApiEndpointsList: React.FC<ApiEndpointsListProps> = ({ apiEndpoints }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyOpenApi = () => {
    const jsonSpec = {
      openapi: "3.0.3",
      info: {
        title: "Bogotá Stack - Trámite Distrital Architecture SDK",
        version: "2.4.0",
        description: "Colección de endpoints distritales generados por el Agente Predictivo IA.",
      },
      paths: Object.fromEntries(
        apiEndpoints.map((ep) => [
          ep.path,
          {
            [ep.method.toLowerCase()]: {
              summary: ep.owner,
              description: ep.description,
              responses: { "200": { description: "Respuesta exitosa" } },
            },
          },
        ]),
      ),
    };

    navigator.clipboard?.writeText(JSON.stringify(jsonSpec, null, 2));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleCopyEndpoint = (ep: ApiEndpointItem) => {
    navigator.clipboard?.writeText(`${ep.method} ${ep.path}`);
    setCopiedId(ep.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <article
      aria-labelledby="apis-title"
      className="bg-surface-container-lowest rounded-[15px] p-4 sm:p-6 shadow-sm flex flex-col gap-4"
    >
      {/* Encabezado con Icono y Botón Copiar OpenAPI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[5px] bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              api
            </span>
          </div>
          <h3 className="font-heading text-lg sm:text-xl text-on-surface font-bold" id="apis-title">
            3. APIs Distritales a Consumir SDK
          </h3>
        </div>
        <button
          type="button"
          onClick={handleCopyOpenApi}
          className="h-9 px-3 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-tertiary self-start sm:self-auto min-h-[36px]"
          title="Copiar especificación OpenAPI 3.0 / Colección Postman"
        >
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            {copiedAll ? "done" : "content_copy"}
          </span>
          <span>{copiedAll ? "¡Colección Copiada!" : "Copiar OpenAPI / Postman"}</span>
        </button>
      </div>

      {/* Lista de Endpoints Detallada */}
      <div className="flex flex-col gap-2">
        {apiEndpoints.map((endpoint) => {
          const isGet = endpoint.method === "GET";
          const methodBg = isGet ? "bg-tertiary text-white" : "bg-[#1B7A2E] text-white";

          return (
            <button
              key={endpoint.id}
              type="button"
              className="w-full text-left bg-surface-container-low p-3 rounded-[10px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface-container transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-tertiary"
              onClick={() => handleCopyEndpoint(endpoint)}
              aria-label={`Copiar ruta ${endpoint.method} ${endpoint.path}`}
              title="Haz clic para copiar este endpoint"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span
                  className={`px-2 py-0.5 rounded-[5px] font-mono text-[11px] font-bold tracking-wider shrink-0 ${methodBg}`}
                >
                  {endpoint.method}
                </span>
                <span className="font-mono text-xs sm:text-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                  {endpoint.path}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 text-xs justify-between sm:justify-end">
                <span className="text-on-surface-variant text-[11px] text-right truncate max-w-[280px]">
                  {endpoint.owner}
                </span>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    {endpoint.icon}
                  </span>
                  <span className="material-symbols-outlined text-[15px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedId === endpoint.id ? "done" : "content_copy"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </article>
  );
};
