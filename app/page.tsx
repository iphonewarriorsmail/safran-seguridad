"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Bell, Lock, Phone, MapPin, Shield, Mail, Moon, Sun, CheckCircle, Users, Award, Zap, ChevronRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function SafranSeguridad() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sincronización del tema
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

  // Estilo de inputs consistente y legible en ambos modos
  const inputStyle = "w-full p-4 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b dark:border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-blue-700 dark:text-blue-400">
            SAFRAN <span className="font-light text-slate-500 dark:text-slate-400">SEGURIDAD</span>
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 hover:scale-110 transition-transform"
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun className="text-orange-400 w-5 h-5" /> : <Moon className="text-slate-500 w-5 h-5" />}
            </button>
            <a href="#contacto" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25">
              Cotizar Ahora
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-blue-900 dark:bg-slate-900 text-white py-28 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-800/50 dark:bg-blue-500/10 border border-blue-400/30 px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium tracking-wide">Tecnología de Vanguardia en Argentina</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
            Tu tranquilidad es <br />
            <span className="text-blue-400">nuestro compromiso.</span>
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto font-light mb-10 leading-relaxed">
            Diseñamos soluciones inteligentes de seguridad para que cuides lo que más valorás, con monitoreo real desde tu celular.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="#contacto" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl">
              Solicitar Presupuesto Gratis
            </a>
            <a href="#nosotros" className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-bold text-lg transition-all border border-white/20">
              Conocenos
            </a>
          </div>
        </div>
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
      </header>

      {/* SERVICIOS - Grid de Tarjetas */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Soluciones Integrales</h3>
          <p className="text-slate-500 dark:text-slate-400">Equipamiento oficial de marcas líderes como Hikvision y Dahua.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Camera className="w-10 h-10 text-blue-600 dark:text-blue-400" />} 
            title="Cámaras de Seguridad" 
            desc="Sistemas IP de alta resolución con visión nocturna y detección de movimiento." 
          />
          <ServiceCard 
            icon={<Bell className="w-10 h-10 text-blue-600 dark:text-blue-400" />} 
            title="Sistemas de Alarma" 
            desc="Alarmas Garnet inalámbricas. Recibí alertas instantáneas en tu smartphone." 
          />
          <ServiceCard 
            icon={<Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />} 
            title="Control de Accesos" 
            desc="Cerraduras electrónicas, biometría y tarjetas para consorcios y PyMEs." 
          />
        </div>
      </section>

      {/* SECCIÓN: ACERCA DE NOSOTROS */}
      <section id="nosotros" className="py-24 bg-white dark:bg-slate-900 border-y dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
            <h3 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">Protegiendo el futuro <br/>de cada cliente.</h3>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-8">
              En <strong>Safran Seguridad</strong>, fusionamos experiencia técnica con una atención humana y cercana. Entendemos que cada propiedad es única y requiere un análisis de riesgo profesional.
            </p>
            <div className="space-y-6">
              <FeatureItem icon={<Award />} title="Profesionalismo" desc="Instalaciones bajo normas de seguridad vigentes." />
              <FeatureItem icon={<Users />} title="Experiencia" desc="Cientos de hogares y comercios ya confían en nosotros." />
              <FeatureItem icon={<Zap />} title="Rapidez" desc="Soporte post-venta y mantenimiento técnico ágil." />
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[2.5rem] border dark:border-slate-700 shadow-inner">
            <h4 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">Nuestros Valores</h4>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border dark:border-slate-700">
                <h5 className="font-bold mb-2">Transparencia</h5>
                <p className="text-sm text-slate-500">Presupuestos detallados sin letras chicas ni costos ocultos.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border dark:border-slate-700">
                <h5 className="font-bold mb-2">Innovación</h5>
                <p className="text-sm text-slate-500">Actualización constante en software de monitoreo y hardware.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: BLOG PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-3xl font-bold">Blog de Seguridad</h3>
            <p className="text-slate-500">Noticias y consejos para estar siempre protegido.</p>
          </div>
          <button className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
            Ver todo <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <BlogCard 
            category="TUTORIAL"
            title="¿Cómo configurar tu DVR en el celular?"
            excerpt="Guía paso a paso para ver tus cámaras desde cualquier lugar del mundo."
          />
          <BlogCard 
            category="CONSEJOS"
            title="Detección de movimiento: ¿Cómo evitar falsas alarmas?"
            excerpt="Aprendé a configurar la sensibilidad de tus sensores para mascotas."
          />
          <BlogCard 
            category="NOVEDADES"
            title="Nuevas cámaras térmicas para PyMEs"
            excerpt="Lo último en tecnología de prevención ya llegó a Safran Seguridad."
          />
        </div>
      </section>

      {/* FORMULARIO DE CONTACTO */}
      <section id="contacto" className="py-24 bg-blue-600 dark:bg-blue-700 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3rem] shadow-2xl">
          <h3 className="text-4xl font-extrabold mb-4 text-center tracking-tight text-slate-900 dark:text-white">Empecemos hoy</h3>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-10">Completá el formulario y recibí un asesoramiento personalizado.</p>
          
          {enviado ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 p-10 rounded-3xl text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h4 className="text-2xl font-bold mb-2">¡Recibido!</h4>
              <p>Un técnico de Safran Seguridad se contactará por WhatsApp a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Nombre o Empresa</label>
                  <input name="nombre" required placeholder="Ej: Juan Pérez" className={inputStyle} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">WhatsApp</label>
                  <input name="whatsapp" required placeholder="Ej: 11 1234 5678" className={inputStyle} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Email</label>
                <input name="email" type="email" required placeholder="Ej: nombre@email.com" className={inputStyle} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Servicio de interés</label>
                <select name="servicio" className={inputStyle} required>
                  <option value="">Seleccioná una opción</option>
                  <option value="camaras">Cámaras de Seguridad</option>
                  <option value="alarmas">Sistemas de Alarma</option>
                  <option value="accesos">Control de Accesos</option>
                  <option value="mantenimiento">Mantenimiento / Service</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Tu consulta</label>
                <textarea name="mensaje" placeholder="Contanos brevemente qué necesitás..." rows={4} className={inputStyle}></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-blue-500/30 active:scale-95"
              >
                {loading ? 'Enviando...' : 'Enviar Solicitud Sin Cargo'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold text-blue-400 mb-2 tracking-tighter">SAFRAN SEGURIDAD</h4>
            <p className="text-slate-500 text-sm max-w-xs">Especialistas en seguridad electrónica y protección inteligente en Argentina.</p>
          </div>
          <div className="flex flex-col gap-3 text-slate-300">
            <div className="flex items-center gap-2"><Phone size={16} className="text-blue-500"/> <span>11-XXXX-XXXX</span></div>
            <div className="flex items-center gap-2"><Mail size={16} className="text-blue-500"/> <span>info@safranseguridad.com.ar</span></div>
            <div className="flex items-center gap-2"><MapPin size={16} className="text-blue-500"/> <span>Buenos Aires, Argentina</span></div>
          </div>
          <div className="text-slate-600 text-xs text-center md:text-right">
            © 2024 Safran Seguridad. <br/> Todos los derechos reservados. <br/> CUIT: En trámite.
          </div>
        </div>
      </footer>
    </div>
  );
}

// COMPONENTES AUXILIARES
function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-10 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:border-blue-500/50 transition-all group overflow-hidden relative">
      <div className="bg-blue-50 dark:bg-blue-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h4 className="text-2xl font-bold mb-4 dark:text-white">{title}</h4>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
      <div className="absolute -bottom-2 -right-2 opacity-5 text-blue-600 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-blue-600 dark:text-blue-400">{icon}</div>
      <div>
        <h5 className="font-bold text-slate-900 dark:text-white">{title}</h5>
        <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function BlogCard({ category, title, excerpt }: { category: string, title: string, excerpt: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="bg-slate-200 dark:bg-slate-800 aspect-video rounded-2xl mb-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest">{category}</span>
      </div>
      <h4 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{excerpt}</p>
      <span className="text-sm font-bold flex items-center gap-1">Leer artículo <ChevronRight size={16}/></span>
    </div>
  );
}
