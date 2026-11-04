"use client";

import { deleteNormativa, type NormativaDistrital } from "@/lib/firebase/normativa";
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
  FileDown,
  Filter,
  Layers,
  MoreVertical,
  Plus,
  RefreshCw,
  Scale,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useId, useMemo, useState } from "react";

const NIVELES: Array<"Todos" | NormativaDistrital["nivelObligatoriedad"]> = [
  "Todos",
  "SGAB",
  "Lineamiento Distrital",
  "Ley Nacional",
  "Política Pública",
];

interface NormativasDataGridProps {
  initialNormativas: NormativaDistrital[];
}

export const NormativasDataGrid: React.FC<NormativasDataGridProps> = ({ initialNormativas }) => {
  const router = useRouter();
  const [normativas, setNormativas] = useState<NormativaDistrital[]>(initialNormativas);
  const [search, setSearch] = useState("");
  const [nivelFilter, setNivelFilter] = useState<string>("Todos");
  const [tematicaFilter, setTematicaFilter] = useState<string>("Todas");

  // Modal confirmación eliminación
  const [itemToDelete, setItemToDelete] = useState<NormativaDistrital | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Toast de feedback
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Extraer temáticas únicas disponibles
  const tematicas = useMemo(() => {
    const list = Array.from(new Set(normativas.map((n) => n.tematica).filter(Boolean)));
    list.sort();
    return ["Todas", ...list];
  }, [normativas]);

  // Filtrado reactivo
  const filteredNormativas = useMemo(() => {
    return normativas.filter((item) => {
      // Filtro nivel
      if (nivelFilter !== "Todos" && item.nivelObligatoriedad !== nivelFilter) {
        return false;
      }
      // Filtro temática
      if (tematicaFilter !== "Todas" && item.tematica !== tematicaFilter) {
        return false;
      }
      // Búsqueda por texto
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matches =
          item.titulo.toLowerCase().includes(q) ||
          item.descripcion.toLowerCase().includes(q) ||
          item.entidadEmisora.toLowerCase().includes(q) ||
          item.tematica.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [normativas, search, nivelFilter, tematicaFilter]);

  const handleDeleteConfirm = async () => {
    if (!itemToDelete || !itemToDelete.id) return;
    try {
      setDeleting(true);
      const res = await deleteNormativa(itemToDelete.id);
      if (res.success) {
        setNormativas((prev) => prev.filter((n) => n.id !== itemToDelete.id));
        setNotice({
          type: "success",
          message: `Norma "${itemToDelete.titulo}" eliminada permanentemente.`,
        });
        setItemToDelete(null);
        setTimeout(() => setNotice(null), 3500);
      } else {
        setNotice({
          type: "error",
          message: res.message || "Error al eliminar la norma.",
        });
      }
    } catch (err) {
      console.error("Error al eliminar norma:", err);
      setNotice({
        type: "error",
        message: "Ocurrió un error inesperado al procesar la eliminación.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast de notificación */}
      {notice && (
        <div
          role="status"
          className={`p-4 rounded-btn border text-sm font-medium flex items-center justify-between shadow-lg transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
            notice.type === "success"
              ? "bg-green-950/40 border-green-800 text-green-200"
              : "bg-red-950/40 border-red-800 text-red-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notice.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{notice.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-white/60 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Barra de herramientas y filtros */}
      <div className="p-4 sm:p-5 rounded-btn bg-surface-container-low border border-surface-container-highest flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filtros de búsqueda */}
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Input de búsqueda */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por decreto, ley, temática o entidad..."
              className="w-full pl-9 pr-4 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filtro Nivel de Obligatoriedad */}
          <div className="w-full sm:w-52">
            <select
              value={nivelFilter}
              onChange={(e) => setNivelFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {NIVELES.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === "Todos" ? "Todos los niveles" : lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Temática */}
          <div className="w-full sm:w-56">
            <select
              value={tematicaFilter}
              onChange={(e) => setTematicaFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {tematicas.map((tem) => (
                <option key={tem} value={tem}>
                  {tem === "Todas" ? "Todas las temáticas" : tem}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón de Nueva Norma */}
        <div className="shrink-0 flex items-center gap-2">
          <Link
            href="/admin/normativa/nueva"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-btn bg-primary hover:bg-primary/90 text-white font-heading font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Norma</span>
          </Link>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between text-xs text-text-muted px-1 font-body">
        <span>
          Mostrando <strong>{filteredNormativas.length}</strong> de{" "}
          <strong>{normativas.length}</strong> instrumentos normativos
        </span>
        {(search || nivelFilter !== "Todos" || tematicaFilter !== "Todas") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setNivelFilter("Todos");
              setTematicaFilter("Todas");
            }}
            className="text-primary hover:underline font-semibold"
          >
            Restablecer filtros
          </button>
        )}
      </div>

      {/* Tabla de Instrumentos Normativos */}
      <div className="rounded-btn overflow-hidden bg-surface-container-lowest border border-surface-container-highest shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-surface-container font-heading text-xs font-bold text-text-main uppercase tracking-wider border-b border-surface-container-highest">
                <th scope="col" className="py-3.5 px-5">
                  Norma / Instrumento Legal
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Entidad Emisora
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Temática / Ámbito
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Nivel de Obligatoriedad
                </th>
                <th scope="col" className="py-3.5 px-5 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest/60 text-sm">
              {filteredNormativas.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-surface-container-low/70 transition-colors group"
                >
                  {/* Norma / Título */}
                  <td className="py-4 px-5 max-w-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-[6px] bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <Link
                          href={`/admin/normativa/${item.id}`}
                          className="font-heading font-bold text-text-main group-hover:text-primary transition-colors block leading-tight"
                        >
                          {item.titulo}
                        </Link>
                        <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                          {item.descripcion}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Entidad Emisora */}
                  <td className="py-4 px-4 text-xs sm:text-sm text-text-main">
                    <span className="font-medium">{item.entidadEmisora}</span>
                  </td>

                  {/* Temática */}
                  <td className="py-4 px-4 text-xs sm:text-sm text-text-muted">
                    <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-xs font-medium text-text-main">
                      {item.tematica}
                    </span>
                  </td>

                  {/* Nivel de Obligatoriedad (Badges) */}
                  <td className="py-4 px-4">
                    {item.nivelObligatoriedad === "SGAB" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#1B7A2E]/10 text-[#1B7A2E] text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B7A2E]" />
                        SGAB
                      </span>
                    )}
                    {item.nivelObligatoriedad === "Lineamiento Distrital" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Lineamiento Distrital
                      </span>
                    )}
                    {item.nivelObligatoriedad === "Ley Nacional" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] border border-[#1B7A2E] text-[#1B7A2E] bg-transparent text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B7A2E]" />
                        Ley Nacional
                      </span>
                    )}
                    {item.nivelObligatoriedad === "Política Pública" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Política Pública
                      </span>
                    )}
                  </td>

                  {/* Acciones */}
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href={`/admin/normativa/${item.id}`}
                        aria-label={`Editar ${item.titulo}`}
                        className="p-2 rounded-btn text-text-muted hover:text-primary hover:bg-surface-container transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <a
                        href={item.urlTexto}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver texto oficial de ${item.titulo}`}
                        className="p-2 rounded-btn text-text-muted hover:text-primary hover:bg-surface-container transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setItemToDelete(item)}
                        aria-label={`Eliminar ${item.titulo}`}
                        className="p-2 rounded-btn text-text-muted hover:text-red-600 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Estado Vacío */}
        {filteredNormativas.length === 0 && (
          <div className="p-12 text-center">
            <Scale className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-60" />
            <p className="font-heading font-bold text-base text-text-main">
              No se encontraron instrumentos normativos
            </p>
            <p className="text-sm text-text-muted mt-1 max-w-sm mx-auto font-body">
              Prueba modificando los términos de búsqueda o restableciendo los filtros de nivel y
              temática.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setNivelFilter("Todos");
                setTematicaFilter("Todas");
              }}
              className="mt-4 px-4 py-2 rounded-btn bg-surface-container hover:bg-surface-container-high text-text-main text-xs font-semibold"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      {itemToDelete && (
        <dialog
          open
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs w-full h-full border-none m-0"
        >
          <div className="bg-surface-container-lowest rounded-card max-w-md w-full p-6 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-text-main">
                  Eliminar Instrumento Legal
                </h3>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  ¿Estás seguro de que deseas eliminar permanentemente{" "}
                  <strong>"{itemToDelete.titulo}"</strong> del Repositorio Normativo Distrital? Esta
                  acción no se puede deshacer.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-container-highest flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-btn text-sm font-semibold text-text-muted hover:bg-surface-container transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-btn text-sm font-semibold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar Definitivamente</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
