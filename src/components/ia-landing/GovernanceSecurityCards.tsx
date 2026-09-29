import type React from "react";

export const GovernanceSecurityCards: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-surface-container text-on-surface-variant text-xs font-semibold mb-2 border border-outline-variant/30">
            <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">
              security
            </span>
            <span className="font-bold uppercase tracking-wider text-primary">
              Confianza Pública y Marco Jurídico Vinculante
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight mb-3 font-bold">
            Gobernanza Institucional, Seguridad y Cumplimiento Normativo
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Diseñado expresamente para superar las auditorías más rigurosas de la Personería de
            Bogotá, la Contraloría Distrital y los comités de seguridad de la información
            institucional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Pilar 1: Protección de Datos */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  vpn_key
                </span>
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                  Protección de Datos
                </span>
                <h3 className="font-heading text-lg font-bold text-on-surface mt-1 mb-2">
                  Cumplimiento Estricto Ley 1581 (PII Scrubber)
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Filtro de anonimización en memoria RAM en tiempo real antes de enviar cualquier
                  consulta al motor. Cédulas, placas, números telefónicos y datos de salud son
                  ofuscados irrevocablemente.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span>
                      Ningún dato de ciudadanos se almacena para re-entrenar redes neuronales
                      externas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span>Logs auditables con cifrado AES-256 en reposo.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pilar 2: Soberanía Tecnológica */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  account_balance
                </span>
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider block">
                  Soberanía Tecnológica
                </span>
                <h3 className="font-heading text-lg font-bold text-on-surface mt-1 mb-2">
                  Decreto Distrital 575 de 2023 (Infraestructura Pública)
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Conexión nativa con el Data Warehouse Distrital (DWH) bajo los estándares de la
                  Consejería Distrital de TIC. Soberanía operativa alojada en infraestructura
                  nacional certificada Tier IV.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span>
                      Residencia exclusiva de los datos dentro del territorio de Colombia.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span>
                      Monitoreo de integridad y telemetría por la Dirección de Informática de la
                      Alcaldía.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pilar 3: Rigor Jurídico */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-secondary-container/30 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  verified_user
                </span>
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                  Rigor Jurídico
                </span>
                <h3 className="font-heading text-lg font-bold text-on-surface mt-1 mb-2">
                  Arquitectura Anti-Alucinaciones (RAG Determinístico)
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Umbral de certeza matemática fijado en &gt;98.5%. Si el motor no localiza el
                  artículo legal exacto o la norma no está vigente, bloquea la deducción
                  probabilística y deriva al funcionario.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span>Cita hipervinculada a la fuente oficial del Registro Distrital.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span>Cero respuestas basadas en datos genéricos de internet público.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pilar 4: Inclusión Ciudadana */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  record_voice_over
                </span>
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                  Inclusión Ciudadana
                </span>
                <h3 className="font-heading text-lg font-bold text-on-surface mt-1 mb-2">
                  Lenguaje Claro y Accesibilidad (WCAG 2.2 AA)
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Redacción estructurada con base en los principios de lectura fácil y empatía
                  ciudadana. Totalmente legible para sistemas de soporte auditivo, lector de
                  pantalla e intérprete LSC distrital.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span>Compatibilidad validada con NVDA, JAWS y VoiceOver.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span>
                      Capacidad de traducción simplificada y orientación territorial por
                      UPZ/Localidad.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
