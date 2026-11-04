"use client";

import {
  Accessibility,
  Bot,
  CheckCircle2,
  CheckSquare,
  Cloud,
  Code2,
  CreditCard,
  Database,
  ExternalLink,
  FileCheck2,
  FileText,
  FileX,
  Layers,
  LayoutGrid,
  Lock,
  Palette,
  Scale,
  Sparkles,
  SplitSquareVertical,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useMemo } from "react";

export interface JtbdItem {
  id: string;
  badge: string;
  badgeClass: string;
  hoverBorderClass: string;
  question: string;
  metadata: string;
  href: string;
  facetCategory: "Guías" | "APIs & SDK" | "Kit UI" | "Normativa";
  iconName: string;
}

const JTBD_ITEMS: JtbdItem[] = [
  {
    id: "job-1",
    badge: "Trámites",
    badgeClass: "bg-primary/10 text-primary",
    hoverBorderClass: "hover:border-primary-container",
    question: "¿Cómo digitalizar un trámite distrital?",
    metadata: "Integración, diseño y normativa",
    href: "/guias-de-vinculacion/integracion-distrital",
    facetCategory: "Guías",
    iconName: "check-square",
  },
  {
    id: "job-2",
    badge: "Kit UI",
    badgeClass: "bg-tertiary/10 text-tertiary",
    hoverBorderClass: "hover:border-tertiary",
    question: "¿Qué componentes UI debo usar?",
    metadata: "Kit UI Distrital",
    href: "/kit-ui/colores",
    facetCategory: "Kit UI",
    iconName: "palette",
  },
  {
    id: "job-3",
    badge: "Normativa SUIT",
    badgeClass: "bg-secondary-container/20 text-on-surface",
    hoverBorderClass: "hover:border-secondary",
    question: "¿Cómo racionalizar un trámite?",
    metadata: "Procesos de racionalización",
    href: "/guias-de-vinculacion#repositorio-normativo",
    facetCategory: "Normativa",
    iconName: "scale",
  },
  {
    id: "job-4",
    badge: "Integración",
    badgeClass: "bg-tertiary/10 text-tertiary",
    hoverBorderClass: "hover:border-tertiary",
    question: "¿Cómo consumir APIs distritales?",
    metadata: "Interopetabilidad y catálogo de APIs",
    href: "/soluciones-compartidas/apis",
    facetCategory: "APIs & SDK",
    iconName: "code-2",
  },
  {
    id: "job-5",
    badge: "Patrones UX",
    badgeClass: "bg-surface-container-high text-on-surface",
    hoverBorderClass: "hover:border-primary",
    question: "¿Cuándo usar un Wizard o paso a paso?",
    metadata: "Momento de la experiencia ciudadana",
    href: "/guias-de-vinculacion/diseno-y-usabilidad",
    facetCategory: "Kit UI",
    iconName: "split",
  },
  {
    id: "job-6",
    badge: "Pagos",
    badgeClass: "bg-primary-container/10 text-primary-container",
    hoverBorderClass: "hover:border-primary-container",
    question: "¿Cómo integrar Pagos Bogotá?",
    metadata: "Secretaría Distrital de Hacienda",
    href: "/soluciones-compartidas/bb-payment",
    facetCategory: "APIs & SDK",
    iconName: "credit-card",
  },
  {
    id: "job-7",
    badge: "Accesibilidad",
    badgeClass: "bg-tertiary/10 text-tertiary",
    hoverBorderClass: "hover:border-tertiary",
    question: "¿Cómo implementar accesibilidad WCAG 2.2?",
    metadata: "Check list de accesibilidad",
    href: "/kit-ui/colores",
    facetCategory: "Kit UI",
    iconName: "accessibility",
  },
  {
    id: "job-8",
    badge: "Developer",
    badgeClass: "bg-surface-container-high text-on-surface",
    hoverBorderClass: "hover:border-primary",
    question: "¿Cómo usar el SDK oficial de Bogotá?",
    metadata: "npm i @bogota/gov-sdk",
    href: "/soluciones-compartidas/sdk-interop",
    facetCategory: "APIs & SDK",
    iconName: "terminal",
  },
  {
    id: "job-9",
    badge: "Autenticación",
    badgeClass: "bg-tertiary/10 text-tertiary",
    hoverBorderClass: "hover:border-tertiary",
    question: "¿Cómo funcionan las Credenciales Verificables CV?",
    metadata: "Autenticación descentralizada",
    href: "/soluciones-compartidas/autenticacion",
    facetCategory: "APIs & SDK",
    iconName: "lock",
  },
  {
    id: "job-10",
    badge: "IA Ética",
    badgeClass: "bg-[#FAB62D]/30 text-on-surface",
    hoverBorderClass: "hover:border-primary-container",
    question: "¿Cómo desplegar agentes de IA?",
    metadata: "Lineamientos distritales sobre IA",
    href: "/ia-distrital",
    facetCategory: "Guías",
    iconName: "bot",
  },
  {
    id: "job-11",
    badge: "Infraestructura",
    badgeClass: "bg-surface-container-high text-on-surface",
    hoverBorderClass: "hover:border-tertiary",
    question: "¿Cómo solicitar sandbox de pruebas interoperables?",
    metadata: "Ambiente de pruebas",
    href: "/developer-kit",
    facetCategory: "APIs & SDK",
    iconName: "cloud",
  },
  {
    id: "job-12",
    badge: "Lenguaje claro",
    badgeClass: "bg-secondary-container/20 text-on-surface",
    hoverBorderClass: "hover:border-secondary",
    question: "¿Cómo debo comunicarme con la ciudadanía?",
    metadata: "Guía de lenguaje claro",
    href: "/guias-de-vinculacion/contenido-lenguaje-claro",
    facetCategory: "Normativa",
    iconName: "database",
  },
  {
    id: "job-13",
    badge: "Contenido",
    badgeClass: "bg-primary/10 text-primary",
    hoverBorderClass: "hover:border-primary",
    question: "¿Cuales son los lineamiento de atención a la ciudadanía?",
    metadata: "Política pública de servicio a la ciudadanía",
    href: "/guias-de-vinculacion#repositorio-normativo",
    facetCategory: "Guías",
    iconName: "file-text",
  },
  {
    id: "job-14",
    badge: "Cero Papel",
    badgeClass: "bg-tertiary/10 text-tertiary",
    hoverBorderClass: "hover:border-tertiary",
    question: "¿Cómo valido al identidad de la ciudadanía?",
    metadata: "Consultas a Webservice de la Registraduría",
    href: "/guias-de-vinculacion/diseno-y-usabilidad",
    facetCategory: "Normativa",
    iconName: "file-check",
  },
];

