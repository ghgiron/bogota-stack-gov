"use client";

import type { StepItem, StepStatus } from "@/types/tramites";
import { Check } from "lucide-react";
import type React from "react";

export interface StepperVerticalProps {
  steps: StepItem[];
  currentStepIndex: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  allowStepBack?: boolean;
}

/**
 * Stepper Vertical accesible basado en las directrices de SGDS y Obelisco
 * Estados visuales:
 * - Completado: Verde (#10B981) con icono de Check
 * - Actual: Azul Distrital (#3366CC) con anillo de enfoque y número destacado
 * - Pendiente: Gris (#9CA3AF / #E5E7EB)
 */
export const StepperVertical: React.FC<StepperVerticalProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  className = "",
  allowStepBack = true,
}) => {
  const getStepStatus = (index: number, step: StepItem): StepStatus => {
    if (step.status) return step.status;
    if (index < currentStepIndex) return "completed";
    if (index === currentStepIndex) return "current";
    return "pending";
  };

  return (
    <nav aria-label="Progreso del trámite" className={`w-full ${className}`}>
      <ol className="relative space-y-0">
        {steps.map((step, index) => {
          const status = getStepStatus(index, step);
          const isCompleted = status === "completed";
          const isCurrent = status === "current";
          const isPending = status === "pending";
          const isLast = index === steps.length - 1;
          const isClickable =
            allowStepBack && onStepClick && isCompleted && index !== currentStepIndex;

          const stepNumber = index + 1;

          // Etiqueta accesible para lectores de pantalla
          const accessibleStateText = isCompleted
            ? "Paso completado"
            : isCurrent
              ? "Paso actual"
              : "Paso pendiente";

          return (
            <li
              key={step.id}
              className="relative flex items-start group"
              aria-current={isCurrent ? "step" : undefined}
            >
              {/* Línea conectora vertical entre pasos (excepto el último) */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={`absolute left-5 top-10 -ml-px w-0.5 h-[calc(100%-1.25rem)] transition-colors duration-300 ${
                    index < currentStepIndex ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                />
              )}

              {/* Botón o contenedor del indicador */}
              <div className="flex items-start w-full min-h-[4.5rem]">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(index)}
                  className={`flex items-start text-left w-full group/btn rounded-btn p-1 -m-1 transition-all ${
                    isClickable
                      ? "cursor-pointer hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary"
                      : "cursor-default focus:outline-none"
                  }`}
                  aria-label={`${accessibleStateText}: Paso ${stepNumber}, ${step.title}`}
                >
                  {/* Círculo indicador de estado (mínimo 40px, centrado en área de 44px) */}
                  <div className="relative flex items-center justify-center min-w-[2.75rem] min-h-[2.75rem] mr-3 sm:mr-4 shrink-0">
                    {isCompleted && (
                      <span className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover/btn:scale-105">
                        <Check className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                        <span className="sr-only">Completado</span>
                      </span>
                    )}

                    {isCurrent && (
                      <span className="w-10 h-10 rounded-full bg-tertiary text-white flex items-center justify-center font-heading font-bold text-sm shadow-md ring-4 ring-tertiary/20">
                        {stepNumber}
                        <span className="sr-only">Actual</span>
                      </span>
                    )}

                    {isPending && (
                      <span className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-300 text-gray-500 flex items-center justify-center font-heading font-medium text-sm">
                        {stepNumber}
                        <span className="sr-only">Pendiente</span>
                      </span>
                    )}
                  </div>

                  {/* Textos del Paso */}
                  <div className="pt-1.5 pb-4 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs uppercase tracking-wider font-semibold font-body ${
                          isCompleted
                            ? "text-emerald-700"
                            : isCurrent
                              ? "text-tertiary"
                              : "text-gray-400"
                        }`}
                      >
                        Paso {stepNumber}
                      </span>
                      {step.optional && (
                        <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          Opcional
                        </span>
                      )}
                    </div>

                    <h3
                      className={`font-heading text-sm sm:text-base leading-tight mt-0.5 transition-colors ${
                        isCurrent
                          ? "font-bold text-text-main"
                          : isCompleted
                            ? "font-semibold text-text-main group-hover/btn:text-tertiary"
                            : "font-normal text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {step.description && (
                      <p
                        className={`text-xs mt-1 font-body leading-relaxed ${
                          isCurrent
                            ? "text-text-muted"
                            : isCompleted
                              ? "text-gray-500"
                              : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
