import { COUNTRIES } from "@/constants/countries";
import z from "zod";

export const personalDataFieldsSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Full legal name must be at least 2 characters long")
    .max(100, "Full legal name must not exceed 100 characters")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
      "Full legal name contains invalid characters",
    ),
  birth_date: z
    .date({
      error: "Date of birth is required",
    })
    .max(new Date(), "Date of birth cannot be in the future")
    .refine((date) => {
      const today = new Date();
      const minValidDate = new Date(
        today.getFullYear() - 120,
        today.getMonth(),
        today.getDate(),
      );

      return date >= minValidDate;
    }, "Date of birth is not valid")
    .refine((date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 18;
    }, "You must be at least 18 years old"),
  nationality: z
    .string()
    .trim()
    .min(1, "Nationality is required")
    .max(60, "Nationality must not exceed 60 characters")
    .refine((nationality) => {
      return !!COUNTRIES.find((country) => country.name === nationality);
    }, "Nationality is invalid"),
  identification_number: z
    .string()
    .trim()
    .min(5, "Identification number must be at least 5 characters long")
    .max(30, "Identification number must not exceed 30 characters")
    .regex(
      /^[A-Za-z0-9-]+$/,
      "Identification number contains invalid characters",
    ),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number must be at least 8 characters long")
    .max(16, "Phone number must not exceed 16 characters")
    .regex(
      /^\+[1-9]\d+$/,
      "Phone number must start with + and include only digits",
    ),
  adress_street: z
    .string()
    .trim()
    .min(5, "Street address must be at least 5 characters long")
    .max(120, "Street address must not exceed 120 characters"),
  adress_city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters long")
    .max(80, "City must not exceed 80 characters")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/, "City contains invalid characters"),
  adress_zipcode: z
    .string()
    .trim()
    .min(3, "Postal code must be at least 3 characters long")
    .max(12, "Postal code must not exceed 12 characters")
    .regex(/^[A-Za-z0-9 -]+$/, "Postal code contains invalid characters"),
});

export type PersonalDataFields = z.infer<typeof personalDataFieldsSchema>;
