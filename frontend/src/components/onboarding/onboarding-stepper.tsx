/**
 * OnboardingStepper component.
 * Renders a numbered step indicator with connecting lines.
 * Visually communicates progress through the 5-step onboarding flow.
 */

"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { STEPS_CONFIG } from "@/constants/onboarding";
import type { OnboardingStep } from "@/types/onboarding";
import { Check } from "lucide-react";

interface OnboardingStepperProps {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
}

export function OnboardingStepper({
  currentStep,
  completedSteps,
}: OnboardingStepperProps) {
  const currentIndex = STEPS_CONFIG.findIndex((s) => s.id === currentStep);

  return (
    <nav
      aria-label="Progreso del proceso de incorporacion"
      className="w-full px-2 sm:px-6"
    >
      <ol className="flex items-center w-full">
        {STEPS_CONFIG.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isPending = !isCompleted && !isCurrent;

          return (
            <Fragment key={step.id}>
              {/* Step Node */}
              <li className="relative flex flex-col items-center group">
                <div
                  className={cn(
                    "flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-bold transition-all duration-300 relative z-10",
                    isCurrent &&
                      "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25 ring-4 ring-primary/10",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isPending &&
                      "border-muted-foreground/30 bg-background text-muted-foreground"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
                  ) : (
                    step.stepNumber
                  )}
                </div>
                
                {/* Step Label (Absolute to prevent layout shift) */}
                <div className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 w-max text-center">
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs font-semibold transition-colors duration-300",
                      /* En movil solo mostramos el texto del paso actual para evitar superposicion */
                      !isCurrent && "hidden sm:block",
                      isCurrent && "text-primary",
                      isCompleted && "text-primary",
                      isPending && "text-muted-foreground/70"
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </div>
              </li>

              {/* Connecting Line */}
              {index < STEPS_CONFIG.length - 1 && (
                <li
                  className={cn(
                    "flex-1 h-[2px] mx-2 sm:mx-4 transition-colors duration-300",
                    index < currentIndex ? "bg-primary" : "bg-border"
                  )}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          );
        })}
      </ol>
      {/* Spacer to account for absolute positioned labels */}
      <div className="h-8 w-full" aria-hidden="true" />
    </nav>
  );
}
