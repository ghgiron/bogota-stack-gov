"use client";

import { ApiEndpointsList } from "@/components/ia/ApiEndpointsList";
import { BlueprintMaturityGauge } from "@/components/ia/BlueprintMaturityGauge";
import { PredictiveAssistantChat } from "@/components/ia/PredictiveAssistantChat";
import { RecommendedUiComponents } from "@/components/ia/RecommendedUiComponents";
import { RequiredBuildingBlocksGrid } from "@/components/ia/RequiredBuildingBlocksGrid";
import {
  type ArchitectureBlueprint,
  DEFAULT_BLUEPRINT,
  PRESET_BLUEPRINTS,
  generatePredictiveBlueprint,
} from "@/lib/services/aiPredictorService";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

const INITIAL_HISTORY = [
  {
    role: "assistant" as const,
    sender: "IA Distrital",
    time: "10:42 AM",
    text: "¡Hola, equipo de la Secretaría Distrital de Hacienda! Describe en lenguaje natural el trámite o servicio ciudadano que deseas digitalizar. Identificaré el nivel de madurez recomendado, los Building Blocks necesarios, las APIs a consumir y los componentes UI requeridos.",
  },
  {
    role: "user" as const,
    sender: "Secretaría de Hacienda",
    time: "10:43 AM",
    text: 'Queremos digitalizar el trámite de "Certificado de Paz y Salvo del Impuesto Predial Unificado". El ciudadano debe poder autenticarse con su Cédula Digital, consultar su predio por chip catastral, liquidar y pagar saldos pendientes por PSE en caso de tener deuda, y recibir de inmediato el certificado sellado digitalmente en su Carpeta Ciudadana sin filas presenciales ni adjuntar fotocopias.',
  },
];

