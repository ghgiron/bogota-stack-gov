"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

type VisualMode = "standard" | "compact" | "high-contrast";

interface AccordionItemData {
  id: string;
  question: string;
  badge: string;
  badgeType: "green" | "gray" | "blue";
  content: React.ReactNode;
}

const ACCORDION_DATA: AccordionItemData[] = [
  {
    id: "acc-1",
    question: "¿Qué requisitos se eliminan con el Principio Once-Only en este trámite?",
    badge: "Interoperabilidad Activa",
    badgeType: "green",
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-on-surface">
          En concordancia con el <strong>Decreto Distrital 083</strong> y la política{" "}
          <em>Once-Only</em> de Bogotá Stack, su cédula de ciudadanía, el certificado catastral CHIP
          y el Registro de Información Tributaria (RIT){" "}
          <strong>no deben ser anexados ni aportados como fotocopias</strong>.
        </p>

        {/* Informative Success Box */}
        <div className="p-3 rounded-[6px] bg-[#EAF5EC] border-l-4 border-[#1B7A2E] flex items-start gap-2.5 text-[#134D1E]">
          <span
            className="material-symbols-outlined text-[20px] text-[#1B7A2E] shrink-0 mt-0.5"
            aria-hidden="true"
          >
            verified
          </span>
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong>Validación Automática en Tiempo Real:</strong> El sistema interopera con la base
            de datos de la Registraduría Nacional del Estado Civil y la Unidad Administrativa
            Especial de Catastro Distrital (UAECD) en menos de 450ms.
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-surface-container-high gap-2">
          <span>
            Identificador de Servicio:{" "}
            <code className="font-mono bg-surface-container px-1 py-0.5 rounded text-on-surface">
              SVC-CAT-2025-A
            </code>
          </span>
          <a
            href="https://gobiernobogota.gov.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold flex items-center gap-1"
          >
            Ver ficha de interoperabilidad GEL →
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "acc-2",
    question: "¿Cuáles son los tiempos máximos de respuesta para la radicación virtual?",
    badge: "3 días hábiles",
    badgeType: "gray",
    content: (
      <p className="text-sm leading-relaxed text-on-surface-variant">
        Las radicaciones electrónicas realizadas antes de las 16:30 horas se contabilizan el mismo
        día hábil. Recibirá notificación con código seguro de verificación (CSV) al correo distrital
        registrado y depósito automático en Carpeta Ciudadana.
      </p>
    ),
  },
  {
    id: "acc-3",
    question: "¿Cómo realizar el pago si mi cuenta bancaria tiene restricción PSE?",
    badge: "B-Pay Distrital",
    badgeType: "blue",
    content: (
      <p className="text-sm leading-relaxed text-on-surface-variant">
        Puede emitir un recibo con código de barras dimensional para ventanilla en Banco de Bogotá,
        Davivienda o Bancolombia, o habilitar el pago alterno mediante tarjeta de crédito
        institucional autorizada a través de la pasarela distrital B-Pay.
      </p>
    ),
  },
];

