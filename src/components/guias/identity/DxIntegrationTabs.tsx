"use client";

import {
  Check,
  CheckCircle2,
  Code2,
  Copy,
  ExternalLink,
  KeyRound,
  Layers,
  Terminal,
} from "lucide-react";
import React, { useState } from "react";

interface CodeSnippet {
  id: string;
  tabTitle: string;
  badge: string;
  title: string;
  description: string;
  filename: string;
  language: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: "tab-frontend",
    tabTitle: "1. Frontend: Web Component & OIDC",
    badge: "Cliente Web / µFE",
    title: "Embeber el Web Component de Identidad y Redirección OIDC",
    description:
      "Embebe el micro-frontend oficial <bogota-identity-access> en cualquier trámite distrital para invocar el flujo OIDC Auth Code con PKCE S256 apuntando a Keycloak con el hint de credenciales.",
    filename: "TramiteLogin.tsx",
    language: "tsx",
    code: `import React, { useEffect } from "react";

// Declaración del Web Component del Kit de Identidad Distrital
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "bogota-identity-access": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "client-id"?: string;
          "redirect-uri"?: string;
          "auth-mode"?: "sso" | "wallet" | "hybrid";
          "theme"?: "distrital" | "dark";
        },
        HTMLElement
      >;
    }
  }
}

export const TramiteLoginPage: React.FC = () => {
  useEffect(() => {
    // Escuchar el evento de autenticación exitosa emitido por el Web Component
    const handleAuthSuccess = (event: CustomEvent) => {
      const { idToken, identityHash, sessionState } = event.detail;
      console.log("Sesión verificada para la ciudadanía:", { identityHash });
      
      // Guardar token seguro en memoria / cookie HTTP-Only y navegar
      window.location.href = "/mi-tramite/formulario";
    };

    window.addEventListener("bogota:auth:success", handleAuthSuccess as EventListener);
    return () => {
      window.removeEventListener("bogota:auth:success", handleAuthSuccess as EventListener);
    };
  }, []);

  // Iniciar flujo OIDC estándar hacia Keycloak con hint del puente VC
  const iniciarLoginConKeycloak = () => {
    const keycloakUrl = "https://autenticacion.bogota.gov.co/realms/bogota-distrito/protocol/openid-connect/auth";
    const params = new URLSearchParams({
      client_id: "tramite-subsidio-movilidad",
      response_type: "code",
      scope: "openid profile email",
      redirect_uri: window.location.origin + "/callback",
      kc_idp_hint: "vc-bridge", // Dispara directamente el login cross-device con BWallet
      code_challenge: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM", // Generado con S256
      code_challenge_method: "S256",
    });

    window.location.href = \`\${keycloakUrl}?\${params.toString()}\`;
  };

  return (
    <div className="login-container p-6 bg-white rounded-[15px] border border-gray-200">
      <h2 className="font-heading font-bold text-xl mb-4">Ingreso Seguro al Trámite</h2>
      
      {/* Opción A: Web Component embebible Lit / Custom Element */}
      <bogota-identity-access
        client-id="tramite-subsidio-movilidad"
        redirect-uri="https://bogota.gov.co/tramites/movilidad/callback"
        auth-mode="hybrid"
        theme="distrital"
      />

      <div className="mt-4 text-center">
        <button
          onClick={iniciarLoginConKeycloak}
          className="px-4 py-2.5 rounded-[5px] bg-[#CC0E35] text-white font-heading font-bold text-sm shadow-xs"
        >
          Iniciar Sesión con BWallet Móvil (Sin Contraseña)
        </button>
      </div>
    </div>
  );
};`,
  },
  {
    id: "tab-backend-issue",
    tabTitle: "2. Backend: Emisión Sectorial (Sisbén)",
    badge: "µAPI Backend / REST",
    title: "Autorizar Emisión de Credencial Sectorial (Planeación)",
    description:
      "La entidad solicita a bb-identity-access autorizar la emisión de una credencial certificando atributos del Sisbén IV, con cabecera Idempotency-Key y firma de claims.",
    filename: "planeacion-issue-credential.ts",
    language: "typescript",
    code: `import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface AuthorizeIssuanceRequest {
  identityHash: string; // Hash seudonimizado de la persona
  organizationId: string; // Identificador de la entidad (Secretaría de Planeación)
  credentialConfigurationId: string; // Tipo de credencial registrada en catálogo W3C
  operationType: "issue" | "renew";
  approvedClaims: {
    grupo_sisben: string;
    estrato: number;
    localidad: string;
    puntaje_corte: number;
    hogar_verificado: boolean;
    fecha_certificacion: string;
  };
}

export async function autorizarEmisionSisben(
  identityHash: string,
  datosSisben: { grupo: string; estrato: number; localidad: string }
) {
  const payload: AuthorizeIssuanceRequest = {
    identityHash,
    organizationId: "bogota-sdp-planeacion",
    credentialConfigurationId: "BogotaSisbenCredential_v1",
    operationType: "issue",
    approvedClaims: {
      grupo_sisben: datosSisben.grupo,
      estrato: datosSisben.estrato,
      localidad: datosSisben.localidad,
      puntaje_corte: 34.2,
      hogar_verificado: true,
      fecha_certificacion: new Date().toISOString(),
    },
  };

  // Llamada a la µAPI de bb-identity-access con idempotencia y token mTLS
  const response = await axios.post(
    "https://api.identidad.bogota.gov.co/v1/issuance/authorizations",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${process.env.BOGOTA_IDENTITY_API_KEY}\`,
        "Idempotency-Key": \`issue-sisben-\${identityHash}-\${Date.now()}\`,
        "X-Organization-Id": "bogota-sdp-planeacion",
      },
      timeout: 5000,
    }
  );

  // Retorna el authorizationId y el deep link / QR de oferta OID4VCI
  const { authorizationId, credentialOfferUri, expiresAt } = response.data;
  console.log("Autorización de emisión generada:", { authorizationId, expiresAt });

  return {
    authorizationId,
    // Formato estándar OID4VCI: openid-credential-offer://?credential_offer_uri=...
    credentialOfferUri,
    expiresAt,
  };
}`,
  },
  {
    id: "tab-selective-disclosure",
    tabTitle: "3. Verificación: Divulgación Selectiva SD-JWT",
    badge: "Validación de Atributos",
    title: "Solicitar Únicamente Predicados sin Datos PII en Claro",
    description:
      "Un trámite solicita validar si la persona es elegible para un subsidio o mayor de edad, sin recibir su fecha de nacimiento ni su cédula completa, preservando su privacidad.",
    filename: "verify-sd-jwt-predicate.ts",
    language: "typescript",
    code: `import axios from "axios";

interface VerificationSessionRequest {
  requestedCredentials: Array<{
    type: "BogotaIdentityCredential_v1" | "BogotaSisbenCredential_v1";
    // Divulgación selectiva: solo se solicitan los claims estrictamente necesarios
    claims: {
      is_over_18?: { essential: boolean; purpose: "Comprobar mayoría de edad para trámite legal" };
      grupo_sisben?: { essential: boolean; purpose: "Verificar vulnerabilidad económica" };
      localidad?: { essential: true; purpose: "Confirmar residencia en el Distrito" };
    };
    // Predicados criptográficos W3C (cero divulgación de datos base)
    predicates?: {
      "age >= 18"?: boolean;
      "sisben_eligible"?: boolean;
    };
  }>;
  callbackUrl: string;
}

export async function crearSesionVerificacionTramite() {
  const requestBody: VerificationSessionRequest = {
    requestedCredentials: [
      {
        type: "BogotaSisbenCredential_v1",
        claims: {
          grupo_sisben: { essential: true, purpose: "Verificar vulnerabilidad económica" },
          localidad: { essential: true, purpose: "Confirmar residencia en el Distrito" },
        },
      },
    ],
    callbackUrl: "https://tramites.bogota.gov.co/api/verificacion/callback",
  };

  const response = await axios.post(
    "https://api.identidad.bogota.gov.co/v1/verification/sessions",
    requestBody,
    {
      headers: {
        "Authorization": \`Bearer \${process.env.BOGOTA_IDENTITY_API_KEY}\`,
        "Content-Type": "application/json",
      },
    }
  );

  // El Verifier retorna el código QR o enlace OID4VP para BWallet
  const { sessionId, openidPresentationUri } = response.data;
  return { sessionId, openidPresentationUri };
}`,
  },
];