export default function IARecomendadorPage() {
  const [blueprint, setBlueprint] = useState<ArchitectureBlueprint>(DEFAULT_BLUEPRINT);
  const [entity, setEntity] = useState<string>("Secretaría Distrital de Hacienda (SHD)");
  const [promptText, setPromptText] = useState<string>(DEFAULT_BLUEPRINT.description);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState(INITIAL_HISTORY);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const handleGeneratePlan = async (customPrompt?: string) => {
    const textToAnalyze = customPrompt || promptText;
    if (!textToAnalyze.trim()) return;

    setIsGenerating(true);

    const currentTime = new Date().toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Añadir mensaje del usuario al chat
    setChatHistory((prev) => [
      ...prev,
      {
        role: "user",
        sender: entity.replace(/\s*\(.*?\)/, ""),
        time: currentTime,
        text: textToAnalyze,
      },
    ]);

    try {
      const newPlan = await generatePredictiveBlueprint(entity, textToAnalyze);
      setBlueprint(newPlan);

      // Respuesta explicativa del asistente
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          sender: "IA Distrital",
          time: new Date().toLocaleTimeString("es-CO", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: `He formulado el plano de integración técnica para "${newPlan.title.replace("Plan de Implementación: ", "")}". Tu trámite alcanzó un Índice IAI de ${newPlan.maturity.score}/100 (${newPlan.maturity.level}). Se han vinculado ${newPlan.buildingBlocks.length} Building Blocks y ${newPlan.apiEndpoints.length} APIs distritales homologadas.`,
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetConversation = () => {
    setBlueprint(DEFAULT_BLUEPRINT);
    setEntity("Secretaría Distrital de Hacienda (SHD)");
    setPromptText(DEFAULT_BLUEPRINT.description);
    setChatHistory(INITIAL_HISTORY);
  };

  const handleSaveBlueprint = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(blueprint, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Blueprint_${blueprint.planCode.replace("#", "")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen text-on-surface">
      {/* Barra de Progreso Superior Decorativa / Beacon */}
      <div className="w-full bg-surface-container-high h-1 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-primary-container transition-all duration-700 ease-out"
          style={{ width: `${blueprint.maturity.score}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex flex-col gap-6">
        {/* 1. Hero & Breadcrumbs Section */}
        <header className="flex flex-col gap-4">
          {/* Breadcrumb semántico */}
          <nav
            aria-label="Ruta de navegación"
            className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-tertiary rounded px-1"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              <span>Inicio</span>
            </Link>
            <span className="material-symbols-outlined text-[14px] opacity-40" aria-hidden="true">
              chevron_right
            </span>
            <Link
              href="/ia-distrital"
              className="hover:text-primary cursor-pointer transition-colors"
            >
              IA Distrital
            </Link>
            <span className="material-symbols-outlined text-[14px] opacity-40" aria-hidden="true">
              chevron_right
            </span>
            <span className="font-semibold text-primary" aria-current="page">
              Recomendador Predictivo de Arquitectura
            </span>
          </nav>

          {/* Main Headline Box con Resplandor Sutil */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-surface-container-lowest p-6 sm:p-8 rounded-[15px] shadow-sm relative overflow-hidden border border-outline-variant/20">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-primary/10 via-secondary-container/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-3 max-w-3xl relative z-10">
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-bold">
                IA Distrital:{" "}
                <span className="text-primary-container underline decoration-secondary-container decoration-4 underline-offset-8">
                  Agente Predictivo
                </span>{" "}
                de Integración Distrital
              </h1>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Planea la arquitectura técnica, nivel de madurez y componentes reutilizables de tu
                trámite antes de escribir una sola línea de código.
              </p>
            </div>

            {/* Botonera de Acciones Superiores */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 relative z-10 shrink-0">
              <button
                type="button"
                onClick={() => setShowHistoryModal(true)}
                className="h-11 px-4 rounded-[5px] bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs focus:outline-none focus:ring-2 focus:ring-tertiary min-h-[44px]"
              >
                <span className="material-symbols-outlined text-[18px]">history</span>
                Historial de Consultas
              </button>
              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className="h-11 px-4 rounded-[5px] bg-primary-container hover:bg-primary text-on-primary font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-tertiary min-h-[44px]"
              >
                <span className="material-symbols-outlined text-[18px]">ios_share</span>
                Exportar Plano (PDF/JSON)
              </button>
            </div>
          </div>
        </header>

        {/* 2. Main Workspace: Two-column Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMNA A: Asistente Predictivo Conversacional (5 cols / ~40%) */}
          <section aria-labelledby="assistant-title" className="lg:col-span-5 flex flex-col gap-4">
            <PredictiveAssistantChat
              entity={entity}
              onEntityChange={setEntity}
              promptText={promptText}
              onPromptTextChange={setPromptText}
              onGeneratePlan={handleGeneratePlan}
              isGenerating={isGenerating}
              onResetConversation={handleResetConversation}
              chatHistory={chatHistory}
            />
          </section>

          {/* COLUMNA B: Plano de Arquitectura Generado (7 cols / ~60%) */}
          <section aria-labelledby="blueprint-title" className="lg:col-span-7 flex flex-col gap-6">
            {/* Encabezado del Blueprint con ID y botón Guardar */}
            <div className="bg-surface-container-lowest rounded-[15px] p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-outline-variant/20">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      verified
                    </span>
                    Recomendación Validada
                  </span>
                  <span className="font-mono text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-[5px]">
                    {blueprint.planCode}
                  </span>
                  <span className="text-xs text-on-surface-variant">{blueprint.timestamp}</span>
                </div>
                <h2
                  className="font-heading text-lg sm:text-xl font-bold text-on-surface pt-1"
                  id="blueprint-title"
                >
                  {blueprint.title}
                </h2>
              </div>

              {/* Acciones del Blueprint */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveBlueprint}
                  className="h-10 px-3.5 rounded-[5px] bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-tertiary min-h-[40px]"
                  title="Guardar en repositorio distrital"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {savedToast ? "bookmark_added" : "bookmark_add"}
                  </span>
                  <span>{savedToast ? "Guardado" : "Guardar"}</span>
                </button>
              </div>
            </div>

            {/* SECCIÓN 1: Nivel de Madurez Sugerido (Matriz BID & Fórmula IAI) */}
            <BlueprintMaturityGauge maturity={blueprint.maturity} />

            {/* SECCIÓN 2: Building Blocks Requeridos (GovStack) */}
            <RequiredBuildingBlocksGrid buildingBlocks={blueprint.buildingBlocks} />

            {/* SECCIÓN 3: APIs Distritales a Consumir SDK */}
            <ApiEndpointsList apiEndpoints={blueprint.apiEndpoints} />

            {/* SECCIÓN 4: Componentes UI Recomendados (Kit UI Bogotá) */}
            <RecommendedUiComponents uiComponents={blueprint.uiComponents} />
          </section>
        </div>
      </div>

      {/* Modal Accesible: Historial de Consultas */}
      {showHistoryModal && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-0 m-0"
          aria-labelledby="history-modal-title"
        >
          <div className="bg-surface-container-lowest rounded-[15px] p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">history</span>
                <h3
                  id="history-modal-title"
                  className="font-heading text-lg font-bold text-on-surface"
                >
                  Historial de Consultas de Arquitectura
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
                aria-label="Cerrar modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant">
              Selecciona una consulta previa para cargar su plano de arquitectura y parámetros IAI
              calculados:
            </p>

            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
              {Object.entries(PRESET_BLUEPRINTS).map(([name, item]) => (
                <button
                  key={item.planCode}
                  type="button"
                  onClick={() => {
                    setBlueprint(item);
                    setEntity(item.entity);
                    setPromptText(item.description);
                    setShowHistoryModal(false);
                  }}
                  className="p-3 rounded-[10px] bg-surface-container-low hover:bg-surface-container text-left flex items-start justify-between gap-3 transition-colors border border-outline-variant/20 group"
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-primary">
                        {item.planCode}
                      </span>
                      <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        {name}
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant truncate max-w-[280px]">
                      {item.entity}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1B7A2E] bg-[#EAF5EC] px-2 py-0.5 rounded-[5px] shrink-0 font-mono">
                    IAI {item.maturity.score}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 rounded-[5px] bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high"
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal Accesible: Exportar Plano */}
      {showExportModal && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs w-full h-full border-0 m-0"
          aria-labelledby="export-modal-title"
        >
          <div className="bg-surface-container-lowest rounded-[15px] p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  ios_share
                </span>
                <h3
                  id="export-modal-title"
                  className="font-heading text-lg font-bold text-on-surface"
                >
                  Exportar Plano de Arquitectura
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
                aria-label="Cerrar modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Descarga la memoria técnica de arquitectura para radicación ante la Oficina Asesora de
              Planeación / OTIC o imprime el informe de madurez IAI:
            </p>

            <div className="flex flex-col gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleExportJson}
                className="p-3.5 rounded-[10px] bg-surface-container-low hover:bg-surface-container text-left flex items-center justify-between transition-colors border border-outline-variant/20"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[24px]">
                    data_object
                  </span>
                  <div>
                    <span className="font-bold text-xs text-on-surface block">
                      Descargar Especificación JSON
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Esquema compatible con OpenAPI 3.0 y GovStack Blueprint
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  download
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowExportModal(false);
                  setTimeout(() => window.print(), 200);
                }}
                className="p-3.5 rounded-[10px] bg-surface-container-low hover:bg-surface-container text-left flex items-center justify-between transition-colors border border-outline-variant/20"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">print</span>
                  <div>
                    <span className="font-bold text-xs text-on-surface block">
                      Imprimir / Guardar en PDF
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Formato imprimible con hoja de estilo oficial de la Alcaldía Mayor
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  open_in_new
                </span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-[5px] bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high"
              >
                Cancelar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
