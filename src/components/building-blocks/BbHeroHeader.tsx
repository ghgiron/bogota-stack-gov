"use client";

import Link from "next/link";
import type React from "react";
import { useState } from "react";

export const BbHeroHeader: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadOpenApi = () => {
    const openApiSpec = {
      openapi: "3.1.0",
      info: {
        title: "Building Block: Pagos Distritales (bb-payment)",
        version: "2.4.1",
        description:
          "API oficial de recaudos integrados con la Secretaría Distrital de Hacienda (SDH) para entidades del Distrito.",
      },
      servers: [
        {
          url: "https://sandbox.api.bogota.gov.co/v2",
          description: "Entorno Sandbox Institucional",
        },
        {
          url: "https://xroad.bogota.gov.co/r1/DIST/SDH/v2",
          description: "Entorno Producción mTLS  Distrital",
        },
      ],
      paths: {
        "/payments/initiate": {
          post: {
            summary: "Generar intención de pago y URL de checkout",
            operationId: "initiatePayment",
          },
        },
        "/payments/{payment_id}/status": {
          get: {
            summary: "Consultar estado sincrónico de la transacción",
            operationId: "getPaymentStatus",
          },
        },
        "/payments/refund": {
          post: {
            summary: "Solicitud de reversión automática",
            operationId: "refundPayment",
          },
        },
      },
    };

    const blob = new Blob([JSON.stringify(openApiSpec, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bogota-bb-payment-openapi-3.1.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <>
      {/* Sub-Header Status Strip & GovStack Breadcrumb */}
      <div className="w-full bg-surface-container-low border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Ruta de migas"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-on-surface-variant flex-wrap"
          >
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                home
              </span>
              Inicio
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <Link href="/developer-kit" className="hover:text-primary transition-colors">
              Building Blocks
            </Link>
            <span className="text-on-surface-variant/40" aria-hidden="true">
              /
            </span>
            <span className="text-on-surface font-semibold" aria-current="page">
              Pagos Distritales (bb-payment)
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-surface-container text-xs font-medium text-on-surface-variant">
              <span
                className="material-symbols-outlined text-[14px] text-tertiary"
                aria-hidden="true"
              >
                layers
              </span>
              GovStack Reference BB #04
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section: Building Block Definition */}
      <section className="w-full bg-surface-container-lowest border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8">
          <div className="flex flex-col gap-6">
            {/* Top Status Tags & Versioning */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[5px] bg-surface-container-low text-xs font-semibold text-on-surface">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: "#1B7A2E" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ backgroundColor: "#1B7A2E" }}
                  />
                </span>
                <span style={{ color: "#1B7A2E" }}>En Producción — Activo Distrital</span>
              </div>
              <span className="px-2.5 py-1 rounded-[5px] bg-secondary-fixed text-on-secondary-fixed text-xs font-medium">
                Entidades Vinculadas: 45/60
              </span>
            </div>

            {/* H1 and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 flex flex-col gap-3">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight leading-tight">
                  Building Block: Pagos Distritales{" "}
                  <span className="text-primary">(bb-payment)</span>
                </h1>
                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  Solución compartida y desacoplada para recaudos integrados con la Secretaría
                  Distrital de Hacienda SDH para todas las entidades públicas del Distrito.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end items-stretch">
                <Link
                  href="/guias-de-vinculacion/diseno-y-usabilidad"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] font-heading text-sm font-semibold text-white transition-all shadow-sm cursor-pointer min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ backgroundColor: "#CC0E35" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#b00c2e";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#CC0E35";
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10" />
                    <path d="M6 10h10" />
                  </svg>
                  Ver Guía de Integración
                </Link>

                <a
                  href="mailto:soporte.bogotastack@alcaldiabogota.gov.co?subject=Solicitud%20Credenciales%20M2M%20bb-payment"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] font-heading text-sm font-semibold text-on-primary bg-primary hover:bg-primary-container transition-all shadow-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    key
                  </span>
                  Solicitar Credenciales M2M
                </a>

                <button
                  type="button"
                  onClick={handleDownloadOpenApi}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] font-heading text-sm font-semibold text-primary bg-primary-fixed/40 hover:bg-primary-fixed transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {downloadSuccess ? "check_circle" : "download"}
                  </span>
                  {downloadSuccess ? "¡Descargado!" : "Descargar OpenAPI 3.1"}
                </button>
              </div>
            </div>

            {/* Fast Metrics Badges Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
              <div className="p-4 rounded-[15px] bg-surface-container-low flex flex-col gap-1 border border-surface-container-high/60">
                <span className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">
                  Disponibilidad SLA
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                    99.98%
                  </span>
                  <span className="text-xs text-tertiary font-semibold">Anual</span>
                </div>
                <span className="text-xs text-on-surface-variant">Monitoreo continuo 24/7/365</span>
              </div>

              <div className="p-4 rounded-[15px] bg-surface-container-low flex flex-col gap-1 border border-surface-container-high/60">
                <span className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">
                  Volumen Transaccional
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
                    +14.2M
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">op/año</span>
                </div>
                <span className="text-xs text-on-surface-variant">
                  Pico predial e ICA unificado
                </span>
              </div>

              <div className="p-4 rounded-[15px] bg-surface-container-low flex flex-col gap-1 border border-surface-container-high/60">
                <span className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">
                  Licenciamiento Entidades
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-primary">
                    $0 COP
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">Distrital</span>
                </div>
                <span className="text-xs text-on-surface-variant">
                  Sin costo de onboarding sectorial
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
