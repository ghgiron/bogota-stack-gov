/**
 * Tipos y modelos de datos para el CMS de Guías de Vinculación
 * Ecosistema Bogotá Stack - Secretaría General
 */

export type GuideStatus = "Borrador" | "Revisión" | "Publicado";

export type AudienceType = "UX / UI" | "Ingeniería" | "Directivo";

export type ContentBlockType = "texto" | "codigo" | "componente" | "alerta";

export interface TextBlockContent {
  html: string;
}

export interface CodeBlockContent {
  language: string;
  code: string;
  filename?: string;
}

export interface ComponentBlockContent {
  componentId: string;
  componentName: string;
  description?: string;
  props?: Record<string, unknown>;
}

export interface AlertBlockContent {
  variant: "info" | "warning" | "success" | "error";
  title?: string;
  message: string;
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  order: number;
  content: {
    text?: TextBlockContent;
    code?: CodeBlockContent;
    component?: ComponentBlockContent;
    alert?: AlertBlockContent;
  };
}

export interface GuiaVinculacion {
  id?: string;
  numeroIdentificador: string;
  titulo: string;
  slug: string;
  resumenEjecutivo: string;
  estado: GuideStatus;
  categoriaPrincipal: string;
  audiencias: string[];
  // Atributos Técnicos
  nivelAccesibilidad: string;
  // Bloques de Contenido (JSON estructurado)
  bloquesContenido: ContentBlock[];
  ultimaModificacion: string;

  // Propiedades opcionales de compatibilidad para interoperabilidad de componentes existentes
  number?: string;
  title?: string;
  summary?: string;
  category?: string;
  status?: GuideStatus;
  audiences?: AudienceType[];
  accessibilityLevel?: string;
  badges?: string[];
  blocks?: ContentBlock[];
  repoUrl?: string;
  relatedGuides?: string[];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Función normalizadora que garantiza la coherencia bidireccional entre la interfaz
 * estricta en español (GuiaVinculacion) y los aliases heredados de vistas previas.
 */
export function normalizeGuia(
  raw: Partial<GuiaVinculacion> | Record<string, unknown>,
): GuiaVinculacion {
  const r = (raw || {}) as Record<string, unknown>;
  const numeroIdentificador = (r.numeroIdentificador as string) || (r.number as string) || "1.X";
  const titulo = (r.titulo as string) || (r.title as string) || "Nueva Guía";
  const slug =
    (r.slug as string) ||
    titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") ||
    "guia-sin-slug";
  const resumenEjecutivo = (r.resumenEjecutivo as string) || (r.summary as string) || "";
  const estado: GuideStatus = (r.estado as GuideStatus) || (r.status as GuideStatus) || "Borrador";
  const categoriaPrincipal =
    (r.categoriaPrincipal as string) || (r.category as string) || "General";
  const audiencias: string[] = (r.audiencias as string[]) ||
    (r.audiences as string[]) || ["UX / UI"];
  const nivelAccesibilidad =
    (r.nivelAccesibilidad as string) || (r.accessibilityLevel as string) || "WCAG 2.2 AA";
  const bloquesContenido: ContentBlock[] =
    (r.bloquesContenido as ContentBlock[]) || (r.blocks as ContentBlock[]) || [];
  const now = new Date().toISOString();
  const ultimaModificacion = (r.ultimaModificacion as string) || (r.updatedAt as string) || now;

  return {
    id: r.id as string | undefined,
    numeroIdentificador,
    titulo,
    slug,
    resumenEjecutivo,
    estado,
    categoriaPrincipal,
    audiencias,
    nivelAccesibilidad,
    bloquesContenido,
    ultimaModificacion,

    // Aliases para máxima compatibilidad
    number: numeroIdentificador,
    title: titulo,
    summary: resumenEjecutivo,
    status: estado,
    category: categoriaPrincipal,
    audiences: audiencias as AudienceType[],
    accessibilityLevel: nivelAccesibilidad,
    badges: (r.badges as string[]) || [categoriaPrincipal],
    blocks: bloquesContenido,
    repoUrl: (r.repoUrl as string) || "",
    relatedGuides: (r.relatedGuides as string[]) || [],
    author: (r.author as string) || "Secretaría General - Dirección Distrital de TIC",
    createdAt: (r.createdAt as string) || now,
    updatedAt: ultimaModificacion,
  };
}

/**
 * Modelo de compatibilidad con repositorios heredados y APIs existentes
 */
export interface Guide {
  id: string;
  title: string;
  content: string; // Formato Markdown
  status: GuideStatus;
  updatedAt: string; // Fecha ISO
  createdAt: string; // Fecha ISO
  slug?: string;
  category?: string;
  author?: string;
  summary?: string;
  number?: string;
  audiences?: AudienceType[];
  accessibilityLevel?: string;
  badges?: string[];
  blocks?: ContentBlock[];
  repoUrl?: string;
  relatedGuides?: string[];
}

export type CreateGuideDTO = Omit<Guide, "id" | "updatedAt" | "createdAt"> & {
  slug?: string;
  category?: string;
  author?: string;
  summary?: string;
  number?: string;
  audiences?: AudienceType[];
  blocks?: ContentBlock[];
};

export type UpdateGuideDTO = Partial<CreateGuideDTO> & {
  status?: GuideStatus;
};

export interface GuideFilter {
  status?: GuideStatus | string;
  category?: string;
  search?: string;
  audience?: string;
}
