"use client";

import type { GuiaVinculacion } from "@/types/guide";
import Link from "next/link";
import type React from "react";
import { useId, useMemo, useState } from "react";

export type RoleFilter = "Todos" | "UX / UI" | "Ingeniería" | "Directivo";

export interface MasterGuideItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  tagClass?: string;
  role: "UX / UI" | "Ingeniería" | "Directivo";
  slug: string;
  isActive?: boolean;
}

const MASTER_GUIDES: MasterGuideItem[] = [
  {
    id: "g11",
    number: "1.1",
    title: "Marco y Gobernanza",
    subtitle: "Directriz distrital y soberanía digital",
    tag: "",
    tagClass: "text-secondary font-semibold",
    role: "Directivo",
    slug: "sobre-bogota-stack",
  },
  {
    id: "g12",
    number: "1.2",
    title: "Integración Distrital",
    subtitle: "Madurez BID y niveles de homologación",
    tag: "",
    tagClass: "text-secondary font-semibold",
    role: "Directivo",
    slug: "integracion-distrital",
  },
  {
    id: "g13",
    number: "1.3",
    title: "Diseño y Usabilidad",
    subtitle: "5 Momentos y Modelo Bidimensional",
    tag: "",
    role: "UX / UI",
    slug: "diseno-y-usabilidad",
  },
  {
    id: "g14",
    number: "1.4",
    title: "Kit UI Bogotá",
    subtitle: "Tokens de diseño, tipografía y componentes",
    tag: "",
    tagClass: "text-tertiary",
    role: "UX / UI",
    slug: "kit-ui-bogota",
  },
  {
    id: "g15",
    number: "1.5",
    title: "Contenido y Lenguaje Claro",
    subtitle: "Voz ciudadana activa y cero tecnicismos",
    tag: "",
    role: "UX / UI",
    slug: "lenguaje-claro",
  },
  {
    id: "g16",
    number: "5",
    title: "Interoperabilidad Distrital",
    subtitle: "SDK bb-interop, Kafka EventStore y Camel",
    tag: "",
    tagClass: "text-tertiary",
    role: "Ingeniería",
    slug: "interoperabilidad",
  },
  {
    id: "g17",
    number: "6",
    title: "Vinculación Autenticación",
    subtitle: "Keycloak SSO, biometría RNEC y Wallet W3C",
    tag: "",
    role: "Ingeniería",
    slug: "vinculacion-autenticacion",
  },
  {
    id: "g18",
    number: "7",
    title: "Building Blocks: Adopción",
    subtitle: "Ahorro financiero del 70% y catálogo común",
    tag: "",
    role: "Directivo",
    slug: "building-blocks-adopcion",
  },
  {
    id: "g19",
    number: "8",
    title: "BB: Implementación Técnica",
    subtitle: "Micro-frontends Lit y arquitectura de microservicios",
    tag: "",
    role: "Ingeniería",
    slug: "bb-implementacion-tecnica",
  },
  {
    id: "g110",
    number: "9",
    title: "Integración de Datos",
    subtitle: "Microsoft Fabric y modelo Ciudadano 360",
    tag: "",
    role: "Ingeniería",
    slug: "integracion-de-datos",
  },
  {
    id: "g111",
    number: "10",
    title: "Accesibilidad Digital",
    subtitle: "Enfoque diferencial, lectores y LSC",
    tag: "",
    tagClass: "text-primary font-bold",
    role: "UX / UI",
    slug: "accesibilidad-digital",
  },
];

const GUIDE_ROUTES: Record<string, string> = {
  "sobre-bogota-stack": "/guias-de-vinculacion/sobre-bogota-stack",
  "integracion-distrital": "/guias-de-vinculacion/integracion-distrital",
  "diseno-y-usabilidad": "/guias-de-vinculacion/diseno-y-usabilidad",
  "kit-ui": "/guias-de-vinculacion/kit-ui",
  "kit-ui-bogota": "/guias-de-vinculacion/kit-ui",
  "contenido-lenguaje-claro": "/guias-de-vinculacion/lenguaje-claro",
  "lenguaje-claro": "/guias-de-vinculacion/lenguaje-claro",
  "interoperabilidad-distrital": "/guias-de-vinculacion/interoperabilidad",
  interoperabilidad: "/guias-de-vinculacion/interoperabilidad",
  "vinculacion-autenticacion": "/guias-de-vinculacion/autenticacion",
  autenticacion: "/guias-de-vinculacion/autenticacion",
  "building-blocks-adopcion": "/guias-de-vinculacion/bb-adopcion",
  "bb-adopcion": "/guias-de-vinculacion/bb-adopcion",
  "bb-implementacion-tecnica": "/guias-de-vinculacion/bb-implementacion-tecnica",
  "integracion-de-datos": "/guias-de-vinculacion/integracion-de-datos",
  "integracion-datos": "/guias-de-vinculacion/integracion-de-datos",
  "accesibilidad-digital": "/guias-de-vinculacion/accesibilidad-digital",
};

