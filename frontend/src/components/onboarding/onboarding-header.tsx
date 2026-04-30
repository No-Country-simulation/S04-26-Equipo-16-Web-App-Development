

"use client";

import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OnboardingHeaderProps {
  sectionLabel?: string;
}

export function OnboardingHeader({
  sectionLabel = "Alta de Contratista",
}: OnboardingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="NorthPay"
            width={32}
            height={32}
            className="rounded"
            priority
          />
          <span className="text-sm font-bold tracking-tight text-primary">
            NorthPay
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline-block">
            {sectionLabel}
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5"
              aria-label="Abrir ayuda"
            >
              <span className="hidden sm:inline-block text-xs">Ayuda</span>
              <HelpCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Contactar con soporte de NorthPay
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
