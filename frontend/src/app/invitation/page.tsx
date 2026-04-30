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
    <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Espectacular fondo de imagen abstracto en tonos AZULES para que combine con la marca */}
      <div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"
      >
        {/* Fuerte desenfoque (blur) y oscurecimiento para mantener el contraste */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xl" />
      </div>

      {/* Tarjeta principal con efecto Glassmorphism */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white/95 backdrop-blur-2xl shadow-2xl shadow-blue-900/40 ring-1 ring-white/60">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
          {/* Left Panel - Branding */}
          <div className="relative hidden lg:block overflow-hidden bg-[#005B9F]">
            
            {/* Contenedor ESTRICTO que recorta el exceso de blanco que viene pegado en la parte superior e inferior del archivo logo.png.
                Al limitar la altura (h-[60%]), el overflow-hidden guillotina el color blanco. */}
            <div className="absolute top-1/2 left-0 w-full h-[65%] -translate-y-1/2 overflow-hidden">
              <Image
                src="/logo.png"
                alt="NorthPay"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center scale-[1.6]"
                priority
              />
              
              {/* MAGIA DE SOMBREADO (BLENDING): 
                  Funde el borde superior e inferior de la imagen con el color exacto del panel (#005B9F)
                  para ocultar mágicamente cualquier diferencia de tono de azul. */}
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#005B9F] via-[#005B9F]/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#005B9F] via-[#005B9F]/70 to-transparent pointer-events-none" />
            </div>
            
            {/* Sombra para el texto de abajo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-end p-8">
              {/* Platform Label */}
              <div>
                <h2 className="text-xl font-bold text-white drop-shadow-lg">
                  Plataforma de Operador
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow-md">
                  Gestion agil, segura y transparente para su proceso
                  de contratacion y pagos.
                </p>

                {/* Decorative Lines */}
                <div className="mt-6 flex flex-col gap-2" aria-hidden="true">
                  <div className="h-1 w-3/4 rounded-full bg-white/40" />
                  <div className="h-1 w-1/2 rounded-full bg-white/30" />
                  <div className="h-1 w-2/5 rounded-full bg-white/20" />
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
