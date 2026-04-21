import React from "react";
import Image from "next/image";
import { Camera, Bell, Lock, Wifi, Smartphone, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Cámaras de Seguridad",
    description:
      "Sistemas CCTV IP con analíticos de inteligencia artificial, visión nocturna ColorVu, resolución 4K y monitoreo remoto desde tu celular.",
    features: ["Detección humana con IA", "Visión nocturna a color", "Monitoreo desde el celular", "Grabación en la nube"],
    image: "/images/camera-dome.png",
    brands: "Hikvision · Dahua",
  },
  {
    icon: Bell,
    title: "Alarmas Monitoreadas",
    description:
      "Sistemas de detección de intrusión con sensores perimetrales, magnéticos y de movimiento. Monitoreo profesional 24/7.",
    features: ["Monitoreo 24/7", "Sensores perimetrales", "Notificaciones al instante", "Verificación por video"],
    image: "/images/alarm-panel.png",
    brands: "Garnet · DSC · Paradox",
  },
  {
    icon: Lock,
    title: "Control de Accesos",
    description:
      "Lectores biométricos, tarjetas RFID, cerraduras inteligentes y torniquetes para edificios, oficinas y consorcios.",
    features: ["Huella digital y facial", "Tarjetas RFID", "Gestión remota web", "Integración con cámaras"],
    image: "/images/access-control.png",
    brands: "ZKTeco · Hikvision",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Soluciones de Seguridad{" "}
            <span className="gradient-text">a Medida</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Cada proyecto es único. Diseñamos sistemas integrales adaptados a las
            necesidades específicas de tu hogar, empresa o consorcio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group bg-surface border border-border rounded-2xl overflow-hidden card-glow"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs font-bold text-muted bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                    {service.brands}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <service.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-muted">
                      <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
