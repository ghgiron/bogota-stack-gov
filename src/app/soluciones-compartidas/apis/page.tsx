import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  KeyRound,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catálogo de APIs Distritales & OpenAPI 3.1 | Bogotá Stack",
  description:
    "Directorio de interfaces de programación de aplicaciones de la Alcaldía Mayor de Bogotá D.C. con especificaciones OpenAPI 3.1.",
};

const SAMPLE_APIS = [
  {
    id: "api-payments",
    title: "API Pagos Distritales (B-Pay)",
    entity: "Secretaría Distrital de Hacienda",
    method: "POST",
    path: "/v2/payments/initiate",
    version: "v2.4.1",
    tag: "Finanzas",
    href: "/soluciones-compartidas/bb-payment",
  },
  {
    id: "api-catastro",
    title: "API Nomenclatura & Predial",
    entity: "Unidad Administrativa Especial de Catastro (UAECD)",
    method: "GET",
    path: "/v1/predios/{chip}/nomenclatura",
    version: "v1.8.0",
    tag: "Catastro",
    href: "/soluciones-compartidas/bb-payment",
  },
  {
    id: "api-movilidad",
    title: "API Comparendos & Patios",
    entity: "Secretaría Distrital de Movilidad",
    method: "GET",
    path: "/v2/comparendos/consulta",
    version: "v2.1.0",
    tag: "Movilidad",
    href: "/soluciones-compartidas/bb-payment",
  },
  {
    id: "api-notifications",
    title: "API Notificaciones Multicanal",
    entity: "Secretaría General (OTIC)",
    method: "POST",
    path: "/v1/notifications/send",
    version: "v2.0.0",
    tag: "Mensajería",
    href: "/soluciones-compartidas/bb-messaging",
  },
];

export default function ApisCatalogPage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface">
      <div className="w-full bg-surface-container-low border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-on-surface-variant">
          <nav aria-label="Ruta de migas" className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/soluciones-compartidas" className="hover:text-primary transition-colors">
              Soluciones Compartidas
            </Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">Catálogo de APIs</span>
          </nav>
          <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px]">
            OpenAPI 3.1
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-[5px] bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold uppercase">
              Distrital v7.1
            </span>
            <span className="px-2.5 py-1 rounded-[5px] bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold">
              45+ Servicios Publicados
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-on-surface">
            Catálogo de APIs &amp; <span className="text-primary">OpenAPI 3.1</span>
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
            Directorio consolidado de servicios interoperables para entidades distritales y
            contratistas autorizados. Todas las APIs se comunican bajo estándares RESTful, mTLS y
            contratos auditables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_APIS.map((api) => (
            <div
              key={api.id}
              className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col justify-between gap-4 hover:border-primary transition-all group"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container text-on-surface-variant">
                    {api.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">{api.version}</span>
                </div>
                <h2 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  {api.title}
                </h2>
                <span className="text-xs text-on-surface-variant font-medium">{api.entity}</span>
                <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-[6px] font-mono text-xs text-on-surface border border-surface-container-high/60">
                  <span className="px-1.5 py-0.5 rounded bg-primary text-white text-[10px] font-bold">
                    {api.method}
                  </span>
                  <span className="truncate">{api.path}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-container-high text-xs">
                <Link
                  href={api.href}
                  className="font-heading font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Ver Documentación &amp; Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-neutral-400 font-mono text-[11px]">mTLS Requerido</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
