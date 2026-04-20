"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Bell, Lock, Phone, MapPin, Shield, Mail, Moon, Sun, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function SafranSeguridad() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

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
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Barra Navegación */}
      <nav className="p-6 flex justify-between items-center border-b dark:border-slate-800">
        <h1 className="text-2xl font-bold text-blue-600">SAFRAN SEGURIDAD</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {darkMode ? <Sun className="text-orange-400" /> : <Moon className="text-slate-600" />}
        </button>
      </nav>

      {/* Hero */}
      <header className="py-20 px-6 text-center bg-slate-50 dark:bg-slate-900/50">
        <Shield className="w-16 h-16 mx-auto mb-6 text-blue-600" />
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Seguridad en la que podés confiar</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto italic">
          "Tu tranquilidad y la de tu familia es nuestra máxima prioridad."
        </p>
      </header>

      {/* Servicios */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-8 border rounded-2xl dark:border-slate-800">
          <Camera className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="text-xl font-bold mb-2">Cámaras</h3>
          <p className="text-slate-500">Monitoreo IP 24hs desde tu celular.</p>
        </div>
        <div className="p-8 border rounded-2xl dark:border-slate-800">
          <Bell className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="text-xl font-bold mb-2">Alarmas</h3>
          <p className="text-slate-500">Sistemas inteligentes anti-entradera.</p>
        </div>
        <div className="p-8 border rounded-2xl dark:border-slate-800">
          <Lock className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="text-xl font-bold mb-2">Accesos</h3>
          <p className="text-slate-500">Control de entradas para PyMEs.</p>
        </div>
      </section>

      {/* Acerca de Nosotros */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">Sobre Nosotros</h3>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          En Safran Seguridad contamos con años de experiencia instalando confianza en Buenos Aires. 
          Somos especialistas técnicos que entendemos que no solo instalamos cámaras, sino que 
          brindamos tranquilidad a hogares y empresas argentinas con soluciones de última generación.
        </p>
      </section>

      {/* Formulario */}
      <section id="contacto" className="py-20 px-6 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl text-slate-900 dark:text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center">Pedí tu cotización</h3>
          {enviado ? (
            <div className="text-center py-10">
              <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
              <p className="font-bold text-xl">¡Recibido! Te contactaremos.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input name="nombre" required placeholder="Nombre o Empresa" className="p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700" />
              <input name="whatsapp" required placeholder="WhatsApp" className="p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700" />
              <input name="email" type="email" required placeholder="Email" className="p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700" />
              <select name="servicio" className="p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700">
                <option>Cámaras</option>
                <option>Alarmas</option>
                <option>Control de Acceso</option>
              </select>
              <textarea name="mensaje" placeholder="Tu consulta..." className="p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 h-24" />
              <button disabled={loading} className="bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-700">
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-10 text-center text-slate-400 text-sm">
        <p>Safran Seguridad | Argentina | 11-XXXX-XXXX</p>
      </footer>
    </div>
  );
}
