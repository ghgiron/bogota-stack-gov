import type React from "react";

export interface UxPrinciple {
  id: string;
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  title: string;
  description: string;
  codeSnippetHighlight?: string;
  footerText: string;
  footerColorClass: string;
}

const PRINCIPLES: UxPrinciple[] = [
  {
    id: "once-only",
    icon: "filter_1",
    iconBgClass: "bg-primary/10",
    iconColorClass: "text-primary",
    title: 'Principio "Una Sola Vez" (Once-Only)',
    description:
      "Prohibición estricta de solicitar cédulas ampliadas al 150%, certificados de libertad o documentos que reposen en bases del Estado. Todo dato existente debe prellenarse automáticamente desde  en modo lectura.",
    footerText: "Cero solicitud de fotocopias",
    footerColorClass: "text-primary",
  },
  {
    id: "persistencia",
    icon: "sync_saved_locally",
    iconBgClass: "bg-tertiary/10",
    iconColorClass: "text-tertiary",
    title: "Persistencia y Pausa Programada",
    description:
      "Cada cambio se sincroniza en caliente en el EventStore Kafka. Si el trámite requiere cita o inspección en campo, el sistema entra en pausa formal y reanuda vía SMS o WhatsApp institucional con un clic.",
    codeSnippetHighlight: "EventStore",
    footerText: "Reanudación sin pérdida de datos",
    footerColorClass: "text-tertiary",
  },
  {
    id: "cero-callejones",
    icon: "route",
    iconBgClass: "bg-secondary-container/40",
    iconColorClass: "text-on-secondary-container",
    title: "Cero Callejones Sin Salida",
    description:
      "Si un ciudadano no cumple un prerrequisito o falta un documento emitido por un tercero, la interfaz jamás muestra un error genérico; despliega la ruta de rescate, agendamiento asistido en Red CADE o contacto directo con el gestor.",
    footerText: "Ruta de rescate obligatoria",
    footerColorClass: "text-on-secondary-container",
  },
];

export const UxPrinciplesCards: React.FC = () => {
  return (
    <section className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-sm flex flex-col gap-6 border border-surface-container-highest/60">
      <div>
        <span className="font-heading text-xs text-primary font-bold uppercase tracking-wider">
          Reglas de Oro del Distrito
        </span>
        <h3 className="font-heading text-xl sm:text-2xl text-on-surface font-bold mt-1">
          3. Principios s de UX Gubernamental
        </h3>
        <p className="font-body text-sm sm:text-base text-on-surface-variant mt-1.5 leading-relaxed">
          Todo trámite certificado para entrar a{" "}
          <code className="text-primary font-mono text-sm bg-primary/5 px-1.5 py-0.5 rounded font-semibold">
            bogota.gov.co
          </code>{" "}
          debe evidenciar cumplimiento auditable de estos 3 pilares:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PRINCIPLES.map((principle) => (
          <div
            key={principle.id}
            className="bg-surface-container-low rounded-[15px] p-5 sm:p-6 flex flex-col justify-between shadow-xs border border-surface-container-highest/60 hover:border-outline-variant transition-colors"
          >
            <div>
              <div
                className={`w-10 h-10 rounded-[5px] flex items-center justify-center mb-4 ${principle.iconBgClass} ${principle.iconColorClass}`}
              >
                <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                  {principle.icon}
                </span>
              </div>
              <h4 className="font-heading text-base font-bold text-on-surface">
                {principle.title}
              </h4>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-2.5 leading-relaxed">
                {principle.description}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-surface-container-highest/60">
              <span className={`font-body text-xs font-bold ${principle.footerColorClass}`}>
                {principle.footerText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
