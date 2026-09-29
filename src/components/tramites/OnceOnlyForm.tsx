"use client";

import { ButtonBogota } from "@/components/ui/ButtonBogota";
import type { FormErrors, OnceOnlyUserData, TramiteFormValues } from "@/types/tramites";
import {
  AlertCircle,
  CheckCircle2,
  Database,
  HelpCircle,
  Info,
  Lock,
  ShieldCheck,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export interface OnceOnlyFormProps {
  userData?: OnceOnlyUserData;
  onSubmitSuccess?: (values: TramiteFormValues) => void;
  onBack?: () => void;
  className?: string;
}

const DEFAULT_USER_DATA: OnceOnlyUserData = {
  nombres: "Carlos Alberto",
  apellidos: "Gómez Restrepo",
  tipoDocumento: "Cédula de Ciudadanía",
  numeroDocumento: "1.018.456.789",
  entidadOrigen: "Carpeta Ciudadana / Registraduría Nacional del Estado Civil",
  fechaValidacion: "21 de Septiembre de 2026, 08:30 AM",
};

const BOGOTA_LOCALIDADES = [
  "Usaquén",
  "Chapinero",
  "Santa Fe",
  "San Cristóbal",
  "Usme",
  "Tunjuelito",
  "Bosa",
  "Kennedy",
  "Fontibón",
  "Engativá",
  "Suba",
  "Barrios Unidos",
  "Teusaquillo",
  "Los Mártires",
  "Antonio Nariño",
  "Puente Aranda",
  "La Candelaria",
  "Rafael Uribe Uribe",
  "Ciudad Bolívar",
  "Sumapaz",
];

/**
 * Componente de Formulario de Trámite con directriz Once-Only
 * - Campos de Nombres y Cédula precargados y bloqueados (readOnly) con ícono de candado.
 * - Validación accesible sin alert(): mensajes de error debajo de cada campo en #CC0E35.
 * - UX Writing adaptado a servicios de la Alcaldía Mayor de Bogotá.
 */
export const OnceOnlyForm: React.FC<OnceOnlyFormProps> = ({
  userData = DEFAULT_USER_DATA,
  onSubmitSuccess,
  onBack,
  className = "",
}) => {
  const [values, setValues] = useState<TramiteFormValues>({
    email: "",
    telefono: "",
    localidad: "",
    direccionPredio: "",
    tipoSolicitud: "Certificado de Residencia Distrital",
    aceptaTerminos: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof TramiteFormValues, boolean>>>({});
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Validación estricta con directrices de UX Writing
  const validateField = (name: keyof TramiteFormValues, val: unknown): string => {
    switch (name) {
      case "email": {
        const emailStr = String(val || "").trim();
        if (!emailStr) {
          return "Este dato es necesario para continuar.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailStr)) {
          return "Ingresa un correo electrónico válido (ej. usuario@bogota.gov.co).";
        }
        return "";
      }
      case "telefono": {
        const telStr = String(val || "")
          .trim()
          .replace(/\D/g, "");
        if (!telStr) {
          return "Este dato es necesario para continuar.";
        }
        if (telStr.length < 10) {
          return "El número de contacto celular debe contener 10 dígitos.";
        }
        return "";
      }
      case "localidad": {
        if (!val || val === "") {
          return "Selecciona la localidad donde reside o se ubica el predio.";
        }
        return "";
      }
      case "direccionPredio": {
        const dirStr = String(val || "").trim();
        if (!dirStr) {
          return "Este dato es necesario para continuar.";
        }
        if (dirStr.length < 5) {
          return "Ingresa una dirección completa (ej. Carrera 7 # 32-16).";
        }
        return "";
      }
      case "tipoSolicitud": {
        if (!val) {
          return "Selecciona el tipo de trámite a gestionar.";
        }
        return "";
      }
      case "aceptaTerminos": {
        if (!val) {
          return "Debes aceptar los términos y tratamiento de datos para continuar.";
        }
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === "checkbox" ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Si el campo ya fue tocado, validar en tiempo real
    if (touched[name as keyof TramiteFormValues]) {
      const errorMsg = validateField(name as keyof TramiteFormValues, val);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(
      name as keyof TramiteFormValues,
      values[name as keyof TramiteFormValues],
    );
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos los campos como tocados
    const newTouched: Partial<Record<keyof TramiteFormValues, boolean>> = {
      email: true,
      telefono: true,
      localidad: true,
      direccionPredio: true,
      tipoSolicitud: true,
      aceptaTerminos: true,
    };
    setTouched(newTouched);

    // Validar todos los campos
    const newErrors: FormErrors = {};
    let hasError = false;

    for (const key of Object.keys(values) as (keyof TramiteFormValues)[]) {
      const errorMsg = validateField(key, values[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) {
      // Foco accesible al primer campo con error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-${firstErrorField}`);
      if (element) {
        element.focus();
      }
      return;
    }

    // Éxito: sin alert()
    setIsSubmittedSuccess(true);
    if (onSubmitSuccess) {
      onSubmitSuccess(values);
    }
  };

  return (
    <div
      className={`bg-surface rounded-card border border-gray-200 p-6 sm:p-8 shadow-sm ${className}`}
    >
      {/* Banner Explicativo del Principio Once-Only */}
      <div className="mb-6 rounded-card border border-tertiary/20 bg-tertiary/5 p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-btn bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
            <Database className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-sm sm:text-base text-tertiary">
                Principio Once-Only (Una Sola Vez) Activo
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                Interoperabilidad SGAB
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
              Tus datos de identidad fueron precargados automáticamente desde la{" "}
              <strong>Base de Datos Maestra del Distrito</strong> ({userData.entidadOrigen}). No
              necesitas adjuntar fotocopias de tu documento ni digitar información que la Alcaldía
              Mayor ya posee.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulario de Solicitud de Trámite Distrital"
      >
        {/* SECCIÓN 1: DATOS MAESTROS PRECARGADOS (READONLY CON CANDADO) */}
        <fieldset className="mb-8">
          <legend className="flex items-center gap-2 font-heading font-bold text-base text-text-main pb-2 border-b border-gray-200 w-full mb-4">
            <Lock className="w-4 h-4 text-gray-500" aria-hidden="true" />
            1. Datos de Identidad Validados (Solo Lectura)
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Campo Bloqueado: Nombres y Apellidos */}
            <div>
              <label
                htmlFor="field-nombres"
                className="flex items-center justify-between text-xs font-semibold text-text-main mb-1.5"
              >
                <span>Nombres y Apellidos</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 font-normal">
                  <Lock className="w-3 h-3 text-gray-400" aria-hidden="true" />
                  Bloqueado por seguridad
                </span>
              </label>
              <div className="relative">
                <input
                  id="field-nombres"
                  type="text"
                  readOnly
                  tabIndex={-1}
                  value={`${userData.nombres} ${userData.apellidos}`}
                  aria-describedby="nombres-help"
                  className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-btn text-sm font-medium text-gray-700 cursor-not-allowed select-none focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              <p id="nombres-help" className="text-[11px] text-gray-500 mt-1">
                Verificado mediante Registraduría Nacional / Carpeta Ciudadana.
              </p>
            </div>

            {/* Campo Bloqueado: Documento de Identidad */}
            <div>
              <label
                htmlFor="field-cedula"
                className="flex items-center justify-between text-xs font-semibold text-text-main mb-1.5"
              >
                <span>Documento de Identidad</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 font-normal">
                  <Lock className="w-3 h-3 text-gray-400" aria-hidden="true" />
                  Bloqueado por seguridad
                </span>
              </label>
              <div className="relative">
                <input
                  id="field-cedula"
                  type="text"
                  readOnly
                  tabIndex={-1}
                  value={`${userData.tipoDocumento} - ${userData.numeroDocumento}`}
                  aria-describedby="cedula-help"
                  className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-btn text-sm font-medium text-gray-700 cursor-not-allowed select-none focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              <p id="cedula-help" className="text-[11px] text-gray-500 mt-1">
                Estado de cédula: <strong>Vigente y habilitada</strong> para trámites en el
                Distrito.
              </p>
            </div>
          </div>
        </fieldset>

        {/* SECCIÓN 2: DATOS DEL TRÁMITE (EDITABLES CON VALIDACIÓN EN #CC0E35) */}
        <fieldset className="mb-8">
          <legend className="flex items-center gap-2 font-heading font-bold text-base text-text-main pb-2 border-b border-gray-200 w-full mb-4">
            <Info className="w-4 h-4 text-tertiary" aria-hidden="true" />
            2. Información de Contacto y Predio para el Trámite
          </legend>

          <div className="space-y-4 sm:space-y-5">
            {/* Tipo de Trámite */}
            <div>
              <label
                htmlFor="field-tipoSolicitud"
                className="block text-xs font-semibold text-text-main mb-1.5"
              >
                Tipo de Trámite a Realizar <span className="text-primary">*</span>
              </label>
              <select
                id="field-tipoSolicitud"
                name="tipoSolicitud"
                value={values.tipoSolicitud}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.tipoSolicitud}
                aria-describedby={errors.tipoSolicitud ? "error-tipoSolicitud" : undefined}
                className={`w-full px-3.5 py-2.5 bg-white border rounded-btn text-sm text-text-main transition-colors focus:outline-none focus:ring-2 ${errors.tipoSolicitud
                    ? "border-primary focus:ring-primary/20"
                    : "border-gray-300 focus:border-tertiary focus:ring-tertiary/20"
                  }`}
              >
                <option value="Certificado de Residencia Distrital">
                  Certificado de Residencia Distrital (SGAB)
                </option>
                <option value="Concepto de Uso de Suelo">
                  Concepto Técnico de Uso de Suelo (Secretaría de Planeación)
                </option>
                <option value="Paz y Salvo de Impuesto Predial">
                  Paz y Salvo de Impuesto Predial Unificado (Secretaría de Hacienda)
                </option>
                <option value="Inscripción al Registro Distrital de Proveedores">
                  Inscripción al Registro Distrital de Proveedores
                </option>
              </select>
              {errors.tipoSolicitud && (
                <p
                  id="error-tipoSolicitud"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-primary font-medium mt-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {errors.tipoSolicitud}
                </p>
              )}
            </div>

            {/* Fila: Correo y Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Correo Electrónico */}
              <div>
                <label
                  htmlFor="field-email"
                  className="block text-xs font-semibold text-text-main mb-1.5"
                >
                  Correo Electrónico de Notificación <span className="text-primary">*</span>
                </label>
                <input
                  id="field-email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.gov.co"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "error-email" : "email-desc"}
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-btn text-sm text-text-main transition-colors focus:outline-none focus:ring-2 ${errors.email
                      ? "border-primary focus:ring-primary/20"
                      : "border-gray-300 focus:border-tertiary focus:ring-tertiary/20"
                    }`}
                />
                {errors.email ? (
                  <p
                    id="error-email"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-primary font-medium mt-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {errors.email}
                  </p>
                ) : (
                  <p id="email-desc" className="text-[11px] text-gray-500 mt-1">
                    Aquí recibirás la constancia oficial y copia del radicado.
                  </p>
                )}
              </div>

              {/* Teléfono Móvil */}
              <div>
                <label
                  htmlFor="field-telefono"
                  className="block text-xs font-semibold text-text-main mb-1.5"
                >
                  Teléfono Celular de Contacto <span className="text-primary">*</span>
                </label>
                <input
                  id="field-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="3001234567"
                  maxLength={10}
                  value={values.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.telefono}
                  aria-describedby={errors.telefono ? "error-telefono" : "telefono-desc"}
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-btn text-sm text-text-main transition-colors focus:outline-none focus:ring-2 ${errors.telefono
                      ? "border-primary focus:ring-primary/20"
                      : "border-gray-300 focus:border-tertiary focus:ring-tertiary/20"
                    }`}
                />
                {errors.telefono ? (
                  <p
                    id="error-telefono"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-primary font-medium mt-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {errors.telefono}
                  </p>
                ) : (
                  <p id="telefono-desc" className="text-[11px] text-gray-500 mt-1">
                    10 dígitos para notificaciones SMS de estado.
                  </p>
                )}
              </div>
            </div>

            {/* Fila: Localidad y Dirección */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Localidad */}
              <div>
                <label
                  htmlFor="field-localidad"
                  className="block text-xs font-semibold text-text-main mb-1.5"
                >
                  Localidad de Bogotá D.C. <span className="text-primary">*</span>
                </label>
                <select
                  id="field-localidad"
                  name="localidad"
                  value={values.localidad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.localidad}
                  aria-describedby={errors.localidad ? "error-localidad" : undefined}
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-btn text-sm text-text-main transition-colors focus:outline-none focus:ring-2 ${errors.localidad
                      ? "border-primary focus:ring-primary/20"
                      : "border-gray-300 focus:border-tertiary focus:ring-tertiary/20"
                    }`}
                >
                  <option value="">-- Selecciona una localidad --</option>
                  {BOGOTA_LOCALIDADES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {errors.localidad && (
                  <p
                    id="error-localidad"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-primary font-medium mt-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {errors.localidad}
                  </p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <label
                  htmlFor="field-direccionPredio"
                  className="block text-xs font-semibold text-text-main mb-1.5"
                >
                  Dirección de Residencia o Predio <span className="text-primary">*</span>
                </label>
                <input
                  id="field-direccionPredio"
                  name="direccionPredio"
                  type="text"
                  placeholder="Carrera 7 # 32-16 Apto 402"
                  value={values.direccionPredio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.direccionPredio}
                  aria-describedby={errors.direccionPredio ? "error-direccionPredio" : undefined}
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-btn text-sm text-text-main transition-colors focus:outline-none focus:ring-2 ${errors.direccionPredio
                      ? "border-primary focus:ring-primary/20"
                      : "border-gray-300 focus:border-tertiary focus:ring-tertiary/20"
                    }`}
                />
                {errors.direccionPredio && (
                  <p
                    id="error-direccionPredio"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-primary font-medium mt-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {errors.direccionPredio}
                  </p>
                )}
              </div>
            </div>

            {/* Checkbox: Aceptación de Términos y Tratamiento de Datos */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  id="field-aceptaTerminos"
                  name="aceptaTerminos"
                  type="checkbox"
                  checked={values.aceptaTerminos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.aceptaTerminos}
                  aria-describedby={errors.aceptaTerminos ? "error-aceptaTerminos" : undefined}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 focus:ring-2"
                />
                <span className="text-xs sm:text-sm text-text-main leading-relaxed">
                  Declaro bajo la gravedad de juramento que la información suministrada es verídica
                  y autorizo el tratamiento de mis datos personales a la{" "}
                  <strong>Secretaría General de la Alcaldía Mayor de Bogotá</strong> conforme a la
                  Ley 1581 de 2012 y la política distrital de protección de datos.
                </span>
              </label>
              {errors.aceptaTerminos && (
                <p
                  id="error-aceptaTerminos"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-primary font-medium mt-1.5 pl-7"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {errors.aceptaTerminos}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Mensaje de Confirmación sin alert() si fue enviado */}
        {isSubmittedSuccess && (
          <output className="block mb-6 p-4 rounded-btn bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-heading font-bold text-sm">¡Información validada con éxito!</p>
              <p className="text-xs text-emerald-800 mt-0.5">
                Los datos fueron consolidados con interoperabilidad Once-Only. Procediendo al
                siguiente paso.
              </p>
            </div>
          </output>
        )}

        {/* Botones de Acción Accesibles (Mínimo 44x44px) */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-200">
          {onBack ? (
            <ButtonBogota
              type="button"
              variant="outline"
              size="md"
              onClick={onBack}
              className="w-full sm:w-auto"
            >
              Regresar al paso anterior
            </ButtonBogota>
          ) : (
            <div />
          )}

          <ButtonBogota type="submit" variant="primary" size="md" className="w-full sm:w-auto">
            Continuar al siguiente paso
          </ButtonBogota>
        </div>
      </form>
    </div>
  );
};
