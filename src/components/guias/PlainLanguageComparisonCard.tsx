import { CheckCircle2, XCircle } from "lucide-react";
import type React from "react";

export interface PlainLanguageComparisonProps {
  category?: string;
  title?: string;
  description?: string;
  dontText: string;
  dontReason: string;
  doText: string;
  doReason: string;
}

export const PlainLanguageComparisonCard: React.FC<PlainLanguageComparisonProps> = ({
  category,
  title,
  description,
  dontText,
  dontReason,
  doText,
  doReason,
}) => {
  return (
    <div className="w-full flex flex-col gap-3 rounded-[15px] bg-surface-container-lowest border border-surface-container-high p-5 sm:p-6 shadow-xs">
      {(category || title) && (
        <div className="flex flex-col gap-1 pb-3 border-b border-surface-container-high/60">
          {category && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant font-heading">
              {category}
            </span>
          )}
          {title && <h4 className="font-heading text-base font-bold text-on-surface">{title}</h4>}
          {description && (
            <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Lado Incorrecto (Don't / Error) */}
        <div className="flex flex-col justify-between p-4 sm:p-5 rounded-[12px] bg-red-500/10 border border-[#BA1A1A]/20 shadow-xs">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] bg-[#BA1A1A] text-white text-[11px] font-bold font-heading">
                <XCircle className="w-3.5 h-3.5" />
                MALA PRÁCTICA (DON'T)
              </span>
              <span className="text-[11px] font-semibold text-[#BA1A1A]">
                Burocrático / Confuso
              </span>
            </div>

            <div className="p-3 rounded-[8px] bg-white/80 border border-[#BA1A1A]/30">
              <p className="font-body text-xs sm:text-sm text-[#BA1A1A] font-medium leading-relaxed italic">
                “{dontText}”
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#BA1A1A]/20">
            <span className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">
              Por qué falla:
            </span>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              {dontReason}
            </p>
          </div>
        </div>

        {/* Lado Correcto (Do / Éxito) */}
        <div className="flex flex-col justify-between p-4 sm:p-5 rounded-[12px] bg-[#EAF5EC] border border-[#1B7A2E]/20 shadow-xs">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] bg-[#1B7A2E] text-white text-[11px] font-bold font-heading">
                <CheckCircle2 className="w-3.5 h-3.5" />
                BUENA PRÁCTICA (DO)
              </span>
              <span className="text-[11px] font-semibold text-[#1B7A2E]">
                Claro, Cercano y Activo
              </span>
            </div>

            <div className="p-3 rounded-[8px] bg-white/90 border border-[#1B7A2E]/30">
              <p className="font-body text-xs sm:text-sm text-[#1B7A2E] font-semibold leading-relaxed">
                “{doText}”
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#1B7A2E]/20">
            <span className="block text-[11px] font-bold text-[#1B7A2E] uppercase tracking-wider mb-0.5">
              Por qué funciona:
            </span>
            <p className="font-body text-xs text-on-surface leading-relaxed font-medium">
              {doReason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
