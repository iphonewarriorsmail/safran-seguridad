import React from 'react';
import { Shield, Camera, Bell, Lock, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function SafranSeguridad() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header / Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">SAFRAN <span className="text-slate-500">SEGURIDAD</span></h1>
          <div className="hidden md:flex space-x-6 font-medium">
            <a href="#servicios" className="hover:text-blue-600">Servicios</a>
            <a href="#blog" className="hover:text-blue-600">Blog</a>
            <a href="#contacto" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Cotizar Ahora</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Protección Inteligente para tu Hogar y PyME</h2>
          <p className="text-xl text-blue-100 mb-8">Instalación de cámaras, alarmas y control de accesos con tecnología de última generación en toda Argentina.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="#contacto" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition">Solicitar Presupuesto</a>
            <a href="https://wa.me/54911XXXXXXXX" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition flex items-center justify-center">
              WhatsApp Ventas
            </a>
          </div>
        </div>
      </header>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-16">Nuestras Soluciones de Seguridad</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Camera className="w-12 h-12 text-blue-600" />}
            title="Cámaras de Seguridad"
            desc="Sistemas IP y Analógicos. Visualización en vivo desde tu celular 24/7."
          />
          <ServiceCard 
            icon={<Bell className="w-12 h-12 text-blue-600" />}
            title="Alarmas Monitoreadas"
            desc="Sistemas anti-entradera con sensores de movimiento y rotura de cristales."
          />
          <ServiceCard 
            icon={<Lock className="w-12 h-12 text-blue-600" />}
            title="Control de Accesos"
            desc="Biometría y tarjetas magnéticas para consorcios y oficinas."
          />
        </div>
      </section>

      {/* Blog / Noticias Section */}
      <section id="blog" className="bg-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-12">Seguridad Informativa</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-blue-600 font-bold text-sm">NOTICIAS ARGENTINA</span>
              <h4 className="text-xl font-bold mt-2">Nueva Ley de Economía del Conocimiento: Impacto en Tecnología</h4>
              <p className="text-slate-600 mt-4">Cómo las nuevas regulaciones facilitan la importación de insumos de seguridad electrónica...</p>
              <button className="mt-4 text-blue-600 font-semibold underline">Leer más</button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-blue-600 font-bold text-sm">GUÍA TÉCNICA</span>
              <h4 className="text-xl font-bold mt-2">Cámaras 4K vs 1080p: ¿Cuál elegir para tu local?</h4>
              <p className="text-slate-600 mt-4">Analizamos costo-beneficio de las marcas Hikvision y Dahua para el mercado local...</p>
              <button className="mt-4 text-blue-600 font-semibold underline">Leer más</button>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario / Backend simulado */}
      <section id="contacto" className="py-20 px-4 max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border">
          <h3 className="text-2xl font-bold mb-6">Pedí tu Cotización Sin Cargo</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo / Empresa</label>
              <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Juan Pérez" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp</label>
              <input type="tel" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="11 1234 5678" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Servicio</label>
              <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Residencial (Casa/Dpto)</option>
                <option>PyME (Local/Oficina)</option>
                <option>Consorcio (Edificio)</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
              Enviar Solicitud
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">SAFRAN SEGURIDAD</h4>
            <p>Especialistas en seguridad electrónica en Argentina.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <div className="flex items-center space-x-2 mb-2"><Phone size={16}/> <span>+54 9 11 XXXX-XXXX</span></div>
            <div className="flex items-center space-x-2"><MapPin size={16}/> <span>Buenos Aires, Argentina</span></div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <p className="text-sm">CUIT: En trámite (Monotributo Cat. A)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
}