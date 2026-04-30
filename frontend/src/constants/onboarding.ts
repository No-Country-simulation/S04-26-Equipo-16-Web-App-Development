import type { StepMetadata } from "@/types/onboarding";

export const STEPS_CONFIG: readonly StepMetadata[] = [
  {
    id: "personal-data",
    label: "Datos Personales",
    shortLabel: "Datos",
    stepNumber: 1,
    description:
      "Informacion basica para comenzar su proceso de alta.",
  },
  {
    id: "documents",
    label: "Documentos",
    shortLabel: "Documentos",
    stepNumber: 2,
    description:
      "Carga de documentos de identidad y comprobante de domicilio.",
  },
  {
    id: "contract",
    label: "Contrato",
    shortLabel: "Contrato",
    stepNumber: 3,
    description:
      "Revision y firma digital del contrato de incorporacion.",
  },
  {
    id: "payment",
    label: "Metodo de Pago",
    shortLabel: "Bancarios",
    stepNumber: 4,
    description:
      "Configuracion del metodo de pago y datos bancarios.",
  },
  {
    id: "verification",
    label: "Verificacion",
    shortLabel: "Revision",
    stepNumber: 5,
    description:
      "Verificacion de identidad mediante proceso KYC.",
  },
] as const;

export const NATIONALITIES = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "Mexico",
  "Nicaragua",
  "Panama",
  "Paraguay",
  "Peru",
  "Republica Dominicana",
  "Uruguay",
  "Venezuela",
  "Espana",
  "Estados Unidos",
  "Canada",
  "Otro",
] as const;

export const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const INVITATION_EXPIRY_HOURS = 72;

export const SESSION_TIMEOUT_MINUTES = 30;
