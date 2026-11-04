"use client";

import type { NormativaDistrital } from "@/lib/firebase/normativa";
import type React from "react";
import { useId, useMemo, useState } from "react";

interface RepositorioNormativoProps {
  initialNormativas: NormativaDistrital[];
}

export const RepositorioNormativo: React.FC<RepositorioNormativoProps> = ({
  initialNormativas,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const searchInputId = useId();
  const themeSelectId = useId();

  // Extraer temáticas únicas de las normativas
  const tematicas = useMemo(() => {
    const list = Array.from(new Set(initialNormativas.map((n) => n.tematica).filter(Boolean)));
    list.sort();
    return list;
  }, [initialNormativas]);

  // Filtrado reactivo en tiempo real
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialNormativas.filter((item) => {
      const matchesTheme = selectedTheme === "all" || item.tematica === selectedTheme;
      if (!matchesTheme) return false;
      if (!q) return true;

      return (
        item.titulo.toLowerCase().includes(q) ||
        item.descripcion.toLowerCase().includes(q) ||
        item.entidadEmisora.toLowerCase().includes(q) ||
        item.tematica.toLowerCase().includes(q) ||
        item.nivelObligatoriedad.toLowerCase().includes(q)
      );
    });
  }, [initialNormativas, searchQuery, selectedTheme]);

  const handleDownload = (norm: NormativaDistrital) => {
    const url = norm.urlDescargaAdjunto || norm.urlTexto;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setDownloadToast(`Descarga iniciada: ${norm.titulo}`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3500);
  };

  return (
    <section
      className="w-full pt-10 sm:pt-14 pb-8 border-t border-surface-container-highest/60"
      id="repositorio-normativo"
      aria-labelledby="normativa-heading"
    >
      <div className="w-full">
        {/* Cabecera Oficial */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider font-body">
              Marco Legal Habilitante
            </span>
            <span className="px-2.5 py-0.5 rounded-[5px] bg-surface-container text-xs font-medium text-on-surface-variant font-body">
              Base Jurídica Distrital
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
            <div>
              <h2
                id="normativa-heading"
                className="font-heading text-2xl sm:text-3xl md:text-4xl text-on-surface font-bold tracking-tight"
              >
                Repositorio Normativo Distrital
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-3xl mt-1.5 leading-relaxed">
                Instrumentos jurídicos que sustentan la obligatoriedad de la integración con Bogotá
                Stack, los estándares de interoperabilidad y la transformación digital distrital
                para el beneficio de la ciudadanía.
              </p>
            </div>

            <div className="flex items-center gap-2 text-on-surface-variant text-xs font-body shrink-0 bg-surface-container-low px-3 py-1.5 rounded-[5px] border border-surface-container-highest/60">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#1B7A2E] animate-pulse"
                aria-hidden="true"
              />
              <span className="font-medium text-on-surface">
                Normas en estado de vigencia plena (2025-2026)
              </span>
            </div>
          </div>
        </div>

        {/* Barra de Filtros (Fondo gris claro bg-surface-container-lowest con bordes redondeados) */}
        <div className="p-4 sm:p-5 rounded-[15px] bg-surface-container-lowest mb-6 flex flex-col md:flex-row items-center gap-4 border border-surface-container-highest/80 shadow-xs">
          {/* Input de Búsqueda */}
          <div className="relative w-full md:w-3/5">
            <label htmlFor={searchInputId} className="sr-only">
              Filtrar por decreto, ley, temática o entidad emisora
            </label>
            <span
              className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none"
              aria-hidden="true"
            >
              search
            </span>
            <input
              id={searchInputId}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar por decreto, ley, temática o entidad emisora..."
              className="w-full min-h-[44px] pl-11 pr-4 py-2.5 rounded-[8px] bg-surface-container-low font-body text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant/70 border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-colors"
            />
          </div>

          {/* Dropdown Select de Temáticas */}
          <div className="w-full md:w-2/5 flex items-center gap-2.5">
            <label
              htmlFor={themeSelectId}
              className="font-body text-xs sm:text-sm text-on-surface font-semibold whitespace-nowrap hidden sm:block shrink-0"
            >
              Temática:
            </label>
            <select
              id={themeSelectId}
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[8px] bg-surface-container-low font-body text-sm text-on-surface border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer focus:bg-surface-container-lowest transition-colors"
            >
              <option value="all">Temática: Todas las temáticas</option>
              {tematicas.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador reactivo de instrumentos */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3 px-1 font-body">
          <span>
            Mostrando <strong>{filteredData.length}</strong> de{" "}
            <strong>{initialNormativas.length}</strong> instrumentos jurídicos
          </span>
          {(searchQuery || selectedTheme !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTheme("all");
              }}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Tabla de Datos Responsive (Data Table) */}
        <div className="rounded-[15px] overflow-hidden bg-surface-container-lowest shadow-sm border border-surface-container-highest">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body border-collapse min-w-[720px]">
              <caption className="sr-only">
                Repositorio de normas, decretos y resoluciones distritales de Bogotá Stack
              </caption>
              <thead>
                <tr className="bg-surface-container font-heading text-xs sm:text-sm font-bold text-on-surface tracking-tight border-b border-surface-container-highest">
                  <th scope="col" className="py-4 px-6 w-5/12">
                    Norma / Instrumento Legal
                  </th>
                  <th scope="col" className="py-4 px-4 w-2/12">
                    Entidad Emisora
                  </th>
                  <th scope="col" className="py-4 px-4 w-3/12">
                    Temática / Ámbito
                  </th>
                  <th scope="col" className="py-4 px-4">
                    Nivel de Obligatoriedad
                  </th>
                  <th scope="col" className="py-4 px-6 text-right">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/60">
                {filteredData.map((item) => {
                  const isDirectriz = item.nivelObligatoriedad === "Lineamiento Distrital";
                  const actionLabel = isDirectriz ? "Ver Directriz" : "Ver Texto";

                  return (
                    <tr
                      key={item.id || item.titulo}
                      className="hover:bg-surface-container-low/70 transition-colors group"
                    >
                      {/* Norma: Ícono de documento/escudo a la izquierda, Título en negrita y subtítulo abajo */}
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <span
                            className="material-symbols-outlined text-[24px] text-primary shrink-0 mt-0.5"
                            aria-hidden="true"
                          >
                            gavel
                          </span>
                          <div>
                            <span className="font-heading text-sm sm:text-base font-bold text-on-surface block leading-snug group-hover:text-primary transition-colors">
                              {item.titulo}
                            </span>
                            <span className="font-body text-xs text-on-surface-variant block mt-1 leading-relaxed">
                              {item.descripcion}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Entidad Emisora */}
                      <td className="py-4 px-4 text-xs sm:text-sm text-on-surface font-body align-top">
                        <span className="font-medium">{item.entidadEmisora}</span>
                      </td>

                      {/* Temática / Ámbito */}
                      <td className="py-4 px-4 text-xs sm:text-sm text-on-surface-variant font-body align-top">
                        <span className="inline-block px-2.5 py-1 rounded-[5px] bg-surface-container text-xs font-medium text-on-surface">
                          {item.tematica}
                        </span>
                      </td>

                      {/* Nivel de Obligatoriedad (Badges) */}
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        {item.nivelObligatoriedad === "SGAB" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#1B7A2E]/10 text-[#1B7A2E] text-xs font-semibold">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#1B7A2E]"
                              aria-hidden="true"
                            />
                            SGAB
                          </span>
                        )}
                        {item.nivelObligatoriedad === "Lineamiento Distrital" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-blue-600"
                              aria-hidden="true"
                            />
                            Lineamiento Distrital
                          </span>
                        )}
                        {item.nivelObligatoriedad === "Ley Nacional" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] border border-[#1B7A2E] text-[#1B7A2E] bg-transparent text-xs font-semibold">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#1B7A2E]"
                              aria-hidden="true"
                            />
                            Ley Nacional
                          </span>
                        )}
                        {item.nivelObligatoriedad === "Política Pública" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-amber-500"
                              aria-hidden="true"
                            />
                            Política Pública
                          </span>
                        )}
                      </td>

                      {/* Acción: Botón ghost con ojo y botón cuadrado de descarga ↓ */}
                      <td className="py-4 px-6 text-right align-top">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* Botón ghost con ícono de ojo "Ver Texto" o "Ver Directriz" */}
                          <a
                            href={item.urlTexto}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${actionLabel} de ${item.titulo}`}
                            className="min-h-[40px] px-3.5 py-1.5 rounded-[5px] bg-transparent hover:bg-surface-container text-tertiary hover:text-primary text-xs font-semibold transition-colors flex items-center gap-1.5 border border-transparent hover:border-surface-container-highest focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
                          >
                            <span
                              className="material-symbols-outlined text-[18px]"
                              aria-hidden="true"
                            >
                              visibility
                            </span>
                            <span>{actionLabel}</span>
                          </a>

                          {/* Botón cuadrado con ícono de descarga ↓ */}
                          <button
                            type="button"
                            onClick={() => handleDownload(item)}
                            aria-label={`Descargar archivo o anexo de ${item.titulo}`}
                            title="Descargar anexo"
                            className="min-h-[40px] w-[40px] rounded-[5px] bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none cursor-pointer"
                          >
                            <span
                              className="material-symbols-outlined text-[18px]"
                              aria-hidden="true"
                            >
                              download
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="p-12 text-center">
              <span
                className="material-symbols-outlined text-4xl text-on-surface-variant mb-2 block"
                aria-hidden="true"
              >
                find_in_page
              </span>
              <p className="font-heading font-bold text-base text-on-surface">
                No se encontraron normas con los criterios actuales
              </p>
              <p className="text-sm text-on-surface-variant mt-1 font-body max-w-sm mx-auto">
                Intenta buscar por otro término o restablece el filtro temático.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTheme("all");
                }}
                className="mt-4 px-4 py-2 min-h-[44px] bg-primary hover:bg-primary/90 text-on-primary rounded-[5px] text-sm font-semibold cursor-pointer transition-colors"
              >
                Restablecer Búsqueda
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast de Descarga */}
      {downloadToast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-[10px] bg-on-surface text-on-primary shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200"
        >
          <span className="material-symbols-outlined text-green-400 text-[22px]">check_circle</span>
          <span className="text-sm font-medium font-body">{downloadToast}</span>
        </div>
      )}
    </section>
  );
};
