import { ButtonBogota } from "@/components/ui/ButtonBogota";
import { Database, Plus, ShieldCheck, User } from "lucide-react";
import type React from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onNewGuideClick?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, onNewGuideClick }) => {
  return (
    <header className="bg-surface border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      <div>
        <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
          <span className="font-semibold text-primary">SGAB Backoffice</span>
          <span>/</span>
          <span>Panel de Gestión</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl text-text-main leading-tight">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Identificación del Gestor Distrital */}
        <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-btn bg-bg-main border border-gray-200 text-xs">
          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
            <User className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-text-main">Gestor Técnico SGAB</div>
            <div className="text-[10px] text-text-muted">Secretaría General</div>
          </div>
        </div>

        {onNewGuideClick && (
          <ButtonBogota
            variant="primary"
            size="sm"
            onClick={onNewGuideClick}
            leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
          >
            Nueva Guía
          </ButtonBogota>
        )}
      </div>
    </header>
  );
};
