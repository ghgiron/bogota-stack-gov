import { GuidesSidebarNav } from "@/components/guias/GuidesSidebarNav";
import AuthParadigmComparator from "@/components/guias/identity/AuthParadigmComparator";
import BWalletOid4vciSimulator from "@/components/guias/identity/BWalletOid4vciSimulator";
import C4ArchitectureDiagram from "@/components/guias/identity/C4ArchitectureDiagram";
import DxIntegrationTabs from "@/components/guias/identity/DxIntegrationTabs";
import IdentityGlossary from "@/components/guias/identity/IdentityGlossary";
import Kyc4StepsWizard from "@/components/guias/identity/Kyc4StepsWizard";
import ValentinaJourneyCard from "@/components/guias/identity/ValentinaJourneyCard";
import { getGuias } from "@/lib/firebase/db";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Eye,
  FileCheck2,
  Fingerprint,
  Info,
  KeyRound,
  Layers,
  Lock,
  Network,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Table,
  Workflow,
  X,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title:
    "Guía 1.7: Vinculación de Autenticación y Credenciales Verificables (bb-identity-access) | Bogotá Stack",
  description:
    "Especificación técnica distrital de GovStack Identity, Autenticación Federada OIDC + PKCE con Keycloak, Credenciales Verificables W3C (OID4VCI / OID4VP) y BWallet Móvil.",
};

