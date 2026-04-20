"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Bell, Lock, Phone, MapPin, Shield, Mail, Moon, Sun, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SafranSeguridad() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Efecto para aplicar la clase 'dark' al documento
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
      (e.target as HTMLFormElement).reset(); // Limpiar formulario
    }
  }

  // Estilo común para inputs con alta visibilidad en Dark Mode
  const inputStyle = "w-full p-4 rounded-xl border bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-slate-700 dark:border-slate-500 dark:text-white dark:placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Navbar con Selector de Tema */}
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b dark:border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
            SAFRAN <span className="text-slate-500 dark:text-slate-300 font-light">SEGURIDAD</span>
          </h1>
          <div className="flex items-center gap-4">
            {/* Theme Switcher Chip */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-full border dark:border-slate-700 shadow-inner"
              title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              <Sun className={`w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-orange-500'}`} />
              <Moon className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-slate-400'}`} />
            </button>
             <a href="#contacto" className="hidden md:block bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition transform hover:scale-105 shadow">Cotizar</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-900 dark:bg-blue-950 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <Shield className="w-20 h-20 mx-auto mb-6 text-orange-400 animate-pulse" />
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter">Protección Profesional en Argentina</h2>
          <p className="text-2xl opacity-90 max-w-2xl mx-auto font-light">Cámaras, alarmas y control de accesos. Expertos en seguridad electrónica para Hogar y PyME.</p>
        </div>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
      </header>

      {/* Servicios */}
      <section className="py-24 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
        <ServiceCard 
          icon={<Camera className="w-12 h-12 text-blue-600 dark:text-blue-400" />} 
          title="Cámaras de Seguridad" 
          desc="Monitoreo IP en tiempo real, detección de movimiento e inteligencia artificial." 
        />
        <ServiceCard 
          icon={<Bell className="w-12 h-12 text-blue-600 dark
