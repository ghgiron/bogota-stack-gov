import { GuidesSidebarNav } from "@/components/guias/GuidesSidebarNav";
import { HorizontalMomentsAxis } from "@/components/guias/HorizontalMomentsAxis";
import { VerticalStepperPlayground } from "@/components/guias/VerticalStepperPlayground";
import { getGuias } from "@/lib/firebase/db";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Database,
  FileCheck,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  Lock,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Guía 1.2: Guía de Diseño y Usabilidad | Bogotá Stack",
  description:
    "Estándar distrital de diseño centrado en el ciudadano, insights de investigación de iBO, modelo navegación, principios Once-Only y reglas de UX writing.",
};

export default async function GuiaDisenoUsabilidadPage() {
  const allGuias = await getGuias();

  // Guías adyacentes para el footer de navegación
  const prevGuide = allGuias.find(
    (g) => g.slug === "arquitectura-integracion" || g.number === "1.2",
  );
  const nextGuide = allGuias.find((g) => g.slug === "kit-ui-bogota" || g.number === "1.4");

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
              Guía 1.3: Diseño y Usabilidad para Integración
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Layout Principal a Dos Columnas */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Menú Lateral de Navegación Intacto */}
          <GuidesSidebarNav activeGuideSlug="diseno-y-usabilidad" guides={allGuias} />

          {/* Panel de Contenido Principal */}
          <main className="flex-1 min-w-0 flex flex-col gap-8 w-full">
            {/* HERO PRINCIPAL DE LA GUÍA 1.3 */}
            <article className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-body">
                <span className="inline-flex items-center gap-1.5 font-bold text-primary">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>GUÍA TÉCNICA DISTRITAL</span>
                </span>
                <div className="flex items-center gap-2 text-on-surface-variant font-medium flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-primary/10 text-primary font-bold border border-primary/20 font-heading text-[11px]">
                    Diseño y UX
                  </span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] font-bold border border-[#1B7A2E]/30 font-heading text-[11px]">
                    WCAG 2.2 AA
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-primary text-white flex items-center justify-center font-heading font-extrabold text-sm sm:text-base shadow-xs shrink-0">
                    1.3
                  </span>
                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                    Guía de Diseño y Usabilidad
                  </h1>
                </div>
                <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  Estándar distrital de diseño centrado en el ciudadano fundamentado en los hallazgos de campo del{" "}
                  <strong>Laboratorio de Innovación Pública (iBO)</strong>, el modelo de navegación
                  estandar, la simplificación y el
                  principio Once-Only.
                </p>
              </div>

              {/* Ficha de Metadatos Rápidos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-surface-container-high/60 bg-surface-container-low/50 rounded-[10px] p-4 font-body">
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Audiencia
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-on-surface font-heading truncate block">
                    UX / UI, Producto &amp; Frontend
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Última Actualización
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-on-surface truncate block">
                    Septiembre 2026
                  </span>
                </div>
              </div>
            </article>

            {/* SECCIÓN 1: EL CONTEXTO CIUDADANO (POR QUÉ DISEÑAMOS ASÍ) */}
            <section
              id="contexto-ciudadano"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Investigación iBO
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  1. El Contexto Ciudadano: Por Qué Diseñamos Así
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  En el Distrito, el diseño de interfaces de usuario no es un asunto meramente
                  estético, sino una labor que realizados y validamos con la ciudadanía.
                </p>
              </div>

              {/* Grid de Insights de Investigación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                {/* Insight 2: Ventanilla no tan única */}
                <div className="bg-surface-container-low/70 rounded-[15px] p-5 border border-surface-container-high flex flex-col justify-between hover:border-[#FAB62D]/60 transition-colors">
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-[8px] bg-[#FEF9E7] text-[#B37B00] flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-on-surface">
                        Una ventanilla no tan única
                      </h3>
                      <span className="text-[11px] font-bold text-[#B37B00] uppercase tracking-wider">
                        El &ldquo;Ping-Pong&rdquo;
                      </span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      Los usuarios sufren un agotador rebote entre diferentes secretarías y
                      sitios web con navegaciones diferentes y poco claras. Además, se ven obligados a crear
                      cuentas y loguearse solo para consultar requisitos o costos preliminares.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container-high/60 text-[11px] text-[#B37B00] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Usabilidad</span>
                  </div>
                </div>

                {/* Insight 3: Datos SEO de Impacto */}
                <div className="bg-surface-container-low/70 rounded-[15px] p-5 border border-surface-container-high flex flex-col justify-between hover:border-[#0049AE]/40 transition-colors">
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-[8px] bg-[#EBF2FC] text-[#0049AE] flex items-center justify-center shrink-0">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-on-surface">
                        Datos SEO
                      </h3>
                      <span className="text-[11px] font-bold text-[#0049AE] uppercase tracking-wider">
                        Comportamiento
                      </span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      <strong>El 80% del tráfico llega directamente desde Google</strong> a enlaces
                      internos de las páginas de trámites; solo el <strong>6%</strong> utiliza el buscador del
                      portal.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container-high/60 text-[11px] text-[#0049AE] font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Optimización de contenido para SEO</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: LOS 8 MANDAMIENTOS DE DISEÑO (iBO) */}
            <section
              id="mandamientos-ibo"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Innovación Pública
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  2. Los 8 Mandamientos de Diseño (iBO)
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  Principios para todas las entidades
                  distritales que integren trámites o servicios:
                </p>
              </div>

              {/* Grid 4x2 de Mandamientos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1 */}
                <div className="bg-surface-container-low/60 rounded-[12px] p-4 border border-surface-container-high flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <span className="text-xs font-mono font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded w-fit">
                    01
                  </span>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Favorecerás la lógica ciudadana
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Estructura el trámite según el modelo mental del usuario, nunca según el
                    organigrama interno ni los procedimientos de la entidad.
                  </p>
                </div>

                {/* 2 */}
                <div className="bg-surface-container-low/60 rounded-[12px] p-4 border border-surface-container-high flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <span className="text-xs font-mono font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded w-fit">
                    02
                  </span>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    No usarás un lenguaje confuso
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Erradica el &ldquo;bogotano burocrático&rdquo;, citas de leyes incomprensibles y
                    siglas opacas. Si un joven de 14 años no lo entiende, se reescribe.
                  </p>
                </div>

                {/* 3 */}
                <div className="bg-surface-container-low/60 rounded-[12px] p-4 border border-surface-container-high flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <span className="text-xs font-mono font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded w-fit">
                    03
                  </span>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Reglas claras desde el inicio
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Costo real ($0 o tarifa), tiempo exacto de resolución y requisitos explícitos
                    visibles antes de pulsar el primer botón de inicio.
                  </p>
                </div>

                {/* 4 */}
                <div className="bg-surface-container-low/60 rounded-[12px] p-4 border border-surface-container-high flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <span className="text-xs font-mono font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded w-fit">
                    04
                  </span>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    No dilatarás la navegación
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Cero clics innecesarios. Elimina pantallas de bienvenida decorativas, banners
                    corporativos vacíos y preguntas redundantes.
                  </p>
                </div>

                {/* 5 */}
                <div className="bg-surface-container-low/60 rounded-[12px] p-4 border border-surface-container-high flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <span className="text-xs font-mono font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded w-fit">
                    05
                  </span>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    No harás oídos sordos
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Retroalimentación instantánea ante cada clic o error. Si algo falla, el sistema
                    debe ofrecer una ruta de rescate o contacto humano asistido.
                  </p>
                </div>

                {/* 6 */}
                <div className="bg-surface-container-low/60 rounded-[12px] p-4 border border-surface-container-high flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <span className="text-xs font-mono font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded w-fit">
                    06
                  </span>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Cumplirás la expectativa del canal
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Si el trámite se promociona como &ldquo;100% en línea&rdquo;, está prohibido
                    exigir al final presentarse físicamente para radicar copia impresa.
                  </p>
                </div>

                {/* 7 */}
                <div className="bg-surface-container-low/60 rounded-[12px] p-4 border border-surface-container-high flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <span className="text-xs font-mono font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded w-fit">
                    07
                  </span>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Santificarás la seguridad
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Autenticación segura vía Keycloak SSO, cifrado en tránsito y estricto respeto de
                    la Ley de Habeas Data y privacidad de datos ciudadana.
                  </p>
                </div>

                {/* 8 */}
                <div className="bg-surface-container-low/60 rounded-[12px] p-4 border border-surface-container-high flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <span className="text-xs font-mono font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded w-fit">
                    08
                  </span>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Somos los dos (Eficiencia mutua)
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    El tiempo del ciudadano y el del servidor público valen lo mismo. Un formulario
                    bien diseñado previene miles de quejas y reprocesos.
                  </p>
                </div>
              </div>
            </section>

            {/* SECCIÓN 3: EL MODELO BIDIMENSIONAL DE NAVEGACIÓN */}
            <section
              id="modelo-bidimensional"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-8"
            >
              <div>
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Experiencia de usuario
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  3. Estandar de Navegación
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  Para estandarizar la experiencia de usaurio al realizar trámites en el Distrito, Bogotá Stack adopta un
                  modelo en dos dimensiones: el <strong>Eje Horizontal</strong> estructura los
                  5 momentos de vida de un trámite, mientras que el{" "}
                  <strong>Eje Vertical</strong> orquesta la ejecución paso a paso y el uso de componentes reutilizables del Portal Transaccional
                </p>
              </div>

              {/* PARTE A: EJE HORIZONTAL (LOS 5 MOMENTOS SUIT) */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    A
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-on-surface">
                      Eje Horizontal: Los 5 momentos de la experiencia
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Secuencia de interacción desde el descubrimiento hasta el cierre
                      definitivo del trámite.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                  {/* Momento 0 */}
                  <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">00</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                        Público
                      </span>
                    </div>
                    <h4 className="font-heading text-sm font-bold text-on-surface">0. Conozco</h4>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      Ficha única de la oferta: requisitos, tarifas, tiempo estimado y botón directo
                      de inicio. No exige autenticación.
                    </p>
                  </div>

                  {/* Momento 1 */}
                  <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-tertiary">01</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">
                        Auth
                      </span>
                    </div>
                    <h4 className="font-heading text-sm font-bold text-on-surface">1. Preparo</h4>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      Alistamiento previo: verificación automática de prerrequisitos, autenticación (opcional)
                    </p>
                  </div>

                  {/* Momento 2 */}
                  <div className="p-4 rounded-[12px] bg-primary/5 border border-primary/30 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">02</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-primary px-2 py-0.5 rounded">
                        Transacción
                      </span>
                    </div>
                    <h4 className="font-heading text-sm font-bold text-primary">
                      2. Hago Mi Solicitud
                    </h4>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      Formulario vertical Once-Only, carga de documentos y pagos distritales
                      (bb-payment).
                    </p>
                  </div>

                  {/* Momento 3 */}
                  <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-tertiary">03</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">
                        Seguimiento
                      </span>
                    </div>
                    <h4 className="font-heading text-sm font-bold text-on-surface">3. Gestiono</h4>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      Trazabilidad del trámite, gestión de citas, subsanaciones y
                      notificaciones por SMS/WhatsApp.
                    </p>
                  </div>

                  {/* Momento 4 */}
                  <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#1B7A2E]">04</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B7A2E] bg-[#EAF5EC] px-2 py-0.5 rounded">
                        Cierre
                      </span>
                    </div>
                    <h4 className="font-heading text-sm font-bold text-on-surface">4. Respuesta</h4>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      Descarga del resultado final, documento y valora la  experiencia.
                    </p>
                  </div>
                </div>


              </div>

              {/* PARTE B: EJE VERTICAL (EL STEPPER TRANSACCIONAL) */}
              <div className="flex flex-col gap-4 pt-6 border-t border-surface-container-high">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    B
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-on-surface">
                      Eje Vertical: Pasos del trámite por cada momento de experiencia
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Descomposición progresiva de la carga cognitiva para evitar formularios
                      &ldquo;extensos&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-[#FEF9E7] border border-[#FAB62D]/60 rounded-[12px] p-4 text-xs sm:text-sm text-[#594000] flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#B37B00] shrink-0 mt-0.5" />
                  <div>
                    <strong>Regla de Usabilidad Distrital:</strong> Si un formulario supera los 5
                    campos o requiere anexos técnicos, no se debe presentar en un sola
                    página. Debe utilizarse el Stepper Vertical con secciones
                    colapsables y los 4 estados canónicos:
                  </div>
                </div>

                {/* Tabla de 4 Estados del Stepper */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-[10px] bg-[#EAF5EC] border border-[#1B7A2E]/30 flex flex-col gap-1">
                    <span className="font-heading font-bold text-xs text-[#1B7A2E] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> 1. Completado
                    </span>
                    <span className="text-[11px] text-[#0A3D14] leading-relaxed">
                      Check verde, sección colapsada con resumen de datos y botón
                      &ldquo;Editar&rdquo;.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-primary/10 border border-primary/30 flex flex-col gap-1">
                    <span className="font-heading font-bold text-xs text-primary flex items-center gap-1.5">
                      <Zap className="w-4 h-4" /> 2. En Curso
                    </span>
                    <span className="text-[11px] text-on-surface leading-relaxed">
                      Paso activo expandido con foco en el primer input, validación en caliente y
                      CTA de avance.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-surface-container-low border border-surface-container-high flex flex-col gap-1 opacity-70">
                    <span className="font-heading font-bold text-xs text-on-surface-variant flex items-center gap-1.5">
                      <Lock className="w-4 h-4" /> 3. Pendiente
                    </span>
                    <span className="text-[11px] text-on-surface-variant leading-relaxed">
                      Bloqueado y atenuado hasta que el usuario complete válidamente el paso
                      precedente.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-[#FEF9E7] border border-[#FAB62D]/60 flex flex-col gap-1">
                    <span className="font-heading font-bold text-xs text-[#B37B00] flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> 4. Subsanación
                    </span>
                    <span className="text-[11px] text-[#594000] leading-relaxed">
                      Tag amarillo de alerta señalando el campo o documento específico que la
                      entidad rechazó.
                    </span>
                  </div>
                </div>

                {/* Componente interactivo del Stepper */}
                <div className="mt-3">
                  <VerticalStepperPlayground />
                </div>
              </div>
            </section>

            {/* SECCIÓN 4: PRINCIPIOS TRANSACCIONALES OBLIGATORIOS */}
            <section
              id="principios-transaccionales"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>

                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  4. Principios Transaccionales
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  Para garantizar la interoperabilidad y eliminar la carga cognitiva al
                  ciudadano, todo trámite debe implementar estos dos mecanismos técnicos:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Principio Once-Only */}
                <div className="bg-surface-container-low/70 rounded-[15px] p-6 border border-surface-container-high flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-[8px] bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-on-surface">
                        Solo Una Vez (Once-Only)
                      </h3>

                    </div>
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      El ciudadano <strong>no debe ingresar datos que el Distrito ya posee</strong>{" "}
                      ni adjuntar documentos expedidos por otras entidades públicas (fotocopia de cédula
                      al 150%, certificado de existencia y representación, antecedentes, RUT, etc).
                    </p>
                    <ul className="text-xs text-on-surface-variant space-y-1.5 list-disc pl-4 mt-1 font-body">
                      <li>Precarga automática de datos de identidad al autenticarse.</li>
                      <li>Consultas de información complementarioa vía SDK Distrital.</li>
                      <li>
                        Campos precargados bloqueados en modo solo lectura para evitar digitación
                        errónea.
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Orquestación y Borradores */}
                <div className="bg-surface-container-low/70 rounded-[15px] p-6 border border-surface-container-high flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-[8px] bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-on-surface">
                        Persistencia asíncrona
                      </h3>

                    </div>
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      Cada avance en el los momentos de la experiencia transaccional, sincroniza automáticamente en el
                      EventStore. Si el trámite exige una inspección presencial en campo o cita
                      presencial, el sistema activa el estado de{" "}
                      <strong>&ldquo;Guardado parcial&rdquo;</strong>.
                    </p>
                    <ul className="text-xs text-on-surface-variant space-y-1.5 list-disc pl-4 mt-1 font-body">
                      <li>
                        Autoguardado sin necesidad que el usuario presione "Guardar".
                      </li>
                      <li>Generación de notificaciones.</li>
                      <li>
                        Reanudación inmediata en el paso exacto con un solo clic, sin perder
                        avances.
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </section>

            {/* SECCIÓN 5: REGLAS DE UX WRITING (EJEMPLOS PRÁCTICOS) */}
            <section
              id="ux-writing"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>

                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  5. Reglas de UX Writing
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  El lenguaje es la primera interfaz. Transforma la redacción
                  tradicional en microcopy empático, claro y en voz activa utilizando estos patrones
                  de comparación:
                </p>
              </div>

              {/* Casos Comparativos Antes / Después */}
              <div className="flex flex-col gap-5">
                {/* Caso 1: Sujeto Activo */}
                <div className="border border-surface-container-high rounded-[15px] overflow-hidden flex flex-col">
                  <div className="bg-surface-container-low px-5 py-3 border-b border-surface-container-high flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-on-surface">
                      Caso 1: Sujeto Activo (Hablarle directamente a la persona)
                    </span>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Voz Activa (&ldquo;Tú&rdquo;)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-surface-container-high">
                    {/* Antes */}
                    <div className="p-5 bg-[#FDF2F4]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#CC0E35] font-heading font-bold text-xs">
                        <XCircle className="w-4 h-4" />
                        <span>Antes / Burocrático</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-on-surface italic leading-relaxed">
                        &ldquo;El solicitante deberá consignar la información requerida en los
                        acápites correspondientes so pena de rechazo.&rdquo;
                      </p>
                      <span className="text-[11px] text-[#5C0617] mt-1">
                        ❌ Distante, punitivo y en tercera persona.
                      </span>
                    </div>

                    {/* Después */}
                    <div className="p-5 bg-[#EAF5EC]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#1B7A2E] font-heading font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Después / Lenguaje Ciudadano</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
                        &ldquo;Ingresa tus datos personales y revisa que tu correo sea el correcto
                        para recibir las actualizaciones de tu trámite.&rdquo;
                      </p>
                      <span className="text-[11px] text-[#0A3D14] mt-1 font-semibold">
                        ✅ Claro, orientador y enfocado en el beneficio del ciudadano.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caso 2: Error Técnico */}
                <div className="border border-surface-container-high rounded-[15px] overflow-hidden flex flex-col">
                  <div className="bg-surface-container-low px-5 py-3 border-b border-surface-container-high flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-on-surface">
                      Caso 2: Mensajes de Error y Validación
                    </span>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Diagnóstico + Solución
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-surface-container-high">
                    {/* Antes */}
                    <div className="p-5 bg-[#FDF2F4]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#CC0E35] font-heading font-bold text-xs">
                        <XCircle className="w-4 h-4" />
                        <span>Antes / Burocrático</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-on-surface italic leading-relaxed">
                        &ldquo;Error 403: El documento cargado excede el buffer máximo permitido por
                        la pasarela de ingesta multipart.&rdquo;
                      </p>
                      <span className="text-[11px] text-[#5C0617] mt-1">
                        ❌ Jerga técnica que no explica cómo resolver el problema.
                      </span>
                    </div>

                    {/* Después */}
                    <div className="p-5 bg-[#EAF5EC]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#1B7A2E] font-heading font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Después / Lenguaje Ciudadano</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
                        &ldquo;El archivo es demasiado pesado. Tu documento pesa 12 MB y el tamaño
                        máximo permitido es 10 MB. Comprímelo o guarda una versión en PDF
                        ligero.&rdquo;
                      </p>
                      <span className="text-[11px] text-[#0A3D14] mt-1 font-semibold">
                        ✅ Indica la causa precisa y la solución accionable al instante.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caso 3: Confirmación Jurada */}
                <div className="border border-surface-container-high rounded-[15px] overflow-hidden flex flex-col">
                  <div className="bg-surface-container-low px-5 py-3 border-b border-surface-container-high flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-on-surface">
                      Caso 3: Declaraciones y Confirmaciones
                    </span>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Compromiso Claro
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-surface-container-high">
                    {/* Antes */}
                    <div className="p-5 bg-[#FDF2F4]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#CC0E35] font-heading font-bold text-xs">
                        <XCircle className="w-4 h-4" />
                        <span>Antes / Burocrático</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-on-surface italic leading-relaxed">
                        &ldquo;El suscrito manifiesta bajo gravedad de juramento que la información
                        suministrada es verídica y se acoge a las sanciones tipificadas en el Código
                        Penal.&rdquo;
                      </p>
                      <span className="text-[11px] text-[#5C0617] mt-1">
                        ❌ Intimidante, formulismo legalista innecesario para la web.
                      </span>
                    </div>

                    {/* Después */}
                    <div className="p-5 bg-[#EAF5EC]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#1B7A2E] font-heading font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Después / Lenguaje Ciudadano</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
                        &ldquo;Confirma tu declaración. Al hacer clic en este botón, confirmas que
                        los datos que ingresaste son reales y completos.&rdquo;
                      </p>
                      <span className="text-[11px] text-[#0A3D14] mt-1 font-semibold">
                        ✅ Válido legalmente, respetuoso y fácil de comprender.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caso 4: Radicación y Acuse */}
                <div className="border border-surface-container-high rounded-[15px] overflow-hidden flex flex-col">
                  <div className="bg-surface-container-low px-5 py-3 border-b border-surface-container-high flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-on-surface">
                      Caso 4: Radicación y Acuse de Recibo
                    </span>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Cierre con Certidumbre
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-surface-container-high">
                    {/* Antes */}
                    <div className="p-5 bg-[#FDF2F4]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#CC0E35] font-heading font-bold text-xs">
                        <XCircle className="w-4 h-4" />
                        <span>Antes / Burocrático</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-on-surface italic leading-relaxed">
                        &ldquo;Se ha generado la petición PQRSD con código de radicación
                        alfanumérico 2026-ER-0098432 en el sistema de gestión documental
                        distrital.&rdquo;
                      </p>
                      <span className="text-[11px] text-[#5C0617] mt-1">
                        ❌ Frío, impersonal y no indica qué sigue ni cuándo habrá respuesta.
                      </span>
                    </div>

                    {/* Después */}
                    <div className="p-5 bg-[#EAF5EC]/40 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#1B7A2E] font-heading font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Después / Lenguaje Ciudadano</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
                        &ldquo;¡Recibimos tu solicitud! Tu número de radicado es 2026-ER-0098432.
                        Guardamos una copia en tu correo y te daremos respuesta antes del 28 de
                        agosto.&rdquo;
                      </p>
                      <span className="text-[11px] text-[#0A3D14] mt-1 font-semibold">
                        ✅ Calidez cívica, comprobante claro y compromiso de fecha concreta.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* NAVEGACIÓN ANTERIOR / SIGUIENTE ENTRE GUÍAS */}
            <nav
              aria-label="Navegación secuencial entre guías"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-surface-container-high"
            >
              {prevGuide ? (
                <Link
                  href={`/guias-de-vinculacion/${prevGuide.slug}`}
                  className="p-4 rounded-[12px] bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high transition-colors flex items-center gap-3 group"
                >
                  <ArrowLeft className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider block">
                      Guía Anterior
                    </span>
                    <span className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate block">
                      {prevGuide.numeroIdentificador || prevGuide.number} -{" "}
                      {prevGuide.titulo || prevGuide.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextGuide ? (
                <Link
                  href={`/guias-de-vinculacion/${nextGuide.slug}`}
                  className="p-4 rounded-[12px] bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high transition-colors flex items-center justify-between gap-3 text-right group ml-auto w-full sm:w-auto sm:min-w-[240px]"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider block">
                      Siguiente Guía
                    </span>
                    <span className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate block">
                      {nextGuide.numeroIdentificador || nextGuide.number} -{" "}
                      {nextGuide.titulo || nextGuide.title}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}
