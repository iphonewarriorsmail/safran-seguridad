import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ContactForm from "../components/ContactForm";
import { Metadata } from "next";
import { ShieldCheck, Cctv, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Instalación de Cámaras de Seguridad en CABA y GBA | Safra",
  description: "Protege tu hogar o empresa con sistemas de videovigilancia (CCTV, IP) de alta resolución. Monitoreo en vivo desde tu celular. Instaladores profesionales.",
};

export default function CamarasLanding() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Instalación de Cámaras de Seguridad",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Safra Seguridad"
    },
    "description": "Instalación profesional de sistemas de videovigilancia (CCTV y Cámaras IP) para hogares, empresas y consorcios."
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
              Videovigilancia Profesional
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Vigila lo que más te importa <span className="gradient-text">24/7</span>
            </h1>
            <p className="text-xl text-muted mb-8">
              Instalación de cámaras de seguridad con tecnología IA para detección humana, visión nocturna ColorVu y acceso remoto desde tu celular.
            </p>
            <a href="#contacto" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Solicitar Presupuesto
            </a>
          </div>
        </section>

        {/* Beneficios */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Cctv className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Alta Definición</h3>
              <p className="text-muted">Cámaras 2MP, 5MP y 4K para que no pierdas ningún detalle, de día y de noche.</p>
            </div>
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Acceso desde el Celular</h3>
              <p className="text-muted">Mira en tiempo real y revisa grabaciones pasadas estés donde estés, 100% gratis.</p>
            </div>
            <div className="bg-surface border border-border p-8 rounded-2xl card-glow">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Detección Inteligente</h3>
              <p className="text-muted">Filtra falsas alarmas y recibe alertas solo cuando se detecta una persona o vehículo.</p>
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
