"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useMemo, useState } from "react";

export interface SidebarLibraryProps {
  activeComponentSlug?: string;
}

interface NavItem {
  id: string;
  name: string;
  href: string;
  badge?: string;
  icon?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    title: "Estilos y Fundamentos",
    items: [
      {
        id: "fundamentos",
        name: "Fundamentos Visuales",
        href: "/libreria-ui/fundamentos",
        icon: "auto_awesome",
      },
      {
        id: "colores",
        name: "Colores y Paleta",
        href: "/kit-ui/colores",
        icon: "palette",
      },
      {
        id: "tipografia",
        name: "Tipografía (Montserrat)",
        href: "/kit-ui/tipografia",
        icon: "text_fields",
      },
      {
        id: "espaciados",
        name: "Grilla y Espaciados",
        href: "/kit-ui/espaciados",
        icon: "grid_view",
      },
      {
        id: "iconos",
        name: "Íconos y símbolos",
        href: "/kit-ui/iconos",
        icon: "sentiment_satisfied",
      },
      {
        id: "bordes",
        name: "Bordes y Sombras",
        href: "/kit-ui/bordes",
        icon: "border_style",
      },
    ],
  },
  {
    title: "Componentes UI",
    items: [
      {
        id: "botones",
        name: "Botones",
        href: "/kit-ui/componentes/botones",
        icon: "smart_button",
      },
      {
        id: "colapsables",
        name: "Colapsables",
        href: "/kit-ui/componentes/colapsables",
        icon: "expand_more",
      },
      {
        id: "radio",
        name: "Botón de radio",
        href: "/kit-ui/componentes/radio",
        icon: "radio_button_checked",
      },
      {
        id: "inputs",
        name: "Inputs (Campos de texto)",
        href: "/kit-ui/componentes/inputs",
        icon: "edit_square",
      },
      { id: "modales", name: "Modales y Diálogos", href: "#", icon: "web_asset" },
      { id: "tablas", name: "Tablas de Datos", href: "#", icon: "table_chart" },
      { id: "stepper", name: "Paso a Paso (Stepper)", href: "#", icon: "linear_scale" },
    ],
  },
];

export const SidebarLibrary: React.FC<SidebarLibraryProps> = ({ activeComponentSlug }) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return SECTIONS;

    return SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q),
      ),
    })).filter((section) => section.items.length > 0);
  }, [searchQuery]);

  const isItemActive = (item: NavItem) => {
    if (activeComponentSlug) {
      return item.id === activeComponentSlug;
    }
    if (!pathname || item.href === "#") return false;
    const cleanHref = item.href.split("?")[0];
    if (item.id === "fundamentos") {
      return pathname === "/libreria-ui/fundamentos";
    }
    return pathname === cleanHref;
  };

  return (
    <aside
      aria-label="Navegación del catálogo de la Librería UI Kit"
      className="lg:col-span-3 w-full flex flex-col gap-4 lg:sticky lg:top-28"
    >
      <div className="bg-surface-container-lowest rounded-[15px] p-4 border border-surface-container-high shadow-xs">
        {/* Encabezado del Menú */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" aria-hidden="true" />
            <h2 className="font-heading text-sm sm:text-base font-bold text-on-surface">
              Librería UI Bogotá
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant border border-surface-container-high">
            v2.4
          </span>
        </div>

        {/* Buscador Rápido de Componentes */}
        <div className="relative mb-4">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar componentes..."
            aria-label="Filtrar componentes y fundamentos de la librería"
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-surface-container-low rounded-[5px] border border-surface-container-highest text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Listado de Secciones y Enlaces */}
        <div className="flex flex-col gap-5 max-h-[580px] overflow-y-auto pr-1">
          {filteredSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold px-2 font-heading">
                {section.title}
              </span>

              <nav className="flex flex-col gap-1" aria-label={section.title}>
                {section.items.map((item) => {
                  const isActive = isItemActive(item);

                  if (isActive) {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between px-3 py-2.5 rounded-[5px] border-l-4 border-l-[#CC0E35] bg-[#FAE7EB] text-[#CC0E35] font-semibold text-xs transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="material-symbols-outlined text-[18px] text-[#CC0E35] shrink-0"
                            aria-hidden="true"
                          >
                            {item.icon || "radio_button_checked"}
                          </span>
                          <span className="truncate font-heading">{item.name}</span>
                        </div>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#CC0E35] text-white shrink-0 font-body">
                          Activo
                        </span>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 rounded-[5px] text-xs font-medium text-on-surface hover:bg-surface-container hover:text-primary transition-colors group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary shrink-0 transition-colors"
                          aria-hidden="true"
                        >
                          {item.icon || "widgets"}
                        </span>
                        <span className="truncate font-body">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] text-on-surface-variant px-1.5 py-0.5 rounded bg-surface-container-high group-hover:bg-surface-container-highest">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="p-4 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-3xl mb-1 text-gray-400">
                search_off
              </span>
              <p className="text-xs font-semibold">No hay resultados</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-1 text-xs text-primary underline"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tarjeta Informativa de Figma Kit */}
      <div className="bg-surface-container-low rounded-[15px] p-4 border border-surface-container-high shadow-xs">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">
            palette
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-xs font-bold text-on-surface">Figma UI Kit Bogotá</h3>
            <p className="font-body text-[11px] text-on-surface-variant leading-relaxed">
              Componentes, variantes y tokens sincronizados con el estándar oficial de la SGAB.
            </p>
            <a
              href="https://www.figma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline min-h-[36px]"
            >
              <span>Abrir en Figma Community</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
