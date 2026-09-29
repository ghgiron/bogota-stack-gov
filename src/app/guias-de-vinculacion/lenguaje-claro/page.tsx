import { GuidesSidebarNav } from "@/components/guias/GuidesSidebarNav";
import { LanguageClaroChecklist } from "@/components/guias/LanguageClaroChecklist";
import { PlainLanguageComparisonCard } from "@/components/guias/PlainLanguageComparisonCard";
import { getGuias } from "@/lib/firebase/db";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileCheck,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  Link2,
  ListOrdered,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Type,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Guía 1.5: Contenido y Lenguaje Claro | Bogotá Stack",
  description:
    "Manual técnico oficial de UX Writing y Lenguaje Claro para el Distrito. Pautas de redacción para la ciudadanía, lenguaje incluyente accesible, errores comunes y checklist de verificación.",
};

export default async function GuiaLenguajeClaroPage() {
  const allGuias = await getGuias();

  // Identificar guías adyacentes para el footer de navegación
  const prevGuide = allGuias.find(
    (g) => g.slug === "kit-ui-bogota" || g.slug === "kit-ui" || g.number === "1.4",
  );
  const nextGuide = allGuias.find(
    (g) =>
      g.slug === "interoperabilidad-distrital" ||
      g.slug === "interoperabilidad" ||
      g.number === "2.1",
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
              Guía 1.5: Contenido y Lenguaje Claro
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Layout Principal a Dos Columnas */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Sidebar Izquierdo: Dinámico con activeGuideSlug='lenguaje-claro' */}
          <GuidesSidebarNav activeGuideSlug="lenguaje-claro" guides={allGuias} />

          {/* Panel Derecho: Contenido de la Guía 1.5 */}
          <main className="flex-1 min-w-0 flex flex-col gap-8 w-full">
            {/* ENCABEZADO TÉCNICO HERO (Simulación Editor CMS Backoffice) */}
            <article className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6">
              {/* Barra de Badges de Estado */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-body">
                <span className="inline-flex items-center gap-1.5 font-bold text-primary">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>ESPECIFICACIÓN TÉCNICA DISTRITAL</span>
                </span>
                <div className="flex items-center gap-2 text-on-surface-variant font-medium flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-primary/10 text-primary font-bold border border-primary/20 font-heading text-[11px]">
                    UX Writing
                  </span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-[#EAF5EC] text-[#1B7A2E] font-bold border border-[#1B7A2E]/30 font-heading text-[11px]">
                    Inclusión y Accesibilidad
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-[#CC0E35] text-white font-bold text-[10px] uppercase tracking-wider font-heading">
                    En Lectura
                  </span>
                </div>
              </div>

              {/* Título Principal */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] bg-primary text-white flex items-center justify-center font-heading font-extrabold text-sm sm:text-base shadow-xs shrink-0">
                    1.5
                  </span>
                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight leading-tight">
                    Guía de Contenido y Lenguaje Claro
                  </h1>
                </div>
                <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  Estándar distrital de redacción para la ciudadanía, arquitectura de la información y microcopy
                  accesible. Su propósito es{" "}
                  <strong>
                    transformar el lenguaje jurídico-administrativo en una redacción empática,
                    directa y accesible
                  </strong>
                  , garantizando que la ciudadanía entienda desde la primera lectura qué debe hacer
                  y qué respuesta obtendrá de la administración.
                </p>
              </div>

              {/* Matriz de Atributos Técnicos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-surface-container-high/60 bg-surface-container-low/50 rounded-[10px] p-4 font-body">
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Audiencia
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-on-surface font-heading truncate block">
                    UX Writers, Diseñadores &amp; Servidores
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Base Metodológica
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-on-surface truncate block">
                    iBO, Obelisco &amp; Plain Language
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

            {/* SECCIÓN 1: VOZ Y TONO DISTRITAL */}
            <section
              id="voz-y-tono"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Identidad y Personalidad Cívica
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  1. Voz y Tono
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  La voz del Distrito Capital es constante: proyecta una administración pública{" "}
                  <strong>participativa, simple y transparente</strong>. Cada texto debe transmitir
                  que detrás de la pantalla existen personas reales dispuestas a resolver las
                  necesidades de la comunidad sin arrogancia burocrática.
                </p>
              </div>

              {/* Tarjetas de Dimensiones de Tono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Voz del Distrito */}
                <div className="bg-surface-container-low/70 rounded-[12px] p-5 border border-surface-container-high flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-[6px] bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-on-surface">
                    La Voz Institucional: Humana y Accesible
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Escribimos como habla una persona servicial y educada que orienta a otra en un
                    punto de atención. Descartamos la solemnidad jurídica excesiva y los formulismos
                    que levantan barreras de entrada.
                  </p>
                  <ul className="text-xs text-on-surface-variant space-y-1 list-disc pl-4 font-body mt-1">
                    <li>
                      <strong>Simple:</strong> Palabras de uso común antes que cultismos.
                    </li>
                    <li>
                      <strong>Transparente:</strong> Sin rodeos ni omisión de requisitos.
                    </li>
                    <li>
                      <strong>Empática:</strong> Reconoce el valor del tiempo ciudadano.
                    </li>
                  </ul>
                </div>

                {/* Tono Transaccional */}
                <div className="bg-surface-container-low/70 rounded-[12px] p-5 border border-surface-container-high flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-[6px] bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-on-surface">
                    El Tono Transaccional: Cercano, Conciso y Directo
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    En interfaces de trámites (formularios, pasarelas de pago, confirmaciones), el
                    tono se vuelve sumamente conciso. Guiamos la acción sin distraer con párrafos
                    explicativos innecesarios.
                  </p>
                  <div className="p-3 bg-surface-container-lowest rounded-[8px] border border-surface-container-high text-xs">
                    <strong className="text-primary block font-heading mb-1">
                      Regla de Oro: La Segunda Persona (&ldquo;Tú&rdquo;)
                    </strong>
                    <p className="text-on-surface-variant leading-relaxed">
                      Usa siempre la segunda persona del singular para guiar la interacción:
                      <br />❌{" "}
                      <em>&ldquo;El solicitante debe completar los campos del acápite.&rdquo;</em>
                      <br />✅{" "}
                      <strong>&ldquo;Completa tus datos personales para continuar.&rdquo;</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Callout de Excepción */}
              <div className="bg-[#FEF9E7] border border-[#FAB62D]/60 rounded-[12px] p-4 text-xs sm:text-sm text-[#594000] flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#B37B00] shrink-0 mt-0.5" />
                <div>
                  <strong>Excepción de Estilo:</strong> En comunicados de contingencia jurídica,
                  alertas de seguridad distrital o boletines formales de prensa, se permite el uso
                  de la tercera persona neutra (<em>&ldquo;La Alcaldía Mayor informa...&rdquo;</em>)
                  para salvaguardar el rigor legal y la neutralidad informativa.
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: PAUTAS DE ESCRITURA UX - ESCRIBIR PARA LA PANTALLA */}
            <section
              id="pautas-escritura"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Técnicas de Composición Digital
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  2. Pautas de Escritura UX: Escribir para la Pantalla
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  Las personas no leen las pantallas digitales de forma lineal; escanean en patrones
                  de &ldquo;F&rdquo; buscando palabras clave y señales de avance. Aplica estos 5
                  estándares en toda pantalla:
                </p>
              </div>

              {/* Grid de 5 Pautas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Pauta 1 */}
                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Títulos y Bajadas
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Cortos, directos y <strong>sin punto final</strong>. La bajada debe complementar
                    la información esencial del título, jamás repetirla con otras palabras.
                  </p>
                </div>

                {/* Pauta 2 */}
                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Pirámide Invertida
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Lo vital al inicio (Qué, Quién, Cuándo, Dónde, Por qué). Desarrolla los detalles
                    secundarios al final. Párrafos breves de máximo <strong>4 a 5 líneas</strong>.
                  </p>
                </div>

                {/* Pauta 3 */}
                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Enlaces Descriptivos
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    <strong>Nunca uses &ldquo;Clic aquí&rdquo;</strong> ni &ldquo;Ver más&rdquo;. El
                    enlace debe describir la acción y el destino (ej.{" "}
                    <em>&ldquo;Descarga el Decreto 640 de 2025 (PDF, 2 MB)&rdquo;</em>).
                  </p>
                </div>

                {/* Pauta 4 */}
                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Uso Quirúrgico de Negritas
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Resalta exclusivamente datos vitales:{" "}
                    <strong>fechas límite, montos en pesos o documentos exactos</strong>. Si
                    destacas párrafos enteros, la negrita pierde su función visual.
                  </p>
                </div>

                {/* Pauta 5 */}
                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2 md:col-span-2 lg:col-span-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    05
                  </div>
                  <h3 className="font-heading text-sm font-bold text-on-surface">
                    Viñetas y Listas para Escaneo Rápido
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Estructura siempre los requisitos, anexos o pasos sucesivos en listas con
                    viñetas en lugar de bloques de texto continuo. Esto acelera el tiempo de
                    comprensión ciudadana en más de un 40%.
                  </p>
                </div>
              </div>
            </section>

            {/* SECCIÓN 3: LENGUAJE INCLUYENTE Y LA REGLA DE "CIUDADANÍA" */}
            <section
              id="lenguaje-incluyente"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider block mb-1">
                  Inclusión
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  3. Lenguaje Incluyente y la regla de &ldquo;ciudadanía&rdquo;
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  La comunicación pública del Distrito debe incluir a toda la población sin recurrir
                  a símbolos que degraden la accesibilidad tecnológica.
                </p>
              </div>

              {/* ALERTA CRÍTICA: PROHIBICIÓN DE SÍMBOLOS */}
              <div
                role="alert"
                className="bg-[#FDF2F4] border border-[#CC0E35]/40 rounded-[12px] p-5 flex items-start gap-4 shadow-2xs font-body"
              >
                <AlertCircle
                  className="w-6 h-6 text-[#CC0E35] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#CC0E35] mb-1">
                    ALERTA TÉCNICA: Prohibición de &ldquo;@&rdquo;, &ldquo;x&rdquo; o
                    &ldquo;e&rdquo;
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C0617] leading-relaxed">
                    No <strong>se debe usar</strong> caracteres como{" "}
                    <em>tod@s, lxs ciudadanxs o compañeres</em> en portales distritales. Estos
                    recursos rompen el sintetizador de los lectores de pantalla utilizados por
                    personas ciegas (NVDA, JAWS, VoiceOver), impiden la indexación SEO y generan
                    confusión visual en personas mayores o con discapacidad cognitiva.
                  </p>
                </div>
              </div>

              {/* Técnicas Recomendadas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                  <span className="text-xs font-heading font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B7A2E]" /> Uso de &ldquo;La
                    Ciudadanía&rdquo;
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Sustituye de forma sistemática las fórmulas masculinizadas individuales (
                    <em>&ldquo;el ciudadano&rdquo;, &ldquo;los ciudadanos&rdquo;</em>) por el
                    sustantivo colectivo unificado <strong>&ldquo;la ciudadanía&rdquo;</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                  <span className="text-xs font-heading font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B7A2E]" /> Sustantivos Epicenos y
                    Colectivos
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Prefiere sustantivos neutros: <strong>la población</strong> (en vez de los
                    habitantes), <strong>el personal médico</strong> (en vez de los médicos),{" "}
                    <strong>el equipo de atención</strong> (en vez de los funcionarios).
                  </p>
                </div>

                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                  <span className="text-xs font-heading font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B7A2E]" /> Parafrasear Fórmulas
                    Antiguas
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Reemplaza fórmulas sesgadas:
                    <br />❌ <em>&ldquo;Bienvenido a Bogotá&rdquo;</em>
                    <br />✅ <strong>&ldquo;Te damos la bienvenida a Bogotá&rdquo;</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-[12px] bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
                  <span className="text-xs font-heading font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B7A2E]" /> Omitir el Sujeto Innecesario
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Aprovecha la voz directa del verbo:
                    <br />❌ <em>&ldquo;El usuario debe registrarse en la plataforma.&rdquo;</em>
                    <br />✅ <strong>&ldquo;Regístrate en la plataforma.&rdquo;</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* SECCIÓN 4: ERRORES COMUNES Y VICIOS DEL LENGUAJE */}
            <section
              id="errores-comunes"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>

                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  4. Errores comunes y vicios del lenguaje
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  Comparativas visuales para evitar las malas prácticas más frecuentes en
                  interfaces del Distrito:
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {/* Comparativa 1: Voz Pasiva vs Activa */}
                <PlainLanguageComparisonCard
                  category="Sintaxis y Estructura Verbal"
                  title="1. Voz Pasiva vs. Voz Activa"
                  description="La voz pasiva oculta quién ejecuta la acción y confunde la responsabilidad del paso."
                  dontText="Los formularios de liquidación serán diligenciados por la ciudadanía a través de la sede electrónica."
                  dontReason="Voz pasiva con futuro compuesto, distante y de lectura pesada."
                  doText="Diligencia el formulario de liquidación en línea para calcular el valor de tu impuesto."
                  doReason="Verbo en imperativo afirmativo, habla directamente al usuario y aclara el beneficio inmediato."
                />

                {/* Comparativa 2: Verborrea y Rodeos */}
                <PlainLanguageComparisonCard
                  category="Simplificar el Lenguaje"
                  title="2. Verbos Administrativos vs. Precisión "
                  description="Evita construcciones con perífrasis innecesarias que alargan la lectura sin sumar valor."
                  dontText="La ciudadanía ha venido pidiendo de forma reiterada que se proceda a dar trámite y atención oportuna a sus quejas."
                  dontReason="Uso de 'ha venido pidiendo' y 'proceda a dar trámite' (19 palabras vacías)."
                  doText="La ciudadanía ha solicitado atención oportuna a sus quejas."
                  doReason="Mensaje directo, económico (9 palabras) y sin pérdida de significado."
                />

                {/* Comparativa 3: Citas legales en botones */}
                <PlainLanguageComparisonCard
                  category="Microcopy de Controles UI"
                  title="3. Citas de Leyes en Botones vs. Consentimiento Claro"
                  description="Los botones de acción deben expresar la decisión del usuario, no citar numerales legales ininteligibles."
                  dontText="Aceptar y convenir en los términos y condiciones de la Ley Estatutaria 1581 de 2012."
                  dontReason="El usuario promedio no conoce el contenido exacto de los números de leyes."
                  doText="Acepto el tratamiento de mis datos personales"
                  doReason="Explica exactamente qué derecho está autorizando de forma transparente y legible."
                />

                {/* Comparativa 4: Mensajes de Error Constructivos */}
                <PlainLanguageComparisonCard
                  category="Manejo de Errores y Fricciones"
                  title="4. Mensajes de Error Útiles (1. Qué pasó, 2. Por qué, 3. Cómo solucionarlo)"
                  description="Jamás culpes al usuario con códigos de error crípticos. Ofrece siempre una solución ejecutable."
                  dontText="Operación fallida. Error 0x80040154 al validar el documento adjunto. Intente de nuevo más tarde."
                  dontReason="Código hexadecimal inútil, genera pánico y no explica qué archivo falló ni por qué."
                  doText="No pudimos cargar tu documento. El archivo supera los 10 MB permitidos. Comprímelo o sube una versión en PDF de menor tamaño."
                  doReason="Explica el motivo (peso del archivo) y la solución exacta (comprimir o reducir PDF)."
                />
              </div>
            </section>

            {/* SECCIÓN 5: VERIFICACIÓN Y TESTEO */}
            <section
              id="verificacion-y-testeo"
              className="bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 shadow-xs border border-surface-container-high flex flex-col gap-6"
            >
              <div>

                <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                  5. Verificar, Iterar y Co-crear
                </h2>
                <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
                  Antes de publicar cualquier pantalla, funcionalidad o contenido, es necesario
                  verificar en campo con usuarios reales:
                </p>
              </div>

              {/* Checklist Interactivo */}
              <div className="w-full">
                <LanguageClaroChecklist />
              </div>

              {/* Metodología de Co-Creación: Levantar Alertas */}
              <div className="bg-surface-container-low/70 rounded-[12px] p-6 border border-surface-container-high flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[6px] bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-on-surface">
                    Identificar &ldquo;identificar mejoras&rdquo; (Testeo en Red CADE)
                  </h3>
                </div>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Para validar el contenido en interfaces y experiencia de usuario, los equipos de diseño deben
                  realizar pruebas presenciales con la ciudadanía:
                </p>
                <ol className="text-xs sm:text-sm text-on-surface-variant space-y-2 list-decimal pl-5 font-body">
                  <li>
                    <strong>Lectura en voz alta:</strong> Pide a la persona que lea la pantalla en
                    voz alta sin intervenir ni guiarla.
                  </li>
                  <li>
                    <strong>Notas adhesivas (Alertas):</strong> Cuando la persona dude, relea una
                    frase o tropiece con un tecnicismo, marca la palabra con una nota adhesiva.
                  </li>
                  <li>
                    <strong>Pregunta:</strong>
                    <em>
                      &ldquo;Con tus propias palabras, ¿qué entendiste que debes hacer ahora?&rdquo;
                    </em>
                    . Si la respuesta no es inmediata, el texto debe reescribirse.
                  </li>

                </ol>
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
