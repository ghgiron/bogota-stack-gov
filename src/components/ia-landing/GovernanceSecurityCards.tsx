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
              Marco Jurídico e Institucional
            </span>
          </div>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1E1E] tracking-tight mb-3">
            Gobernanza Institucional, Seguridad y Cumplimiento Normativo
          </h2>

          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Estructurado bajo los lineamientos de seguridad de la información y transparencia pública de la
            Alcaldía Mayor de Bogotá D.C. y la Secretaría General.
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
                <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mt-1 mb-2">
                  Cumplimiento de la Ley 1581 de 2012
                </h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Módulo de anonimización en memoria antes del procesamiento de cualquier consulta. Números de
                  documento de identidad, placas, teléfonos y datos sensibles son ofuscados de manera irreversible.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span className="font-sans">
                      Ningún dato de la ciudadanía se almacena para entrenar modelos o servicios externos.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span className="font-sans">Registros operativos cifrados y trazables para auditoría distrital.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pilar 2: Infraestructura Pública Distrital */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[10px] bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  account_balance
                </span>
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider block">
                  Infraestructura Distrital
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mt-1 mb-2">
                  Gestión y Custodia Pública Institucional
                </h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Operación bajo las directrices tecnológicas de la Secretaría General de la Alcaldía Mayor de
                  Bogotá D.C., asegurando la permanencia de la información en servidores seguros y bajo control público.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span className="font-sans">Residencia exclusiva de los datos dentro del territorio nacional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span className="font-sans">
                      Supervisión continua por parte de las dependencias técnicas de la Alcaldía Mayor.
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
                <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mt-1 mb-2">
                  Arquitectura Determinística y Cero Conjeturas
                </h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  El sistema restringe la generación probabilística de respuestas cuando no existe un respaldo
                  documental preciso en las fuentes oficiales distritales, derivando el caso a los servidores públicos.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span className="font-sans">Citas normativas directas a los actos administrativos distritales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span className="font-sans">Cero inferencias generadas desde fuentes no verificadas.</span>
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
                  Inclusión y Accesibilidad
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mt-1 mb-2">
                  Lenguaje Claro y Accesibilidad (WCAG 2.2 AA)
                </h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Pautas de redacción comprensibles y directas para la ciudadanía, compatibles con lectores de
                  pantalla, sistemas de navegación por teclado y mecanismos de accesibilidad distritales.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span className="font-sans">Compatibilidad con tecnologías de asistencia y lectura en pantalla.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      check
                    </span>
                    <span className="font-sans">
                      Redacción orientada a simplificar los pasos y requisitos para la ciudadanía.
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
