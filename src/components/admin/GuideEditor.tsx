"use client";

import { ButtonBogota } from "@/components/ui/ButtonBogota";
import type { CreateGuideDTO, Guide, GuideStatus } from "@/types/guide";
import {
  AlertCircle,
  Bold,
  CheckCircle2,
  Code,
  Edit3,
  Eye,
  Heading1,
  Heading2,
  Italic,
  List,
  Quote,
  Save,
  Sparkles,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface GuideEditorProps {
  initialGuide?: Guide | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const GuideEditor: React.FC<GuideEditorProps> = ({
  initialGuide,
  isOpen,
  onClose,
  onSaved,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Interoperabilidad");
  const [status, setStatus] = useState<GuideStatus>("Publicado");
  const [author, setAuthor] = useState("Secretaría General");
  const [summary, setSummary] = useState("");
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    if (initialGuide) {
      setTitle(initialGuide.title);
      setContent(initialGuide.content);
      setCategory(initialGuide.category || "Interoperabilidad");
      setStatus(initialGuide.status);
      setAuthor(initialGuide.author || "Secretaría General");
      setSummary(initialGuide.summary || "");
    } else {
      setTitle("");
      setContent(
        '# Nueva Guía de Vinculación\n\n## 1. Propósito\nDescriba el objetivo del estándar.\n\n## 2. Requisitos Técnicos\n- Requisito 1\n- Requisito 2\n\n```json\n{\n  "servicio": "ejemplo"\n}\n```\n',
      );
      setCategory("Interoperabilidad");
      setStatus("Publicado");
      setAuthor("Secretaría General");
      setSummary("");
    }
    setErrorMessage(null);
    setSuccessNotice(null);
    setActiveTab("editor");
  }, [initialGuide]);

  if (!isOpen) return null;

  // Inserción de snippets de Markdown en la posición del cursor
  const insertSnippet = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("guide-markdown-input") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || "texto"}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected.length || "texto".length),
      );
    }, 50);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMessage("El título y el contenido Markdown son campos s.");
      return;
    }

    try {
      setSaving(true);
      setErrorMessage(null);

      const payload: CreateGuideDTO = {
        title,
        content,
        category,
        status,
        author,
        summary: summary || title,
      };

      const url = initialGuide ? `/api/guides/${initialGuide.id}` : "/api/guides";
      const method = initialGuide ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "No se pudo guardar la guía.");
      }

      setSuccessNotice(
        initialGuide
          ? "Guía actualizada correctamente en Firestore."
          : "Nueva guía creada y guardada con éxito.",
      );

      setTimeout(() => {
        onSaved();
        onClose();
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado al persistir.";
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <dialog
      open
      aria-modal="true"
      aria-labelledby="editor-dialog-title"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xs w-full h-full max-w-none max-h-none m-0 border-0"
    >
      <div className="bg-surface rounded-card max-w-4xl w-full h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Cabecera del Editor */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-bg-main">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-btn bg-primary text-white flex items-center justify-center font-bold">
              <Edit3 className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="editor-dialog-title"
                className="font-heading font-extrabold text-lg text-text-main"
              >
                {initialGuide ? "Editar Guía de Vinculación" : "Crear Nueva Guía Distrital"}
              </h2>
              <span className="text-[11px] text-text-muted">
                Persistencia en colección NoSQL /guides vía dbService.ts
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar editor"
            className="p-2 rounded-btn text-text-muted hover:text-text-main hover:bg-gray-200 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Formulario & Área de Contenido */}
        <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
          {/* Alertas */}
          {errorMessage && (
            <div
              role="alert"
              className="m-4 p-3.5 bg-red-50 border border-red-200 rounded-btn text-xs text-red-800 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successNotice && (
            <output className="m-4 p-3.5 bg-green-50 border border-green-200 rounded-btn text-xs text-green-800 flex items-center gap-2 block">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" aria-hidden="true" />
              <span>{successNotice}</span>
            </output>
          )}

          {/* Campos de Metadatos */}
          <div className="p-5 border-b border-gray-200 space-y-4 bg-surface">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Título */}
              <div className="sm:col-span-8">
                <label
                  htmlFor="guide-editor-title"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Título de la Guía *
                </label>
                <input
                  id="guide-editor-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Guía de Autenticación Centralizada"
                  className="w-full px-3 py-2 text-sm bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary"
                />
              </div>

              {/* Estado */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="guide-editor-status"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Estado
                </label>
                <select
                  id="guide-editor-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as GuideStatus)}
                  className="w-full px-3 py-2 text-sm bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary"
                >
                  <option value="Publicado">Publicado (Visible en portal)</option>
                  <option value="Borrador">Borrador (Interno)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Categoría */}
              <div>
                <label
                  htmlFor="guide-editor-category"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Categoría
                </label>
                <select
                  id="guide-editor-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary"
                >
                  <option value="Interoperabilidad">Interoperabilidad</option>
                  <option value="Diseño y UX">Diseño y UX</option>
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Seguridad">Seguridad</option>
                </select>
              </div>

              {/* Autor */}
              <div>
                <label
                  htmlFor="guide-editor-author"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Autor Emisor
                </label>
                <input
                  id="guide-editor-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Secretaría General"
                  className="w-full px-3 py-2 text-sm bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary"
                />
              </div>

              {/* Resumen */}
              <div>
                <label
                  htmlFor="guide-editor-summary"
                  className="block text-xs font-semibold text-text-main mb-1"
                >
                  Resumen Ejecutivo
                </label>
                <input
                  id="guide-editor-summary"
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Breve descripción del alcance..."
                  className="w-full px-3 py-2 text-sm bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary"
                />
              </div>
            </div>
          </div>

          {/* Barra de Herramientas Markdown y Alternador de Pestañas */}
          <div className="px-5 py-2.5 bg-bg-main border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
            {/* Toolbar Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => insertSnippet("# ")}
                title="Título H1"
                className="p-1.5 text-text-muted hover:text-text-main hover:bg-white rounded-btn border border-transparent hover:border-gray-300 transition-colors"
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertSnippet("## ")}
                title="Subtítulo H2"
                className="p-1.5 text-text-muted hover:text-text-main hover:bg-white rounded-btn border border-transparent hover:border-gray-300 transition-colors"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={() => insertSnippet("**", "**")}
                title="Negrita"
                className="p-1.5 text-text-muted hover:text-text-main hover:bg-white rounded-btn border border-transparent hover:border-gray-300 transition-colors"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertSnippet("*", "*")}
                title="Cursiva"
                className="p-1.5 text-text-muted hover:text-text-main hover:bg-white rounded-btn border border-transparent hover:border-gray-300 transition-colors"
              >
                <Italic className="w-4 h-4" />
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={() => insertSnippet("```\n", "\n```")}
                title="Bloque de código"
                className="p-1.5 text-text-muted hover:text-text-main hover:bg-white rounded-btn border border-transparent hover:border-gray-300 transition-colors"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertSnippet("- ")}
                title="Lista con viñetas"
                className="p-1.5 text-text-muted hover:text-text-main hover:bg-white rounded-btn border border-transparent hover:border-gray-300 transition-colors"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertSnippet("> ")}
                title="Cita"
                className="p-1.5 text-text-muted hover:text-text-main hover:bg-white rounded-btn border border-transparent hover:border-gray-300 transition-colors"
              >
                <Quote className="w-4 h-4" />
              </button>
            </div>

            {/* Pestañas Editor / Vista Previa */}
            <div className="inline-flex rounded-btn border border-gray-300 bg-white p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("editor")}
                className={`px-3 py-1 text-xs font-medium rounded-btn flex items-center gap-1.5 transition-colors ${
                  activeTab === "editor"
                    ? "bg-primary text-white"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editor Markdown</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 text-xs font-medium rounded-btn flex items-center gap-1.5 transition-colors ${
                  activeTab === "preview"
                    ? "bg-primary text-white"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Vista Previa</span>
              </button>
            </div>
          </div>

          {/* Área de Trabajo: Editor vs Preview */}
          <div className="flex-1 overflow-hidden p-5 bg-surface">
            {activeTab === "editor" ? (
              <textarea
                id="guide-markdown-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Escribe aquí el contenido en formato Markdown..."
                className="w-full h-full p-4 font-mono text-xs bg-bg-main border border-gray-300 rounded-btn text-text-main focus:outline-none focus:ring-2 focus:ring-tertiary resize-none leading-relaxed"
              />
            ) : (
              <div className="w-full h-full p-6 bg-bg-main border border-gray-300 rounded-btn overflow-y-auto font-body text-sm leading-relaxed text-text-main whitespace-pre-wrap font-mono">
                {content}
              </div>
            )}
          </div>

          {/* Pie del Editor con Acciones */}
          <div className="p-4 border-t border-gray-200 bg-bg-main flex items-center justify-between">
            <span className="text-[11px] text-text-muted">
              {content.length} caracteres • Formato Markdown
            </span>

            <div className="flex items-center gap-3">
              <ButtonBogota variant="outline" size="sm" type="button" onClick={onClose}>
                Cancelar
              </ButtonBogota>
              <ButtonBogota
                variant="primary"
                size="sm"
                type="submit"
                isLoading={saving}
                loadingText="Guardando en Firestore..."
                leftIcon={<Save className="w-4 h-4" aria-hidden="true" />}
              >
                {initialGuide ? "Actualizar Guía" : "Guardar en Firestore"}
              </ButtonBogota>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};
