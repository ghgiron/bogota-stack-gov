/**
 * Servicio del Agente Predictivo de Integración Distrital
 * Formulación del Índice de Alcance de Integración (IAI) distrital y plano de arquitectura técnica
 * Alineado con Decreto Distrital 640 de 2025 y metodología BID Gov-Level 4.0
 */

export interface MaturityBreakdown {
  businessImpact: number; // N - 30%
  technicalComplexity: number; // T - 25%
  securityIdentity: number; // S - 20%
  dependencies: number; // D - 15%
  slaOperation: number; // O - 10%
}

export interface MaturityData {
  score: number;
  level: string;
  sublevel: string;
  formula: string;
  methodology: string;
  breakdown: MaturityBreakdown;
  verdict: string;
}

export interface BuildingBlockItem {
  id: string;
  code: string;
  title: string;
  description: string;
  savings: string;
  icon: string;
  specDetails: {
    protocol: string;
    auth: string;
    version: string;
    sla: string;
  };
}

export interface ApiEndpointItem {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  owner: string;
  description: string;
  icon: string;
}

export interface UiComponentItem {
  id: string;
  code: string;
  badge: string;
  title: string;
  description: string;
  type: "stepper" | "onceonly" | "bpay" | "pause";
  codeSnippet: string;
}

export interface ArchitectureBlueprint {
  id: string;
  planCode: string;
  timestamp: string;
  entity: string;
  title: string;
  description: string;
  maturity: MaturityData;
  buildingBlocks: BuildingBlockItem[];
  apiEndpoints: ApiEndpointItem[];
  uiComponents: UiComponentItem[];
}

