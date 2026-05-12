import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ContactForm from "../components/ContactForm";
import { Metadata } from "next";
import { Lock, Fingerprint, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Sistemas de Control de Acceso para Empresas y Edificios | Safra",
  description: "Instalación de cerraduras electromagnéticas, biometría, tarjetas y molinetes. Gestiona quién entra y sale de tus instalaciones.",
};

export default function AccesosLanding() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Control de Acceso",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Safra Seguridad"
    },
    "description": "Soluciones de control de acceso físico mediante biometría, tarjetas y cerraduras electrónicas para edificios y oficinas."
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
              Accesos Seguros
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              El control absoluto de tus <span className="gradient-text">puertas</span>
            </h1>
            <p className="text-xl text-muted mb-8">
              Olvídate de las llaves tradicionales. Moderniza la seguridad de tu consorcio o empresa con biometría, tarjetas RFID y cerraduras electromagnéticas.
            </p>
            <a href="#contacto" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Asesoramiento Gratuito
            </a>
          </div>
        </section>

        {/* Beneficios */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Fingerprint className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Biometría Avanzada</h3>
              <p className="text-muted">Lectores de huella dactilar y reconocimiento facial para garantizar que solo personal autorizado ingrese a áreas críticas.</p>
            </div>
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cerraduras Magnéticas</h3>
              <p className="text-muted">Puertas blindadas y de vidrio aseguradas con electroimanes de alta potencia. Imposibles de forzar.</p>
            </div>
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gestión de Horarios</h3>
              <p className="text-muted">Registra entradas y salidas de empleados. Restringe el acceso en determinados días u horarios desde una PC.</p>
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
