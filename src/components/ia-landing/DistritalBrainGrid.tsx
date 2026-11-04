import type React from "react";

export const DistritalBrainGrid: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-12 sm:py-16" id="cerebro-distrital">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-surface-container text-on-surface-variant text-xs font-semibold mb-2 border border-outline-variant/30">
            <span
              className="material-symbols-outlined text-[16px] text-tertiary"
              aria-hidden="true"
            >
              account_tree
            </span>
            <span>RAG Distrital · Fuentes Oficiales</span>
          </div>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1E1E] tracking-tight mb-3">
            Arquitectura de Recuperación: Fuentes oficiales documentales y trazabilidad
          </h2>

          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            El modelo opera bajo un esquema de Generación Aumentada por Recuperación (RAG Distrital),
            consultando de forma estricta y transparente únicamente repositorios oficiales autorizados por la
            Alcaldía Mayor de Bogotá D.C. Esto garantiza respuestas consistentes, auditables y con citas
            directas al marco normativo vigente, evitando cualquier conjetura no fundamentada.
          </p>
        </div>

        {/* Grilla de Fuentes y Componentes Esenciales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1: Datos Maestros */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div>
              <div className="w-12 h-12 rounded-[10px] bg-tertiary/10 flex items-center justify-center text-tertiary mb-4">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  inventory_2
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mb-2">
                Datos Maestros
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Inventario estructurado de trámites y canales institucionales: requisitos oficiales
                validados, dependencias responsables, tarifas vigentes y puntos de atención distritales autorizados.
              </p>
            </div>
            <div className="mt-5 pt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20">
              <span className="text-xs text-tertiary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  verified
                </span>
                Inventario Oficial Distrital
              </span>
            </div>
          </div>

          {/* Card 2: Lenguaje Claro */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div>
              <div className="w-12 h-12 rounded-[10px] bg-secondary-container/30 flex items-center justify-center text-secondary mb-4">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  translate
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mb-2">
                Lenguaje Claro
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Directrices de redacción comprensible, empática y accesible para la ciudadanía. Aplicación de
                criterios de lectura fácil de la Secretaría General y pautas universales de accesibilidad WCAG 2.2 AA.
              </p>
            </div>
            <div className="mt-5 pt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20">
              <span className="text-xs text-[#7E5700] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  accessibility_new
                </span>
                Lectura Fácil y Accesibilidad
              </span>
            </div>
          </div>

          {/* Card 3: Atención Ciudadana (PQRS y Línea 195) */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div>
              <div className="w-12 h-12 rounded-[10px] bg-primary/10 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  contact_support
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mb-2">
                Atención Ciudadana (PQRS y Línea 195)
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Asistencia a los servidores públicos en la proyección de respuestas fundamentadas a
                solicitudes ciudadanas, identificando precedentes de servicio y canales pertinentes.
              </p>
            </div>
            <div className="mt-5 pt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20">
              <span className="text-xs text-primary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  support_agent
                </span>
                Línea 195 y Red CADE
              </span>
            </div>
          </div>

          {/* Card 4: Repositorio Normativo */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div>
              <div className="w-12 h-12 rounded-[10px] bg-primary/10 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  gavel
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mb-2">
                Normatividad Vigente
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Decretos distritales, acuerdos del Concejo, resoluciones de secretarías y actos administrativos
                vigentes en sincronía directa con el régimen legal de la Alcaldía Mayor.
              </p>
            </div>
            <div className="mt-5 pt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20">
              <span className="text-xs text-primary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  verified_user
                </span>
                Régimen Legal Distrital
              </span>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};
