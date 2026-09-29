import type React from "react";

export const UsageGuidelinesGrid: React.FC = () => {
  return (
    <section aria-labelledby="guidelines-heading" className="flex flex-col gap-4">
      <div>
        <h3
          className="font-heading text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2"
          id="guidelines-heading"
        >
          <span className="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">
            rule
          </span>
          Pautas de Uso: Cuándo usar y cuándo NO usar
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Directrices oficiales para diseñadores de experiencia y desarrolladores de soluciones
          tecnológicas distritales.
        </p>
      </div>

      {/* 2 Columnas Simétricas (Do's & Don'ts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO: Columna Verde Recomendada */}
        <div className="bg-surface-container-lowest rounded-[15px] p-5 sm:p-6 border border-surface-container-high border-t-4 border-t-[#1B7A2E] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-[#1B7A2E]">
              <span className="w-8 h-8 rounded-full bg-[#EAF5EC] flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[20px] font-bold"
                  aria-hidden="true"
                >
                  check
                </span>
              </span>
              <h4 className="font-heading text-base sm:text-lg font-bold text-on-surface">
                Cuándo SÍ usarlo (Recomendado)
              </h4>
            </div>

            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-on-surface">
              <li className="flex items-start gap-2.5">
                <span
                  className="material-symbols-outlined text-[#1B7A2E] text-[18px] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span>
                  <strong>Información secundaria:</strong> Para agrupar datos de consulta o
                  preguntas frecuentes que no todos los ciudadanos requieren revisar en paralelo.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="material-symbols-outlined text-[#1B7A2E] text-[18px] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span>
                  <strong>Optimización de scroll:</strong> En páginas de trámites con más de 4
                  bloques temáticos independientes sin necesidad de cambiar de URL.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="material-symbols-outlined text-[#1B7A2E] text-[18px] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span>
                  <strong>Escaneo guiado:</strong> Cuando los títulos permiten al usuario predecir
                  con total certeza el contenido interior antes de desplegar.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="material-symbols-outlined text-[#1B7A2E] text-[18px] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span>
                  <strong>Lenguaje Claro Distrital:</strong> Títulos redactados en formato de
                  pregunta directa en primera o tercera persona.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-surface-container-high text-xs text-[#1B7A2E] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              task_alt
            </span>
            Garantiza menor carga cognitiva ciudadana
          </div>
        </div>

        {/* DON'T: Columna Roja Errores Frecuentes */}
        <div className="bg-surface-container-lowest rounded-[15px] p-5 sm:p-6 border border-surface-container-high border-t-4 border-t-primary-container shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-primary-container">
              <span className="w-8 h-8 rounded-full bg-[#FAE7EB] flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[20px] font-bold"
                  aria-hidden="true"
                >
                  close
                </span>
              </span>
              <h4 className="font-heading text-base sm:text-lg font-bold text-on-surface">
                Cuándo NO usarlo (Errores Frecuentes)
              </h4>
            </div>

            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-on-surface">
              <li className="flex items-start gap-2.5">
                <span
                  className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  cancel
                </span>
                <span>
                  <strong>Contenido crítico:</strong> NUNCA oculte fechas límite de pago, plazos
                  fatales o requisitos indispensables que el 100% debe conocer.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  cancel
                </span>
                <span>
                  <strong>Micro-respuestas:</strong> Evite usarlo si el contenido interno solo
                  consta de 1 frase o menos de 20 palabras; expréselo visible.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  cancel
                </span>
                <span>
                  <strong>Acordeones anidados:</strong> Queda terminantemente prohibido insertar un
                  acordeón dentro de otro. Rompe la lectura accesible.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  cancel
                </span>
                <span>
                  <strong>Botones transaccionales ocultos:</strong> No encierre botones como "Pagar
                  ahora" o "Firmar Radicado" dentro de paneles cerrados.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-surface-container-high text-xs text-primary font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              warning
            </span>
            Incumple con el estándar de accesibilidad MinTIC
          </div>
        </div>
      </div>
    </section>
  );
};
