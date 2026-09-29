"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

export const FooterBogota: React.FC = () => {
  const pathname = usePathname();

  // No renderizar footer público en la sección administrativa
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container-highest mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        {/* 2 Columnas Institucionales Reorganizadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 pb-8 border-b border-surface-container-highest">
          {/* Columna 1: Marca y Propósito Institucional */}
          <div className="flex flex-col gap-3 max-w-md">
            <span className="font-heading text-xl text-primary font-bold">
              Bogotá <span className="text-on-surface">Stack</span>
            </span>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Estándar oficial de diseño, interoperabilidad y servicios compartidos de la Alcaldía Mayor de Bogotá.
            </p>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface-variant font-body pt-1">
              <li>
                <a
                  href="https://bogota.gov.co/servicios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors focus-visible:ring-1 focus-visible:ring-tertiary rounded inline-flex items-center gap-1"
                >
                  Portal Transaccional de Bogotá →
                </a>
              </li>
              <li>
                <Link
                  href="https://secretariageneral.gov.co/"
                  className="hover:text-primary transition-colors focus-visible:ring-1 focus-visible:ring-tertiary rounded inline-flex items-center gap-1 font-medium"
                >
                  Secretaría General de Bogotá →
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 2: Soporte */}
          <div className="flex flex-col gap-3 md:items-start lg:pl-8">
            <span className="font-heading text-sm font-bold text-on-surface uppercase tracking-wider">
              ¿Necesitas ayuda técnica?
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface-variant font-body">
              <li>Contáctanos para guiar la integración de tu entidad:</li>
              <li>
                <a
                  href="mailto:bogotastack@alcaldiabogota.gov.co"
                  className="hover:text-primary transition-colors underline break-all"
                >
                  bogotastack@alcaldiabogota.gov.co
                </a>
              </li>
              <li>Secretaría General - Carrera 8 No. 10-65</li>

            </ul>
          </div>
        </div>

        {/* Barra Inferior de Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant font-body">
          <p>
            © 2026 Alcaldía Mayor de Bogotá D.C. Secretaría General. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-tertiary rounded"
            >
              Política de Privacidad
            </button>
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-tertiary rounded"
            >
              Términos de Uso
            </button>
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-tertiary rounded"
            >
              Mapa del Sitio
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
