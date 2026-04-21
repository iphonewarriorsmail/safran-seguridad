import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Safra Seguridad",
  description: "Respuestas a todas tus dudas sobre cámaras de seguridad, alarmas y control de acceso. Safra Seguridad te asesora.",
};

const fullFaqs = [
  {
    q: "¿Cuántas cámaras necesito para mi casa o negocio?",
    a: "Depende del tamaño y los puntos vulnerables. Generalmente, una casa estándar requiere entre 4 y 6 cámaras para cubrir frentes, fondos y accesos. Ofrecemos relevamientos sin cargo para determinar la cantidad exacta."
  },
  {
    q: "¿Se puede ver desde el celular en tiempo real?",
    a: "Sí, todos nuestros sistemas (CCTV, DVR, NVR) se configuran con una aplicación gratuita para iOS y Android desde la cual puedes ver las cámaras en vivo y revisar grabaciones desde cualquier lugar del mundo."
  },
  {
    q: "¿Qué pasa con la alarma o cámaras si se corta la luz?",
    a: "Nuestros paneles de alarma cuentan con baterías de respaldo que mantienen el sistema funcionando por hasta 24/48 hs. Para las cámaras, recomendamos e instalamos UPS (sistemas de alimentación ininterrumpida) para garantizar la grabación continua."
  },
  {
    q: "¿Ofrecen garantía sobre la instalación y los equipos?",
    a: "Sí, todos los equipos que instalamos cuentan con garantía oficial de fábrica (generalmente 12 meses a 3 años según la marca) y ofrecemos garantía sobre nuestra mano de obra e instalación."
  },
  {
    q: "¿Trabajan con factura A?",
    a: "Sí, emitimos Factura A y B. Contamos con todo en regla para trabajar con empresas, consorcios e industrias."
  },
  {
    q: "¿Realizan mantenimiento de sistemas ya instalados por terceros?",
    a: "Sí, ofrecemos servicios de mantenimiento correctivo y preventivo, actualización de firmware y reparación de sistemas de cámaras y alarmas preexistentes."
  }
];

export default function PreguntasFrecuentesPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": fullFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Preguntas <span className="gradient-text">Frecuentes</span></h1>
            <p className="text-xl text-muted">Todo lo que necesitas saber sobre nuestras instalaciones de seguridad.</p>
          </div>

          <div className="space-y-6">
            {fullFaqs.map((faq, i) => (
              <div key={i} className="bg-surface border border-border rounded-2xl p-8 card-glow">
                <h3 className="text-xl font-bold mb-4">{faq.q}</h3>
                <p className="text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
