import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  FileCode2,
  HelpCircle,
  Percent,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function IaiFormulaBox() {
  const variables = [
    {
      symbol: "N",
      weight: "30%",
      name: "Impacto en Negocio y Ciudadanía",
      desc: "Volumen transaccional proyectado, cantidad de usuarios beneficiarios, criticidad social y prioridad en el Plan Distrital de Desarrollo.",
    },
    {
      symbol: "T",
      weight: "25%",
      name: "Complejidad Tecnológica",
      desc: "Arquitectura actual del sistema origen, nivel de desacoplamiento, deuda técnica heredada y disponibilidad de APIs RESTful.",
    },
    {
      symbol: "S",
      weight: "20%",
      name: "Seguridad y Privacidad de la Información",
      desc: "Sensibilidad de datos personales (Habeas Data Ley 1581/2012), clasificación de activos, confidencialidad y requerimiento de mTLS.",
    },
    {
      symbol: "D",
      weight: "15%",
      name: "Dependencias Interinstitucionales",
      desc: "Nivel de interoperabilidad con otras entidades (RNEC, Catastro, DIAN, Secretaría General, BOGDATA) para validaciones automáticas Once-Only.",
    },
    {
      symbol: "O",
      weight: "10%",
      name: "Disponibilidad Operativa y Soporte",
      desc: "Capacidad de monitoreo continuo, soporte de incidentes Nivel 2, infraestructura de réplicas y cumplimiento de SLA de 99.9%.",
    },
  ];

  const typologies = [
    {
      range: "< 30 pts",
      label: "Básica",
      badgeColor:
        "bg-surface-container-high text-on-surface-variant border-surface-container-highest",
      desc: "Integración informativa, redirección autenticada y consulta básica.",
      governance: "Acompañamiento estándar.",
    },
    {
      range: "30 - 60 pts",
      label: "Estándar",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      desc: "Integración de APIs REST, SSO distrital  y validaciones Once-Only.",
      governance: "Revisión técnica de arquitectura SGAB.",
    },
    {
      range: "60 - 80 pts",
      label: "Avanzada",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      desc: "Orquestación con pagos B-Pay, notificaciones, firma digital y mTLS.",
      governance: "Mesa de homologación prioritaria.",
    },
    {
      range: "≥ 80 pts",
      label: "Estratégica",
      badgeColor: "bg-primary/10 text-primary border-primary/30",
      desc: "Misión crítica distrital, arquitectura orientada a eventos, credenciales verificables y monitoreo BOGDATA.",
      governance: "Certificación mandatoria de Secretaría General.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 p-6 sm:p-8 rounded-[15px] bg-[#E3EEFC]/60 border border-tertiary/25 shadow-xs">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-tertiary">
            <Calculator className="w-5 h-5 text-tertiary" />
            <span className="text-xs font-bold uppercase tracking-wider text-tertiary">
              Modelo Matemático de Ponderación Distrital
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-[5px] bg-tertiary/10 text-tertiary text-xs font-semibold border border-tertiary/20">
            Algoritmo Oficial SGAB
          </span>
        </div>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
          Fórmula del Índice de Alcance de Integración (IAI)
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          El IAI cuantifica objetivamente el nivel de esfuerzo, criticidad y profundidad técnica
          requerida para que un servicio de cualquier entidad distrital sea homologado al Portal
          Transaccional.
        </p>
      </div>

      {/* Fórmula Visual Matemática */}
      <div className="w-full p-4 sm:p-5 rounded-[10px] bg-surface-container-lowest border border-tertiary/30 shadow-xs flex flex-col items-center justify-center text-center gap-2">
        <span className="text-[11px] font-heading font-semibold text-on-surface-variant uppercase tracking-wider">
          Ecuación Ponderada de Evaluación
        </span>
        <code className="font-mono text-base sm:text-xl lg:text-2xl font-bold text-tertiary tracking-tight">
          IAI = 0.30·N + 0.25·T + 0.20·S + 0.15·D + 0.10·O
        </code>
        <span className="text-xs text-on-surface-variant">
          Escala continua de 0 a 100 puntos ponderados
        </span>
      </div>

      {/* Desglose de Variables */}
      <div className="flex flex-col gap-3">
        <h4 className="font-heading text-sm font-bold text-on-surface">
          Variables y Ponderaciones del Modelo:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {variables.map((v) => (
            <div
              key={v.symbol}
              className="p-3.5 rounded-[10px] bg-surface-container-lowest border border-surface-container-high flex flex-col gap-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-tertiary text-white flex items-center justify-center font-mono text-xs font-bold">
                  {v.symbol}
                </span>
                <span className="px-2 py-0.5 rounded-[4px] bg-surface-container text-[11px] font-bold text-tertiary font-mono">
                  {v.weight}
                </span>
              </div>
              <span className="font-heading text-xs font-bold text-on-surface leading-tight mt-1">
                {v.name}
              </span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tipología de Integración según IAI */}
      <div className="flex flex-col gap-3 pt-2">
        <h4 className="font-heading text-sm font-bold text-on-surface">
          Tipologías de Integración según el Puntaje Obtenido:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {typologies.map((t) => (
            <div
              key={t.label}
              className="p-4 rounded-[10px] bg-surface-container-lowest border border-surface-container-high flex flex-col justify-between gap-3 shadow-2xs"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-heading text-sm font-bold text-on-surface">{t.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-[5px] text-[11px] font-bold font-mono border ${t.badgeColor}`}
                  >
                    {t.range}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{t.desc}</p>
              </div>
              <span className="text-[11px] font-semibold text-tertiary pt-2 border-t border-surface-container-high/60">
                {t.governance}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Callout de Acción hacia la Calculadora Interactiva de IAI */}
      <div className="p-4 rounded-[10px] bg-surface-container-lowest border border-tertiary/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-[8px] bg-primary/10 text-primary shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold text-on-surface">
              Adopción y Asistencia con IA Distrital
            </span>
            <span className="text-xs text-on-surface-variant">
              Conoce los lineamientos institucionales y solicita la integración del modelo oficial para tu entidad.
            </span>
          </div>
        </div>

        <Link
          href="/ia-distrital"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] bg-tertiary text-white text-xs font-heading font-semibold hover:bg-tertiary/90 transition-colors shadow-sm shrink-0 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
        >
          <span>Conocer IA Distrital</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
