"use client";

import { Code2, Filter, Palette, Search, ShieldCheck, X } from "lucide-react";

export type RoleFilter = "todas" | "estrategico" | "ux-ui" | "ingenieria";

interface GuidesFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRole: RoleFilter;
  setSelectedRole: (role: RoleFilter) => void;
  totalGuides: number;
  filteredCount: number;
}

export default function GuidesFilterBar({
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
  totalGuides,
  filteredCount,
}: GuidesFilterBarProps) {
  const roles: {
    id: RoleFilter;
    label: string;
    icon: typeof ShieldCheck;
  }[] = [
      { id: "todas", label: "Todas", icon: Filter },
      { id: "estrategico", label: "Estratégico / Directivo", icon: ShieldCheck },
      { id: "ux-ui", label: "Diseño UX / UI", icon: Palette },
      { id: "ingenieria", label: "Desarrollo / Ingeniería", icon: Code2 },
    ];

  return (
    <div className="w-full flex flex-col gap-4 bg-surface-container-lowest p-4 sm:p-6 rounded-[15px] border border-surface-container-high shadow-sm">
      {/* Input de Búsqueda Ancho con Icono de Lupa */}
      <div className="w-full relative">
        <label htmlFor="guides-search" className="sr-only">
          Buscar por palabra clave, número de guía o temática
        </label>
        <div className="relative flex items-center">
          <Search
            className="absolute left-4 w-5 h-5 text-on-surface-variant/70 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="guides-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busca por necesidad o tema (ej. interoperabilidad, lenguaje claro, accesibilidad)"
            className="w-full pl-12 pr-11 py-3 bg-surface-container-low border border-surface-container-high rounded-[8px] text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:bg-surface-container-lowest transition-all min-h-[44px]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Píldoras de Filtrado (Tabs/Chips Tripartitas) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-surface-container-high/60">
        <div
          role="tablist"
          aria-label="Filtrar guías por perfil institucional"
          className="flex flex-wrap items-center gap-2"
        >
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                role="tab"
                id={`tab-${role.id}`}
                aria-selected={isSelected}
                aria-controls="guides-grid-region"
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] text-xs sm:text-sm font-heading font-semibold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2 ${isSelected
                  ? "bg-primary text-white shadow-sm ring-1 ring-primary"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-surface-container-high/70"
                  }`}
              >
                <Icon
                  className={`w-4 h-4 ${isSelected ? "text-secondary" : "text-on-surface-variant"}`}
                  aria-hidden="true"
                />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contador de Resultados */}
        <div className="text-xs text-on-surface-variant font-medium">
          Mostrando <span className="font-bold text-on-surface">{filteredCount}</span> de{" "}
          <span className="font-bold text-on-surface">{totalGuides}</span> guías
        </div>
      </div>
    </div>
  );
}
