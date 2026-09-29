"use client";

import {
  AlertCircle,
  Building,
  Check,
  ChevronDown,
  Copy,
  GraduationCap,
  HeartPulse,
  Leaf,
  RotateCcw,
  Search,
  Train,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";

export type DropdownVariant = "basico" | "busqueda" | "iconos" | "deshabilitado" | "error";
export type CodeFormat = "react" | "html" | "css";

interface DropdownOption {
  id: string;
  label: string;
  icon?: string;
  category?: string;
}

const LOCALIDADES_BOGOTA: DropdownOption[] = [
  { id: "01", label: "01 - Usaquén" },
  { id: "02", label: "02 - Chapinero" },
  { id: "03", label: "03 - Santa Fe" },
  { id: "04", label: "04 - San Cristóbal" },
  { id: "05", label: "05 - Usme" },
  { id: "06", label: "06 - Tunjuelito" },
  { id: "07", label: "07 - Bosa" },
  { id: "08", label: "08 - Kennedy" },
  { id: "09", label: "09 - Fontibón" },
  { id: "10", label: "10 - Engativá" },
  { id: "11", label: "11 - Suba" },
  { id: "12", label: "12 - Barrios Unidos" },
  { id: "13", label: "13 - Teusaquillo" },
  { id: "14", label: "14 - Los Mártires" },
  { id: "15", label: "15 - Antonio Nariño" },
  { id: "16", label: "16 - Puente Aranda" },
  { id: "17", label: "17 - La Candelaria" },
  { id: "18", label: "18 - Rafael Uribe Uribe" },
  { id: "19", label: "19 - Ciudad Bolívar" },
  { id: "20", label: "20 - Sumapaz" },
];

const SECTORES_DISTRITALES: DropdownOption[] = [
  { id: "mov", label: "Movilidad y Tránsito", icon: "train" },
  { id: "sal", label: "Salud y Bienestar Distrital", icon: "heart_pulse" },
  { id: "edu", label: "Educación y Becas Distritales", icon: "school" },
  { id: "hab", label: "Hábitat y Vivienda Social", icon: "apartment" },
  { id: "amb", label: "Ambiente y Reciclaje Urbano", icon: "eco" },
];

const TRAMITES_BASICOS: DropdownOption[] = [
  { id: "t1", label: "Certificado de Residencia Distrital" },
  { id: "t2", label: "Concepto de Uso de Suelo" },
  { id: "t3", label: "Liquidación del Impuesto Predial Unificado" },
  { id: "t4", label: "Permiso de Ocupación Temporal del Espacio Público" },
  { id: "t5", label: "Registro de Veeduría Ciudadana Distrital" },
];

export const DropdownPlayground: React.FC = () => {
  const [variant, setVariant] = useState<DropdownVariant>("basico");
  const [codeTab, setCodeTab] = useState<CodeFormat>("react");
  const [copied, setCopied] = useState<boolean>(false);

  // Modificadores de estado del Playground
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showHelper, setShowHelper] = useState<boolean>(true);
  const [forceError, setForceError] = useState<boolean>(false);

  // Estados interactivos para el dropdown activo
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonId = useId();
  const listboxId = useId();

  // Opciones basadas en la variante
  const currentOptions: DropdownOption[] =
    variant === "busqueda"
      ? LOCALIDADES_BOGOTA
      : variant === "iconos"
        ? SECTORES_DISTRITALES
        : TRAMITES_BASICOS;

  const filteredOptions = currentOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Cierre al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Foco automático en el buscador cuando se abre la variante con búsqueda
  useEffect(() => {
    if (isOpen && variant === "busqueda" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, variant]);

  // Manejo de teclado WAI-ARIA
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled || variant === "deshabilitado") return;

    if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(-1);
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
        e.preventDefault();
        const option = filteredOptions[focusedIndex];
        if (option) {
          setSelectedValue(option.label);
        }
        setIsOpen(false);
        setFocusedIndex(-1);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(filteredOptions.length - 1);
      } else {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
      }
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetPlayground = () => {
    setSelectedValue("");
    setSearchQuery("");
    setIsOpen(false);
    setForceError(false);
    setIsDisabled(false);
    setIsRequired(true);
    setShowHelper(true);
    setFocusedIndex(-1);
  };

  const isCurrentDisabled = isDisabled || variant === "deshabilitado";
  const isCurrentError = forceError || variant === "error";

  const getGeneratedReactCode = (): string => {
    if (variant === "busqueda") {
      return `'use client';

import React, { useState, useId, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

const LOCALIDADES = [
  '01 - Usaquén', '02 - Chapinero', '03 - Santa Fe', '04 - San Cristóbal',
  '05 - Usme', '06 - Tunjuelito', '07 - Bosa', '08 - Kennedy',
  '09 - Fontibón', '10 - Engativá', '11 - Suba', '12 - Barrios Unidos',
  '13 - Teusaquillo', '14 - Los Mártires', '15 - Antonio Nariño',
  '16 - Puente Aranda', '17 - La Candelaria', '18 - Rafael Uribe Uribe',
  '19 - Ciudad Bolívar', '20 - Sumapaz'
];

export const DropdownSearchDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const buttonId = useId();
  const listboxId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filtered = LOCALIDADES.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) searchInputRef.current?.focus();
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-md">
      <label htmlFor={buttonId} className="font-body text-[18px] font-medium text-[#1B1C1C]">
        Localidad de Bogotá <span className="text-primary">*</span>
      </label>

      <div className="relative">
        <button
          id={buttonId}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          onClick={() => setIsOpen(!isOpen)}
          className="h-[40px] sm:h-[44px] w-full bg-white border border-[#B0B0B0] rounded-[5px] px-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2"
        >
          <span className={selected ? 'text-[#1B1C1C] font-medium' : 'text-[#8A8A8A]'}>
            {selected || 'Selecciona una localidad'}
          </span>
          <div className="w-[17px] h-[17px] rounded-full bg-[#FAB62D] flex items-center justify-center text-[#1B1C1C] shrink-0">
            <ChevronDown className="w-3 h-3 stroke-[2.5]" />
          </div>
        </button>

        {isOpen && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#B0B0B0] rounded-[5px] shadow-lg z-30 overflow-hidden flex flex-col"
          >
            {/* Input de Búsqueda Tipo Typeahead */}
            <div className="p-2 border-b border-[#E5E7EB] flex items-center gap-2 bg-[#FAF9F5]">
              <Search className="w-4 h-4 text-[#8A8A8A] shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar localidad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs font-body bg-transparent outline-none text-[#1B1C1C]"
              />
            </div>

            {/* Lista con Scroll si excede 5 ítems */}
            <div className="max-h-56 overflow-y-auto">
              {filtered.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="option"
                  aria-selected={selected === item}
                  onClick={() => {
                    setSelected(item);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={\`w-full px-4 py-2.5 text-left text-sm font-body flex items-center justify-between hover:bg-[#FFF8EA] \${
                    selected === item ? 'bg-[#FFF8EA] text-[#694C13] font-bold border-l-4 border-[#FAB62D]' : 'text-[#1B1C1C]'
                  }\`}
                >
                  <span>{item}</span>
                  {selected === item && <Check className="w-4 h-4 text-[#FAB62D]" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="font-body text-[12px] text-[#43474E]">
        Campo  con soporte de filtrado en tiempo real.
      </p>
    </div>
  );
};`;
    }

    if (variant === "error") {
      return `'use client';

import React, { useState, useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export const DropdownErrorDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const buttonId = useId();
  const errorId = useId();

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-md">
      <label htmlFor={buttonId} className="font-body text-[18px] font-medium text-[#BA1A1A]">
        Sede de atención presencial <span className="text-primary">*</span>
      </label>

      <div className="relative">
        <button
          id={buttonId}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-invalid="true"
          aria-describedby={errorId}
          onClick={() => setIsOpen(!isOpen)}
          className="h-[44px] w-full bg-white border-2 border-[#BA1A1A] rounded-[5px] px-4 flex items-center justify-between text-left text-[#BA1A1A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE]"
        >
          <span>{selected || 'Selecciona una sede'}</span>
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-[#BA1A1A]" />
            <div className="w-[17px] h-[17px] rounded-full bg-[#BA1A1A] flex items-center justify-center text-white shrink-0">
              <ChevronDown className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>
        </button>
      </div>

      <span id={errorId} role="alert" className="font-body text-[12px] text-[#BA1A1A] font-medium">
        * Campo : selecciona una sede para continuar con tu turno.
      </span>
    </div>
  );
};`;
    }

    return `'use client';

import React, { useState, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const OPCIONES = [
  'Certificado de Residencia Distrital',
  'Concepto de Uso de Suelo',
  'Liquidación del Impuesto Predial Unificado',
  'Permiso de Ocupación Temporal',
  'Registro de Veeduría Ciudadana'
];

export const DropdownBasicDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const buttonId = useId();
  const listboxId = useId();

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-md">
      <label htmlFor={buttonId} className="font-body text-[18px] font-medium text-[#1B1C1C]">
        Trámite requerido <span className="text-primary">*</span>
      </label>

      <div className="relative">
        <button
          id={buttonId}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          onClick={() => setIsOpen(!isOpen)}
          className="h-[40px] sm:h-[44px] w-full bg-white border border-[#B0B0B0] rounded-[5px] px-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2"
        >
          <span className={selected ? 'text-[#1B1C1C] font-medium' : 'text-[#8A8A8A]'}>
            {selected || 'Selecciona un trámite'}
          </span>
          <div className="w-[17px] h-[17px] rounded-full bg-[#FAB62D] flex items-center justify-center text-[#1B1C1C] shrink-0">
            <ChevronDown className="w-3 h-3 stroke-[2.5]" />
          </div>
        </button>

        {isOpen && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#B0B0B0] rounded-[5px] shadow-lg z-30 overflow-hidden"
          >
            {OPCIONES.map((opt) => (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={selected === opt}
                onClick={() => {
                  setSelected(opt);
                  setIsOpen(false);
                }}
                className={\`w-full px-4 py-2.5 text-left text-sm font-body flex items-center justify-between hover:bg-[#FFF8EA] \${
                  selected === opt ? 'bg-[#FFF8EA] text-[#694C13] font-bold border-l-4 border-[#FAB62D]' : 'text-[#1B1C1C]'
                }\`}
              >
                <span>{opt}</span>
                {selected === opt && <Check className="w-4 h-4 text-[#FAB62D]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="font-body text-[12px] text-[#43474E]">
        Selecciona el servicio institucional para el cual solicitas turno.
      </p>
    </div>
  );
};`;
  };

  const getGeneratedHtmlCode = (): string => {
    return `<!-- Formulario Accesible GovTech Bogotá: Dropdown WAI-ARIA Combobox -->
<div class="bogota-dropdown-container">
  <label for="tipo-tramite-select" class="bogota-label">
    Trámite Distrital Solicitado <span class="required" aria-hidden="true">*</span>
  </label>

  <div class="bogota-combobox-wrapper">
    <button
      id="tipo-tramite-select"
      type="button"
      role="combobox"
      aria-expanded="false"
      aria-haspopup="listbox"
      aria-controls="tipo-tramite-listbox"
      class="bogota-dropdown-trigger"
    >
      <span class="trigger-label">Selecciona un trámite</span>
      <span class="chevron-badge" aria-hidden="true">▼</span>
    </button>

    <ul
      id="tipo-tramite-listbox"
      role="listbox"
      aria-label="Lista de trámites disponibles"
      tabindex="-1"
      class="bogota-dropdown-overlay"
      hidden
    >
      <li role="option" aria-selected="false" class="dropdown-item">
        Certificado de Residencia Distrital
      </li>
      <li role="option" aria-selected="false" class="dropdown-item">
        Concepto de Uso de Suelo
      </li>
      <li role="option" aria-selected="false" class="dropdown-item">
        Liquidación del Impuesto Predial Unificado
      </li>
    </ul>
  </div>

  <p id="tipo-tramite-helper" class="bogota-helper-text">
    Selecciona el servicio para el cual solicitas turno presencial.
  </p>
</div>`;
  };

  const getGeneratedCssCode = (): string => {
    return `/* Tokens Tailwind del Dropdown Kit UI Bogotá */
.dropdown-trigger {
  height: 40px; /* Base oficial Kit UI */
  min-height: 44px; /* Área táctil accesible WCAG 2.5.8 */
  border: 1px solid #B0B0B0;
  border-radius: 5px; /* rounded-[5px] */
  padding-left: 16px;
  padding-right: 16px;
  font-family: 'Work Sans', sans-serif;
  font-size: 16px;
  background-color: #FFFFFF;
  transition: all 150ms ease-in-out;
}

/* Indicador Chevron Oficial 17x17px */
.dropdown-chevron {
  width: 17px;
  height: 17px;
  border-radius: 9999px;
  background-color: #FAB62D; /* Amarillo Bogotá */
  color: #1B1C1C;
}

/* Foco de Alta Accesibilidad */
.dropdown-trigger:focus-visible {
  outline: none;
  border-color: #3366CC;
  box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #0049AE; /* Anillo doble visible */
}

/* Estado de Error */
.dropdown-trigger[aria-invalid="true"] {
  border: 2px solid #BA1A1A;
  color: #BA1A1A;
}

/* Opción activa / enfocada en Menú Desplegado */
.dropdown-option[aria-selected="true"] {
  background-color: #FFF8EA;
  color: #694C13;
  font-weight: 700;
  border-left: 4px solid #FAB62D;
}`;
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "train":
        return <Train className="w-4 h-4 text-[#3366CC]" />;
      case "heart_pulse":
        return <HeartPulse className="w-4 h-4 text-[#BA1A1A]" />;
      case "school":
        return <GraduationCap className="w-4 h-4 text-[#FAB62D]" />;
      case "apartment":
        return <Building className="w-4 h-4 text-[#1B7A2E]" />;
      case "eco":
        return <Leaf className="w-4 h-4 text-[#006A60]" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. SELECTOR DE VARIANTES */}
      <div className="flex items-center justify-between border-b border-surface-container-high pb-4 gap-4 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: "basico", label: "Dropdown Básico" },
            { id: "busqueda", label: "Con Búsqueda (Typeahead)" },
            { id: "iconos", label: "Con Íconos" },
            { id: "deshabilitado", label: "Deshabilitado" },
            { id: "error", label: "Con Error" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setVariant(item.id as DropdownVariant);
                setSelectedValue("");
                setIsOpen(false);
                setSearchQuery("");
                if (item.id === "deshabilitado") {
                  setIsDisabled(true);
                  setForceError(false);
                } else if (item.id === "error") {
                  setForceError(true);
                  setIsDisabled(false);
                } else {
                  setIsDisabled(false);
                  setForceError(false);
                }
              }}
              className={`px-3 py-1.5 rounded-[5px] text-xs font-heading font-semibold transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] ${
                variant === item.id
                  ? "bg-primary text-white shadow-xs"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={resetPlayground}
          className="flex items-center gap-1.5 text-xs font-body font-medium text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] px-2 py-1 rounded"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer</span>
        </button>
      </div>

      {/* 2. ÁREA DE PRUEBAS INTERACTIVA (CANVAS & CONTROLES) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Canvas de Demostración */}
        <div className="lg:col-span-8 bg-[#FAF9F5] border border-[#E4E2E1] rounded-[15px] p-6 sm:p-10 flex flex-col items-center justify-center min-h-[380px] relative shadow-inner">
          <div ref={containerRef} className="w-full max-w-md flex flex-col gap-1.5 relative">
            {/* Etiqueta */}
            <div className="flex items-center justify-between">
              <label
                htmlFor={buttonId}
                className={`font-body text-[18px] font-medium leading-[24px] ${
                  isCurrentError ? "text-[#BA1A1A]" : "text-[#1B1C1C]"
                }`}
              >
                {variant === "busqueda"
                  ? "Localidad de Bogotá"
                  : variant === "iconos"
                    ? "Sector de Interés Distrital"
                    : "Trámite Distrital Solicitado"}
                {isRequired && (
                  <span className="text-primary ml-1" aria-hidden="true">
                    *
                  </span>
                )}
              </label>

              {variant === "busqueda" && (
                <span className="text-[11px] font-mono font-medium text-[#0049AE] bg-[#E9F0FA] px-2 py-0.5 rounded">
                  20 Localidades
                </span>
              )}
            </div>

            {/* Caja del Dropdown */}
            <div className="relative">
              <button
                id={buttonId}
                type="button"
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={listboxId}
                aria-disabled={isCurrentDisabled}
                disabled={isCurrentDisabled}
                onClick={() => !isCurrentDisabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className={`h-[40px] sm:h-[44px] w-full rounded-[5px] px-4 flex items-center justify-between text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0049AE] focus-visible:ring-offset-2 ${
                  isCurrentDisabled
                    ? "bg-[#E4E2E1] border border-[#B0B0B0] text-[#8A8A8A] cursor-not-allowed"
                    : isCurrentError
                      ? "bg-white border-2 border-[#BA1A1A] text-[#BA1A1A]"
                      : isOpen
                        ? "bg-white border-2 border-[#FAB62D] rounded-b-none text-[#1B1C1C] shadow-sm"
                        : "bg-white border border-[#B0B0B0] text-[#1B1C1C] hover:border-[#8A8A8A] shadow-xs"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {variant === "iconos" && selectedValue && (
                    <span className="shrink-0">
                      {renderIcon(currentOptions.find((o) => o.label === selectedValue)?.icon)}
                    </span>
                  )}
                  <span
                    className={`font-body text-[16px] truncate ${
                      selectedValue
                        ? "text-[#1B1C1C] font-normal"
                        : isCurrentError
                          ? "text-[#BA1A1A]"
                          : "text-[#8A8A8A]"
                    }`}
                  >
                    {selectedValue ||
                      (variant === "busqueda"
                        ? "Selecciona una localidad"
                        : variant === "iconos"
                          ? "Elige un sector distrital"
                          : "Selecciona un trámite")}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isCurrentError && <AlertCircle className="w-4 h-4 text-[#BA1A1A]" />}
                  <div
                    className={`w-[17px] h-[17px] rounded-full flex items-center justify-center transition-transform ${
                      isCurrentDisabled
                        ? "bg-[#C4C7C5] text-[#747775]"
                        : isCurrentError
                          ? "bg-[#BA1A1A] text-white"
                          : "bg-[#FAB62D] text-[#1B1C1C]"
                    } ${isOpen ? "rotate-180" : ""}`}
                  >
                    <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>
              </button>

              {/* Menú Desplegable Flotante */}
              {isOpen && !isCurrentDisabled && (
                <div
                  id={listboxId}
                  role="listbox"
                  aria-label="Opciones disponibles"
                  tabIndex={-1}
                  className="absolute left-0 right-0 top-full bg-white border border-[#B0B0B0] border-t-0 rounded-b-[5px] shadow-lg z-30 flex flex-col overflow-hidden text-sm"
                >
                  {/* Buscador Integrado si es Typeahead */}
                  {variant === "busqueda" && (
                    <div className="p-2 border-b border-[#E5E7EB] bg-[#FAF9F5] flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#8A8A8A] shrink-0" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Filtrar por nombre..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setFocusedIndex(0);
                        }}
                        className="w-full text-xs font-body bg-transparent outline-none text-[#1B1C1C]"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          aria-label="Limpiar búsqueda"
                          className="text-[#8A8A8A] hover:text-[#1B1C1C]"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Lista de Opciones */}
                  <div className="max-h-56 overflow-y-auto no-scrollbar">
                    {filteredOptions.length === 0 ? (
                      <div className="p-4 text-center text-xs font-body text-on-surface-variant">
                        No se encontraron opciones para "{searchQuery}".
                      </div>
                    ) : (
                      filteredOptions.map((opt, idx) => {
                        const isSelected = selectedValue === opt.label;
                        const isFocused = focusedIndex === idx;

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSelectedValue(opt.label);
                              setIsOpen(false);
                              setSearchQuery("");
                              if (isCurrentError) setForceError(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left font-body flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-[#FFF8EA] text-[#694C13] font-bold border-l-4 border-[#FAB62D]"
                                : isFocused
                                  ? "bg-[#F5F5F5] text-[#1B1C1C]"
                                  : "text-[#1B1C1C] hover:bg-[#FFF8EA]"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {variant === "iconos" && renderIcon(opt.icon)}
                              <span className="text-sm">{opt.label}</span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-[#FAB62D]" />}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Texto de Ayuda / Error */}
            {isCurrentError ? (
              <span className="font-body text-[12px] text-[#BA1A1A] font-medium flex items-center gap-1 pt-1">
                * Campo : selecciona una opción válida para continuar.
              </span>
            ) : showHelper ? (
              <p className="font-body text-[12px] text-[#43474E] pt-1">
                {variant === "busqueda"
                  ? "Puedes escribir para filtrar entre las 20 localidades distritales."
                  : variant === "iconos"
                    ? "Selecciona el sector distrital para canalizar tu requerimiento."
                    : "Selecciona el trámite de acuerdo con tu necesidad presencial."}
              </p>
            ) : null}
          </div>
        </div>

        {/* Panel de Controles / Modificadores */}
        <div className="lg:col-span-4 bg-surface-container-lowest border border-surface-container-high rounded-[15px] p-6 flex flex-col gap-6 shadow-xs">
          <div className="border-b border-surface-container-high pb-3">
            <h4 className="font-heading text-sm font-bold text-on-surface">
              Modificadores del Dropdown
            </h4>
            <p className="font-body text-xs text-on-surface-variant">
              Simula condiciones de formulario en tiempo real.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-xs font-body">
            {/* Switch Requerido */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-on-surface font-medium">Campo Requerido (*)</span>
              <input
                type="checkbox"
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-[#CC0E35]"
              />
            </label>

            {/* Switch Deshabilitado */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-on-surface font-medium">Estado Inactivo (Disabled)</span>
              <input
                type="checkbox"
                checked={isCurrentDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-[#CC0E35]"
              />
            </label>

            {/* Switch Texto de Ayuda */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-on-surface font-medium">Mostrar Texto Inferior (12px)</span>
              <input
                type="checkbox"
                checked={showHelper}
                onChange={(e) => setShowHelper(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-[#CC0E35]"
              />
            </label>

            {/* Switch Forzar Error */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#BA1A1A] font-semibold">Forzar Estado de Error</span>
              <input
                type="checkbox"
                checked={isCurrentError}
                onChange={(e) => setForceError(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-[#BA1A1A]"
              />
            </label>
          </div>

          {/* Información del Estado Actual */}
          <div className="p-3 rounded-[8px] bg-surface-container border border-surface-container-high text-[11px] font-mono flex flex-col gap-1">
            <span className="text-on-surface-variant font-semibold">Telemetría de Estado:</span>
            <div className="text-on-surface truncate">
              Valor: <span className="font-bold">{selectedValue || '""'}</span>
            </div>
            <div className="text-on-surface">
              Abierto: <span className="font-bold">{isOpen ? "true" : "false"}</span>
            </div>
            <div className="text-on-surface">
              Válido: <span className="font-bold">{!isCurrentError ? "true" : "false"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VISOR DE CÓDIGO FUENTE (REACT / HTML / CSS) */}
      <div className="bg-surface-container-lowest border border-surface-container-high rounded-[15px] overflow-hidden shadow-xs">
        {/* Cabecera del Visor */}
        <div className="bg-[#1B1C1C] text-white px-6 py-3 flex items-center justify-between border-b border-surface-container-highest">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCodeTab("react")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                codeTab === "react" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              React / Next.js
            </button>
            <button
              type="button"
              onClick={() => setCodeTab("html")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                codeTab === "html" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              HTML WAI-ARIA
            </button>
            <button
              type="button"
              onClick={() => setCodeTab("css")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                codeTab === "css" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Tokens Tailwind
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              const code =
                codeTab === "react"
                  ? getGeneratedReactCode()
                  : codeTab === "html"
                    ? getGeneratedHtmlCode()
                    : getGeneratedCssCode();
              handleCopyCode(code);
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400 font-bold">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar código</span>
              </>
            )}
          </button>
        </div>

        {/* Bloque de Código */}
        <pre className="p-6 bg-[#121313] text-gray-200 text-xs font-mono overflow-x-auto leading-relaxed max-h-[380px]">
          <code>
            {codeTab === "react"
              ? getGeneratedReactCode()
              : codeTab === "html"
                ? getGeneratedHtmlCode()
                : getGeneratedCssCode()}
          </code>
        </pre>
      </div>
    </div>
  );
};
