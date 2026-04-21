import React from "react";
import { Award, Users, Zap, ShieldCheck, Wrench, HeadphonesIcon } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Profesionalismo",
    desc: "Técnicos certificados y materiales de primera línea: Hikvision, Dahua, Garnet, ZKTeco.",
  },
  {
    icon: Users,
    title: "Cercanía",
    desc: "Atención personalizada, presupuestos sin cargo y respuesta rápida ante cualquier consulta.",
  },
  {
    icon: Wrench,
    title: "Instalaciones Limpias",
    desc: "Cableado prolijo, configuraciones seguras y capacitación completa para que uses tu sistema al máximo.",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte Post-Venta",
    desc: "Mantenimiento preventivo, soporte remoto y asistencia técnica cuando la necesites.",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-4">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
              Más de una década{" "}
              <span className="gradient-text">protegiendo</span> lo que más
              valorás
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              En <strong className="text-foreground">Safra Seguridad</strong>, no
              solo instalamos dispositivos — diseñamos ecosistemas de protección
              integral. Desde el relevamiento inicial hasta el soporte
              post-instalación, acompañamos a nuestros clientes con soluciones a
              medida, tecnología de punta y un equipo técnico comprometido con la
              excelencia.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Trabajamos con las marcas líderes del mercado para garantizar
              confiabilidad, durabilidad y las mejores prestaciones en cada
              proyecto.
            </p>

            {/* Brand logos as text */}
            <div className="flex flex-wrap gap-4">
              {["Hikvision", "Dahua", "Garnet", "ZKTeco", "DSC"].map((brand) => (
                <span
                  key={brand}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted bg-surface border border-border rounded-lg"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-5 bg-surface border border-border rounded-xl card-glow"
              >
                <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 w-fit mb-3">
                  <v.icon className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-bold text-foreground mb-1">{v.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
