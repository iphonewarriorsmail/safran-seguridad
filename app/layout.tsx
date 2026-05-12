import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Safra Seguridad",
    image: "https://safraseguridad.com.ar/logo.png",
    "@id": "https://safraseguridad.com.ar",
    url: "https://safraseguridad.com.ar",
    telephone: "+5491112345678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Falsa 123",
      addressLocality: "Buenos Aires",
      addressRegion: "CABA",
      postalCode: "C1000",
      addressCountry: "AR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "09:00",
      closes: "18:00"
    }
  };

  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <head>
        {/* Google Tag Manager - Ejemplo */}
        {/* <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script> */}
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
        height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe></noscript> */}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        {children}
      </body>
    </html>
  );
}
