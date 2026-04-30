# Frontend - NorthPay

Interfaz de usuario para el onboarding de contratistas de NorthPay.

### Plataforma Centralizada para la Incorporacion de Contratistas

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

## Estructura del Proyecto

A continuacion se presenta la estructura de carpetas implementada para la arquitectura frontend:

```text
src/
├── app/                              # Next.js App Router (Rutas de la aplicacion)
│   ├── globals.css                   # Estilos globales y variables de Shadcn (Tailwind v4)
│   ├── layout.tsx                    # Layout principal y configuracion de fuentes (Inter)
│   ├── page.tsx                      # Root page (Redirige a /invitation)
│   ├── invitation/                   # Vista 1: Landing de invitacion
│   │   └── page.tsx
│   └── onboarding/                   # Flujo principal de onboarding
│       ├── layout.tsx                # Layout especifico del onboarding (Header, Providers)
│       └── personal-data/            # Vista 2: Formulario de datos personales
│           └── page.tsx
│
├── components/                       # Componentes visuales
│   ├── onboarding/                   # Componentes de dominio del flujo de onboarding
│   │   ├── index.ts                  # Barrel export
│   │   ├── onboarding-header.tsx     # Barra de navegacion superior
│   │   ├── onboarding-stepper.tsx    # Indicador de progreso del onboarding
│   │   └── personal-data-form.tsx    # Formulario con validaciones en tiempo real
│   └── ui/                           # Componentes base de Shadcn (Botones, Inputs, etc.)
│
├── constants/                        # Valores constantes y configuraciones estaticas
│   └── onboarding.ts                 # Configuracion de pasos, listas de paises, etc.
│
├── lib/                              # Utilidades generales
│   └── utils.ts                      # Funciones como `cn` para mezclar clases de Tailwind
│
├── schemas/                          # Esquemas de validacion runtime
│   ├── index.ts                      # Barrel export
│   └── personal-data.schema.ts       # Validacion Zod para los datos personales
│
├── store/                            # Manejo de estado global
│   └── onboarding.store.ts           # Zustand store para persistir el progreso del usuario
│
└── types/                            # Definiciones de tipos e interfaces de TypeScript
    ├── index.ts                      # Barrel export
    └── onboarding.ts                 # Tipos de dominio (Payloads, Steps, Status)
```

## Como Ejecutar

1. Instalar dependencias:
   ```bash
   pnpm install
   ```

2. Levantar el servidor de desarrollo:
   ```bash
   pnpm run dev
   ```

3. Rutas disponibles:
   - Invitacion: `http://localhost:3000/invitation?name=Nombre&token=abc123`
   - Datos Personales: `http://localhost:3000/onboarding/personal-data`

## Notas Arquitectonicas

- Separacion de Responsabilidades: La logica de negocio (Zustand), la validacion de datos (Zod) y las reglas de constantes estan totalmente desacopladas de la capa de componentes de React.
- Barrel Exports: Uso de archivos `index.ts` en carpetas clave para simplificar las importaciones.
- Server Components vs Client Components: Uso del modelo de Next.js App Router para renderizar componentes estaticos en el servidor y dejar `"use client"` solo donde se requiere interactividad o estado global.

## Integrantes del Equipo

| Nombre | Rol | Redes Sociales |
| ------ | --- | --------------- |
| Anthony Bañon | Dev Backend | [![LinkedIn](https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anthonybanion/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anthonybanion) |
| Geremy Salas | Dev Frontend | [![LinkedIn](https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](http://www.linkedin.com/in/geremy-jampier-salas-garcia-6a3a39302) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/geremyjampiersalasgarcia-eng/) |
| Zuleyma Ruíz Domínguez  | QA | [![LinkedIn](https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](http://www.linkedin.com/in/zuleyma-ruiz-dominguez) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ZuleRD) |
| Juan José Rodriguez | Dev Frontend | [![LinkedIn](https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juan-jose-rodriguez-valcke/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Zoranspiegel) |
| Matias Ezequiel ALvarez | Dev Backend | [![LinkedIn](https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matias-alvarez44/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](hhttps://github.com/Zoranspiegel) |
| Alejandro Serrano Herrera | Dev Fullstack | [![LinkedIn](https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/serranoh93/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SerranoH93) |
