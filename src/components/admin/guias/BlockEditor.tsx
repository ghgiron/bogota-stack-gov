"use client";

import type {
  AlertBlockContent,
  CodeBlockContent,
  ComponentBlockContent,
  ContentBlock,
  ContentBlockType,
  TextBlockContent,
} from "@/types/guide";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Bold,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Eye,
  FileCode2,
  Heading2,
  Heading3,
  HelpCircle,
  Info,
  Italic,
  Layers,
  LayoutGrid,
  List,
  ListOrdered,
  Plus,
  Quote,
  Sparkles,
  Terminal,
  Trash2,
  Type,
  X,
  XCircle,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

// Catálogo de componentes interactivos registrados en Bogotá Stack
export const REGISTERED_COMPONENTS = [
  {
    id: "stepper",
    name: "Stepper Transaccional (5 Pasos)",
    description:
      "Wizard de pasos progresivos con validación en caliente y guardado de estado Once-Only.",
    icon: Layers,
    badge: "Transaccional",
  },
  {
    id: "checklist",
    name: "Checklist de Verificación de Lenguaje Claro",
    description:
      "Auditoría en 6 criterios con medidor interactivo de índice de claridad distrital.",
    icon: CheckCircle2,
    badge: "UX Writing",
  },
  {
    id: "maturity-matrix",
    name: "Matriz de Madurez de Integración BID",
    description:
      "Tabla de evaluación de 4 niveles de madurez técnica, interoperabilidad y gobernanza.",
    icon: LayoutGrid,
    badge: "Gobernanza",
  },
  {
    id: "comparison",
    name: "Comparador Do's and Don'ts",
    description:
      "Grilla comparativa de malas vs buenas prácticas con justificación técnica y normativa.",
    icon: AlertTriangle,
    badge: "Estándar UI",
  },
  {
    id: "sandbox",
    name: "Consola Sandbox de Building Block",
    description:
      "Simulador interactivo con selector de entorno (Mock / QA), mTLS y consola de logs.",
    icon: Terminal,
    badge: "Ingeniería",
  },
  {
    id: "formula",
    name: "Calculadora de Fórmula IAI (Índice de Adopción)",
    description: "Evaluador cuantitativo de cumplimiento de los 8 principios del Kit UI Bogotá.",
    icon: Sparkles,
    badge: "Métricas",
  },
];

