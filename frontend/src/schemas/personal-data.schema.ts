/**
 * Personal Data validation schema.
 * Uses Zod for runtime type-safe validation integrated with React Hook Form.
 */

import { z } from "zod";

const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;
const IDENTIFICATION_REGEX = /^[A-Za-z0-9]{5,20}$/;

export const personalDataSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres.")
    .max(120, "El nombre completo no puede exceder 120 caracteres.")
    .refine(
      (value) => value.trim().includes(" "),
      "Debe ingresar nombre y apellido."
    ),

  dateOfBirth: z
    .string()
    .min(1, "La fecha de nacimiento es requerida.")
    .refine((value) => {
      const date = new Date(value);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      return age >= 18;
    }, "Debe ser mayor de 18 anos."),

  nationality: z
    .string()
    .min(1, "Debe seleccionar una nacionalidad."),

  identificationNumber: z
    .string()
    .min(1, "El numero de identificacion es requerido.")
    .regex(
      IDENTIFICATION_REGEX,
      "Formato de identificacion invalido. Solo letras y numeros (5-20 caracteres)."
    ),

  email: z
    .string()
    .min(1, "El correo electronico es requerido.")
    .email("Ingrese un correo electronico valido."),

  phone: z
    .string()
    .min(1, "El telefono de contacto es requerido.")
    .regex(
      PHONE_REGEX,
      "Formato de telefono invalido. Ej: +34600000000"
    ),

  residentialAddress: z
    .string()
    .min(10, "La direccion debe tener al menos 10 caracteres.")
    .max(300, "La direccion no puede exceder 300 caracteres."),
});

export type PersonalDataFormValues = z.infer<typeof personalDataSchema>;
