"use client";

import type {
  AlertBlockContent,
  CodeBlockContent,
  ComponentBlockContent,
  ContentBlock,
  ContentBlockType,
  DiagramBlockContent,
  DiagramType,
  MatrixBlockContent,
  MatrixColumn,
  MatrixRow,
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
  KeyRound,
  Layers,
  LayoutGrid,
  List,
  ListOrdered,
  Network,
  Plus,
  Quote,
  Smartphone,
  Sparkles,
  Table,
  Terminal,
  Trash2,
  Type,
  Workflow,
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
  {
    id: "bwallet-oid4vci-simulator",
    name: "Simulador Dual: Emisión OID4VCI (Portal / Sisbén) + BWallet Móvil [Identidad]",
    description:
      "Simulador interactivo de emisión W3C de Credenciales Verificables y sincronización con BWallet.",
    icon: Smartphone,
    badge: "Identidad",
  },
  {
    id: "kyc-4steps-wizard",
    name: "Wizard Interactivo: Enrolamiento Biométrico KYC (4 Pasos) [Identidad]",
    description:
      "Flujo interactivo de captura documental, OCR Azure, prueba de vida y validación ANI.",
    icon: CheckCircle2,
    badge: "Identidad",
  },
  {
    id: "auth-paradigm-comparator",
    name: "Comparador Arquitectónico: Autenticación Federada vs. Descentralizada [Identidad]",
    description:
      "Matriz interactiva de separación de responsabilidades entre Keycloak SSO y BWallet W3C.",
    icon: KeyRound,
    badge: "Identidad",
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
      case "diagram":
      case "diagrama":
        initialContent = {
          diagram: {
            type: "c4",
            title: "Arquitectura C4: Contexto de Identidad y Acceso Distrital",
            boundaryDescription:
              "Frontera segura entre bb-identity-access, Keycloak y Autenticador Walt.id",
            code: `graph TB
  subgraph Ciudadania["La Ciudadanía"]
    User["Persona Titular (BWallet Móvil)"]
  end
  subgraph Distrito["Ecosistema Distrital de Bogotá"]
    BB["bb-identity-access (Autoridad de Ciclo de Vida)"]
    IdP["Keycloak IdP (OIDC + PKCE S256)"]
    Issuer["Autenticador / Walt.id Issuer"]
  end
  User -->|OID4VP Presentación| IdP
  User -->|OID4VCI Oferta de Credencial| Issuer
  BB -->|Autoriza Emisión| Issuer`,
          },
        };
        break;
      case "matrix":
      case "matriz":
        initialContent = {
          matrix: {
            title: "Matriz de Tratamiento de Datos y Retención (GovStack §6.8)",
            description:
              "Clasificación de PII y políticas de retención con criterio Once-Only para la ciudadanía",
            columns: [
              { key: "campo", label: "Dato / Atributo" },
              { key: "categoria", label: "Clasificación PII" },
              { key: "almacenamiento", label: "Almacenamiento Permanente" },
              { key: "retencion", label: "Retención / Ciclo de Vida" },
            ],
            rows: [
              {
                id: "row-1",
                cells: {
                  campo: "Imágenes de Cédula (Frente / Dorso)",
                  categoria: "Biometría / Documental Crítica",
                  almacenamiento: "❌ No (CosmosDB Efímero con TTL)",
                  retencion: "Purga automática al finalizar sesión KYC (evento KycAssetsPurged)",
                },
                status: "error",
              },
              {
                id: "row-2",
                cells: {
                  campo: "Selfie Facial en Vivo",
                  categoria: "Biométrica",
                  almacenamiento: "❌ No",
                  retencion: "En memoria durante Face Verify (sin retención en Azure)",
                },
                status: "error",
              },
              {
                id: "row-3",
                cells: {
                  campo: "identityHash (Seudonimizado)",
                  categoria: "Identificador Seudónimo",
                  almacenamiento: "✅ Sí (PostgreSQL bb-identity-access)",
                  retencion: "Persistencia para ciclo de vida y revocación",
                },
                status: "success",
              },
            ],
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

  // Actualizar diagrama
  const handleUpdateDiagram = (id: string, updates: Partial<DiagramBlockContent>) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        content: {
          ...b.content,
          diagram: {
            type: b.content.diagram?.type || "c4",
            title: b.content.diagram?.title || "",
            boundaryDescription: b.content.diagram?.boundaryDescription || "",
            code: b.content.diagram?.code || "",
            ...updates,
          },
        },
      };
    });
    onChange(updated);
  };

  // Actualizar matriz / tabla técnica
  const handleUpdateMatrix = (id: string, updates: Partial<MatrixBlockContent>) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        content: {
          ...b.content,
          matrix: {
            title: b.content.matrix?.title || "",
            description: b.content.matrix?.description || "",
            columns: b.content.matrix?.columns || [],
            rows: b.content.matrix?.rows || [],
            ...updates,
          },
        },
      };
    });
    onChange(updated);
  };

  // Helper para añadir fila a una matriz
  const handleAddMatrixRow = (blockId: string) => {
    const block = blocks.find((b) => b.id === blockId);
    if (!block || !block.content.matrix) return;
    const currentCols = block.content.matrix.columns;
    const currentRows = block.content.matrix.rows;
    const newCells: Record<string, string> = {};
    currentCols.forEach((col) => {
      newCells[col.key] = "Nuevo dato";
    });
    const newRow: MatrixRow = {
      id: `row-${Date.now()}`,
      cells: newCells,
      status: "neutral",
    };
    handleUpdateMatrix(blockId, { rows: [...currentRows, newRow] });
  };

  // Helper para eliminar fila de una matriz
  const handleRemoveMatrixRow = (blockId: string, rowId: string) => {
    const block = blocks.find((b) => b.id === blockId);
    if (!block || !block.content.matrix) return;
    const filtered = block.content.matrix.rows.filter((r) => r.id !== rowId);
    handleUpdateMatrix(blockId, { rows: filtered });
  };

  // Helper para actualizar celda de una fila
  const handleUpdateMatrixCell = (
    blockId: string,
    rowId: string,
    columnKey: string,
    value: string,
  ) => {
    const block = blocks.find((b) => b.id === blockId);
    if (!block || !block.content.matrix) return;
    const rows = block.content.matrix.rows.map((r) => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        cells: { ...r.cells, [columnKey]: value },
      };
    });
    handleUpdateMatrix(blockId, { rows });
  };

  // Helper para cambiar status de una fila
  const handleUpdateMatrixRowStatus = (
    blockId: string,
    rowId: string,
    status: MatrixRow["status"],
  ) => {
    const block = blocks.find((b) => b.id === blockId);
    if (!block || !block.content.matrix) return;
    const rows = block.content.matrix.rows.map((r) => {
      if (r.id !== rowId) return r;
      return { ...r, status };
    });
    handleUpdateMatrix(blockId, { rows });
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
            <button
              type="button"
              onClick={() => handleAddBlock("diagram")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-bold text-text-main shadow-2xs transition-colors"
            >
              <Network className="w-4 h-4 text-blue-600" />
              <span>+ Diagrama / Arquitectura</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock("matrix")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-bold text-text-main shadow-2xs transition-colors"
            >
              <Table className="w-4 h-4 text-emerald-600" />
              <span>+ Matriz / Tabla Técnica</span>
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
                      {(block.type === "diagram" || block.type === "diagrama") && (
                        <>
                          <Network className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-blue-600">Diagrama / Arquitectura GovStack</span>
                        </>
                      )}
                      {(block.type === "matrix" || block.type === "matriz") && (
                        <>
                          <Table className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Matriz / Tabla Técnica Estructurada</span>
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

                  {/* TIPO 5: DIAGRAMA / ARQUITECTURA */}
                  {(block.type === "diagram" || block.type === "diagrama") && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label
                            htmlFor={`diag-type-${block.id}`}
                            className="block text-xs font-semibold text-text-main mb-1"
                          >
                            Tipo de Diagrama
                          </label>
                          <select
                            id={`diag-type-${block.id}`}
                            value={block.content.diagram?.type || "c4"}
                            onChange={(e) =>
                              handleUpdateDiagram(block.id, {
                                type: e.target.value as DiagramType,
                              })
                            }
                            className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                          >
                            <option value="c4">C4 Contexto / Contenedores</option>
                            <option value="sequence">Diagrama de Secuencia</option>
                            <option value="governance">Flujo de Gobernanza y Ciclo de Vida</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor={`diag-title-${block.id}`}
                            className="block text-xs font-semibold text-text-main mb-1"
                          >
                            Título del Diagrama Arquitectónico
                          </label>
                          <input
                            id={`diag-title-${block.id}`}
                            type="text"
                            value={block.content.diagram?.title || ""}
                            onChange={(e) =>
                              handleUpdateDiagram(block.id, { title: e.target.value })
                            }
                            placeholder="ej. Mapa de Contextos y Frontera de Autenticación"
                            className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`diag-boundary-${block.id}`}
                          className="block text-xs font-semibold text-text-main mb-1"
                        >
                          Descripción de Frontera y Bounded Context
                        </label>
                        <input
                          id={`diag-boundary-${block.id}`}
                          type="text"
                          value={block.content.diagram?.boundaryDescription || ""}
                          onChange={(e) =>
                            handleUpdateDiagram(block.id, { boundaryDescription: e.target.value })
                          }
                          placeholder="ej. Frontera entre bb-identity-access, Keycloak y Autenticador Walt.id"
                          className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label
                            htmlFor={`diag-code-${block.id}`}
                            className="text-xs font-semibold text-text-main"
                          >
                            Código Fuente (Mermaid / SVG estructurado)
                          </label>
                          <span className="text-[11px] text-text-muted">
                            Sintaxis Mermaid: graph TB, sequenceDiagram o stateDiagram
                          </span>
                        </div>
                        <textarea
                          id={`diag-code-${block.id}`}
                          rows={6}
                          value={block.content.diagram?.code || ""}
                          onChange={(e) =>
                            handleUpdateDiagram(block.id, { code: e.target.value })
                          }
                          placeholder="graph TB&#10;  A[bb-identity-access] -->|Autorización| B[Walt.id Issuer]..."
                          className="w-full p-3 font-mono text-xs rounded-md border border-gray-300 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35] resize-y"
                        />
                      </div>

                      {/* Live Preview del Diagrama */}
                      <div className="p-4 rounded-card bg-surface-container-low border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                              Vista Previa: {block.content.diagram?.type || "c4"}
                            </span>
                            <span className="font-heading font-bold text-xs text-text-main">
                              {block.content.diagram?.title || "Diagrama de Arquitectura"}
                            </span>
                          </div>
                          {block.content.diagram?.boundaryDescription && (
                            <span className="text-[11px] text-blue-700 font-medium">
                              Frontera: {block.content.diagram.boundaryDescription}
                            </span>
                          )}
                        </div>
                        <div className="p-4 rounded-md bg-white border border-gray-200 font-mono text-xs overflow-x-auto">
                          <pre className="text-gray-800 whitespace-pre-wrap">
                            {block.content.diagram?.code || "// Código de diagrama vacío"}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TIPO 6: MATRIZ / TABLA TÉCNICA */}
                  {(block.type === "matrix" || block.type === "matriz") && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={`matrix-title-${block.id}`}
                            className="block text-xs font-semibold text-text-main mb-1"
                          >
                            Título de la Matriz / Tabla
                          </label>
                          <input
                            id={`matrix-title-${block.id}`}
                            type="text"
                            value={block.content.matrix?.title || ""}
                            onChange={(e) =>
                              handleUpdateMatrix(block.id, { title: e.target.value })
                            }
                            placeholder="ej. Matriz de Tratamiento de Datos y Retención"
                            className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`matrix-desc-${block.id}`}
                            className="block text-xs font-semibold text-text-main mb-1"
                          >
                            Descripción / Criterio Normativo
                          </label>
                          <input
                            id={`matrix-desc-${block.id}`}
                            type="text"
                            value={block.content.matrix?.description || ""}
                            onChange={(e) =>
                              handleUpdateMatrix(block.id, { description: e.target.value })
                            }
                            placeholder="ej. GovStack Identity §6.8 / Ley 1581 de 2012"
                            className="w-full h-10 px-3 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-[#CC0E35] focus:border-[#CC0E35]"
                          />
                        </div>
                      </div>

                      {/* Filas de la matriz */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-text-main">
                            Filas Registradas ({block.content.matrix?.rows?.length || 0})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddMatrixRow(block.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-heading font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-300 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Añadir Fila</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {block.content.matrix?.rows?.map((row, rIdx) => (
                            <div
                              key={row.id || rIdx}
                              className="p-3 rounded-md bg-gray-50 border border-gray-200 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                  Fila {rIdx + 1}
                                </span>
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor={`row-status-${block.id}-${row.id}`}
                                    className="text-[11px] font-medium text-text-muted"
                                  >
                                    Estado:
                                  </label>
                                  <select
                                    id={`row-status-${block.id}-${row.id}`}
                                    value={row.status || "neutral"}
                                    onChange={(e) =>
                                      handleUpdateMatrixRowStatus(
                                        block.id,
                                        row.id,
                                        e.target.value as MatrixRow["status"],
                                      )
                                    }
                                    className="h-7 px-2 text-xs rounded border border-gray-300 bg-white"
                                  >
                                    <option value="success">✅ Conforme / Permitido / Sí</option>
                                    <option value="error">❌ No / Prohibido / Crítico</option>
                                    <option value="warning">⚠️ Precaución / Condicional</option>
                                    <option value="neutral">⚪ Neutro / N/A</option>
                                  </select>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveMatrixRow(block.id, row.id)}
                                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                    title="Eliminar fila"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                                {block.content.matrix?.columns?.map((col) => (
                                  <div key={col.key}>
                                    <label
                                      htmlFor={`cell-${block.id}-${row.id}-${col.key}`}
                                      className="block text-[10px] font-medium text-gray-500 mb-0.5"
                                    >
                                      {col.label}
                                    </label>
                                    <input
                                      id={`cell-${block.id}-${row.id}-${col.key}`}
                                      type="text"
                                      value={row.cells[col.key] || ""}
                                      onChange={(e) =>
                                        handleUpdateMatrixCell(
                                          block.id,
                                          row.id,
                                          col.key,
                                          e.target.value,
                                        )
                                      }
                                      className="w-full h-8 px-2 text-xs rounded border border-gray-300 bg-white"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Live Preview de la Matriz */}
                      <div className="p-4 rounded-card bg-surface-container-low border border-emerald-200">
                        <div className="mb-2">
                          <h6 className="font-heading font-bold text-xs text-emerald-900">
                            Vista Previa: {block.content.matrix?.title || "Matriz Técnica"}
                          </h6>
                          {block.content.matrix?.description && (
                            <p className="text-[11px] text-text-muted">
                              {block.content.matrix.description}
                            </p>
                          )}
                        </div>
                        <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50 border-b border-gray-200 font-heading font-bold text-gray-700">
                              <tr>
                                {block.content.matrix?.columns?.map((col) => (
                                  <th key={col.key} className="px-3 py-2">
                                    {col.label}
                                  </th>
                                ))}
                                <th className="px-3 py-2 text-right">Estado</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {block.content.matrix?.rows?.map((row, rIdx) => (
                                <tr key={row.id || rIdx} className="hover:bg-gray-50/50">
                                  {block.content.matrix?.columns?.map((col) => (
                                    <td key={col.key} className="px-3 py-2 text-text-main">
                                      {row.cells[col.key] || "—"}
                                    </td>
                                  ))}
                                  <td className="px-3 py-2 text-right">
                                    {row.status === "success" && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-emerald-50 text-emerald-700 font-medium text-[11px]">
                                        <Check className="w-3 h-3" /> Conforme
                                      </span>
                                    )}
                                    {row.status === "error" && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-red-50 text-red-700 font-medium text-[11px]">
                                        <X className="w-3 h-3" /> Restringido
                                      </span>
                                    )}
                                    {row.status === "warning" && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-amber-50 text-amber-700 font-medium text-[11px]">
                                        <AlertTriangle className="w-3 h-3" /> Condicional
                                      </span>
                                    )}
                                    {(!row.status || row.status === "neutral") && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-gray-100 text-gray-600 font-medium text-[11px]">
                                        N/A
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
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
          <button
            type="button"
            onClick={() => handleAddBlock("diagram")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-semibold text-text-main shadow-2xs transition-colors"
          >
            <Network className="w-3.5 h-3.5 text-blue-600" />
            <span>+ Diagrama / Arquitectura</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddBlock("matrix")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-semibold text-text-main shadow-2xs transition-colors"
          >
            <Table className="w-3.5 h-3.5 text-emerald-600" />
            <span>+ Matriz / Tabla Técnica</span>
          </button>
        </div>
      </div>
    </div>
  );
};
