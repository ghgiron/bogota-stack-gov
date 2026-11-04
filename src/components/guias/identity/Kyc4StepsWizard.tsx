"use client";

import {
  AlertCircle,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Database,
  FileBadge,
  FileCheck2,
  Fingerprint,
  IdCard,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  RefreshCw,
  ScanFace,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
} from "lucide-react";
import React, { useState } from "react";

export const Kyc4StepsWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [substepExecution, setSubstepExecution] = useState<{
    isRunning: boolean;
    completed: number;
  }>({ isRunning: false, completed: 0 });

  // Paso 2: OTP
  const [otpCode, setOtpCode] = useState<string>("894120");
  const [otpVerified, setOtpVerified] = useState<boolean>(true);

  // Paso 3: Domicilio
  const [localidad, setLocalidad] = useState<string>("Kennedy");
  const [direccion, setDireccion] = useState<string>("Calle 38 Sur # 78K - 14");

  // Paso 4: Consentimiento
  const [consentAceptado, setConsentAceptado] = useState<boolean>(true);
  const [unicidadVerificada, setUnicidadVerificada] = useState<boolean>(true);

  const runSubstepsSim = () => {
    setSubstepExecution({ isRunning: true, completed: 0 });
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setSubstepExecution({ isRunning: true, completed: progress });
      if (progress >= 6) {
        clearInterval(interval);
        setSubstepExecution({ isRunning: false, completed: 6 });
      }
    }, 450);
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-[15px] border border-surface-container-high shadow-xs overflow-hidden font-body">
      {/* Cabecera */}
      <div className="p-5 sm:p-6 bg-surface-container-low border-b border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-[5px] bg-[#1B7A2E]/10 text-[#1B7A2E] text-xs font-heading font-bold uppercase tracking-wider">
              Micro-Frontend µFE · IdentityVerificationService
            </span>
            <span className="text-xs text-on-surface-variant font-medium">• Guía 1.7</span>
          </div>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-on-surface">
            Wizard Interactivo: Enrolamiento Biométrico KYC (4 Pasos)
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed max-w-3xl">
            Simula el flujo completo de prueba de identidad que valida a la ciudadanía contra la
            Registraduría Nacional (ANI) y Azure AI antes de autorizar la expedición de credenciales.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentStep(1);
            setSubstepExecution({ isRunning: false, completed: 0 });
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-white border border-gray-300 text-xs font-heading font-semibold text-on-surface hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-primary" />
          <span>Reiniciar Wizard</span>
        </button>
      </div>

      {/* Stepper Superior Accesible */}
      <div className="px-5 sm:px-8 pt-6 pb-2 border-b border-surface-container-high/60 bg-white">
        <nav aria-label="Progreso del enrolamiento KYC" className="w-full">
          <ol className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Paso 1 */}
            <li
              onClick={() => setCurrentStep(1)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCurrentStep(1);
                }
              }}
              tabIndex={0}
              className={`p-3 rounded-[8px] border transition-all cursor-pointer flex items-center gap-2.5 ${
                currentStep === 1
                  ? "bg-primary/5 border-primary text-primary"
                  : currentStep > 1
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/30 text-[#1B7A2E]"
                    : "bg-surface-container-low border-gray-200 text-on-surface-variant"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading shrink-0 ${
                  currentStep === 1
                    ? "bg-primary text-white"
                    : currentStep > 1
                      ? "bg-[#1B7A2E] text-white"
                      : "bg-gray-200 text-gray-700"
                }`}
              >
                {currentStep > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider">Paso 1</span>
                <span className="block text-xs font-semibold truncate text-on-surface">
                  Prueba Documental &amp; Bio
                </span>
              </div>
            </li>

            {/* Paso 2 */}
            <li
              onClick={() => setCurrentStep(2)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCurrentStep(2);
                }
              }}
              tabIndex={0}
              className={`p-3 rounded-[8px] border transition-all cursor-pointer flex items-center gap-2.5 ${
                currentStep === 2
                  ? "bg-primary/5 border-primary text-primary"
                  : currentStep > 2
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/30 text-[#1B7A2E]"
                    : "bg-surface-container-low border-gray-200 text-on-surface-variant"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading shrink-0 ${
                  currentStep === 2
                    ? "bg-primary text-white"
                    : currentStep > 2
                      ? "bg-[#1B7A2E] text-white"
                      : "bg-gray-200 text-gray-700"
                }`}
              >
                {currentStep > 2 ? <Check className="w-4 h-4" /> : "2"}
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider">Paso 2</span>
                <span className="block text-xs font-semibold truncate text-on-surface">
                  Desafío OTP Contacto
                </span>
              </div>
            </li>

            {/* Paso 3 */}
            <li
              onClick={() => setCurrentStep(3)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCurrentStep(3);
                }
              }}
              tabIndex={0}
              className={`p-3 rounded-[8px] border transition-all cursor-pointer flex items-center gap-2.5 ${
                currentStep === 3
                  ? "bg-primary/5 border-primary text-primary"
                  : currentStep > 3
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/30 text-[#1B7A2E]"
                    : "bg-surface-container-low border-gray-200 text-on-surface-variant"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading shrink-0 ${
                  currentStep === 3
                    ? "bg-primary text-white"
                    : currentStep > 3
                      ? "bg-[#1B7A2E] text-white"
                      : "bg-gray-200 text-gray-700"
                }`}
              >
                {currentStep > 3 ? <Check className="w-4 h-4" /> : "3"}
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider">Paso 3</span>
                <span className="block text-xs font-semibold truncate text-on-surface">
                  Datos de Domicilio
                </span>
              </div>
            </li>

            {/* Paso 4 */}
            <li
              onClick={() => setCurrentStep(4)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCurrentStep(4);
                }
              }}
              tabIndex={0}
              className={`p-3 rounded-[8px] border transition-all cursor-pointer flex items-center gap-2.5 ${
                currentStep === 4
                  ? "bg-primary/5 border-primary text-primary"
                  : "bg-surface-container-low border-gray-200 text-on-surface-variant"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading shrink-0 ${
                  currentStep === 4 ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                4
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider">Paso 4</span>
                <span className="block text-xs font-semibold truncate text-on-surface">
                  Consentimiento &amp; Emisión
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* CONTENIDO DEL PASO ACTIVO */}
      <div className="p-5 sm:p-8">
        {/* PASO 1: SUB-PASOS 1a A 1f */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-low p-4 rounded-[10px] border border-surface-container-high">
              <div>
                <h4 className="font-heading font-bold text-sm text-on-surface">
                  Paso 1: Validación Biométrica y Documental en 6 Sub-etapas (1a a 1f)
                </h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  El navegador ejecuta la captura nativa y el backend orquesta Azure AI y la
                  Registraduría (ANI).
                </p>
              </div>
              <button
                type="button"
                disabled={substepExecution.isRunning}
                onClick={runSubstepsSim}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] bg-[#CC0E35] hover:bg-[#A60B2B] text-white text-xs font-heading font-bold transition-all shadow-xs disabled:opacity-50 shrink-0 cursor-pointer"
              >
                {substepExecution.isRunning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verificando con ANI...</span>
                  </>
                ) : (
                  <>
                    <ScanFace className="w-4 h-4" />
                    <span>Simular Ejecución de los 6 Sub-pasos</span>
                  </>
                )}
              </button>
            </div>

            {/* Grilla de los 6 Sub-pasos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* 1a */}
              <div
                className={`p-4 rounded-[10px] border transition-all ${
                  substepExecution.completed >= 1
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/40"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    Sub-paso 1a
                  </span>
                  {substepExecution.completed >= 1 ? (
                    <span className="text-xs font-bold text-[#1B7A2E] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Capturado
                    </span>
                  ) : (
                    <Camera className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <h5 className="font-heading font-bold text-xs text-on-surface mb-1">
                  1a. Captura Nativa en Shadow DOM
                </h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Cédula física (anverso y reverso) + Selfie en vivo directamente en el navegador
                  mediante WebRTC TLS, sin librerías de terceros.
                </p>
              </div>

              {/* 1b */}
              <div
                className={`p-4 rounded-[10px] border transition-all ${
                  substepExecution.completed >= 2
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/40"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    Sub-paso 1b
                  </span>
                  {substepExecution.completed >= 2 ? (
                    <span className="text-xs font-bold text-[#1B7A2E] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> OCR Exitoso
                    </span>
                  ) : (
                    <IdCard className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <h5 className="font-heading font-bold text-xs text-on-surface mb-1">
                  1b. OCR Document Intelligence
                </h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Extracción estructurada de NUIP (C.C. 1.024.892.120), nombres, apellidos, fecha de
                  nacimiento y coordenadas faciales del documento.
                </p>
              </div>

              {/* 1c */}
              <div
                className={`p-4 rounded-[10px] border transition-all ${
                  substepExecution.completed >= 3
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/40"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    Sub-paso 1c
                  </span>
                  {substepExecution.completed >= 3 ? (
                    <span className="text-xs font-bold text-[#1B7A2E] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Rostro Válido
                    </span>
                  ) : (
                    <ScanFace className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <h5 className="font-heading font-bold text-xs text-on-surface mb-1">
                  1c. Detección Facial Azure Face Detect
                </h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Verificación de ángulo frontal, iluminación óptima y ausencia de oclusiones
                  (gafas de sol o mascarillas que impidan la lectura).
                </p>
              </div>

              {/* 1d */}
              <div
                className={`p-4 rounded-[10px] border transition-all ${
                  substepExecution.completed >= 4
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/40"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    Sub-paso 1d
                  </span>
                  {substepExecution.completed >= 4 ? (
                    <span className="text-xs font-bold text-[#1B7A2E] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Score: 99.8%
                    </span>
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <h5 className="font-heading font-bold text-xs text-on-surface mb-1">
                  1d. Prueba de Vida (Liveness Anti-Spoofing)
                </h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Descarte automático de ataques por presentación: fotos impresas, pantallas de celular
                  reproduciendo videos o máscaras de silicona 3D.
                </p>
              </div>

              {/* 1e */}
              <div
                className={`p-4 rounded-[10px] border transition-all ${
                  substepExecution.completed >= 5
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/40"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    Sub-paso 1e
                  </span>
                  {substepExecution.completed >= 5 ? (
                    <span className="text-xs font-bold text-[#1B7A2E] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Coincidencia 98.4%
                    </span>
                  ) : (
                    <Fingerprint className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <h5 className="font-heading font-bold text-xs text-on-surface mb-1">
                  1e. Cotejo Facial 1:1 (Azure Face Verify)
                </h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Comparación matemática vectorial entre la selfie viva y la fotografía del holograma
                  de la cédula. Umbral exigido: &gt;95%.
                </p>
              </div>

              {/* 1f */}
              <div
                className={`p-4 rounded-[10px] border transition-all ${
                  substepExecution.completed >= 6
                    ? "bg-[#EAF5EC] border-[#1B7A2E]/40"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    Sub-paso 1f
                  </span>
                  {substepExecution.completed >= 6 ? (
                    <span className="text-xs font-bold text-[#1B7A2E] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> C.C. VIGENTE
                    </span>
                  ) : (
                    <Database className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <h5 className="font-heading font-bold text-xs text-on-surface mb-1">
                  1f. Consulta SOAP ANI (RNEC)
                </h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Validación contra el Archivo Nacional de Identificación (~46M de registros):
                  estadoCedula=VIGENTE (descarta canceladas por defunción o suplantación).
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#CC0E35] hover:bg-[#A60B2B] text-white text-xs font-heading font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>Avanzar al Paso 2: Desafío de Contacto</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: DESAFÍO OTP */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-on-surface">
                Paso 2: Desafío de Contacto (ContactChallengeService)
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Antes de emitir cualquier credencial, la plataforma verifica la posesión efectiva del
                celular y correo electrónico enviando un código de un solo uso (OTP).
              </p>
            </div>

            <div className="p-6 rounded-[12px] bg-surface-container-low border border-surface-container-high space-y-4">
              <div className="flex items-center justify-between p-3 rounded-[8px] bg-white border border-gray-200 text-xs">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-tertiary" />
                  <div>
                    <span className="font-bold text-on-surface block">Teléfono Celular Registrado</span>
                    <span className="text-on-surface-variant">+57 312 ••• ••89</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#EAF5EC] text-[#1B7A2E] text-[11px] font-bold">
                  Código SMS Enviado
                </span>
              </div>

              <div>
                <label
                  htmlFor="otp-code-input"
                  className="font-heading font-bold text-xs text-on-surface block mb-1.5"
                >
                  Ingresa el código OTP de 6 dígitos:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="otp-code-input"
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-44 text-center font-mono text-lg font-bold tracking-widest px-3 py-2 rounded-[6px] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setOtpVerified(true)}
                    className="px-4 py-2 rounded-[5px] bg-primary text-white text-xs font-heading font-bold hover:bg-primary-hover transition-colors cursor-pointer"
                  >
                    Verificar
                  </button>
                </div>
                {otpVerified && (
                  <p className="text-xs text-[#1B7A2E] font-semibold mt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Canal móvil y correo validados satisfactoriamente con TTL de un solo uso.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-[5px] border border-gray-300 text-xs font-semibold text-on-surface hover:bg-gray-50 cursor-pointer"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#CC0E35] hover:bg-[#A60B2B] text-white text-xs font-heading font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>Avanzar al Paso 3: Datos de Domicilio</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: DOMICILIO */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 text-[#9E6900] mx-auto flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-on-surface">
                Paso 3: Información de Residencia y Focalización Distrital
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Datos declarados por la persona en el componente µFE para habilitar subsidios locales y
                trámites territoriales de Bogotá D.C.
              </p>
            </div>

            <div className="p-6 rounded-[12px] bg-surface-container-low border border-surface-container-high space-y-4 text-xs">
              <div>
                <label
                  htmlFor="localidad-select"
                  className="font-heading font-bold text-on-surface block mb-1.5"
                >
                  Localidad de Bogotá:
                </label>
                <select
                  id="localidad-select"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-[6px] border border-gray-300 bg-white text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Kennedy">08 - Kennedy</option>
                  <option value="Suba">11 - Suba</option>
                  <option value="Bosa">07 - Bosa</option>
                  <option value="Engativá">10 - Engativá</option>
                  <option value="Teusaquillo">13 - Teusaquillo</option>
                  <option value="Ciudad Bolívar">19 - Ciudad Bolívar</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="direccion-input"
                  className="font-heading font-bold text-on-surface block mb-1.5"
                >
                  Dirección Declarada:
                </label>
                <input
                  id="direccion-input"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-[6px] border border-gray-300 bg-white text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="p-3 bg-white rounded-[8px] border border-gray-200 flex items-center justify-between">
                <span className="text-on-surface-variant font-medium">
                  Validación catastral IDECA / Datos Maestros:
                </span>
                <span className="text-[#1B7A2E] font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> CHIP Normalizado
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-[5px] border border-gray-300 text-xs font-semibold text-on-surface hover:bg-gray-50 cursor-pointer"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#CC0E35] hover:bg-[#A60B2B] text-white text-xs font-heading font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>Avanzar al Paso 4: Consentimiento</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASO 4: CONSENTIMIENTO Y EMISIÓN */}
        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#1B7A2E]/10 text-[#1B7A2E] mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-on-surface">
                Paso 4: Consentimiento Informado y Regla de Unicidad Activa
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Aprobación legal bajo la Ley 1581 de 2012 y verificación invariante en el servicio
                (<code>assertSingleActiveCredential</code>).
              </p>
            </div>

            <div className="p-6 rounded-[12px] bg-surface-container-low border border-surface-container-high space-y-4 text-xs">
              <label className="flex items-start gap-3 p-3 bg-white rounded-[8px] border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAceptado}
                  onChange={(e) => setConsentAceptado(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-on-surface leading-relaxed">
                  Autorizo el tratamiento de mis datos personales conforme a la política de privacidad de
                  la Alcaldía Mayor de Bogotá D.C. y acepto la emisión de mi Credencial de Identidad
                  Base en mi billetera BWallet.
                </span>
              </label>

              <div className="p-3 bg-white rounded-[8px] border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="font-heading font-bold text-on-surface block">
                    Regla Invariante: assertSingleActiveCredential
                  </span>
                  <span className="text-on-surface-variant text-[11px]">
                    Garantiza que una persona solo posea 1 credencial base activa simultáneamente.
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#EAF5EC] text-[#1B7A2E] font-bold text-[11px]">
                  ✓ Verificada
                </span>
              </div>

              {/* Resultado del Enrolamiento */}
              <div className="p-4 rounded-[8px] bg-primary/5 border border-primary/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-primary flex items-center gap-1.5">
                    <FileBadge className="w-4 h-4" />
                    IssuanceAuthorization Generada
                  </span>
                  <span className="font-mono text-[11px] font-bold bg-white px-2 py-0.5 rounded border border-primary/20 text-primary">
                    auth_98f4e2...b71c
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  El Identity Verification Service ha sellado el diagnóstico. Se ha generado la
                  autorización de emisión para Walt.id Issuer con un TTL de 15 minutos para ser
                  reclamada desde BWallet.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-[5px] border border-gray-300 text-xs font-semibold text-on-surface hover:bg-gray-50 cursor-pointer"
              >
                Volver
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1B7A2E] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Enrolamiento Completado
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kyc4StepsWizard;
