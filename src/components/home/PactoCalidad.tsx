import { Building2, Landmark, LockOpen, ShieldCheck } from "lucide-react";
import type React from "react";

export const PactoCalidad: React.FC = () => {
  return (
    <section
      aria-labelledby="commitment-heading"
      className="w-full bg-surface-container-lowest border-t border-surface-container-highest py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-container-low rounded-card p-6 sm:p-10 lg:p-12 border border-surface-container-highest">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Lado Izquierdo: Descripción y Pilares */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-btn bg-primary/10 text-primary w-fit border border-primary/20">
                <Landmark className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase font-heading">Bogotá Stack</span>
              </div>

              <h2
                id="commitment-heading"
                className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight"
              >
                Diseñado para los servidores públicos y equipos técnicos de Bogotá
              </h2>

              <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Bogotá Stack moderniza la interacción entre entidades y ciudadanía, eliminando silos
                técnicos, sobrecostos y duplicidad de desarrollo. Facilitando la interoperabilidad,
                diseño y principios de GovTech, con un enfoque de Diseño Centrado en la Ciudadanía
                (DCU), garantizando inclusión, lenguaje claro, usabilidad y accesibilidad universal.
              </p>

              {/* 3 Pilares Numerados */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 font-body font-semibold text-xs sm:text-sm text-on-surface">
                  <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </span>
                  <span>Interoperabilidad</span>
                </div>
                <div className="flex items-center gap-2 font-body font-semibold text-xs sm:text-sm text-on-surface">
                  <span className="w-6 h-6 rounded-full bg-tertiary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </span>
                  <span>Soluciones compartidas</span>
                </div>
                <div className="flex items-center gap-2 font-body font-semibold text-xs sm:text-sm text-on-surface">
                  <span className="w-6 h-6 rounded-full bg-secondary-container text-on-surface flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </span>
                  <span>Autenticación descentralizada</span>
                </div>
              </div>
            </div>

            {/* Lado Derecho: 3 Indicadores de Confianza */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              <div className="p-4 rounded-btn bg-surface-container-lowest border border-surface-container flex items-center gap-4 shadow-2xs">
                <div className="w-12 h-12 rounded-btn bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-heading text-2xl font-extrabold text-on-surface block leading-none">
                    40+
                  </span>
                  <span className="text-xs text-on-surface-variant font-body">
                    Entidades Distritales Integradas
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-btn bg-surface-container-lowest border border-surface-container flex items-center gap-4 shadow-2xs">
                <div className="w-12 h-12 rounded-btn bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-heading text-2xl font-extrabold text-on-surface block leading-none">
                    1.326
                  </span>
                  <span className="text-xs text-on-surface-variant font-body">
                    Trámites y servicios disponibles
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-btn bg-surface-container-lowest border border-surface-container flex items-center gap-4 shadow-2xs">
                <div className="w-12 h-12 rounded-btn bg-emerald-700/10 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-heading text-2xl font-extrabold text-on-surface block leading-none">
                    34
                  </span>
                  <span className="text-xs text-on-surface-variant font-body">
                    Acuerdos de interoperabilidad
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