export const DxIntegrationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tab-frontend");
  const [copied, setCopied] = useState<boolean>(false);

  const current = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[15px] p-6 sm:p-8 bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-[#1B7A2E]/10 text-[#1B7A2E] font-heading font-bold text-[11px] uppercase tracking-wider">
              Developer Experience (DX)
            </span>
            <span className="text-xs text-text-muted">• OpenAPI 3.0.3 / W3C</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-text-main flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#1B7A2E]" />
            Guía Rápida de Integración para Desarrolladores
          </h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {SNIPPETS.map((snippet) => {
          const isSelected = snippet.id === activeTab;
          return (
            <button
              key={snippet.id}
              type="button"
              onClick={() => setActiveTab(snippet.id)}
              className={`px-4 py-2 rounded-[8px] text-xs font-heading font-bold transition-all ${
                isSelected
                  ? "bg-[#CC0E35] text-white shadow-xs"
                  : "bg-surface-container-low text-text-muted hover:text-text-main hover:bg-gray-100"
              }`}
            >
              {snippet.tabTitle}
            </button>
          );
        })}
      </div>

      {/* Detalle del snippet */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 font-mono">
                {current.badge}
              </span>
              <h4 className="font-heading font-bold text-sm sm:text-base text-text-main">
                {current.title}
              </h4>
            </div>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">{current.description}</p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white hover:bg-gray-50 border border-gray-300 text-xs font-heading font-bold text-text-main shadow-2xs transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-500" />
                <span>Copiar Código</span>
              </>
            )}
          </button>
        </div>

        {/* Ventana de Código */}
        <div className="rounded-[10px] bg-gray-950 border border-gray-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 text-[11px] font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              {current.filename}
            </span>
            <span className="uppercase text-[10px] text-gray-400">{current.language}</span>
          </div>
          <div className="p-4 overflow-x-auto text-xs font-mono text-gray-200 leading-relaxed">
            <pre className="whitespace-pre">{current.code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DxIntegrationTabs;
