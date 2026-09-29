import {
  type AudienceType,
  type ContentBlock,
  type GuiaVinculacion,
  type GuideFilter,
  type GuideStatus,
  normalizeGuia,
} from "@/types/guide";

const RAW_INITIAL_GUIDES: Record<string, unknown>[] = [
  {
    id: "guia-marco-gobernanza",
    number: "1.1",
    numeroIdentificador: "1.1",
    title: "Marco Institucional y Gobernanza Digital",
    titulo: "Marco Institucional y Gobernanza Digital",
    slug: "sobre-bogota-stack",
    summary:
      "Directrices distritales de transformación pública, principios de soberanía digital y adopción vinculante del ecosistema Bogotá Stack.",
    resumenEjecutivo:
      "Directrices distritales de transformación pública, principios de soberanía digital y adopción vinculante del ecosistema Bogotá Stack.",
    category: "Gobernanza",
    categoriaPrincipal: "Gobernanza",
    status: "Publicado",
    estado: "Publicado",
    audiences: ["Directivo"],
    audiencias: ["Directivo"],
    accessibilityLevel: "WCAG 2.2 AA",
    nivelAccesibilidad: "WCAG 2.2 AA",
    badges: ["Gobernanza", "Distrito Capital", "Directriz 2026"],
    repoUrl: "https://github.com/alcaldia-bogota/bogota-stack",
    relatedGuides: ["guia-integracion-distrital", "guia-diseno-usabilidad"],
    author: "Secretaría General - Alcaldía Mayor de Bogotá",
    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-09-10T12:00:00.000Z",
    ultimaModificacion: "2026-09-10T12:00:00.000Z",
    blocks: [
      {
        id: "b-0-1",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Fundamento Jurídico e Institucional</h2><p>El Decreto Distrital 640 establece la obligatoriedad de articular la oferta institucional de trámites, ventanillas y servicios digitales bajo los lineamientos de arquitectura, diseño accesible y código abierto de Bogotá Stack.</p>",
          },
        },
      },
      {
        id: "b-0-2",
        type: "alerta",
        order: 2,
        content: {
          alert: {
            variant: "info",
            title: "Ámbito de Aplicación Distrital",
            message:
              "Aplica a todas las entidades del sector central, descentralizado y localidades de Bogotá Distrito Capital.",
          },
        },
      },
    ],
    bloquesContenido: [],
  },
  {
    id: "guia-integracion-distrital",
    number: "1.2",
    title: "Guía de Integración Distrital al Portal Transccional",
    slug: "integracion-distrital",
    summary:
      "Metodología, niveles de madurez BID y requisitos técnicos/jurídicos para integrar la oferta de trámites y servicios al Portal Transaccional de Bogotá D.C.",
    category: "Interoperabilidad",
    status: "Publicado",
    audiences: ["Directivo"],
    accessibilityLevel: "WCAG 2.2 AA",
    badges: ["Portal Transaccional", "Homologación", "Ventanilla Única"],
    repoUrl: "https://github.com/alcaldia-bogota/portal-transaccional",
    relatedGuides: ["guia-diseno-usabilidad", "guia-interoperabilidad"],
    author: "Secretaría General - Dirección Distrital de TIC",
    createdAt: "2026-08-15T09:00:00.000Z",
    updatedAt: "2026-09-15T14:30:00.000Z",
    blocks: [
      {
        id: "b-1",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Propósito de la Integración</h2><p>Establecer el marco vinculante y los niveles de madurez que deben acreditar las entidades distritales para homologar sus trámites en la ventanilla única transaccional de Bogotá D.C.</p>",
          },
        },
      },
      {
        id: "b-2",
        type: "alerta",
        order: 2,
        content: {
          alert: {
            variant: "warning",
            title: "Requisito Mandatorio SGAB",
            message:
              "Ningún trámite puede publicarse en el portal sin certificación previa de nivel 2 (Interoperable) en la Matriz de Madurez Distrital.",
          },
        },
      },
      {
        id: "b-3",
        type: "componente",
        order: 3,
        content: {
          component: {
            componentId: "maturity-matrix",
            componentName: "Matriz de Madurez de Integración BID",
            description: "Tabla de evaluación de 4 niveles de madurez técnica y gobernanza.",
          },
        },
      },
    ],
  },
  {
    id: "guia-diseno-usabilidad",
    number: "1.3",
    title: "Guía de Diseño y Usabilidad",
    slug: "diseno-y-usabilidad",
    summary:
      "Patrones de interacción, wizards transaccionales (Stepper), formularios Once-Only, heurísticas de usabilidad y los 8 mandamientos cívicos de iBO.",
    category: "Diseño y UX",
    status: "Publicado",
    audiences: ["UX / UI"],
    accessibilityLevel: "WCAG 2.2 AA",
    badges: ["Stepper", "Formularios", "Once-Only", "Heurísticas"],
    repoUrl: "https://github.com/alcaldia-bogota/kit-ui-components",
    relatedGuides: ["guia-lenguaje-claro", "guia-kit-ui-bogota"],
    author: "Laboratorio iBO & Secretaría General",
    createdAt: "2026-08-20T10:00:00.000Z",
    updatedAt: "2026-09-18T16:00:00.000Z",
    blocks: [
      {
        id: "b-4",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Modelo Bidimensional de Navegación</h2><p>El portal transaccional de Bogotá opera sobre un eje horizontal de 5 momentos cívicos y un stepper vertical Once-Only por trámite.</p>",
          },
        },
      },
      {
        id: "b-5",
        type: "componente",
        order: 2,
        content: {
          component: {
            componentId: "stepper",
            componentName: "Stepper Transaccional (5 Pasos)",
            description:
              "Wizard de pasos progresivos con validación en caliente y guardado de estado.",
          },
        },
      },
      {
        id: "b-6",
        type: "alerta",
        order: 3,
        content: {
          alert: {
            variant: "info",
            title: "Principio Once-Only",
            message:
              "Prohibido solicitar documentos que ya reposen en bases del Estado (cédula física, antecedentes, certificados catastrales).",
          },
        },
      },
    ],
  },
  {
    id: "guia-kit-ui-bogota",
    number: "1.4",
    title: "Kit UI Bogotá",
    slug: "kit-ui-bogota",
    summary:
      "Tokens de diseño, tipografía Montserrat/Work Sans, paleta de colores y librería de componentes.",
    category: "Diseño y UX",
    status: "Publicado",
    audiences: ["UX / UI", "Ingeniería"],
    accessibilityLevel: "WCAG 2.2 AA",
    badges: ["Tokens", "Figma", "Componentes", "Web Components"],
    repoUrl: "https://github.com/alcaldia-bogota/kit-ui-tokens",
    relatedGuides: ["guia-diseno-usabilidad", "guia-accesibilidad-digital"],
    author: "Alta Consejería TIC",
    createdAt: "2026-08-25T11:00:00.000Z",
    updatedAt: "2026-09-20T11:30:00.000Z",
    blocks: [
      {
        id: "b-7",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Paleta Cromática y Tokens</h2><p>La paleta oficial se compone del Rojo Bogotá (#CC0E35), Amarillo Distrital (#FAB62D) y Azul Institucional (#3366CC).</p>",
          },
        },
      },
      {
        id: "b-8",
        type: "codigo",
        order: 2,
        content: {
          code: {
            language: "typescript",
            filename: "tailwind.config.ts",
            code: `export default {
  theme: {
    extend: {
      colors: {
        primary: "#CC0E35",
        secondary: "#FAB62D",
        tertiary: "#3366CC",
      }
    }
  }
};`,
          },
        },
      },
    ],
  },
  {
    id: "guia-lenguaje-claro",
    number: "1.5",
    title: "Contenido y Lenguaje Claro",
    slug: "lenguaje-claro",
    summary:
      "Guía de redacción, microcopy accesible, tono institucional empático, regla de la ciudadanía y eliminación de barreras léxicas.",
    category: "Diseño y UX",
    status: "Publicado",
    audiences: ["UX / UI"],
    accessibilityLevel: "WCAG 2.2 AA",
    badges: ["En Lectura", "Redacción", "Accesibilidad Cognitiva"],
    repoUrl: "https://github.com/alcaldia-bogota/lenguaje-claro-docs",
    relatedGuides: ["guia-diseno-usabilidad", "guia-accesibilidad-digital"],
    author: "Secretaría General & iBO",
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-24T15:00:00.000Z",
    blocks: [
      {
        id: "b-9",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Voz y Tono Institucional</h2><p>La voz del Distrito es participativa, simple y transparente. El tono transaccional es cercano, conciso y directo, utilizando siempre la segunda persona del singular ('tú').</p>",
          },
        },
      },
      {
        id: "b-10",
        type: "alerta",
        order: 2,
        content: {
          alert: {
            variant: "error",
            title: "Prohibición de Símbolos Inaccesibles (@, x, e)",
            message:
              "Prohibido el uso de tod@s o lxs ciudadanxs porque rompe la síntesis fonética en lectores de pantalla (NVDA, JAWS). Usar obligatoriamente 'la ciudadanía'.",
          },
        },
      },
      {
        id: "b-11",
        type: "componente",
        order: 3,
        content: {
          component: {
            componentId: "checklist",
            componentName: "Checklist de Verificación de Lenguaje Claro",
            description: "Auditoría en 6 criterios con medidor de índice de claridad distrital.",
          },
        },
      },
      {
        id: "b-12",
        type: "componente",
        order: 4,
        content: {
          component: {
            componentId: "comparison",
            componentName: "Comparador Do's and Don'ts",
            description: "Casos de antes burocrático vs después claro con justificación técnica.",
          },
        },
      },
    ],
  },
  {
    id: "guia-interoperabilidad",
    number: "1.6",
    title: "Interoperabilidad Distrital",
    slug: "interoperabilidad",
    summary:
      "Arquitectura de integración segura con el bus, EventStore Kafka, políticas mTLS y cliente oficial @bogota/gov-sdk.",
    category: "Interoperabilidad",
    status: "Publicado",
    audiences: ["Ingeniería"],
    accessibilityLevel: "N/A",
    badges: ["mTLS", "Kafka", "@bogota/gov-sdk", "Seguridad"],
    repoUrl: "https://github.com/alcaldia-bogota/gov-sdk",
    relatedGuides: ["guia-autenticacion", "guia-bb-implementacion-tecnica"],
    author: "Dirección de Infraestructura OTIC",
    createdAt: "2026-09-02T12:00:00.000Z",
    updatedAt: "2026-09-21T18:00:00.000Z",
    blocks: [
      {
        id: "b-13",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Conexión mTLS con el Bus Distrital</h2><p>Todas las comunicaciones entre microservicios de las entidades y el API Gateway distrital deben utilizar autenticación mutua TLS 1.3 con certificados X.509 emitidos por la CA Distrital.</p>",
          },
        },
      },
      {
        id: "b-14",
        type: "codigo",
        order: 2,
        content: {
          code: {
            language: "bash",
            filename: "install.sh",
            code: "npm install @bogota/gov-sdk --save",
          },
        },
      },
    ],
  },
  {
    id: "guia-autenticacion",
    number: "1.7",
    title: "Vinculación Autenticación",
    slug: "autenticacion",
    summary:
      "Implementación de Single Sign-On (SSO) federado con Keycloak OIDC PKCE, biometría RNEC y credenciales descentralizadas W3C.",
    category: "Seguridad",
    status: "Publicado",
    audiences: ["Ingeniería"],
    accessibilityLevel: "WCAG 2.2 AA",
    badges: ["SSO", "Keycloak", "RNEC ANI", "W3C VCs"],
    repoUrl: "https://github.com/alcaldia-bogota/identity-bb",
    relatedGuides: ["guia-interoperabilidad"],
    author: "Seguridad Digital - Secretaría General",
    createdAt: "2026-09-03T14:00:00.000Z",
    updatedAt: "2026-09-22T09:00:00.000Z",
    blocks: [
      {
        id: "b-15",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Arquitectura de Identidad Digital</h2><p>El módulo de autenticación implementa un esquema híbrido: Single Sign-On mediante OpenID Connect para canales web y Credenciales Verificables W3C para la Billetera Bogotá.</p>",
          },
        },
      },
    ],
  },
  {
    id: "guia-bb-adopcion",
    number: "1.8",
    title: "Building Blocks: Adopción",
    slug: "bb-adopcion",
    summary:
      "Estrategia de reducción de costos en un 70% mediante reutilización de componentes comunes de gobierno (Pagos, Firma, Consentimiento).",
    category: "Arquitectura",
    status: "Publicado",
    audiences: ["Directivo"],
    accessibilityLevel: "N/A",
    badges: ["Ahorro 70%", "Reutilización", "Catálogo BB"],
    repoUrl: "https://github.com/alcaldia-bogota/building-blocks-catalog",
    relatedGuides: ["guia-bb-implementacion-tecnica"],
    author: "Dirección de Innovación Pública",
    createdAt: "2026-09-05T10:00:00.000Z",
    updatedAt: "2026-09-23T11:00:00.000Z",
    blocks: [
      {
        id: "b-16",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Eficiencia Financiera Distrital</h2><p>Adoptar los Building Blocks comunes evita que cada entidad contrate pasarelas de pago independientes o sistemas propios de notificaciones.</p>",
          },
        },
      },
    ],
  },
  {
    id: "guia-bb-implementacion-tecnica",
    number: "1.9",
    title: "BB: Implementación Técnica",
    slug: "bb-implementacion-tecnica",
    summary:
      "Micro-frontends basados en Web Components (Lit), SDK de eventos y arquitectura desacoplada para embeber servicios en portales de entidades.",
    category: "Arquitectura",
    status: "Revisión",
    audiences: ["Ingeniería"],
    accessibilityLevel: "WCAG 2.2 AA",
    badges: ["Microfrontends", "SDK", "Web Components"],
    repoUrl: "https://github.com/alcaldia-bogota/bb-microfrontends",
    relatedGuides: ["guia-bb-adopcion", "guia-interoperabilidad"],
    author: "Arquitectura de Software Distrital",
    createdAt: "2026-09-08T15:00:00.000Z",
    updatedAt: "2026-09-23T16:45:00.000Z",
    blocks: [
      {
        id: "b-17",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Consumo de Micro-frontends</h2><p>Los componentes de UI se distribuyen como custom elements estándar de W3C, asegurando aislamiento de estilos y compatibilidad con cualquier framework.</p>",
          },
        },
      },
    ],
  },
  {
    id: "guia-integracion-datos",
    number: "1.10",
    title: "Integración de Datos",
    slug: "integracion-de-datos",
    summary:
      "Ingesta, streaming analítico con Microsoft Fabric, lagos de datos unificados y modelo Ciudadano 360 para analítica pública.",
    category: "Interoperabilidad",
    status: "Borrador",
    audiences: ["Ingeniería"],
    accessibilityLevel: "N/A",
    badges: ["Ciudadano 360", "Analytics", "Lakehouse"],
    repoUrl: "https://github.com/alcaldia-bogota/data-fabric",
    relatedGuides: ["guia-interoperabilidad"],
    author: "Subdirección de Datos e Información",
    createdAt: "2026-09-10T16:00:00.000Z",
    updatedAt: "2026-09-24T09:30:00.000Z",
    blocks: [
      {
        id: "b-18",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Modelo Ciudadano 360</h2><p>Estructura de grafo unificada para consolidar el historial de interacciones ciudadanas sin duplicar datos personales en reposo.</p>",
          },
        },
      },
    ],
  },
  {
    id: "guia-accesibilidad-digital",
    number: "1.11",
    title: "Accesibilidad Digital",
    slug: "accesibilidad-digital",
    summary:
      "Enfoque diferencial, pruebas con lectores de pantalla (NVDA, TalkBack), interpretación en Lengua de Señas Colombiana (LSC) y accesibilidad cognitiva.",
    category: "Diseño y UX",
    status: "Publicado",
    audiences: ["UX / UI"],
    accessibilityLevel: "WCAG 2.2 AAA",
    badges: ["Lectores de Pantalla", "LSC", "Enfoque Diferencial"],
    repoUrl: "https://github.com/alcaldia-bogota/accesibilidad-distrital",
    relatedGuides: ["guia-diseno-usabilidad", "guia-lenguaje-claro"],
    author: "Laboratorio iBO & Secretaría Social",
    createdAt: "2026-09-12T11:00:00.000Z",
    updatedAt: "2026-09-24T12:00:00.000Z",
    blocks: [
      {
        id: "b-19",
        type: "texto",
        order: 1,
        content: {
          text: {
            html: "<h2>1. Criterios de Conformidad WCAG 2.2 AAA</h2><p>Garantizar que todo trámite distrital cuente con contraste cromático mínimo 7:1, áreas de toque de 44x44px y navegación por teclado al 100%.</p>",
          },
        },
      },
    ],
  },
];