export interface JtbdGridProps {
  searchQuery?: string;
  activeFacet?: string;
}

export const JtbdGrid: React.FC<JtbdGridProps> = ({ searchQuery = "", activeFacet = "Todo" }) => {
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return JTBD_ITEMS.filter((item) => {
      // Filtro por faceta (si no es 'Todo')
      if (activeFacet !== "Todo" && item.facetCategory !== activeFacet) {
        return false;
      }
      // Filtro por texto
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.metadata.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeFacet]);

  const renderIcon = (name: string) => {
    const props = { className: "w-3.5 h-3.5", "aria-hidden": true } as const;
    switch (name) {
      case "check-square":
        return <CheckSquare {...props} />;
      case "palette":
        return <Palette {...props} />;
      case "scale":
        return <Scale {...props} />;
      case "code-2":
        return <Code2 {...props} />;
      case "split":
        return <SplitSquareVertical {...props} />;
      case "credit-card":
        return <CreditCard {...props} />;
      case "accessibility":
        return <Accessibility {...props} />;
      case "terminal":
        return <Terminal {...props} />;
      case "lock":
        return <Lock {...props} />;
      case "bot":
        return <Bot {...props} />;
      case "cloud":
        return <Cloud {...props} />;
      case "database":
        return <Database {...props} />;
      case "file-text":
        return <FileText {...props} />;
      case "file-check":
        return <FileCheck2 {...props} />;
      default:
        return <CheckCircle2 {...props} />;
    }
  };

  return (
    <section aria-labelledby="jtbd-heading" className="w-full bg-surface-container-low py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:gap-5">
        {/* Header de la sección con badge de acento amarillo */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-btn bg-[#FAB62D] text-[#1b1c1c] text-xs font-semibold mb-1.5">
            <Zap className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            <span>Acceso Rápido para Funcionarios y Equipos Técnicos</span>
          </div>
          <h2
            id="jtbd-heading"
            className="font-heading text-xl sm:text-2xl text-on-surface font-bold tracking-tight"
          >
            Preguntas frecuentes y tareas clave
          </h2>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-0.5 max-w-3xl">
            Guías, normatividad y componentes técnicos para agilizar la digitalización de
            servicios.
          </p>
        </div>

        {/* Grid interactivo de tarjetas JTBD */}
        {filteredItems.length > 0 ? (
          <div
            id="jtbd-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3"
          >
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex flex-col justify-between p-3 bg-surface-container-lowest hover:bg-surface rounded-card border border-surface-container-highest ${item.hoverBorderClass} shadow-xs hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none min-h-[95px] sm:min-h-[100px]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded-btn text-[10px] font-semibold ${item.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                    <ExternalLink
                      className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-heading text-xs sm:text-[13px] leading-snug font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    {item.question}
                  </h3>
                </div>

                <p className="font-body text-[11px] text-on-surface-variant mt-2 flex items-center gap-1.5 pt-1.5 border-t border-gray-100">
                  {renderIcon(item.iconName)}
                  <span className="truncate">{item.metadata}</span>
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-surface-container-lowest rounded-card border border-surface-container-highest">
            <FileX className="w-10 h-10 text-gray-400 mx-auto mb-2" aria-hidden="true" />
            <p className="font-heading font-bold text-base text-text-main">
              No se encontraron tareas para &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-text-muted mt-1">
              Prueba con términos como &ldquo;pagos&rdquo;, &ldquo;accesibilidad&rdquo;,
              &ldquo;cédula&rdquo; o &ldquo;trámites&rdquo;.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