const ROLES: RoleFilter[] = ["Todos", "UX / UI", "Ingeniería", "Directivo"];

export interface GuidesSidebarNavProps {
  activeGuideSlug?: string;
  guides?: GuiaVinculacion[];
}

export const GuidesSidebarNav: React.FC<GuidesSidebarNavProps> = ({
  activeGuideSlug = "diseno-y-usabilidad",
  guides,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState<RoleFilter>("Todos");
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState(false);
  const [supportEntity, setSupportEntity] = useState("");
  const [supportEmail, setSupportEmail] = useState("");

  const modalTitleId = useId();

  // Mapear guías dinámicas si fueron suministradas desde el Server Component
  const dynamicMasterGuides = useMemo<MasterGuideItem[]>(() => {
    if (guides && guides.length > 0) {
      return guides.map((g) => {
        const rawRole = (g.audiencias?.[0] || g.audiences?.[0] || "UX / UI") as string;
        let role: "UX / UI" | "Ingeniería" | "Directivo" = "UX / UI";
        if (rawRole.includes("Directivo") || rawRole.includes("Estratégico")) {
          role = "Directivo";
        } else if (rawRole.includes("Ingeniería") || rawRole.includes("Dev")) {
          role = "Ingeniería";
        }

        return {
          id: g.id || g.slug,
          number: g.numeroIdentificador || g.number || "1.X",
          title: g.titulo || g.title || "Guía Distrital",
          subtitle: g.resumenEjecutivo || g.summary || "",
          tag: g.categoriaPrincipal || g.category || "",
          tagClass:
            (g.categoriaPrincipal || g.category) === "Gobernanza"
              ? "text-secondary font-semibold"
              : (g.categoriaPrincipal || g.category) === "Diseño y UX"
                ? "text-primary font-bold"
                : "text-tertiary",
          role,
          slug: g.slug,
        };
      });
    }
    return MASTER_GUIDES;
  }, [guides]);

  const filteredGuides = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return dynamicMasterGuides.filter((guide) => {
      const matchesRole = activeRole === "Todos" || guide.role === activeRole;
      if (!matchesRole) return false;
      if (!q) return true;

      return (
        guide.number.toLowerCase().includes(q) ||
        guide.title.toLowerCase().includes(q) ||
        guide.subtitle.toLowerCase().includes(q) ||
        guide.tag.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeRole, dynamicMasterGuides]);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setSupportModalOpen(false);
      setSupportEntity("");
      setSupportEmail("");
    }, 2500);
  };

  return (
    <aside
      aria-label="Navegación del módulo de Guías"
      className={`bg-surface-container-lowest rounded-[15px] border border-surface-container-high shadow-xs shrink-0 lg:sticky lg:top-28 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out ${isCollapsed ? "w-full lg:w-16 p-2 lg:p-2.5" : "w-full lg:w-80 p-4"
        }`}
    >
      {/* Cabecera del Sidebar con Botón Accesible de Alternancia (Toggle) */}
      <div
        className={`flex items-center pb-3 border-b border-surface-container-high transition-all ${isCollapsed ? "justify-center" : "justify-between"
          }`}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary/10 text-primary shrink-0">
              {filteredGuides.length} Disponibles
            </span>
          </div>
        )}

        {/* Botón Accesible de Colapso / Expansión (WCAG 2.2 AA - Área táctil >= 44x44px) */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={
            isCollapsed ? "Expandir menú lateral de guías" : "Colapsar menú lateral de guías"
          }
          aria-expanded={!isCollapsed}
          title={isCollapsed ? "Expandir menú lateral de guías" : "Colapsar menú lateral de guías"}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-[8px] flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
            {isCollapsed ? "last_page" : "first_page"}
          </span>
        </button>
      </div>

      {isCollapsed ? (
        /* VISTA COLAPSADA: Rail compacto de botones numéricos centrados */
        <div className="flex flex-col gap-2">
          <nav
            aria-label="Lista compacta de Guías"
            className="flex flex-col gap-1.5 items-center no-scrollbar"
          >
            {dynamicMasterGuides.map((guide) => {
              const isCurrent =
                guide.slug === activeGuideSlug ||
                (guide.slug === "interoperabilidad-distrital" &&
                  activeGuideSlug === "interoperabilidad") ||
                (guide.slug === "vinculacion-autenticacion" &&
                  (activeGuideSlug === "autenticacion" ||
                    activeGuideSlug === "vinculacion-autenticacion")) ||
                (guide.slug === "building-blocks-adopcion" &&
                  (activeGuideSlug === "bb-adopcion" ||
                    activeGuideSlug === "building-blocks-adopcion")) ||
                ((guide.slug === "lenguaje-claro" || guide.slug === "contenido-lenguaje-claro") &&
                  (activeGuideSlug === "lenguaje-claro" ||
                    activeGuideSlug === "contenido-lenguaje-claro"));

              const targetHref =
                GUIDE_ROUTES[guide.slug] ||
                `/guias-de-vinculacion/diseno-y-usabilidad#${guide.slug}`;

              if (isCurrent) {
                return (
                  <div
                    key={guide.id}
                    title={`${guide.number}. ${guide.title} (En lectura)`}
                    aria-label={`${guide.number}. ${guide.title} (En lectura)`}
                    className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-[8px] bg-[#CC0E35] text-white flex items-center justify-center text-xs font-bold font-heading shadow-xs ring-2 ring-[#CC0E35]/40 shrink-0 cursor-default"
                  >
                    {guide.number}
                  </div>
                );
              }

              return (
                <Link
                  key={guide.id}
                  href={targetHref}
                  title={`${guide.number}. ${guide.title}`}
                  aria-label={`${guide.number}. ${guide.title}`}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-[8px] bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors text-xs font-bold font-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] shrink-0"
                >
                  {guide.number}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-surface-container-high flex justify-center">
            <button
              type="button"
              onClick={() => setSupportModalOpen(true)}
              title="¿Dudas? Mesa de Ayuda OTIC"
              aria-label="Abrir mesa de ayuda OTIC"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-[8px] flex items-center justify-center text-on-surface-variant hover:text-tertiary hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                support_agent
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* VISTA EXPANDIDA: Búsqueda, Filtros y Lista Completa de Guías */
        <div className="flex flex-col gap-3">
          {/* Quick Search */}
          <div className="relative">
            <label htmlFor="guide-search" className="sr-only">
              Buscar directriz, token, API
            </label>
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none"
              aria-hidden="true"
            >
              search
            </span>
            <input
              id="guide-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar directriz, token, API..."
              className="w-full h-10 pl-9 pr-3 rounded-[5px] bg-surface-container text-xs sm:text-sm font-body text-on-surface focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:bg-surface-container-lowest transition-all border border-transparent focus:border-[#0049AE]"
            />
          </div>

          {/* Role Filter Chips */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar"
            role="tablist"
            aria-label="Filtro de guías por rol"
          >
            {ROLES.map((role) => {
              const isActive = activeRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveRole(role)}
                  className={`px-3 py-1 rounded-[100px] text-xs font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:outline-none min-h-[32px] cursor-pointer ${isActive
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    }`}
                >
                  {role}
                </button>
              );
            })}
          </div>

          {/* Guides Nav Stack */}
          <nav
            aria-label="Lista de 10 Guías"
            className="flex flex-col gap-1 overflow-y-auto no-scrollbar"
          >
            {filteredGuides.map((guide) => {
              const isCurrent =
                guide.slug === activeGuideSlug ||
                (guide.slug === "interoperabilidad-distrital" &&
                  activeGuideSlug === "interoperabilidad") ||
                (guide.slug === "vinculacion-autenticacion" &&
                  (activeGuideSlug === "autenticacion" ||
                    activeGuideSlug === "vinculacion-autenticacion")) ||
                (guide.slug === "building-blocks-adopcion" &&
                  (activeGuideSlug === "bb-adopcion" ||
                    activeGuideSlug === "building-blocks-adopcion")) ||
                ((guide.slug === "lenguaje-claro" || guide.slug === "contenido-lenguaje-claro") &&
                  (activeGuideSlug === "lenguaje-claro" ||
                    activeGuideSlug === "contenido-lenguaje-claro"));

              if (isCurrent) {
                return (
                  <div
                    key={guide.id}
                    className="flex items-start gap-2.5 p-3 rounded-[10px] bg-primary/5 relative border-l-4 border-l-primary-container shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-[5px] bg-[#CC0E35] text-white flex items-center justify-center shrink-0 text-[13px] font-bold mt-0.5 font-heading">
                      {guide.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-heading text-sm text-[#CC0E35] font-bold truncate">
                          {guide.title}
                        </p>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#CC0E35] text-white shrink-0 font-body">
                          En lectura
                        </span>
                      </div>
                      <p className="font-body text-xs text-on-surface font-medium line-clamp-1 mt-0.5">
                        {guide.subtitle}
                      </p>
                    </div>
                  </div>
                );
              }

              const targetHref =
                GUIDE_ROUTES[guide.slug] ||
                `/guias-de-vinculacion/diseno-y-usabilidad#${guide.slug}`;

              return (
                <Link
                  key={guide.id}
                  href={targetHref}
                  className="group flex items-start gap-2.5 p-3 rounded-[10px] hover:bg-surface-container-low transition-colors"
                >
                  <div className="w-7 h-7 rounded-[5px] bg-surface-container-highest flex items-center justify-center text-on-surface shrink-0 text-[13px] font-bold mt-0.5 font-heading group-hover:bg-surface-container group-hover:text-primary transition-colors">
                    {guide.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-heading text-sm text-on-surface group-hover:text-primary transition-colors truncate">
                        {guide.title}
                      </p>
                      <span
                        className={`text-[11px] text-on-surface-variant shrink-0 font-body ${guide.tagClass || ""}`}
                      >
                        {guide.tag}
                      </span>
                    </div>
                    <p className="font-body text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                      {guide.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}

            {filteredGuides.length === 0 && (
              <div className="p-6 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl mb-1 text-gray-400">
                  search_off
                </span>
                <p className="text-xs font-semibold">No se encontraron guías</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveRole("Todos");
                  }}
                  className="mt-2 text-xs text-primary underline cursor-pointer"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </nav>

          {/* Help Desk Support Card */}
          <div className="bg-surface-container-low rounded-[10px] p-3 border border-surface-container-highest/60">
            <div className="flex items-start gap-2.5">
              <span
                className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5"
                aria-hidden="true"
              >
                support_agent
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="font-heading text-xs font-bold text-on-surface">¿Dudas?</h2>
                <p className="font-body text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  Escríbenos al email bogotastack@alcaldiabogota.gov.co
                </p>
                <button
                  type="button"
                  onClick={() => setSupportModalOpen(true)}
                  className="mt-1.5 text-xs text-tertiary hover:underline font-semibold block cursor-pointer"
                >
                  Solicitar Acompañamiento OTIC &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Soporte OTIC */}
      {supportModalOpen && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-none m-0"
        >
          <div className="bg-surface rounded-[15px] max-w-md w-full p-6 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between gap-4 border-b border-surface-container-highest pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[5px] bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">support_agent</span>
                </div>
                <div>
                  <h3 id={modalTitleId} className="font-heading text-lg font-bold text-on-surface">
                    Mesa de Ayuda OTIC
                  </h3>
                  <span className="text-xs text-on-surface-variant font-body">
                    Acompañamiento en Homologación de Oferta
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSupportModalOpen(false)}
                aria-label="Cerrar modal de soporte"
                className="w-9 h-9 flex items-center justify-center rounded-[5px] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {supportSuccess ? (
              <div className="p-6 rounded-[10px] bg-green-50 border border-green-200 text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-[#1B7A2E]">verified</span>
                <h4 className="font-heading font-bold text-base text-[#1B7A2E]">
                  ¡Ticket de Acompañamiento Radicado!
                </h4>
                <p className="text-xs text-green-900 font-body">
                  Un arquitecto de soluciones de la Consejería Distrital de TIC responderá en tu
                  correo institucional.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="flex flex-col gap-3 font-body">
                <div>
                  <label
                    htmlFor="support-entity"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Entidad Distrital *
                  </label>
                  <input
                    id="support-entity"
                    type="text"
                    required
                    value={supportEntity}
                    onChange={(e) => setSupportEntity(e.target.value)}
                    placeholder="Ej. Secretaría Distrital de Hábitat"
                    className="w-full min-h-[44px] px-3 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest text-sm focus:ring-2 focus:ring-tertiary focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="support-email"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Correo del Responsable Técnico *
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    required
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="tecnico@entidad.gov.co"
                    className="w-full min-h-[44px] px-3 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest text-sm focus:ring-2 focus:ring-tertiary focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-surface-container-highest flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSupportModalOpen(false)}
                    className="min-h-[44px] px-4 py-2 rounded-[5px] text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 py-2.5 rounded-[5px] bg-primary hover:bg-[#A80B2B] text-on-primary text-xs font-semibold shadow-xs"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}
    </aside>
  );
};
