import { BookOpen, FileCheck2, Landmark, Sparkles } from "lucide-react";
import Link from "next/link";

export default function GuidesCatalogHero() {
  return (
    <div className="w-full flex flex-col">
      {/* Sub-Header / Breadcrumb Semántico */}
      <div className="w-full bg-surface-container-low border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Ruta de navegación"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              Inicio
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-on-surface-variant font-medium">Módulos</span>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-on-surface font-semibold" aria-current="page">
              Guías de Vinculación
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <BookOpen className="w-3.5 h-3.5" />
              10 Guías
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section Institucional */}
      <section className="w-full bg-surface-container-lowest border-b border-surface-container-high py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="max-w-4xl flex flex-col gap-3">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Guías de Vinculación <span className="text-primary">Distrital</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Documentación oficial, estándares y metodologías para integrar los trámites y
              servicios de tu entidad al Portal Transaccional de Bogotá.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
