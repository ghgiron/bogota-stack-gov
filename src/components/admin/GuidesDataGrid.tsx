"use client";

import { ButtonBogota } from "@/components/ui/ButtonBogota";
import type { Guide, GuideStatus } from "@/types/guide";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  ExternalLink,
  Eye,
  Filter,
  RotateCw,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

interface GuidesDataGridProps {
  guides: Guide[];
  loading: boolean;
  onRefresh: () => void;
  onEdit: (guide: Guide) => void;
  onView: (guide: Guide) => void;
}

export const GuidesDataGrid: React.FC<GuidesDataGridProps> = ({
  guides,
  loading,
  onRefresh,
  onEdit,
  onView,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");
  const [categoryFilter, setCategoryFilter] = useState<string>("Todos");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [guideToDelete, setGuideToDelete] = useState<Guide | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const categories = ["Todos", "Interoperabilidad", "Diseño y UX", "Arquitectura", "Seguridad"];

  const handleToggleStatus = async (guide: Guide) => {
    const newStatus: GuideStatus = guide.status === "Publicado" ? "Borrador" : "Publicado";
    try {
      const res = await fetch(`/api/guides/${guide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setActionSuccess(`Guía cambiada a estado "${newStatus}".`);
        onRefresh();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!guideToDelete) return;

    try {
      setDeletingId(guideToDelete.id);
      const res = await fetch(`/api/guides/${guideToDelete.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setActionSuccess("Guía eliminada correctamente.");
        setGuideToDelete(null);
        onRefresh();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (err) {
      console.error("Error al eliminar la guía:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = guides.filter((g) => {
    const matchesStatus = statusFilter === "Todos" ? true : g.status === statusFilter;
    const matchesCategory = categoryFilter === "Todos" ? true : g.category === categoryFilter;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      q === ""
        ? true
        : g.title.toLowerCase().includes(q) ||
          g.summary?.toLowerCase().includes(q) ||
          g.author?.toLowerCase().includes(q) ||
          g.slug?.toLowerCase().includes(q);

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Alerta de acción exitosa */}
      {actionSuccess && (
        <output className="p-3.5 bg-green-50 border border-green-200 rounded-btn text-xs text-green-800 flex items-center justify-between shadow-xs block">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" aria-hidden="true" />
            <span>{actionSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccess(null)}
            className="text-green-700 hover:text-green-950 font-bold px-2 py-1"
          >
            ×
          </button>
        </output>
      )}

      {/* Barra de Filtros y Controles del DataGrid */}
      <div className="bg-surface p-4 rounded-card border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Búsqueda */}
          <div className="relative w-full sm:w-72">
            <label htmlFor="search-grid" className="sr-only">
              Buscar en tabla de guías
            </label>
            <Search
              className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="search-grid"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar título, slug o autor..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary"
            />
          </div>

          {/* Filtro de Estado */}
          <div className="inline-flex rounded-btn border border-gray-300 bg-bg-main p-0.5">
            {["Todos", "Publicado", "Borrador"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-xs font-medium rounded-btn transition-colors ${
                  statusFilter === st
                    ? "bg-primary text-white shadow-xs"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Filtro de Categoría */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filtrar por categoría"
            className="px-3 py-1.5 text-xs bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "Todos" ? "Todas las Categorías" : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs text-text-muted font-medium">
            {filtered.length} {filtered.length === 1 ? "registro" : "registros"}
          </span>
          <button
            type="button"
            onClick={onRefresh}
            title="Recargar datos de Firestore"
            aria-label="Recargar lista de guías"
            className="p-2 text-text-muted hover:text-primary hover:bg-bg-main rounded-btn border border-gray-200 transition-colors focus-visible:ring-2 focus-visible:ring-tertiary"
          >
            <RotateCw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Tabla Semántica Accesible (DataGrid) */}
      <div className="bg-surface rounded-card border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <caption className="sr-only">
              Tabla de gestión de Guías de Vinculación Distrital
            </caption>
            <thead>
              <tr className="bg-bg-main border-b border-gray-200 text-text-main font-heading font-bold uppercase tracking-wider text-[11px]">
                <th scope="col" className="py-3.5 px-4">
                  Guía / Identificador
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Categoría
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Estado
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Autor Emisor
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Última Modificación
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-muted">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Cargando guías desde la base de datos...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-muted">
                    No se encontraron guías que coincidan con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filtered.map((guide) => (
                  <tr key={guide.id} className="hover:bg-bg-main/60 transition-colors group">
                    {/* Título & Slug */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-text-main text-sm">{guide.title}</div>
                      <div className="text-[11px] font-mono text-text-muted flex items-center gap-1 mt-0.5">
                        <span>slug:</span>
                        <span className="text-tertiary">{guide.slug || guide.id}</span>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-main bg-gray-100 px-2.5 py-1 rounded-btn">
                        <Tag className="w-3 h-3 text-text-muted" aria-hidden="true" />
                        <span>{guide.category || "General"}</span>
                      </span>
                    </td>

                    {/* Estado con botón de conmutación directa */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(guide)}
                        title="Haz clic para alternar entre Borrador y Publicado"
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-transform active:scale-95 ${
                          guide.status === "Publicado"
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {guide.status === "Publicado" ? (
                          <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                        ) : (
                          <Clock className="w-3 h-3" aria-hidden="true" />
                        )}
                        <span>{guide.status}</span>
                      </button>
                    </td>

                    {/* Autor */}
                    <td className="py-3.5 px-4 text-text-muted">
                      {guide.author || "Secretaría General"}
                    </td>

                    {/* Fecha de Actualización */}
                    <td className="py-3.5 px-4 text-text-muted font-mono text-[11px]">
                      {new Date(guide.updatedAt).toLocaleString("es-CO", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>

                    {/* Acciones */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1 justify-end">
                        {/* Ver previa */}
                        <button
                          type="button"
                          onClick={() => onView(guide)}
                          title="Previsualizar contenido"
                          aria-label={`Ver previa de ${guide.title}`}
                          className="min-h-touch min-w-touch p-2 rounded-btn text-text-muted hover:text-tertiary hover:bg-tertiary/10 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-tertiary"
                        >
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        </button>

                        {/* Editar */}
                        <button
                          type="button"
                          onClick={() => onEdit(guide)}
                          title="Editar en Markdown"
                          aria-label={`Editar ${guide.title}`}
                          className="min-h-touch min-w-touch p-2 rounded-btn text-text-muted hover:text-primary hover:bg-primary/10 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <Edit className="w-4 h-4" aria-hidden="true" />
                        </button>

                        {/* Eliminar */}
                        <button
                          type="button"
                          onClick={() => setGuideToDelete(guide)}
                          title="Eliminar guía"
                          aria-label={`Eliminar ${guide.title}`}
                          className="min-h-touch min-w-touch p-2 rounded-btn text-text-muted hover:text-red-700 hover:bg-red-50 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-red-600"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Accesible de Confirmación de Eliminación */}
      {guideToDelete && (
        <dialog
          open
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs w-full h-full max-w-none max-h-none m-0 border-0"
        >
          <div className="bg-surface rounded-card max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2
              id="confirm-delete-title"
              className="font-heading font-bold text-lg text-text-main mb-2"
            >
              ¿Eliminar Guía de Vinculación?
            </h2>
            <p className="text-xs text-text-muted mb-6 leading-relaxed">
              Esta acción eliminará el documento <strong>"{guideToDelete.title}"</strong> de la base
              de datos Firestore. Esta operación no se puede deshacer.
            </p>
            <div className="flex items-center justify-end gap-3">
              <ButtonBogota variant="outline" size="sm" onClick={() => setGuideToDelete(null)}>
                Cancelar
              </ButtonBogota>
              <ButtonBogota
                variant="primary"
                size="sm"
                isLoading={deletingId === guideToDelete.id}
                loadingText="Eliminando..."
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Sí, Eliminar Guía
              </ButtonBogota>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
