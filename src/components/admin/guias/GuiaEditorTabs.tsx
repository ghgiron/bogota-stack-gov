"use client";

import { saveGuiaAction } from "@/app/admin/guias/actions";
import { BlockEditor } from "@/components/admin/guias/BlockEditor";
import type { AudienceType, ContentBlock, GuiaVinculacion, GuideStatus } from "@/types/guide";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Globe,
  Layers,
  Link2,
  Lock,
  Plus,
  RotateCw,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

const AVAILABLE_CATEGORIES = [
  "Interoperabilidad",
  "Diseño y UX",
  "Arquitectura",
  "Seguridad",
  "Gobernanza",
  "General",
];

const AVAILABLE_AUDIENCES: AudienceType[] = ["UX / UI", "Ingeniería", "Directivo"];

const PREDEFINED_BADGES = [
  "En Lectura",
  "Nuevo",
  "Revisión 2026",
  "Portal Transaccional",
  "Building Block",
  "Once-Only",
  "GovStack",
  "Homologación",
  "Red CADE",
];

interface GuiaEditorTabsProps {
  initialGuia?: GuiaVinculacion | null;
  allGuidesSummary?: { id: string; number: string; title: string }[];
}

export const GuiaEditorTabs: React.FC<GuiaEditorTabsProps> = ({
  initialGuia,
  allGuidesSummary = [],
}) => {
  const router = useRouter();

  // Tab activo
  const [activeTab, setActiveTab] = useState<"metadatos" | "badges" | "bloques" | "relaciones">(
    "metadatos",
  );

  // Tab 1: Metadatos Principales
  const [title, setTitle] = useState(initialGuia?.titulo || initialGuia?.title || "");
  const [number, setNumber] = useState(
    initialGuia?.numeroIdentificador || initialGuia?.number || "1.X",
  );
  const [slug, setSlug] = useState(initialGuia?.slug || "");
  const [summary, setSummary] = useState(
    initialGuia?.resumenEjecutivo || initialGuia?.summary || "",
  );
  const [status, setStatus] = useState<GuideStatus>(
    initialGuia?.estado || initialGuia?.status || "Borrador",
  );
  const [category, setCategory] = useState(
    initialGuia?.categoriaPrincipal || initialGuia?.category || "Diseño y UX",
  );
  const [audiences, setAudiences] = useState<AudienceType[]>(
    (initialGuia?.audiencias as AudienceType[]) || initialGuia?.audiences || ["UX / UI"],
  );
  const [author, setAuthor] = useState(
    initialGuia?.author || "Secretaría General - Dirección Distrital de TIC",
  );

  // Tab 2: Badges y Atributos Técnicos
  const [accessibilityLevel, setAccessibilityLevel] = useState(
    initialGuia?.nivelAccesibilidad || initialGuia?.accessibilityLevel || "WCAG 2.2 AA",
  );
  const [badges, setBadges] = useState<string[]>(initialGuia?.badges || ["Nuevo"]);
  const [customBadgeInput, setCustomBadgeInput] = useState("");

  // Tab 3: Bloques de Contenido
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    initialGuia?.blocks || [
      {
        id: "b-default-1",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Propósito y Alcance</h2><p>Describe en lenguaje claro el objetivo de esta especificación distrital.</p>",
          },
        },
      },
    ],
  );

  // Tab 4: Enlaces y Relaciones
  const [repoUrl, setRepoUrl] = useState(initialGuia?.repoUrl || "");
  const [relatedGuides, setRelatedGuides] = useState<string[]>(initialGuia?.relatedGuides || []);

  // Estados de interfaz y feedback
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto-generación de slug si está vacío
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!initialGuia?.id || !slug) {
      const generated = newTitle
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  // Toggle de audiencia
  const toggleAudience = (aud: AudienceType) => {
    setAudiences((prev) => (prev.includes(aud) ? prev.filter((a) => a !== aud) : [...prev, aud]));
  };

  // Toggle de badge
  const toggleBadge = (badge: string) => {
    setBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge],
    );
  };

  // Agregar badge personalizado
  const handleAddCustomBadge = () => {
    const val = customBadgeInput.trim();
    if (val && !badges.includes(val)) {
      setBadges([...badges, val]);
      setCustomBadgeInput("");
    }
  };

  // Toggle de guía relacionada
  const toggleRelatedGuide = (guideId: string) => {
    setRelatedGuides((prev) =>
      prev.includes(guideId) ? prev.filter((id) => id !== guideId) : [...prev, guideId],
    );
  };

  // Guardar (Borrador o Publicado)
  const handleSave = async (targetStatus?: GuideStatus) => {
    const finalStatus = targetStatus || status;

    if (!title.trim()) {
      setNotice({
        type: "error",
        message: "El título de la guía es un campo obligatorio.",
      });
      setActiveTab("metadatos");
      return;
    }

    try {
      setSaving(true);
      setNotice(null);

      const now = new Date().toISOString();
      const payload: Partial<GuiaVinculacion> = {
        id: initialGuia?.id,
        numeroIdentificador: number.trim() || "1.X",
        titulo: title.trim(),
        slug: slug.trim() || "guia-sin-slug",
        resumenEjecutivo: summary.trim(),
        estado: finalStatus,
        categoriaPrincipal: category,
        audiencias: audiences,
        nivelAccesibilidad: accessibilityLevel,
        bloquesContenido: blocks,
        ultimaModificacion: now,

        // Compatibilidad retroactiva
        number: number.trim() || "1.X",
        title: title.trim(),
        summary: summary.trim(),
        status: finalStatus,
        category,
        audiences,
        author,
        accessibilityLevel,
        badges,
        blocks,
        repoUrl: repoUrl.trim(),
        relatedGuides,
        updatedAt: now,
      };

      const result = await saveGuiaAction(payload);

      if (result.success && result.data) {
        setStatus(finalStatus);
        setNotice({
          type: "success",
          message: result.message,
        });

        // Si era nueva, redirigir a su URL editada
        if (!initialGuia?.id && result.data.id) {
          router.push(`/admin/guias/${result.data.id}`);
        }
      } else {
        setNotice({
          type: "error",
          message: result.message || "Error al guardar la guía.",
        });
      }
    } catch (err) {
      console.error("Error al guardar:", err);
      setNotice({
        type: "error",
        message: "Ocurrió una excepción al procesar la solicitud con el servidor.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Barra de título y estado de la guía */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/guias"
            className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            title="Volver al catálogo"
            aria-label="Volver al catálogo de guías"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center font-heading font-extrabold text-xs shadow-2xs">
                {number || "1.X"}
              </span>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-text-main truncate max-w-xl">
                {title || "Nueva Guía de Vinculación"}
              </h1>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Backoffice SGAB • Módulo de Gestión de Contenidos Técnicos
            </p>
          </div>
        </div>

        {/* Estado actual y botón de previsualización pública */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold ${
              status === "Publicado"
                ? "bg-green-100 text-green-800 border border-green-200"
                : status === "Revisión"
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "bg-amber-100 text-amber-800 border border-amber-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status === "Publicado"
                  ? "bg-[#1B7A2E] animate-pulse"
                  : status === "Revisión"
                    ? "bg-blue-600"
                    : "bg-amber-600"
              }`}
            />
            {status}
          </span>

          <Link
            href={
              slug === "lenguaje-claro"
                ? "/guias-de-vinculacion/lenguaje-claro"
                : slug
                  ? `/guias-de-vinculacion/${slug}`
                  : "/guias-de-vinculacion"
            }
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-semibold text-text-main shadow-2xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <span>Ver en Portal</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Banner de Feedback (Success / Error) */}
      {notice && (
        <div
          className={`p-4 rounded-md border flex items-start gap-3 transition-all ${
            notice.type === "success"
              ? "bg-green-50 border-green-200 text-green-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs sm:text-sm font-body leading-relaxed">
            {notice.message}
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

      {/* Navegación por Pestañas (Tabs) */}
      <div className="border-b border-gray-200">
        <nav
          className="flex items-center gap-2 overflow-x-auto no-scrollbar"
          aria-label="Pestañas de edición de la guía"
        >
          <button
            type="button"
            onClick={() => setActiveTab("metadatos")}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-colors ${
              activeTab === "metadatos"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tab 1: Metadatos Principales</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("badges")}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-colors ${
              activeTab === "badges"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Tab 2: Badges y Atributos Técnicos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bloques")}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-colors ${
              activeTab === "bloques"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tab 3: Editor de Contenido Multibloque</span>
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold font-mono flex items-center justify-center">
              {blocks.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("relaciones")}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-colors ${
              activeTab === "relaciones"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Tab 4: Enlaces y Relaciones</span>
          </button>
        </nav>
      </div>

      {/* CONTENIDO DE LAS PESTAÑAS */}
      <div className="bg-white rounded-card border border-gray-200 p-6 sm:p-8 shadow-xs">
        {/* ======================================================== */}
        {/* TAB 1: METADATOS PRINCIPALES */}
        {/* ======================================================== */}
        {activeTab === "metadatos" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-bold text-base text-text-main">
                Metadatos Principales de la Guía
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Información esencial de identificación, resumen ejecutivo y categorización
                institucional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Título */}
              <div className="md:col-span-3">
                <label
                  htmlFor="guide-title"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Título de la Guía <span className="text-primary">*</span>
                </label>
                <input
                  id="guide-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="ej. Guía 1.5: Contenido y Lenguaje Claro"
                  className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                />
              </div>

              {/* Identificador / Número */}
              <div>
                <label
                  htmlFor="guide-number"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Número / Identificador <span className="text-primary">*</span>
                </label>
                <input
                  id="guide-number"
                  type="text"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="ej. 1.3 o 1.5"
                  className="w-full h-10 px-3 text-xs sm:text-sm font-mono font-bold rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Slug */}
              <div>
                <label
                  htmlFor="guide-slug"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Slug URL <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-mono">
                    /
                  </span>
                  <input
                    id="guide-slug"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="lenguaje-claro"
                    className="w-full h-10 pl-6 pr-3 text-xs sm:text-sm font-mono rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                  />
                </div>
              </div>

              {/* Categoría */}
              <div>
                <label
                  htmlFor="guide-category"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Categoría Principal
                </label>
                <select
                  id="guide-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                >
                  {AVAILABLE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estado */}
              <div>
                <label
                  htmlFor="guide-status"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Estado de Publicación
                </label>
                <select
                  id="guide-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as GuideStatus)}
                  className="w-full h-10 px-3 text-xs sm:text-sm font-semibold rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                >
                  <option value="Borrador">Borrador (Interno)</option>
                  <option value="Revisión">En Revisión (Comité SGAB)</option>
                  <option value="Publicado">Publicado (Visible en Portal)</option>
                </select>
              </div>
            </div>

            {/* Resumen Ejecutivo */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="guide-summary" className="text-xs font-semibold text-text-main">
                  Resumen Ejecutivo
                </label>
                <span className="text-[11px] text-text-muted">{summary.length} caracteres</span>
              </div>
              <textarea
                id="guide-summary"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe en 2 a 3 líneas el alcance de esta guía para los equipos de las entidades..."
                className="w-full p-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35] resize-y"
              />
            </div>

            {/* Audiencias Objetivo (Multiselect con Chips) */}
            <div>
              <span className="block text-xs font-semibold text-text-main mb-2">
                Audiencias Objetivo (Selecciona todas las que apliquen)
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {AVAILABLE_AUDIENCES.map((aud) => {
                  const isSelected = audiences.includes(aud);
                  return (
                    <button
                      key={aud}
                      type="button"
                      onClick={() => toggleAudience(aud)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-bold border transition-colors ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-2xs"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{aud}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Autor / Dependencia */}
            <div>
              <label
                htmlFor="guide-author"
                className="block text-xs font-semibold text-text-main mb-1"
              >
                Dependencia o Autor Responsable
              </label>
              <input
                id="guide-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="ej. Secretaría General - Alta Consejería TIC"
                className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: BADGES Y ATRIBUTOS TÉCNICOS */}
        {/* ======================================================== */}
        {activeTab === "badges" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-bold text-base text-text-main">
                Badges y Atributos Técnicos
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Define las pautas de gobernanza, estándares de accesibilidad y etiquetas visuales de
                la guía.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nivel de Accesibilidad */}
              <div>
                <label
                  htmlFor="guide-a11y"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Nivel de Accesibilidad
                </label>
                <input
                  id="guide-a11y"
                  type="text"
                  value={accessibilityLevel}
                  onChange={(e) => setAccessibilityLevel(e.target.value)}
                  placeholder="ej. WCAG 2.2 AA"
                  className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                />
              </div>
            </div>

            {/* Selector de Badges (Checkbox Group) */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-semibold text-text-main">
                Etiquetas Especiales (Badges del Kit UI)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {PREDEFINED_BADGES.map((badgeName) => {
                  const isChecked = badges.includes(badgeName);
                  return (
                    <label
                      key={badgeName}
                      className={`flex items-center gap-2.5 p-3 rounded-md border cursor-pointer select-none transition-colors ${
                        isChecked
                          ? "bg-primary/5 border-primary/40 text-primary font-bold"
                          : "bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleBadge(badgeName)}
                        className="w-4 h-4 rounded text-primary focus:ring-[#CC0E35]"
                      />
                      <span className="text-xs font-heading font-medium">{badgeName}</span>
                    </label>
                  );
                })}
              </div>

              {/* Agregar tag personalizado */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={customBadgeInput}
                  onChange={(e) => setCustomBadgeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomBadge();
                    }
                  }}
                  placeholder="Añadir otro badge personalizado..."
                  className="h-9 px-3 text-xs rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomBadge}
                  className="h-9 px-3 rounded-md bg-gray-100 hover:bg-gray-200 text-xs font-heading font-bold text-gray-700 border border-gray-300 transition-colors"
                >
                  + Agregar
                </button>
              </div>

              {/* Badges seleccionados actualmente */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-text-muted mr-1">Activos:</span>
                {badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold font-heading border border-primary/20"
                  >
                    <span>{b}</span>
                    <button
                      type="button"
                      onClick={() => toggleBadge(b)}
                      title={`Eliminar badge ${b}`}
                      className="hover:text-primary-dark"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: EDITOR DE CONTENIDO MULTIBLOQUE */}
        {/* ======================================================== */}
        {activeTab === "bloques" && <BlockEditor blocks={blocks} onChange={setBlocks} />}

        {/* ======================================================== */}
        {/* TAB 4: ENLACES Y RELACIONES */}
        {/* ======================================================== */}
        {activeTab === "relaciones" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-bold text-base text-text-main">
                Enlaces y Relaciones con el Ecosistema
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Conecta esta guía con repositorios de código abiertos y con las demás guías
                distritales.
              </p>
            </div>

            {/* URL del Repositorio */}
            <div>
              <label
                htmlFor="guide-repo"
                className="block text-xs font-semibold text-text-main mb-1"
              >
                URL del Repositorio de Código o Documentación
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="guide-repo"
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/alcaldia-bogota/..."
                  className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                />
              </div>
            </div>

            {/* Guías Relacionadas */}
            <div className="space-y-3">
              <span className="block text-xs font-semibold text-text-main">
                Guías Relacionadas (Conecta con otros módulos de Bogotá Stack)
              </span>
              <p className="text-xs text-text-muted">
                Selecciona las guías que se mostrarán en la sección de &quot;Lecturas
                complementarias recomendadas&quot;.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1 border border-gray-200 rounded-md">
                {allGuidesSummary
                  .filter((g) => g.id !== initialGuia?.id)
                  .map((otherGuide) => {
                    const isLinked = relatedGuides.includes(otherGuide.id);
                    return (
                      <label
                        key={otherGuide.id}
                        className={`flex items-center gap-2.5 p-3 rounded-md border cursor-pointer select-none transition-colors ${
                          isLinked
                            ? "bg-tertiary/10 border-tertiary text-tertiary font-bold"
                            : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isLinked}
                          onChange={() => toggleRelatedGuide(otherGuide.id)}
                          className="w-4 h-4 rounded text-tertiary focus:ring-tertiary"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-mono font-bold text-gray-500 mr-1.5">
                            {otherGuide.number}
                          </span>
                          <span className="text-xs font-heading font-medium truncate">
                            {otherGuide.title}
                          </span>
                        </div>
                      </label>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* PANEL INFERIOR / FLOTANTE DE ACCIONES (STICKY FOOTER) */}
      {/* ======================================================== */}
      <div className="fixed bottom-0 left-0 lg:left-72 right-0 bg-white border-t border-gray-200 px-6 py-3.5 shadow-lg z-30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/guias"
            className="text-xs font-heading font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Descartar y volver
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-text-muted">
            {blocks.length} {blocks.length === 1 ? "bloque configurado" : "bloques configurados"}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Botón Guardar Borrador */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("Borrador")}
            className="h-10 px-4 rounded-md bg-white hover:bg-gray-100 border border-gray-300 text-xs font-heading font-bold text-gray-700 shadow-2xs transition-colors disabled:opacity-50 inline-flex items-center gap-2"
          >
            {saving ? (
              <RotateCw className="w-4 h-4 animate-spin text-gray-500" />
            ) : (
              <Save className="w-4 h-4 text-gray-500" />
            )}
            <span>Guardar Borrador</span>
          </button>

          {/* Botón Publicar Cambios */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("Publicado")}
            className="h-10 px-5 rounded-md bg-primary hover:bg-primary-hover text-white text-xs font-heading font-extrabold shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#CC0E35]"
          >
            {saving ? (
              <RotateCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Publicar Cambios</span>
          </button>
        </div>
      </div>
    </div>
  );
};
