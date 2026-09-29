import {
  ArrowRight,
  Bell,
  CheckCircle2,
  MessageSquare,
  Send,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building Block: Notificaciones (bb-messaging) | Bogotá Stack",
  description:
    "Servicio distrital de mensajería multicanal: SMS, WhatsApp Meta Cloud API y correo electrónico certificado.",
};

export default function BbMessagingPage() {
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
            <span className="text-on-surface font-semibold">Notificaciones (bb-messaging)</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-[5px] bg-emerald-50 text-emerald-800 text-xs font-semibold">
              En Producción
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-on-surface">
            Building Block: Notificaciones <span className="text-primary">(bb-messaging)</span>
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
            Canal oficial para el envío masivo y transaccional de avisos de vencimiento, radicados,
            citas médicas y confirmaciones de pago para todas las entidades distritales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <Smartphone className="w-8 h-8 text-primary" />
            <h2 className="font-heading text-lg font-bold text-on-surface">SMS Transaccional</h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Entrega inmediata en menos de 3 segundos con remitente alfanumérico institucional
              "ALCALDIA BOGOTA".
            </p>
          </div>

          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <MessageSquare className="w-8 h-8 text-emerald-600" />
            <h2 className="font-heading text-lg font-bold text-on-surface">WhatsApp Cloud API</h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Plantillas oficiales verificadas por Meta para interacciones seguras y confirmación de
              citas en SuperCADE.
            </p>
          </div>

          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <Send className="w-8 h-8 text-tertiary" />
            <h2 className="font-heading text-lg font-bold text-on-surface">Correo Certificado</h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Sellado de tiempo y acuse de recibo legalmente vinculante conforme a la Ley 527 de
              1999.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-[15px] bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-base font-bold text-on-surface">
              ¿Deseas conectar tu entidad a bb-messaging?
            </h3>
            <p className="text-xs text-on-surface-variant">
              Consulta la especificación técnica en el catálogo de APIs o solicita credenciales M2M.
            </p>
          </div>
          <Link
            href="/soluciones-compartidas/apis"
            className="px-4 py-2.5 rounded-[5px] bg-primary text-white text-xs font-heading font-semibold hover:bg-primary-container transition-colors shrink-0"
          >
            Ver Especificación API
          </Link>
        </div>
      </main>
    </div>
  );
}
