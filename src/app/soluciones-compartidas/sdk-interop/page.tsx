import { ArrowRight, CheckCircle2, Code2, Copy, Terminal, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SDK Distrital (@bogota/gov-sdk) | Bogotá Stack",
  description:
    "Librería oficial de interoperabilidad y desarrollo para entidades distritales y contratistas de tecnología.",
};

export default function SdkInteropPage() {
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
            <span className="text-on-surface font-semibold">SDK Distrital</span>
          </nav>
          <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px]">
            v2.4.1
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-[5px] bg-primary-fixed text-on-primary-fixed text-xs font-semibold uppercase">
              TypeScript / Python / Go
            </span>
            <span className="px-2.5 py-1 rounded-[5px] bg-emerald-50 text-emerald-800 text-xs font-semibold">
              Open Source B2G
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-on-surface">
            SDK Distrital <span className="text-primary">(@bogota/gov-sdk)</span>
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
            Kit de desarrollo acelerado con clientes tipados para conectarse a , firmar peticiones
            con mTLS distrital y consumir los Building Blocks sin configurar librerías
            criptográficas complejas.
          </p>
        </div>

        {/* Bloque Terminal */}
        <div className="p-6 rounded-[15px] bg-[#121316] text-white flex flex-col gap-4 shadow-xl border border-[#2B2D31]">
          <div className="flex items-center justify-between border-b border-[#2B2D31] pb-3 text-xs text-neutral-400 font-mono">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              Instalación rápida npm
            </span>
            <span>Node.js &gt;= 18.0</span>
          </div>
          <div className="flex items-center justify-between bg-[#0E0F12] p-3 rounded-[8px] font-mono text-xs sm:text-sm text-emerald-400">
            <code>npm install @bogota/gov-sdk</code>
            <span className="text-neutral-500 text-xs">Versión estable 2.4.1</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <Zap className="w-8 h-8 text-primary" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Gestión Automática mTLS
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Carga y rotación automática de certificados cliente emitidos por la OTIC para el canal
              seguro .
            </p>
          </div>

          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <Code2 className="w-8 h-8 text-tertiary" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Tipos TypeScript Estrictos
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Modelos de datos autogenerados a partir de los contratos OpenAPI 3.1 de las 60
              entidades distritales.
            </p>
          </div>

          <div className="p-6 rounded-[15px] bg-surface-container-lowest border border-surface-container-high shadow-sm flex flex-col gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <h2 className="font-heading text-lg font-bold text-on-surface">
              Reintentos Idempotentes
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Header `Idempotency-Key` integrado por defecto para evitar cobros dobles o duplicidad
              de radicados.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
