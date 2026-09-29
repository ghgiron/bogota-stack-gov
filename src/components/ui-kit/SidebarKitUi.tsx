"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";

export const SidebarKitUi: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const fundamentos = [
    { label: "Colores y Paleta", href: "/kit-ui/colores", icon: "palette" },
    { label: "Tipografía (Montserrat)", href: "/kit-ui/tipografia", icon: "text_fields" },
    { label: "Grilla y Espaciados", href: "/kit-ui/espaciados", icon: "grid_view" },
    { label: "Íconos y símbolos", href: "/kit-ui/iconos", icon: "sentiment_satisfied" },
    { label: "Bordes y Sombras", href: "/kit-ui/bordes", icon: "border_style" },
  ];

  const componentes = [
    { label: "Botones", href: "/kit-ui/componentes/botones", icon: "smart_button" },
    { label: "Colapsables", href: "/kit-ui/componentes/colapsables", icon: "expand_more" },
    { label: "Botón de radio", href: "/kit-ui/componentes/radio", icon: "radio_button_checked" },
    { label: "Inputs (Campos de texto)", href: "/kit-ui/componentes/inputs", icon: "edit_square" },
    {
      label: "Dropdowns (Selectores)",
      href: "/kit-ui/componentes/dropdowns",
      icon: "arrow_drop_down_circle",
    },
  ];

  return (
    <aside
      aria-label="Navegación del Kit UI Bogotá"
      className={`bg-surface-container-lowest rounded-[15px] border border-surface-container-high shadow-xs shrink-0 lg:sticky lg:top-28 max-h-[calc(100vh-8rem)] overflow-y-auto transition-all duration-300 ease-in-out ${isCollapsed ? "w-full lg:w-16 p-2 lg:p-2.5" : "w-full lg:w-64 p-4"
        }`}
    >
      {/* Cabecera del Sidebar con Botón Accesible de Alternancia (Toggle) */}
      <div
        className={`flex items-center mb-4 pb-2 border-b border-surface-container-high transition-all ${isCollapsed ? "justify-center" : "justify-between"
          }`}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-heading font-bold text-on-surface text-base truncate">
              Kit UI Bogotá
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface-variant shrink-0">
              v1.0
            </span>
          </div>
        )}

        {/* Botón Accesible de Colapso / Expansión (WCAG 2.2 AA - Área táctil >= 44x44px) */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
          aria-expanded={!isCollapsed}
          title={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-[8px] flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
            {isCollapsed ? "last_page" : "first_page"}
          </span>
        </button>
      </div>

      {/* Contenido del Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Sección Estilos y Fundamentos */}
        <div>
          {!isCollapsed && (
            <span className="font-heading uppercase tracking-wider text-on-surface-variant font-bold text-xs px-2 block mb-2 truncate">
              Estilos y Fundamentos
            </span>
          )}
          <nav
            className="flex flex-col gap-1"
            aria-label={isCollapsed ? "Estilos y Fundamentos (iconos)" : "Estilos y Fundamentos"}
          >
            {fundamentos.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  aria-label={item.label}
                  className={`flex items-center rounded-[5px] text-xs font-body transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3 py-2"
                    } ${isActive
                      ? "bg-[#FAE7EB] border-l-4 border-[#CC0E35] text-[#CC0E35] font-semibold shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium"
                    }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px] shrink-0"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sección Componentes UI */}
        <div>
          {!isCollapsed && (
            <span className="font-heading uppercase tracking-wider text-on-surface-variant font-bold text-xs px-2 block mb-2 truncate">
              Componentes UI
            </span>
          )}
          <nav
            className="flex flex-col gap-1"
            aria-label={isCollapsed ? "Componentes UI (iconos)" : "Componentes UI"}
          >
            {componentes.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  aria-label={item.label}
                  className={`flex items-center rounded-[5px] text-xs font-body transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3 py-2"
                    } ${isActive
                      ? "bg-[#FAE7EB] border-l-4 border-[#CC0E35] text-[#CC0E35] font-semibold shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium"
                    }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px] shrink-0"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};
