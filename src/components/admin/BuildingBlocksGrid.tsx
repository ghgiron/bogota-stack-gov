"use client";

import { ButtonBogota } from "@/components/ui/ButtonBogota";
import {
  Blocks,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  Plus,
  Search,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

interface BuildingBlock {
  id: string;
  name: string;
  category: string;
  status: "Activo" | "Piloto" | "Borrador";
  version: string;
  endpoint: string;
  description: string;
}

const INITIAL_BLOCKS: BuildingBlock[] = [
  {
    id: "bb-pagos",
    name: "Pasarela de Pagos Distrital (PSE / Bancos)",
    category: "Transaccional",
    status: "Activo",
    version: "v2.1.0",
    endpoint: "https://api.bogota.gov.co/v2/pagos",
    description:
      "Módulo centralizado para recaudos distritales con conciliación automática de transacciones ciudadanas.",
  },
  {
    id: "bb-carpeta",
    name: "Conector Carpeta Ciudadana Distrital",
    category: "Identidad",
    status: "Activo",
    version: "v1.4.2",
    endpoint: "https://api.bogota.gov.co/v1/carpeta",
    description:
      "Autenticación única y entrega de notificaciones electrónicas estandarizadas a ciudadanos.",
  },
  {
    id: "bb-notificaciones",
    name: "Servicio de Notificaciones Multicanal",
    category: "Comunicación",
    status: "Activo",
    version: "v3.0.1",
    endpoint: "https://api.bogota.gov.co/v3/notificaciones",
    description:
      "Despacho automatizado de mensajes SMS institucionales, correos transaccionales y alertas prioritarias.",
  },
  {
    id: "bb-firma",
    name: "Estampado Cronológico y Firma Electrónica",
    category: "Seguridad",
    status: "Piloto",
    version: "v1.0.0-rc",
    endpoint: "https://api.bogota.gov.co/v1/firma",
    description:
      "Servicio PKI distrital para suscripción y validación jurídica de actas y certificados oficiales.",
  },
];

export const BuildingBlocksGrid: React.FC = () => {
  const [blocks, setBlocks] = useState<BuildingBlock[]>(INITIAL_BLOCKS);
  const [search, setSearch] = useState("");

  const filtered = blocks.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Barra de Filtros */}
      <div className="bg-surface p-4 rounded-card border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <label htmlFor="search-blocks" className="sr-only">
            Buscar Building Blocks
          </label>
          <Search
            className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="search-blocks"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar APIs o componentes reutilizables..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted font-medium">
            {filtered.length} Bloques disponibles
          </span>
          <ButtonBogota
            variant="outline"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
            onClick={() => alert("Registro de nuevo Building Block habilitado en Sprint 4")}
          >
            Registrar API
          </ButtonBogota>
        </div>
      </div>

      {/* Grid de Cards de Building Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((block) => (
          <div
            key={block.id}
            className="bg-surface rounded-card border border-gray-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    block.status === "Activo"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {block.status === "Activo" ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  <span>{block.status}</span>
                </span>

                <span className="text-[11px] font-mono text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">
                  {block.version}
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-text-main mb-1.5 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>{block.name}</span>
              </h3>

              <p className="text-xs text-text-muted leading-relaxed mb-4">{block.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="font-mono text-[11px] text-text-muted flex items-center gap-1 truncate max-w-[240px]">
                <Terminal className="w-3.5 h-3.5 text-text-muted shrink-0" aria-hidden="true" />
                <span className="truncate">{block.endpoint}</span>
              </div>

              <Link
                href={`/developer/building-blocks/${block.id === "bb-pagos" ? "pagos-distritales" : "pagos-distritales"}`}
              >
                <ButtonBogota
                  variant="ghost"
                  size="sm"
                  className="text-xs py-1"
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />}
                >
                  Ver Sandbox API
                </ButtonBogota>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
