"use client";

import {
  ArrowRight,
  BookOpen,
  Code2,
  ExternalLink,
  Layers,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import type { RoleFilter } from "./GuidesFilterBar";

export interface GuideMasterItem {
  id: string;
  number: string;
  title: string;
  fullName: string;
  description: string;
  roles: ("estrategico" | "ux-ui" | "ingenieria")[];
  primaryRoleLabel: string;
  route: string;
  isExternal?: boolean;
  tags: string[];
}

export const MASTER_GUIDES: GuideMasterItem[] = [
  {
    id: "integracion-distrital",
    number: "1.2",
    title: "Integración Distrital al Portal",
    fullName: "Guía de Integración Distrital",
    description:
      "Metodología, niveles de madurez y requisitos técnicos/jurídicos para integrar la oferta de trámites y servicios al Portal Transaccional.",
    roles: ["estrategico"],
    primaryRoleLabel: "Estratégico",
    route: "/guias-de-vinculacion/integracion-distrital",
    tags: ["Portal Transaccional", "Homologación", "Madurez", "Ventanilla Única"],
  },
  {
    id: "diseno-y-usabilidad",
    number: "1.3",
    title: "Diseño y Usabilidad",
    fullName: "Guía de Diseño y Usabilidad",
    description:
      "Patrones de interacción, wizards transaccionales (Stepper), formularios Once-Only, heurísticas de usabilidad y lenguaje claro.",
    roles: ["ux-ui"],
    primaryRoleLabel: "UX / UI",
    route: "/guias-de-vinculacion/diseno-y-usabilidad",
    tags: ["Stepper", "Formularios", "Heurísticas", "Microcopy", "Kit UI"],
  },
  {
    id: "kit-ui-bogota",
    number: "1.4",
    title: "Kit UI Bogotá",
    fullName: "Kit UI Bogotá",
    description:
      "Tokens de diseño, tipografía Montserrat/Work Sans, paleta de colores y librería de componentes.",
    roles: ["ux-ui"],
    primaryRoleLabel: "UX / UI",
    route: "/guias-de-vinculacion/kit-ui-bogota",
    tags: ["Tokens", "Colores", "Figma", "Componentes", "Web Components"],
  },
  {
    id: "contenido-lenguaje-claro",
    number: "1.5",
    title: "Contenido y Lenguaje Claro",
    fullName: "Guía de Contenido y Lenguaje Claro",
    description:
      "Guía de redacción, microcopy accesible, tono institucional empático y eliminación de barreras léxicas en trámites públicos.",
    roles: ["ux-ui"],
    primaryRoleLabel: "UX / UI",
    route: "/guias-de-vinculacion/lenguaje-claro",
    tags: ["Redacción", "Lenguaje Claro", "Accesibilidad Cognitiva"],
  },
  {
    id: "interoperabilidad",
    number: "1.6",
    title: "Interoperabilidad Distrital",
    fullName: "Guía de Interoperabilidad Distrital",
    description:
      "Arquitectura de integración segura con el bus , EventStore Kafka, políticas mTLS y cliente oficial @bogota/gov-sdk.",
    roles: ["ingenieria"],
    primaryRoleLabel: "Dev",
    route: "/guias-de-vinculacion/interoperabilidad",
    tags: ["", "mTLS", "Kafka", "@bogota/gov-sdk", "Seguridad"],
  },
  {
    id: "autenticacion",
    number: "1.7",
    title: "Vinculación Autenticación",
    fullName: "Guía de Vinculación Autenticación",
    description:
      "Implementación de Single Sign-On (SSO) federado con Keycloak, biometría RNEC, y credenciales descentralizadas W3C (DIDs/VCs).",
    roles: ["ingenieria"],
    primaryRoleLabel: "Dev",
    route: "/guias-de-vinculacion/autenticacion",
    tags: ["Keycloak", "OIDC", "RNEC", "Cédula Digital", "W3C DIDs"],
  },
  {
    id: "bb-adopcion",
    number: "1.8",
    title: "Building Blocks: Adopción Estratégica",
    fullName: "Guía Building Blocks: Adopción Estratégica",
    description:
      "Modelo de capacidades reutilizables GovStack, análisis de costo-beneficio (ROI -70%) y criterios para reutilización de componentes comunes.",
    roles: ["estrategico"],
    primaryRoleLabel: "Estratégico",
    route: "/guias-de-vinculacion/bb-adopcion",
    tags: ["GovStack", "ROI", "Capacidades Reutilizables", "BOGDATA"],
  },
  {
    id: "bb-tecnica",
    number: "1.9",
    title: "Building Blocks: Implementación Técnica",
    fullName: "Guía Building Blocks: Implementación Técnica",
    description:
      "Especificación técnica, endpoints RESTful, webhooks, eventos mTLS y sandboxes para pasarela de pagos B-Pay y notificaciones.",
    roles: ["ingenieria"],
    primaryRoleLabel: "Dev",
    route: "/soluciones-compartidas/bb-payment",
    tags: ["B-Pay", "RESTful", "Webhooks", "Sandbox", "mTLS"],
  },
  {
    id: "integracion-datos",
    number: "1.10",
    title: "Integración de Datos (DWH)",
    fullName: "Guía de Integración de Datos (DWH)",
    description:
      "Lineamientos de ingestión, modelos de datos canónicos distritales, trazabilidad analítica y sincronización con el Data Warehouse distrital.",
    roles: ["ingenieria"],
    primaryRoleLabel: "Dev",
    route: "/soluciones-compartidas",
    tags: ["DWH", "OpenAPI 3.1", "Trazabilidad", "Modelos Canónicos"],
  },
  {
    id: "accesibilidad",
    number: "1.11",
    title: "Accesibilidad Digital (WCAG 2.2 AA)",
    fullName: "Guía de Accesibilidad Digital (WCAG 2.2 AA)",
    description:
      "Criterios de éxito WCAG 2.2 Nivel AA/AAA, navegación por teclado, contraste cromático, lectores de pantalla y auditoría técnica.",
    roles: ["ux-ui", "ingenieria"],
    primaryRoleLabel: "UX/UI / Dev",
    route: "/kit-ui/colores",
    tags: ["WCAG 2.2", "Teclado", "ARIA", "Contraste", "Auditoría"],
  },
];

import type { GuiaVinculacion } from "@/types/guide";

export interface GuideCardListProps {
  searchQuery: string;
  selectedRole: RoleFilter;
  onResetFilters: () => void;
  guides?: GuiaVinculacion[];
}

export default function GuideCardList({
  searchQuery,
  selectedRole,
  onResetFilters,
  guides,
}: GuideCardListProps) {
  // Construir lista dinámica si fue provista desde Firestore / CMS
  const baseGuides: GuideMasterItem[] = useMemo(() => {
    if (guides && guides.length > 0) {
      return guides.map((g) => {
        const auds = g.audiencias || g.audiences || ["UX / UI"];
        const roles: ("estrategico" | "ux-ui" | "ingenieria")[] = [];
        for (const a of auds) {
          if (a.includes("Directivo") || a.includes("Estratégico")) roles.push("estrategico");
          else if (a.includes("UX") || a.includes("UI")) roles.push("ux-ui");
          else if (a.includes("Ingeniería") || a.includes("Dev")) roles.push("ingenieria");
        }
        if (roles.length === 0) roles.push("ux-ui");

        return {
          id: g.id || g.slug,
          number: g.numeroIdentificador || g.number || "1.X",
          title: g.titulo || g.title || "Guía Distrital",
          fullName: g.titulo || g.title || "Guía de Vinculación",
          description: g.resumenEjecutivo || g.summary || "",
          roles,
          primaryRoleLabel: roles.includes("estrategico")
            ? "Estratégico"
            : roles.includes("ingenieria")
              ? "Ingeniería"
              : "UX / UI",
          route: `/guias-de-vinculacion/${g.slug}`,
          tags: g.badges && g.badges.length > 0 ? g.badges : [g.categoriaPrincipal || g.category || "Distrital"],
        };
      });
    }
    return MASTER_GUIDES;
  }, [guides]);

  // Filtrado reactivo en tiempo real
  const filteredGuides = useMemo(() => {
    return baseGuides.filter((guide) => {
      // Filtro por rol
      const matchesRole = selectedRole === "todas" || guide.roles.includes(selectedRole);

      // Filtro por búsqueda de texto
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesRole;

      const matchesText =
        guide.number.toLowerCase().includes(query) ||
        guide.title.toLowerCase().includes(query) ||
        guide.fullName.toLowerCase().includes(query) ||
        guide.description.toLowerCase().includes(query) ||
        guide.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesRole && matchesText;
    });
  }, [searchQuery, selectedRole]);

  if (filteredGuides.length === 0) {
    return (
      <div
        id="guides-grid-region"
        role="region"
        aria-live="polite"
        className="w-full p-10 sm:p-14 bg-surface-container-lowest border border-surface-container-high rounded-[15px] text-center flex flex-col items-center justify-center gap-4 shadow-sm"
      >
        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
          <Search className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="max-w-md">
          <h3 className="font-heading text-lg font-bold text-on-surface">
            No se encontraron guías que coincidan
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            No hay guías que correspondan al término &ldquo;{searchQuery}&rdquo; en la categoría
            seleccionada.
          </p>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-primary text-white text-xs font-heading font-semibold hover:bg-primary-hover transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2 min-h-[44px]"
        >
          <span>Restablecer Filtros</span>
        </button>
      </div>
    );
  }

  return (
    <div
      id="guides-grid-region"
      role="region"
      aria-live="polite"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredGuides.map((guide) => {
        // Estilos contextuales de badge según perfil
        const isEstrategico = guide.roles.includes("estrategico") && !guide.roles.includes("ux-ui");
        const isUx = guide.roles.includes("ux-ui") && !guide.roles.includes("ingenieria");
        const isIngenieria = guide.roles.includes("ingenieria") && !guide.roles.includes("ux-ui");
        const isMixto = guide.roles.includes("ux-ui") && guide.roles.includes("ingenieria");

        let badgeStyles = "bg-primary/10 text-primary border-primary/20";
        if (isUx) badgeStyles = "bg-tertiary/10 text-tertiary border-tertiary/20";
        if (isIngenieria) badgeStyles = "bg-emerald-100 text-emerald-800 border-emerald-200";
        if (isMixto) badgeStyles = "bg-purple-100 text-purple-800 border-purple-200";

        return (
          <article
            key={guide.id}
            className="flex flex-col justify-between bg-surface-container-lowest border border-surface-container-high rounded-[15px] p-6 shadow-sm hover:shadow-md transition-all hover:border-surface-container-highest group relative focus-within:ring-2 focus-within:ring-[#0049AE]"
          >
            <div className="flex flex-col gap-4">
              {/* Etiqueta superior (Badge de perfil) */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] text-[11px] font-heading font-bold uppercase tracking-wider border ${badgeStyles}`}
                >
                  {isEstrategico && <ShieldCheck className="w-3 h-3" />}
                  {isUx && <Palette className="w-3 h-3" />}
                  {isIngenieria && <Code2 className="w-3 h-3" />}
                  {isMixto && <Sparkles className="w-3 h-3" />}
                  <span>{guide.primaryRoleLabel}</span>
                </span>
              </div>

              {/* Título H3 */}
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                <Link
                  href={guide.route}
                  className="focus:outline-none focus:underline after:absolute after:inset-0"
                >
                  {guide.fullName}
                </Link>
              </h3>

              {/* Párrafo descriptivo del propósito */}
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                {guide.description}
              </p>

              {/* Tags clave */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-[4px] bg-surface-container-low text-[10px] font-medium text-on-surface-variant border border-surface-container-high/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Botón / Enlace Leer Guía */}
            <div className="pt-5 mt-5 border-t border-surface-container-high flex items-center justify-between relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-primary group-hover:text-primary-hover transition-colors min-h-[44px]">
                <span>Leer Guía</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
