/**
 * Onboarding store.
 * Manages the state of the contractor onboarding flow using Zustand.
 * Handles step progression, data persistence per step, and form state.
 */

import { create } from "zustand";
import type {
  OnboardingStep,
  PersonalDataPayload,
  OnboardingStatus,
} from "@/types/onboarding";
import { ONBOARDING_STEPS } from "@/types/onboarding";

interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  status: OnboardingStatus;
  personalData: PersonalDataPayload | null;
  isSubmitting: boolean;

  setCurrentStep: (step: OnboardingStep) => void;
  markStepCompleted: (step: OnboardingStep) => void;
  setPersonalData: (data: PersonalDataPayload) => void;
  setIsSubmitting: (submitting: boolean) => void;
  advanceToNextStep: () => void;
  canNavigateToStep: (step: OnboardingStep) => boolean;
  getCurrentStepIndex: () => number;
  reset: () => void;
}

const initialState = {
  currentStep: "personal-data" as OnboardingStep,
  completedSteps: [] as OnboardingStep[],
  status: "in-progress" as OnboardingStatus,
  personalData: null,
  isSubmitting: false,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),

  markStepCompleted: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),

  setPersonalData: (data) => set({ personalData: data }),

  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

  advanceToNextStep: () => {
    const { currentStep } = get();
    const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
    const nextIndex = currentIndex + 1;

    if (nextIndex < ONBOARDING_STEPS.length) {
      set({
        currentStep: ONBOARDING_STEPS[nextIndex],
      });
    }
  },

  canNavigateToStep: (step) => {
    const { completedSteps, currentStep } = get();
    if (step === currentStep) return true;
    const targetIndex = ONBOARDING_STEPS.indexOf(step);
    const stepsBeforeTarget = ONBOARDING_STEPS.slice(0, targetIndex);
    return stepsBeforeTarget.every((s) => completedSteps.includes(s));
  },

  getCurrentStepIndex: () => {
    const { currentStep } = get();
    return ONBOARDING_STEPS.indexOf(currentStep);
  },

  reset: () => set(initialState),
}));
