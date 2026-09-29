"use client";

import Image from "next/image";
import type React from "react";
import { useId, useState } from "react";

export type CategoryFilter = "all" | "clinica" | "ibo" | "dafp" | "ux";

interface LearningCardData {
  id: string;
  categories: CategoryFilter[];
  badge: string;
  badgeClass: string;
  image?: string;
  isDirectIntervention?: boolean;
  title: string;
  description: string;
  metaIcon: string;
  metaText: string;
  ctaText: string;
  ctaType: "link" | "button";
  details: {
    stages: string[];
    deliverables: string;
    targetAudience: string;
  };
}

const LEARNING_CARDS: LearningCardData[] = [
  {
    id: "racionalizacion-tramites",
    categories: ["clinica", "dafp"],
    badge: "Clínica de Trámites",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    image: "/images/hub/racionalizacion.jpg",
    title: "Guía de Racionalización de Trámites",
    description:
      "Método paso a paso para eliminar requisitos redundantes, reducir tiempos de respuesta e integrar interoperabilidad  en el marco distrital.",
    metaIcon: "layers",
    metaText: "4 etapas • 12 plantillas • 3 semanas",
    ctaText: "Explorar Ruta",
    ctaType: "link",
    details: {
      stages: [
        "1. Diagnóstico de inventario SUIT y volumen de solicitudes",
        "2. Identificación de cuellos de botella y requisitos ilegales",
        "3. Interoperabilidad Once-Only con B-Data / ",
        "4. Homologación formal ante Secretaría General y DAFP",
      ],
      deliverables: "Plantilla matriz de racionalización, formato DAFP y cálculo de costo evitado.",
      targetAudience:
        "Líderes de atención al ciudadano y arquitectos de procesos de entidades distritales.",
    },
  },
  {
    id: "innovacion-ibo",
    categories: ["ibo"],
    badge: "Laboratorio de Innovación iBO",
    badgeClass: "bg-primary/10 text-primary",
    image: "/images/hub/innovacion-ibo.jpg",
    title: "Metodologías de Innovación Pública iBO",
    description:
      "Herramientas de co-creación con ciudadanía, experimentación ágil y prototipado rápido en servicios gubernamentales del Distrito.",
    metaIcon: "auto_awesome",
    metaText: "Toolkit de 8 dinámicas • Casos reales",
    ctaText: "Explorar Ruta",
    ctaType: "link",
    details: {
      stages: [
        "1. Inmersión etnográfica y escucha activa ciudadana",
        "2. Talleres de co-diseño intersectorial distrital",
        "3. Prototipado exprés de soluciones B2G y G2C",
        "4. Testeo en SuperCADE y medición de satisfacción",
      ],
      deliverables: "Guía de facilitación iBO, canvas de problemas públicos y kit de dinámicas.",
      targetAudience: "Equipos de innovación, diseñadores de experiencia y servidores públicos.",
    },
  },
  {
    id: "diseno-servicios-ux",
    categories: ["ux"],
    badge: "UX de Servicios Distritales",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    image: "/images/hub/diseno-servicios.jpg",
    title: "Diseño de Servicios Centrado en la Ciudadanía",
    description:
      "Técnicas de investigación cualitativa, mapas de empatía y viaje del ciudadano (Customer Journey) para evitar fricciones y barreras de acceso.",
    metaIcon: "groups",
    metaText: "Guía metodológica • Canvas de trámites",
    ctaText: "Explorar Ruta",
    ctaType: "link",
    details: {
      stages: [
        "1. Mapeo del Customer Journey Map y momentos de dolor",
        "2. Definición de arquetipos ciudadanos incluyentes",
        "3. Pruebas de usabilidad con Kit UI Bogotá",
        "4. Validación de accesibilidad para personas con discapacidad",
      ],
      deliverables:
        "Plantilla Figma de Customer Journey, arquetipos distritales y checklist WCAG 2.2.",
      targetAudience: "Diseñadores UX/UI, desarrolladores frontend y comunicadores distritales.",
    },
  },
  {
    id: "asistencia-tecnica-clinica",
    categories: ["clinica"],
    badge: "Asistencia Técnica",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed",
    isDirectIntervention: true,
    title: "Clínica de Trámites",
    description:
      "Acompañamiento por iBO y la Secretaría General para rediseñar trámites con alto volumen o quejas recurrentes en SUIT.",
    metaIcon: "support_agent",
    metaText: "Acompañamiento prioritario SGAB",
    ctaText: "Agendar Clínica",
    ctaType: "button",
    details: {
      stages: [
        "1. Postulación del trámite crítico por parte de la entidad",
        "2. Mesa técnica conjunta con Secretaría General e iBO",
        "3. Simulación de rediseño en 48 horas",
        "4. Plan de contingencia y ruta de digitalización Bogotá Stack",
      ],
      deliverables: "Concepto técnico vinculante y plan acelerado de simplificación.",
      targetAudience:
        "Secretarios Generales, directores de TIC y gerentes de proyectos distritales.",
    },
  },
];

