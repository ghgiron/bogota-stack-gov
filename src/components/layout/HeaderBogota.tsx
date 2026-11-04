"use client";

import {
  Accessibility,
  ArrowRight,
  Building2,
  ChevronDown,
  Code2,
  Component,
  CreditCard,
  FileCheck2,
  FileKey,
  FileText,
  KeyRound,
  Layers,
  Menu,
  MessageSquare,
  Palette,
  ShieldCheck,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { MegamenuDropdown } from "../MegamenuDropdown";

type ActiveMegamenu = "empezar" | "guias" | "soluciones" | "libreria" | null;

export const HeaderBogota: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<ActiveMegamenu>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState(100);
  const pathname = usePathname();
  const navContainerRef = useRef<HTMLElement>(null);

  // Close menus on route change
  useEffect(() => {
    if (pathname) {
      setActiveMenu(null);
      setMobileMenuOpen(false);
    }
  }, [pathname]);

  // Admin routes handle their own layout
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleDecreaseFont = () => {
    setFontSizeScale((prev) => Math.max(90, prev - 5));
    document.documentElement.style.fontSize = `${Math.max(90, fontSizeScale - 5)}%`;
  };

  const handleIncreaseFont = () => {
    setFontSizeScale((prev) => Math.min(120, prev + 5));
    document.documentElement.style.fontSize = `${Math.min(120, fontSizeScale + 5)}%`;
  };

  const handleToggleContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
  };

  const toggleMenu = (menu: ActiveMegamenu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="sticky top-0 w-full z-50">
      {/* 1. TOP BAR OFICIAL DE LA ALCALDÍA MAYOR (Fondo Rojo Bogotá) */}
      <div className="bg-primary text-on-primary border-b border-primary-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          {/* Identificación institucional */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-xs tracking-wide uppercase font-semibold font-heading">
              ALCALDÍA MAYOR DE BOGOTÁ D.C. | SECRETARÍA GENERAL
            </span>
          </div>

          {/* Herramientas de Accesibilidad */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-heading">
            <div className="flex items-center gap-1">
              <span className="opacity-80 text-[11px] hidden sm:inline">Accesibilidad:</span>
              <button
                type="button"
                onClick={handleDecreaseFont}
                aria-label="Disminuir tamaño de texto"
                className="px-2 py-0.5 rounded hover:bg-primary-container transition-colors focus:ring-1 focus:ring-white focus:outline-none min-h-[28px] min-w-[28px] flex items-center justify-center font-bold"
              >
                A-
              </button>
              <button
                type="button"
                onClick={handleIncreaseFont}
                aria-label="Aumentar tamaño de texto"
                className="px-2 py-0.5 rounded hover:bg-primary-container transition-colors focus:ring-1 focus:ring-white focus:outline-none min-h-[28px] min-w-[28px] flex items-center justify-center font-bold"
              >
                A+
              </button>
              <button
                type="button"
                onClick={handleToggleContrast}
                aria-label="Alternar alto contraste"
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors focus:ring-1 focus:ring-white focus:outline-none min-h-[28px] ${
                  highContrast ? "bg-white text-black font-bold" : "hover:bg-primary-container"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">contrast</span>
                <span className="hidden md:inline">Contraste</span>
              </button>
            </div>

            <div className="h-3 w-px bg-white/30 hidden sm:block" aria-hidden="true" />

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Lengua de Señas Colombiana"
                className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-primary-container transition-colors focus:ring-1 focus:ring-white focus:outline-none min-h-[28px]"
              >
                <span className="material-symbols-outlined text-[16px]">sign_language</span>
                <span className="hidden md:inline">LSC</span>
              </button>
              <span className="px-1.5 py-0.5 rounded bg-white/20 font-bold text-[10px]">ES</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR PRINCIPAL CON ELEVACIÓN Y MEGAMENÚS ACCESIBLES */}
      <header className="bg-surface/95 backdrop-blur-xl border-b border-surface-container-highest shadow-[0_1px_8px_rgba(0,0,0,0.04)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8 h-20">
          {/* Logo y Branding */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 shrink-0"
          >
            <Image
              src="/Logo-Bogota-Color.png"
              alt="Logo Alcaldía Mayor de Bogotá"
              width={79}
              height={40}
              className="h-10 w-auto object-contain shrink-0 m-0 p-0"
              priority
            />
            <span className="font-heading text-[20px] font-bold text-primary tracking-tight leading-none flex items-center whitespace-nowrap m-0 p-0">
              Bogotá Stack
            </span>
          </Link>

          {/* Menú de Navegación de Escritorio con 6 Opciones y Megamenús */}
          <nav
            ref={navContainerRef}
            aria-label="Navegación principal del Bogotá Stack"
            className="hidden lg:flex items-center gap-1 xl:gap-2 relative"
          >
            {/* 1. EMPEZAR */}
            <div className="relative">
              <button
                id="btn-nav-empezar"
                type="button"
                aria-expanded={activeMenu === "empezar"}
                aria-haspopup="true"
                onClick={() => toggleMenu("empezar")}
                className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 border-b-2 font-heading text-[14px] transition-all min-h-[44px] h-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                  activeMenu === "empezar" || pathname.startsWith("/empezar")
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-on-surface hover:text-primary hover:bg-surface-container/60 font-medium"
                }`}
              >
                <span>Empezar</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                    activeMenu === "empezar" ? "rotate-180 text-primary" : "text-on-surface-variant"
                  }`}
                  aria-hidden="true"
                />
              </button>

              <MegamenuDropdown
                id="megamenu-empezar"
                labelledBy="btn-nav-empezar"
                isOpen={activeMenu === "empezar"}
                onClose={() => setActiveMenu(null)}
                widthClass="w-[520px]"
                alignClass="left-0"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
                      <span className="font-heading text-sm font-bold uppercase tracking-wider text-on-surface">
                        Primeros Pasos con Bogotá Stack
                      </span>
                    </div>
                    <Link
                      href="/empezar"
                      className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                    >
                      Iniciar <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      href="/empezar#sobre-bogota-stack"
                      className="p-3 rounded-[8px] hover:bg-surface-container transition-colors flex flex-col gap-1 border border-surface-container-high/60 group"
                    >
                      <span className="font-heading text-sm font-semibold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-primary" />
                        Sobre Bogotá Stack
                      </span>
                      <span className="text-xs text-on-surface-variant leading-relaxed">
                        Arquitectura base, gobernanza institucional y marco distrital.
                      </span>
                    </Link>

                    <Link
                      href="/empezar#rutas-adopcion"
                      className="p-3 rounded-[8px] hover:bg-surface-container transition-colors flex flex-col gap-1 border border-surface-container-high/60 group"
                    >
                      <span className="font-heading text-sm font-semibold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-tertiary" />
                        Guía de Adopción por Rol
                      </span>
                      <span className="text-xs text-on-surface-variant leading-relaxed">
                        Rutas especializadas para Directivos, Diseñadores UX y Desarrolladores.
                      </span>
                    </Link>
                  </div>
                </div>
              </MegamenuDropdown>
            </div>

            {/* 2. GUÍAS DE VINCULACIÓN */}
            <div className="relative">
              <button
                id="btn-nav-guias"
                type="button"
                aria-expanded={activeMenu === "guias"}
                aria-haspopup="true"
                onClick={() => toggleMenu("guias")}
                className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 border-b-2 font-heading text-[14px] transition-all min-h-[44px] h-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                  activeMenu === "guias" || pathname.startsWith("/guias-de-vinculacion")
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-on-surface hover:text-primary hover:bg-surface-container/60 font-medium"
                }`}
              >
                <span>Guías de Vinculación</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                    activeMenu === "guias" ? "rotate-180 text-primary" : "text-on-surface-variant"
                  }`}
                  aria-hidden="true"
                />
              </button>

              <MegamenuDropdown
                id="megamenu-guias"
                labelledBy="btn-nav-guias"
                isOpen={activeMenu === "guias"}
                onClose={() => setActiveMenu(null)}
                widthClass="w-[560px]"
                alignClass="left-0"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                    <span className="font-heading text-sm font-bold uppercase tracking-wider text-on-surface">
                      Consulta las guías de vinculación
                    </span>
                    <Link
                      href="/guias-de-vinculacion"
                      className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                    >
                      Ver todas <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/guias-de-vinculacion/diseno-y-usabilidad"
                      className="p-3 rounded-[8px] hover:bg-surface-container transition-colors flex items-start gap-3 border border-surface-container-high/60 group"
                    >
                      <div className="p-2 rounded-[5px] bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-heading text-sm font-semibold text-on-surface group-hover:text-primary">
                          Guía de Diseño y Usabilidad
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Arquitectura de información, momentos de la experiencia.
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/guias-de-vinculacion/integracion-distrital"
                      className="p-3 rounded-[8px] hover:bg-surface-container transition-colors flex items-start gap-3 border border-surface-container-high/60 group"
                    >
                      <div className="p-2 rounded-[5px] bg-tertiary/10 text-tertiary shrink-0 mt-0.5">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-heading text-sm font-semibold text-on-surface group-hover:text-primary">
                          Guía de Interoperabilidad
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          SDK de interoperabilidad para la integración de servicios
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </MegamenuDropdown>
            </div>

            {/* 3. SOLUCIONES COMPARTIDAS (MEGAMENÚ 3 COLUMNAS) */}
            <div className="relative">
              <button
                id="btn-nav-soluciones"
                type="button"
                aria-expanded={activeMenu === "soluciones"}
                aria-haspopup="true"
                onClick={() => toggleMenu("soluciones")}
                className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 border-b-2 font-heading text-[14px] transition-all min-h-[44px] h-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                  activeMenu === "soluciones" || pathname.startsWith("/soluciones-compartidas")
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-on-surface hover:text-primary hover:bg-surface-container/60 font-medium"
                }`}
              >
                <span>Soluciones Compartidas</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                    activeMenu === "soluciones"
                      ? "rotate-180 text-primary"
                      : "text-on-surface-variant"
                  }`}
                  aria-hidden="true"
                />
              </button>

              <MegamenuDropdown
                id="megamenu-soluciones"
                labelledBy="btn-nav-soluciones"
                isOpen={activeMenu === "soluciones"}
                onClose={() => setActiveMenu(null)}
                widthClass="w-[90vw] max-w-sm sm:max-w-md"
                alignClass="left-1/2 transform -translate-x-1/2"
                paddingClass="p-0"
              >
                <div className="flex flex-col p-4 gap-4 divide-y divide-surface-container-high">
                  {/* Sección 1: Building Blocks */}
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">
                      Building Blocks
                    </span>
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/soluciones-compartidas/bb-payment"
                        onClick={() => setActiveMenu(null)}
                        className="py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors flex flex-col group"
                      >
                        <span className="font-heading text-xs font-bold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-primary shrink-0" />
                          Pagos Distritales (bb-payment)
                        </span>
                        <span className="text-[11px] text-on-surface-variant pl-5">
                          Recaudo Distrital
                        </span>
                      </Link>

                      <Link
                        href="/soluciones-compartidas/bb-messaging"
                        onClick={() => setActiveMenu(null)}
                        className="py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors flex flex-col group"
                      >
                        <span className="font-heading text-xs font-bold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-tertiary shrink-0" />
                          Notificaciones (bb-messaging)
                        </span>
                        <span className="text-[11px] text-on-surface-variant pl-5">
                          SMS, WhatsApp
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Sección 2: Identidad & Interoperabilidad */}
                  <div className="flex flex-col pt-4">
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">
                      Identidad &amp; Interoperabilidad
                    </span>
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/soluciones-compartidas/autenticacion#federada"
                        onClick={() => setActiveMenu(null)}
                        className="py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors flex flex-col group"
                      >
                        <span className="font-heading text-xs font-bold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-tertiary shrink-0" />
                          Autenticación Federada
                        </span>
                        <span className="text-[11px] text-on-surface-variant pl-5">
                          Keycloak SSO, OAuth2/OIDC
                        </span>
                      </Link>

                      <Link
                        href="/soluciones-compartidas/sdk-interop"
                        onClick={() => setActiveMenu(null)}
                        className="py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors flex flex-col group"
                      >
                        <span className="font-heading text-xs font-bold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
                          SDK Distrital (@bogota/gov-sdk)
                        </span>
                        <span className="text-[11px] text-on-surface-variant pl-5">
                          Framework para intercambio de datos
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Footer del menú */}
                  <div className="pt-3 flex items-center justify-end">
                    <Link
                      href="/soluciones-compartidas"
                      onClick={() => setActiveMenu(null)}
                      className="text-xs text-primary font-bold hover:underline flex items-center gap-1.5 group transition-colors"
                    >
                      <span>Ver catálogo completo</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </MegamenuDropdown>
            </div>

            {/* 4. KIT UI */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("libreria")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                id="btn-nav-libreria"
                href="/kit-ui/colores"
                onClick={() => setActiveMenu(null)}
                className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 border-b-2 font-heading text-[14px] transition-all min-h-[44px] h-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                  activeMenu === "libreria" ||
                  pathname.startsWith("/kit-ui") ||
                  pathname.startsWith("/libreria-ui") ||
                  pathname.includes("/componentes/")
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-on-surface hover:text-primary hover:bg-surface-container/60 font-medium"
                }`}
              >
                <span>Kit UI</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                    activeMenu === "libreria"
                      ? "rotate-180 text-primary"
                      : "text-on-surface-variant"
                  }`}
                  aria-hidden="true"
                />
              </Link>

              <MegamenuDropdown
                id="megamenu-libreria"
                labelledBy="btn-nav-libreria"
                isOpen={activeMenu === "libreria"}
                onClose={() => setActiveMenu(null)}
                widthClass="w-[90vw] max-w-sm sm:max-w-md"
                alignClass="left-1/2 transform -translate-x-1/2"
                paddingClass="p-0"
              >
                <div className="flex flex-col p-4 gap-4 divide-y divide-surface-container-high">
                  {/* Sección 1: Fundamentos */}
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">
                      Fundamentos
                    </span>
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/kit-ui/colores"
                        onClick={() => setActiveMenu(null)}
                        className="py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors flex flex-col group"
                      >
                        <span className="font-heading text-xs font-bold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-primary shrink-0" />
                          Colores y Paleta Oficial
                        </span>
                        <span className="text-[11px] text-on-surface-variant pl-5">
                          Tokens y paletas institucionales
                        </span>
                      </Link>

                      <Link
                        href="/kit-ui/tipografia"
                        onClick={() => setActiveMenu(null)}
                        className="py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors flex flex-col group"
                      >
                        <span className="font-heading text-xs font-bold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-primary shrink-0">
                            text_fields
                          </span>
                          Tipografía y Grillas
                        </span>
                        <span className="text-[11px] text-on-surface-variant pl-5">
                          Escalas tipográficas y grilla 4px
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Sección 2: Componentes */}
                  <div className="flex flex-col pt-4">
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">
                      Componentes
                    </span>
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/kit-ui/componentes/colapsables"
                        onClick={() => setActiveMenu(null)}
                        className="py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors flex flex-col group"
                      >
                        <span className="font-heading text-xs font-bold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                          <Component className="w-3.5 h-3.5 text-primary shrink-0" />
                          Colapsables (Acordeón)
                        </span>
                        <span className="text-[11px] text-on-surface-variant pl-5">
                          Estructuras desplegables accesibles
                        </span>
                      </Link>

                      <Link
                        href="/kit-ui/componentes/inputs"
                        onClick={() => setActiveMenu(null)}
                        className="py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors flex flex-col group"
                      >
                        <span className="font-heading text-xs font-bold text-on-surface group-hover:text-primary flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-primary shrink-0">
                            edit_note
                          </span>
                          Inputs y Formularios
                        </span>
                        <span className="text-[11px] text-on-surface-variant pl-5">
                          Campos de texto y validaciones
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Footer del menú */}
                  <div className="pt-3 flex items-center justify-end">
                    <Link
                      href="/kit-ui/colores"
                      onClick={() => setActiveMenu(null)}
                      className="text-xs text-primary font-bold hover:underline flex items-center gap-1.5 group transition-colors"
                    >
                      <span>Explorar Kit UI completo</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </MegamenuDropdown>
            </div>

            {/* 5. IA DISTRITAL (Enlace directo simple sin megamenú) */}
            <Link
              id="btn-nav-ia"
              href="/ia-distrital"
              className={`whitespace-nowrap flex items-center px-3 py-2 border-b-2 font-heading text-[14px] transition-all min-h-[44px] h-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                pathname.startsWith("/ia-distrital")
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-on-surface hover:text-primary hover:bg-surface-container/60 font-medium"
              }`}
            >
              <span>IA Distrital</span>
            </Link>
          </nav>

          {/* Botón Móvil */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-[5px] bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors focus:ring-2 focus:ring-primary focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Abrir menú de navegación móvil"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 3. MENÚ MÓVIL DESPLEGABLE */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden bg-surface-container-lowest border-b border-surface-container-high px-4 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200"
          >
            <nav className="flex flex-col gap-3 font-heading font-semibold text-sm">
              <Link
                href="/empezar"
                className="px-3 py-2.5 rounded-[5px] hover:bg-surface-container text-on-surface flex items-center justify-between"
              >
                <span>Empezar</span>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </Link>

              <Link
                href="/guias-de-vinculacion"
                className="px-3 py-2.5 rounded-[5px] hover:bg-surface-container text-on-surface flex items-center justify-between"
              >
                <span>Guías de Vinculación</span>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </Link>

              <Link
                href="/soluciones-compartidas"
                className="px-3 py-2.5 rounded-[5px] hover:bg-surface-container text-on-surface flex items-center justify-between"
              >
                <span>Soluciones Compartidas</span>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </Link>

              <Link
                href="/soluciones-compartidas/bb-payment"
                className="px-6 py-1.5 text-xs text-on-surface-variant hover:text-primary flex items-center gap-1"
              >
                • Pagos Distritales (bb-payment)
              </Link>

              <Link
                href="/soluciones-compartidas/autenticacion"
                className="px-6 py-1.5 text-xs text-on-surface-variant hover:text-primary flex items-center gap-1"
              >
                • Autenticación Federada &amp; Descentralizada
              </Link>

              <Link
                href="/kit-ui/colores"
                className="px-3 py-2.5 rounded-[5px] hover:bg-surface-container text-on-surface flex items-center justify-between"
              >
                <span>Kit UI</span>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </Link>

              <Link
                href="/ia-distrital"
                className="px-3 py-2.5 rounded-[5px] hover:bg-surface-container text-on-surface flex items-center justify-between"
              >
                <span>IA Distrital</span>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};
