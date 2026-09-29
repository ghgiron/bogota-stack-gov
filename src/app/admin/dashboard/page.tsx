"use client";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { BuildingBlocksGrid } from "@/components/admin/BuildingBlocksGrid";
import { GuideEditor } from "@/components/admin/GuideEditor";
import { GuidesDataGrid } from "@/components/admin/GuidesDataGrid";
import { ButtonBogota } from "@/components/ui/ButtonBogota";
import type { Guide } from "@/types/guide";
import {
  Blocks,
  BookOpen,
  CheckCircle2,
  Eye,
  FileCheck,
  FileClock,
  Layers,
  Plus,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "guias";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [previewGuide, setPreviewGuide] = useState<Guide | null>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const loadGuides = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/guides");
      const json = await res.json();
      if (json.success) {
        setGuides(json.data);
      }
    } catch (err) {
      console.error("Error al cargar guías para el dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGuides();
  }, [loadGuides]);

  const handleNewGuide = () => {
    setEditingGuide(null);
    setEditorOpen(true);
  };

  const handleEditGuide = (guide: Guide) => {
    setEditingGuide(guide);
    setEditorOpen(true);
  };

  const handleViewGuide = (guide: Guide) => {
    setPreviewGuide(guide);
  };

  const totalGuides = guides.length;
  const publishedGuides = guides.filter((g) => g.status === "Publicado").length;
  const draftGuides = guides.filter((g) => g.status === "Borrador").length;
  const totalBlocks = 4;

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Barra superior de administración */}
      <AdminHeader
        title="Gestor SGAB — Bogotá Stack"
        subtitle="Panel centralizado de administración de Guías de Vinculación y Building Blocks"
        onNewGuideClick={handleNewGuide}
      />

      <main className="p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Tarjetas de Métricas Ejecutivas */}
        <section
          aria-label="Resumen de estadísticas"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Card 1: Total Guías */}
          <div className="bg-surface p-5 rounded-card border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-text-muted">Total Guías</div>
              <div className="text-2xl font-heading font-extrabold text-text-main mt-1">
                {totalGuides}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">En colección /guides</div>
            </div>
            <div className="w-11 h-11 rounded-btn bg-primary/10 text-primary flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          {/* Card 2: Publicadas */}
          <div className="bg-surface p-5 rounded-card border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-text-muted">Publicadas</div>
              <div className="text-2xl font-heading font-extrabold text-green-700 mt-1">
                {publishedGuides}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">Visibles a la ciudadanía</div>
            </div>
            <div className="w-11 h-11 rounded-btn bg-green-50 text-green-600 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          {/* Card 3: Borradores */}
          <div className="bg-surface p-5 rounded-card border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-text-muted">Borradores</div>
              <div className="text-2xl font-heading font-extrabold text-amber-700 mt-1">
                {draftGuides}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">En revisión interna</div>
            </div>
            <div className="w-11 h-11 rounded-btn bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <FileClock className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          {/* Card 4: Building Blocks */}
          <div className="bg-surface p-5 rounded-card border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-text-muted">Building Blocks</div>
              <div className="text-2xl font-heading font-extrabold text-tertiary mt-1">
                {totalBlocks}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">Servicios & APIs activas</div>
            </div>
            <div className="w-11 h-11 rounded-btn bg-tertiary/10 text-tertiary flex items-center justify-center font-bold">
              <Blocks className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* Pestañas de Navegación del Dashboard */}
        <div className="border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("guias")}
              className={`pb-3 px-4 text-sm font-heading font-bold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "guias"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guías de Vinculación</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-text-main">
                {totalGuides}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("blocks")}
              className={`pb-3 px-4 text-sm font-heading font-bold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "blocks"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              <Blocks className="w-4 h-4" />
              <span>Building Blocks (APIs)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-text-main">
                {totalBlocks}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("resumen")}
              className={`pb-3 px-4 text-sm font-heading font-bold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "resumen"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Arquitectura Ecosistema</span>
            </button>
          </div>

          <ButtonBogota
            variant="primary"
            size="sm"
            onClick={handleNewGuide}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Redactar Guía
          </ButtonBogota>
        </div>

        {/* Contenido de la pestaña activa */}
        {activeTab === "guias" && (
          <section aria-label="Gestor de Guías">
            <GuidesDataGrid
              guides={guides}
              loading={loading}
              onRefresh={loadGuides}
              onEdit={handleEditGuide}
              onView={handleViewGuide}
            />
          </section>
        )}

        {activeTab === "blocks" && (
          <section aria-label="Gestor de Building Blocks">
            <BuildingBlocksGrid />
          </section>
        )}

        {activeTab === "resumen" && (
          <section aria-label="Resumen de Arquitectura" className="space-y-6">
            <div className="bg-surface p-6 rounded-card border border-gray-200">
              <h2 className="font-heading font-bold text-lg text-text-main mb-2">
                Estado de la Arquitectura Distrital B2G
              </h2>
              <p className="text-xs text-text-muted leading-relaxed max-w-3xl mb-6">
                El panel SGAB permite gestionar la estandarización técnica de las entidades públicas
                de Bogotá. Los cambios publicados se propagan inmediatamente al catálogo ciudadano.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-bg-main rounded-btn border border-gray-200">
                  <div className="font-heading font-bold text-sm text-text-main mb-1">
                    Capa de Persistencia
                  </div>
                  <div className="text-xs text-text-muted">
                    NoSQL Firestore con Patrón Repositorio (`IGuidesRepository`).
                  </div>
                </div>

                <div className="p-4 bg-bg-main rounded-btn border border-gray-200">
                  <div className="font-heading font-bold text-sm text-text-main mb-1">
                    Estándar de Accesibilidad
                  </div>
                  <div className="text-xs text-text-muted">
                    WCAG 2.2 AA Estricto (Botones 44x44px, lectores de pantalla).
                  </div>
                </div>

                <div className="p-4 bg-bg-main rounded-btn border border-gray-200">
                  <div className="font-heading font-bold text-sm text-text-main mb-1">
                    Módulo de Inteligencia Artificial
                  </div>
                  <div className="text-xs text-text-muted">
                    Gemini Pro listo para integración en digitalización de trámites.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modal / Drawer del Editor Markdown */}
      <GuideEditor
        initialGuide={editingGuide}
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSaved={loadGuides}
      />

      {/* Modal de Previsualización Rápida */}
      {previewGuide && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs w-full h-full max-w-none max-h-none m-0 border-0"
        >
          <div className="bg-surface rounded-card max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-bg-main">
              <div>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${
                    previewGuide.status === "Publicado"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {previewGuide.status}
                </span>
                <h2
                  id="preview-modal-title"
                  className="font-heading font-bold text-xl text-text-main"
                >
                  {previewGuide.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPreviewGuide(null)}
                aria-label="Cerrar vista previa"
                className="p-2 rounded-btn text-text-muted hover:text-text-main hover:bg-gray-200"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 font-body text-sm leading-relaxed text-text-main whitespace-pre-wrap font-mono bg-bg-main/50 m-4 rounded-btn border border-gray-200">
              {previewGuide.content}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3 bg-bg-main">
              <ButtonBogota variant="outline" size="sm" onClick={() => setPreviewGuide(null)}>
                Cerrar
              </ButtonBogota>
              <ButtonBogota
                variant="primary"
                size="sm"
                onClick={() => {
                  const toEdit = previewGuide;
                  setPreviewGuide(null);
                  handleEditGuide(toEdit);
                }}
              >
                Editar en Markdown
              </ButtonBogota>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 p-12 text-center text-text-muted flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Cargando SGAB Backoffice...</span>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
