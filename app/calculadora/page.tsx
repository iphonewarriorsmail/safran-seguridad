import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { createClient } from '../utils/supabase/server';
import CalculatorWidget from "./CalculatorWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Presupuesto | Safra Seguridad",
  description: "Calcula el presupuesto estimado para tu sistema de cámaras, alarmas y control de acceso en simples pasos.",
};

export default async function CalculadoraPage() {
  const supabase = await createClient()
  const { data: items, error } = await supabase.from('calculator_items').select('*')

  // Fallback defaults if table doesn't exist
  const defaultItems = [
    { id: '1', category: 'camaras', name: 'Cámara IP 2MP', price: 50000, description: 'Alta definición' },
    { id: '2', category: 'camaras', name: 'Instalación por cámara', price: 25000, description: 'Mano de obra y materiales' },
    { id: '3', category: 'alarmas', name: 'Panel de Alarma', price: 150000, description: 'Central Garnet' },
    { id: '4', category: 'alarmas', name: 'Sensor de Movimiento', price: 20000, description: 'Interior antimascotas' },
    { id: '5', category: 'monitoreo', name: 'Abono Mensual', price: 15000, description: 'Monitoreo 24/7' },
  ]

  const dataToUse = (items && items.length > 0) ? items : defaultItems

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-4">
              Presupuesto Online
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              Calculadora de <span className="gradient-text">Seguridad</span>
            </h1>
            <p className="text-muted text-lg">
              Selecciona tus necesidades y obtén un estimado al instante.
            </p>
          </div>
          
          <CalculatorWidget items={dataToUse} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
