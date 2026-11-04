import type React from "react";

export const GovLlmHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-12 sm:py-16 lg:py-20 border-b border-surface-container-high/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className="font-heading font-bold text-[#1E1E1E] text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-6 max-w-4xl">
          Inteligencia Artificial al servicio de la administración distrital
        </h1>

        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed mb-8">
          El modelo asiste en la orientación a la ciudadanía y en la proyección de respuestas estructuradas,
          fundamentadas en fuentes documentales oficiales y bajo los lineamientos de
          lenguaje claro.
        </p>


      </div>
    </section>
  );
};
