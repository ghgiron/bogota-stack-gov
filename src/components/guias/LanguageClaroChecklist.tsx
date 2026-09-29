"use client";

import { Check, CheckCircle2, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface CheckItem {
  id: string;
  category: string;
  title: string;
  description: string;
  auditQuestion: string;
}

const CHECKLIST_ITEMS: CheckItem[] = [
  {
    id: "primera-lectura",
    category: "Comprensión Directa",
    title: "¿El texto se comprende desde la primera lectura?",
    description:
      "Oraciones cortas (máximo 25 palabras), párrafos de 4 a 5 líneas y eliminación total de jerga jurídica o tecnicismos internos.",
    auditQuestion:
      "¿Una persona sin formación jurídica o técnica entiende de inmediato qué trámite está realizando?",
  },
  {
    id: "accion-evidente",
    category: "Llamada a la Acción (CTA)",
    title: "¿La acción a seguir es inmediatamente evidente?",
    description:
      "Los botones y enlaces inician con un verbo en acción directa (ej. 'Descargar certificado', 'Radicar solicitud') en lugar de términos ambiguos.",
    auditQuestion:
      "¿El usuario sabe con total certeza qué pasará en la pantalla siguiente al hacer clic?",
  },
  {
    id: "regla-ciudadania",
    category: "Enfoque Distrital",
    title: "¿Se aplica la regla oficial de 'la ciudadanía'?",
    description:
      "Sustitución sistemática de 'el ciudadano' o 'los ciudadanos' por el término institucional unificado 'la ciudadanía' o giros neutros.",
    auditQuestion:
      "¿Se eliminaron las referencias en masculino genérico individual ('el solicitante', 'el ciudadano')?",
  },
  {
    id: "cero-simbolos-inaccesibles",
    category: "Accesibilidad WCAG 2.2",
    title: "¿Cero uso de símbolos '@', 'x' o 'e' (tod@s, lxs)?",
    description:
      "Cumplimiento estricto para no romper lectores de pantalla (NVDA, JAWS, VoiceOver) mediante el uso de sustantivos epicenos y parafraseo.",
    auditQuestion:
      "¿El texto puede ser vocalizado fluidamente por un sintetizador de voz sin deletreos absurdos?",
  },
  {
    id: "enlaces-descriptivos",
    category: "Microcopy de Navegación",
    title: "¿Todos los enlaces describen acción y destino?",
    description:
      "Prohibición radical de 'Clic aquí', 'Ver más' o 'Haz clic acá'. Los hipervínculos indican documento, formato y peso (ej. 'Descargar Decreto 640 (PDF, 250 KB)').",
    auditQuestion:
      "¿Si se extrae la lista de enlaces de la página fuera de contexto, cada uno tiene sentido por sí mismo?",
  },
  {
    id: "error-tres-pasos",
    category: "Resiliencia & Errores",
    title: "¿Los mensajes de error siguen la fórmula de 3 pasos?",
    description:
      "1) Qué pasó, 2) Por qué ocurrió, y 3) Cómo solucionarlo con una ruta de rescate accionable sin culpar al navegante.",
    auditQuestion:
      "¿El mensaje evita códigos HTTP crípticos (400, 422) y ofrece un botón o teléfono de soporte?",
  },
];

export const LanguageClaroChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setCheckedIds(CHECKLIST_ITEMS.map((item) => item.id));
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  const completedCount = checkedIds.length;
  const totalCount = CHECKLIST_ITEMS.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const getStatusBadge = () => {
    if (percentage === 100) {
      return {
        text: "Certificado en Lenguaje Claro Distrital",
        classes: "bg-[#EAF5EC] text-[#1B7A2E] border border-[#1B7A2E]/30",
        icon: ShieldCheck,
      };
    }
    if (percentage >= 60) {
      return {
        text: "En subsanación léxica (Faltan criterios)",
        classes: "bg-secondary-container/40 text-on-secondary-container border border-secondary/30",
        icon: Sparkles,
      };
    }
    return {
      text: "En revisión crítica (No apto para pase a producción)",
      classes: "bg-red-500/10 text-red-700 border border-red-200",
      icon: RotateCcw,
    };
  };

  const status = getStatusBadge();
  const StatusIcon = status.icon;

  return (
    <div className="w-full bg-surface-container-low rounded-[15px] border border-surface-container-high p-5 sm:p-7 flex flex-col gap-6 shadow-xs">
      {/* Header del Evaluador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 text-primary font-heading text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Herramienta de Autoevaluación</span>
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
            Checklist de Lenguaje Claro
          </h3>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Verifica que tus contenuidos cumplan los 6 filtros de lenguaje claro.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleSelectAll}
            className="px-3 py-1.5 text-xs font-heading font-semibold text-primary hover:bg-primary/10 rounded-[5px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE]"
          >
            Marcar todos
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-heading font-semibold text-on-surface-variant hover:bg-surface-container-high rounded-[5px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE]"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Barra de Progreso e Indicador de Madurez */}
      <div className="flex flex-col gap-2.5 bg-surface-container-lowest p-4 rounded-[10px] border border-surface-container-high">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-body">
          <div className="flex items-center gap-2">
            <span className="font-bold text-on-surface font-heading text-sm">
              Progreso
            </span>
            <span className="font-mono font-bold text-base text-primary">{percentage}%</span>
            <span className="text-on-surface-variant text-xs">
              ({completedCount} de {totalCount} criterios validados)
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] text-xs font-bold font-heading ${status.classes}`}
          >
            <StatusIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{status.text}</span>
          </span>
        </div>

        {/* Barra Visual */}
        <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${percentage === 100 ? "bg-[#1B7A2E]" : percentage >= 60 ? "bg-secondary" : "bg-primary"
              }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Lista de Criterios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
              tabIndex={0}
              role="checkbox"
              aria-checked={isChecked}
              className={`p-4 rounded-[12px] border transition-all cursor-pointer select-none flex items-start gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${isChecked
                ? "bg-[#EAF5EC]/70 border-[#1B7A2E]/40 shadow-xs"
                : "bg-surface-container-lowest border-surface-container-high hover:border-outline-variant hover:bg-surface-container-low"
                }`}
            >
              <div
                className={`w-5 h-5 rounded-[4px] mt-0.5 shrink-0 flex items-center justify-center transition-colors border ${isChecked
                  ? "bg-[#1B7A2E] border-[#1B7A2E] text-white"
                  : "border-surface-container-highest bg-surface-container-low"
                  }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="min-w-0 flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant font-heading">
                    {item.category}
                  </span>
                  {isChecked && (
                    <span className="text-[10px] font-bold text-[#1B7A2E] bg-[#EAF5EC] px-1.5 py-0.5 rounded shrink-0">
                      Cumplido
                    </span>
                  )}
                </div>

                <h4
                  className={`font-heading text-xs sm:text-sm font-bold ${isChecked ? "text-[#1B7A2E]" : "text-on-surface"
                    }`}
                >
                  {item.title}
                </h4>

                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-1 pt-1.5 border-t border-surface-container-high/60 text-[11px] text-on-surface font-medium flex items-center gap-1.5">
                  <span className="text-primary font-bold">Pregunta de auditoría:</span>
                  <span className="italic text-on-surface-variant">{item.auditQuestion}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
