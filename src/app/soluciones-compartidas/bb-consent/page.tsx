import { CheckCircle2, FileText, Lock, ShieldCheck, UserCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building Block: Consentimiento y Habeas Data (bb-consent) | Bogotá Stack",
  description:
    "Gestión auditable de consentimientos, políticas de privacidad y derechos ARCO conforme a la Ley 1581 de 2012.",
};

export default function BbConsentPage() {
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
            <span className="text-on-surface font-semibold">Consentimiento (bb-consent)</span>
          </nav>
          <span className="px-2 py-0.5 rounded bg-surface-container font-medium">
            Ley 1581 de 2012
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-[5px] bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase">
              Habeas Data Distrital
            </span>
            <span className="px-2.5 py-1 rounded-[5px] bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold">
              GovStack Reference
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-on-surface">
            Building Block: Consentimiento <span className="text-primary">(bb-consent)</span>
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
            Mecanismo centralizado para recopilar, almacenar y gestionar las autorizaciones de
            tratamiento de datos personales de los ciudadanos en trámites distritales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Trazabilidad Inmutable
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Registro con timestamp, dirección IP y hash de la política aceptada por el usuario
              para soporte jurídico ante la SIC.
            </p>
          </div>

          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <UserCheck className="w-8 h-8 text-emerald-600" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Panel de Control Ciudadano
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Permite a los ciudadanos revocar o modificar sus consentimientos desde su Carpeta
              Ciudadana en cualquier momento.
            </p>
          </div>

          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <Lock className="w-8 h-8 text-tertiary" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Cumplimiento Automático
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Validación previa en cada llamado de interoperabilidad: si no existe consentimiento
              vigente, la consulta se bloquea.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
