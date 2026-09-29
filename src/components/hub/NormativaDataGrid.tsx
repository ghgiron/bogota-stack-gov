"use client";

import type React from "react";
import { useId, useMemo, useState } from "react";

export type NormTheme =
  | "all"
  | "interoperabilidad"
  | "gobierno-digital"
  | "accesibilidad"
  | "tramites";

export interface LegalInstrument {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  scope: string;
  obligationLevel: " SGAB" | "Lineamiento Distrital" | "Ley Nacional" | "Política Pública";
  badgeVariant: "green" | "blue" | "yellow";
  theme: Exclude<NormTheme, "all">;
  iconSymbol: string;
  iconColorClass: string;
  actionText: string;
  summary: string;
  articles: string[];
  officialUrl: string;
}

const LEGAL_DATA: LegalInstrument[] = [
  {
    id: "decreto-640-2025",
    title: "Decreto Distrital 640 de 2025",
    subtitle: "Adopción de Bogotá Stack como estándar distrital",
    issuer: "Alcaldía Mayor / Secretaría General",
    scope: "Portal Transaccional y Ecosistema Bogotá Stack",
    obligationLevel: " SGAB",
    badgeVariant: "green",
    theme: "gobierno-digital",
    iconSymbol: "description",
    iconColorClass: "text-primary",
    actionText: "Ver Texto",
    summary:
      "Reglamenta la obligatoriedad para los 60+ organismos del Distrito de adoptar los componentes de interfaz de Bogotá Stack (Kit UI Bogotá), integrarse a la pasarela B-Pay y reportar disponibilidad técnica a la Secretaría General.",
    articles: [
      "Art. 1: Ámbito de aplicación para entidades del sector central y descentralizado.",
      "Art. 4: Uso del Kit UI Bogotá y patrones de diseño.",
      "Art. 8: Obligación de liquidación electrónica mediante el Building Block de Pagos.",
      "Art. 12: Monitoreo semestral del cumplimiento de estándares por la SGAB.",
    ],
    officialUrl: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
  },
  {
    id: "decreto-575-2023",
    title: "Decreto Distrital 575 de 2023",
    subtitle: "Directrices de gobernanza de datos distritales",
    issuer: "Consejería Distrital de TIC",
    scope: "Infraestructura de Datos de Bogotá y Gobernanza DWH",
    obligationLevel: " SGAB",
    badgeVariant: "green",
    theme: "interoperabilidad",
    iconSymbol: "description",
    iconColorClass: "text-primary",
    actionText: "Ver Texto",
    summary:
      "Crea el marco técnico de gobernanza de datos, exigiendo el intercambio federado a través de  distrital y el almacenamiento de metadatos estandarizados bajo el esquema DCAT-AP.",
    articles: [
      "Art. 2: Infraestructura de Datos de Bogotá (IDB) como plataforma maestra.",
      "Art. 5: Conectores estandarizados mTLS y protocolo Once-Only para cédulas y RUES.",
      "Art. 9: Criterios de interoperabilidad obligatoria con el Data Warehouse distrital.",
    ],
    officialUrl: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
  },
  {
    id: "decreto-207-2026",
    title: "Decreto Distrital 207 de 2026",
    subtitle: "Proyectado / En etapa de adopción",
    issuer: "Secretaría General",
    scope: "Modelo de Entidad Integrada e Índice IAI",
    obligationLevel: "Lineamiento Distrital",
    badgeVariant: "blue",
    theme: "gobierno-digital",
    iconSymbol: "draft",
    iconColorClass: "text-tertiary",
    actionText: "Ver Directriz",
    summary:
      "Instrumento prospectivo que establece el Índice de Adopción e Integración (IAI), clasificando a las entidades distritales según su nivel de madurez digital, accesibilidad WCAG y autoservicio transaccional.",
    articles: [
      "Art. 3: Metodología de cálculo del Índice IAI (0 a 100 puntos).",
      "Art. 7: Tablero de control público de avance de digitalización de trámites.",
      "Art. 10: Asistencia prioritaria obligatoria de iBO para entidades con IAI < 60.",
    ],
    officialUrl: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
  },
  {
    id: "resolucion-1519-2020",
    title: "Resolución 1519 de 2020 / MinTIC",
    subtitle: "Anexo técnico de accesibilidad digital",
    issuer: "MinTIC / Aplicación Distrital",
    scope: "Estándares de Accesibilidad Web (WCAG 2.1 / 2.2)",
    obligationLevel: "Ley Nacional",
    badgeVariant: "green",
    theme: "accesibilidad",
    iconSymbol: "verified_user",
    iconColorClass: "text-[#1B7A2E]",
    actionText: "Ver Texto",
    summary:
      "Fija las directrices obligatorias de accesibilidad web, disponibilidad y usabilidad para sedes electrónicas públicas de todo el Estado colombiano, adoptando el estándar internacional W3C WCAG 2.1 y 2.2 nivel AA.",
    articles: [
      "Anexo 1: Criterios de contraste cromático mínimo 4.5:1 para texto normal.",
      "Anexo 2: Compatibilidad obligatoria con lectores de pantalla (NVDA, JAWS).",
      "Anexo 3: Estructura semántica, atajos de teclado y skip links.",
    ],
    officialUrl: "https://mintic.gov.co",
  },
  {
    id: "ley-2052-2020",
    title: "Ley 2052 de 2020 (Ley Antitrámites)",
    subtitle: "Digitalización obligatoria y cero papel",
    issuer: "Congreso / Función Pública",
    scope: "Racionalización y Digitalización de Trámites SUIT",
    obligationLevel: "Ley Nacional",
    badgeVariant: "green",
    theme: "tramites",
    iconSymbol: "verified_user",
    iconColorClass: "text-[#1B7A2E]",
    actionText: "Guía Bogotá",
    summary:
      "Dispone la digitalización obligatoria de todos los trámites del Estado, prohibiendo solicitar al ciudadano documentos que ya reposen en entidades públicas (principio Once-Only / Una Sola Vez).",
    articles: [
      "Art. 1: Cero papel y gratuidad de consultas interinstitucionales.",
      "Art. 3: Prohibición de exigir certificados de existencia y representación legal.",
      "Art. 6: Integración forzosa con el Portal Único del Estado y Carpeta Ciudadana.",
    ],
    officialUrl: "https://funcionpublica.gov.co",
  },
  {
    id: "decreto-839-2023",
    title: "Decreto Distrital 839 de 2023",
    subtitle: "Estrategia distrital contra la burocracia",
    issuer: "Secretaría Jurídica Distrital",
    scope: "Política Pública Distrital de Racionalización de Trámites",
    obligationLevel: "Política Pública",
    badgeVariant: "yellow",
    theme: "tramites",
    iconSymbol: "policy",
    iconColorClass: "text-secondary",
    actionText: "Ver Texto",
    summary:
      "Adopta la Política Pública Distrital de Racionalización de Trámites para el periodo 2023-2038, orientada a reducir costos de transacción y simplificar requisitos burocráticos en Bogotá.",
    articles: [
      "Eje 1: Supresión de trámites obsoletos y fusión de requisitos duplicados.",
      "Eje 2: Fortalecimiento del canal digital y automatización robótica de procesos.",
      "Eje 3: Participación ciudadana en la detección de fricciones administrativas.",
    ],
    officialUrl: "https://secretariajuridica.gov.co",
  },
];

