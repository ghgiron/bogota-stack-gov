"use client";

import {
  ArrowRight,
  Battery,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  FileCheck2,
  Fingerprint,
  Info,
  KeyRound,
  Layers,
  Lock,
  QrCode,
  RefreshCw,
  Scan,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

export type UseCase = "caso-a" | "caso-b" | "caso-c";
export type WalletView = "intro" | "pin" | "vincular" | "credenciales";

export const BWalletOid4vciSimulator: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<UseCase>("caso-a");
  const [walletView, setWalletView] = useState<WalletView>("intro");
  const [pinDigits, setPinDigits] = useState<string[]>([]);
  const [qrScanned, setQrScanned] = useState<boolean>(false);
  const [hasSisbenCred, setHasSisbenCred] = useState<boolean>(false);
  const [showManualLink, setShowManualLink] = useState<boolean>(false);

  // Manejo de teclado numérico PIN
  const handlePinPress = (digit: string) => {
    if (pinDigits.length < 6) {
      const next = [...pinDigits, digit];
      setPinDigits(next);
      if (next.length === 6) {
        setTimeout(() => {
          setWalletView("vincular");
        }, 300);
      }
    }
  };

  const handlePinDelete = () => {
    setPinDigits((prev) => prev.slice(0, -1));
  };

  const handleSimulateScan = () => {
    setQrScanned(true);
    setTimeout(() => {
      if (selectedCase === "caso-b") {
        setHasSisbenCred(true);
      }
      setWalletView("credenciales");
      setQrScanned(false);
    }, 700);
  };

  const handleSelectCase = (c: UseCase) => {
    setSelectedCase(c);
    if (c === "caso-b") {
      setHasSisbenCred(true);
    }
    // Si la persona ya estaba en credenciales o vincular, se mantiene en un estado coherente
    if (walletView === "credenciales" && c !== "caso-b") {
      setHasSisbenCred(false);
    }
  };

  const resetAll = () => {
    setWalletView("intro");
    setPinDigits([]);
    setQrScanned(false);
    setHasSisbenCred(false);
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-[15px] border border-surface-container-high shadow-xs overflow-hidden font-body">
      {/* Cabecera del Simulador */}
      <div className="p-5 sm:p-6 bg-surface-container-low border-b border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-[#CC0E35]/10 text-primary text-xs font-heading font-bold uppercase tracking-wider">
              Simulador Dual B2G · OID4VCI &amp; OID4VP
            </span>
            <span className="text-xs text-on-surface-variant font-medium">• Guía 1.7</span>
          </div>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-on-surface">
            Simulador Lado a Lado: Emisión Sectorial (Portal) + BWallet Móvil
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed max-w-3xl">
            Experimenta en tiempo real la emisión de credenciales verificables W3C y el inicio de
            sesión sin contraseñas en los trámites de la administración distrital.
          </p>
        </div>

        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-white border border-gray-300 text-xs font-heading font-semibold text-on-surface hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-primary" />
          <span>Reiniciar Simulador</span>
        </button>
      </div>

      {/* Contenedor Dual Grid: Panel Izquierdo (Portal) + Panel Derecho (BWallet) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-surface-container-high">
        {/* PANEL IZQUIERDO: PORTAL TRANSACCIONAL / ENTIDAD (7 COLS) */}
        <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-5">
            {/* Selector de Caso de Uso */}
            <div>
              <label className="font-heading font-bold text-xs text-on-surface block mb-2 uppercase tracking-wider">
                Selecciona el Escenario de Intercambio:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectCase("caso-a")}
                  className={`p-3 rounded-[8px] border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCase === "caso-a"
                      ? "bg-primary/5 border-primary text-primary font-bold shadow-2xs"
                      : "bg-surface-container-low border-gray-200 text-on-surface-variant hover:border-gray-300"
                  }`}
                >
                  <span className="block font-heading mb-1 text-[11px] uppercase tracking-wide">
                    Caso A
                  </span>
                  <span>Credencial de Identidad Base</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectCase("caso-b")}
                  className={`p-3 rounded-[8px] border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCase === "caso-b"
                      ? "bg-secondary/10 border-[#BF871B] text-[#9E6900] font-bold shadow-2xs"
                      : "bg-surface-container-low border-gray-200 text-on-surface-variant hover:border-gray-300"
                  }`}
                >
                  <span className="block font-heading mb-1 text-[11px] uppercase tracking-wide">
                    Caso B
                  </span>
                  <span>Credencial Sisbén IV (Planeación)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectCase("caso-c")}
                  className={`p-3 rounded-[8px] border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCase === "caso-c"
                      ? "bg-tertiary/10 border-tertiary text-tertiary font-bold shadow-2xs"
                      : "bg-surface-container-low border-gray-200 text-on-surface-variant hover:border-gray-300"
                  }`}
                >
                  <span className="block font-heading mb-1 text-[11px] uppercase tracking-wide">
                    Caso C
                  </span>
                  <span>Login OID4VP sin Contraseñas</span>
                </button>
              </div>
            </div>

            {/* Pantalla del Portal según el caso */}
            <div className="p-5 rounded-[12px] bg-surface-container-low border border-surface-container-high space-y-4">
              {selectedCase === "caso-a" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-surface-container-high pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="font-heading font-bold text-xs text-on-surface">
                        Portal Transaccional de Bogotá · Alcaldía Mayor
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                      OID4VCI Issuer
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Tu identidad ha sido validada contra la Registraduría (RNEC). Escanea este código
                    QR desde tu BWallet para recibir y custodiar tu{" "}
                    <strong className="text-on-surface">Credencial de Identidad Base</strong>.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-[10px] border border-gray-200">
                    {/* Código QR Simulado */}
                    <div className="w-32 h-32 bg-gray-900 rounded-[10px] p-2 flex flex-col items-center justify-center text-white shrink-0 shadow-inner relative group">
                      <QrCode className="w-24 h-24 text-white" />
                      <span className="text-[9px] font-mono text-gray-300 mt-1">
                        openid-credential-offer://
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <span className="font-heading font-bold text-on-surface block">
                        Detalles de la Oferta OID4VCI:
                      </span>
                      <div className="text-[11px] font-mono text-on-surface-variant space-y-1">
                        <div>
                          <strong>Config ID:</strong> BogotaCitizenCredential_v1
                        </div>
                        <div>
                          <strong>Titular:</strong> CARLOS ANDRÉS MENDOZA
                        </div>
                        <div>
                          <strong>NUIP:</strong> CC 1.024.892.120
                        </div>
                        <div>
                          <strong>Sello Criptográfico:</strong> Ed25519 (Walt.id)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedCase === "caso-b" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-surface-container-high pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FAB62D]" />
                      <span className="font-heading font-bold text-xs text-on-surface">
                        Secretaría Distrital de Planeación · Sisbén IV
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FEF8EA] text-[#9E6900] font-bold border border-[#FAB62D]/40">
                      Credencial Sectorial
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Planeación reutiliza la identidad base probada y expide la{" "}
                    <strong className="text-on-surface">Credencial de Caracterización Sisbén IV</strong>{" "}
                    para que la persona acceda a beneficios sin fotocopias.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-[10px] border border-gray-200">
                    <div className="w-32 h-32 bg-gray-900 rounded-[10px] p-2 flex flex-col items-center justify-center text-white shrink-0 shadow-inner">
                      <QrCode className="w-24 h-24 text-[#FAB62D]" />
                      <span className="text-[9px] font-mono text-[#FAB62D] mt-1">
                        openid-credential-offer://
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <span className="font-heading font-bold text-on-surface block">
                        Claims Certificados de Planeación:
                      </span>
                      <div className="text-[11px] font-mono text-on-surface-variant space-y-1">
                        <div>
                          <strong>Config ID:</strong> BogotaSisbenCredential_v1
                        </div>
                        <div>
                          <strong>Grupo Sisbén:</strong>{" "}
                          <span className="text-[#9E6900] font-bold">B2 (Pobreza Moderada)</span>
                        </div>
                        <div>
                          <strong>Estrato:</strong> 2 · Localidad: Kennedy
                        </div>
                        <div>
                          <strong>Hogar Verificado:</strong> true
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedCase === "caso-c" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-surface-container-high pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                      <span className="font-heading font-bold text-xs text-on-surface">
                        Trámite Distrital (Secretaría de Movilidad / Hábitat)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-bold">
                      OID4VP Cross-Device
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Autenticación por presentación demostrativa. La entidad solicita únicamente los
                    atributos necesarios sin requerir contraseñas ni registrar cookies intrusivas.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-[10px] border border-gray-200">
                    <div className="w-32 h-32 bg-gray-900 rounded-[10px] p-2 flex flex-col items-center justify-center text-white shrink-0 shadow-inner">
                      <QrCode className="w-24 h-24 text-[#3366CC]" />
                      <span className="text-[9px] font-mono text-tertiary mt-1">
                        openid-vc://presentation-request
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <span className="font-heading font-bold text-on-surface block">
                        Divulgación Selectiva Solicitada (SD-JWT):
                      </span>
                      <div className="text-[11px] font-mono text-on-surface-variant space-y-1">
                        <div>
                          ✓ <strong>Nombre completo:</strong> CARLOS ANDRÉS MENDOZA
                        </div>
                        <div>
                          ✓ <strong>Es mayor de edad:</strong> true (sin fecha exacta)
                        </div>
                        <div>
                          ✓ <strong>Pertenece a Grupo B Sisbén:</strong> true
                        </div>
                        <div className="text-gray-400">
                          ✗ <em>Dirección y teléfono ocultos</em>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selector Rápido de Pantallas de la Billetera para Inspección */}
          <div className="pt-4 border-t border-gray-200">
            <span className="text-xs font-heading font-bold text-on-surface block mb-2">
              Navegar Vistas de BWallet en el Teléfono (Panel Derecho):
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setWalletView("intro")}
                className={`px-3 py-1.5 rounded-[6px] border font-semibold transition-all cursor-pointer ${
                  walletView === "intro"
                    ? "bg-primary text-white border-primary"
                    : "bg-surface-container-low text-on-surface border-gray-200 hover:bg-gray-100"
                }`}
              >
                1. Intro BWallet
              </button>
              <button
                type="button"
                onClick={() => setWalletView("pin")}
                className={`px-3 py-1.5 rounded-[6px] border font-semibold transition-all cursor-pointer ${
                  walletView === "pin"
                    ? "bg-primary text-white border-primary"
                    : "bg-surface-container-low text-on-surface border-gray-200 hover:bg-gray-100"
                }`}
              >
                2. Crear PIN
              </button>
              <button
                type="button"
                onClick={() => setWalletView("vincular")}
                className={`px-3 py-1.5 rounded-[6px] border font-semibold transition-all cursor-pointer ${
                  walletView === "vincular"
                    ? "bg-primary text-white border-primary"
                    : "bg-surface-container-low text-on-surface border-gray-200 hover:bg-gray-100"
                }`}
              >
                3. Vincular con QR
              </button>
              <button
                type="button"
                onClick={() => setWalletView("credenciales")}
                className={`px-3 py-1.5 rounded-[6px] border font-semibold transition-all cursor-pointer ${
                  walletView === "credenciales"
                    ? "bg-primary text-white border-primary"
                    : "bg-surface-container-low text-on-surface border-gray-200 hover:bg-gray-100"
                }`}
              >
                4. Mis Credenciales
              </button>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: MOCKUP DE IPHONE CON BWALLET DE BOGOTÁ (5 COLS) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-surface-container-low flex flex-col items-center justify-center">
          {/* Carcasa del Teléfono */}
          <div className="w-[310px] sm:w-[320px] h-[640px] bg-gray-900 rounded-[44px] p-3 shadow-2xl border-4 border-gray-800 relative flex flex-col overflow-hidden">
            {/* Dynamic Island / Parlante Superior */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-900 border border-gray-700" />
              <div className="w-2 h-2 rounded-full bg-blue-900/40" />
            </div>

            {/* Pantalla del Teléfono (Interior Blanco / Oscuro según vista) */}
            <div className="w-full h-full bg-[#FBF9F8] rounded-[36px] overflow-hidden flex flex-col justify-between pt-7 pb-3 relative text-on-surface font-body select-none">
              {/* Barra de Estado de iOS */}
              <div className="px-5 py-1 flex items-center justify-between text-[11px] font-bold text-gray-800 shrink-0">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* CONTENIDO INTERIOR SEGÚN LA VISTA DE BWALLET */}
              <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col justify-between">
                {/* VISTA 1: INTRO */}
                {walletView === "intro" && (
                  <div className="flex flex-col justify-between h-full py-4 text-center">
                    <div className="space-y-4 pt-4">
                      <div className="w-16 h-16 rounded-[16px] bg-[#CC0E35] text-white mx-auto flex items-center justify-center shadow-md">
                        <Smartphone className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-heading font-extrabold text-lg text-gray-900">
                          BWallet Bogotá
                        </h4>
                        <span className="text-[11px] text-[#CC0E35] font-bold uppercase tracking-wider block mt-0.5">
                          Distrito Capital · W3C
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed px-2">
                        Tu billetera de credenciales oficiales: Vinculación ágil con QR, protegida en
                        tu dispositivo y respaldada con seguridad de hardware.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setWalletView("pin")}
                        className="w-full py-3 rounded-[8px] bg-[#CC0E35] text-white font-heading font-bold text-xs hover:bg-[#A60B2B] transition-colors shadow-sm cursor-pointer"
                      >
                        Comenzar configuración &gt;
                      </button>
                      <span className="text-[10px] text-gray-400 block">
                        Acuerdo 001 de 2026 · Alcaldía Mayor
                      </span>
                    </div>
                  </div>
                )}

                {/* VISTA 2: CREAR PIN */}
                {walletView === "pin" && (
                  <div className="flex flex-col justify-between h-full py-2 text-center">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                        <Lock className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-gray-900">
                        Crea tu PIN de seguridad
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-snug px-3">
                        Ingresa 6 dígitos numéricos para proteger el acceso a tus credenciales.
                      </p>

                      {/* 6 Indicadores de PIN */}
                      <div className="flex items-center justify-center gap-2.5 pt-3">
                        {[0, 1, 2, 3, 4, 5].map((idx) => (
                          <div
                            key={idx}
                            className={`w-3 h-3 rounded-full border transition-all ${
                              pinDigits.length > idx
                                ? "bg-[#CC0E35] border-[#CC0E35] scale-110"
                                : "bg-gray-100 border-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Teclado Numérico */}
                    <div className="grid grid-cols-3 gap-2 px-3 pt-2">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => handlePinPress(d)}
                          className="h-10 rounded-[8px] bg-white border border-gray-200 text-sm font-bold font-heading text-gray-800 hover:bg-gray-50 active:bg-gray-100 shadow-2xs transition-colors flex items-center justify-center cursor-pointer"
                        >
                          {d}
                        </button>
                      ))}
                      <div className="flex items-center justify-center text-primary">
                        <Fingerprint className="w-5 h-5" />
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePinPress("0")}
                        className="h-10 rounded-[8px] bg-white border border-gray-200 text-sm font-bold font-heading text-gray-800 hover:bg-gray-50 active:bg-gray-100 shadow-2xs transition-colors flex items-center justify-center cursor-pointer"
                      >
                        0
                      </button>
                      <button
                        type="button"
                        onClick={handlePinDelete}
                        className="h-10 rounded-[8px] bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer"
                      >
                        Borrar
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setWalletView("vincular")}
                      className="text-[11px] text-primary font-semibold hover:underline"
                    >
                      Omitir por ahora (demo) &gt;
                    </button>
                  </div>
                )}

                {/* VISTA 3: VINCULAR CON QR */}
                {walletView === "vincular" && (
                  <div className="flex flex-col justify-between h-full py-2 space-y-3">
                    <div className="text-center space-y-1">
                      <h4 className="font-heading font-bold text-sm text-gray-900">
                        Vincular credencial
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-snug">
                        Apunta tu cámara al código QR mostrado en la pantalla de tu computador en el
                        Portal Transaccional de Bogotá.
                      </p>
                    </div>

                    {/* Visor de Escaneo Oscuro con Líneas Guía Rojas */}
                    <div className="w-full h-44 bg-gray-950 rounded-[14px] p-4 relative flex flex-col items-center justify-center overflow-hidden border border-gray-800">
                      {/* Marcos rojos de la mira */}
                      <div className="absolute inset-4 border-2 border-dashed border-[#CC0E35]/70 rounded-[10px] pointer-events-none" />
                      <div className="w-full h-0.5 bg-[#CC0E35] shadow-[0_0_8px_#CC0E35] animate-pulse" />

                      <span className="text-[10px] text-gray-300 font-mono mt-3 z-10 px-2 py-0.5 bg-black/60 rounded">
                        Buscando código de emisión...
                      </span>
                    </div>

                    {/* Botón Simular Escaneo Exitoso */}
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleSimulateScan}
                        className="w-full py-2.5 rounded-[8px] bg-[#1B7A2E] text-white font-heading font-bold text-xs hover:bg-[#156024] transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>✓ Simular escaneo de QR exitoso</span>
                      </button>

                      {/* Acordeón Enlace Manual */}
                      <div className="border border-gray-200 rounded-[6px] overflow-hidden bg-white text-[10px]">
                        <button
                          type="button"
                          onClick={() => setShowManualLink(!showManualLink)}
                          className="w-full px-2.5 py-1.5 text-left text-gray-600 font-semibold flex items-center justify-between hover:bg-gray-50"
                        >
                          <span>¿No puedes escanear el código? Ingresa enlace manual</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${showManualLink ? "rotate-180" : ""}`}
                          />
                        </button>
                        {showManualLink && (
                          <div className="p-2 border-t border-gray-100 bg-gray-50 space-y-1">
                            <input
                              type="text"
                              readOnly
                              value="openid-credential-offer://bogota.gov.co?credential_offer_uri=..."
                              className="w-full font-mono text-[9px] px-1.5 py-1 bg-white border border-gray-300 rounded"
                            />
                            <button
                              type="button"
                              onClick={handleSimulateScan}
                              className="text-[10px] text-primary font-bold hover:underline"
                            >
                              Procesar oferta manual &gt;
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* VISTA 4: MIS CREDENCIALES */}
                {walletView === "credenciales" && (
                  <div className="flex flex-col justify-between h-full py-1 space-y-2.5">
                    {/* Header de Billetera Activa */}
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-heading font-bold text-gray-900">
                        BWallet Bogotá
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1B7A2E] bg-[#EAF5EC] px-2 py-0.5 rounded-full border border-[#1B7A2E]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B7A2E] animate-pulse" />
                        Hardware seguro
                      </span>
                    </div>

                    {/* Lista de Tarjetas de Credenciales */}
                    <div className="space-y-2.5 overflow-y-auto max-h-[440px] pr-0.5">
                      {/* Tarjeta 1: Credencial Base de Identidad */}
                      <div className="rounded-[14px] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-3.5 shadow-md border border-gray-700/60 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-heading font-extrabold tracking-wider text-red-400 uppercase">
                            ALCALDÍA MAYOR DE BOGOTÁ
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-green-900/60 text-green-300 text-[9px] font-bold border border-green-700/50">
                            Vigente
                          </span>
                        </div>

                        <span className="text-[11px] font-bold font-heading text-white block">
                          Identidad Digital Distrital
                        </span>
                        <div className="mt-2 text-[10px] font-mono text-gray-300 space-y-0.5">
                          <div>
                            Titular: <strong className="text-white">CARLOS ANDRÉS MENDOZA</strong>
                          </div>
                          <div>CC ••••• 4.892.120</div>
                          <div className="text-[9px] text-gray-400 pt-1">
                            Emitido: 12 Sep 2026 · W3C Verifiable Credential
                          </div>
                        </div>
                      </div>

                      {/* Tarjeta 2: Credencial Sectorial Sisbén IV (si aplica) */}
                      {hasSisbenCred && (
                        <div className="rounded-[14px] bg-gradient-to-br from-[#4A3000] via-[#6B4600] to-[#2B1B00] text-white p-3.5 shadow-md border border-[#FAB62D]/40 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-heading font-extrabold tracking-wider text-[#FFDEAB] uppercase">
                              SECRETARÍA DE PLANEACIÓN
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-green-900/60 text-green-300 text-[9px] font-bold border border-green-700/50">
                              Certificada
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold font-heading text-white block">
                              Sisbén IV · Caracterización
                            </span>
                            <span className="text-xs font-heading font-black text-[#FAB62D] px-2 py-0.5 rounded bg-black/40">
                              Grupo B2
                            </span>
                          </div>

                          <div className="mt-2 text-[10px] font-mono text-gray-200 space-y-0.5">
                            <div>Estrato: 2 · Localidad: Kennedy</div>
                            <div>Hogar Validado Once-Only</div>
                            <div className="text-[9px] text-[#FFDEAB] pt-1">
                              Firma: Walt.id Issuer · Ed25519
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Barra de Navegación Inferior de la Billetera */}
                    <div className="pt-2 border-t border-gray-200 flex items-center justify-around text-[10px] text-gray-500 font-semibold shrink-0">
                      <button
                        type="button"
                        onClick={() => setWalletView("credenciales")}
                        className="flex flex-col items-center text-primary font-bold"
                      >
                        <Layers className="w-4 h-4" />
                        <span>Credenciales</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setWalletView("vincular")}
                        className="flex flex-col items-center hover:text-gray-900"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>Vincular</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setWalletView("pin")}
                        className="flex flex-col items-center hover:text-gray-900"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Seguridad</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Barra de inicio de iPhone (Home indicator) */}
              <div className="w-32 h-1 bg-gray-400 rounded-full mx-auto mt-1 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BWalletOid4vciSimulator;
