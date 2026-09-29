/**
 * Tipos e interfaces para componentes transaccionales de trámites distritales
 * Basado en las directrices de SGDS (Gobierno de Colombia / Bogotá) y Obelisco
 */

export type StepStatus = "completed" | "current" | "pending" | "disabled";

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  status?: StepStatus;
  optional?: boolean;
}

export interface OnceOnlyUserData {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  entidadOrigen: string;
  fechaValidacion: string;
}

export interface TramiteFormValues {
  email: string;
  telefono: string;
  localidad: string;
  direccionPredio: string;
  tipoSolicitud: string;
  aceptaTerminos: boolean;
}

export type FormErrors = Partial<Record<keyof TramiteFormValues, string>>;
