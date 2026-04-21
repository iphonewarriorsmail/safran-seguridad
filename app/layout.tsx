import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Safra Seguridad | Cámaras, Alarmas y Control de Acceso",
  description:
    "Instalación profesional de cámaras de seguridad, alarmas monitoreadas y control de acceso para hogares, empresas y consorcios. +10 años de experiencia. Hikvision, Dahua, Garnet.",
  keywords: [
    "cámaras de seguridad",
    "alarmas monitoreadas",
    "control de acceso",
    "CCTV",
    "seguridad electrónica",
    "Hikvision",
    "Dahua",
    "Garnet",
    "instalación cámaras",
    "videovigilancia",
  ],
  openGraph: {
    title: "Safra Seguridad | Protección Inteligente",
    description:
      "Sistemas de seguridad avanzada con soporte técnico especializado. Cámaras, alarmas y control de acceso.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