export const INITIAL_CMS_GUIDES: GuiaVinculacion[] = RAW_INITIAL_GUIDES.map((g) =>
  normalizeGuia(g),
);

// Singleton en globalThis para conservar estado en hot-reload
const globalForCms = globalThis as unknown as {
  cmsGuidesStore?: GuiaVinculacion[];
};

if (!globalForCms.cmsGuidesStore) {
  globalForCms.cmsGuidesStore = [...INITIAL_CMS_GUIDES];
}

export function getAllCmsGuides(filter?: GuideFilter): GuiaVinculacion[] {
  const store = globalForCms.cmsGuidesStore ?? INITIAL_CMS_GUIDES;
  if (!filter) return [...store];

  return store.filter((g) => {
    if (
      filter.status &&
      filter.status !== "Todos" &&
      g.estado !== filter.status &&
      g.status !== filter.status
    ) {
      return false;
    }
    if (
      filter.category &&
      filter.category !== "Todas" &&
      g.categoriaPrincipal !== filter.category &&
      g.category !== filter.category
    ) {
      return false;
    }
    if (
      filter.audience &&
      filter.audience !== "Todas" &&
      !g.audiencias?.includes(filter.audience as string) &&
      !g.audiences?.includes(filter.audience as AudienceType)
    ) {
      return false;
    }
    if (filter.search && filter.search.trim() !== "") {
      const q = filter.search.toLowerCase().trim();
      const match =
        (g.titulo || g.title || "").toLowerCase().includes(q) ||
        (g.numeroIdentificador || g.number || "").toLowerCase().includes(q) ||
        (g.resumenEjecutivo || g.summary || "").toLowerCase().includes(q) ||
        (g.categoriaPrincipal || g.category || "").toLowerCase().includes(q) ||
        (g.badges || []).some((b) => b.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });
}

export function getCmsGuideById(id: string): GuiaVinculacion | null {
  const store = globalForCms.cmsGuidesStore ?? INITIAL_CMS_GUIDES;
  const q = id.toLowerCase().trim();
  const found = store.find(
    (g) =>
      g.id?.toLowerCase() === q ||
      g.slug.toLowerCase() === q ||
      g.number?.toLowerCase() === q ||
      g.numeroIdentificador?.toLowerCase() === q ||
      `guia-${g.slug.toLowerCase()}` === q,
  );
  return found ? normalizeGuia(found) : null;
}

export function saveCmsGuide(guideData: Partial<GuiaVinculacion>): GuiaVinculacion {
  const store = globalForCms.cmsGuidesStore ?? INITIAL_CMS_GUIDES;
  const now = new Date().toISOString();

  if (guideData.id) {
    const index = store.findIndex((g) => g.id === guideData.id);
    if (index !== -1) {
      const merged = {
        ...store[index],
        ...guideData,
        updatedAt: now,
        ultimaModificacion: now,
      };
      const updated = normalizeGuia(merged);
      store[index] = updated;
      globalForCms.cmsGuidesStore = [...store];
      return updated;
    }
  }

  // Crear nueva guía
  const newId =
    guideData.id || `guia-${guideData.slug || guideData.number?.replace(".", "-") || Date.now()}`;
  const newGuide = normalizeGuia({
    ...guideData,
    id: newId,
    createdAt: guideData.createdAt || now,
    updatedAt: now,
    ultimaModificacion: now,
  });

  store.unshift(newGuide);
  globalForCms.cmsGuidesStore = [...store];
  return newGuide;
}

export function deleteCmsGuide(id: string): boolean {
  const store = globalForCms.cmsGuidesStore ?? INITIAL_CMS_GUIDES;
  const index = store.findIndex((g) => g.id === id);
  if (index === -1) return false;

  store.splice(index, 1);
  globalForCms.cmsGuidesStore = [...store];
  return true;
}

export function toggleCmsGuideStatus(id: string, newStatus: GuideStatus): GuiaVinculacion | null {
  const store = globalForCms.cmsGuidesStore ?? INITIAL_CMS_GUIDES;
  const index = store.findIndex((g) => g.id === id);
  if (index === -1) return null;

  const updated = normalizeGuia({
    ...store[index],
    status: newStatus,
    estado: newStatus,
    updatedAt: new Date().toISOString(),
    ultimaModificacion: new Date().toISOString(),
  });
  store[index] = updated;
  globalForCms.cmsGuidesStore = [...store];
  return updated;
}
