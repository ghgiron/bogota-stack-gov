import type { CreateGuideDTO, Guide, GuideFilter, UpdateGuideDTO } from "@/types/guide";
import type { IGuidesRepository } from "./dbService";

const INITIAL_GUIDES: Guide[] = [
  {
    id: "guia-carpeta-ciudadana",
    title: "Guía de Integración a la Carpeta Ciudadana Distrital",
    slug: "integracion-carpeta-ciudadana",
    summary:
      "Lineamientos técnicos y de autenticación para vincular trámites de entidades a la Carpeta Ciudadana de Bogotá.",
    content: `# Guía de Integración a la Carpeta Ciudadana Distrital

## 1. Propósito
Establecer los estándares de intercambio de información entre los sistemas misionales de las entidades distritales y la **Carpeta Ciudadana de Bogotá**, garantizando el principio *Once-Only*.

## 2. Requisitos Previos
1. Certificado digital emitido por entidad acreditada.
2. Homologación de esquemas de datos distritales.
3. Validación de políticas de privacidad de la Secretaría General.

## 3. Arquitectura de Integración
Las entidades deben exponer APIs REST seguras bajo el protocolo OAuth2 / OpenID Connect distrital.

\`\`\`bash
POST /api/v1/tramites/notificaciones
Content-Type: application/json
Authorization: Bearer <token_distrital>
\`\`\`

## 4. Políticas de Seguridad
- Cifrado en tránsito TLS 1.3 estricto.
- Firma de payloads con certificados de servidor.
`,
    status: "Publicado",
    category: "Interoperabilidad",
    author: "Dirección Distrital de TIC",
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-15T14:30:00.000Z",
  },
  {
    id: "guia-wcag-distrital",
    title: "Estándar de Accesibilidad Web WCAG 2.2 AA para Entidades",
    slug: "estandar-accesibilidad-wcag-2-2",
    summary:
      "Manual de implementación de componentes accesibles, contraste cromático y navegación por teclado en portales públicos.",
    content: `# Estándar de Accesibilidad Web WCAG 2.2 AA

## 1. Alcance
Aplica a todos los sitios web, formularios y aplicaciones móviles desarrolladas por o para la Alcaldía Mayor de Bogotá.

## 2. Puntos Críticos de Cumplimiento
- **Área táctil mínima (Target Size):** Los controles interactivos deben contar con un área activa mínima de **44x44 píxeles**.
- **Contraste de Color:** La relación de contraste para texto regular debe ser al menos de **4.5:1** contra el fondo.
- **Enlace de Salto (Skip-to-Content):** Todo portal debe incluir un enlace inicial para saltar al contenido principal.
- **Navegación por Teclado:** Se debe garantizar orden lógico de foco y el estado \`:focus-visible\` en todos los controles interactivos.

## 3. Verificación
El equipo de calidad debe auditar mediante lectores de pantalla (NVDA / VoiceOver) y herramientas automatizadas como Biome y axe-core.
`,
    status: "Publicado",
    category: "Diseño y UX",
    author: "Subdirección de Servicios Digitales",
    createdAt: "2026-09-05T08:00:00.000Z",
    updatedAt: "2026-09-18T16:00:00.000Z",
  },
  {
    id: "guia-building-blocks",
    title: "Lineamientos de Arquitectura B2G y Building Blocks Distritales",
    slug: "arquitectura-b2g-building-blocks",
    summary:
      "Catálogo y reglas de consumo de los bloques de construcción reutilizables de la Secretaría General.",
    content: `# Lineamientos de Arquitectura B2G y Building Blocks

## 1. Visión Estratégica
Evitar la duplicidad de esfuerzos en el Distrito promoviendo el reuso de componentes de software certificados.

## 2. Catálogo de Building Blocks
- **Bloque de Pasarela de Pagos Distrital:** Pagos centralizados con PSE y entidades bancarias.
- **Bloque de Notificaciones Electrónicas:** Envío multicanal de SMS y correos institucionales.
- **Bloque de Firma Electrónica:** Mecanismo de validación y estampado cronológico.

## 3. Ciclo de Vida del Software
Todo proyecto debe implementar pruebas de rendimiento y análisis de código estático previo al paso a producción.
`,
    status: "Borrador",
    category: "Arquitectura",
    author: "Secretaría General - Oficina de Tecnología",
    createdAt: "2026-09-10T11:00:00.000Z",
    updatedAt: "2026-09-20T09:15:00.000Z",
  },
];

export class InMemoryGuidesRepository implements IGuidesRepository {
  private guides: Map<string, Guide>;

  constructor() {
    this.guides = new Map();
    for (const guide of INITIAL_GUIDES) {
      this.guides.set(guide.id, { ...guide });
    }
  }

  async getAll(filter?: GuideFilter): Promise<Guide[]> {
    let result = Array.from(this.guides.values());

    if (filter?.status) {
      result = result.filter((g) => g.status === filter.status);
    }

    if (filter?.category) {
      result = result.filter((g) => g.category === filter.category);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.content.toLowerCase().includes(q) ||
          g.summary?.toLowerCase().includes(q),
      );
    }

    // Ordenar por fecha de actualización descendente
    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async getById(id: string): Promise<Guide | null> {
    const guide = this.guides.get(id);
    return guide ? { ...guide } : null;
  }

  async getBySlug(slug: string): Promise<Guide | null> {
    for (const guide of this.guides.values()) {
      if (guide.slug === slug) {
        return { ...guide };
      }
    }
    return null;
  }

  async create(data: CreateGuideDTO): Promise<Guide> {
    const id = `guia-${Date.now()}`;
    const now = new Date().toISOString();
    const newGuide: Guide = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-"),
    };
    this.guides.set(id, newGuide);
    return { ...newGuide };
  }

  async update(id: string, data: UpdateGuideDTO): Promise<Guide> {
    const existing = this.guides.get(id);
    if (!existing) {
      throw new Error(`Guía con ID "${id}" no encontrada.`);
    }

    const updated: Guide = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.guides.set(id, updated);
    return { ...updated };
  }

  async delete(id: string): Promise<boolean> {
    return this.guides.delete(id);
  }

  async seedInitialData(): Promise<void> {
    for (const guide of INITIAL_GUIDES) {
      if (!this.guides.has(guide.id)) {
        this.guides.set(guide.id, { ...guide });
      }
    }
  }
}
