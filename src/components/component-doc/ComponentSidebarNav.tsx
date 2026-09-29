"use client";

import Link from "next/link";
import type React from "react";
import { useState } from "react";

interface ComponentItem {
  id: string;
  name: string;
  icon: string;
  active?: boolean;
  href: string;
}

const COMPONENTS_LIST: ComponentItem[] = [
  {
    id: "colapsables",
    name: "Colapsables",
    icon: "expand_more",
    active: true,
    href: "/kit-ui/componentes/colapsables",
  },
  {
    id: "botones",
    name: "Botones y CTA",
    icon: "smart_button",
    href: "/kit-ui/componentes/botones",
  },
  {
    id: "radio",
    name: "Botón de Radio",
    icon: "radio_button_checked",
    href: "/kit-ui/componentes/radio",
  },
  {
    id: "inputs",
    name: "Inputs (Campos de Texto)",
    icon: "edit_square",
    href: "/kit-ui/componentes/inputs",
  },
  { id: "alertas", name: "Alertas y Banners", icon: "notification_important", href: "#" },
  { id: "tarjetas", name: "Tarjetas y Paneles", icon: "dashboard", href: "#" },
  { id: "once-only", name: "Once-Only Inputs", icon: "assignment_turned_in", href: "#" },
  { id: "stepper", name: "Paso a Paso (Stepper)", icon: "linear_scale", href: "#" },
  { id: "modales", name: "Modales y Diálogos", icon: "open_in_new", href: "#" },
  { id: "tablas", name: "Tablas de Datos", icon: "table_chart", href: "#" },
  { id: "pestanas", name: "Pestañas y Píldoras", icon: "tab", href: "#" },
];

export const ComponentSidebarNav: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState("");
  const [copiedNpm, setCopiedNpm] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [submittedProposal, setSubmittedProposal] = useState(false);

  const filteredComponents = COMPONENTS_LIST.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  const handleCopyNpm = () => {
    navigator.clipboard?.writeText("npm i @bogota/ui-accordion");
    setCopiedNpm(true);
    setTimeout(() => setCopiedNpm(false), 2000);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedProposal(true);
    setTimeout(() => {
      setSubmittedProposal(false);
      setShowProposalModal(false);
    }, 2000);
  };

  return (
    <aside
      aria-label="Navegación del catálogo de componentes"
      className="lg:col-span-3 flex flex-col gap-4 sticky top-28"
    >
      <div className="bg-surface-container-lowest rounded-[15px] p-4 border border-surface-container-high shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-base font-bold text-on-surface">Componentes UI</h2>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface-variant font-mono">
            v2.4
          </span>
        </div>

        {/* Input de búsqueda rápida */}
        <div className="relative mb-4">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filtrar componentes..."
            aria-label="Filtrar componentes del catálogo"
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-surface-container-low rounded-[5px] border border-surface-container-highest text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Listado de componentes */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider text-on-surface-variant/80 font-bold px-2">
            Navegación y Estructura
          </span>

          <nav className="flex flex-col gap-1" aria-label="Componentes de navegación">
            {filteredComponents.map((item) => {
              if (item.active) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-current="page"
                    className="flex items-center justify-between px-3 py-2.5 rounded-[5px] bg-[#FAE7EB] border-l-4 border-primary text-primary font-heading text-sm font-semibold transition-all shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[18px] text-primary"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      {item.name}
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2 rounded-[5px] text-on-surface hover:bg-surface-container text-xs sm:text-sm transition-colors"
                >
                  <span className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Widget de Instalación Rápida NPM */}
        <div className="mt-4 pt-4 border-t border-surface-container-high">
          <span className="text-[11px] text-on-surface-variant block mb-1.5 font-medium">
            Instalación rápida npm
          </span>
          <div className="flex items-center justify-between bg-surface-container-low rounded-[5px] px-2.5 py-1.5 text-xs font-mono border border-surface-container-highest">
            <span className="text-on-surface truncate">npm i @bogota/ui-accordion</span>
            <button
              type="button"
              onClick={handleCopyNpm}
              className="text-primary hover:text-primary-container p-1 ml-1 rounded hover:bg-surface-container transition-colors"
              title="Copiar comando npm"
              aria-label="Copiar comando de instalación npm"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedNpm ? "done" : "content_copy"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tarjeta de Gobernanza de Componentes */}
      <div className="bg-surface-container rounded-[15px] p-4 border border-surface-container-high">
        <div className="flex items-center gap-2 text-primary font-heading text-sm font-bold">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            policy
          </span>
          Gobernanza de Componentes
        </div>
        <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
          ¿Requiere una variación no contemplada en este componente para un trámite distrital?
          Radique una propuesta ante la Mesa de Estándares.
        </p>
        <button
          type="button"
          onClick={() => setShowProposalModal(true)}
          className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-2 hover:underline focus:outline-none"
        >
          Solicitar adición al Kit →
        </button>
      </div>

      {/* Modal Accesible de Propuesta */}
      {showProposalModal && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-0 m-0"
          aria-labelledby="proposal-modal-title"
        >
          <div className="bg-surface-container-lowest rounded-[15px] p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <h3
                id="proposal-modal-title"
                className="font-heading text-base font-bold text-on-surface"
              >
                Proponer Variación a Mesa OTIC
              </h3>
              <button
                type="button"
                onClick={() => setShowProposalModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
                aria-label="Cerrar modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {submittedProposal ? (
              <div className="p-4 bg-[#EAF5EC] text-[#1B7A2E] rounded text-center text-xs font-medium">
                ¡Propuesta radicada! Se enviará confirmación a su correo institucional.
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="flex flex-col gap-3 text-xs">
                <div>
                  <label htmlFor="entidad-name" className="font-semibold block mb-1">
                    Entidad Distrital:
                  </label>
                  <input
                    id="entidad-name"
                    required
                    type="text"
                    placeholder="Ej. Secretaría de Movilidad"
                    className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/30"
                  />
                </div>
                <div>
                  <label htmlFor="variacion-desc" className="font-semibold block mb-1">
                    Descripción de la variación requerida:
                  </label>
                  <textarea
                    id="variacion-desc"
                    required
                    rows={3}
                    placeholder="Detalle la necesidad técnica o de accesibilidad..."
                    className="w-full p-2 rounded bg-surface-container-low border border-outline-variant/30 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProposalModal(false)}
                    className="px-3 py-1.5 rounded bg-surface-container text-on-surface"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-primary text-on-primary font-semibold"
                  >
                    Radicar Propuesta
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}
    </aside>
  );
};
