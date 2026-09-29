import CodeBlock from "@/components/guias/CodeBlock";
import { GuidesSidebarNav } from "@/components/guias/GuidesSidebarNav";
import { HorizontalMomentsAxis } from "@/components/guias/HorizontalMomentsAxis";
import IaiFormulaBox from "@/components/guias/IaiFormulaBox";
import { LanguageClaroChecklist } from "@/components/guias/LanguageClaroChecklist";
import MaturityMatrixTable from "@/components/guias/MaturityMatrixTable";
import { PlainLanguageComparisonCard } from "@/components/guias/PlainLanguageComparisonCard";
import { SdkCodeSnippet } from "@/components/guias/SdkCodeSnippet";
import { UxPrinciplesCards } from "@/components/guias/UxPrinciplesCards";
import { VerticalStepperPlayground } from "@/components/guias/VerticalStepperPlayground";
import { getGuiaBySlug, getGuias } from "@/lib/firebase/db";
import type { ContentBlock } from "@/types/guide";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Info,
  Layers,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Metadatos dinámicos generados a partir de los datos en Firestore / store distrital
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guia = await getGuiaBySlug(params.slug);

  if (!guia) {
    return {
      title: "Guía de Vinculación no encontrada | Bogotá Stack",
      description: "La guía solicitada no existe o ha sido despublicada del catálogo distrital.",
    };
  }

  const num = guia.numeroIdentificador || guia.number || "";
  const tit = guia.titulo || guia.title || "";
  const desc =
    guia.resumenEjecutivo ||
    guia.summary ||
    "Especificación técnica oficial y estándar distrital de vinculación al Portal Transaccional de Bogotá D.C.";

  return {
    title: `${num ? `Guía ${num}: ` : ""}${tit} | Bogotá Stack`,
    description: desc,
  };
}

/**
 * Renderizador de bloques de contenido dinámicos
 */
