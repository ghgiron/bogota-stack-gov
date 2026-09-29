"use client";

import {
  ArrowLeft,
  Blocks,
  BookOpen,
  Database,
  ExternalLink,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type React from "react";
import { useState } from "react";

interface AdminSidebarProps {
  currentTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab = "guias",
  onSelectTab,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      id: "resumen",
      label: "Resumen General",
      icon: LayoutDashboard,
      href: "/admin/dashboard?tab=resumen",
    },
    {
      id: "guias",
      label: "Guías de Vinculación",
      icon: BookOpen,
      href: "/admin/guias",
    },
    {
      id: "blocks",
      label: "Building Blocks (APIs)",
      icon: Blocks,
      href: "/admin/dashboard?tab=blocks",
    },
  ];

  const handleTabClick = (tabId: string) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Botón de apertura móvil */}
      <div className="lg:hidden bg-[#1A1C20] text-white p-4 flex items-center justify-between border-b border-[#2A2D34] sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo_bogota_color.png"
            alt="Logo Bogotá"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-heading font-bold text-sm tracking-wide">
            SGAB <span className="text-primary">Backoffice</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Cerrar menú lateral" : "Abrir menú lateral"}
          className="min-h-touch min-w-touch p-2 rounded-btn text-white/80 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Desktop y Drawer Móvil */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1A1C20] text-white flex flex-col justify-between border-r border-[#2A2D34] transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:min-h-screen ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navegación del Administrador"
      >
        <div>
          {/* Cabecera del Sidebar con Logo e Identidad SGAB */}
          <div className="p-6 border-b border-[#2A2D34] flex items-center gap-3.5">
            <div className="relative w-10 h-10 flex-shrink-0 bg-white/5 rounded-btn p-1.5 flex items-center justify-center border border-white/10">
              <Image
                src="/images/logo_bogota_color.png"
                alt="Escudo Oficial de Bogotá D.C."
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm tracking-tight text-white">
                SECRETARÍA GENERAL
              </span>
              <span className="text-[11px] font-medium text-secondary tracking-wide uppercase">
                Bogotá Stack • Backoffice
              </span>
            </div>
          </div>

          {/* Estado de infraestructura NoSQL */}
          <div className="mx-4 my-4 p-3 rounded-btn bg-[#23262C] border border-[#2E323A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-tertiary" aria-hidden="true" />
              <span className="text-xs font-medium text-white/80">NoSQL Firestore</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-950/60 px-2 py-0.5 rounded-full border border-green-800">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Activo
            </span>
          </div>

          {/* Menú de Navegación */}
          <nav className="px-3 py-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 px-3 mb-2">
              Gestión Distrital
            </div>
            <ul className="space-y-1.5 list-none p-0 m-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.id === "guias"
                    ? pathname.startsWith("/admin/guias") ||
                      (pathname === "/admin/dashboard" && currentTab === "guias")
                    : pathname.startsWith("/admin/guias")
                      ? false
                      : currentTab === item.id;

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (onSelectTab) onSelectTab(item.id);
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-btn text-sm font-medium transition-colors min-h-touch text-left ${
                        isActive
                          ? "bg-primary text-white font-semibold shadow-sm"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary`}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-white/60"}`}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Pie del Sidebar: Retorno al portal y versión */}
        <div className="p-4 border-t border-[#2A2D34] space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-btn text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors min-h-touch focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-white/60" aria-hidden="true" />
              <span>Ver Portal Ciudadano</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-white/40" aria-hidden="true" />
          </Link>

          <div className="px-3 pt-2 text-[11px] text-white/40 flex items-center justify-between border-t border-[#23262C]">
            <span>MVP v0.3.0 (Sprint 3)</span>
            <span className="text-secondary font-mono">B2G Hub</span>
          </div>
        </div>
      </aside>

      {/* Overlay accesible para fondo en móvil */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menú lateral"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileOpen(false);
          }}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs w-full h-full border-0 p-0 cursor-default"
        />
      )}
    </>
  );
};
