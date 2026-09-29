import { ArrowRight, BookOpen, FileCheck2, Lightbulb, Scale, TrendingUp } from "lucide-react";
import Link from "next/link";
import type React from "react";

export interface QuickEntryCard {
  id: string;
  badge: string;
  iconSymbol: string;
  fallbackIcon: React.ReactNode;
  iconContainerClass: string;
  title: string;
  description: string;
  ctaText: string;
  href: string;
  hoverTextClass: string;
  ctaTextClass: string;
}

const QUICK_CARDS: QuickEntryCard[] = [
  {
    id: "racionalizacion",
    badge: "Guía Paso a Paso",
    iconSymbol: "trending_up",
    fallbackIcon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,
    iconContainerClass: "bg-secondary-container/30 text-on-secondary-container",
    title: "¿Cómo racionalizar un trámite distrital?",
    description: "Etapas para racionalizar un trámite y simplificar flujos.",
    ctaText: "Ver ruta de simplificación",
    href: "#rutas-innovacion",
    hoverTextClass: "group-hover:text-primary",
    ctaTextClass: "text-primary",
  },
  {
    id: "normas",
    badge: "Base Habilitante",
    iconSymbol: "policy",
    fallbackIcon: <Scale className="w-5 h-5" aria-hidden="true" />,
    iconContainerClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    title: "¿Qué normas y decretos debo cumplir?",
    description: "Catálogo distrital de obligatoriedad técnica, datos abiertos y estándares.",
    ctaText: "Consultar matriz legal",
    href: "#repositorio-normativo",
    hoverTextClass: "group-hover:text-tertiary",
    ctaTextClass: "text-tertiary",
  },
  {
    id: "innovacion-ibo",
    badge: "Laboratorio de Innovación",
    iconSymbol: "psychology",
    fallbackIcon: <Lightbulb className="w-5 h-5" aria-hidden="true" />,
    iconContainerClass: "bg-primary/10 text-primary",
    title: "¿Cómo aplicar innovación pública iBO?",
    description:
      "Dinámicas participativas, prototipado exprés y testeo de servicios con la ciudadanía.",
    ctaText: "Acceder a los toolkits de iBO",
    href: "#rutas-innovacion",
    hoverTextClass: "group-hover:text-primary",
    ctaTextClass: "text-primary",
  },
];

export const KnowledgeHeroCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      {QUICK_CARDS.map((card) => (
        <a
          key={card.id}
          href={card.href}
          className="group p-6 rounded-[15px] bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between gap-6 border border-surface-container-highest/60 hover:border-outline-variant hover:shadow-sm focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none"
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={`w-10 h-10 rounded-[5px] flex items-center justify-center group-hover:scale-105 transition-transform ${card.iconContainerClass}`}
            >
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                {card.iconSymbol}
              </span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-body">
              {card.badge}
            </span>
          </div>

          <div>
            <h2
              className={`font-heading text-lg font-bold text-on-surface leading-snug transition-colors ${card.hoverTextClass}`}
            >
              {card.title}
            </h2>
            <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">
              {card.description}
            </p>
          </div>

          <div
            className={`flex items-center font-body text-sm font-semibold gap-1.5 ${card.ctaTextClass}`}
          >
            <span>{card.ctaText}</span>
            <span
              className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};
