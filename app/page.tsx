"use client"; // Necesario para que el formulario funcione
import React, { useState } from 'react';
import { Camera, Bell, Lock, Phone, MapPin, Shield } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SafranSeguridad() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const { error } = await supabase.from('leads').insert([{
      nombre: formData.get('nombre'),
      whatsapp: formData.get('whatsapp'),
      servicio: formData.get('servicio'),
    }]);

    setLoading(false);
    if (!error) setEnviado(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar simplificado */}
      <nav className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-700">SAFRAN SEGURIDAD</h1>
        <a href="#contacto" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Cotizar</a>
      </nav>

      {/* Hero */}
      <header className="bg-blue-900 text-white py-16 px-4 text-center">
        <Shield className="w-16 h-16 mx-auto mb-4 text-orange-400" />
        <h2 className="text-4xl font-bold mb-4">Seguridad Profesional en Argentina</h2>
        <p className="text-xl opacity-90">Cámaras, Alarmas y Control de Accesos para Hogar y PyME.</p>
      </header>

      {/* Servicios */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <Camera className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="font-bold text-xl">Cámaras IP</h3>
          <p className="text-slate-600">Visualización remota Hikvision/Dahua.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <Bell className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="font-bold text-xl">Alarmas</h3>
          <p className="text-slate-600">Sistemas Garnet con aviso al celular.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <Lock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="font-bold text-xl">Accesos</h3>
          <p className="text-slate-600">Cerraduras inteligentes y biometría.</p>
        </div>
      </section>

      {/* Formulario de Leads */}
      <section id="contacto" className="py-16 bg-slate-100 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Presupuesto Online</h3>
          {enviado ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center font-bold">
              ¡Recibido! Te contactaremos por WhatsApp pronto.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="nombre" required placeholder="Tu Nombre o Empresa" className="w-full p-3 border rounded-lg" />
              <input name="whatsapp" required placeholder="Tu WhatsApp (ej: 1122334455)" className="w-full p-3 border rounded-lg" />
              <select name="servicio" className="w-full p-3 border rounded-lg">
                <option>Instalación de Cámaras</option>
                <option>Alarma Residencial</option>
                <option>Control de Accesos</option>
              </select>
              <button disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-700">
                {loading ? 'Enviando...' : 'Solicitar Información'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-10 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Phone size={20} /> <span>Consultas Técnicas: 11-XXXX-XXXX</span>
        </div>
        <p className="text-slate-500 text-sm">© 2024 Safran Seguridad - Argentina</p>
      </footer>
    </div>
  );
}