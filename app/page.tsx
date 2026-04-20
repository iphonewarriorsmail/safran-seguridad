"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Bell, Lock, Phone, MapPin, Shield, Mail, Moon, Sun } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SafranSeguridad() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase.from('leads').insert([{
      nombre: formData.get('nombre'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'), // Nuevo campo
      servicio: formData.get('servicio'),
      mensaje: formData.get('mensaje'), // Nuevo campo
    }]);

    setLoading(false);
    if (error) {
      console.error("Error de Supabase:", error.message);
      alert("Error al enviar: " + error.message);
    } else {
      setEnviado(true);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">SAFRAN SEGURIDAD</h1>
          <div className="flex items-center gap-4">
             <a href="#contacto" className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">Cotizar</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-900 dark:bg-blue-950 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="relative z-10">
          <Shield className="w-16 h-16 mx-auto mb-6 text-orange-400 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Seguridad Profesional</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">Expertos en cámaras y alarmas para el mercado Argentino. Protegemos lo que más valorás.</p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </header>

      {/* Servicios */}
      <section className="py-20 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <ServiceCard 
          icon={<Camera className="text-blue-600 dark:text-blue-400" />} 
          title="Cámaras IP / Térmicas" 
          desc="Monitoreo en tiempo real desde cualquier lugar del mundo." 
        />
        <ServiceCard 
          icon={<Bell className="text-blue-600 dark:text-blue-400" />} 
          title="Sistemas de Alarma" 
          desc="Tecnología Garnet con sensores inteligentes anti-mascotas." 
        />
        <ServiceCard 
          icon={<Lock className="text-blue-600 dark:text-blue-400" />} 
          title="Control de Accesos" 
          desc="Cerraduras electrónicas y reconocimiento facial para PyMEs." 
        />
      </section>

      {/* Formulario de Leads */}
      <section id="contacto" className="py-20 bg-slate-100 dark:bg-slate-900 px-4">
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl border dark:border-slate-700">
          <h3 className="text-3xl font-bold mb-6 text-center">Iniciá tu proyecto</h3>
          
          {enviado ? (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-6 rounded-lg text-center font-bold">
              <CheckCircleIcon /> ¡Datos recibidos! Nos contactaremos a la brevedad.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="nombre" required placeholder="Nombre o Empresa" className="input-style" />
                <input name="whatsapp" required placeholder="WhatsApp (ej: 11...)" className="input-style" />
              </div>
              <input name="email" type="email" required placeholder="Email de contacto" className="input-style" />
              <select name="servicio" className="input-style">
                <option>Instalación de Cámaras</option>
                <option>Alarma Residencial</option>
                <option>Control de Accesos PyME</option>
                <option>Mantenimiento Técnico</option>
              </select>
              <textarea name="mensaje" placeholder="Contanos sobre tu necesidad (opcional)" rows={4} className="input-style"></textarea>
              
              <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50">
                {loading ? 'Procesando...' : 'Solicitar Presupuesto'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 text-slate-400">
            <span className="flex items-center gap-2"><Phone size={18}/> 11-XXXX-XXXX</span>
            <span className="flex items-center gap-2"><Mail size={18}/> info@safranseguridad.com.ar</span>
            <span className="flex items-center gap-2"><MapPin size={18}/> Buenos Aires, AR</span>
          </div>
          <p className="text-slate-600">© 2024 Safran Seguridad | Tecnología en Protección</p>
        </div>
      </footer>

      {/* Estilos locales rápidos */}
      <style jsx>{`
        .input-style {
          @apply w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all;
        }
      `}</style>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md border dark:border-slate-700 hover:border-blue-500 transition-all group text-center">
      <div className="mb-4 flex justify-center scale-110 group-hover:scale-125 transition-transform">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  );
}

function CheckCircleIcon() {
  return <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
}
