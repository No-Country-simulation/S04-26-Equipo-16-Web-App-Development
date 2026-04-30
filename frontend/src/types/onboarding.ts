/**
 * Onboarding domain types.
 * Defines the data structures used throughout the contractor onboarding flow.
 */

export const ONBOARDING_STEPS = [
  "personal-data",
  "documents",
  "contract",
  "payment",
  "verification",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export interface StepMetadata {
  readonly id: OnboardingStep;
  readonly label: string;
  readonly shortLabel: string;
  readonly stepNumber: number;
  readonly description: string;
}

export interface PersonalDataPayload {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  identificationNumber: string;
  email: string;
  phone: string;
  residentialAddress: string;
}

export interface DocumentUpload {
  id: string;
  type: "identity" | "address-proof" | "additional";
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
}

export interface ContractPayload {
  accepted: boolean;
  signedAt: string | null;
  signatureHash: string | null;
}

export interface PaymentMethodPayload {
  method: "bank-transfer" | "wire" | "other";
  bankName: string;
  accountNumber: string;
  routingCode: string;
  currency: string;
  accountHolderName: string;
}

export interface VerificationPayload {
  identityPhotoId: string | null;
  selfieId: string | null;
  kycStatus: "not-started" | "in-progress" | "approved" | "rejected";
  kycScore: number | null;
}

export type OnboardingStatus =
  | "invited"
  | "registered"
  | "in-progress"
  | "pending-review"
  | "corrections-requested"
  | "approved"
  | "active"
  | "closed-inactivity";

export interface ContractorOnboarding {
  id: string;
  invitationToken: string;
  email: string;
  status: OnboardingStatus;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  personalData: PersonalDataPayload | null;
  documents: DocumentUpload[];
  contract: ContractPayload | null;
  paymentMethod: PaymentMethodPayload | null;
  verification: VerificationPayload | null;
  createdAt: string;
  updatedAt: string;
  activatedAt: string | null;
}

export interface InvitationData {
  contractorName: string;
  email: string;
  token: string;
  expiresAt: string;
  isExpired: boolean;
}