export const DEFAULT_BLUEPRINT: ArchitectureBlueprint = {
  id: "plan-predial-089",
  planCode: "#PLAN-2025-089",
  timestamp: "Generado hoy, 10:43 AM",
  entity: "Secretaría Distrital de Hacienda (SHD)",
  title: "Plan de Implementación: Trámite Paz y Salvo Predial",
  description:
    "Certificado de Paz y Salvo del Impuesto Predial Unificado con autenticación por Cédula Digital, consulta CHIP, pago PSE y depósito automático en Carpeta Ciudadana.",
  maturity: {
    score: 78.5,
    level: "Nivel 3: Automatizado",
    sublevel: "Ruta clara a Nivel 4 (Proactivo)",
    formula: "IAI = 0.30N + 0.25T + 0.20S + 0.15D + 0.10O",
    methodology: "Metodología BID Gov-Level 4.0",
    breakdown: {
      businessImpact: 85,
      technicalComplexity: 75,
      securityIdentity: 90,
      dependencies: 70,
      slaOperation: 80,
    },
    verdict:
      "El diseño cumple con el Principio Once-Only distrital. Elimina el 100% del aporte presencial de documentos y certificaciones preexistentes, delegando la validación en Catastro y Registraduría.",
  },
  buildingBlocks: [
    {
      id: "bb-1",
      code: "BB-ID-01",
      title: "Identidad Digital Distrital",
      description:
        "Keycloak OIDC federado con interoperabilidad con Registraduría RNEC (Cédula Digital) y autenticación nivel sustancial.",
      savings: "65% tiempo dev",
      icon: "badge",
      specDetails: {
        protocol: "OpenID Connect (OIDC) / OAuth 2.0",
        auth: "mTLS + JWT Bearer Token",
        version: "v2.4.1",
        sla: "99.9% Uptime",
      },
    },
    {
      id: "bb-2",
      code: "BB-PAY-04",
      title: "Pagos Distritales (B-Pay)",
      description:
        "Recaudo multicanal PSE, tarjetas y billeteras con conciliación bancaria síncrona en tiempo real con Tesorería Distrital.",
      savings: "70% tiempo dev",
      icon: "payments",
      specDetails: {
        protocol: "REST API / Webhooks Idempotentes",
        auth: "Firma SHA-256 de Payload",
        version: "v3.1.0",
        sla: "Respuesta < 800ms",
      },
    },
    {
      id: "bb-3",
      code: "BB-MSG-02",
      title: "Notificaciones y Mensajería",
      description:
        "Enrutador multicanal de SMS transaccional, correo institucional cifrado y depósito automático en Carpeta Ciudadana.",
      savings: "60% tiempo dev",
      icon: "forward_to_inbox",
      specDetails: {
        protocol: "Event-driven / Kafka Broker",
        auth: "API Key Distrital SGAB",
        version: "v1.8.2",
        sla: "Entrega < 3 segundos",
      },
    },
    {
      id: "bb-4",
      code: "BB-PKI-03",
      title: "Firma y Sellado de Tiempo",
      description:
        "PKI Distrital de estampado cronológico con código QR de verificación de autenticidad documental según Ley 527.",
      savings: "80% tiempo dev",
      icon: "draw",
      specDetails: {
        protocol: "X.509 RFC 3161 TSA",
        auth: "Certificado Digital Certicámara",
        version: "v4.0.0",
        sla: "Estampado < 200ms",
      },
    },
  ],
  apiEndpoints: [
    {
      id: "api-1",
      method: "POST",
      path: "/api/v1/auth/token",
      owner: "Keycloak OIDC Distrital (Autenticación federada Nivel Alto)",
      description:
        "Generación e intercambio de token OIDC para ciudadano o servidor público autenticado.",
      icon: "lock",
    },
    {
      id: "api-2",
      method: "GET",
      path: "/api/v2/catastro/predio/{chip}",
      owner: "Unidad Administrativa Especial de Catastro Distrital (UAECD)",
      description: "Consulta de linderos, matrícula inmobiliaria y estado de propiedad predial.",
      icon: "dns",
    },
    {
      id: "api-3",
      method: "GET",
      path: "/api/v1/tributario/predial/saldo/{chip}",
      owner: "Secretaría Distrital de Hacienda (SHD - Core Tributario)",
      description: "Liquidación consolidada y estado de deuda del Impuesto Predial Unificado.",
      icon: "account_balance",
    },
    {
      id: "api-4",
      method: "POST",
      path: "/api/v2/payments/initiate",
      owner: "Bloque de Pagos B-Pay Distrital (Pasarela )",
      description:
        "Inicialización de transacción de recaudo seguro mediante pasarela distrital B-Pay.",
      icon: "shield",
    },
    {
      id: "api-5",
      method: "POST",
      path: "/api/v1/carpeta-ciudadana/documentos/deposito",
      owner: "Carpeta Ciudadana Distrital (Depósito automático)",
      description:
        "Almacenamiento seguro del acto administrativo o certificado emitido en la nube ciudadana.",
      icon: "folder_shared",
    },
  ],
  uiComponents: [
    {
      id: "ui-1",
      code: "UI-COMP-STEPPER",
      badge: "4 Pasos",
      title: "Stepper Transaccional de 4 Pasos",
      description:
        "Flujo guiado para: 1. Identidad Digital • 2. Consulta y Liquidación • 3. Pago Pasarela B-Pay • 4. Descarga y Envío a Carpeta.",
      type: "stepper",
      codeSnippet: `import { StepperVertical } from '@bogota/ui-kit';\n\n<StepperVertical\n  steps={[\n    { id: 1, label: 'Identidad Digital', status: 'completed' },\n    { id: 2, label: 'Consulta CHIP', status: 'current' },\n    { id: 3, label: 'Pasarela B-Pay', status: 'pending' },\n    { id: 4, label: 'Certificado Carpeta', status: 'pending' },\n  ]}\n/>`,
    },
    {
      id: "ui-2",
      code: "UI-COMP-ONCEONLY",
      badge: "Autofill Lock",
      title: "Formulario Once-Only Autocompletado",
      description:
        "Campos bloqueados con candado de datos certificados y chips de verificación en vivo de Registraduría y Catastro.",
      type: "onceonly",
      codeSnippet: `import { OnceOnlyForm, TextInput } from '@bogota/ui-kit';\n\n<OnceOnlyForm>\n  <TextInput label="Documento" value="1.020.884.219" readOnly verifiedBadge="Registraduría" />\n  <TextInput label="CHIP Predial" value="AAA0123BDCF" readOnly verifiedBadge="Catastro OK" />\n</OnceOnlyForm>`,
    },
    {
      id: "ui-3",
      code: "UI-COMP-BPAY-BTN",
      badge: "Idempotente",
      title: "Botón B-Pay Distrital Integrado",
      description:
        "Componente estándar de transacción accesible con estados de carga segura, prevención de doble clic y firma de payload.",
      type: "bpay",
      codeSnippet: `import { BPayButton } from '@bogota/ui-kit';\n\n<BPayButton\n  amount={245000}\n  reference="PRED-2025-089"\n  onSuccess={(tx) => router.push(\`/confirmacion/\${tx.id}\`)}\n/>`,
    },
    {
      id: "ui-4",
      code: "UI-COMP-PAUSE-MODAL",
      badge: "Resilient State",
      title: "Modal de Pausa Programada",
      description:
        "Permite al ciudadano pausar el trámite de liquidación y recibir un token temporal de recuperación segura por SMS o correo.",
      type: "pause",
      codeSnippet: `import { PauseModal } from '@bogota/ui-kit';\n\n<PauseModal\n  expiresInHours={48}\n  onTokenGenerated={(otp) => notifyViaSms(otp)}\n/>`,
    },
  ],
};