const FILTER_OPTIONS = [
  { id: "all" as CategoryFilter, label: "Todos" },
  { id: "clinica" as CategoryFilter, label: "Clínica de Trámites" },
  { id: "ibo" as CategoryFilter, label: "Laboratorio iBO" },
  { id: "dafp" as CategoryFilter, label: "Racionalización DAFP" },
  { id: "ux" as CategoryFilter, label: "Diseño UX Ciudadano" },
];

export const LearningRoutesGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [selectedRoute, setSelectedRoute] = useState<LearningCardData | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [entityName, setEntityName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [procedureName, setProcedureName] = useState("");

  const routeDialogTitleId = useId();
  const bookingDialogTitleId = useId();

  const filteredCards = LEARNING_CARDS.filter((card) => {
    if (activeFilter === "all") return true;
    return card.categories.includes(activeFilter);
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setEntityName("");
      setContactEmail("");
      setProcedureName("");
    }, 2500);
  };

  return (
    <section className="w-full bg-background py-12 md:py-16" id="rutas-innovacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Interactive Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                school
              </span>
              <span>Clínica de Trámites &amp; Laboratorio iBO</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-on-surface font-bold">
              Rutas de Aprendizaje e Innovación Pública
            </h2>
            <p className="font-body text-base text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Metodologías activas, cajas de herramientas descargables y asistencia técnica
              especializada para transformar la experiencia ciudadana.
            </p>
          </div>

          {/* Filter Pills Bar (Scroll horizontal en móvil, área táctil >= 44px) */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar"
            role="tablist"
            aria-label="Filtros de rutas de innovación"
          >
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`min-h-[44px] px-4 py-2 rounded-[5px] text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none ${isActive
                      ? "bg-primary text-on-primary font-semibold shadow-sm"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                    }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Innovation Cards Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <article
              key={card.id}
              className="rounded-[15px] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden border border-surface-container-highest/60 hover:border-outline-variant group"
            >
              {/* Media Header */}
              {card.isDirectIntervention ? (
                <div className="h-44 w-full relative overflow-hidden bg-primary/10 flex items-center justify-center">
                  <div className="text-center p-4">
                    <span
                      className="material-symbols-outlined text-[48px] text-primary"
                      aria-hidden="true"
                    >
                      support_agent
                    </span>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mt-1 font-heading">
                      Intervención Directa
                    </p>
                  </div>
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-[5px] ${card.badgeClass} text-xs font-semibold tracking-wide shadow-xs`}
                  >
                    {card.badge}
                  </span>
                </div>
              ) : (
                <div className="h-44 w-full relative overflow-hidden bg-surface-container">
                  {card.image && (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-[5px] ${card.badgeClass} text-xs font-semibold tracking-wide shadow-xs`}
                  >
                    {card.badge}
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-2 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant font-body">
                    <span
                      className={`material-symbols-outlined text-[18px] ${card.isDirectIntervention ? "text-primary" : "text-tertiary"
                        }`}
                      aria-hidden="true"
                    >
                      {card.metaIcon}
                    </span>
                    <span className="font-medium text-on-surface">{card.metaText}</span>
                  </div>

                  {card.ctaType === "button" ? (
                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(true)}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-[5px] bg-primary hover:bg-[#A80B2B] text-on-primary text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
                    >
                      <span>{card.ctaText}</span>
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        calendar_month
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedRoute(card)}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-[5px] bg-transparent text-primary hover:bg-primary/5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    >
                      <span>{card.ctaText}</span>
                      <span
                        className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      >
                        arrow_forward
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state si no hay tarjetas */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12 bg-surface-container-low rounded-[15px] border border-surface-container-highest">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
              filter_alt_off
            </span>
            <p className="font-heading text-lg font-bold text-on-surface">
              No hay metodologías para este filtro
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="mt-4 px-4 py-2 min-h-[44px] bg-primary text-on-primary rounded-[5px] text-sm font-semibold"
            >
              Ver todas las rutas
            </button>
          </div>
        )}
      </div>

      {/* Modal 1: Explorar Ruta Metodológica */}
      {selectedRoute && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby={routeDialogTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-none m-0"
        >
          <div className="bg-surface rounded-[15px] max-w-xl w-full p-6 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-surface-container-highest pb-3">
              <div>
                <span
                  className={`px-2 py-0.5 rounded-[5px] text-xs font-semibold ${selectedRoute.badgeClass}`}
                >
                  {selectedRoute.badge}
                </span>
                <h3
                  id={routeDialogTitleId}
                  className="font-heading text-xl font-bold text-on-surface mt-2"
                >
                  {selectedRoute.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRoute(null)}
                aria-label="Cerrar modal"
                className="w-9 h-9 flex items-center justify-center rounded-[5px] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {selectedRoute.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-heading text-sm font-bold text-on-surface uppercase tracking-wider">
                Etapas Metodológicas
              </h4>
              <ul className="space-y-2 text-sm text-on-surface font-body">
                {selectedRoute.details.stages.map((st) => (
                  <li key={st} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container space-y-2">
              <p className="text-xs text-on-surface-variant">
                <strong className="text-on-surface">Entregables:</strong>{" "}
                {selectedRoute.details.deliverables}
              </p>
              <p className="text-xs text-on-surface-variant">
                <strong className="text-on-surface">Público Objetivo:</strong>{" "}
                {selectedRoute.details.targetAudience}
              </p>
            </div>

            <div className="pt-3 border-t border-surface-container-highest flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedRoute(null)}
                className="min-h-[44px] px-4 py-2 rounded-[5px] text-sm font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Cerrar
              </button>
              <a
                href="/guias-de-vinculacion"
                className="min-h-[44px] px-5 py-2.5 rounded-[5px] bg-primary text-on-primary text-sm font-semibold flex items-center gap-2 hover:bg-[#A80B2B] transition-colors"
              >
                <span>Ir a Guías de Vinculación</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal 2: Agendar Clínica de Trámites */}
      {bookingModalOpen && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby={bookingDialogTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-none m-0"
        >
          <div className="bg-surface rounded-[15px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between gap-4 border-b border-surface-container-highest pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[5px] bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                </div>
                <div>
                  <h3
                    id={bookingDialogTitleId}
                    className="font-heading text-lg sm:text-xl font-bold text-on-surface"
                  >
                    Agendar Clínica de Trámites
                  </h3>
                  <span className="text-xs text-on-surface-variant">
                    Asistencia Técnica Presencial / Virtual SGAB &amp; iBO
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                aria-label="Cerrar formulario de agendamiento"
                className="w-9 h-9 flex items-center justify-center rounded-[5px] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 rounded-[10px] bg-green-50 border border-green-200 text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-[#1B7A2E]">verified</span>
                <h4 className="font-heading font-bold text-lg text-[#1B7A2E]">
                  ¡Solicitud de Clínica Radicada!
                </h4>
                <p className="text-sm text-green-900 font-body">
                  El equipo de la Subsecretaría de Servicio a la Ciudadanía e iBO te contactará en
                  menos de 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4 font-body">
                <div>
                  <label
                    htmlFor="entity-input"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Entidad Distrital *
                  </label>
                  <input
                    id="entity-input"
                    type="text"
                    required
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    placeholder="Ej. Secretaría Distrital de Movilidad"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="procedure-input"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Nombre del Trámite o Código SUIT *
                  </label>
                  <input
                    id="procedure-input"
                    type="text"
                    required
                    value={procedureName}
                    onChange={(e) => setProcedureName(e.target.value)}
                    placeholder="Ej. Permiso de Cierre de Vías / SUIT-BOG-492"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email-input"
                    className="block text-xs font-semibold text-on-surface uppercase mb-1"
                  >
                    Correo Institucional del Responsable *
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="nombre.apellido@alcaldiabogota.gov.co"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[5px] bg-surface-container-low text-on-surface border border-surface-container-highest focus:ring-2 focus:ring-tertiary focus:outline-none text-sm"
                  />
                </div>

                <div className="pt-3 border-t border-surface-container-highest flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="min-h-[44px] px-4 py-2 rounded-[5px] text-sm font-semibold text-on-surface-variant hover:bg-surface-container"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-6 py-2.5 rounded-[5px] bg-primary hover:bg-[#A80B2B] text-on-primary text-sm font-semibold flex items-center gap-2 shadow-sm transition-all focus:ring-2 focus:ring-tertiary"
                  >
                    <span>Solicitar Asistencia</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}
    </section>
  );
};
