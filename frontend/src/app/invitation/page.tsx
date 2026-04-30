/**
 * Invitation page.
 * Landing page that contractors see when they click the invitation link.
 * Validates the invitation token and presents a CTA to begin the onboarding process.
 * Corresponds to HU-01 - Reception of invitation link.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Landmark, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Invitacion - NorthPay",
  description:
    "Ha sido invitado para completar su perfil de contratista en NorthPay y habilitar los pagos recurrentes.",
};

interface InvitationPageProps {
  searchParams: Promise<{
    token?: string;
    name?: string;
  }>;
}

export default async function InvitationPage({ searchParams }: InvitationPageProps) {
  const params = await searchParams;
  const contractorName = params.name ?? "Contratista";
  const token = params.token ?? "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
          {/* Left Panel - Branding */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/85" />

            <div className="relative flex h-full min-h-[520px] flex-col justify-between p-8">
              {/* Logo */}
              <div className="flex items-start">
                <div className="rounded-lg bg-white p-2 shadow-md">
                  <Image
                    src="/logo.png"
                    alt="NorthPay"
                    width={40}
                    height={40}
                    className="rounded"
                    priority
                  />
                </div>
              </div>

              {/* Watermark Typography */}
              <div className="select-none">
                <div
                  className="text-[4.5rem] font-black leading-[0.9] tracking-tighter text-white/10"
                  aria-hidden="true"
                >
                  NORTH
                  <br />
                  PAY
                </div>
              </div>

              {/* Platform Label */}
              <div>
                <h2 className="text-lg font-bold text-white">
                  Plataforma de Operador
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  Gestion agil, segura y transparente para su proceso
                  de contratacion y pagos.
                </p>

                {/* Decorative Lines */}
                <div className="mt-6 flex flex-col gap-2" aria-hidden="true">
                  <div className="h-1 w-3/4 rounded-full bg-white/20" />
                  <div className="h-1 w-1/2 rounded-full bg-white/15" />
                  <div className="h-1 w-2/5 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            {/* Mobile Logo */}
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="rounded-lg bg-primary p-2">
                <Image
                  src="/logo.png"
                  alt="NorthPay"
                  width={28}
                  height={28}
                  className="rounded"
                  priority
                />
              </div>
              <span className="text-sm font-bold text-primary">NorthPay</span>
            </div>

            {/* Mail Icon */}
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Invitacion a NorthPay
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Ha sido invitado para completar su perfil de contratista y
              habilitar los pagos recurrentes.
            </p>

            {/* Contractor Card */}
            <div className="mt-6 rounded-xl border bg-slate-50/80 p-5">
              <p className="text-xs text-muted-foreground">Estimado/a,</p>
              <p className="mt-1 text-base font-bold text-foreground">
                {contractorName}
              </p>

              <ul className="mt-5 space-y-3" aria-label="Beneficios del proceso">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>Proceso 100% digital</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 shrink-0 text-primary" />
                  <span>Validacion de documentos segura</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Landmark className="h-4 w-4 shrink-0 text-primary" />
                  <span>Configuracion de cuenta bancaria</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link href={`/onboarding/personal-data${token ? `?token=${token}` : ""}`} className="block">
                <Button
                  size="lg"
                  className="w-full gap-2 text-sm font-semibold h-12"
                  id="start-onboarding-cta"
                >
                  Comenzar la incorporacion
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Necesita ayuda?{" "}
                <Link
                  href="/support"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Contacte a soporte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
