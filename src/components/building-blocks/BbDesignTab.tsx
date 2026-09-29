"use client";

import type React from "react";
import { useState } from "react";

type PaymentMethod = "pse" | "cards" | "wallets";

export const BbDesignTab: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("pse");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
    }, 900);
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `=========================================
ALCALDÍA MAYOR DE BOGOTÁ D.C.
SECRETARÍA DISTRITAL DE HACIENDA
COMPROBANTE ÚNICO DISTRITAL (B-PAY)
=========================================
Código CUS ACH:    884910294
Radicado BOGDATA:  BOG-REC-2025-7718
Liquidación:       RAD-BOG-2025-098192
Concepto:          Impuesto Predial Unificado 2025
Monto Pagado:      $ 450.000 COP
Medio de Pago:     ${selectedMethod.toUpperCase()}
Fecha y Hora:      2025-05-18 14:32:09 COT
Estado:            AUTORIZADO Y RADICADO
Firma Digital:     SHA256:d8a9f24b8109ca82fe712...
=========================================`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Comprobante-Distrital-884910294.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="flex flex-col gap-8 w-full"
      id="tab-diseno"
      role="tabpanel"
      aria-labelledby="btn-tab-diseno"
    >
      <div className="p-6 sm:p-8 rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col gap-6 border border-surface-container-high">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
              Kit UI Bogotá: Estándar Visual de Pago Distrital
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1">
              Componentes accesibles certificados según WCAG 2.1 AA para embeber en portales de
              trámites distritales.
            </p>
          </div>
          <a
            href="https://www.figma.com/@alcaldiabogota"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-[5px] bg-surface-container hover:bg-surface-container-high font-heading text-sm font-semibold text-on-surface transition-colors flex items-center gap-1.5 self-start shrink-0 min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              brush
            </span>
            Figma UI Kit Distrital v3.2
          </a>
        </div>

        {/* Mockup visual del Botón de Pagos e Interfaz */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Interfaz Embebible Mock */}
          <div className="p-6 rounded-[15px] bg-surface-container-low flex flex-col justify-between gap-4 border border-surface-container-high shadow-xs">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="font-heading text-primary font-bold tracking-wide">
                  PASO 3 DE 4: SELECCIÓN DE RECAUDO
                </span>
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true" />
                  Sesión segura TLS 1.3
                </span>
              </div>

              <div className="p-4 rounded-[8px] bg-surface-container-lowest flex items-center justify-between border border-surface-container-high/60">
                <div>
                  <div className="text-xs text-on-surface-variant">Referencia Liquidación</div>
                  <div className="font-mono text-sm sm:text-base font-bold text-on-surface">
                    RAD-BOG-2025-098192
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-on-surface-variant">Total a Pagar</div>
                  <div className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                    $ 450.000 COP
                  </div>
                </div>
              </div>

              {/* Botones de Medios Institucionales */}
              <div className="flex flex-col gap-2">
                <span className="text-xs sm:text-sm text-on-surface font-medium">
                  Método de recaudo verificado:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("pse")}
                    className={`p-3 rounded-[8px] text-center transition-all min-h-[56px] flex flex-col items-center justify-center border ${
                      selectedMethod === "pse"
                        ? "bg-[#FAE7EB] border-primary text-primary font-bold shadow-xs"
                        : "bg-surface-container-lowest hover:bg-surface-container border-surface-container-high text-on-surface"
                    }`}
                  >
                    <span className="font-heading text-sm font-bold">PSE</span>
                    <span className="block text-[11px] opacity-80">Débito ACH</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod("cards")}
                    className={`p-3 rounded-[8px] text-center transition-all min-h-[56px] flex flex-col items-center justify-center border ${
                      selectedMethod === "cards"
                        ? "bg-[#FAE7EB] border-primary text-primary font-bold shadow-xs"
                        : "bg-surface-container-lowest hover:bg-surface-container border-surface-container-high text-on-surface"
                    }`}
                  >
                    <span className="font-heading text-sm font-bold">Tarjetas</span>
                    <span className="block text-[11px] opacity-80">Visa / Master</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod("wallets")}
                    className={`p-3 rounded-[8px] text-center transition-all min-h-[56px] flex flex-col items-center justify-center border ${
                      selectedMethod === "wallets"
                        ? "bg-[#FAE7EB] border-primary text-primary font-bold shadow-xs"
                        : "bg-surface-container-lowest hover:bg-surface-container border-surface-container-high text-on-surface"
                    }`}
                  >
                    <span className="font-heading text-sm font-bold">Billeteras</span>
                    <span className="block text-[11px] opacity-80">DaviPlata/Nequi</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {/* Botón Bogotá Estándar */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-[5px] bg-primary hover:bg-primary-container text-on-primary font-heading text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-75 cursor-pointer"
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isProcessing ? "animate-spin" : ""
                  }`}
                  aria-hidden="true"
                >
                  {isProcessing ? "refresh" : "lock"}
                </span>
                {isProcessing ? "Conectando con Red ACH..." : "Pagar con Botón Oficial de Bogotá"}
              </button>

              <span className="text-xs text-center text-on-surface-variant leading-tight">
                Protegido por el Sistema de Autenticación Distrital y Certificación PCI-DSS
              </span>
            </div>
          </div>

          {/* Comprobante Transaccional con Radicado */}
          <div className="p-6 rounded-[15px] bg-surface-container-lowest shadow-xs flex flex-col justify-between gap-4 border border-surface-container-high">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ color: "#1B7A2E" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span style={{ color: "#1B7A2E" }} className="font-bold">
                  Transacción Autorizada y Radicada
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                Comprobante Único Distrital
              </h3>

              <div className="p-4 rounded-[8px] bg-surface-container-low flex flex-col gap-2.5 text-xs sm:text-sm border border-surface-container-high/60">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Código CUS ACH:</span>
                  <span className="font-mono font-bold text-on-surface">884910294</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Radicado BOGDATA:</span>
                  <span className="font-mono font-bold text-on-surface">BOG-REC-2025-7718</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Fecha y Hora:</span>
                  <span className="text-on-surface">2025-05-18 14:32:09 COT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Entidad Destino:</span>
                  <span className="font-medium text-on-surface">
                    Secretaría Distrital de Hacienda
                  </span>
                </div>
              </div>

              {paymentDone && (
                <div className="p-3 rounded-[6px] bg-[#EAF5EC] border-l-4 border-[#1B7A2E] text-xs text-[#1B7A2E] font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  ¡Nueva simulación transaccional procesada exitosamente en B-Pay!
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="py-2.5 px-4 rounded-[5px] bg-surface-container hover:bg-surface-container-high font-heading text-sm font-semibold text-on-surface transition-colors flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                print
              </span>
              Descargar Comprobante PDF Firmado Digitalmente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
