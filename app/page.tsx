"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Bell, Lock, Phone, MapPin, Shield, Mail, Moon, Sun, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase - Asegurate de tener las variables en Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    if (error) {
      console.error("Error de Supabase:", error.message);
      alert("Error al enviar: " + error.message);
    } else {
      setEnviado(true);
    }
  }

  const inputStyle = "w-full p-4 rounded-xl border bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Navbar */}
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b dark:border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
            SAFRAN <span className="text-slate-500 dark:text-slate-300 font-light">SEGURIDAD</span>
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-full border dark:border-slate-700 shadow-inner"
            >
              {darkMode ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-slate-500" />}
            </button>
             <a href="#contacto" className="hidden md:block bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition transform hover:scale-105">Cotizar</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-blue-900 dark:bg-blue-950 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <Shield className="w-20 h-20 mx-auto mb-6 text-orange-400 animate-pulse" />
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Protección Profesional en Argentina</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-light">Cámaras, alarmas y control de accesos para Hogar y PyME.</p>
        </div>
      </header>

      {/* Servicios */}
      <section className="py-20 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <ServiceCard 
          icon={<Camera className="w-12 h-12 text-blue-600 dark:text-blue-400" />} 
          title="Cámaras de Seguridad" 
          desc="Monitoreo IP en tiempo real con detección de movimiento." 
        />
        <ServiceCard 
          icon={<Bell className="w-12 h-12 text-blue-600 dark:text-blue-400" />} 
          title="Sistemas de Alarma" 
          desc="Alarmas inteligentes con aviso inmediato a tu celular." 
        />
        <ServiceCard 
          icon={<Lock className="w-12 h-12 text-blue-600 dark:text-blue-400" />} 
          title="Control de Accesos" 
          desc="Cerraduras electrónicas y biometría para empresas." 
        />
      </section>

      {/* Formulario */}
      <section id="contacto" className="py-20 bg-slate-100 dark:bg-slate-900/50 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl border dark:border-slate-700">
          <h3 className="text-3xl font-extrabold mb-8 text-center text-slate-950 dark:text-white">Solicitá tu Presupuesto</h3>
          
          {enviado ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 p-8 rounded-2xl text-center font-bold">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              ¡Datos recibidos! Te contactaremos pronto.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="nombre" required placeholder="Nombre o Empresa" className={inputStyle} />
                <input name="whatsapp" required placeholder="WhatsApp" className={inputStyle} />
              </div>
              <input name="email" type="email" required placeholder="Email de contacto" className={inputStyle} />
              <select name="servicio" className={inputStyle} required>
                <option value="">Sele
