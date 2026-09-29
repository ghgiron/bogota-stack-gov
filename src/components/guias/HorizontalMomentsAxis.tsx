import type React from "react";

export interface CitizenMoment {
  index: number;
  name: string;
  description: string;
  tag: string;
  tagClass: string;
  icon: string;
  isActive?: boolean;
}

const MOMENTS: CitizenMoment[] = [
  {
    index: 0,
    name: "Conozco",
    description: "Que obtengo, requisitos, tarifas, tiempos y canales.",
    tag: "Ficha de la Oferta",
    tagClass: "text-primary font-semibold",
    icon: "info",
  },
  {
    index: 1,
    name: "Preparo",
    description: "Validación previa, alistamiento, prerequisitos (opcional)",
    tag: "Opcional",
    tagClass: "text-tertiary font-semibold",
    icon: "folder_open",
  },
  {
    index: 2,
    name: "Hago Solicitud",
    description: "Diligencio, Pago, firmo, radico.",
    tag: "Momento Activo SUIT",
    tagClass: "text-primary font-bold",
    icon: "edit_document",
    isActive: true,
  },
  {
    index: 3,
    name: "Gestiono",
    description: "Seguimiento, subsanación, ampliación, notificaciones",
    tag: "Opcional",
    tagClass: "text-tertiary font-semibold",
    icon: "monitoring",
  },
  {
    index: 4,
    name: "Respuesta",
    description: "Descarga, turno agendado, proceso finalizado.",
    tag: "Fin",
    tagClass: "text-tertiary font-semibold",
    icon: "verified_user",
  },
];

export const HorizontalMomentsAxis: React.FC = () => {
  return (
    <section className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-sm flex flex-col gap-6 border border-surface-container-highest/60">
      {/* Header de Metodología */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="font-heading text-xs text-primary font-bold uppercase tracking-wider">
            Metodología Central
          </span>
          <h3 className="font-heading text-xl sm:text-2xl text-on-surface font-bold mt-1">
            1. Modelo de Navegación Bidimensional
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full self-start sm:self-auto font-body">
          <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">
            view_quilt
          </span>
          <span>Eje Horizontal + Eje Vertical</span>
        </span>
      </div>

      <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
        A diferencia de los portales estáticos tradicionales, Bogotá Stack estructura cualquier
        trámite distrital en una matriz de dos dimensiones: el{" "}
        <strong className="text-on-surface">Eje Horizontal</strong> (los 5 momentos de experiencia
        de la oferta distrital) y el <strong className="text-on-surface">Eje Vertical</strong>{" "}
        (pasos comunes para la realización de un trámite, servicio OPA, CAIV).
      </p>

      {/* Horizontal Axis: 5 Citizen Moments Infographic */}
      <div className="mt-1">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="font-heading text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">
              timeline
            </span>
            <span>Eje Horizontal: Los 5 Momentos de la Experiencia</span>
          </span>
          <span className="font-body text-xs text-on-surface-variant">
            Secuencia no lineal asistida
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {MOMENTS.map((moment) => {
            if (moment.isActive) {
              return (
                <div
                  key={moment.index}
                  className="bg-primary/5 rounded-[10px] p-4 flex flex-col justify-between shadow-xs border border-primary/20 relative"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-bold text-[12px] flex items-center justify-center font-heading">
                        {moment.index}
                      </span>
                      <span
                        className="material-symbols-outlined text-primary-container text-[20px]"
                        aria-hidden="true"
                      >
                        {moment.icon}
                      </span>
                    </div>
                    <h4 className="font-heading text-sm text-primary-container font-bold mt-2.5">
                      {moment.name}
                    </h4>
                    <p className="font-body text-xs text-on-surface mt-1 leading-snug font-medium">
                      {moment.description}
                    </p>
                  </div>
                  <span className="mt-3 inline-block font-body text-[11px] text-primary font-bold">
                    {moment.tag}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={moment.index}
                className="bg-surface-container-low hover:bg-surface-container rounded-[10px] p-4 flex flex-col justify-between transition-colors border border-surface-container-highest/60"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-bold text-[12px] flex items-center justify-center font-heading">
                      {moment.index}
                    </span>
                    <span
                      className="material-symbols-outlined text-on-surface-variant text-[20px]"
                      aria-hidden="true"
                    >
                      {moment.icon}
                    </span>
                  </div>
                  <h4 className="font-heading text-sm text-on-surface font-bold mt-2.5">
                    {moment.name}
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant mt-1 leading-snug">
                    {moment.description}
                  </p>
                </div>
                <span className={`mt-3 inline-block font-body text-[11px] ${moment.tagClass}`}>
                  {moment.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
