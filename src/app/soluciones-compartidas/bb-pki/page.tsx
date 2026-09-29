import { CheckCircle2, FileCheck, FileKey, ShieldAlert, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building Block: Firma Digital (bb-pki) | Bogotá Stack",
  description:
    "Infraestructura de clave pública distrital para firma electrónica y digital de actos administrativos y certificaciones.",
};

export default function BbPkiPage() {
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
            <span className="text-on-surface font-semibold">Firma Digital (bb-pki)</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-[5px] bg-secondary-container/20 text-on-surface text-xs font-semibold uppercase">
              GovStack Compliant
            </span>
            <span className="px-2.5 py-1 rounded-[5px] bg-emerald-50 text-emerald-800 text-xs font-semibold">
              Ley 527 de 1999
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-on-surface">
            Building Block: Firma Digital <span className="text-primary">(bb-pki)</span>
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
            Módulo criptográfico para la generación, validación y sellado de tiempo de documentos
            PDF y actos administrativos distritales con plena validez probatoria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <FileKey className="w-8 h-8 text-primary" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Firma Digital con Token Cloud
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Firma electrónica y digital remota para funcionarios públicos sin requerir tokens
              criptográficos físicos USB.
            </p>
          </div>

          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <FileCheck className="w-8 h-8 text-emerald-600" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Estampa Cronológica (TSA)
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Sellos de tiempo emitidos por Autoridades de Certificación autorizadas por ONAC en
              Colombia.
            </p>
          </div>

          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <ShieldCheck className="w-8 h-8 text-tertiary" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Verificador de Integridad
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Endpoint para validar la autenticidad y el no repudio de cualquier documento expedido
              por entidades distritales.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
