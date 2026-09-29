import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type React from "react";

export const ModulesGrid: React.FC = () => {
  return (
    <section
      id="modulos-estrategicos"
      aria-labelledby="modulos-heading"
      className="w-full bg-surface py-8 lg:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        {/* Título de Sección */}
        <div className="max-w-3xl">
          <h2
            id="modulos-heading"
            className="font-heading text-xl sm:text-3xl text-on-surface font-extrabold tracking-tight"
          >
            Recursos de Bogotá Stack
          </h2>
        </div>

        {/* Grid de las 4 Tarjetas Grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* CARD 1: GUÍAS DE VINCULACIÓN */}
          <article className="flex flex-col justify-between bg-surface-container-lowest rounded-card border border-surface-container-highest p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
            <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 bg-[#CC0E35]" />
            <div>
              {/* Header de Card con Icono Vectorial */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" x2="8" y1="13" y2="13" />
                    <line x1="16" x2="8" y1="17" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-[5px] bg-surface-container text-[11px] font-semibold text-on-surface-variant">
                  Metodología
                </span>
              </div>

              {/* Título y Descripción */}
              <h3 className="font-heading text-lg sm:text-xl text-on-surface font-bold mb-1.5 group-hover:text-primary transition-colors">
                Guías de Vinculación
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mb-3 leading-relaxed">
                Paso a paso para integración de Entidades Distritales al Portal Transaccional.
              </p>

              {/* Métricas / Highlights */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-surface-container-low rounded-[8px] mb-3 border border-gray-100">
                <div className="text-center">
                  <span className="block font-heading text-base font-bold text-primary">10</span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Guías paso a paso
                  </span>
                </div>
                <div className="text-center border-x border-surface-container-highest">
                  <span className="block font-heading text-base font-bold text-on-surface">
                    Estratégico
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Nivel
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-heading text-base font-bold text-tertiary">
                    Técnico
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Nivel
                  </span>
                </div>
              </div>

              {/* Lista de comprobaciones */}
              <ul
                aria-label="Beneficios de Guías"
                className="flex flex-col gap-1.5 mb-3 text-xs text-on-surface"
              >
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Guías de integración, usabilidad, lenguaje claro, entre otras.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>
                    Guías de los habilitadores distritales: Soluciones compartidas,
                    autenticación, interoperabilidad.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Kits UI, patrones de diseño.</span>
                </li>
              </ul>
            </div>

            {/* Botón Outline Rojo Bogotá */}
            <div className="pt-2">
              <Link
                href="/guias-de-vinculacion"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[40px] h-10 px-5 border-2 border-primary-container text-primary-container hover:bg-primary-container hover:text-on-primary rounded-[5px] font-heading text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 outline-none group/btn shadow-xs"
              >
                <span>Ingresar</span>
                <ArrowRight
                  className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

          {/* CARD 2: DEVELOPER (SDK & APIS) */}
          <article className="flex flex-col justify-between bg-surface-container-lowest rounded-card border border-surface-container-highest p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
            <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 bg-[#3366CC]" />
            <div>
              {/* Header de Card */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform shrink-0">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-[5px] bg-surface-container text-[11px] font-semibold text-on-surface-variant">
                  Integración
                </span>
              </div>

              {/* Título y Descripción */}
              <h3 className="font-heading text-lg sm:text-xl text-on-surface font-bold mb-1.5 group-hover:text-tertiary transition-colors">
                Soluciones Compartidas
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mb-3 leading-relaxed">
                Building blocks, interoperabilidad y autenticación para el Distrito.
              </p>

              {/* Métricas / Highlights */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-surface-container-low rounded-[8px] mb-3 border border-gray-100">
                <div className="text-center">
                  <span className="block font-heading text-base font-bold text-tertiary">
                    BB-Pagos Bogotá
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Building Block
                  </span>
                </div>
                <div className="text-center border-x border-surface-container-highest">
                  <span className="block font-heading text-base font-bold text-on-surface">
                    Autenticación
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Distrital
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-heading text-base font-bold text-primary">SDK</span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Interoperabilidad
                  </span>
                </div>
              </div>

              {/* Lista */}
              <ul
                aria-label="Capacidades de Soluciones Compartidas"
                className="flex flex-col gap-1.5 mb-3 text-xs text-on-surface"
              >
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Building Blocks: Workflow, BB-Pagos Bogotá, Mensajería, entre otros.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>
                    Autenticación (Federada y Descentralizada con Credenciales Verificables).
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>SDK de Interoperabilidad (@bogota/bb-interop) y OpenAPI.</span>
                </li>
              </ul>
            </div>

            {/* Botón */}
            <div className="pt-2">
              <Link
                href="/soluciones-compartidas"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[40px] h-10 px-5 border-2 border-primary-container text-primary-container hover:bg-primary-container hover:text-on-primary rounded-[5px] font-heading text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 outline-none group/btn shadow-xs"
              >
                <span>Ingresar</span>
                <ArrowRight
                  className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

          {/* CARD 3: HUB DE CONOCIMIENTO */}
          <article className="flex flex-col justify-between bg-surface-container-lowest rounded-card border border-surface-container-highest p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
            <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 bg-[#FAB62D]" />
            <div>
              {/* Header de Card */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-secondary-container/20 flex items-center justify-center text-on-surface group-hover:scale-105 transition-transform shrink-0">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    <path d="M9 10h6" />
                    <path d="M9 14h4" />
                  </svg>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-[5px] bg-surface-container text-[11px] font-semibold text-on-surface-variant">
                  Conocimiento
                </span>
              </div>

              {/* Título y Descripción */}
              <h3 className="font-heading text-lg sm:text-xl text-on-surface font-bold mb-1.5 group-hover:text-secondary transition-colors">
                Hub de Conocimiento
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mb-3 leading-relaxed">
                Normatividad relacionada con el Portal Transaccional, interoperabilidad, racionalización de trámites,
                metodologías y herramientas del Laboratorio de Innovación Distrital iBO.
              </p>

              {/* Métricas / Highlights */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-surface-container-low rounded-[8px] mb-3 border border-gray-100">
                <div className="text-center">
                  <span className="block font-heading text-base font-bold text-on-surface">
                    Normatividad
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Distrital TECH
                  </span>
                </div>
                <div className="text-center border-x border-surface-container-highest">
                  <span className="block font-heading text-base font-bold text-primary">
                    Racionalización
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    de Trámites
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-heading text-base font-bold text-tertiary">
                    Metodologías
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Innovación Distrital
                  </span>
                </div>
              </div>

              {/* Lista */}
              <ul
                aria-label="Componentes del Hub"
                className="flex flex-col gap-1.5 mb-3 text-xs text-on-surface"
              >
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Normatividad distrital para interoperabilidad.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Racionalización y estandarización de trámites.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Herramientas de la Clínica de Trámites.</span>
                </li>
              </ul>
            </div>

            {/* Botón */}
            <div className="pt-2">
              <Link
                href="/hub-de-conocimiento"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[40px] h-10 px-5 border-2 border-primary-container text-primary-container hover:bg-primary-container hover:text-on-primary rounded-[5px] font-heading text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 outline-none group/btn shadow-xs"
              >
                <span>Ingresar</span>
                <ArrowRight
                  className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

          {/* CARD 4: IA DISTRITAL */}
          <article className="flex flex-col justify-between bg-surface-container-lowest rounded-card border border-surface-container-highest p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
            <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 bg-[#CC0E35]" />
            <div>
              {/* Header de Card */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-primary-container/10 flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform shrink-0">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                    <path d="M16 14v1a4 4 0 0 1-8 0v-1" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                    <circle cx="12" cy="11" r="1" />
                    <path d="M6 10h.01M18 10h.01" />
                  </svg>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-[5px] bg-surface-container text-[11px] font-semibold text-on-surface-variant">
                  Inteligencia Artificial
                </span>
              </div>

              {/* Título y Descripción */}
              <h3 className="font-heading text-lg sm:text-xl text-on-surface font-bold mb-1.5 group-hover:text-primary transition-colors">
                IA Distrital
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mb-3 leading-relaxed">
                Modelo IA de Servicio a la Ciudadanía, buenas prácticas para la implementación de IA
                en el Distrito.
              </p>

              {/* Métricas / Highlights */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-surface-container-low rounded-[8px] mb-3 border border-gray-100">
                <div className="text-center">
                  <span className="block font-heading text-base font-bold text-primary">
                    Ética 100%
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    IA Responsable
                  </span>
                </div>
                <div className="text-center border-x border-surface-container-highest">
                  <span className="block font-heading text-base font-bold text-tertiary">
                    Auditables
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Modelos y Costo
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-heading text-base font-bold text-on-surface">
                    RAG Distrital
                  </span>
                  <span className="text-[10px] text-on-surface-variant leading-tight block">
                    Oferta Distrital
                  </span>
                </div>
              </div>

              {/* Lista */}
              <ul
                aria-label="Capacidades de IA Agéntica"
                className="flex flex-col gap-1.5 mb-3 text-xs text-on-surface"
              >
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Modelos de IAs para respuesta a trámites y servicios distritales.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Casos de uso de IA en el Distrito.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Parche IA Sin Filtro.</span>
                </li>
              </ul>
            </div>

            {/* Botón Principal */}
            <div className="pt-2">
              <Link
                href="/ia-distrital"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[40px] h-10 px-5 border-2 border-primary-container text-primary-container hover:bg-primary-container hover:text-on-primary rounded-[5px] font-heading text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 outline-none group/btn shadow-xs"
              >
                <span>Ingresar</span>
                <ArrowRight
                  className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