export const NormativaDataGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [themeFilter, setThemeFilter] = useState<NormTheme>("all");
  const [selectedNorm, setSelectedNorm] = useState<LegalInstrument | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const modalTitleId = useId();

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return LEGAL_DATA.filter((item) => {
      const matchesTheme = themeFilter === "all" || item.theme === themeFilter;
      if (!matchesTheme) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.issuer.toLowerCase().includes(q) ||
        item.scope.toLowerCase().includes(q) ||
        item.obligationLevel.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, themeFilter]);

  const handleDownload = (norm: LegalInstrument) => {
    setDownloadToast(`Descarga iniciada: ${norm.title}.pdf`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3500);
  };

  return (
    <section
      className="w-full bg-surface-container-lowest py-12 md:py-16"
      id="repositorio-normativo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider font-body">
              Marco Legal Habilitante
            </span>
            <span className="px-2.5 py-0.5 rounded-[5px] bg-surface-container text-xs font-medium text-on-surface-variant font-body">
              Base Legal Vinculante
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-on-surface font-bold">
                Repositorio Normativo Distrital
              </h2>
              <p className="font-body text-base text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
                Instrumentos jurídicos que sustentan la obligatoriedad de la integración con Bogotá
                Stack, los estándares de interoperabilidad y la transformación digital distrital.
              </p>
            </div>

            <div className="flex items-center gap-2 text-on-surface-variant text-xs font-body shrink-0">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#1B7A2E] animate-pulse"
                aria-hidden="true"
              />
              <span>Normas en estado de vigencia plena (2025-2026)</span>
            </div>
          </div>
        </div>

        {/* Filters & Real-time Search Box */}
        <div className="p-4 sm:p-6 rounded-[15px] bg-surface-container-low mb-8 flex flex-col md:flex-row items-center gap-4 border border-surface-container-highest/60">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <label htmlFor="norma-search" className="sr-only">
              Filtrar por decreto, ley, temática o entidad emisora
            </label>
            <span
              className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none"
              aria-hidden="true"
            >
              search
            </span>
            <input
              id="norma-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar por decreto, ley, temática o entidad emisora..."
              className="w-full min-h-[44px] pl-11 pr-4 py-2 rounded-[5px] bg-surface-container-lowest font-body text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant/60 border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-tertiary"
            />
          </div>

          {/* Thematic Select */}
          <div className="w-full md:w-1/2 flex items-center gap-3">
            <label
              htmlFor="theme-filter"
              className="font-body text-sm text-on-surface font-semibold whitespace-nowrap hidden sm:block"
            >
              Temática:
            </label>
            <select
              id="theme-filter"
              value={themeFilter}
              onChange={(e) => setThemeFilter(e.target.value as NormTheme)}
              className="w-full min-h-[44px] px-4 py-2 rounded-[5px] bg-surface-container-lowest font-body text-sm sm:text-base text-on-surface border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-tertiary"
            >
              <option value="all">Todas las temáticas</option>
              <option value="interoperabilidad">Interoperabilidad &amp; Datos</option>
              <option value="gobierno-digital">Gobierno Digital &amp; Ecosistema</option>
              <option value="accesibilidad">Accesibilidad Web (WCAG)</option>
              <option value="tramites">Trámites y SUIT</option>
            </select>
          </div>
        </div>

        {/* Live Filter Counter */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3 px-1 font-body">
          <span>
            Mostrando <strong>{filteredData.length}</strong> de <strong>{LEGAL_DATA.length}</strong>{" "}
            instrumentos jurídicos
          </span>
          {(searchQuery || themeFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setThemeFilter("all");
              }}
              className="text-primary hover:underline font-semibold"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Interactive DataGrid / Table Container */}
        <div className="rounded-[15px] overflow-hidden bg-surface-container-lowest shadow-sm border border-surface-container-highest">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body border-collapse min-w-[720px]">
              <caption className="sr-only">
                Repositorio de normas, decretos y resoluciones distritales de Bogotá Stack
              </caption>
              <thead>
                <tr className="bg-surface-container font-heading text-sm font-bold text-on-surface tracking-tight border-b border-surface-container-highest">
                  <th scope="col" className="py-4 px-6 w-1/4">
                    Norma / Instrumento Legal
                  </th>
                  <th scope="col" className="py-4 px-4 w-1/5">
                    Entidad Emisora
                  </th>
                  <th scope="col" className="py-4 px-4 w-1/4">
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
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-container-low/80 transition-colors group"
                    >
                      {/* Norma / Instrumento */}
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[22px] shrink-0 mt-0.5 ${item.iconColorClass}`}
                            aria-hidden="true"
                          >
                            {item.iconSymbol}
                          </span>
                          <div>
                            <span className="font-heading text-sm sm:text-base font-bold text-on-surface block leading-tight group-hover:text-primary transition-colors">
                              {item.title}
                            </span>
                            <span className="font-body text-xs text-on-surface-variant block mt-0.5">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Entidad Emisora */}
                      <td className="py-4 px-4 text-xs sm:text-sm text-on-surface font-body">
                        {item.issuer}
                      </td>

                      {/* Temática / Ámbito */}
                      <td className="py-4 px-4 text-xs sm:text-sm text-on-surface-variant font-body">
                        {item.scope}
                      </td>

                      {/* Nivel de Obligatoriedad */}
                      <td className="py-4 px-4">
                        {item.badgeVariant === "green" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#1B7A2E]/10 text-[#1B7A2E] text-xs font-semibold">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#1B7A2E]"
                              aria-hidden="true"
                            />
                            {item.obligationLevel}
                          </span>
                        )}
                        {item.badgeVariant === "blue" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-tertiary"
                              aria-hidden="true"
                            />
                            {item.obligationLevel}
                          </span>
                        )}
                        {item.badgeVariant === "yellow" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-secondary-container/25 text-on-secondary-container text-xs font-semibold">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-secondary"
                              aria-hidden="true"
                            />
                            {item.obligationLevel}
                          </span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedNorm(item)}
                            aria-label={`Ver texto oficial de ${item.title}`}
                            className="min-h-[44px] px-3.5 py-1.5 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-tertiary text-xs font-semibold transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
                          >
                            <span
                              className="material-symbols-outlined text-[16px]"
                              aria-hidden="true"
                            >
                              visibility
                            </span>
                            <span>{item.actionText}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownload(item)}
                            aria-label={`Descargar anexo PDF de ${item.title}`}
                            className="min-h-[44px] w-[44px] rounded-[5px] bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
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
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
                find_in_page
              </span>
              <p className="font-heading font-bold text-base text-on-surface">
                No se encontraron normas con los criterios actuales
              </p>
              <p className="text-sm text-on-surface-variant mt-1 font-body">
                Intenta buscar por otro término o restablece el filtro temático.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setThemeFilter("all");
                }}
                className="mt-4 px-4 py-2 min-h-[44px] bg-primary text-on-primary rounded-[5px] text-sm font-semibold"
              >
                Restablecer Búsqueda
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast de Descarga */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-[10px] bg-on-surface text-on-primary shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-green-400 text-[22px]">check_circle</span>
          <span className="text-sm font-medium font-body">{downloadToast}</span>
        </div>
      )}

      {/* Modal Visor de Instrumento Legal */}
      {selectedNorm && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-none m-0"
        >
          <div className="bg-surface rounded-[15px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-surface-container-highest pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[5px] bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">gavel</span>
                </div>
                <div>
                  <h3
                    id={modalTitleId}
                    className="font-heading text-lg sm:text-xl font-bold text-on-surface"
                  >
                    {selectedNorm.title}
                  </h3>
                  <span className="text-xs text-on-surface-variant font-body">
                    {selectedNorm.issuer} • {selectedNorm.obligationLevel}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNorm(null)}
                aria-label="Cerrar visor normativo"
                className="w-9 h-9 flex items-center justify-center rounded-[5px] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-primary uppercase tracking-wider mb-1">
                Objeto y Ámbito de Aplicación
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {selectedNorm.summary}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-heading text-xs font-bold text-on-surface uppercase tracking-wider">
                Articulado y Disposiciones Clave
              </h4>
              <ul className="space-y-2 text-sm text-on-surface font-body bg-surface-container-low p-4 rounded-[10px] border border-surface-container">
                {selectedNorm.articles.map((art) => (
                  <li key={art} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      article
                    </span>
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-[5px] bg-surface-container flex items-center justify-between gap-2 text-xs text-on-surface-variant font-body">
              <span>Régimen Legal Distrital (SIPRO / SISJUR)</span>
              <span className="font-semibold text-tertiary">Vigencia Confirmada 2026</span>
            </div>

            <div className="pt-3 border-t border-surface-container-highest flex items-center justify-end gap-3 font-body">
              <button
                type="button"
                onClick={() => setSelectedNorm(null)}
                className="min-h-[44px] px-4 py-2 rounded-[5px] text-sm font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => handleDownload(selectedNorm)}
                className="min-h-[44px] px-4 py-2.5 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Descargar PDF</span>
              </button>
              <a
                href={selectedNorm.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-5 py-2.5 rounded-[5px] bg-primary text-on-primary text-sm font-semibold flex items-center gap-1.5 hover:bg-[#A80B2B] transition-colors"
              >
                <span>Consultar en SISJUR</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};