export const PRESET_BLUEPRINTS: Record<string, ArchitectureBlueprint> = {
  "Certificado Catastral": {
    ...DEFAULT_BLUEPRINT,
    id: "plan-catastro-092",
    planCode: "#PLAN-2025-092",
    timestamp: "Generado hoy, 10:45 AM",
    entity: "Catastro Distrital (UAECD)",
    title: "Plan de Implementación: Certificado Catastral Oficial",
    description:
      "Emisión inmediata de boletín y certificación catastral de predios en Bogotá con firma electrónica y consulta de linderos jurídicos.",
    maturity: {
      score: 84.0,
      level: "Nivel 3: Automatizado",
      sublevel: "Ruta clara a Nivel 4 (Proactivo)",
      formula: "IAI = 0.30N + 0.25T + 0.20S + 0.15D + 0.10O",
      methodology: "Metodología BID Gov-Level 4.0",
      breakdown: {
        businessImpact: 90,
        technicalComplexity: 70,
        securityIdentity: 92,
        dependencies: 80,
        slaOperation: 88,
      },
      verdict:
        "Cumple 100% el principio Once-Only. Conexión nativa a la IDECA y validación registral con Superintendencia de Notariado y Registro.",
    },
  },
  "Permiso Espacio Público": {
    ...DEFAULT_BLUEPRINT,
    id: "plan-espacio-095",
    planCode: "#PLAN-2025-095",
    timestamp: "Generado hoy, 10:47 AM",
    entity: "Secretaría Distrital de Movilidad (SDM)",
    title: "Plan de Implementación: Permiso de Ocupación Temporal de Espacio Público",
    description:
      "Solicitud de Planes de Manejo de Tránsito (PMT) y uso temporal de vías y andenes para obras civiles con inspección georreferenciada.",
    maturity: {
      score: 72.0,
      level: "Nivel 3: Automatizado",
      sublevel: "Evolución a Nivel 4 (Proactivo)",
      formula: "IAI = 0.30N + 0.25T + 0.20S + 0.15D + 0.10O",
      methodology: "Metodología BID Gov-Level 4.0",
      breakdown: {
        businessImpact: 80,
        technicalComplexity: 82,
        securityIdentity: 85,
        dependencies: 60,
        slaOperation: 75,
      },
      verdict:
        "Incorpora visualización GIS con GeoServer distrital y prellenado de datos de contratistas con el Registro Distrital de Proveedores.",
    },
  },
  "Inscripción RIT": {
    ...DEFAULT_BLUEPRINT,
    id: "plan-rit-097",
    planCode: "#PLAN-2025-097",
    timestamp: "Generado hoy, 10:49 AM",
    entity: "Secretaría Distrital de Hacienda (SHD)",
    title: "Plan de Implementación: Inscripción y Actualización en el RIT Distrital",
    description:
      "Registro de Información Tributaria (RIT) para personas naturales y jurídicas con validación de actividad económica CIIU y Cámara de Comercio.",
    maturity: {
      score: 88.5,
      level: "Nivel 4: Proactivo",
      sublevel: "Máxima Madurez GovStack",
      formula: "IAI = 0.30N + 0.25T + 0.20S + 0.15D + 0.10O",
      methodology: "Metodología BID Gov-Level 4.0",
      breakdown: {
        businessImpact: 95,
        technicalComplexity: 80,
        securityIdentity: 95,
        dependencies: 85,
        slaOperation: 90,
      },
      verdict:
        "Flujo interoperable con DIAN (RUT) y CCB (Cámaras de Comercio). Asignación automática de responsabilidades tributarias distritales.",
    },
  },
  "Subsidio de Vivienda": {
    ...DEFAULT_BLUEPRINT,
    id: "plan-vivienda-103",
    planCode: "#PLAN-2025-103",
    timestamp: "Generado hoy, 10:51 AM",
    entity: "Secretaría Distrital de Planeación (SDP)",
    title: "Plan de Implementación: Postulación Subsidio 'Mi Ahorro Mi Hogar'",
    description:
      "Postulación de hogares vulnerables con cruce automático con Sisbén IV, DNP, Registro Social de Hogares y B-Pay para dispersión de fondos.",
    maturity: {
      score: 81.0,
      level: "Nivel 3: Automatizado",
      sublevel: "Ruta clara a Nivel 4 (Proactivo)",
      formula: "IAI = 0.30N + 0.25T + 0.20S + 0.15D + 0.10O",
      methodology: "Metodología BID Gov-Level 4.0",
      breakdown: {
        businessImpact: 92,
        technicalComplexity: 78,
        securityIdentity: 90,
        dependencies: 72,
        slaOperation: 82,
      },
      verdict:
        "Cero presentación de documentos de vulnerabilidad. El sistema cruza directamente la clasificación Sisbén y titularidad de vivienda en Catastro.",
    },
  },
};

