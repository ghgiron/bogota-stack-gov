import { SUGGESTED_QUERIES } from "@/lib/ai/prompts";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type React from "react";

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  onSelectPrompt,
  disabled = false,
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
        <Sparkles className="w-3.5 h-3.5 text-secondary-dark" aria-hidden="true" />
        <span>Consultas frecuentes de arquitectura distrital:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SUGGESTED_QUERIES.map((item) => (
          <button
            key={item.title}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPrompt(item.prompt)}
            className="text-left p-3 rounded-btn bg-surface border border-gray-200 hover:border-primary/40 hover:bg-bg-main transition-colors duration-150 flex items-start justify-between gap-2 text-xs text-text-main group min-h-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary disabled:opacity-50 disabled:pointer-events-none"
          >
            <div>
              <div className="font-heading font-bold text-text-main group-hover:text-primary transition-colors flex items-center gap-1.5">
                <span>{item.title}</span>
                <span className="text-[10px] font-normal text-text-muted bg-gray-100 px-1.5 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
              <div className="text-[11px] text-text-muted mt-1 line-clamp-2 leading-relaxed">
                {item.prompt}
              </div>
            </div>
            <ArrowUpRight
              className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors shrink-0 mt-0.5"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
