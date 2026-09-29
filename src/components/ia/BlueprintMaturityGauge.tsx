"use client";

import type { MaturityData } from "@/lib/services/aiPredictorService";
import type React from "react";

interface BlueprintMaturityGaugeProps {
  maturity: MaturityData;
}

export const BlueprintMaturityGauge: React.FC<BlueprintMaturityGaugeProps> = ({ maturity }) => {
  // Circunferencia del círculo SVG: 2 * PI * r = 2 * PI * 40 ≈ 251.32
  const circumference = 251.32;
  const strokeDashoffset = circumference * (1 - Math.min(100, Math.max(0, maturity.score)) / 100);

  return (
    <article
      aria-labelledby="maturity-title"
      className="bg-surface-container-lowest rounded-[15px] p-4 sm:p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden"
    >
      {/* Encabezado de Sección con Badge Metodológico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[5px] bg-primary/10 text-primary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              finance_mode
            </span>
          </div>
          <h3
            className="font-heading text-lg sm:text-xl text-on-surface font-bold"
            id="maturity-title"
          >
            1. Nivel de Madurez Sugerido
          </h3>
        </div>
        <span className="text-xs font-medium text-tertiary bg-tertiary-fixed/40 px-2.5 py-0.5 rounded-[5px] self-start sm:self-auto">
          {maturity.methodology}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-1">
        {/* Medidor Circular SVG de Puntuación IAI */}
        <div className="md:col-span-4 bg-surface-container-low p-4 rounded-[15px] flex flex-col items-center justify-center text-center gap-1">
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
            Índice IAI Calculado
          </span>
          <div className="relative flex items-center justify-center my-2">
            <svg
              role="img"
              aria-label={`Calificación IAI: ${maturity.score} de 100`}
              className="w-28 h-28 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <title>{`Calificación IAI: ${maturity.score} de 100`}</title>
              <circle
                className="text-surface-container-highest stroke-current"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                strokeWidth="9"
              />
              <circle
                className="text-primary-container stroke-current transition-all duration-700 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="9"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-heading text-2xl sm:text-3xl text-on-surface font-bold leading-none">
                {maturity.score.toFixed(1)}
              </span>
              <span className="text-[11px] font-medium text-on-surface-variant mt-0.5">/ 100</span>
            </div>
          </div>
          <span className="font-bold text-sm text-primary-container font-heading">
            {maturity.level}
          </span>
          <span className="text-[11px] text-on-surface-variant">{maturity.sublevel}</span>
        </div>

        {/* Desglose Visual de la Fórmula IAI y Criterios Ponderados */}
        <div className="md:col-span-8 flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between text-xs gap-1">
            <span className="font-semibold text-on-surface">Fórmula Distrital IAI:</span>
            <span className="font-mono text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-[5px]">
              {maturity.formula}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Barra 1: Impacto de Negocio */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-on-surface">Impacto de Negocio (N - 30%)</span>
                <span className="font-semibold text-on-surface">
                  {maturity.breakdown.businessImpact}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div
                  className="h-2 rounded-full bg-primary-container transition-all duration-500"
                  style={{ width: `${maturity.breakdown.businessImpact}%` }}
                />
              </div>
            </div>

            {/* Barra 2: Complejidad Técnica */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-on-surface">Complejidad Técnica (T - 25%)</span>
                <span className="font-semibold text-on-surface">
                  {maturity.breakdown.technicalComplexity}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div
                  className="h-2 rounded-full bg-tertiary transition-all duration-500"
                  style={{ width: `${maturity.breakdown.technicalComplexity}%` }}
                />
              </div>
            </div>

            {/* Barra 3: Seguridad e Identidad */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-on-surface">Seguridad e Identidad (S - 20%)</span>
                <span className="font-semibold text-on-surface">
                  {maturity.breakdown.securityIdentity}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div
                  className="h-2 rounded-full bg-[#1B7A2E] transition-all duration-500"
                  style={{ width: `${maturity.breakdown.securityIdentity}%` }}
                />
              </div>
            </div>

            {/* Barras 4 y 5: Dependencias y Operación SLA */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-on-surface-variant">Dependencias (D)</span>
                  <span className="font-semibold text-on-surface">
                    {maturity.breakdown.dependencies}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-secondary-container transition-all duration-500"
                    style={{ width: `${maturity.breakdown.dependencies}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-on-surface-variant">Operación SLA (O)</span>
                  <span className="font-semibold text-on-surface">
                    {maturity.breakdown.slaOperation}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-[#7E5700] transition-all duration-500"
                    style={{ width: `${maturity.breakdown.slaOperation}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Veredicto Oficial Callout */}
      <div className="p-3.5 rounded-[10px] bg-surface-container-low flex items-start gap-2.5 mt-1 border border-outline-variant/20">
        <span
          className="material-symbols-outlined text-[#1B7A2E] text-[22px] shrink-0 mt-0.5"
          aria-hidden="true"
        >
          task_alt
        </span>
        <div className="flex flex-col gap-0.5 text-xs sm:text-sm">
          <span className="font-bold text-on-surface">Veredicto Oficial de la IA:</span>
          <p className="text-on-surface-variant leading-relaxed">{maturity.verdict}</p>
        </div>
      </div>
    </article>
  );
};