const CODE_LANGUAGES = [
  { value: "typescript", label: "TypeScript / TSX" },
  { value: "javascript", label: "JavaScript / JSX" },
  { value: "html", label: "HTML5" },
  { value: "bash", label: "Bash / Shell" },
  { value: "json", label: "JSON" },
  { value: "css", label: "CSS / Tailwind" },
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
  { value: "yaml", label: "YAML / OpenAPI" },
];

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ blocks, onChange }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Añadir un nuevo bloque al final
  const handleAddBlock = (type: ContentBlockType) => {
    const newId = `block-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    let initialContent: ContentBlock["content"] = {};

    switch (type) {
      case "texto":
        initialContent = {
          text: {
            html: "<p>Escribe aquí el contenido de esta sección. Puedes usar formato enriquecido, listas y encabezados.</p>",
          },
        };
        break;
      case "codigo":
        initialContent = {
          code: {
            language: "typescript",
            filename: "ejemplo.ts",
            code: '// Código de integración distrital\nimport { govClient } from "@bogota/gov-sdk";\n\nconst client = new govClient({\n  apiKey: process.env.BOGOTA_API_KEY,\n});',
          },
        };
        break;
      case "componente":
        initialContent = {
          component: {
            componentId: "stepper",
            componentName: "Stepper Transaccional (5 Pasos)",
            description: "Wizard de pasos progresivos con validación en caliente.",
          },
        };
        break;
      case "alerta":
        initialContent = {
          alert: {
            variant: "info",
            title: "Pauta Técnica Distrital",
            message:
              "Describe aquí una advertencia, recomendación o regla obligatoria para la entidad.",
          },
        };
        break;
    }

    const newBlock: ContentBlock = {
      id: newId,
      type,
      order: blocks.length + 1,
      content: initialContent,
    };

    onChange([...blocks, newBlock]);
  };

  // Eliminar un bloque
  const handleRemoveBlock = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id).map((b, idx) => ({ ...b, order: idx + 1 }));
    onChange(updated);
  };

  // Mover bloque hacia arriba
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index - 1];
    newBlocks[index - 1] = temp;
    onChange(newBlocks.map((b, idx) => ({ ...b, order: idx + 1 })));
  };

  // Mover bloque hacia abajo
  const handleMoveDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index + 1];
    newBlocks[index + 1] = temp;
    onChange(newBlocks.map((b, idx) => ({ ...b, order: idx + 1 })));
  };

  // Duplicar bloque
  const handleDuplicateBlock = (block: ContentBlock) => {
    const newId = `block-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const duplicate: ContentBlock = {
      ...block,
      id: newId,
      order: block.order + 1,
      content: JSON.parse(JSON.stringify(block.content)),
    };
    const newBlocks = [...blocks];
    const index = blocks.findIndex((b) => b.id === block.id);
    newBlocks.splice(index + 1, 0, duplicate);
    onChange(newBlocks.map((b, idx) => ({ ...b, order: idx + 1 })));
  };

  // Actualizar contenido de texto
  const handleUpdateText = (id: string, html: string) => {
    const updated = blocks.map((b) =>
      b.id === id ? { ...b, content: { ...b.content, text: { html } } } : b,
    );
    onChange(updated);
  };

  // Aplicar formato simple de WYSIWYG
  const applyTextFormat = (id: string, tagPrefix: string, tagSuffix: string) => {
    const block = blocks.find((b) => b.id === id);
    if (!block || !block.content.text) return;
    const current = block.content.text.html;
    handleUpdateText(id, `${current}\n${tagPrefix}Texto resaltado${tagSuffix}`);
  };

  // Actualizar código
  const handleUpdateCode = (id: string, updates: Partial<CodeBlockContent>) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        content: {
          ...b.content,
          code: {
            language: b.content.code?.language || "typescript",
            code: b.content.code?.code || "",
            filename: b.content.code?.filename || "",
            ...updates,
          },
        },
      };
    });
    onChange(updated);
  };

  // Actualizar componente
  const handleUpdateComponent = (id: string, componentId: string) => {
    const meta = REGISTERED_COMPONENTS.find((c) => c.id === componentId);
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        content: {
          ...b.content,
          component: {
            componentId,
            componentName: meta?.name || componentId,
            description: meta?.description || "",
          },
        },
      };
    });
    onChange(updated);
  };

  // Actualizar alerta
  const handleUpdateAlert = (id: string, updates: Partial<AlertBlockContent>) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        content: {
          ...b.content,
          alert: {
            variant: b.content.alert?.variant || "info",
            title: b.content.alert?.title || "",
            message: b.content.alert?.message || "",
            ...updates,
          },
        },
      };
    });
    onChange(updated);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Explicación y encabezado del Block Editor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-card bg-surface-container-low border border-gray-200">
        <div>
          <h4 className="font-heading font-bold text-sm text-text-main flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Editor Multibloque Modular
          </h4>
          <p className="text-xs text-text-muted mt-0.5">
            Estructura el cuerpo de la guía apilando bloques independientes de texto, código,
            componentes y alertas.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-text-main border border-gray-200 shadow-2xs">
            {blocks.length} {blocks.length === 1 ? "bloque" : "bloques"}
          </span>
        </div>
      </div>

      {/* Lista de Bloques */}
      {blocks.length === 0 ? (
        <div className="text-center py-12 px-6 border-2 border-dashed border-gray-300 rounded-card bg-white">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3">
            <Plus className="w-6 h-6" />
          </div>
          <h5 className="font-heading font-bold text-base text-text-main">
            La guía aún no tiene bloques de contenido
          </h5>
          <p className="text-xs text-text-muted max-w-md mx-auto mt-1 mb-6">
            Selecciona a continuación el tipo de bloque con el que deseas comenzar la redacción de
            este lineamiento distrital.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleAddBlock("texto")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-bold text-text-main shadow-2xs transition-colors"
            >
              <Type className="w-4 h-4 text-primary" />
              <span>+ Bloque Texto</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock("codigo")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-bold text-text-main shadow-2xs transition-colors"
            >
              <Code2 className="w-4 h-4 text-tertiary" />
              <span>+ Bloque Código</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock("componente")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-bold text-text-main shadow-2xs transition-colors"
            >
              <Layers className="w-4 h-4 text-purple-600" />
              <span>+ Componente UI</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock("alerta")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-bold text-text-main shadow-2xs transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-secondary" />
              <span>+ Alerta / Tip</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => {
            const isFirst = index === 0;
            const isLast = index === blocks.length - 1;

            return (
              <div
                key={block.id}
                className="bg-white rounded-card border border-gray-200 shadow-2xs overflow-hidden transition-all hover:border-gray-300"
              >
                {/* Barra de cabecera del bloque */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 text-[11px] font-bold font-mono flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider">
                      {block.type === "texto" && (
                        <>
                          <Type className="w-3.5 h-3.5 text-primary" />
                          <span className="text-primary">Bloque de Texto / WYSIWYG</span>
                        </>
                      )}
                      {block.type === "codigo" && (
                        <>
                          <Code2 className="w-3.5 h-3.5 text-tertiary" />
                          <span className="text-tertiary">Bloque de Código / Snippet</span>
                        </>
                      )}
                      {block.type === "componente" && (
                        <>
                          <Layers className="w-3.5 h-3.5 text-purple-600" />
                          <span className="text-purple-600">Componente Interactivo UI</span>
                        </>
                      )}
                      {block.type === "alerta" && (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-amber-600">Alerta / Regla de Negocio</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Acciones del Bloque */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => handleMoveUp(index)}
                      title="Mover arriba"
                      aria-label="Mover bloque hacia arriba"
                      className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => handleMoveDown(index)}
                      title="Mover abajo"
                      aria-label="Mover bloque hacia abajo"
                      className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateBlock(block)}
                      title="Duplicar bloque"
                      aria-label="Duplicar bloque"
                      className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlock(block.id)}
                      title="Eliminar bloque"
                      aria-label="Eliminar bloque"
                      className="p-1.5 rounded hover:bg-red-50 text-red-600 transition-colors ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Contenido según el tipo de bloque */}
                <div className="p-4 sm:p-5">
                  {/* TIPO 1: TEXTO WYSIWYG */}
                  {block.type === "texto" && (
                    <div className="space-y-3">
                      {/* Barra de herramientas WYSIWYG */}
                      <div className="flex flex-wrap items-center gap-1 p-1.5 bg-gray-100 rounded-md border border-gray-200">
                        <button
                          type="button"
                          onClick={() => applyTextFormat(block.id, "<strong>", "</strong>")}
                          title="Negrita"
                          className="p-1.5 rounded hover:bg-white text-gray-700 text-xs font-bold transition-colors"
                        >
                          <Bold className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat(block.id, "<em>", "</em>")}
                          title="Cursiva"
                          className="p-1.5 rounded hover:bg-white text-gray-700 text-xs italic transition-colors"
                        >
                          <Italic className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-px h-4 bg-gray-300 mx-1" />
                        <button
                          type="button"
                          onClick={() => applyTextFormat(block.id, "<h2>", "</h2>")}
                          title="Encabezado H2"
                          className="px-2 py-1 rounded hover:bg-white text-gray-700 text-xs font-bold transition-colors"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat(block.id, "<h3>", "</h3>")}
                          title="Encabezado H3"
                          className="px-2 py-1 rounded hover:bg-white text-gray-700 text-xs font-bold transition-colors"
                        >
                          H3
                        </button>
                        <div className="w-px h-4 bg-gray-300 mx-1" />
                        <button
                          type="button"
                          onClick={() => applyTextFormat(block.id, "<ul>\n  <li>", "</li>\n</ul>")}
                          title="Lista con viñetas"
                          className="p-1.5 rounded hover:bg-white text-gray-700 text-xs transition-colors"
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat(block.id, "<blockquote>", "</blockquote>")}
                          title="Cita"
                          className="p-1.5 rounded hover:bg-white text-gray-700 text-xs transition-colors"
                        >
                          <Quote className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            applyTextFormat(block.id, '<a href="https://bogota.gov.co">', "</a>")
                          }
                          title="Enlace"
                          className="px-2 py-1 rounded hover:bg-white text-gray-700 text-xs font-semibold transition-colors"
                        >
                          Enlace
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={`text-input-${block.id}`}
                            className="block text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1"
                          >
                            Editor HTML / Markdown
                          </label>
                          <textarea
                            id={`text-input-${block.id}`}
                            rows={6}
                            value={block.content.text?.html || ""}
                            onChange={(e) => handleUpdateText(block.id, e.target.value)}
                            placeholder="Redacta el contenido en lenguaje claro..."
                            className="w-full p-3 text-xs sm:text-sm font-mono rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35] transition-all resize-y"
                          />
                        </div>
                        <div>
                          <span className="block text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">
                            Previsualización Renderizada
                          </span>
                          <div
                            className="w-full h-[152px] p-3 text-xs sm:text-sm rounded-md border border-gray-200 bg-gray-50/60 overflow-y-auto prose prose-sm max-w-none"
                            // biome-ignore lint/security/noDangerouslySetInnerHtml: Previsualización controlada de texto enriquecido en backoffice
                            dangerouslySetInnerHTML={{
                              __html: block.content.text?.html || "<em>Sin contenido</em>",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TIPO 2: CÓDIGO */}
                  {block.type === "codigo" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={`code-lang-${block.id}`}
                            className="block text-xs font-semibold text-text-main mb-1"
                          >
                            Lenguaje de Programación
                          </label>
                          <select
                            id={`code-lang-${block.id}`}
                            value={block.content.code?.language || "typescript"}
                            onChange={(e) =>
                              handleUpdateCode(block.id, { language: e.target.value })
                            }
                            className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                          >
                            {CODE_LANGUAGES.map((lang) => (
                              <option key={lang.value} value={lang.value}>
                                {lang.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor={`code-file-${block.id}`}
                            className="block text-xs font-semibold text-text-main mb-1"
                          >
                            Nombre de archivo o ruta (Opcional)
                          </label>
                          <div className="relative">
                            <FileCode2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              id={`code-file-${block.id}`}
                              type="text"
                              value={block.content.code?.filename || ""}
                              onChange={(e) =>
                                handleUpdateCode(block.id, { filename: e.target.value })
                              }
                              placeholder="ej. src/lib/api-client.ts"
                              className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label
                            htmlFor={`code-editor-${block.id}`}
                            className="text-xs font-semibold text-text-main"
                          >
                            Snippet de Código
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(block.id, block.content.code?.code || "")
                            }
                            className="text-[11px] font-semibold text-tertiary hover:underline inline-flex items-center gap-1"
                          >
                            {copiedId === block.id ? (
                              <>
                                <Check className="w-3 h-3 text-green-600" />
                                <span className="text-green-600">¡Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                        <textarea
                          id={`code-editor-${block.id}`}
                          rows={6}
                          value={block.content.code?.code || ""}
                          onChange={(e) => handleUpdateCode(block.id, { code: e.target.value })}
                          placeholder="// Pega o escribe aquí el código técnico..."
                          className="w-full p-3 text-xs font-mono rounded-md border border-[#2A2D34] bg-[#1E1E24] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35] resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {/* TIPO 3: COMPONENTE UI */}
                  {block.type === "componente" && (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor={`component-select-${block.id}`}
                          className="block text-xs font-semibold text-text-main mb-1"
                        >
                          Seleccionar Componente Registrado en Bogotá Stack
                        </label>
                        <select
                          id={`component-select-${block.id}`}
                          value={block.content.component?.componentId || "stepper"}
                          onChange={(e) => handleUpdateComponent(block.id, e.target.value)}
                          className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main font-semibold focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                        >
                          {REGISTERED_COMPONENTS.map((comp) => (
                            <option key={comp.id} value={comp.id}>
                              {comp.name} [{comp.badge}]
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tarjeta de previsualización del componente seleccionado */}
                      {(() => {
                        const selectedComp = REGISTERED_COMPONENTS.find(
                          (c) => c.id === (block.content.component?.componentId || "stepper"),
                        );
                        if (!selectedComp) return null;
                        const CompIcon = selectedComp.icon;

                        return (
                          <div className="p-4 rounded-card bg-purple-50/50 border border-purple-200 flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-[8px] bg-purple-600 text-white flex items-center justify-center shrink-0">
                              <CompIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h5 className="font-heading font-bold text-sm text-text-main">
                                  {selectedComp.name}
                                </h5>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-800">
                                  {selectedComp.badge}
                                </span>
                              </div>
                              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                                {selectedComp.description}
                              </p>
                              <div className="mt-2 text-[11px] text-purple-700 font-mono font-medium">
                                Identificador de inyección:{" "}
                                <code>&lt;Component id=&quot;{selectedComp.id}&quot; /&gt;</code>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TIPO 4: ALERTA / TIP */}
                  {block.type === "alerta" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label
                            htmlFor={`alert-type-${block.id}`}
                            className="block text-xs font-semibold text-text-main mb-1"
                          >
                            Tipo de Alerta
                          </label>
                          <select
                            id={`alert-type-${block.id}`}
                            value={block.content.alert?.variant || "info"}
                            onChange={(e) =>
                              handleUpdateAlert(block.id, {
                                variant: e.target.value as AlertBlockContent["variant"],
                              })
                            }
                            className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                          >
                            <option value="info">Información (Azul)</option>
                            <option value="warning">Advertencia (Amarillo)</option>
                            <option value="success">Éxito / Aprobado (Verde)</option>
                            <option value="error">Crítico / Error (Rojo)</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor={`alert-title-${block.id}`}
                            className="block text-xs font-semibold text-text-main mb-1"
                          >
                            Título del Bloque de Alerta
                          </label>
                          <input
                            id={`alert-title-${block.id}`}
                            type="text"
                            value={block.content.alert?.title || ""}
                            onChange={(e) => handleUpdateAlert(block.id, { title: e.target.value })}
                            placeholder="ej. Requisito Mandatorio para Entidades"
                            className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`alert-msg-${block.id}`}
                          className="block text-xs font-semibold text-text-main mb-1"
                        >
                          Mensaje / Explicación
                        </label>
                        <textarea
                          id={`alert-msg-${block.id}`}
                          rows={3}
                          value={block.content.alert?.message || ""}
                          onChange={(e) => handleUpdateAlert(block.id, { message: e.target.value })}
                          placeholder="Describe claramente la pauta o consecuencia..."
                          className="w-full p-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35] resize-y"
                        />
                      </div>

                      {/* Preview en vivo de la alerta */}
                      {(() => {
                        const variant = block.content.alert?.variant || "info";
                        let bgClass = "bg-blue-50 border-blue-200 text-blue-900";
                        let IconAlert = Info;
                        if (variant === "warning") {
                          bgClass = "bg-amber-50 border-amber-200 text-amber-900";
                          IconAlert = AlertTriangle;
                        } else if (variant === "success") {
                          bgClass = "bg-green-50 border-green-200 text-green-900";
                          IconAlert = CheckCircle2;
                        } else if (variant === "error") {
                          bgClass = "bg-red-50 border-red-200 text-red-900";
                          IconAlert = XCircle;
                        }

                        return (
                          <div
                            className={`p-4 rounded-md border ${bgClass} flex items-start gap-3 mt-2`}
                          >
                            <IconAlert className="w-5 h-5 shrink-0 mt-0.5" />
                            <div className="text-xs sm:text-sm">
                              {block.content.alert?.title && (
                                <span className="font-heading font-bold block mb-0.5">
                                  {block.content.alert.title}
                                </span>
                              )}
                              <p className="leading-relaxed font-body">
                                {block.content.alert?.message || "Mensaje de alerta..."}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Botonera para agregar nuevos bloques */}
      <div className="p-4 rounded-card bg-surface-container-low border border-dashed border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-heading font-bold text-text-muted">
          Añadir nuevo bloque de contenido:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleAddBlock("texto")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-semibold text-text-main shadow-2xs transition-colors"
          >
            <Type className="w-3.5 h-3.5 text-primary" />
            <span>+ Texto WYSIWYG</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddBlock("codigo")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-semibold text-text-main shadow-2xs transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-tertiary" />
            <span>+ Código</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddBlock("componente")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-semibold text-text-main shadow-2xs transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>+ Componente UI</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddBlock("alerta")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-semibold text-text-main shadow-2xs transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>+ Alerta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
