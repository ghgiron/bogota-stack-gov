"use client";

import {
  Check,
  ChevronRight,
  ExternalLink,
  Info,
  KeyRound,
  Layers,
  Lock,
  Network,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Users,
  X,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

export interface AuthParadigmComparatorProps {
  initialTab?: "paradigmas" | "fronteras";
}

export const AuthParadigmComparator: React.FC<AuthParadigmComparatorProps> = ({
  initialTab = "paradigmas",
}) => {
  const [activeTab, setActiveTab] = useState<"paradigmas" | "fronteras">(initialTab);
  const [selectedParadigm, setSelectedParadigm] = useState<"federada" | "descentralizada">(
    "federada",
  );

  return (
    <div className="w-full bg-surface-container-lowest rounded-[15px] border border-surface-container-high shadow-xs overflow-hidden font-body">
      {/* Encabezado del Componente */}
      <div className="p-5 sm:p-6 bg-surface-container-low border-b border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-primary/10 text-primary text-xs font-heading font-bold uppercase tracking-wider">
              Identidad Distrital · GovStack
            </span>
            <span className="text-xs text-on-surface-variant font-medium">• Guía 1.7</span>
          </div>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-on-surface">
            Comparador Arquitectónico: Autenticación Federada vs. Descentralizada
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed max-w-3xl">
            Comprende la complementariedad entre el inicio de sesión centralizado (SSO Keycloak) y
            la soberanía digital basada en Credenciales Verificables W3C en BWallet para las personas.
          </p>
        </div>

        {/* Selector de Pestañas Principales */}
        <div
          role="tablist"
          aria-label="Vistas del comparador de autenticación"
          className="flex items-center p-1 bg-surface-container-high rounded-[8px] shrink-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "paradigmas"}
            onClick={() => setActiveTab("paradigmas")}
            className={`px-3 py-1.5 rounded-[6px] text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === "paradigmas"
                ? "bg-white text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Paradigmas de Autenticación
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "fronteras"}
            onClick={() => setActiveTab("fronteras")}
            className={`px-3 py-1.5 rounded-[6px] text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === "fronteras"
                ? "bg-white text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Fronteras GovStack (Tabla 1 y 4)
          </button>
        </div>
      </div>

      {/* PESTAÑA 1: COMPARADOR DE PARADIGMAS */}
      {activeTab === "paradigmas" && (
        <div className="p-5 sm:p-8 space-y-6">
          {/* Selector de Paradigma */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarjeta 1: Autenticación Federada */}
            <button
              type="button"
              onClick={() => setSelectedParadigm("federada")}
              className={`p-5 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedParadigm === "federada"
                  ? "bg-[#EEF4FD] border-tertiary shadow-xs ring-2 ring-tertiary/20"
                  : "bg-surface-container-low border-surface-container-high hover:border-gray-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-[8px] bg-tertiary/10 text-tertiary flex items-center justify-center">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white text-tertiary border border-tertiary/30">
                    OIDC + PKCE S256
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-on-surface mb-1">
                  1. Autenticación Federada (Keycloak IdP)
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Inicio de sesión único corporativo (SSO). El IdP distrital autentica a la persona y
                  emite un token JWT hacia el trámite consumidor (*Relying Party*).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-semibold text-tertiary">
                <span>Sesión Web y Upstream Federation</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            {/* Tarjeta 2: Autenticación Descentralizada */}
            <button
              type="button"
              onClick={() => setSelectedParadigm("descentralizada")}
              className={`p-5 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedParadigm === "descentralizada"
                  ? "bg-[#FEF8EA] border-[#BF871B] shadow-xs ring-2 ring-[#FAB62D]/30"
                  : "bg-surface-container-low border-surface-container-high hover:border-gray-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-[8px] bg-secondary-container/20 text-[#9E6900] flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white text-[#9E6900] border border-[#FAB62D]/40">
                    OID4VCI / OID4VP
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-on-surface mb-1">
                  2. Autenticación Descentralizada (W3C / BWallet)
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Identidad soberana sin contraseñas. La persona custodia credenciales criptográficas
                  en su dispositivo móvil y consiente qué datos compartir por divulgación selectiva.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-semibold text-[#9E6900]">
                <span>Modelo Issuer-Holder-Verifier</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Detalle Profundo del Paradigma Seleccionado */}
          <div className="p-6 rounded-[12px] bg-surface-container-low border border-surface-container-high">
            {selectedParadigm === "federada" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                  <div>
                    <span className="text-xs font-bold font-heading text-tertiary uppercase">
                      Arquitectura Centralizada Distrital
                    </span>
                    <h5 className="font-heading font-bold text-lg text-on-surface">
                      Single Sign-On Distrital con Keycloak y OpenID Connect
                    </h5>
                  </div>
                  <span className="px-2.5 py-1 rounded-[5px] bg-[#EEF4FD] text-tertiary text-xs font-bold border border-tertiary/20">
                    Recomendado para Sedes Web
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-[8px] bg-white border border-gray-200 space-y-1.5">
                    <span className="font-heading font-bold text-on-surface block">
                      ¿Cómo inicia sesión la ciudadanía?
                    </span>
                    <p className="text-on-surface-variant leading-relaxed">
                      El trámite redirige al navegador a la URL de autorización de Keycloak mediante
                      Authorization Code con extensión PKCE (S256). La persona ingresa sus credenciales
                      o valida sesión activa.
                    </p>
                  </div>
                  <div className="p-4 rounded-[8px] bg-white border border-gray-200 space-y-1.5">
                    <span className="font-heading font-bold text-on-surface block">
                      ¿Qué recibe la entidad consumidora?
                    </span>
                    <p className="text-on-surface-variant leading-relaxed">
                      Un `id_token` (JWT firmado) y un `access_token` con claims estándar (`sub`,
                      `document_number`, `given_name`, `email_verified`) emitidos y sellados por la
                      Alcaldía Mayor.
                    </p>
                  </div>
                  <div className="p-4 rounded-[8px] bg-white border border-gray-200 space-y-1.5">
                    <span className="font-heading font-bold text-on-surface block">
                      Upstream Federation
                    </span>
                    <p className="text-on-surface-variant leading-relaxed">
                      Permite vincular proveedores de identidad externos (Cédula Digital RNEC,
                      Google Workspace Distrital o pasarelas financieras) sin modificar el código de los
                      trámites.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-[8px] bg-[#EEF4FD] border border-tertiary/30 text-xs text-on-surface flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-tertiary font-bold">Puente con BWallet: </strong>
                    Keycloak soporta el proveedor de identidad federado <code>vp-oidc-bridge</code>.
                    Cuando la persona selecciona "Ingresar con BWallet", Keycloak actúa como Verifier
                    intermedio y emite la sesión corporativa normal al trámite.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                  <div>
                    <span className="text-xs font-bold font-heading text-[#9E6900] uppercase">
                      Arquitectura Soberana W3C
                    </span>
                    <h5 className="font-heading font-bold text-lg text-on-surface">
                      Triángulo de Confianza: Issuer (Emisor) · Holder (BWallet) · Verifier (Trámite)
                    </h5>
                  </div>
                  <span className="px-2.5 py-1 rounded-[5px] bg-[#FEF8EA] text-[#9E6900] text-xs font-bold border border-[#FAB62D]/40">
                    Estándar Acuerdo 001/2026
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-[8px] bg-white border border-gray-200 space-y-1.5">
                    <span className="font-heading font-bold text-on-surface block">
                      1. Emisor (Issuer - Alcaldía / Planeación)
                    </span>
                    <p className="text-on-surface-variant leading-relaxed">
                      Valida los datos contra fuentes autoritativas (RNEC, Sisbén IV, RUNT) y firma
                      criptográficamente la credencial entregándola vía <strong>OID4VCI</strong> mediante
                      código QR o enlace profundo.
                    </p>
                  </div>
                  <div className="p-4 rounded-[8px] bg-white border border-gray-200 space-y-1.5">
                    <span className="font-heading font-bold text-on-surface block">
                      2. Titular (Holder - BWallet en el celular)
                    </span>
                    <p className="text-on-surface-variant leading-relaxed">
                      La persona custodia las llaves privadas en el hardware seguro del dispositivo
                      (WSCD / Secure Enclave). Ninguna entidad tiene copia de las llaves ni rastrea el uso.
                    </p>
                  </div>
                  <div className="p-4 rounded-[8px] bg-white border border-gray-200 space-y-1.5">
                    <span className="font-heading font-bold text-on-surface block">
                      3. Verificador (Verifier - Trámite receptor)
                    </span>
                    <p className="text-on-surface-variant leading-relaxed">
                      Solicita una presentación demostrativa vía <strong>OID4VP</strong>. La persona
                      aprueba selectivamente qué atributos divulgar (ej. solo "Mayor de edad: Sí", sin
                      revelar la fecha de nacimiento).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-[8px] bg-[#FEF8EA] border border-[#FAB62D]/40 text-xs text-on-surface flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#9E6900] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#9E6900] font-bold">Privacidad por Separación: </strong>
                    Cuando la ciudadanía presenta su credencial en una secretaría, el Emisor original no se
                    entera ni registra el momento de la consulta, eliminando el perfilamiento y la
                    correlación centralizada.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PESTAÑA 2: MATRIZ DE FRONTERAS GOVSTACK (TABLAS 1 Y 4) */}
      {activeTab === "fronteras" && (
        <div className="p-5 sm:p-8 space-y-6">
          {/* Explicación de Frontera */}
          <div className="p-4 rounded-[10px] bg-surface-container-low border border-surface-container-high text-xs text-on-surface leading-relaxed">
            <h4 className="font-heading font-bold text-sm text-primary mb-1">
              Principio Arquitectónico de Frontera GovStack Identity (§6.2):
            </h4>
            <p className="text-on-surface-variant">
              El componente <strong>`bb-identity-access`</strong> actúa como la{" "}
              <strong>autoridad de identidad y del ciclo de vida de credenciales</strong> de la
              Alcaldía Mayor de Bogotá D.C. No ejecuta directamente las firmas criptográficas de
              emisión ni gestiona las sesiones de usuario finales; delega estas tareas a componentes
              especializados garantizando desacoplamiento y alta cohesión.
            </p>
          </div>

          {/* Tabla de Responsabilidades */}
          <div className="overflow-x-auto border border-gray-200 rounded-[10px] shadow-2xs">
            <table className="w-full text-left text-xs divide-y divide-gray-200">
              <thead className="bg-gray-50 text-on-surface font-heading font-bold">
                <tr>
                  <th scope="col" className="px-4 py-3 min-w-[220px]">
                    Capacidad / Responsabilidad
                  </th>
                  <th scope="col" className="px-4 py-3 min-w-[240px] bg-primary/5 text-primary">
                    bb-identity-access (Autoridad Distrital)
                  </th>
                  <th scope="col" className="px-4 py-3 min-w-[240px]">
                    Componente Externo Encargado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white font-body">
                {/* Fila 1: KYC */}
                <tr className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-on-surface">
                    Prueba de Identidad y Enrolamiento KYC
                  </td>
                  <td className="px-4 py-3.5 bg-primary/5 text-[#1B7A2E] font-bold">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#1B7A2E]" />
                      ✅ Sí: Orquesta captura, Azure DI/Face y consulta ANI (RNEC)
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-on-surface-variant">
                    <span className="inline-flex items-center gap-1.5 text-gray-500">
                      <X className="w-4 h-4 text-red-500" />
                      ❌ ANI y Azure solo proveen APIs de verificación puntual
                    </span>
                  </td>
                </tr>

                {/* Fila 2: Emisión OID4VCI */}
                <tr className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-on-surface">
                    Emisión y Firma Criptográfica de VC
                  </td>
                  <td className="px-4 py-3.5 bg-primary/5 text-on-surface-variant">
                    <span className="inline-flex items-center gap-1.5 text-gray-600">
                      <Check className="w-4 h-4 text-[#1B7A2E]" />
                      Emite autorización previa (<code>IssuanceAuthorization</code>)
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#0049AE] font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-tertiary" />
                      <strong>Walt.id Issuer:</strong> Construye la VC, firma con llave distrital y
                      sirve el protocolo OID4VCI
                    </span>
                  </td>
                </tr>

                {/* Fila 3: Custodia de Llaves Móviles */}
                <tr className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-on-surface">
                    Custodia de Llaves del Titular
                  </td>
                  <td className="px-4 py-3.5 bg-primary/5 text-red-600 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <X className="w-4 h-4 text-red-500" />
                      ❌ Cero posesión de llaves privadas de las personas
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-on-surface-variant font-semibold">
                    <span className="inline-flex items-center gap-1.5 text-on-surface">
                      <Smartphone className="w-4 h-4 text-[#FAB62D]" />
                      <strong>BWallet Móvil:</strong> Almacena en Secure Enclave / WSCD bajo biometría
                      del celular
                    </span>
                  </td>
                </tr>

                {/* Fila 4: Sesión SSO Web */}
                <tr className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-on-surface">
                    Gestión de Sesiones Web y Tokens JWT
                  </td>
                  <td className="px-4 py-3.5 bg-primary/5 text-on-surface-variant">
                    <span className="inline-flex items-center gap-1.5 text-gray-600">
                      <X className="w-4 h-4 text-red-500" />
                      No administra cookies de sesión de trámites
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-tertiary font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-tertiary" />
                      <strong>Keycloak IdP:</strong> Gestiona ciclo de vida de sesiones SSO y tokens
                      OIDC
                    </span>
                  </td>
                </tr>

                {/* Fila 5: Revocación */}
                <tr className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-on-surface">
                    Estado Autoritativo de Revocación
                  </td>
                  <td className="px-4 py-3.5 bg-primary/5 text-[#1B7A2E] font-bold">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#1B7A2E]" />
                      ✅ Sí: Fuente autoritativa (Bitstring / Lista pública)
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-on-surface-variant">
                    <span className="inline-flex items-center gap-1.5 text-gray-600">
                      El Verifier consulta la URL expuesta por bb-identity-access
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthParadigmComparator;
