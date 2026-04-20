"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Bell, Lock, Phone, MapPin, Shield, Mail, Moon, Sun, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function SafranSeguridad() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { error } = await supabase.from('leads').insert([{
      nombre: formData.get('nombre'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      servicio: formData.get('servicio'),
      mensaje: formData.get('mensaje'),
    }]);
    setLoading(false);
    if (!error) setEnviado(true);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* HEADER MINIMALISTA */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter text-blue-700 dark:text-blue-400">
          SAFRAN <span className="text-slate-400 font-light">SEGURIDAD</span>
        </h1>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun size={20} className="text-orange-400" /> : <Moon size={20} className="text-slate-400" />}
          </button>
          <a href="#contacto" className="hidden md:block text-sm font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-600 transition-colors">
            PEDIR PRESUPUESTO
          </a>
        </div>
      </nav>

      {/* HERO SECTION - LIMPIO */}
      <header className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[1px] w-12 bg-blue-600"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">SEGURIDAD ELECTRÓNICA ARGENTINA</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            Protección <br/> inteligente.
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-light">
            Instalación profesional de cámaras, alarmas y control de accesos para quienes buscan tranquilidad absoluta en su hogar o empresa.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contacto" className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              Empezar ahora
            </a>
            <a href="#nosotros" className="px-10 py-5 rounded-full font-bold text-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
              Saber más
            </a>
          </div>
        </div>
      </header>

      {/* SERVICIOS - ESTILO CARDS ELEGANTES */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t dark:border-slate-900">
        <div className="grid md:grid-cols-3 gap-16">
          <ServiceItem 
            icon={<Camera size={32} />} 
            title="Sistemas de Video" 
            desc="Cámaras IP de alta fidelidad con monitoreo remoto nativo desde tu celular." 
          />
          <ServiceItem 
            icon={<Bell size={32} />} 
            title="Alarmas Garnet" 
            desc="Protección perimetral inteligente con aviso inmediato y sirenas de alta potencia." 
          />
          <ServiceItem 
            icon={<Lock size={32} />} 
            title="Control de Accesos" 
            desc="Cerraduras electrónicas y biometría para un control total de ingresos." 
          />
        </div>
      </section>

      {/* SECCIÓN NOSOTROS - TEXTO INSTITUCIONAL */}
      <section id="nosotros" className="bg-slate-50 dark:bg-slate-900/30 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Shield size={48} className="mx-auto mb-8 text-blue-600 opacity-20" />
          <h3 className="text-4xl font-bold mb-8 tracking-tight">Experiencia y Confianza</h3>
          <p className="text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-12">
            En <strong>Safran Seguridad</strong>, fusionamos tecnología de vanguardia con un compromiso humano innegociable. No vendemos equipos, diseñamos tranquilidad. Cada instalación es una promesa de protección para tu familia o tu negocio.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="font-black text-sm tracking-widest">HIKVISION</span>
            <span className="font-black text-sm tracking-widest">DAHUA</span>
            <span className="font-black text-sm tracking-widest">GARNET</span>
            <span className="font-black text-sm tracking-widest">DSC</span>
          </div>
        </div>
      </section>

      {/* FORMULARIO DE CONTACTO - REDISEÑO PROFESIONAL */}
      <section id="contacto" className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h3 className="text-5xl font-black mb-6 tracking-tighter">Hablemos de <br/> tu seguridad.</h3>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light mb-10">
              Completá el formulario y un técnico se pondrá en contacto para asesorarte sin cargo.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-500">
                <Phone size={20} className="text-blue-600" /> <span>+54 9 11 XXXX-XXXX</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500">
                <Mail size={20} className="text-blue-600" /> <span>info@safranseguridad.com.ar</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl">
            {enviado ? (
              <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
                <h4 className="text-2xl font-bold">¡Mensaje enviado!</h4>
                <p className="text-slate-500">Te contactaremos por WhatsApp a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Nombre completo</label>
                  <input name="nombre" required className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-3 outline-none focus:border-blue-600 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">WhatsApp</label>
                    <input name="whatsapp" required className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-3 outline-none focus:border-blue-600 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Email</label>
                    <input name="email" type="email" required className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-3 outline-none focus:border-blue-600 transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Servicio solicitado</label>
                  <select name="servicio" className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-3 outline-none focus:border-blue-600 transition-colors">
                    <option value="camaras">Cámaras de Seguridad</option>
                    <option value="alarma">Alarmas</option>
                    <option value="accesos">Control de Accesos</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Mensaje adicional</label>
                  <textarea name="mensaje" rows={3} className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-3 outline-none focus:border-blue-600 transition-colors" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-slate-900 dark:bg-blue-600 text-white py-5 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                  {loading ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-12 text-center text-slate-400 text-xs border-t dark:border-slate-900">
        © 2024 SAFRAN SEGURIDAD | BUENOS AIRES, ARGENTINA
      </footer>
    </div>
  );
}

function ServiceItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-6">
      <div className="text-blue-600">{icon}</div>
      <h4 className="text-2xl font-bold tracking-tight">{title}</h4>
      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
    </div>
  );
}
