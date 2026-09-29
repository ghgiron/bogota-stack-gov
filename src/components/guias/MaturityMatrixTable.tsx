import { CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";

export interface MaturityLevel {
  level: string;
  name: string;
  badgeColor: string;
  interchange: string;
  architecture: string;
  auth: string;
  processes: string;
  governance: string;
  highlight?: boolean;
}

const MATURITY_LEVELS: MaturityLevel[] = [
  {
    level: "Nivel 1",
    name: "Electrónica",
    badgeColor:
      "bg-surface-container-high text-on-surface-variant border-surface-container-highest",
    interchange: "Consulta informativa unidireccional",
    architecture: "Sin servicios compartidos (Silos)",
    auth: "API Key estática / Sin autenticación",
    processes: "Procesos independientes y manuales",
    governance: "Responsabilidad exclusiva del Consumidor",
  },
  {
    level: "Nivel 2",
    name: "Interoperable",
    badgeColor: "bg-secondary-container/50 text-on-secondary-container border-secondary/30",
    interchange: "Lectura y Escritura de datos",
    architecture: "Servicios web / APIs RESTful",
    auth: "OAuth 2.0 estándar",
    processes: "Invocación punto a punto controlada",
    governance: "Responsabilidad Compartida básica",
  },
  {
    level: "Nivel 3",
    name: "Automatizada",
    badgeColor: "bg-tertiary/10 text-tertiary border-tertiary/30",
    interchange: "Sincronización continua de estados",
    architecture: "API Gateway + Eventos (Kafka EventStore)",
    auth: "OIDC Federado (Keycloak) + Roles RBAC",
    processes: "Orquestación distribuida (Once-Only)",
    governance: "Responsabilidad Compartida con SLA (99.9%)",
    highlight: true,
  },
  {
    level: "Nivel 4",
    name: "Proactiva",
    badgeColor: "bg-primary/10 text-primary border-primary/30",
    interchange: "Servicios proactivos en tiempo real",
    architecture: "Building Blocks GovStack + Micro-frontends",
    auth: "Identidad Soberana (W3C DIDs / VCs + ZKP)",
    processes: "Proceso ciudadano continuo y anticipatorio",
    governance: "Operación Conjunta y Monitoreo BOGDATA",
    highlight: true,
  },
];

export default function MaturityMatrixTable() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="overflow-x-auto rounded-[12px] border border-surface-container-high shadow-xs">
        <table className="w-full text-left border-collapse text-xs sm:text-sm font-body">
          <caption className="sr-only">
            Matriz de Alcance y Niveles de Madurez de Transformación Digital (Estándar BID /
            GovTech)
          </caption>
          <thead>
            <tr className="bg-surface-container-low border-b border-surface-container-high text-on-surface font-heading text-xs uppercase tracking-wider">
              <th scope="col" className="p-3.5 font-bold min-w-[130px]">
                Nivel de Madurez
              </th>
              <th scope="col" className="p-3.5 font-bold min-w-[160px]">
                Intercambio de Datos
              </th>
              <th scope="col" className="p-3.5 font-bold min-w-[170px]">
                Arquitectura
              </th>
              <th scope="col" className="p-3.5 font-bold min-w-[160px]">
                Autenticación &amp; Seguridad
              </th>
              <th scope="col" className="p-3.5 font-bold min-w-[160px]">
                Interacción de Procesos
              </th>
              <th scope="col" className="p-3.5 font-bold min-w-[180px]">
                Gobernanza / SLA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high bg-surface-container-lowest">
            {MATURITY_LEVELS.map((item) => (
              <tr
                key={item.level}
                className={`hover:bg-surface-container-low/60 transition-colors ${
                  item.level === "Nivel 4"
                    ? "bg-primary/[0.02]"
                    : item.level === "Nivel 3"
                      ? "bg-tertiary/[0.02]"
                      : ""
                }`}
              >
                <th scope="row" className="p-3.5 font-heading">
                  <div className="flex flex-col gap-1 items-start">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] text-[11px] font-bold border ${item.badgeColor}`}
                    >
                      {item.level}
                    </span>
                    <span className="font-bold text-on-surface text-sm">{item.name}</span>
                  </div>
                </th>
                <td className="p-3.5 text-on-surface-variant font-medium">{item.interchange}</td>
                <td className="p-3.5 text-on-surface-variant font-medium">{item.architecture}</td>
                <td className="p-3.5 text-on-surface-variant font-medium">{item.auth}</td>
                <td className="p-3.5 text-on-surface-variant font-medium">{item.processes}</td>
                <td className="p-3.5 text-on-surface-variant font-medium">{item.governance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-[8px] border border-surface-container-high/60">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>
            <strong>Nivel Mínimo Distrital:</strong> Las entidades deben alcanzar como mínimo{" "}
            <strong>Nivel 2</strong> para homologación, y <strong>Nivel 3 o 4</strong> para trámites
            de alto impacto ciudadano (Decreto 640/2025).
          </span>
        </span>
      </div>
    </div>
  );
}
