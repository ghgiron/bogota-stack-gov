import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Code2,
  Compass,
  CreditCard,
  ExternalLink,
  FileCheck2,
  KeyRound,
  Layers,
  Lock,
  MessageSquare,
  Palette,
  Scale,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Empezar con Bogotá Stack | Guía de Adopción e Información Distrital",
  description:
    "Introducción al sistema de diseño, interoperabilidad y gestión de servicios digitales de Bogotá. Habilitadores tecnológicos y rutas de adopción por perfil (Directivos, Diseñadores UX y Desarrolladores).",
};

export default function EmpezarPage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface">
      {/* Sub-Header y Migas de Pan Semánticas */}
      <div className="w-full bg-surface-container-low border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Ruta de navegación"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              Inicio
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-on-surface font-semibold" aria-current="page">
              Empezar
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-surface-container text-xs font-medium text-on-surface-variant border border-surface-container-high">
              <Compass className="w-3.5 h-3.5 text-primary" />
              Estándar Distrital de Integración
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-secondary-container/40 text-on-secondary-container text-xs font-medium border border-secondary/20">
              Decreto 640 de 2025
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section: Introducción Oficial */}
      <section className="w-full bg-surface-container-lowest border-b border-surface-container-high py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="max-w-4xl flex flex-col gap-4">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Primeros pasos con <span className="text-primary">Bogotá Stack</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Bogotá Stack facilita los estándares distritales de diseño, interoperabilidad, autenticación
              y componentes reutilizables. Su propósito es estandarizar la experiencia de la ciudadanía
              para acceder a la oferta distrital e integrar los servicios de las Entidades Distritales
              en un entorno transaccional, optimizando tiempos de desarrollo y costos.
            </p>
          </div>

          {/* Quick Jump Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#habilitadores"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2 min-h-[44px]"
            >
              <Zap className="w-4 h-4 text-secondary" />
              Explorar habilitadores
            </a>
            <a
              href="#rutas-adopcion"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs sm:text-sm font-semibold transition-colors border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2 min-h-[44px]"
            >
              <Users className="w-4 h-4 text-tertiary" />
              Guías por especialidad
            </a>
            <a
              href="#principios-mandatorios"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs sm:text-sm font-medium transition-colors border border-surface-container-high/60 focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2 min-h-[44px]"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Principios distritales
            </a>
          </div>
        </div>
      </section>

      {/* Contenedor Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-16">
        {/* SECCIÓN 1: CARACTERÍSTICAS PRINCIPALES (HABILITADORES DEL ECOSISTEMA) */}
        <section id="habilitadores" className="scroll-mt-28 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-on-surface">
              Herramientas para integrar tus servicios
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
              Tres capacidades distritales diseñadas para acelerar la integración de tu entidad:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* HABILITADOR 1: DISEÑO ATÓMICO */}
            <div className="p-6 sm:p-7 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-primary/10 text-primary flex items-center justify-center">
                    <Palette className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                    Interfaz visual centrada en las personas
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Diseña pantallas limpias y consistentes con los componentes oficiales de Bogotá.
                    Componentes de interfaz listos para usar, ahorra tiempo de maquetación y cumple los estándares de accesibilidad visual y navegación por teclado.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-[8px] bg-surface-container-low border border-surface-container-high/60 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-medium text-on-surface">Adaptable a móviles</span>
                  </div>
                  <div className="p-2.5 rounded-[8px] bg-surface-container-low border border-surface-container-high/60 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-medium text-on-surface">Estándar visual</span>
                  </div>
                  <div className="p-2.5 rounded-[8px] bg-surface-container-low border border-surface-container-high/60 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-medium text-on-surface">Tokens de diseño</span>
                  </div>
                </div>
              </div>

              <Link
                href="/kit-ui/colores"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-[5px] bg-surface-container-low hover:bg-surface-container text-xs font-heading font-semibold text-primary transition-colors border border-surface-container-high min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
              >
                <span>Explorar Kit UI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* HABILITADOR 2: SOLUCIONES COMPARTIDAS (GOVSTACK) */}
            <div className="p-6 sm:p-7 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-tertiary/10 text-tertiary flex items-center justify-center">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                    Soluciones Compartidas
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    No desarrolles desde cero lo que el Distrito ya resolvió.
                    Capacidades modulares y reutilizables para resolver necesidades comunes:
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <Link
                    href="/soluciones-compartidas/autenticacion"
                    className="p-2.5 rounded-[8px] bg-surface-container-low hover:bg-surface-container border border-surface-container-high/60 transition-colors flex flex-col gap-0.5 focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-primary" />
                        Inicio de sesión único para la ciudadanía
                      </span>
                      <ArrowRight className="w-3 h-3 text-on-surface-variant" />
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      Mecanismos federados y descentralizados mediante Credenciales Verificables.
                    </span>
                  </Link>

                  <Link
                    href="/soluciones-compartidas"
                    className="p-2.5 rounded-[8px] bg-surface-container-low hover:bg-surface-container border border-surface-container-high/60 transition-colors flex flex-col gap-0.5 focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-tertiary" />
                        Building Blocks (bb-payment, bb-identity, bb-messaging)
                      </span>
                      <ArrowRight className="w-3 h-3 text-on-surface-variant" />
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      Capacidades modulares reutilizables para pagos, identidad distrital,
                      mensajería, entre otros.
                    </span>
                  </Link>


                </div>
              </div>

              <Link
                href="/soluciones-compartidas"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-[5px] bg-surface-container-low hover:bg-surface-container text-xs font-heading font-semibold text-tertiary transition-colors border border-surface-container-high min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
              >
                <span>Ver Soluciones Compartidas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* HABILITADOR 3: INTEROPERABILIDAD POR DISEÑO */}
            <div className="p-6 sm:p-7 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Code2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                    Interoperabilidad
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Facilitamos el principio de "Una Sola Vez". Los sistemas se comunican entre sí para que la ciudadanía no tenga que llevar documentos de una oficina a otra.

                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-[8px] bg-surface-container-low border border-surface-container-high/60 flex items-start gap-2">
                    <Terminal className="w-4 h-4 text-on-surface shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-semibold text-primary">
                        SDK Distrital (@bogota/bb-interop)
                      </span>
                      <p className="text-[11px] text-on-surface-variant">
                        Conectores para agilizar desarrollos.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-[8px] bg-surface-container-low border border-surface-container-high/60 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-on-surface">
                        Catálogo Distrital de APIs
                      </span>
                      <p className="text-[11px] text-on-surface-variant">
                        Especificaciones y contratos de datos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/soluciones-compartidas/sdk-interop"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-[5px] bg-surface-container-low hover:bg-surface-container text-xs font-heading font-semibold text-emerald-800 transition-colors border border-surface-container-high min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
              >
                <span>Usar SDK Distrital</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: RUTAS DE ADOPCIÓN (POR PERFIL) */}
        <section id="rutas-adopcion" className="scroll-mt-28 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-on-surface">
              ¿Cómo utilizar Bogotá Stack?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
              Encuentra los recursos, guías y herramientas específicas para tu labor diaria en el Distrito:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* RUTA 1: DIRECTIVOS Y LÍDERES */}
            <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest border-2 border-primary/20 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-full pointer-events-none" />

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-[10px] bg-primary text-white shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-primary/10 text-primary text-xs font-bold uppercase">
                    Gobernanza y Dirección de TI
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-xl font-bold text-on-surface">
                    Estrategia y toma de decisiones
                  </h3>
                  <div className="p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high/60">
                    <span className="text-xs font-bold text-primary block mb-0.5">Objetivo:</span>
                    <p className="text-xs text-on-surface font-medium leading-relaxed">
                      Garantizar valor público y simplificar la relación entre la entidad y la ciudadanía.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-on-surface tracking-wide uppercase">
                    Recursos clave:
                  </span>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        Descubre cómo el uso de Building Blocks{" "}
                        <strong className="text-on-surface">
                          reduce costos de desarrollo y licenciamiento en hasta un 70%
                        </strong>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        Conoce los{" "}
                        <strong className="text-on-surface">
                          criterios jurídicos y funcionales
                        </strong>{" "}
                        de una &ldquo;Entidad Integrada&rdquo; (Decreto 640 de 2025).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        Consulta la{" "}
                        <Link
                          href="/guias-de-vinculacion/integracion-distrital"
                          className="font-semibold text-primary underline hover:text-primary-hover"
                        >
                          Guía de Integración Distrital
                        </Link>{" "}
                        para planificar la madurez de tus trámites y la{" "}
                        <Link
                          href="/soluciones-compartidas"
                          className="font-semibold text-primary underline hover:text-primary-hover"
                        >
                          Guía de Adopción de Building Blocks
                        </Link>
                        .
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-high">
                <Link
                  href="/guias-de-vinculacion/integracion-distrital"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-[5px] bg-primary text-white text-xs font-heading font-semibold hover:bg-primary-hover transition-colors shadow-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
                >
                  <span>Consultar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* RUTA 2: DISEÑADORES UX/UI */}
            <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest border-2 border-tertiary/20 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-tertiary/5 rounded-bl-full pointer-events-none" />

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-[10px] bg-tertiary text-white shadow-sm">
                    <Palette className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-tertiary/10 text-tertiary text-xs font-bold uppercase">
                    Experiencia &amp; Accesibilidad
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-xl font-bold text-on-surface">
                    Diseño UX/UI y Redacción
                  </h3>
                  <div className="p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high/60">
                    <span className="text-xs font-bold text-tertiary block mb-0.5">Objetivo:</span>
                    <p className="text-xs text-on-surface font-medium leading-relaxed">
                      Crear interfaces consistentes, intuitivas y centradas en la ciudadanía.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-on-surface tracking-wide uppercase">
                    Recursos clave:
                  </span>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        Accede a{" "}
                        <strong className="text-on-surface">componentes de diseño</strong> listos para usar.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        Usa los componentes bajo los <strong>patrones de interacción </strong>
                        detallados en la{" "}
                        <Link
                          href="/guias-de-vinculacion/diseno-y-usabilidad"
                          className="font-semibold text-tertiary underline hover:text-primary"
                        >
                          Guía de Diseño y Usabilidad
                        </Link>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        Adopta las <strong>pautas de redacción</strong> para explicar requisitos y evitar mensajes de error confusos,
                        de la{" "}
                        <Link
                          href="/guias-de-vinculacion"
                          className="font-semibold text-tertiary underline hover:text-primary"
                        >
                          Guía de Contenido y Lenguaje Claro
                        </Link>{" "}
                        y la{" "}
                        <Link
                          href="/kit-ui/colores"
                          className="font-semibold text-tertiary underline hover:text-primary"
                        >
                          Guía de Accesibilidad Digital
                        </Link>
                        .
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-high">
                <Link
                  href="/kit-ui/colores"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-[5px] bg-tertiary text-white text-xs font-heading font-semibold hover:bg-tertiary/90 transition-colors shadow-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
                >
                  <span>Explorar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* RUTA 3: DESARROLLADORES E INGENIEROS */}
            <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest border-2 border-emerald-600/30 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-[10px] bg-emerald-800 text-white shadow-sm">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Dev &amp; SDK
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-xl font-bold text-on-surface">
                    Desarrollo e Implementación
                  </h3>
                  <div className="p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high/60">
                    <span className="text-xs font-bold text-emerald-800 block mb-0.5">
                      Objetivo:
                    </span>
                    <p className="text-xs text-on-surface font-medium leading-relaxed">
                      Conectar las soluciones digitales de tu entidad con las APIs y componentes del Distrito.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-on-surface tracking-wide uppercase">
                    Recursos clave:
                  </span>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        <strong>Librerías listas:</strong> Web Components, Building Blocks y ejemplos de integración.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        Consumo del SDK y APIs de interoperabilidad (
                        <strong className="text-on-surface">RESTful, xRoad, SOAP</strong>).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>
                        Consulta la{" "}
                        <Link
                          href="/soluciones-compartidas/sdk-interop"
                          className="font-semibold text-emerald-800 underline hover:text-emerald-900"
                        >
                          Guía de Interoperabilidad Distrital
                        </Link>
                        , la{" "}
                        <Link
                          href="/soluciones-compartidas/autenticacion"
                          className="font-semibold text-emerald-800 underline hover:text-emerald-900"
                        >
                          Guía de Vinculación Autenticación
                        </Link>{" "}
                        y el módulo de{" "}
                        <Link
                          href="/developer-kit"
                          className="font-semibold text-emerald-800 underline hover:text-emerald-900"
                        >
                          Developer KIT
                        </Link>{" "}
                        para ejemplos de código vivos.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-high">
                <Link
                  href="/soluciones-compartidas"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-[5px] bg-primary text-white text-xs font-heading font-semibold hover:bg-primary-hover transition-colors shadow-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
                >
                  <span>Explorar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: PRINCIPIOS MANDATORIOS DEL BOGOTÁ STACK */}
        <section id="principios-mandatorios" className="scroll-mt-28 flex flex-col gap-6">
          <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-2.5 text-primary">
              <ShieldCheck className="w-6 h-6" />
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  Principios de Bogotá Stack
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                  Directrices para todas las entidades distritales bajo el Decreto
                  XXX de 2026.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2 p-5 rounded-[10px] bg-surface-container-low border border-surface-container-high/60">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="font-heading font-bold text-sm text-primary">
                    La información viaja, no la ciudadanía
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  No solicites documentos ni certificados que otra entidad distrital ya tenga (como documento de identidad, datos de catastro o registros públicos). Consulta esa información de forma automática entre sistemas.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-5 rounded-[10px] bg-surface-container-low border border-surface-container-high/60">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="font-heading font-bold text-sm text-tertiary">
                    Siempre ofrecer una solución clara
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Si ocurre un error, se rechaza un archivo o falla un pago, indícale a la persona con exactitud qué pasó, cómo corregirlo y conserva la información que ya diligenció para que no empiece desde cero.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-5 rounded-[10px] bg-surface-container-low border border-surface-container-high/60">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span className="font-heading font-bold text-sm text-on-surface">
                    Trazabilidad
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Eliminar la incertidumbre sobre el estado de un trámite o solicitud. La ciudadanía sabe en todo momento quién tiene su solicitud, en qué etapa va el proceso y la fecha exacta en la que recibirá su respuesta oficial.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
