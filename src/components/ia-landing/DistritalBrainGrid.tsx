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
              menu_book
            </span>
            <span>Arquitectura de Datos Exclusiva</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight mb-3 font-bold">
            El Cerebro Distrital: ¿Qué información consulta el modelo para responder?
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Bogotá GovLLM no genera respuestas creativas libres ni improvisa respuestas
            procedimentales. Opera mediante Generación Aumentada por Recuperación (RAG)
            estrictamente indexada sobre fuentes oficiales distritales y nacionales:
          </p>
        </div>

        {/* Grilla de 4 Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1 */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div>
              <div className="w-12 h-12 rounded-[10px] bg-primary/10 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  gavel
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-on-surface mb-2">
                Normatividad Vigente &amp; Decretos
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Decretos distritales, resoluciones de secretarías, acuerdos del Concejo y marco
                normativo actualizado en sincronía diaria con el Régimen Legal Distrital.
              </p>
            </div>
            <div className="mt-5 pt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20">
              <span className="text-xs text-primary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  sync
                </span>
                Actualización Diaria 04:00 AM
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div>
              <div className="w-12 h-12 rounded-[10px] bg-tertiary/10 flex items-center justify-center text-tertiary mb-4">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  inventory_2
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-on-surface mb-2">
                Datos Maestros
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Inventario unificado de trámites institucionales: requisitos validados, tiempos de
                respuesta exactos, tarifas oficiales y canales autorizados.
              </p>
            </div>
            <div className="mt-5 pt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20">
              <span className="text-xs text-tertiary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  verified
                </span>
                +1,200 Trámites, Servicios, OPAs
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div>
              <div className="w-12 h-12 rounded-[10px] bg-secondary-container/30 flex items-center justify-center text-secondary mb-4">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  translate
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-on-surface mb-2">
                Lenguaje Claro
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Estándares de lenguaje claro validados por el laboratorio iBO: eliminación de
                barreras burocráticas, tono empático, asertivo y pautas universales de
                accesibilidad.
              </p>
            </div>
            <div className="mt-5 pt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20">
              <span className="text-xs text-[#7E5700] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  accessibility_new
                </span>
                WCAG 2.2 AA / Lectura Fácil
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20">
            <div>
              <div className="w-12 h-12 rounded-[10px] bg-primary/10 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  call
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-on-surface mb-2">
                PQRS y Línea 195
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Más de 10 millones de interacciones ciudadanas anonimizadas y categorizadas para
                anticipar dudas frecuentes con precisión verificada y terminología ciudadana real.
              </p>
            </div>
            <div className="mt-5 pt-3 bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/20">
              <span className="text-xs text-primary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  query_stats
                </span>
                10M+ Consultas Reales
              </span>
            </div>
          </div>
        </div>

        {/* Banner Horizontal: Garantía Institucional Cero Inferencia */}
        <div className="rounded-[15px] bg-surface-container-highest p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-outline-variant/20">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                policy
              </span>
            </div>
            <div>
              <span className="font-heading text-base sm:text-lg font-bold text-on-surface block">
                Garantía Institucional: Cero Inferencia No Sustentada
              </span>
              <span className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Si una consulta no posee trazabilidad exacta en las fuentes distritales, el modelo
                transfiere automáticamente el caso al Portal Transaccional o a un gestor humano.
              </span>
            </div>
          </div>
          <span className="shrink-0 px-3.5 py-1.5 rounded-[5px] bg-surface-container-lowest text-on-surface text-xs font-bold shadow-xs border border-outline-variant/30">
            Failsafe Activo 100%
          </span>
        </div>
      </div>
    </section>
  );
};
