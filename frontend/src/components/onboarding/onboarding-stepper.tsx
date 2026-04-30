/**
 * OnboardingStepper component.
 * Renders a numbered step indicator with connecting lines.
 * Visually communicates progress through the 5-step onboarding flow.
 */

"use client";

import { cn } from "@/lib/utils";
import { STEPS_CONFIG } from "@/constants/onboarding";
import type { OnboardingStep } from "@/types/onboarding";

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
      className="w-full"
    >
      <ol className="flex items-center justify-between">
        {STEPS_CONFIG.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isPending = !isCompleted && !isCurrent;

          return (
            <li
              key={step.id}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center">
                  {index > 0 && (
                    <div
                      className={cn(
                        "h-px w-8 sm:w-12 md:w-16 lg:w-24 transition-colors duration-300",
                        index <= currentIndex
                          ? "bg-primary"
                          : "bg-border"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                      isCurrent &&
                        "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25",
                      isCompleted &&
                        "border-primary bg-primary text-primary-foreground",
                      isPending &&
                        "border-muted-foreground/30 bg-background text-muted-foreground"
                    )}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {isCompleted ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.stepNumber
                    )}
                  </div>
                  {index < STEPS_CONFIG.length - 1 && (
                    <div
                      className={cn(
                        "h-px w-8 sm:w-12 md:w-16 lg:w-24 transition-colors duration-300",
                        index < currentIndex
                          ? "bg-primary"
                          : "bg-border"
                      )}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-300 text-center",
                    isCurrent && "text-primary",
                    isCompleted && "text-primary",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {step.shortLabel}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