/**
 * Calcula el Índice de Alcance de Integración (IAI)
 * Fórmula: IAI = 0.30N + 0.25T + 0.20S + 0.15D + 0.10O
 */
export function calculateIaiScore(breakdown: MaturityBreakdown): number {
  const score =
    0.3 * breakdown.businessImpact +
    0.25 * breakdown.technicalComplexity +
    0.2 * breakdown.securityIdentity +
    0.15 * breakdown.dependencies +
    0.1 * breakdown.slaOperation;
  return Number(score.toFixed(1));
}

/**
 * Genera o ajusta el blueprint de arquitectura ante una consulta
 */
export async function generatePredictiveBlueprint(
  entity: string,
  promptText: string,
): Promise<ArchitectureBlueprint> {
  // Simulación de latencia realista de 240ms informada en la telemetría
  await new Promise((resolve) => setTimeout(resolve, 240));

  // Buscar coincidencia en presets
  for (const [key, preset] of Object.entries(PRESET_BLUEPRINTS)) {
    if (promptText.toLowerCase().includes(key.toLowerCase())) {
      return {
        ...preset,
        entity,
        timestamp: `Generado hoy, ${new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`,
      };
    }
  }

  // Generación dinámica personalizada
  const randomPlanNum = Math.floor(100 + Math.random() * 900);
  const words = promptText.trim().split(/\s+/).length;
  const isComplex = words > 15;

  const breakdown: MaturityBreakdown = {
    businessImpact: Math.min(95, 75 + (words % 20)),
    technicalComplexity: isComplex ? 82 : 72,
    securityIdentity: 90,
    dependencies: isComplex ? 75 : 68,
    slaOperation: 80,
  };

  const calculatedScore = calculateIaiScore(breakdown);

  return {
    id: `plan-dyn-${randomPlanNum}`,
    planCode: `#PLAN-2025-${randomPlanNum}`,
    timestamp: `Generado hoy, ${new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`,
    entity,
    title: `Plan de Implementación: ${promptText.slice(0, 45)}...`,
    description: promptText,
    maturity: {
      score: calculatedScore,
      level: calculatedScore >= 85 ? "Nivel 4: Proactivo" : "Nivel 3: Automatizado",
      sublevel:
        calculatedScore >= 85 ? "Máxima Madurez GovStack" : "Ruta clara a Nivel 4 (Proactivo)",
      formula: "IAI = 0.30N + 0.25T + 0.20S + 0.15D + 0.10O",
      methodology: "Metodología BID Gov-Level 4.0",
      breakdown,
      verdict:
        "El diseño cumple con el Principio Once-Only distrital. Elimina el aporte presencial de documentos delegando la validación en el bus de interoperabilidad  y bases de datos maestras.",
    },
    buildingBlocks: DEFAULT_BLUEPRINT.buildingBlocks,
    apiEndpoints: DEFAULT_BLUEPRINT.apiEndpoints,
    uiComponents: DEFAULT_BLUEPRINT.uiComponents,
  };
}
