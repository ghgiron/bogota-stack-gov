import type React from "react";

export const AdoptionUseCases: React.FC = () => {
  return (
    <section className="w-full bg-surface py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-surface-container text-on-surface-variant text-xs font-semibold mb-2 border border-outline-variant/30">
            <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">
              hub
            </span>
            <span>Implementación en Puntos de Contacto</span>
          </div>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1E1E] tracking-tight mb-3">
            Casos de Uso en la Administración Distrital
          </h2>

          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            El modelo se acopla a las plataformas de servicio existentes en cada secretaría y entidad
            distrital, manteniendo los estándares de interoperabilidad y seguridad fijados por la Alcaldía Mayor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Caso 1: Canal Oficial de WhatsApp / Mensajería */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-[8px] bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                    chat
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-[5px] bg-surface-container text-on-surface text-xs font-semibold font-mono">
                  Canal de Mensajería
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mb-2">
                Canal Oficial de Mensajería
              </h3>

              <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                Orientación directa a la ciudadanía con respuestas concisas, verificación de requisitos y enlaces
                auténticos a las sedes electrónicas institucionales.
              </p>

              {/* Mockup Interacción Mensajería */}
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2.5 mb-4 text-xs border border-outline-variant/20">
                <div className="bg-surface-container-lowest p-2.5 rounded-lg max-w-[90%] self-start shadow-xs text-on-surface">
                  <span className="text-on-surface-variant block text-[10px] font-bold mb-0.5">
                    Consulta de la ciudadanía (Localidad Suba):
                  </span>
                  ¿Cómo consulto el estado del trámite de Sisbén IV y cuál es su costo?
                </div>
                <div className="bg-primary/5 border border-primary/20 p-2.5 rounded-lg max-w-[92%] self-end shadow-xs text-on-surface">
                  <div className="flex items-center gap-1 text-[11px] text-primary font-bold mb-0.5">
                    <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                      verified
                    </span>
                    Orientación Distrital
                  </div>
                  El trámite es <strong className="text-on-surface">gratuito</strong>. Puedes consultar la ficha
                  técnica en la sede electrónica oficial o acercarte al punto de atención de la red CADE Suba.
                </div>
              </div>
            </div>

            <div className="pt-3 bg-surface-container-low rounded-lg p-3 border border-outline-variant/20">
              <span className="text-xs text-primary font-bold block mb-1">Objetivo de Gestión:</span>
              <p className="font-sans text-xs text-on-surface-variant leading-snug">
                Disminución de tiempos de espera y orientación ágil en canales accesibles para la ciudadanía.
              </p>
            </div>
          </div>

          {/* Caso 2: Asistente Web en Portales Distritales */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-[8px] bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                    laptop_chromebook
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-[5px] bg-surface-container text-on-surface text-xs font-semibold font-mono">
                  Sedes Electrónicas
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mb-2">
                Asistente Web Institucional
              </h3>

              <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                Módulo integrado en los portales oficiales de las secretarías, diseñado bajo los lineamientos de
                accesibilidad digital y el Kit UI de Bogotá Stack.
              </p>

              {/* Mockup Asistente Web */}
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2 mb-4 text-xs border border-outline-variant/20">
                <div className="flex items-center justify-between p-2 bg-tertiary-container rounded-t-lg text-on-tertiary-container">
                  <span className="font-semibold flex items-center gap-1.5 text-xs">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                      smart_toy
                    </span>
                    Orientación en Línea
                  </span>
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </div>
                <div className="bg-surface-container-lowest p-2.5 rounded-b-lg shadow-xs text-on-surface text-xs border border-outline-variant/10">
                  <span className="text-on-surface-variant font-medium block mb-1">
                    Búsqueda normativa asistida:
                  </span>
                  "Se identificaron 2 decretos distritales aplicables al trámite consultado. Puedes revisar los
                  artículos vigentes o continuar la gestión en la sede electrónica."
                </div>
              </div>
            </div>

            <div className="pt-3 bg-surface-container-low rounded-lg p-3 border border-outline-variant/20">
              <span className="text-xs text-tertiary font-bold block mb-1">Objetivo de Gestión:</span>
              <p className="font-sans text-xs text-on-surface-variant leading-snug">
                Navegación asistida y accesible conforme a las directrices de diseño y usabilidad distritales.
              </p>
            </div>
          </div>

          {/* Caso 3: Asistencia a Servidores Públicos */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-[8px] bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                    edit_document
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-[5px] bg-surface-container text-on-surface text-xs font-semibold font-mono">
                  PQRS y Gestión
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-[#1E1E1E] mb-2">
                Asistencia a Servidores Públicos
              </h3>

              <p className="font-sans text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                Herramienta de soporte operativo para la proyección de respuestas motivadas a solicitudes ciudadanas,
                identificando artículos vigentes para revisión final del equipo técnico.
              </p>

              {/* Mockup Dashboard Servidor */}
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2 mb-4 text-xs border border-outline-variant/20">
                <div className="bg-surface-container-lowest p-2.5 rounded-lg shadow-xs text-on-surface">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-secondary text-xs">
                      Borrador Sugerido · Solicitud #8491
                    </span>
                    <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded font-mono font-semibold">
                      Trazabilidad Documental
                    </span>
                  </div>
                  <p className="font-sans text-on-surface-variant text-[11px] leading-relaxed">
                    "Con fundamento en las disposiciones distritales vigentes, se informa que los requisitos técnicos
                    para la radicación correspondiente contemplan..."
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 bg-surface-container-low rounded-lg p-3 border border-outline-variant/20">
              <span className="text-xs text-[#7E5700] font-bold block mb-1">Objetivo de Gestión:</span>
              <p className="font-sans text-xs text-on-surface-variant leading-snug">
                Optimización en los tiempos de respuesta a peticiones ciudadanas con estricta rigurosidad jurídica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
