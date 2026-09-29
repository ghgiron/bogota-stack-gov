import {
  ArrowRight,
  CheckCircle2,
  Code2,
  CreditCard,
  FileKey,
  KeyRound,
  Layers,
  MessageSquare,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Soluciones Compartidas | Bogotá Stack",
  description:
    "Catálogo de Building Blocks, servicios de autenticación federada y descentralizada, y SDK de interoperabilidad del Distrito.",
};

export default function SolucionesCompartidasPage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface">
      {/* Sub-Header y Migas de Pan */}
      <div className="w-full bg-surface-container-low border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Ruta de migas"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant flex-wrap"
          >
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              Inicio
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-on-surface font-semibold" aria-current="page">
              Soluciones Compartidas
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-surface-container-lowest border-b border-surface-container-high py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="max-w-3xl">
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Soluciones <span className="text-primary">Compartidas</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              Módulos desacoplados y servicios de misión crítica preconfigurados para conectar
              cualquier entidad de la administración distrital con pagos, notificaciones,
              autenticación e interoperabilidad en tiempo récord.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de las 3 Macro-Áreas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col gap-12">
        {/* ÁREA 1: BUILDING BLOCKS */}
        <section aria-labelledby="heading-bb" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-surface-container-high pb-3">
            <h2
              id="heading-bb"
              className="font-heading text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2"
            >
              <Layers className="w-6 h-6 text-primary" />
              1. Building Blocks Oficiales (GovStack)
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Servicios horizontales listos para integrar mediante API REST y SDK Distrital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* BB 1: Pagos Distritales */}
            <div className="p-6 rounded-[15px] bg-surface-container-lowest border-2 border-primary shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-[8px] bg-primary/10 text-primary w-fit">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF5EC] text-[#1B7A2E] uppercase">
                    Activo
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-on-surface">
                  Pagos Distritales (bb-payment)
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Recaudo unificado ante la SDH, B-Pay, pasarela PSE, tarjetas de crédito y
                  conciliación BOGDATA en T+1.
                </p>
              </div>
              <Link
                href="/soluciones-compartidas/bb-payment"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary hover:underline pt-2 border-t border-surface-container-high"
              >
                <span>Ver Sandbox &amp; Especificación</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* BB 2: Notificaciones */}
            <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-[8px] bg-tertiary/10 text-tertiary w-fit">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-heading text-base font-bold text-on-surface">
                  Notificaciones (bb-messaging)
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Envío masivo y transaccional de SMS, WhatsApp Meta Cloud API y correos
                  certificados distritales.
                </p>
              </div>
              <Link
                href="/soluciones-compartidas/bb-messaging"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary hover:underline pt-2 border-t border-surface-container-high"
              >
                <span>Explorar Mensajería</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* BB 3: PKI */}
            <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-[8px] bg-secondary-container/20 text-on-surface w-fit">
                    <FileKey className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="font-heading text-base font-bold text-on-surface">
                  Firma Digital (bb-pki)
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Firma electrónica avanzada, sellado de tiempo criptográfico y verificación de
                  documentos oficiales PDF.
                </p>
              </div>
              <Link
                href="/soluciones-compartidas/bb-pki"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary hover:underline pt-2 border-t border-surface-container-high"
              >
                <span>Especificación PKI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* BB 4: Consentimiento */}
            <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-[8px] bg-emerald-50 text-emerald-800 w-fit">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container text-on-surface-variant uppercase">
                    Ley 1581
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-on-surface">
                  Consentimiento (bb-consent)
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Registro auditable de aceptación de términos, tratamiento de datos y trazabilidad
                  para trámites ciudadanos.
                </p>
              </div>
              <Link
                href="/soluciones-compartidas/bb-consent"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary hover:underline pt-2 border-t border-surface-container-high"
              >
                <span>Gestión de Habeas Data</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ÁREA 2: AUTENTICACIÓN DISTRITAL */}
        <section aria-labelledby="heading-auth" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-surface-container-high pb-3">
            <h2
              id="heading-auth"
              className="font-heading text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2"
            >
              <KeyRound className="w-6 h-6 text-tertiary" />
              2. Autenticación Distrital: Federada &amp; Descentralizada
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Dos esquemas de identidad digital para garantizar acceso unificado y soberanía
              ciudadana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-mono font-bold text-tertiary uppercase">
                  Single Sign-On Institucional
                </span>
                <h3 className="font-heading text-lg font-bold text-on-surface">
                  Autenticación Federada (Keycloak / OIDC)
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Inicio de sesión unificado con biometría RNEC, tokens JWT y autorización basada en
                  roles (RBAC) para trámites masivos en web.
                </p>
              </div>
              <Link
                href="/soluciones-compartidas/autenticacion#federada"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-tertiary hover:underline"
              >
                <span>Ver arquitectura Keycloak OIDC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-mono font-bold text-primary uppercase">
                  Self-Sovereign Identity (SSI)
                </span>
                <h3 className="font-heading text-lg font-bold text-on-surface">
                  Autenticación Descentralizada (W3C DIDs &amp; VCs)
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Identidad en manos del ciudadano mediante Billetera Bogotá y Carpeta Ciudadana.
                  Verificación criptográfica offline y privacidad por diseño.
                </p>
              </div>
              <Link
                href="/soluciones-compartidas/autenticacion#descentralizada"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary hover:underline"
              >
                <span>Ver esquema de Credenciales Verificables</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ÁREA 3: INTEROPERABILIDAD Y APIS */}
        <section aria-labelledby="heading-interop" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-surface-container-high pb-3">
            <h2
              id="heading-interop"
              className="font-heading text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2"
            >
              <Code2 className="w-6 h-6 text-emerald-700" />
              3. Herramientas de Interoperabilidad para Desarrolladores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/soluciones-compartidas/sdk-interop"
              className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high hover:border-primary transition-all shadow-sm flex items-start gap-4 group"
            >
              <div className="p-3 rounded-[8px] bg-primary/10 text-primary shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-base font-bold text-on-surface group-hover:text-primary">
                  SDK Distrital (@bogota/gov-sdk)
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Librería oficial para TypeScript, Python y Go con clientes tipados para , manejo
                  automático de mTLS y reintentos idempotentes.
                </p>
              </div>
            </Link>

            <Link
              href="/soluciones-compartidas/apis"
              className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high hover:border-tertiary transition-all shadow-sm flex items-start gap-4 group"
            >
              <div className="p-3 rounded-[8px] bg-tertiary/10 text-tertiary shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-base font-bold text-on-surface group-hover:text-tertiary">
                  Catálogo de APIs &amp; OpenAPI 3.1
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Directorio de servicios de las 60+ entidades distritales con especificaciones
                  abiertas descargables y ambientes de prueba seguros.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
