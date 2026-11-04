"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Lock,
  Network,
  RefreshCw,
  Server,
  Shield,
  ShieldAlert,
  Smartphone,
  Workflow,
} from "lucide-react";
import React, { useState } from "react";

export const C4ArchitectureDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"c4" | "adr005">("c4");
  const [selectedNode, setSelectedNode] = useState<string | null>("bb-identity");

  return (
    <div className="rounded-[15px] p-6 sm:p-8 bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
      {/* Header y Selector de Pestañas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-[#0049AE]/10 text-[#0049AE] font-heading font-bold text-[11px] uppercase tracking-wider">
              Arquitectura Técnica y Gobernanza
            </span>
            <span className="text-xs text-text-muted">• GovStack Identity §6.8</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-text-main flex items-center gap-2">
            <Network className="w-5 h-5 text-[#0049AE]" />
            Arquitectura C4, Contratos de Frontera y Ciclo de Vida
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-[8px] bg-surface-container-low p-1 border border-gray-200 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("c4")}
            className={`px-3 py-1.5 rounded-[6px] text-xs font-heading font-bold transition-all ${
              activeTab === "c4"
                ? "bg-white text-text-main shadow-2xs"
                : "text-text-muted hover:text-text-main"
            }`}
          >
            Diagrama C4 y Fronteras
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("adr005")}
            className={`px-3 py-1.5 rounded-[6px] text-xs font-heading font-bold transition-all ${
              activeTab === "adr005"
                ? "bg-white text-text-main shadow-2xs"
                : "text-text-muted hover:text-text-main"
            }`}
          >
            Reglas ADR-005 (Ciclo de Vida)
          </button>
        </div>
      </div>

      {activeTab === "c4" ? (
        <div className="space-y-6">
          {/* Convención de colores de los 4 bloques */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-heading font-bold text-text-muted text-[11px] uppercase tracking-wider">
              Bloques de Arquitectura:
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-blue-50 border border-blue-200 text-blue-900 font-semibold text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>🟦 Identity BB (bb-identity-access)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>🟩 Autenticador / VC (Walt.id + vp-bridge)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-amber-50 border border-amber-200 text-amber-900 font-semibold text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <span>🟧 Servicios Externos (RNEC / Azure)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-purple-50 border border-purple-200 text-purple-900 font-semibold text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              <span>🟨 Keycloak IdP (SSO Distrital)</span>
            </div>
          </div>

          {/* Grilla visual interactiva de los 4 cuadrantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Identity BB */}
            <div
              onClick={() => setSelectedNode("bb-identity")}
              className={`p-5 rounded-[12px] border transition-all cursor-pointer ${
                selectedNode === "bb-identity"
                  ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                  : "bg-white border-blue-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white font-mono">
                  BLOQUE 1 • AUTORIDAD
                </span>
                <span className="text-[11px] font-bold text-blue-700">GovStack Core</span>
              </div>
              <h4 className="font-heading font-extrabold text-base text-blue-950 flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                bb-identity-access (Identity BB)
              </h4>
              <p className="text-xs text-blue-900/80 leading-relaxed mb-3">
                Autoridad de identidad y ciclo de vida de credenciales. Orquesta la verificación de
                identidad, autoriza emisiones, gestiona revocaciones y almacena identificadores
                seudónimos con <code className="font-mono font-bold">identityHash</code>.
              </p>
              <div className="text-[11px] space-y-1 text-blue-800">
                <div>
                  • <strong>Servicios:</strong> IdentityVerificationService,
                  IssuanceAuthorizationService, CredentialLifecycleService.
                </div>
                <div>
                  • <strong>No hace:</strong> NO emite tokens JWT de sesión ni firma credenciales
                  W3C directamente.
                </div>
              </div>
            </div>

            {/* 2. Autenticador / VC */}
            <div
              onClick={() => setSelectedNode("walt-id")}
              className={`p-5 rounded-[12px] border transition-all cursor-pointer ${
                selectedNode === "walt-id"
                  ? "bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                  : "bg-white border-emerald-200 hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white font-mono">
                  BLOQUE 2 • PROTOCOLOS W3C
                </span>
                <span className="text-[11px] font-bold text-emerald-700">Walt.id Ecosystem</span>
              </div>
              <h4 className="font-heading font-extrabold text-base text-emerald-950 flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                Autenticador / VC &amp; vp-oidc-bridge
              </h4>
              <p className="text-xs text-emerald-900/80 leading-relaxed mb-3">
                Motor criptográfico de emisión y verificación conforme a W3C, OID4VCI y OID4VP.
                Transforma presentaciones de billetera móvil en sesiones OIDC estándar.
              </p>
              <div className="text-[11px] space-y-1 text-emerald-800">
                <div>
                  • <strong>Componentes:</strong> Walt.id Issuer, Walt.id Verifier, vp-oidc-bridge.
                </div>
                <div>
                  • <strong>Protocolos:</strong> openid-credential-offer:// (OID4VCI), SD-JWT VC,
                  ECDSA P-256.
                </div>
              </div>
            </div>

            {/* 3. Servicios Externos de Prueba de Identidad */}
            <div
              onClick={() => setSelectedNode("external-kyc")}
              className={`p-5 rounded-[12px] border transition-all cursor-pointer ${
                selectedNode === "external-kyc"
                  ? "bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20 shadow-xs"
                  : "bg-white border-amber-200 hover:border-amber-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-white font-mono">
                  BLOQUE 3 • FUENTES OFICIALES
                </span>
                <span className="text-[11px] font-bold text-amber-700">Verificación Oficial</span>
              </div>
              <h4 className="font-heading font-extrabold text-base text-amber-950 flex items-center gap-2 mb-2">
                <Cpu className="w-5 h-5 text-amber-600" />
                RNEC / ANI &amp; Azure Biometrics
              </h4>
              <p className="text-xs text-amber-900/80 leading-relaxed mb-3">
                Prueba de identidad autoritativa nacional e inteligencia artificial para validación
                documental y facial en tiempo real sin retención contractual de datos.
              </p>
              <div className="text-[11px] space-y-1 text-amber-800">
                <div>
                  • <strong>Registraduría (ANI):</strong> Consulta SOAP consultarCedulas
                  (estadoCedula=VIGENTE).
                </div>
                <div>
                  • <strong>Azure DI &amp; Face:</strong> OCR cédula, Liveness anti-spoofing y Face
                  Verify 1:1.
                </div>
              </div>
            </div>

            {/* 4. Keycloak IdP */}
            <div
              onClick={() => setSelectedNode("keycloak")}
              className={`p-5 rounded-[12px] border transition-all cursor-pointer ${
                selectedNode === "keycloak"
                  ? "bg-purple-50/70 border-purple-500 ring-2 ring-purple-500/20 shadow-xs"
                  : "bg-white border-purple-200 hover:border-purple-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white font-mono">
                  BLOQUE 4 • IDP CORPORATIVO
                </span>
                <span className="text-[11px] font-bold text-purple-700">SSO Distrital</span>
              </div>
              <h4 className="font-heading font-extrabold text-base text-purple-950 flex items-center gap-2 mb-2">
                <Server className="w-5 h-5 text-purple-600" />
                Keycloak IdP (OIDC + PKCE S256)
              </h4>
              <p className="text-xs text-purple-900/80 leading-relaxed mb-3">
                Punto central de inicio de sesión para trámites distritales. Emite tokens JWT de
                sesión y se federa con el puente de credenciales verificables (Upstream
                Federation).
              </p>
              <div className="text-[11px] space-y-1 text-purple-800">
                <div>
                  • <strong>Clientes:</strong> Trámites distritales (Relying Parties).
                </div>
                <div>
                  • <strong>Federación:</strong> kc_idp_hint=vc-bridge hacia vp-oidc-bridge.
                </div>
              </div>
            </div>
          </div>

          {/* Caja explicativa del flujo C4 */}
          <div className="p-4 rounded-[10px] bg-gray-900 text-gray-100 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#FAB62D] font-bold">
              <Workflow className="w-4 h-4" />
              <span>Contrato de Integración entre Bloques (Secuencia Resumida):</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              1. <strong>Trámite</strong> inicia Auth Code + PKCE con Keycloak → 2.{" "}
              <strong>Keycloak</strong> redirige a vp-oidc-bridge → 3. <strong>BWallet</strong>{" "}
              presenta credencial vía OID4VP → 4. <strong>vp-bridge</strong> valida contra la lista
              de revocación de bb-identity-access → 5. <strong>Keycloak</strong> emite JWT final al
              trámite.
            </p>
          </div>
        </div>
      ) : (
        /* Pestaña ADR-005: Reglas Invariantes del Ciclo de Vida */
        <div className="space-y-4">
          <div className="p-4 rounded-[10px] bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900">
            <h4 className="font-heading font-bold text-base text-blue-950 mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0049AE]" />
              Decisión de Arquitectura ADR-005: CredentialLifecycleService
            </h4>
            <p className="leading-relaxed">
              Las credenciales verificables distritales se gobiernan bajo 4 reglas invariantes
              estrictas para garantizar que la ciudadanía nunca quede desprotegida ni sufra bloqueos
              durante trámites o renovaciones:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[12px] bg-white border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#CC0E35] text-white flex items-center justify-center font-bold text-xs font-mono">
                  1
                </span>
                <h5 className="font-heading font-bold text-sm text-text-main">
                  Autorización antes de Oferta
                </h5>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Ninguna oferta de credencial (<code className="font-mono">OID4VCI</code>) puede
                generarse en el emisor sin un registro previo y vigente de{" "}
                <code className="font-mono font-bold text-primary">IssuanceAuthorization</code> en
                bb-identity-access. Esta autorización cuenta con un TTL de un solo uso (típicamente 5
                minutos).
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-white border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0049AE] text-white flex items-center justify-center font-bold text-xs font-mono">
                  2
                </span>
                <h5 className="font-heading font-bold text-sm text-text-main">
                  Activación Post-Emisión
                </h5>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                La credencial nace en estado <code className="font-mono">pending</code>. Pasa a{" "}
                <code className="font-mono font-bold text-emerald-700">active</code> únicamente
                cuando el Autenticador/VC confirma que la billetera móvil descargó e instaló
                exitosamente la credencial (<code className="font-mono">event: issued</code>).
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-white border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B7A2E] text-white flex items-center justify-center font-bold text-xs font-mono">
                  3
                </span>
                <h5 className="font-heading font-bold text-sm text-text-main">
                  Renovación Segura (operationType=renew)
                </h5>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Durante la renovación, la credencial previa se revoca{" "}
                <strong>únicamente cuando la nueva credencial ha sido emitida y confirmada</strong>.
                Si la sesión se interrumpe o la persona cierra la ventana, la credencial anterior
                sigue activa, previniendo que la persona quede bloqueada.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-white border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FAB62D] text-gray-900 flex items-center justify-center font-bold text-xs font-mono">
                  4
                </span>
                <h5 className="font-heading font-bold text-sm text-text-main">
                  Revocación y Separación en Login
                </h5>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                La revocación actualiza inmediatamente la lista de revocación (StatusList2021)
                consultable por el Verifier. En el flujo de login, el Emisor jamás participa: el
                verificador solo consulta la lista pública de revocación, preservando la privacidad.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C4ArchitectureDiagram;
