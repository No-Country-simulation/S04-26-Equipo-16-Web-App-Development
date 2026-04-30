/**
 * Personal Data page.
 * Step 1 of the onboarding process.
 * Renders the stepper, personal data form, and privacy notice.
 * Corresponds to HU-03 and NOR-3 (Sprint 1).
 */

"use client";

import { OnboardingStepper } from "@/components/onboarding/onboarding-stepper";
import { PersonalDataForm } from "@/components/onboarding/personal-data-form";
import { useOnboardingStore } from "@/store/onboarding.store";

export default function PersonalDataPage() {
  const { currentStep, completedSteps } = useOnboardingStore();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Datos Personales
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Paso 1 de 5: Informacion basica para comenzar su proceso de alta.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-10">
        <OnboardingStepper
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>

      {/* Form Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <PersonalDataForm />
      </div>
    </div>
  );
}
