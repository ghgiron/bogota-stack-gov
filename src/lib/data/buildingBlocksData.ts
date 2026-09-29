export interface BuildingBlockDetail {
  slug: string;
  id: string;
  name: string;
  tagline: string;
  category: string;
  version: string;
  status: "Producción" | "Piloto" | "Borrador";
  govstackStandard: string;
  endpointUrl: string;
  documentation: {
    strategicAdoption: {
      summary: string;
      benefits: { title: string; desc: string }[];
      impactMetrics: { label: string; value: string }[];
    };
    designUX: {
      summary: string;
      rules: { title: string; desc: string }[];
      stepperGuidance: string;
    };
    technicalSpec: {
      method: "POST" | "GET";
      path: string;
      headers: { key: string; value: string; required: boolean; desc: string }[];
      parameters: { name: string; type: string; required: boolean; desc: string }[];
      responseCodes: { code: number; label: string; desc: string }[];
    };
  };
  samplePayloads: {
    id: string;
    label: string;
    description: string;
    payload: Record<string, unknown>;
  }[];
}

export const BUILDING_BLOCKS_CATALOG: Record<string, BuildingBlockDetail> = {
  "pagos-distritales": {
    slug: "pagos-distritales",
    id: "bb-pagos",
    name: "Pasarela de Pagos Distrital (B-Pay / PSE)",
    tagline:
      "Building Block oficial para la recaudación, liquidación y conciliación de tributos y trámites distritales.",
    category: "Transaccional & Recaudo",
    version: "v2.1.0",
    status: "Producción",
    govstackStandard: "GovStack Payments Building Block v1.2 Compliant",
    endpointUrl: "/api/mock/payment/initiate",
    documentation: {
      strategicAdoption: {
        summary:
          "B-Pay es el componente transversal de recaudo para todas las secretarías, departamentos administrativos y entidades descentralizadas del Distrito. Elimina la necesidad de que cada entidad contrate y configure pasarelas de pago independientes.",
        benefits: [
          {
            title: "Ahorro de Costos Operativos",
            desc: "Tarifa distrital negociada por volumen para PSE y billeteras digitales, ahorrando hasta un 65% en comisiones bancarias frente a contratos aislados.",
          },
          {
            title: "Interoperabilidad Once-Only",
            desc: "Al integrarse con la Base de Datos Maestra y Carpeta Ciudadana, el contribuyente no digita su cédula ni datos tributarios; se precargan y liquidan de manera segura.",
          },
          {
            title: "Conciliación Automática en Tiempo Real",
            desc: "Cierre contable sincronizado con la Secretaría Distrital de Hacienda en ciclos de 5 minutos, reduciendo los tiempos de acreditación de días a segundos.",
          },
          {
            title: "Seguridad y Cumplimiento Normativo",
            desc: "Cumple con los estándares PCI-DSS Nivel 1, cifrado TLS 1.3 de extremo a extremo y lineamientos de auditoría fiscal distrital.",
          },
        ],
        impactMetrics: [
          { label: "Tiempo promedio de pago", value: "45 segundos" },
          { label: "Disponibilidad del servicio", value: "99.98%" },
          { label: "Entidades integradas", value: "32 dependencias" },
          { label: "Transacciones procesadas", value: "+4.8M / año" },
        ],
      },
      designUX: {
        summary:
          "Las directrices de diseño de B-Pay garantizan que el ciudadano nunca pierda el contexto de su trámite ni experimente redirecciones confusas a entidades no oficiales.",
        rules: [
          {
            title: "Ubicación en el Stepper (Paso 3)",
            desc: "La liquidación y pago siempre debe ubicarse después de la validación Once-Only y la captura de datos específicos, y antes de la expedición del radicado final.",
          },
          {
            title: "Claridad en las Tarifas ($0 o Costo Fijo)",
            desc: "Si el trámite es gratuito (tarifa distrital $0), la interfaz debe destacarlo explícitamente en color verde esmeralda y omitir la pasarela bancaria.",
          },
          {
            title: "Retorno Transparente y Seguro",
            desc: "Tras completar la transacción en el banco, el ciudadano debe ser redirigido inmediatamente a la pantalla de confirmación con su número de radicado distrital y QR.",
          },
          {
            title: "Áreas Táctiles y Accesibilidad",
            desc: "Todos los selectores de medio de pago (PSE, Tarjeta, Billetera) deben contar con áreas táctiles mínimas de 44x44px y estados de foco visibles (WCAG 2.2 AA).",
          },
        ],
        stepperGuidance:
          "Integrar B-Pay mediante el componente <StepperVertical /> en el paso transaccional correspondiente. Al recibir la confirmación de pago HTTP 201, avanzar automáticamente al paso de Radicación y Constancia Digital.",
      },
      technicalSpec: {
        method: "POST",
        path: "/api/mock/payment/initiate",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
            required: true,
            desc: "Formato de intercambio estándar para la API REST distrital.",
          },
          {
            key: "X-Bogota-ApiKey",
            value: "bog_live_sec_...",
            required: true,
            desc: "Clave de API institucional otorgada por la Secretaría General.",
          },
          {
            key: "X-Entity-ID",
            value: "SGAB-DIR-TIC-01",
            required: true,
            desc: "Identificador de la secretaría o dependencia solicitante.",
          },
        ],
        parameters: [
          {
            name: "amount",
            type: "number",
            required: true,
            desc: "Monto total a recaudar en pesos colombianos (COP). Debe ser mayor a 0.",
          },
          {
            name: "taxpayerDocument",
            type: "string",
            required: true,
            desc: "Cédula de ciudadanía o NIT del contribuyente validado mediante Once-Only.",
          },
          {
            name: "description",
            type: "string",
            required: true,
            desc: "Concepto del trámite o tributo a liquidar (máximo 255 caracteres).",
          },
          {
            name: "taxpayerName",
            type: "string",
            required: false,
            desc: "Nombres y apellidos completos del contribuyente.",
          },
          {
            name: "referenceId",
            type: "string",
            required: false,
            desc: "Código de radicado o referencia interna de la entidad (ej. SGAB-2026-TR-849201).",
          },
          {
            name: "redirectUrl",
            type: "string",
            required: false,
            desc: "URL de retorno hacia el portal distrital al completar el pago.",
          },
          {
            name: "departmentOrEntity",
            type: "string",
            required: false,
            desc: "Nombre formal de la dependencia distrital emisora.",
          },
        ],
        responseCodes: [
          {
            code: 201,
            label: "Created",
            desc: "Sesión de recaudo inicializada. Devuelve paymentId y URL de checkout B-Pay.",
          },
          {
            code: 400,
            label: "Bad Request",
            desc: "Monto menor o igual a cero, o documento/descripción ausentes.",
          },
          {
            code: 401,
            label: "Unauthorized",
            desc: "Clave de API institucional inválida o expirada.",
          },
          {
            code: 422,
            label: "Unprocessable Entity",
            desc: "Referencia duplicada o contribuyente con bloqueo tributario preventivo.",
          },
        ],
      },
    },
    samplePayloads: [
      {
        id: "predial",
        label: "Impuesto Predial Unificado",
        description: "Liquidación estándar con descuento del 10% por pronto pago.",
        payload: {
          amount: 345000,
          taxpayerDocument: "1018456789",
          taxpayerName: "Carlos Alberto Gómez Restrepo",
          description: "Pago Impuesto Predial Unificado - Predio CH-84920-A",
          referenceId: "PREDIAL-2026-BOG-89102",
          departmentOrEntity: "Secretaría Distrital de Hacienda",
          redirectUrl: "https://bogotastack.gov.co/developer/confirmacion",
        },
      },
      {
        id: "tramite-sgab",
        label: "Tasa de Trámite Distrital (SGAB)",
        description: "Tarifa administrativa para expedición de certificado con firma electrónica.",
        payload: {
          amount: 28500,
          taxpayerDocument: "1018456789",
          taxpayerName: "Carlos Alberto Gómez Restrepo",
          description: "Expedición Certificado Especial de Uso y Residencia SGAB",
          referenceId: "SGAB-CERT-2026-48201",
          departmentOrEntity: "Secretaría General de la Alcaldía Mayor de Bogotá",
          redirectUrl: "https://bogotastack.gov.co/developer/confirmacion",
        },
      },
      {
        id: "error-payload",
        label: "Payload Inválido (Prueba de Error 400)",
        description: "Simula el envío de un monto en cero para validar el manejo de errores.",
        payload: {
          amount: 0,
          taxpayerDocument: "",
          description: "",
          referenceId: "ERR-TEST-001",
        },
      },
    ],
  },
};
