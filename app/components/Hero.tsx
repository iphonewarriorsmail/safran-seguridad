"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-black gradient-text">
        +{count}{suffix}
      </div>
      <div className="text-sm text-slate-300 mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-security.png')" }}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
        <div className="animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 mb-6">
            Seguridad Electrónica Profesional
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up delay-100" style={{animationFillMode:'both'}}>
          Protección Inteligente{" "}
          <span className="gradient-text">para tu Hogar</span>{" "}
          y Empresa
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-200" style={{animationFillMode:'both'}}>
          Diseñamos e instalamos sistemas de cámaras de seguridad, alarmas
          monitoreadas y control de acceso con tecnología de última generación.
          Más de 10 años protegiendo lo que más valorás.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-300" style={{animationFillMode:'both'}}>
          <a href="#contacto" className="btn-primary text-base">
            Solicitar Presupuesto
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#servicios" className="btn-secondary text-base">
            Ver Servicios
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-in-up delay-400" style={{animationFillMode:'both'}}>
          <AnimatedStat value={500} suffix="" label="Instalaciones" />
          <AnimatedStat value={10} suffix="" label="Años de Experiencia" />
          <AnimatedStat value={24} suffix="/7" label="Soporte Técnico" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="w-6 h-6 text-slate-400" />
      </div>
    </header>
  );
}
