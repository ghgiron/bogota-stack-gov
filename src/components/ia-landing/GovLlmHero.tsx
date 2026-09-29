import type React from "react";

export const GovLlmHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl flex flex-col items-start">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight mb-4 leading-[1.14] font-bold">
            IA segura y pre-entrenada al servicio de la ciudadanía.
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant mb-6 leading-relaxed">
            Conecta el modelo de IA oficial de la Oferta Distrital (
            <strong className="text-on-surface font-semibold">Bogotá GovLLM</strong>) a tus puntos
            de contacto. Optimiza tiempos de respuesta, garantiza rigurosidad jurídica y atiende
            24/7 sin riesgos de alucinación ni licenciamientos comerciales.
          </p>

          {/* Botonera de Acciones Principales */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6">
            <a
              href="#solicitud-integracion"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-container hover:bg-primary text-on-primary font-bold text-sm sm:text-base rounded-[5px] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                handshake
              </span>
              Solicitar Integración de Entidad
            </a>

            <a
              href="#cerebro-distrital"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold text-sm sm:text-base rounded-[5px] shadow-xs border border-outline-variant/30 transition-all focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 min-h-[44px]"
            >
              <span
                className="material-symbols-outlined text-[20px] text-tertiary"
                aria-hidden="true"
              >
                menu_book
              </span>
              Ver Arquitectura y Casos
            </a>
          </div>

          {/* Métricas de Confianza Institucional */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs sm:text-sm text-on-surface-variant border-t border-outline-variant/20 w-full">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                aria-hidden="true"
              >
                domain_verification
              </span>
              <span>
                <strong className="text-on-surface font-semibold">42 entidades</strong> en proceso
                de despliegue
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-tertiary text-[18px]"
                aria-hidden="true"
              >
                gavel
              </span>
              <span>
                Alineación 100% con{" "}
                <strong className="text-on-surface font-semibold">Decreto 575/2023</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                aria-hidden="true"
              >
                privacy_tip
              </span>
              <span>
                Cumplimiento estricto{" "}
                <strong className="text-on-surface font-semibold">Ley 1581</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
