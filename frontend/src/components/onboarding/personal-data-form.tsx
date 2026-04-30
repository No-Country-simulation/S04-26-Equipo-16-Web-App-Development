/**
 * PersonalDataForm component.
 * Step 1 of the onboarding flow.
 * Collects identity and contact information with real-time validation.
 * Uses React Hook Form + Zod for schema-based validation.
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { personalDataSchema, type PersonalDataFormValues } from "@/schemas/personal-data.schema";
import { NATIONALITIES } from "@/constants/onboarding";
import { useOnboardingStore } from "@/store/onboarding.store";
import { cn } from "@/lib/utils";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="mt-1 text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-200"
      role="alert"
    >
      {message}
    </p>
  );
}

function FieldSuccess({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 animate-in fade-in-0 zoom-in-75 duration-200"
      aria-hidden="true"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export function PersonalDataForm() {
  const { setPersonalData, markStepCompleted, advanceToNextStep, isSubmitting, setIsSubmitting } =
    useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm<PersonalDataFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Zod v4.3.x type overload mismatch with @hookform/resolvers v5; runtime works correctly
    resolver: zodResolver(personalDataSchema as any),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      identificationNumber: "",
      email: "",
      phone: "",
      residentialAddress: "",
    },
  });

  const nationalityValue = watch("nationality");

  const isFieldValid = (field: keyof PersonalDataFormValues): boolean => {
    return (
      Boolean(dirtyFields[field]) &&
      Boolean(touchedFields[field]) &&
      !errors[field]
    );
  };

  const onSubmit = async (data: PersonalDataFormValues) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setPersonalData(data);
      markStepCompleted("personal-data");
      toast.success("Datos personales guardados correctamente.", {
        description: "Puede continuar con la carga de documentos.",
      });
      advanceToNextStep();
    } catch {
      toast.error("Error al guardar los datos.", {
        description: "Intente nuevamente en unos momentos.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8"
      id="personal-data-form"
    >
      {/* Identity Section */}
      <section aria-labelledby="identity-heading">
        <h2
          id="identity-heading"
          className="text-base font-semibold text-foreground mb-5"
        >
          Informacion de Identidad
        </h2>

        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="fullName"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Nombre Completo
            </Label>
            <div className="relative">
              <Input
                id="fullName"
                placeholder="Ej. Juan Perez Garcia"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={cn(
                  "h-10 text-sm",
                  isFieldValid("fullName") && "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                )}
                {...register("fullName")}
              />
              <FieldSuccess show={isFieldValid("fullName")} />
            </div>
            <FieldError message={errors.fullName?.message} />
          </div>

          {/* Date of Birth & Nationality */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="dateOfBirth"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Fecha de Nacimiento
              </Label>
              <div className="relative">
                <Input
                  id="dateOfBirth"
                  type="date"
                  aria-invalid={Boolean(errors.dateOfBirth)}
                  aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : undefined}
                  className={cn(
                    "h-10 text-sm",
                    isFieldValid("dateOfBirth") && "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  )}
                  {...register("dateOfBirth")}
                />
                <FieldSuccess show={isFieldValid("dateOfBirth")} />
              </div>
              <FieldError message={errors.dateOfBirth?.message} />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="nationality"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Nacionalidad
              </Label>
              <Select
                value={nationalityValue}
                onValueChange={(value) => {
                  setValue("nationality", value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                }}
              >
                <SelectTrigger
                  id="nationality"
                  className={cn(
                    "h-10 text-sm",
                    isFieldValid("nationality") && "border-emerald-500"
                  )}
                  aria-invalid={Boolean(errors.nationality)}
                >
                  <SelectValue placeholder="Seleccione su nacionalidad" />
                </SelectTrigger>
                <SelectContent>
                  {NATIONALITIES.map((nat) => (
                    <SelectItem key={nat} value={nat}>
                      {nat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError message={errors.nationality?.message} />
            </div>
          </div>

          {/* Identification Number */}
          <div className="space-y-1.5">
            <Label
              htmlFor="identificationNumber"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Numero de Identificacion (DNI/NIE/Pasaporte)
            </Label>
            <div className="relative">
              <Input
                id="identificationNumber"
                placeholder="Ej. 12345678A"
                autoComplete="off"
                aria-invalid={Boolean(errors.identificationNumber)}
                aria-describedby={errors.identificationNumber ? "identificationNumber-error" : undefined}
                className={cn(
                  "h-10 text-sm",
                  isFieldValid("identificationNumber") && "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                )}
                {...register("identificationNumber")}
              />
              <FieldSuccess show={isFieldValid("identificationNumber")} />
            </div>
            <FieldError message={errors.identificationNumber?.message} />
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section aria-labelledby="contact-heading">
        <h2
          id="contact-heading"
          className="text-base font-semibold text-foreground mb-5"
        >
          Contacto y Ubicacion
        </h2>

        <div className="space-y-4">
          {/* Email & Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Correo Electronico
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(
                    "h-10 text-sm",
                    isFieldValid("email") && "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  )}
                  {...register("email")}
                />
                <FieldSuccess show={isFieldValid("email")} />
              </div>
              <FieldError message={errors.email?.message} />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Telefono de Contacto
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+34 600 000 000"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={cn(
                    "h-10 text-sm",
                    isFieldValid("phone") && "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  )}
                  {...register("phone")}
                />
                <FieldSuccess show={isFieldValid("phone")} />
              </div>
              <FieldError message={errors.phone?.message} />
            </div>
          </div>

          {/* Residential Address */}
          <div className="space-y-1.5">
            <Label
              htmlFor="residentialAddress"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Direccion Residencial
            </Label>
            <Textarea
              id="residentialAddress"
              placeholder="Calle, Numero, Piso, Ciudad, Codigo Postal"
              autoComplete="street-address"
              rows={3}
              aria-invalid={Boolean(errors.residentialAddress)}
              aria-describedby={errors.residentialAddress ? "residentialAddress-error" : undefined}
              className={cn(
                "text-sm resize-none",
                isFieldValid("residentialAddress") && "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
              )}
              {...register("residentialAddress")}
            />
            <FieldError message={errors.residentialAddress?.message} />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end border-t pt-6">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="min-w-[180px] gap-2 text-sm font-semibold"
          id="personal-data-submit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              Siguiente Paso
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Privacy Notice */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex gap-3">
          <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">
              Privacidad de Datos
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Sus datos personales estan protegidos y se utilizaran
              exclusivamente para el proceso de validacion y alta como
              contratista en la plataforma NorthPay.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
