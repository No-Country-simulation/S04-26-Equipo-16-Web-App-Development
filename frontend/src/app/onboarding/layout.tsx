/**
 * Onboarding layout.
 * Wraps all onboarding step pages with the shared header.
 * Provides the TooltipProvider context required by the header.
 */

import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";

export const metadata = {
  title: "Incorporacion - NorthPay",
  description: "Complete su proceso de incorporacion como contratista en NorthPay.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      {/* Fondo gris muy bajito (zinc-50) sólido y limpio, sin patrones ni puntos */}
      <div className="flex min-h-screen flex-col bg-zinc-50">
        <OnboardingHeader />
        <main className="flex-1">{children}</main>
      </div>
    </TooltipProvider>
  );
}
