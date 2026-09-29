import { ArrowRight, CheckCircle2 } from "lucide-react";
import type React from "react";

export const AvisoDistrital: React.FC = () => {
  return (
    <aside
      aria-label="Notificación oficial del Distrito"
      className="w-full bg-surface-container-low border-b border-surface-container-highest"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-container text-on-primary shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
          <p className="text-xs sm:text-sm text-on-surface truncate font-body">
            <strong className="font-semibold text-primary">Aviso Distrital:</strong> Estándar
            oficial de diseño, integración e interoperabilidad técnica para las 60+ entidades del
            Distrito.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-[5px] bg-secondary-container/20 text-on-surface text-[11px] font-semibold tracking-wide">
            ACUERDO 02 DE 2025
          </span>
          <a
            className="text-xs text-tertiary hover:underline font-medium inline-flex items-center gap-0.5 focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:outline-none rounded"
            href="#modulos-estrategicos"
          >
            <span>Conocer lineamientos</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  );
};
