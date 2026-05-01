"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/constants/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import DatePicker from "@/components/ui/DatePicker";
import {
  type PersonalDataFields,
  personalDataFieldsSchema,
} from "@/validations/personal-data";

export default function PersonalDataForm() {
  const form = useForm<PersonalDataFields>({
    resolver: zodResolver(personalDataFieldsSchema),
  });

  function onSubmit(data: PersonalDataFields) {
    toast("Personal Data Sent", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      classNames: {
        content: "flex flex-col gap-2",
      },
    });
  }

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Personal Data</CardTitle>
        <CardDescription>
          Please provide your legal identification details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="personal-data-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="personal-data-form-fullname">
                Full Legal Name
              </FieldLabel>
              <Input
                id="personal-data-form-fullname"
                type="text"
                placeholder="e.g., Jane Doe"
                aria-invalid={!!form.formState.errors.full_name}
                {...form.register("full_name")}
              />
              {form.formState.errors.full_name && (
                <FieldError>
                  {form.formState.errors.full_name.message}
                </FieldError>
              )}
            </Field>
            <div className="flex gap-4">
              <Controller
                control={form.control}
                name="birth_date"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="personal-data-form-birth">
                      Date of Birth
                    </FieldLabel>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="nationality"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="personal-data-form-nationality">
                      Nationality
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id="personal-data-form-nationality"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Countries</SelectLabel>
                          {COUNTRIES.map((country) => (
                            <SelectItem value={country.name} key={country.id}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex gap-4">
              <Field>
                <FieldLabel htmlFor="personal-data-form-identification-number">
                  National ID / Passport Number
                </FieldLabel>
                <Input
                  id="personal-data-form-identification-number"
                  type="text"
                  placeholder="Enter ID number"
                  aria-invalid={!!form.formState.errors.identification_number}
                  {...form.register("identification_number")}
                />
                {form.formState.errors.identification_number && (
                  <FieldError>
                    {form.formState.errors.identification_number.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="personal-data-form-phone">
                  Phone Number
                </FieldLabel>
                <Input
                  id="personal-data-form-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  aria-invalid={!!form.formState.errors.phone}
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <FieldError>{form.formState.errors.phone.message}</FieldError>
                )}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="personal-data-form-adress-street">
                Residential Adress
              </FieldLabel>
              <Input
                id="personal-data-form-adress-street"
                type="text"
                placeholder="Street Adress"
                aria-invalid={!!form.formState.errors.adress_street}
                {...form.register("adress_street")}
              />
              {form.formState.errors.adress_street && (
                <FieldError>
                  {form.formState.errors.adress_street.message}
                </FieldError>
              )}
            </Field>
            <div className="flex gap-4">
              <Field>
                <Input
                  type="text"
                  placeholder="City"
                  aria-invalid={!!form.formState.errors.adress_city}
                  {...form.register("adress_city")}
                />
                {form.formState.errors.adress_city && (
                  <FieldError>
                    {form.formState.errors.adress_city.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <Input
                  type="text"
                  placeholder="Postal Code"
                  aria-invalid={!!form.formState.errors.adress_zipcode}
                  {...form.register("adress_zipcode")}
                />
                {form.formState.errors.adress_zipcode && (
                  <FieldError>
                    {form.formState.errors.adress_zipcode.message}
                  </FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button type="submit" form="personal-data-form">
          Next Step <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