export const InteractiveAccordionPlayground: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "acc-1": true,
    "acc-2": false,
    "acc-3": false,
  });
  const [visualMode, setVisualMode] = useState<VisualMode>("standard");
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allOpen = Object.values(openItems).every(Boolean);

  const handleToggleAll = () => {
    const nextState = !allOpen;
    setOpenItems({
      "acc-1": nextState,
      "acc-2": nextState,
      "acc-3": nextState,
    });
  };

  // Keyboard navigation support simulation (Up / Down / Home / End)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const triggers = Array.from(
        container.querySelectorAll<HTMLButtonElement>('button[id^="acc-btn-"]'),
      );
      const activeElement = document.activeElement as HTMLButtonElement;
      const currentIndex = triggers.indexOf(activeElement);

      if (currentIndex === -1) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % triggers.length;
        triggers[nextIndex]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        triggers[prevIndex]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        triggers[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        triggers[triggers.length - 1]?.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section aria-labelledby="playground-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3
            className="font-heading text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2"
            id="playground-heading"
          >
            <span className="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">
              preview
            </span>
            Vista Previa Interactiva
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Pruebe el comportamiento, el orden de tabulación y el contraste del componente en tiempo
            real.
          </p>
        </div>

        {/* Visual State Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-[5px] border border-surface-container-high">
          <button
            type="button"
            onClick={() => setVisualMode("standard")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all min-h-[36px] ${
              visualMode === "standard"
                ? "bg-surface-container-lowest text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Estándar
          </button>
          <button
            type="button"
            onClick={() => setVisualMode("compact")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all min-h-[36px] ${
              visualMode === "compact"
                ? "bg-surface-container-lowest text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Compacto
          </button>
          <button
            type="button"
            onClick={() => setVisualMode("high-contrast")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all min-h-[36px] ${
              visualMode === "high-contrast"
                ? "bg-surface-container-lowest text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Contraste Alto
          </button>
        </div>
      </div>

      {/* Playground Canvas Wrapper */}
      <div
        ref={containerRef}
        className={`rounded-[15px] border p-4 sm:p-6 shadow-xs transition-colors ${
          visualMode === "high-contrast"
            ? "bg-black text-white border-white"
            : "bg-[#F8F9FA] border-surface-container-high"
        }`}
      >
        {/* Contextual Notification Bar inside preview */}
        <div
          className={`mb-4 px-4 py-2.5 rounded-[4px] text-xs sm:text-sm flex items-center justify-between gap-2 ${
            visualMode === "high-contrast"
              ? "bg-[#222] border-l-4 border-yellow-400 text-yellow-200"
              : "bg-[#FFF3CD] border-l-4 border-[#FAB62D] text-[#856404]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              info
            </span>
            <span>
              Contexto de prueba:{" "}
              <strong>Trámite de Certificación de Nomenclatura Predial Distrital</strong>
            </span>
          </div>
          <span className="text-[11px] font-mono uppercase font-bold shrink-0">Simulación B2G</span>
        </div>

        {/* DISTRITAL ACCORDION COMPONENT INSTANCE */}
        <div className="flex flex-col gap-2.5 w-full" id="distrital-accordion-container">
          {ACCORDION_DATA.map((item, idx) => {
            const isOpen = Boolean(openItems[item.id]);
            const btnId = `acc-btn-${idx + 1}`;
            const panelId = `acc-panel-${idx + 1}`;

            let badgeStyles = "bg-surface-container text-on-surface-variant";
            if (item.badgeType === "green") {
              badgeStyles = "bg-[#EAF5EC] text-[#1B7A2E]";
            } else if (item.badgeType === "blue") {
              badgeStyles = "bg-[#E3EEFC] text-[#0049AE]";
            }

            return (
              <div
                key={item.id}
                className={`accordion-item rounded-[8px] overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "border-2 border-primary shadow-xs"
                    : "border border-surface-container-high hover:border-surface-variant"
                } ${
                  visualMode === "high-contrast"
                    ? "bg-zinc-900 border-zinc-700"
                    : "bg-surface-container-lowest"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full text-left flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:ring-offset-2 transition-all cursor-pointer select-none ${
                      visualMode === "compact" ? "py-2.5 px-3.5" : "py-3.5 px-4"
                    } ${
                      isOpen
                        ? visualMode === "high-contrast"
                          ? "bg-zinc-800 text-yellow-300"
                          : "bg-[#FAE7EB] text-primary"
                        : visualMode === "high-contrast"
                          ? "bg-zinc-900 text-white hover:bg-zinc-800"
                          : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span
                      className={`flex items-center gap-2.5 font-heading text-sm sm:text-base ${
                        isOpen ? "font-bold" : "font-semibold"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isOpen ? "bg-primary" : "bg-surface-container-high"
                        }`}
                        aria-hidden="true"
                      />
                      {item.question}
                    </span>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold tracking-tight uppercase ${badgeStyles}`}
                      >
                        {item.badge}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[22px] transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : "text-on-surface-variant"
                        }`}
                        aria-hidden="true"
                      >
                        expand_more
                      </span>
                    </div>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className={`px-4 sm:px-5 py-4 border-t transition-colors ${
                    isOpen ? "block" : "hidden"
                  } ${
                    isOpen && !visualMode.includes("contrast")
                      ? "border-primary/20 bg-surface-container-lowest"
                      : "border-surface-container-high"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Playground Lower Toolbar & Controls */}
        <div className="mt-4 pt-3 border-t border-surface-container-high flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleAll}
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-semibold focus:outline-none focus:ring-1 focus:ring-primary rounded p-1"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                unfold_more
              </span>
              <span>{allOpen ? "Colapsar todos los paneles" : "Alternar todos los paneles"}</span>
            </button>
            <span className="text-surface-container-highest" aria-hidden="true">
              |
            </span>
            <span className="text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                keyboard
              </span>
              Navegación completa con Flechas ↑ / ↓
            </span>
          </div>

          <div className="flex items-center gap-2 text-on-surface-variant text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" aria-hidden="true" />
            <span>
              Focus ring: <strong>2px solid #CC0E35</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
