"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Bell, Lock, Phone, MapPin, Shield, Mail, Moon, Sun, CheckCircle, Users, Award, Zap } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function SafraSeguridad() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Alternar Modo Oscuro
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  const inputStyle = "w-full p-4 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      
      {/* Navbar */}
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b dark:border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-blue-700 dark:text-blue-400">SAFRA <span className="font-light text-slate-500">SEGURIDAD</span></h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 border dark:border-slate-700">
              {darkMode ? <Sun className="text-orange-400" /> : <Moon className="text-slate-500" />}
            </button>
            <a href="#contacto" className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-lg font-bold">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-gradient-to-b from-blue-900 to-blue-800 dark:from-slate-900 dark:to-slate-950 text-white py-24 px-4 text-center">
        <Shield className="w-16 h-16 mx-auto mb-6 text-blue-400" />
        <h2 className="text-5xl font-bold mb-4 tracking-tight">Tu tranquilidad es nuestro compromiso.</h2>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">Sistemas de seguridad avanzada con soporte técnico especializado en toda la región.</p>
      </header>

      {/* SECCIÓN: ACERCA DE NOSOTROS */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Protegiendo lo que más valorás</h3>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
              En <strong>Safra Seguridad</strong>, no solo instalamos dispositivos; diseñamos ecosistemas de protección integral. Con años de experiencia en el sector tecnológico, entendemos que la seguridad es la base de la libertad.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Award className="text-blue-600 mt-1" />
                <div><strong>Profesionalismo:</strong> Técnicos certificados y materiales de primera línea (Hikvision, Dahua, Garnet).</div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-blue-600 mt-1" />
                <div><strong>Cercanía:</strong> Atención personalizada y respuesta rápida ante cualquier incidencia.</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-600/10 dark:bg-blue-400/5 p-8 rounded-3xl border border-blue-200 dark:border-blue-900">
            <h4 className="text-2xl font-bold mb-4">¿Por qué elegirnos?</h4>
            <ul className="space-y-4">
              <li className="flex gap-2 items-center"><Zap className="text-orange-500"/> Instalaciones limpias y configuraciones seguras.</li>
              <li className="flex gap-2 items-center"><Zap className="text-orange-500"/> Monitoreo real desde tu smartphone.</li>
              <li className="flex gap-2 items-center"><Zap className="text-orange-500"/> Asesoramiento técnico sin cargo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECCIÓN: BLOG (PREVIEW) */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Blog de Seguridad & Tecnología</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <BlogCard 
              date="20 Abr 2024" 
              title="5 Claves para asegurar tu PyME en Argentina"
              excerpt="Analizamos los puntos vulnerables más comunes y cómo cubrirlos con tecnología IP."
            />
            <BlogCard 
              date="15 Abr 2024" 
              title="Cámaras con IA: Detección Humana"
              excerpt="Evitá falsas alarmas. Conocé cómo la inteligencia artificial filtra mascotas y sombras."
            />
            <BlogCard 
              date="10 Abr 2024" 
              title="Ley de Videovigilancia"
              excerpt="Todo lo que tenés que saber sobre la privacidad y el uso de cámaras en la vía pública."
            />
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="contacto" className="py-24 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl border dark:border-slate-700">
          <h3 className="text-3xl font-bold mb-8 text-center">Consultanos sin compromiso</h3>
          {enviado ? (
            <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <p className="text-xl font-bold text-green-800 dark:text-green-400">¡Mensaje enviado!</p>
              <p>Un asesor de Safra Seguridad te contactará por WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="nombre" required placeholder="Tu nombre o empresa" className={inputStyle} suppressHydrationWarning />
              <div className="grid md:grid-cols-2 gap-4">
                <input name="whatsapp" required placeholder="WhatsApp" className={inputStyle} suppressHydrationWarning />
                <input name="email" type="email" required placeholder="Email" className={inputStyle} suppressHydrationWarning />
              </div>
              <select name="servicio" className={inputStyle} required>
                <option value="">Seleccioná un servicio...</option>
                <option value="camaras">Cámaras de Seguridad</option>
                <option value="alarma">Alarmas Monitoreadas</option>
                <option value="accesos">Control de Accesos</option>
              </select>
              <textarea name="mensaje" placeholder="¿En qué podemos ayudarte?" rows={4} className={inputStyle}></textarea>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20">
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-10 text-center text-slate-500 border-t dark:border-slate-800">
        <p>© 2024 Safra Seguridad - Tecnología y Protección.</p>
      </footer>
    </div>
  );
}

function BlogCard({ date, title, excerpt }: { date: string, title: string, excerpt: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border dark:border-slate-700 hover:border-blue-500 transition-all">
      <span className="text-sm text-blue-600 dark:text-blue-400 font-bold">{date}</span>
      <h4 className="text-xl font-bold my-3">{title}</h4>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{excerpt}</p>
      <button className="text-blue-600 font-bold hover:underline">Leer más →</button>
    </div>
  );
}