function renderContentBlock(block: ContentBlock, index: number) {
  if (block.type === "texto" && block.content?.text?.html) {
    return (
      <section
        key={block.id || `b-text-${index}`}
        aria-label={`Bloque de contenido ${block.order || index + 1}`}
        className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high font-body text-on-surface"
      >
        <div
          className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-on-surface
            prose-headings:font-heading prose-headings:font-extrabold prose-headings:text-on-surface
            prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:border-b prose-h2:border-surface-container-high prose-h2:pb-2 prose-h2:mt-0 prose-h2:mb-4
            prose-h3:text-lg sm:prose-h3:text-xl prose-h3:text-primary prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-on-surface-variant prose-p:mb-4
            prose-strong:text-on-surface prose-strong:font-bold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-li:text-on-surface-variant prose-li:mb-1
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Contenido enriquecido gestionado desde el CMS oficial distrital
          dangerouslySetInnerHTML={{ __html: block.content.text.html }}
        />
      </section>
    );
  }

  if (block.type === "alerta" && block.content?.alert) {
    const alert = block.content.alert;
    const variantStyles = {
      info: {
        container: "bg-[#EBF2FC] border-[#0049AE]/30 text-[#002B66]",
        icon: Info,
        iconColor: "text-[#0049AE]",
        titleColor: "text-[#0049AE]",
      },
      warning: {
        container: "bg-[#FEF9E7] border-[#FAB62D]/60 text-[#594000]",
        icon: AlertTriangle,
        iconColor: "text-[#B37B00]",
        titleColor: "text-[#B37B00]",
      },
      success: {
        container: "bg-[#EAF5EC] border-[#1B7A2E]/30 text-[#0A3D14]",
        icon: CheckCircle2,
        iconColor: "text-[#1B7A2E]",
        titleColor: "text-[#1B7A2E]",
      },
      error: {
        container: "bg-[#FDF2F4] border-[#CC0E35]/30 text-[#5C0617]",
        icon: AlertCircle,
        iconColor: "text-[#CC0E35]",
        titleColor: "text-[#CC0E35]",
      },
    };

    const style = variantStyles[alert.variant] || variantStyles.info;
    const Icon = style.icon;

    return (
      <div
        key={block.id || `b-alert-${index}`}
        role="alert"
        className={`rounded-[12px] p-5 border flex items-start gap-4 shadow-2xs font-body ${style.container}`}
      >
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.iconColor}`} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          {alert.title && (
            <h3 className={`font-heading font-bold text-sm sm:text-base mb-1 ${style.titleColor}`}>
              {alert.title}
            </h3>
          )}
          <p className="text-xs sm:text-sm leading-relaxed">{alert.message}</p>
        </div>
      </div>
    );
  }

  if (block.type === "codigo" && block.content?.code) {
    return (
      <div key={block.id || `b-code-${index}`} className="w-full">
        <CodeBlock
          code={block.content.code.code}
          language={block.content.code.language}
          title={block.content.code.filename}
        />
      </div>
    );
  }

  if (block.type === "componente" && block.content?.component) {
    const comp = block.content.component;
    const cId = (comp.componentId || "").toLowerCase();

    // Inyección de componentes interactivos GovTech
    if (cId === "checklist" || cId === "language-claro-checklist") {
      return (
        <section key={block.id || `b-comp-${index}`} className="w-full">
          <LanguageClaroChecklist />
        </section>
      );
    }

    if (cId === "comparison" || cId === "plain-language-comparison") {
      const p = (comp.props || {}) as Record<string, string | undefined>;
      return (
        <section key={block.id || `b-comp-${index}`} className="w-full">
          <PlainLanguageComparisonCard
            category={p.category || "Redacción Transaccional"}
            title={p.title || "Regla de Oro: Hablar en Primera y Segunda Persona"}
            dontText={
              p.dontText ||
              "El ciudadano deberá proceder a la radicación de la documentación exigida a través de la ventanilla."
            }
            dontReason={
              p.dontReason || "Tercera persona burocrática, verbo futuro compuesto y tono distante."
            }
            doText={p.doText || "Sube tus documentos aquí para iniciar tu trámite en 5 minutos."}
            doReason={
              p.doReason ||
              "Voz activa directa ('tú'), verbo en presente claro y expectativa de tiempo concreta."
            }
          />
        </section>
      );
    }

    if (cId === "stepper" || cId === "vertical-stepper") {
      return (
        <section key={block.id || `b-comp-${index}`} className="w-full">
          <VerticalStepperPlayground />
        </section>
      );
    }

    if (cId === "axis" || cId === "horizontal-moments") {
      return (
        <section key={block.id || `b-comp-${index}`} className="w-full">
          <HorizontalMomentsAxis />
        </section>
      );
    }

    if (cId === "maturity-matrix") {
      return (
        <section key={block.id || `b-comp-${index}`} className="w-full">
          <MaturityMatrixTable />
        </section>
      );
    }

    if (cId === "iai-formula") {
      return (
        <section key={block.id || `b-comp-${index}`} className="w-full">
          <IaiFormulaBox />
        </section>
      );
    }

    if (cId === "sdk-snippet") {
      return (
        <section key={block.id || `b-comp-${index}`} className="w-full">
          <SdkCodeSnippet />
        </section>
      );
    }

    if (cId === "ux-principles") {
      return (
        <section key={block.id || `b-comp-${index}`} className="w-full">
          <UxPrinciplesCards />
        </section>
      );
    }

    // Tarjeta representativa para otros componentes
    return (
      <div
        key={block.id || `b-comp-${index}`}
        className="bg-surface-container-lowest rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-3 font-body"
      >
        <div className="flex items-center justify-between gap-2 border-b border-surface-container-high pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-heading font-bold text-base text-on-surface">
              {comp.componentName}
            </h3>
          </div>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
            ID: {comp.componentId}
          </span>
        </div>
        {comp.description && (
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            {comp.description}
          </p>
        )}
      </div>
    );
  }

  return null;
}

/**
 * Server Component Asíncrono de Detalle de Guía
 * Conexión completa a Firestore y revalidación bajo demanda.
 */
export default async function GuiaDetallePage({ params }: PageProps) {
  // Carga paralela de la guía actual y de todas las guías para el Sidebar dinámico
  const [guia, allGuias] = await Promise.all([getGuiaBySlug(params.slug), getGuias()]);

  if (!guia) {
    notFound();
  }

  // Identificar guías adyacentes para el footer de navegación
  const currentIndex = allGuias.findIndex(
    (g) =>
      g.slug === guia.slug ||
      g.id === guia.id ||
      g.numeroIdentificador === guia.numeroIdentificador,
  );
  const prevGuide = currentIndex > 0 ? allGuias[currentIndex - 1] : null;
  const nextGuide =
    currentIndex >= 0 && currentIndex < allGuias.length - 1 ? allGuias[currentIndex + 1] : null;

  // Lista unificada de bloques de contenido
  const blocksToRender =
    guia.bloquesContenido && guia.bloquesContenido.length > 0
      ? guia.bloquesContenido
      : guia.blocks || [];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface font-body">
      {/* 1. Barra de Migas de Pan y Metadatos Rápidos */}
      <div className="w-full bg-surface-container-lowest border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav aria-label="Migas de pan" className="flex items-center gap-1.5 font-medium">
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              <span>Inicio</span>
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <Link
              href="/guias-de-vinculacion"
              className="hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
            >
              Guías de Vinculación
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span
              className="text-primary font-semibold truncate max-w-xs sm:max-w-md"
              aria-current="page"
            >
              Guía {guia.numeroIdentificador || guia.number}: {guia.titulo || guia.title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Layout Principal a Dos Columnas */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Sidebar Izquierdo: Dinámico a partir de await getGuias() */}
          <GuidesSidebarNav activeGuideSlug={guia.slug} guides={allGuias} />

          {/* Panel Derecho: Contenido Dinámico de la Guía */}
          <main className="flex-1 min-w-0 flex flex-col gap-8 w-full">
            {/* ENCABEZADO TÉCNICO HERO (100% DINÁMICO DESDE FIRESTORE) */}
            <article className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-body">
                <span className="inline-flex items-center gap-1.5 font-bold text-primary">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>GUÍA TÉCNICA DISTRITAL</span>
                </span>
                <div className="flex items-center gap-2 text-on-surface-variant font-medium flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-primary/10 text-primary font-bold border border-primary/20 font-heading text-[11px]">
                    {guia.categoriaPrincipal || guia.category || "General"}
                  </span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] font-bold border border-[#1B7A2E]/30 font-heading text-[11px]">
                    {guia.nivelAccesibilidad || guia.accessibilityLevel || "WCAG 2.2 AA"}
                  </span>
                </div>
              </div>

              {/* Título de la Guía y Resumen Ejecutivo */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-primary text-white flex items-center justify-center font-heading font-extrabold text-sm sm:text-base shadow-xs shrink-0">
                    {guia.numeroIdentificador || guia.number || "1.X"}
                  </span>
                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                    {guia.titulo || guia.title}
                  </h1>
                </div>
                <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  {guia.resumenEjecutivo || guia.summary}
                </p>
              </div>

              {/* Matriz de Atributos Técnicos Dinámicos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-surface-container-high/60 bg-surface-container-low/50 rounded-[10px] p-4 font-body">
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Audiencia
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-on-surface font-heading truncate block">
                    {guia.audiencias && guia.audiencias.length > 0
                      ? guia.audiencias.join(", ")
                      : "General"}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Última Modificación
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-on-surface truncate block">
                    {new Date(
                      guia.ultimaModificacion || guia.updatedAt || new Date(),
                    ).toLocaleDateString("es-CO", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </article>

            {/* SECCIÓN DE BLOQUES DE CONTENIDO ESTRUCTURADOS (JSON) */}
            <div className="flex flex-col gap-6">
              {blocksToRender.length > 0 ? (
                blocksToRender
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((block, idx) => renderContentBlock(block, idx))
              ) : (
                <div className="p-8 rounded-[15px] bg-surface-container-lowest border border-dashed border-gray-300 text-center space-y-3">
                  <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
                  <h3 className="font-heading font-bold text-base text-on-surface">
                    Especificación en Proceso de Redacción
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    Esta guía aún no tiene bloques de contenido publicados. Puedes ingresar al
                    Backoffice CMS para agregar bloques de texto, fragmentos de código, alertas
                    institucionales o componentes interactivos.
                  </p>
                  <Link
                    href={`/admin/guias/${guia.id || guia.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-xs font-heading font-bold shadow-xs hover:bg-[#A80B2B] transition-colors"
                  >
                    <span>Editar Contenido de esta Guía</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* NAVEGACIÓN ANTERIOR / SIGUIENTE ENTRE GUÍAS */}
            <nav
              aria-label="Navegación secuencial entre guías"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-surface-container-high"
            >
              {prevGuide ? (
                <Link
                  href={`/guias-de-vinculacion/${prevGuide.slug}`}
                  className="p-4 rounded-[12px] bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high transition-colors flex items-center gap-3 group"
                >
                  <ArrowLeft className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider block">
                      Guía Anterior
                    </span>
                    <span className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate block">
                      {prevGuide.numeroIdentificador || prevGuide.number} -{" "}
                      {prevGuide.titulo || prevGuide.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextGuide ? (
                <Link
                  href={`/guias-de-vinculacion/${nextGuide.slug}`}
                  className="p-4 rounded-[12px] bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high transition-colors flex items-center justify-between gap-3 text-right group ml-auto w-full sm:w-auto sm:min-w-[240px]"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider block">
                      Siguiente Guía
                    </span>
                    <span className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate block">
                      {nextGuide.numeroIdentificador || nextGuide.number} -{" "}
                      {nextGuide.titulo || nextGuide.title}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}
