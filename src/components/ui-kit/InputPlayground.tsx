"use client";

import {
  Check,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  RotateCcw,
  Search,
  ShieldCheck,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export type InputVariant =
  | "simple"
  | "email"
  | "password"
  | "once-only"
  | "prefix-icon"
  | "textarea";
export type CodeFormat = "react" | "html" | "css";

export const InputPlayground: React.FC = () => {
  const [variant, setVariant] = useState<InputVariant>("simple");
  const [codeTab, setCodeTab] = useState<CodeFormat>("react");
  const [copied, setCopied] = useState<boolean>(false);

  // Estados interactivos para los campos
  const [simpleValue, setSimpleValue] = useState<string>("Carlos Andrés Restrepo");
  const [emailValue, setEmailValue] = useState<string>("carlos.restrepo@bogota.gov.co");
  const [passwordValue, setPasswordValue] = useState<string>("Bogota2026*");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [textareaValue, setTextareaValue] = useState<string>(
    "Solicito información respecto a la homologación de mi trámite predial.",
  );

  // Modificadores de estado del Playground
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showHelper, setShowHelper] = useState<boolean>(true);
  const [forceError, setForceError] = useState<boolean>(false);

  // Validación dinámica de correo
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGeneratedReactCode = (): string => {
    switch (variant) {
      case "email":
        return `import React, { useState } from 'react';

export const InputEmailBogota = () => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);

  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      <div className="flex items-center justify-between">
        <label htmlFor="user-email" className="font-body text-[18px] font-medium text-[#1B1C1C]">
          Correo electrónico institucional ${isRequired ? '<span className="text-primary">*</span>' : '<span className="text-xs text-[#5E6061]">(Opcional)</span>'}
        </label>
      </div>
      <div className="relative">
        <input
          id="user-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="ejemplo@bogota.gov.co"
          aria-invalid={touched && !isValid}
          aria-describedby="email-helper"
          disabled={${isDisabled}}
          className="h-[44px] w-full px-4 rounded-[5px] border border-[#B0B0B0] bg-white font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2 disabled:bg-[#E4E2E1] disabled:cursor-not-allowed transition-all"
        />
        {touched && isValid && (
          <span className="material-symbols-outlined text-[20px] text-[#1B7A2E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            check_circle
          </span>
        )}
      </div>
      <p id="email-helper" className="font-body text-[12px] text-[#5E6061]">
        Le notificaremos el estado de su trámite distrital a esta dirección.
      </p>
    </div>
  );
};`;
      case "password":
        return `import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const InputPasswordBogota = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      <label htmlFor="user-pass" className="font-body text-[18px] font-medium text-[#1B1C1C]">
        Contraseña de acceso ${isRequired ? '<span className="text-primary">*</span>' : ""}
      </label>
      <div className="relative">
        <input
          id="user-pass"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          className="h-[44px] w-full pl-4 pr-11 rounded-[5px] border border-[#B0B0B0] bg-white font-body text-[16px] text-[#1B1C1C] focus:outline-none focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña en texto plano"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1 focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <span className="font-body text-[12px] text-[#5E6061]">
        Mínimo 8 caracteres, al menos una mayúscula y un número.
      </span>
    </div>
  );
};`;
      case "once-only":
        return `import React from 'react';
import { Lock } from 'lucide-react';

export const InputOnceOnlyBogota = () => {
  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      <div className="flex items-center justify-between">
        <label htmlFor="chip-catastral" className="font-body text-[18px] font-medium text-[#1B1C1C]">
          Código CHIP Predial (Catastro Bogotá)
        </label>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B7A2E] bg-[#EAF5EC] px-2 py-0.5 rounded border border-[#1B7A2E]/30">
          ✓ Dato Oficial Validado
        </span>
      </div>
      <div className="relative">
        <input
          id="chip-catastral"
          type="text"
          readOnly
          value="AAA0192XJOP"
          className="h-[44px] w-full pl-4 pr-11 rounded-[5px] border border-[#B0B0B0] bg-[#FAF9F5] font-mono text-[15px] font-semibold text-[#1B1C1C] cursor-default focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
        />
        <Lock className="w-4 h-4 text-[#5E6061] absolute right-3.5 top-1/2 -translate-y-1/2" />
      </div>
      <span className="font-body text-[12px] text-[#5E6061]">
        Obtenido automáticamente de la Unidad Administrativa Especial de Catastro Distrital (Principio Once-Only).
      </span>
    </div>
  );
};`;
      case "prefix-icon":
        return `<div className="flex flex-col gap-1 w-full max-w-md">
  <label htmlFor="search-input" className="font-body text-[18px] font-medium text-[#1B1C1C]">
    Buscar trámite o servicio distrital
  </label>
  <div className="relative">
    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
      search
    </span>
    <input
      id="search-input"
      type="search"
      placeholder="Ej: Impuesto Predial, Sisbén..."
      className="h-[44px] w-full pl-11 pr-4 rounded-[5px] border border-[#B0B0B0] bg-white font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
    />
  </div>
</div>`;
      case "textarea":
        return `<div className="flex flex-col gap-1 w-full max-w-md">
  <div className="flex items-center justify-between">
    <label htmlFor="motivo-solicitud" className="font-body text-[18px] font-medium text-[#1B1C1C]">
      Detalle o motivo de la solicitud ${isRequired ? '<span className="text-primary">*</span>' : ""}
    </label>
    <span className="text-[11px] font-mono text-on-surface-variant">0 / 200</span>
  </div>
  <textarea
    id="motivo-solicitud"
    rows={3}
    maxLength={200}
    placeholder="Describa brevemente los hechos o motivo..."
    className="w-full p-4 rounded-[5px] border border-[#B0B0B0] bg-white font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2 resize-none"
  />
  <span className="font-body text-[12px] text-[#5E6061]">
    Evite incluir información sensible o financiera en este campo.
  </span>
</div>`;
      default:
        return `<div className="flex flex-col gap-1 w-full max-w-md">
  <div className="flex items-center justify-between">
    <label htmlFor="nombre-completo" className="font-body text-[18px] font-medium text-[#1B1C1C]">
      Nombre completo del ciudadano ${isRequired ? '<span className="text-primary">*</span>' : ""}
    </label>
  </div>
  <input
    id="nombre-completo"
    type="text"
    placeholder="Ej: Laura Sofía Gómez"
    disabled={${isDisabled}}
    className="h-[44px] w-full px-4 rounded-[5px] border border-[#B0B0B0] bg-white font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2 disabled:bg-[#E4E2E1] disabled:cursor-not-allowed"
  />
  ${showHelper ? '<span className="font-body text-[12px] text-[#5E6061]">Tal como aparece en su documento de identidad.</span>' : ""}
</div>`;
    }
  };

  const getGeneratedHtmlCode = (): string => {
    return `<!-- Componente Input Bogotá Stack (Estándar 44px) -->
<div class="bogota-form-group">
  <label for="campo-texto" class="bogota-label">
    Nombre completo <span class="required-mark" aria-hidden="true">*</span>
  </label>
  <div class="bogota-input-container">
    <input
      type="text"
      id="campo-texto"
      name="nombreCompleto"
      class="bogota-input"
      placeholder="Ej: Carlos Restrepo"
      aria-describedby="campo-texto-help"
      required
    />
  </div>
  <span id="campo-texto-help" class="bogota-helper-text">
    Tal como figura en su documento distrital.
  </span>
</div>`;
  };

  const getGeneratedCssCode = (): string => {
    return `/* Tokens de Entrada Oficiales Kit UI Bogotá */
.bogota-label {
  font-family: 'Work Sans', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #1B1C1C;
  line-height: 24px;
  display: block;
  margin-bottom: 4px;
}

.bogota-input {
  height: 44px; /* Mínimo accesible WCAG */
  width: 100%;
  padding: 0 16px;
  border-radius: 5px; /* Radio estricto institucional */
  border: 1px solid #B0B0B0;
  background-color: #FFFFFF;
  font-family: 'Work Sans', sans-serif;
  font-size: 16px;
  color: #1B1C1C;
  transition: all 0.2s ease-in-out;
}

.bogota-input::placeholder {
  color: #8A8A8A;
}

.bogota-input:focus {
  outline: none;
  border-color: #3366CC;
  box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #0049AE;
}

.bogota-input:disabled {
  background-color: #E4E2E1;
  color: #8A8A8A;
  cursor: not-allowed;
}

.bogota-helper-text {
  font-family: 'Work Sans', sans-serif;
  font-size: 12px;
  color: #5E6061;
  margin-top: 4px;
}`;
  };

  const currentCode =
    codeTab === "react"
      ? getGeneratedReactCode()
      : codeTab === "html"
        ? getGeneratedHtmlCode()
        : getGeneratedCssCode();

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Selector de Variantes (Píldoras Superiores) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <span className="text-xs font-heading font-bold text-on-surface-variant uppercase tracking-wider shrink-0 mr-1">
          Variante:
        </span>
        <button
          type="button"
          onClick={() => setVariant("simple")}
          className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            variant === "simple"
              ? "bg-[#CC0E35] text-white shadow-xs"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          Texto Simple
        </button>
        <button
          type="button"
          onClick={() => setVariant("email")}
          className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            variant === "email"
              ? "bg-[#CC0E35] text-white shadow-xs"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          Correo (Validador en vivo)
        </button>
        <button
          type="button"
          onClick={() => setVariant("password")}
          className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            variant === "password"
              ? "bg-[#CC0E35] text-white shadow-xs"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          Contraseña (Ver/Ocultar)
        </button>
        <button
          type="button"
          onClick={() => setVariant("once-only")}
          className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            variant === "once-only"
              ? "bg-[#CC0E35] text-white shadow-xs"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          Once-Only (Certificado)
        </button>
        <button
          type="button"
          onClick={() => setVariant("prefix-icon")}
          className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            variant === "prefix-icon"
              ? "bg-[#CC0E35] text-white shadow-xs"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          Con Ícono Prefijo
        </button>
        <button
          type="button"
          onClick={() => setVariant("textarea")}
          className={`px-3 py-1.5 rounded-[5px] text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
            variant === "textarea"
              ? "bg-[#CC0E35] text-white shadow-xs"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          Área de Texto (Textarea)
        </button>
      </div>

      {/* ÁREA DE TRABAJO DEL PLAYGROUND: Vista Interactiva + Controles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lado Izquierdo: Canvas Interactivo en Vivo (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-[15px] p-6 sm:p-8 border border-surface-container-high shadow-xs flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B7A2E]" />
                <span className="text-xs font-heading font-bold text-on-surface uppercase tracking-wider">
                  Vista Previa Interactiva
                </span>
              </div>
              <span className="text-[11px] font-mono text-on-surface-variant font-medium">
                Caja 44px • WCAG 2.2 AA
              </span>
            </div>

            {/* RENDERIZADO DE LA VARIANTE ACTIVA */}
            <div className="max-w-md mx-auto py-4">
              {/* 1. TEXTO SIMPLE */}
              {variant === "simple" && (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="live-input-simple"
                      className="font-body text-[18px] font-medium text-[#1B1C1C]"
                    >
                      Nombre completo del ciudadano{" "}
                      {isRequired ? (
                        <span className="text-primary font-bold" aria-hidden="true">
                          *
                        </span>
                      ) : (
                        <span className="text-xs text-[#5E6061] font-normal">(Opcional)</span>
                      )}
                    </label>
                  </div>
                  <input
                    id="live-input-simple"
                    type="text"
                    disabled={isDisabled}
                    value={simpleValue}
                    onChange={(e) => setSimpleValue(e.target.value)}
                    placeholder="Ej: Carlos Restrepo"
                    className={`h-[44px] w-full px-4 rounded-[5px] font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] transition-all focus:outline-none ${
                      forceError
                        ? "border-[1.5px] border-[#BA1A1A] ring-2 ring-[#BA1A1A]/20"
                        : "border border-[#B0B0B0] focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
                    } ${isDisabled ? "bg-[#E4E2E1] text-[#8A8A8A] cursor-not-allowed" : "bg-white"}`}
                  />
                  {forceError ? (
                    <span className="font-body text-[12px] text-[#BA1A1A] font-medium flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      <span>* Este campo es para radicar el trámite.</span>
                    </span>
                  ) : showHelper ? (
                    <span className="font-body text-[12px] text-[#5E6061] mt-0.5">
                      Tal como aparece en su cédula de ciudadanía distrital.
                    </span>
                  ) : null}
                </div>
              )}

              {/* 2. CORREO ELECTRÓNICO */}
              {variant === "email" && (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="live-input-email"
                      className="font-body text-[18px] font-medium text-[#1B1C1C]"
                    >
                      Correo electrónico institucional{" "}
                      {isRequired && (
                        <span className="text-primary font-bold" aria-hidden="true">
                          *
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="live-input-email"
                      type="email"
                      disabled={isDisabled}
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="usuario@bogota.gov.co"
                      className={`h-[44px] w-full pl-4 pr-11 rounded-[5px] font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] transition-all focus:outline-none ${
                        forceError || (emailValue.length > 0 && !isEmailValid)
                          ? "border-[1.5px] border-[#BA1A1A] ring-2 ring-[#BA1A1A]/20"
                          : isEmailValid
                            ? "border-[1.5px] border-[#1B7A2E] ring-1 ring-[#1B7A2E]/20"
                            : "border border-[#B0B0B0] focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
                      } ${isDisabled ? "bg-[#E4E2E1] text-[#8A8A8A] cursor-not-allowed" : "bg-white"}`}
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      {isEmailValid && !forceError ? (
                        <span className="material-symbols-outlined text-[20px] text-[#1B7A2E]">
                          check_circle
                        </span>
                      ) : forceError || (emailValue.length > 0 && !isEmailValid) ? (
                        <span className="material-symbols-outlined text-[20px] text-[#BA1A1A]">
                          error
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {forceError || (emailValue.length > 0 && !isEmailValid) ? (
                    <span className="font-body text-[12px] text-[#BA1A1A] font-medium flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      <span>
                        El correo no es válido. Asegúrese de incluir @ y un dominio como
                        @bogota.gov.co.
                      </span>
                    </span>
                  ) : isEmailValid ? (
                    <span className="font-body text-[12px] text-[#1B7A2E] font-medium flex items-center gap-1 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Formato de correo electrónico válido.</span>
                    </span>
                  ) : showHelper ? (
                    <span className="font-body text-[12px] text-[#5E6061] mt-0.5">
                      Escriba su correo para recibir notificaciones del estado del trámite.
                    </span>
                  ) : null}
                </div>
              )}

              {/* 3. CONTRASEÑA */}
              {variant === "password" && (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="live-input-password"
                      className="font-body text-[18px] font-medium text-[#1B1C1C]"
                    >
                      Contraseña de autenticación{" "}
                      {isRequired && (
                        <span className="text-primary font-bold" aria-hidden="true">
                          *
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="live-input-password"
                      type={showPassword ? "text" : "password"}
                      disabled={isDisabled}
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      placeholder="••••••••••••"
                      className={`h-[44px] w-full pl-4 pr-11 rounded-[5px] font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] transition-all focus:outline-none ${
                        forceError
                          ? "border-[1.5px] border-[#BA1A1A]"
                          : "border border-[#B0B0B0] focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
                      } ${isDisabled ? "bg-[#E4E2E1] text-[#8A8A8A] cursor-not-allowed" : "bg-white"}`}
                    />
                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Ocultar contraseña" : "Ver contraseña en texto claro"
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#0049AE] rounded"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-on-surface" />
                      ) : (
                        <Eye className="w-5 h-5 text-on-surface-variant" />
                      )}
                    </button>
                  </div>
                  {showHelper && (
                    <span className="font-body text-[12px] text-[#5E6061] mt-0.5">
                      Mínimo 8 caracteres, al menos una mayúscula y un número.
                    </span>
                  )}
                </div>
              )}

              {/* 4. ONCE-ONLY */}
              {variant === "once-only" && (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="live-input-once-only"
                      className="font-body text-[18px] font-medium text-[#1B1C1C]"
                    >
                      Código CHIP Predial
                    </label>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B7A2E] bg-[#EAF5EC] px-2 py-0.5 rounded border border-[#1B7A2E]/30">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Dato Oficial Validado
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="live-input-once-only"
                      type="text"
                      readOnly
                      value="AAA0192XJOP"
                      className="h-[44px] w-full pl-4 pr-11 rounded-[5px] border border-[#B0B0B0] bg-[#FAF9F5] font-mono text-[15px] font-bold text-[#1B1C1C] cursor-default focus:outline-none focus:ring-2 focus:ring-[#0049AE]"
                    />
                    <Lock className="w-4 h-4 text-[#5E6061] absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <span className="font-body text-[12px] text-[#5E6061] mt-0.5">
                    Validado automáticamente con la Unidad Administrativa Especial de Catastro
                    Distrital (UAECD).
                  </span>
                </div>
              )}

              {/* 5. ÍCONO PREFIJO */}
              {variant === "prefix-icon" && (
                <div className="flex flex-col gap-1 w-full">
                  <label
                    htmlFor="live-input-search"
                    className="font-body text-[18px] font-medium text-[#1B1C1C]"
                  >
                    Búsqueda de trámites distritales
                  </label>
                  <div className="relative">
                    <span
                      className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none"
                      aria-hidden="true"
                    >
                      search
                    </span>
                    <input
                      id="live-input-search"
                      type="search"
                      disabled={isDisabled}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Buscar por palabra clave o entidad..."
                      className={`h-[44px] w-full pl-11 pr-4 rounded-[5px] font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] transition-all focus:outline-none ${
                        forceError
                          ? "border-[1.5px] border-[#BA1A1A]"
                          : "border border-[#B0B0B0] focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
                      } ${isDisabled ? "bg-[#E4E2E1] text-[#8A8A8A] cursor-not-allowed" : "bg-white"}`}
                    />
                  </div>
                  {showHelper && (
                    <span className="font-body text-[12px] text-[#5E6061] mt-0.5">
                      Filtra en tiempo real sobre las 12 guías y el catálogo de APIs.
                    </span>
                  )}
                </div>
              )}

              {/* 6. ÁREA DE TEXTO (TEXTAREA) */}
              {variant === "textarea" && (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="live-input-textarea"
                      className="font-body text-[18px] font-medium text-[#1B1C1C]"
                    >
                      Descripción de la solicitud{" "}
                      {isRequired && (
                        <span className="text-primary font-bold" aria-hidden="true">
                          *
                        </span>
                      )}
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        textareaValue.length >= 200
                          ? "text-[#BA1A1A] font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {textareaValue.length} / 200
                    </span>
                  </div>
                  <textarea
                    id="live-input-textarea"
                    rows={3}
                    maxLength={200}
                    disabled={isDisabled}
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    placeholder="Describa brevemente su requerimiento..."
                    className={`w-full p-4 rounded-[5px] font-body text-[16px] text-[#1B1C1C] placeholder:text-[#8A8A8A] transition-all focus:outline-none resize-none ${
                      forceError
                        ? "border-[1.5px] border-[#BA1A1A]"
                        : "border border-[#B0B0B0] focus:border-[#3366CC] focus:ring-2 focus:ring-[#0049AE] focus:ring-offset-2"
                    } ${isDisabled ? "bg-[#E4E2E1] text-[#8A8A8A] cursor-not-allowed" : "bg-white"}`}
                  />
                  {showHelper && (
                    <span className="font-body text-[12px] text-[#5E6061] mt-0.5">
                      Máximo 200 caracteres. No incluya contraseñas ni datos bancarios.
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-surface-container-high pt-4 mt-6 text-xs text-on-surface-variant">
            <span>
              Tokens:{" "}
              <code className="font-mono bg-surface-container px-1 py-0.5 rounded">h-44px</code> ·{" "}
              <code className="font-mono bg-surface-container px-1 py-0.5 rounded">
                rounded-[5px]
              </code>
            </span>
            <button
              type="button"
              onClick={() => {
                setSimpleValue("Carlos Andrés Restrepo");
                setEmailValue("carlos.restrepo@bogota.gov.co");
                setPasswordValue("Bogota2026*");
                setSearchValue("");
                setForceError(false);
                setIsDisabled(false);
              }}
              className="text-primary hover:underline font-semibold flex items-center gap-1 focus:outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer valores</span>
            </button>
          </div>
        </div>

        {/* Lado Derecho: Panel de Controles Rápidos (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-[15px] p-6 border border-surface-container-high shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-surface-container-high pb-3">
            <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">
              tune
            </span>
            <h4 className="font-heading text-sm font-bold text-on-surface">
              Configuración del Campo
            </h4>
          </div>

          <div className="flex flex-col gap-3 font-body text-xs">
            {/* Switch: Requerido */}
            <label className="flex items-center justify-between p-2 rounded-[6px] hover:bg-surface-container cursor-pointer transition-colors">
              <span className="font-medium text-on-surface">Campo Requerido (*)</span>
              <input
                type="checkbox"
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
            </label>

            {/* Switch: Deshabilitado */}
            <label className="flex items-center justify-between p-2 rounded-[6px] hover:bg-surface-container cursor-pointer transition-colors">
              <span className="font-medium text-on-surface">Deshabilitado (disabled)</span>
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
            </label>

            {/* Switch: Texto de ayuda */}
            <label className="flex items-center justify-between p-2 rounded-[6px] hover:bg-surface-container cursor-pointer transition-colors">
              <span className="font-medium text-on-surface">Mostrar Texto de Ayuda</span>
              <input
                type="checkbox"
                checked={showHelper}
                onChange={(e) => setShowHelper(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
            </label>

            {/* Switch: Forzar Error */}
            <label className="flex items-center justify-between p-2 rounded-[6px] hover:bg-surface-container cursor-pointer transition-colors">
              <span className="font-medium text-primary">Simular Estado de Error</span>
              <input
                type="checkbox"
                checked={forceError}
                onChange={(e) => setForceError(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
            </label>
          </div>

          <div className="mt-2 p-3 rounded-[8px] bg-surface-container-low border border-surface-container-high text-[11px] text-on-surface-variant flex flex-col gap-1">
            <strong className="text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary">info</span>
              Regla de Accesibilidad:
            </strong>
            <span>
              Todo campo interactivo debe tener su correspondiente etiqueta{" "}
              <code className="font-mono text-primary">&lt;label&gt;</code> vinculada semánticamente
              con <code className="font-mono text-primary">htmlFor</code>.
            </span>
          </div>
        </div>
      </div>

      {/* VISOR DE CÓDIGO FUENTE (REACT / HTML / CSS TOKENS) */}
      <div className="bg-[#1B1C1C] rounded-[15px] p-6 text-white shadow-md flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCodeTab("react")}
              className={`px-3 py-1 rounded-[5px] text-xs font-mono font-bold transition-colors ${
                codeTab === "react" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              React / TSX
            </button>
            <button
              type="button"
              onClick={() => setCodeTab("html")}
              className={`px-3 py-1 rounded-[5px] text-xs font-mono font-bold transition-colors ${
                codeTab === "html" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              HTML Semántico
            </button>
            <button
              type="button"
              onClick={() => setCodeTab("css")}
              className={`px-3 py-1 rounded-[5px] text-xs font-mono font-bold transition-colors ${
                codeTab === "css" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              CSS Tokens
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleCopyCode(currentCode)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-white/10 hover:bg-white/20 text-xs font-heading font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary w-fit"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </>
            )}
          </button>
        </div>

        <pre className="font-mono text-xs text-gray-200 overflow-x-auto p-2 leading-relaxed max-h-[360px] no-scrollbar">
          <code>{currentCode}</code>
        </pre>
      </div>
    </div>
  );
};
