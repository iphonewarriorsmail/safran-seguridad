import React from "react";
import Image from "next/image";
import { Home, Building2, CheckCircle } from "lucide-react";

const segments = [
  {
    icon: Home,
    title: "Residencial",
    subtitle: "Protegé tu hogar y tu familia",
    image: "/images/residential.png",
    features: [
      "Cámaras WiFi con visión nocturna",
      "Alarma perimetral con sensores de movimiento",
      "Videoportero inteligente con app",
      "Monitoreo 24/7 desde tu celular",
      "Botón de pánico familiar",
    ],
  },
  {
    icon: Building2,
    title: "Empresas y Consorcios",
    subtitle: "Soluciones escalables y profesionales",
    image: "/images/corporate.png",
    features: [
      "CCTV IP con analíticos de IA",
      "Control de acceso vehicular y peatonal",
      "Integración con portería virtual",
      "Grabación en la nube con respaldo",
      "Auditorías y reportes de acceso",
    ],
  },
];

export default function Clients() {
  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-4">
            Segmentos
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Soluciones para{" "}
            <span className="gradient-text">Cada Necesidad</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Ya sea para tu hogar o tu empresa, diseñamos el sistema ideal
            adaptado a tu presupuesto y requerimientos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {segments.map((seg) => (
            <div
              key={seg.title}
              className="group bg-background border border-border rounded-2xl overflow-hidden card-glow"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={seg.image}
                  alt={seg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent/20 border border-accent/30 backdrop-blur-sm">
                    <seg.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{seg.title}</h3>
                    <p className="text-sm text-slate-300">{seg.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {seg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary-light transition-colors"
                >
                  Consultar ahora →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
