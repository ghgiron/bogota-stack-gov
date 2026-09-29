import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Fingerprint,
  KeyRound,
  Layers,
  Lock,
  QrCode,
  Scale,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Autenticación Distrital: Federada & Descentralizada | Bogotá Stack",
  description:
    "Arquitectura de identidad digital para el Distrito: Keycloak OIDC, Biometría RNEC, Identidad Soberana (SSI), DIDs W3C y Billetera Bogotá.",
};

export default function AutenticacionDistritalPage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface">
      {/* 1. Sub-Header y Migas de Pan */}
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
            <Link href="/soluciones-compartidas" className="hover:text-primary transition-colors">
              Soluciones Compartidas
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-on-surface font-semibold" aria-current="page">
              Autenticación Distrital
            </span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-surface-container text-xs font-medium text-on-surface-variant">
            <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
            Marco de Identidad Digital Bogotá
          </span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="w-full bg-surface-container-lowest border-b border-surface-container-high py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-[5px] bg-primary-fixed text-on-primary-fixed text-xs font-semibold uppercase">
              Decreto 640 de 2025
            </span>
            <span className="px-2.5 py-1 rounded-[5px] bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold">
              OIDC 1.0 &amp; W3C VC Compliant
            </span>
            <span className="px-2.5 py-1 rounded-[5px] bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              Interoperable con RNEC
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Autenticación Distrital:{" "}
              <span className="text-primary">Federada y Descentralizada</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              El Bogotá Stack articula dos paradigmas complementarios de identidad ciudadana para
              eliminar fricciones, cumplir el principio Once-Only y garantizar la soberanía de datos
              conforme a las directrices de la Secretaría General y MinTIC.
            </p>
          </div>

          {/* Enlaces de ancla directos */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#federada"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-primary text-white font-heading text-sm font-semibold hover:bg-primary-container transition-all min-h-[44px] shadow-sm"
            >
              <Fingerprint className="w-4 h-4" />
              Ir a Autenticación Federada (SSO)
            </a>
            <a
              href="#descentralizada"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] border-2 border-primary text-primary font-heading text-sm font-semibold hover:bg-[#FAE7EB] transition-all min-h-[44px]"
            >
              <Wallet className="w-4 h-4" />
              Ir a Identidad Soberana (DIDs / VCs)
            </a>
            <a
              href="#comparativa"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-surface-container hover:bg-surface-container-high text-on-surface font-heading text-sm font-semibold transition-all min-h-[44px]"
            >
              <Scale className="w-4 h-4" />
              Tabla Comparativa de Uso
            </a>
          </div>
        </div>
      </section>

      {/* 3. Contenedor de Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col gap-14">
        {/* BLOQUE A: AUTENTICACIÓN FEDERADA */}
        <section
          id="federada"
          aria-labelledby="heading-federada"
          className="scroll-mt-28 flex flex-col gap-6"
        >
          <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-[8px] bg-tertiary/10 text-tertiary shrink-0">
                  <Fingerprint className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-tertiary">
                    PARADIGMA CENTRALIZADO INSTITUCIONAL
                  </span>
                  <h2
                    id="heading-federada"
                    className="font-heading text-2xl sm:text-3xl font-bold text-on-surface"
                  >
                    Bloque A: Autenticación Federada (Keycloak SSO)
                  </h2>
                </div>
              </div>
              <span className="px-3 py-1 rounded-[5px] bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold self-start sm:self-auto">
                Single Sign-On Distrital
              </span>
            </div>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Basado en el gestor de identidades de código abierto <strong>Keycloak</strong>,
              adaptado por la Secretaría General. Permite a cualquier ciudadano autenticarse una
              única vez y navegar de forma fluida por los portales de las más de 60 entidades del
              Distrito sin volver a ingresar contraseñas.
            </p>

            {/* Grid de 4 Pilares de la Federada */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                <span className="font-heading text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" />
                  Protocolo OIDC / OAuth 2.0
                </span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Tokens JWT firmados con algoritmo RS256, soporte para flujo de código de
                  autorización con PKCE para SPAs y apps móviles.
                </span>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                <span className="font-heading text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-tertiary" />
                  Biometría RNEC
                </span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Interoperabilidad con la base de datos de la Registraduría Nacional del Estado
                  Civil para cotejo facial y Cédula Digital en menos de 400ms.
                </span>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                <span className="font-heading text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-secondary" />
                  Roles y Permisos RBAC
                </span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Control granular de accesos por roles sectoriales (Ciudadano, Representante Legal,
                  Apoderado, Funcionario Distrital).
                </span>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                <span className="font-heading text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  MFA Institucional
                </span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Autenticación multifactor por OTP vía SMS, correo institucional verificado o
                  aplicaciones autenticadoras TOTP (RFC 6238).
                </span>
              </div>
            </div>

            {/* Diagrama de Flujo Visual Federada */}
            <div className="flex flex-col gap-3 p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high">
              <span className="font-heading text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-tertiary" />
                Diagrama de Flujo: Inicio de Sesión Federado
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center text-center font-mono text-xs">
                <div className="p-3 rounded-[8px] bg-surface-container-lowest border border-surface-container-high text-on-surface font-semibold shadow-xs">
                  1. Ciudadano solicita acceso
                </div>
                <div className="hidden sm:block text-primary font-bold text-lg">→</div>
                <div className="p-3 rounded-[8px] bg-tertiary/10 border border-tertiary/30 text-tertiary font-bold shadow-xs">
                  2. Redirección a Keycloak
                </div>
                <div className="hidden sm:block text-primary font-bold text-lg">→</div>
                <div className="p-3 rounded-[8px] bg-surface-container-lowest border border-surface-container-high text-on-surface font-semibold shadow-xs">
                  3. Token JWT &amp; Sesión Única
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE B: AUTENTICACIÓN DESCENTRALIZADA */}
        <section
          id="descentralizada"
          aria-labelledby="heading-descentralizada"
          className="scroll-mt-28 flex flex-col gap-6"
        >
          <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-[8px] bg-primary/10 text-primary shrink-0">
                  <Wallet className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary">
                    PARADIGMA SOBERANO (SELF-SOVEREIGN IDENTITY - SSI)
                  </span>
                  <h2
                    id="heading-descentralizada"
                    className="font-heading text-2xl sm:text-3xl font-bold text-on-surface"
                  >
                    Bloque B: Autenticación Descentralizada (Identidad Soberana)
                  </h2>
                </div>
              </div>
              <span className="px-3 py-1 rounded-[5px] bg-primary-fixed text-on-primary-fixed text-xs font-semibold self-start sm:self-auto">
                W3C DIDs &amp; Verifiable Credentials
              </span>
            </div>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Basado en los estándares internacionales del{" "}
              <strong>W3C (Decentralized Identifiers &amp; Verifiable Credentials)</strong>. La
              información ciudadana no reside en silos distritales vulnerables; reside bajo la
              custodia exclusiva del ciudadano en su{" "}
              <strong>Billetera Bogotá (Wallet Distrital / Carpeta Ciudadana)</strong> en su
              dispositivo móvil, permitiendo verificaciones matemáticas instantáneas sin consultar
              la base de datos original.
            </p>

            {/* Grid de 4 Pilares Descentralizada */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                <span className="font-heading text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-primary" />
                  Billetera Digital Móvil
                </span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Custodia de llaves criptográficas privadas en el enclave de seguridad (Secure
                  Element / StrongBox) del teléfono inteligente del ciudadano.
                </span>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                <span className="font-heading text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-tertiary" />
                  Verificación Criptográfica Offline
                </span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  La entidad receptora valida la firma digital de la credencial en milisegundos sin
                  hacer llamadas HTTP síncronas a la entidad que la expidió.
                </span>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                <span className="font-heading text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Principio Once-Only
                </span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Eliminación total de fotocopias de cédula, RUT y certificados catastrales. El
                  ciudadano presenta la prueba digital en un solo clic.
                </span>
              </div>

              <div className="p-4 rounded-[10px] bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/60">
                <span className="font-heading text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-secondary" />
                  Divulgación Selectiva (ZKP)
                </span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  El ciudadano puede demostrar que es mayor de edad o reside en Bogotá sin revelar
                  su fecha de nacimiento exacta ni su dirección física.
                </span>
              </div>
            </div>

            {/* Diagrama de Flujo Visual Descentralizada */}
            <div className="flex flex-col gap-3 p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high">
              <span className="font-heading text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                Diagrama de Flujo: Triángulo de Confianza W3C
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center text-center font-mono text-xs">
                <div className="p-3 rounded-[8px] bg-surface-container-lowest border border-surface-container-high text-on-surface font-semibold shadow-xs">
                  1. Emisor Distrital (Expide Credencial)
                </div>
                <div className="hidden sm:block text-primary font-bold text-lg">→</div>
                <div className="p-3 rounded-[8px] bg-primary/10 border border-primary/30 text-primary font-bold shadow-xs">
                  2. Ciudadano (Guarda en Billetera)
                </div>
                <div className="hidden sm:block text-primary font-bold text-lg">→</div>
                <div className="p-3 rounded-[8px] bg-surface-container-lowest border border-surface-container-high text-on-surface font-semibold shadow-xs">
                  3. Verificador (Valida firma offline)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABLA COMPARATIVA DE CASOS DE USO */}
        <section
          id="comparativa"
          aria-labelledby="heading-comparativa"
          className="scroll-mt-28 flex flex-col gap-4"
        >
          <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-4">
            <h2
              id="heading-comparativa"
              className="font-heading text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2"
            >
              <Scale className="w-6 h-6 text-primary" />
              Matriz Comparativa: ¿Cuándo usar cada modelo?
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Lineamiento técnico oficial para líderes de arquitectura e interoperabilidad de
              entidades distritales.
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface font-heading text-xs font-bold">
                    <th scope="col" className="p-3.5 rounded-l-[5px]">
                      Criterio Técnico / Funcional
                    </th>
                    <th scope="col" className="p-3.5 text-tertiary">
                      Autenticación Federada (Keycloak / OIDC)
                    </th>
                    <th scope="col" className="p-3.5 rounded-r-[5px] text-primary">
                      Autenticación Descentralizada (W3C DIDs / VCs)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high text-on-surface">
                  <tr>
                    <td className="p-3.5 font-bold font-heading">Custodia de la Identidad</td>
                    <td className="p-3.5 text-on-surface-variant">
                      Servidor Central Distrital (Keycloak)
                    </td>
                    <td className="p-3.5 text-primary font-semibold">
                      Billetera digital en el teléfono del ciudadano (Soberana)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-heading">Dependencia de Conectividad</td>
                    <td className="p-3.5 text-on-surface-variant">
                      Requiere conexión síncrona en línea al servidor de autenticación
                    </td>
                    <td className="p-3.5 text-emerald-700 font-semibold">
                      Verificación criptográfica offline sin llamadas al emisor
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-heading">Privacidad &amp; Datos</td>
                    <td className="p-3.5 text-on-surface-variant">
                      El servidor conoce qué trámite está abriendo el usuario
                    </td>
                    <td className="p-3.5 text-emerald-700 font-semibold">
                      Cero rastreo centralizado (Privacy by Design)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-heading">Casos de Uso Recomendados</td>
                    <td className="p-3.5 text-on-surface-variant">
                      • Portales web transaccionales masivos (SuperCADE Virtual, BOGDATA).
                      <br />• Trámites tributarios con alta concurrencia de pago.
                      <br />• Acceso de funcionarios a consolas administrativas.
                    </td>
                    <td className="p-3.5 text-primary font-semibold">
                      • Portación de licencias de conducción y tarjetas de operación.
                      <br />• Certificados de nomenclatura, predial y estrato social.
                      <br />• Credenciales de discapacidad, subsidios y SISBÉN.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-heading">Estándar Internacional</td>
                    <td className="p-3.5 text-on-surface-variant">
                      OpenID Connect Core 1.0, OAuth 2.0 (RFC 6749)
                    </td>
                    <td className="p-3.5 text-primary font-semibold">
                      W3C DID v1.0, W3C Verifiable Credentials v2.0
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Banner de Integración */}
        <div className="p-6 sm:p-8 rounded-[15px] bg-[#121316] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary">
              Mesa de Ayuda de Integraciones OTIC
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold">
              ¿Tu entidad necesita habilitar SSO o expedir credenciales verificables?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              La Secretaría General acompaña la configuración de clientes OIDC en Keycloak y la
              definición de esquemas JSON-LD para emisión de credenciales en Billetera Bogotá.
            </p>
          </div>
          <a
            href="mailto:soporte.bogotastack@alcaldiabogota.gov.co?subject=Solicitud%20Integracion%20Autenticacion%20Distrital"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[5px] bg-primary hover:bg-primary-container text-white font-heading text-sm font-semibold transition-all shrink-0 min-h-[44px]"
          >
            <span>Solicitar Acompañamiento OTIC</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>
    </div>
  );
}