export default async function GuiaAutenticacionPage() {
  const allGuias = await getGuias();

  // Guías adyacentes para el pie de navegación
  const prevGuide = allGuias.find(
    (g) => g.slug === "lenguaje-claro" || g.number === "1.5" || g.slug === "interoperabilidad",
  );
  const nextGuide = allGuias.find(
    (g) =>
      g.slug === "bb-adopcion" ||
      g.slug === "building-blocks-adopcion" ||
      g.number === "1.8" ||
      g.number === "7",
  );

  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface font-body">
      {/* 1. Barra de Migas de Pan */}
      <div className="w-full bg-surface-container-lowest border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav aria-label="Migas de pan" className="flex items-center gap-1.5 font-medium">
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              <span>Inicio</span>
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <Link
              href="/guias-de-vinculacion"
              className="hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
            >
              Guías de Vinculación
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span
              className="text-primary font-semibold truncate max-w-xs sm:max-w-md"
              aria-current="page"
            >
              Guía 1.7: Vinculación de Autenticación
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Layout Principal a Dos Columnas */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Sidebar Izquierdo: Marcando activa la 1.7 */}
          <GuidesSidebarNav activeGuideSlug="autenticacion" guides={allGuias} />

          {/* Panel Derecho: 7 Secciones Técnicas */}
          <main className="flex-1 min-w-0 flex flex-col gap-10 w-full">
            {/* ENCABEZADO TÉCNICO HERO */}
            <article className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6">
              {/* Barra de Badges de Estado y Gobernanza */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-body">
                <span className="inline-flex items-center gap-1.5 font-bold text-primary">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>ESPECIFICACIÓN TÉCNICA DISTRITAL</span>
                </span>
                <div className="flex items-center gap-2 text-on-surface-variant font-medium flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-[#0049AE]/10 text-[#0049AE] font-bold border border-[#0049AE]/20 font-heading text-[11px]">
                    GovStack Identity
                  </span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] font-bold border border-[#1B7A2E]/30 font-heading text-[11px]">
                    Nivel WCAG 2.2 AA
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-[#CC0E35] text-white font-bold text-[10px] uppercase tracking-wider font-heading">
                    Guía 1.7 Oficial
                  </span>
                </div>
              </div>

              {/* Título Principal */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-primary text-white flex items-center justify-center font-heading font-extrabold text-sm sm:text-base shadow-xs shrink-0">
                    1.7
                  </span>
                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                    Vinculación de Autenticación y Credenciales Verificables
                  </h1>
                </div>
                <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  Estándar técnico distrital del Building Block{" "}
                  <code className="font-mono text-primary font-bold">bb-identity-access</code> para
                  la articulación entre la Autenticación Federada (Keycloak OIDC + PKCE), la
                  Autenticación Descentralizada W3C (OID4VCI / OID4VP con Walt.id) y la custodia
                  soberana en <strong>BWallet Móvil</strong>. Diseñada bajo el principio{" "}
                  <strong>Once-Only</strong> y el <strong>Acuerdo 001 de 2026</strong>.
                </p>
              </div>

              {/* Badges de Normativa y Estándares */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-[5px] bg-surface-container text-text-main font-mono text-xs font-semibold border border-gray-200">
                  OIDC / PKCE S256
                </span>
                <span className="px-3 py-1 rounded-[5px] bg-surface-container text-text-main font-mono text-xs font-semibold border border-gray-200">
                  W3C Verifiable Credentials
                </span>
                <span className="px-3 py-1 rounded-[5px] bg-surface-container text-text-main font-mono text-xs font-semibold border border-gray-200">
                  OID4VCI / OID4VP
                </span>
                <span className="px-3 py-1 rounded-[5px] bg-surface-container text-text-main font-mono text-xs font-semibold border border-gray-200">
                  SD-JWT VC (Selective Disclosure)
                </span>
                <span className="px-3 py-1 rounded-[5px] bg-[#FEF9E7] text-[#B37B00] font-heading text-xs font-bold border border-[#FAB62D]/40">
                  Acuerdo 001 de 2026 (Once-Only)
                </span>
              </div>

              {/* Matriz de Atributos Técnicos */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-surface-container-high/60 bg-surface-container-low/50 rounded-[10px] p-4 font-body">
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Categoría
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-on-surface font-heading truncate block">
                    Seguridad e Identidad
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Building Block
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-primary truncate block">
                    bb-identity-access
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Audiencia
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-on-surface truncate block">
                    Arquitectos &amp; Devs Distritales
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Ciclo de Vida
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-700 truncate block">
                    ADR-005 Implementado
                  </span>
                </div>
              </div>
            </article>

            {/* SECCIÓN 1: GOBERNANZA DISTRITAL Y VALENTINA */}
            <section id="gobernanza" className="scroll-mt-6">
              <div className="mb-4">
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Sección 1 • Arquitectura de Confianza
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  Gobernanza Distrital: &ldquo;Un solo idioma, múltiples billeteras&rdquo;
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                  Articulación técnica oficial entre la Subsecretaría de Servicio a la Ciudadanía, la
                  Consejería Distrital de TIC y las Secretarías Sectoriales de Bogotá D.C.
                </p>
              </div>
              <ValentinaJourneyCard />
            </section>

            {/* SECCIÓN 2: PARADIGMAS DE AUTENTICACIÓN Y SEPARACIÓN GOVSTACK */}
            <section id="paradigmas" className="scroll-mt-6">
              <div className="mb-4">
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Sección 2 • Arquitectura Conceptual y de Fronteras
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  Paradigmas de Autenticación y Separación de Responsabilidades GovStack
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                  Complementariedad entre Autenticación Federada tradicional (SSO Keycloak) y
                  Autenticación Descentralizada (W3C OID4VCI / OID4VP con BWallet).
                </p>
              </div>
              <AuthParadigmComparator />
            </section>

            {/* SECCIÓN 3: WIZARD DE ENROLAMIENTO BIOMÉTRICO KYC (4 PASOS) */}
            <section id="enrolamiento-kyc" className="scroll-mt-6">
              <div className="mb-4">
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Sección 3 • Micro-Frontend Orquestador
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  Wizard de Enrolamiento Biométrico y Prueba de Identidad (KYC en 4 Pasos)
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                  Orquestación documental y biométrica de alta fidelidad: Azure Document
                  Intelligence (OCR), Azure Face Detect &amp; Liveness (anti-spoofing 99.8%), Face
                  Verify 1:1 y validación de vigencia en la Registraduría (ANI/RNEC).
                </p>
              </div>
              <Kyc4StepsWizard />
            </section>

            {/* SECCIÓN 4: SIMULADOR DUAL LADO A LADO: EMISIÓN Y LOGIN CON BWALLET */}
            <section id="simulador-bwallet" className="scroll-mt-6">
              <div className="mb-4">
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Sección 4 • Laboratorio Interactivo Lado a Lado
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  Simulador Dual: Portal Transaccional y BWallet Móvil Oficial
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                  Experimenta en tiempo real los flujos de emisión de Credencial Base, emisión
                  sectorial Sisbén IV por parte de la Secretaría de Planeación y autenticación sin
                  contraseñas con divulgación selectiva.
                </p>
              </div>
              <BWalletOid4vciSimulator />
            </section>

            {/* SECCIÓN 5: ARQUITECTURA C4 Y REGLAS DEL CICLO DE VIDA (ADR-005) */}
            <section id="arquitectura-c4" className="scroll-mt-6">
              <div className="mb-4">
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Sección 5 • Contratos de Frontera y ADR
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  Arquitectura C4, Contratos de Frontera y Reglas del Ciclo de Vida
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                  Interacción entre los 4 bloques del ecosistema: Identity BB (bb-identity-access),
                  Autenticador/VC (Walt.id + bridge), Servicios Externos (RNEC/Azure) y Keycloak
                  IdP.
                </p>
              </div>
              <C4ArchitectureDiagram />
            </section>

            {/* SECCIÓN 6: GUÍA RÁPIDA DE IMPLEMENTACIÓN (DX) */}
            <section id="guia-dx" className="scroll-mt-6">
              <div className="mb-4">
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Sección 6 • Developer Experience (DX)
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  Guía Rápida de Implementación para Desarrolladores de Entidades
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                  Snippets de código listos para producción para integrar el Web Component en el
                  frontend, autorizar emisiones sectoriales desde el backend y verificar atributos
                  con SD-JWT VC.
                </p>
              </div>
              <DxIntegrationTabs />
            </section>

            {/* SECCIÓN 7: PRIVACIDAD POR DISEÑO Y MATRIZ DE TRATAMIENTO DE DATOS */}
            <section id="privacidad-y-datos" className="scroll-mt-6 space-y-6">
              <div className="mb-4">
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Sección 7 • Privacidad por Diseño y Diccionario Técnico
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  Privacidad por Diseño, Seguridad y Matriz de Tratamiento de Datos
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                  Garantía estricta de cero PII y cero biometría permanente. Cumplimiento integral
                  de la Ley Estatutaria 1581 de 2012 y GovStack Identity §6.8.
                </p>
              </div>

              {/* Matriz Técnica de Tratamiento de Datos */}
              <div className="rounded-[15px] p-6 sm:p-8 bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-heading font-bold text-base text-text-main flex items-center gap-2">
                      <Table className="w-5 h-5 text-[#1B7A2E]" />
                      Matriz de Tratamiento de Información y Criterios de Purga (GovStack §6.8)
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Políticas contractuales y técnicas de no persistencia para la protección de la
                      ciudadanía.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] font-heading font-bold text-xs shrink-0">
                    Cero PII Permanente
                  </span>
                </div>

                <div className="overflow-x-auto rounded-[10px] border border-gray-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 font-heading font-bold text-gray-700">
                      <tr>
                        <th className="px-4 py-3">Elemento de Dato</th>
                        <th className="px-4 py-3">Clasificación de Privacidad</th>
                        <th className="px-4 py-3">Almacenamiento Permanente</th>
                        <th className="px-4 py-3">Ciclo de Vida y Purga Automática</th>
                        <th className="px-4 py-3 text-right">Cumplimiento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-body">
                      <tr className="hover:bg-gray-50/60">
                        <td className="px-4 py-3 font-semibold text-text-main">
                          Imágenes Cédula (Frente / Dorso)
                        </td>
                        <td className="px-4 py-3 text-red-700 font-medium">PII Crítica / Imagen</td>
                        <td className="px-4 py-3 text-text-muted">
                          ❌ No (CosmosDB Efímero con TTL)
                        </td>
                        <td className="px-4 py-3 text-text-main">
                          Purga automática al finalizar la sesión KYC. Emite evento Kafka sin PII{" "}
                          <code className="font-mono text-[10px] bg-gray-100 px-1 py-0.5 rounded">
                            KycAssetsPurged
                          </code>
                          .
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] font-bold text-[10px]">
                            <Check className="w-3 h-3" /> Purga 100%
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/60">
                        <td className="px-4 py-3 font-semibold text-text-main">
                          Selfie Facial en Vivo &amp; Video Liveness
                        </td>
                        <td className="px-4 py-3 text-red-700 font-medium">Dato Biométrico</td>
                        <td className="px-4 py-3 text-text-muted">❌ No</td>
                        <td className="px-4 py-3 text-text-main">
                          En memoria durante la ejecución de Face Verify. Azure Face opera en modo
                          sin retención para reentrenamiento de modelos.
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] font-bold text-[10px]">
                            <Check className="w-3 h-3" /> Sin Retención
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/60">
                        <td className="px-4 py-3 font-semibold text-text-main">
                          Respuesta SOAP ANI (Registraduría)
                        </td>
                        <td className="px-4 py-3 text-amber-700 font-medium">Datos Registro Civil</td>
                        <td className="px-4 py-3 text-text-muted">❌ No</td>
                        <td className="px-4 py-3 text-text-main">
                          El XML SOAP de la Registraduría se contrasta en memoria volátil y jamás se
                          persiste en base de datos.
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] font-bold text-[10px]">
                            <Check className="w-3 h-3" /> En Memoria
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/60">
                        <td className="px-4 py-3 font-semibold text-text-main">
                          identityHash Seudonimizado
                        </td>
                        <td className="px-4 py-3 text-blue-700 font-medium">Seudónimo No Reversible</td>
                        <td className="px-4 py-3 text-text-main font-semibold">
                          ✅ Sí (PostgreSQL bb-identity-access)
                        </td>
                        <td className="px-4 py-3 text-text-main">
                          Persistencia para control del ciclo de vida, autorización de claims y
                          revocación. No permite derivar la cédula original.
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-blue-50 text-blue-700 font-bold text-[10px]">
                            <Check className="w-3 h-3" /> Autorizado
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Glosario Interactivo GovStack */}
              <IdentityGlossary />
            </section>

            {/* PIE DE PÁGINA: NAVEGACIÓN ADYACENTE */}
            <nav
              aria-label="Navegación entre guías distritales"
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-surface-container-high"
            >
              {prevGuide ? (
                <Link
                  href={`/guias-de-vinculacion/${prevGuide.slug}`}
                  className="flex items-center gap-3 p-4 rounded-[12px] bg-surface-container-lowest border border-surface-container-high hover:border-primary/40 hover:shadow-xs transition-all group flex-1"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Guía Anterior
                    </span>
                    <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors font-heading truncate block">
                      {prevGuide.titulo || prevGuide.title || "Guía Previa"}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextGuide ? (
                <Link
                  href={`/guias-de-vinculacion/${nextGuide.slug}`}
                  className="flex items-center justify-end text-right gap-3 p-4 rounded-[12px] bg-surface-container-lowest border border-surface-container-high hover:border-primary/40 hover:shadow-xs transition-all group flex-1"
                >
                  <div className="min-w-0">
                    <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Siguiente Guía
                    </span>
                    <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors font-heading truncate block">
                      {nextGuide.titulo || nextGuide.title || "Adopción de Building Blocks"}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}
