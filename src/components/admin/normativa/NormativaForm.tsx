"use client";

import { deleteNormativa, type NormativaDistrital, saveNormativa } from "@/lib/firebase/normativa";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileText,
  RefreshCw,
  Save,
  Scale,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

const TEMATICA_SUGGESTIONS = [
  "Portal Transaccional y Ecosistema Bogotá Stack",
  "Interoperabilidad & Datos",
  "Gobierno Digital & Ecosistema",
  "Accesibilidad Web (WCAG)",
  "Trámites y SUIT",
  "Política Pública Distrital",
  "Seguridad y Ciberseguridad Distrital",
];

const NIVELES: Array<NormativaDistrital["nivelObligatoriedad"]> = [
  "SGAB",
  "Lineamiento Distrital",
  "Ley Nacional",
  "Política Pública",
];

interface NormativaFormProps {
  initialNormativa: NormativaDistrital | null;
}

export const NormativaForm: React.FC<NormativaFormProps> = ({ initialNormativa }) => {
  const router = useRouter();
  const isEditing = Boolean(initialNormativa?.id);

  const [formData, setFormData] = useState<NormativaDistrital>({
    id: initialNormativa?.id || "",
    titulo: initialNormativa?.titulo || "",
    descripcion: initialNormativa?.descripcion || "",
    entidadEmisora: initialNormativa?.entidadEmisora || "",
    tematica: initialNormativa?.tematica || "",
    nivelObligatoriedad: initialNormativa?.nivelObligatoriedad || "SGAB",
    urlTexto: initialNormativa?.urlTexto || "",
    urlDescargaAdjunto: initialNormativa?.urlDescargaAdjunto || "",
    fechaCreacion: initialNormativa?.fechaCreacion || "",
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validaciones
    if (!formData.titulo.trim()) {
      setErrorMsg("El título del instrumento legal es obligatorio.");
      return;
    }
    if (!formData.descripcion.trim()) {
      setErrorMsg("La descripción o alcance de la norma es obligatoria.");
      return;
    }
    if (!formData.entidadEmisora.trim()) {
      setErrorMsg("La entidad emisora es obligatoria.");
      return;
    }
    if (!formData.tematica.trim()) {
      setErrorMsg("La temática o ámbito técnico es obligatorio.");
      return;
    }
    if (!formData.urlTexto.trim()) {
      setErrorMsg("La URL oficial del texto (SISJUR o portal emisor) es obligatoria.");
      return;
    }

    try {
      setSaving(true);
      const res = await saveNormativa(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          router.push("/admin/normativa");
          router.refresh();
        }, 1200);
      } else {
        setErrorMsg(res.message || "No se pudo guardar la norma en Firestore.");
      }
    } catch (err) {
      console.error("Error guardando norma:", err);
      setErrorMsg("Ocurrió un error inesperado al procesar la solicitud.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) return;
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar permanentemente "${formData.titulo}"?`,
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      const res = await deleteNormativa(formData.id);
      if (res.success) {
        router.push("/admin/normativa");
        router.refresh();
      } else {
        setErrorMsg(res.message || "Error al eliminar.");
      }
    } catch (err) {
      console.error("Error al eliminar norma:", err);
      setErrorMsg("Ocurrió un error al intentar eliminar la norma.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alertas de Feedback */}
      {errorMsg && (
        <div
          role="alert"
          className="p-4 rounded-btn bg-red-950/40 border border-red-800 text-red-200 text-sm flex items-center gap-2.5 animate-in fade-in duration-150"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div
          role="status"
          className="p-4 rounded-btn bg-green-950/40 border border-green-800 text-green-200 text-sm flex items-center gap-2.5 animate-in fade-in duration-150"
        >
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Contenedor del Formulario */}
      <div className="bg-surface-container-lowest border border-surface-container-highest rounded-card p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-container-highest gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[8px] bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-text-main">
                {isEditing ? "Editar Instrumento Normativo" : "Nuevo Instrumento Normativo"}
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Ingresa los datos del instrumento jurídico vinculante para la ciudadanía y entidades
                distritales.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/normativa"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-btn text-xs font-semibold text-text-muted hover:text-text-main hover:bg-surface-container transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la lista</span>
            </Link>
          </div>
        </div>

        {/* Grilla de campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Título de la Norma */}
          <div className="md:col-span-2 space-y-1.5">
            <label
              htmlFor="titulo"
              className="block font-heading text-xs font-bold uppercase tracking-wider text-text-main"
            >
              Título de la Norma / Instrumento Legal <span className="text-primary">*</span>
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              required
              value={formData.titulo}
              onChange={handleChange}
              placeholder="ej. Decreto Distrital 640 de 2025"
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-[11px] text-text-muted">
              Identificador legal oficial (ej. Decreto Distrital, Resolución, Ley de la República).
            </p>
          </div>

          {/* Descripción */}
          <div className="md:col-span-2 space-y-1.5">
            <label
              htmlFor="descripcion"
              className="block font-heading text-xs font-bold uppercase tracking-wider text-text-main"
            >
              Descripción / Objeto del Instrumento <span className="text-primary">*</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={3}
              required
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="ej. Adopción de Bogotá Stack como estándar distrital y obligatoriedad técnica para el ecosistema digital"
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
            />
            <p className="text-[11px] text-text-muted">
              Resumen conciso y claro de la aplicación e impacto de la norma para la ciudadanía y
              entidades.
            </p>
          </div>

          {/* Entidad Emisora */}
          <div className="space-y-1.5">
            <label
              htmlFor="entidadEmisora"
              className="block font-heading text-xs font-bold uppercase tracking-wider text-text-main"
            >
              Entidad Emisora <span className="text-primary">*</span>
            </label>
            <input
              id="entidadEmisora"
              name="entidadEmisora"
              type="text"
              required
              value={formData.entidadEmisora}
              onChange={handleChange}
              placeholder="ej. Alcaldía Mayor / Secretaría General"
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Nivel de Obligatoriedad */}
          <div className="space-y-1.5">
            <label
              htmlFor="nivelObligatoriedad"
              className="block font-heading text-xs font-bold uppercase tracking-wider text-text-main"
            >
              Nivel de Obligatoriedad <span className="text-primary">*</span>
            </label>
            <select
              id="nivelObligatoriedad"
              name="nivelObligatoriedad"
              required
              value={formData.nivelObligatoriedad}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer font-medium"
            >
              {NIVELES.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-text-muted">
              Define el alcance jurídico (SGAB, Lineamiento Distrital, Ley Nacional o Política
              Pública).
            </p>
          </div>

          {/* Temática / Ámbito */}
          <div className="md:col-span-2 space-y-1.5">
            <label
              htmlFor="tematica"
              className="block font-heading text-xs font-bold uppercase tracking-wider text-text-main"
            >
              Temática / Ámbito de Aplicación <span className="text-primary">*</span>
            </label>
            <input
              id="tematica"
              name="tematica"
              type="text"
              list="tematicas-list"
              required
              value={formData.tematica}
              onChange={handleChange}
              placeholder="ej. Portal Transaccional y Ecosistema Bogotá Stack"
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <datalist id="tematicas-list">
              {TEMATICA_SUGGESTIONS.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
            <p className="text-[11px] text-text-muted">
              Puedes seleccionar una temática existente o escribir una nueva para clasificar el
              documento.
            </p>
          </div>

          {/* URL Texto Oficial / SISJUR */}
          <div className="space-y-1.5">
            <label
              htmlFor="urlTexto"
              className="block font-heading text-xs font-bold uppercase tracking-wider text-text-main"
            >
              URL Oficial del Texto (SISJUR / MinTIC) <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                id="urlTexto"
                name="urlTexto"
                type="url"
                required
                value={formData.urlTexto}
                onChange={handleChange}
                placeholder="https://www.alcaldiabogota.gov.co/sisjur/normas/..."
                className="w-full pl-4 pr-10 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formData.urlTexto && (
                <a
                  href={formData.urlTexto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary p-1"
                  title="Abrir enlace en pestaña nueva"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-[11px] text-text-muted">
              Enlace directo al sistema de información jurídica o publicación oficial.
            </p>
          </div>

          {/* URL Descarga Adjunto / PDF */}
          <div className="space-y-1.5">
            <label
              htmlFor="urlDescargaAdjunto"
              className="block font-heading text-xs font-bold uppercase tracking-wider text-text-main"
            >
              URL de Descarga Adjunto / PDF (Opcional)
            </label>
            <div className="relative">
              <input
                id="urlDescargaAdjunto"
                name="urlDescargaAdjunto"
                type="url"
                value={formData.urlDescargaAdjunto || ""}
                onChange={handleChange}
                placeholder="https://.../documento.pdf"
                className="w-full pl-4 pr-10 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-btn text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formData.urlDescargaAdjunto && (
                <a
                  href={formData.urlDescargaAdjunto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary p-1"
                  title="Abrir anexo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-[11px] text-text-muted">
              Enlace de descarga directa del documento en PDF o soporte técnico oficial.
            </p>
          </div>
        </div>

        {/* Barra de Acciones del Formulario */}
        <div className="pt-6 border-t border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {isEditing && (
              <button
                type="button"
                disabled={deleting || saving}
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-500/10 transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>Eliminar Instrumento</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/admin/normativa"
              className="px-4 py-2.5 rounded-btn text-sm font-semibold text-text-muted hover:bg-surface-container transition-colors"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={saving || deleting}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-btn bg-primary hover:bg-primary/90 text-white font-heading font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Guardando en Firestore...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Guardar Instrumento Legal</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
