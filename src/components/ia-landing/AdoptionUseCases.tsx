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
            <span>Despliegue Multicanal Sin Fricción</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight mb-3 font-bold">
            Tres Formas Inmediatas de Adoptar el Modelo en tu Entidad
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            El GovLLM se adapta a la infraestructura tecnológica preexistente de tu secretaría u
            organismo distrital sin requerir refactorizaciones complejas de software.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Caso 1: WhatsApp Oficial */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-[8px] bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                    chat
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-[5px] bg-surface-container text-on-surface text-xs font-semibold font-mono">
                  Meta Cloud API
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-on-surface mb-2">
                Línea Oficial de WhatsApp
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                Atención directa en el canal preferido por el 89% de los bogotanos, con respuestas
                concisas, botones de confirmación y radicación guiada.
              </p>

              {/* Mockup Chat WhatsApp */}
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2.5 mb-4 text-xs border border-outline-variant/20">
                <div className="bg-surface-container-lowest p-2.5 rounded-lg max-w-[88%] self-start shadow-xs text-on-surface">
                  <span className="text-on-surface-variant block text-[10px] font-bold mb-0.5">
                    Ciudadano (Localidad Suba):
                  </span>
                  ¿Cómo renuevo mi certificado de Sisbén IV y cuánto cuesta?
                </div>
                <div className="bg-primary/5 border border-primary/20 p-2.5 rounded-lg max-w-[92%] self-end shadow-xs text-on-surface">
                  <div className="flex items-center gap-1 text-[11px] text-primary font-bold mb-0.5">
                    <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                      verified
                    </span>
                    GovLLM Distrital
                  </div>
                  El trámite es <strong className="text-on-surface">gratuito</strong> (Acuerdo
                  Distrital 642). Puedes descargar tu ficha técnica inmediatamente en el enlace
                  seguro distrital o acudir a la red CADE Suba.
                </div>
              </div>
            </div>

            <div className="pt-3 bg-surface-container-low rounded-lg p-3 border border-outline-variant/20">
              <span className="text-xs text-primary font-bold block mb-1">Impacto Directivo:</span>
              <p className="text-xs text-on-surface-variant leading-snug">
                Descongestión del 65% en taquillas físicas de SuperCADE y atención garantizada 24/7
                sin sobrecostos de personal nocturno.
              </p>
            </div>
          </div>

          {/* Caso 2: Web Chatbot en tu Portal */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-[8px] bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                    laptop_chromebook
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-[5px] bg-surface-container text-on-surface text-xs font-semibold font-mono">
                  Web Widget UI Kit
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-on-surface mb-2">
                Web Chatbot en tu Portal
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                Widget flotante ligero (&lt;14KB) totalmente alineado con las guías de Bogotá Stack,
                accesible para lectores de pantalla y adultos mayores.
              </p>

              {/* Mockup Chatbot Portal */}
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2 mb-4 text-xs border border-outline-variant/20">
                <div className="flex items-center justify-between p-2 bg-tertiary-container rounded-t-lg text-on-tertiary-container">
                  <span className="font-semibold flex items-center gap-1.5 text-xs">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                      smart_toy
                    </span>
                    Asistente Portal Secretaría
                  </span>
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </div>
                <div className="bg-surface-container-lowest p-2.5 rounded-b-lg shadow-xs text-on-surface text-xs border border-outline-variant/10">
                  <span className="text-on-surface-variant font-medium block mb-1">
                    Búsqueda asistida:
                  </span>
                  "Encontré 2 decretos aplicables a tu consulta de uso de suelo en Teusaquillo.
                  ¿Deseas descargar el extracto oficial?"
                </div>
              </div>
            </div>

            <div className="pt-3 bg-surface-container-low rounded-lg p-3 border border-outline-variant/20">
              <span className="text-xs text-tertiary font-bold block mb-1">Impacto Directivo:</span>
              <p className="text-xs text-on-surface-variant leading-snug">
                Navegación accesible certificada WCAG 2.2 AA que reduce en un 48% las llamadas
                repetitivas de orientación a la mesa técnica.
              </p>
            </div>
          </div>

          {/* Caso 3: Copiloto para Funcionarios */}
          <div className="rounded-[15px] bg-surface-container-lowest p-6 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-[8px] bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                    assistant
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-[5px] bg-surface-container text-on-surface text-xs font-semibold font-mono">
                  Integración CRM/PQRSDF
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-on-surface mb-2">
                Copiloto para Funcionarios
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                Herramienta interna de apoyo que redacta borradores de respuesta motivada a
                peticiones ciudadanas, citando automáticamente los artículos vigentes.
              </p>

              {/* Mockup Dashboard Copilot */}
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2 mb-4 text-xs border border-outline-variant/20">
                <div className="bg-surface-container-lowest p-2.5 rounded-lg shadow-xs text-on-surface">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-secondary text-xs">
                      Borrador Sugerido PQRS #8491
                    </span>
                    <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded font-mono font-semibold">
                      Confianza 99.2%
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] leading-relaxed">
                    "En mérito del Artículo 14 de la Ley 1755, se informa que la expedición del
                    permiso ambiental..."
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 bg-surface-container-low rounded-lg p-3 border border-outline-variant/20">
              <span className="text-xs text-[#7E5700] font-bold block mb-1">
                Impacto Directivo:
              </span>
              <p className="text-xs text-on-surface-variant leading-snug">
                Reducción de 15 a 3 días hábiles en los tiempos promedio de respuesta a Derechos de
                Petición y tutela administrativa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
