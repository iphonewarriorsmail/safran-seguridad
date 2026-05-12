import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ContactForm from "../components/ContactForm";
import { Metadata } from "next";
import { BellRing, ShieldAlert, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Alarmas Monitoreadas para Hogar y Comercio | Safra",
  description: "Sistemas de alarma con monitoreo 24/7 y aviso a la policía. Instaladores certificados. Protege tu propiedad ante cualquier intrusión.",
};

export default function AlarmasLanding() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Instalación de Alarmas",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Safra Seguridad"
    },
    "description": "Instalación de sistemas de alarma monitoreadas para prevención de intrusiones en hogares y empresas."
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        
        {/* Hero */}
        <section className="section-padding bg-surface border-b border-border text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-4">
              Alarmas Inteligentes
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Tu propiedad blindada contra <span className="gradient-text">intrusos</span>
            </h1>
            <p className="text-xl text-muted mb-8">
              Instalamos sistemas de alarma cableados e inalámbricos de última generación. Activa, desactiva y recibe alertas directamente en tu celular.
            </p>
            <a href="#contacto" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Cotizar Alarma Ahora
            </a>
          </div>
        </section>

        {/* Beneficios */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <BellRing className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Respuesta Inmediata</h3>
              <p className="text-muted">Sensores de alta precisión que activan una sirena potente y envían notificación al instante ante cualquier evento.</p>
            </div>
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <ShieldAlert className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Monitoreo 24/7</h3>
              <p className="text-muted">Opcional conexión con central de monitoreo profesional para aviso rápido a policía y servicios de emergencia.</p>
            </div>
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Control Total App</h3>
              <p className="text-muted">Arma y desarma tu alarma, verifica el estado de las zonas y controla la seguridad desde tu smartphone.</p>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
