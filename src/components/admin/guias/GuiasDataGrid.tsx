"use client";

import {
  deleteGuiaAction,
  getGuiasAction,
  toggleGuiaStatusAction,
} from "@/app/admin/guias/actions";
import type { AudienceType, GuiaVinculacion, GuideStatus } from "@/types/guide";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpDown,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Edit,
  ExternalLink,
  Eye,
  Filter,
  Layers,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Tag,
  Trash2,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useMemo, useState } from "react";

const CATEGORIES = [
  "Todas",
  "Interoperabilidad",
  "Diseño y UX",
  "Arquitectura",
  "Seguridad",
  "Gobernanza",
];

const STATUSES = ["Todos", "Publicado", "Borrador", "Revisión"];

const AUDIENCES = ["Todas", "UX / UI", "Ingeniería", "Directivo"];

interface GuiasDataGridProps {
  initialGuides: GuiaVinculacion[];
}

export const GuiasDataGrid: React.FC<GuiasDataGridProps> = ({ initialGuides }) => {
  const router = useRouter();
  const [guides, setGuides] = useState<GuiaVinculacion[]>(initialGuides);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [audienceFilter, setAudienceFilter] = useState("Todas");
  const [loading, setLoading] = useState(false);

  // Modal de confirmación de eliminación
  const [guideToDelete, setGuideToDelete] = useState<GuiaVinculacion | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Modal o feedback de acción
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Refrescar listado
  const refreshGuides = async () => {
    try {
      setLoading(true);
      const res = await getGuiasAction();
      if (res.success) {
        setGuides(res.data);
      }
    } catch (err) {
      console.error("Error al refrescar guías:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cambio rápido de estado
  const handleToggleStatus = async (guide: GuiaVinculacion, newStatus: GuideStatus) => {
    try {
      const guideId = guide.id || guide.slug;
      const res = await toggleGuiaStatusAction(guideId, newStatus);
      if (res.success) {
        setGuides((prev) =>
          prev.map((g) =>
            g.id === guide.id || g.slug === guide.slug
              ? { ...g, status: newStatus, estado: newStatus }
              : g,
          ),
        );
        setNotice({
          type: "success",
          message: `Guía "${guide.numeroIdentificador || guide.number}" actualizada a estado "${newStatus}".`,
        });
        setTimeout(() => setNotice(null), 3000);
      }
    } catch (err) {
      console.error("Error al cambiar estado:", err);
    }
  };

  // Eliminar definitivamente
  const handleDeleteConfirm = async () => {
    if (!guideToDelete) return;
    try {
      setDeleting(true);
      const delId = guideToDelete.id || guideToDelete.slug;
      const res = await deleteGuiaAction(delId);
      if (res.success) {
        setGuides((prev) =>
          prev.filter((g) => g.id !== guideToDelete.id && g.slug !== guideToDelete.slug),
        );
        setNotice({
          type: "success",
          message: res.message,
        });
        setGuideToDelete(null);
        setTimeout(() => setNotice(null), 3500);
      } else {
        setNotice({
          type: "error",
          message: res.message,
        });
      }
    } catch (err) {
      console.error("Error al eliminar guía:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Filtros aplicados en memoria para respuesta instantánea
  const filteredGuides = useMemo(() => {
    const q = search.toLowerCase().trim();
    return guides.filter((g) => {
      // Filtro de estado
      if (statusFilter !== "Todos" && g.estado !== statusFilter && g.status !== statusFilter) {
        return false;
      }
      // Filtro de categoría
      if (
        categoryFilter !== "Todas" &&
        g.categoriaPrincipal !== categoryFilter &&
        g.category !== categoryFilter
      ) {
        return false;
      }
      // Filtro de audiencia
      if (
        audienceFilter !== "Todas" &&
        !g.audiencias?.includes(audienceFilter) &&
        !g.audiences?.includes(audienceFilter as AudienceType)
      ) {
        return false;
      }
      // Búsqueda textual
      if (!q) return true;
      return (
        (g.titulo || g.title || "").toLowerCase().includes(q) ||
        (g.numeroIdentificador || g.number || "").toLowerCase().includes(q) ||
        (g.resumenEjecutivo || g.summary || "").toLowerCase().includes(q) ||
        (g.categoriaPrincipal || g.category || "").toLowerCase().includes(q) ||
        (g.author || "").toLowerCase().includes(q) ||
        (g.badges || []).some((b) => b.toLowerCase().includes(q))
      );
    });
  }, [guides, search, statusFilter, categoryFilter, audienceFilter]);

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("Todos");
    setCategoryFilter("Todas");
    setAudienceFilter("Todas");
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Interoperabilidad":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Diseño y UX":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Arquitectura":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Seguridad":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Gobernanza":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Notificación de feedback */}
      {notice && (
        <div
          className={`p-4 rounded-md border flex items-center justify-between gap-3 shadow-xs transition-all ${
            notice.type === "success"
              ? "bg-green-50 border-green-200 text-green-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-body">
            {notice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{notice.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-gray-400 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Barra de Filtros Superiores & Botón + Nueva Guía */}
      <div className="bg-white p-5 rounded-card border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Input de Búsqueda */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título, número (ej. 1.5), token o resumen..."
              className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35] transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Acciones principales */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={refreshGuides}
              disabled={loading}
              title="Recargar datos"
              aria-label="Refrescar catálogo de guías"
              className="h-10 px-3.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-semibold text-gray-700 shadow-2xs transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin text-primary" : "text-gray-500"}`}
              />
              <span className="hidden sm:inline">Refrescar</span>
            </button>

            {/* BOTÓN + NUEVA GUÍA */}
            <Link
              href="/admin/guias/nueva"
              className="h-10 px-4 rounded-md bg-primary hover:bg-primary-hover text-white text-xs font-heading font-bold shadow-sm transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#CC0E35]"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nueva Guía</span>
            </Link>
          </div>
        </div>

        {/* Fila de Filtros Desplegables (Estado, Categoría, Audiencia) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-text-muted font-heading font-semibold">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span>Filtrar por:</span>
            </div>

            {/* Filtro Estado */}
            <div className="flex items-center gap-1">
              <label htmlFor="filter-status" className="text-gray-500 font-medium">
                Estado:
              </label>
              <select
                id="filter-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-8 px-2.5 rounded-md border border-gray-300 bg-white text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-[#CC0E35]"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Categoría */}
            <div className="flex items-center gap-1">
              <label htmlFor="filter-cat" className="text-gray-500 font-medium">
                Categoría:
              </label>
              <select
                id="filter-cat"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-8 px-2.5 rounded-md border border-gray-300 bg-white text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-[#CC0E35]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Audiencia */}
            <div className="flex items-center gap-1">
              <label htmlFor="filter-aud" className="text-gray-500 font-medium">
                Audiencia:
              </label>
              <select
                id="filter-aud"
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="h-8 px-2.5 rounded-md border border-gray-300 bg-white text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-[#CC0E35]"
              >
                {AUDIENCES.map((aud) => (
                  <option key={aud} value={aud}>
                    {aud}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contador y Reset */}
          <div className="flex items-center gap-3">
            <span className="text-text-muted">
              Mostrando <strong>{filteredGuides.length}</strong> de <strong>{guides.length}</strong>{" "}
              guías
            </span>
            {(search ||
              statusFilter !== "Todos" ||
              categoryFilter !== "Todas" ||
              audienceFilter !== "Todas") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-primary hover:underline font-semibold"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabla de Datos (DataGrid) */}
      <div className="bg-white rounded-card border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-body">
            <thead>
              <tr className="bg-surface-container-low text-text-main border-b border-gray-200 font-heading">
                <th className="py-3.5 px-4 font-bold text-left">Título / Identificador</th>
                <th className="py-3.5 px-3 font-bold text-left">Categoría</th>
                <th className="py-3.5 px-3 font-bold text-left">Estado</th>
                <th className="py-3.5 px-3 font-bold text-left">Audiencia</th>
                <th className="py-3.5 px-3 font-bold text-left">Última Modificación</th>
                <th className="py-3.5 px-4 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGuides.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center">
                    <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="font-heading font-bold text-sm text-text-main">
                      No se encontraron guías con los filtros seleccionados
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Intenta modificar los términos de búsqueda o restablecer los filtros.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-3 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-text-main transition-colors"
                    >
                      Restablecer filtros
                    </button>
                  </td>
                </tr>
              ) : (
                filteredGuides.map((guide) => {
                  const isPublic = guide.status === "Publicado";
                  const isDraft = guide.status === "Borrador";
                  const isReview = guide.status === "Revisión";

                  const publicUrl = guide.slug
                    ? `/guias-de-vinculacion/${guide.slug}`
                    : "/guias-de-vinculacion";

                  const formattedDate = new Date(
                    guide.ultimaModificacion || guide.updatedAt || Date.now(),
                  ).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <tr
                      key={guide.id || guide.slug}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      {/* 1. Título e Identificador */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-heading font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                            {guide.numeroIdentificador || guide.number || "1.X"}
                          </span>
                          <div className="min-w-0 max-w-sm sm:max-w-md">
                            <Link
                              href={`/admin/guias/${guide.id || guide.slug}`}
                              className="font-heading font-bold text-sm text-text-main hover:text-primary transition-colors block truncate"
                            >
                              {guide.titulo || guide.title}
                            </Link>
                            <p className="text-xs text-text-muted truncate mt-0.5 font-body">
                              {guide.resumenEjecutivo || guide.summary}
                            </p>
                            {/* Badges secundarios */}
                            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                              {guide.badges?.slice(0, 3).map((badge) => (
                                <span
                                  key={badge}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 font-mono"
                                >
                                  {badge}
                                </span>
                              ))}
                              {(guide.bloquesContenido || guide.blocks)?.length ? (
                                <span className="text-[10px] text-gray-400 font-medium">
                                  • {(guide.bloquesContenido || guide.blocks)?.length} bloques
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Categoría */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-[5px] text-[11px] font-bold font-heading border ${getCategoryBadgeClass(
                            guide.categoriaPrincipal || guide.category || "General",
                          )}`}
                        >
                          {guide.categoriaPrincipal || guide.category || "General"}
                        </span>
                      </td>

                      {/* 3. Estado (Select rápido interactivo) */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <select
                            value={guide.status}
                            onChange={(e) =>
                              handleToggleStatus(guide, e.target.value as GuideStatus)
                            }
                            className={`h-7 px-2 text-[11px] font-heading font-bold rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CC0E35] ${
                              isPublic
                                ? "bg-green-50 text-[#1B7A2E] border-green-300"
                                : isReview
                                  ? "bg-blue-50 text-blue-700 border-blue-300"
                                  : "bg-amber-50 text-amber-800 border-amber-300"
                            }`}
                          >
                            <option value="Publicado">● Publicado</option>
                            <option value="Revisión">● En Revisión</option>
                            <option value="Borrador">● Borrador</option>
                          </select>
                        </div>
                      </td>

                      {/* 4. Audiencia */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[160px]">
                          {guide.audiences?.map((aud) => (
                            <span
                              key={aud}
                              className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200"
                            >
                              {aud}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* 5. Última Modificación */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-text-muted">
                        <div className="flex flex-col">
                          <span className="font-medium text-text-main flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {formattedDate}
                          </span>
                          <span className="text-[10px] text-gray-400 truncate max-w-[130px]">
                            {guide.author}
                          </span>
                        </div>
                      </td>

                      {/* 6. Acciones */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {/* Botón Editar */}
                          <Link
                            href={`/admin/guias/${guide.id}`}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                            title="Editar guía en formulario avanzado"
                            aria-label={`Editar ${guide.title}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          {/* Botón Previsualizar */}
                          <Link
                            href={publicUrl}
                            target="_blank"
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-tertiary transition-colors focus-visible:ring-2 focus-visible:ring-tertiary"
                            title="Previsualizar en portal público"
                            aria-label={`Ver ${guide.title} en el portal`}
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {/* Botón Eliminar */}
                          <button
                            type="button"
                            onClick={() => setGuideToDelete(guide)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors focus-visible:ring-2 focus-visible:ring-red-600"
                            title="Eliminar guía"
                            aria-label={`Eliminar ${guide.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pie de tabla con resumen */}
        <div className="px-4 py-3 bg-gray-50/80 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted">
          <span>
            Total en sistema: <strong>{guides.length} guías distritales</strong> (
            {guides.filter((g) => g.status === "Publicado").length} publicadas,{" "}
            {guides.filter((g) => g.status === "Borrador").length} borradores,{" "}
            {guides.filter((g) => g.status === "Revisión").length} en revisión).
          </span>
          <span className="font-mono text-[11px] text-gray-400">
            Bogotá Stack • Repositorio SGAB
          </span>
        </div>
      </div>

      {/* Modal de confirmación para eliminar guía */}
      {guideToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-delete-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs"
        >
          <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-gray-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4
                  id="modal-delete-title"
                  className="font-heading font-bold text-base text-text-main"
                >
                  ¿Eliminar Guía de Vinculación?
                </h4>
                <p className="text-xs text-text-muted">
                  Esta acción eliminará la guía del catálogo distrital.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-md bg-gray-50 border border-gray-200 text-xs">
              <span className="font-bold font-mono text-primary block mb-0.5">
                {guideToDelete.number}
              </span>
              <p className="font-heading font-semibold text-text-main">{guideToDelete.title}</p>
            </div>

            <p className="text-xs text-text-muted leading-relaxed font-body">
              Al confirmar, se retirará del backoffice y dejará de estar disponible para las
              entidades en el Portal Transaccional.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setGuideToDelete(null)}
                className="px-4 py-2 rounded-md bg-white hover:bg-gray-100 border border-gray-300 text-xs font-heading font-bold text-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-heading font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                {deleting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Eliminar Definitivamente</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
