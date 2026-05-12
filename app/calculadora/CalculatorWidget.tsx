'use client'

import React, { useState } from 'react'
import { Calculator, ShieldCheck, Cctv, BellRing } from 'lucide-react'

export default function CalculatorWidget({ items }: { items: any[] }) {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState({
    camarasCount: 0,
    sensoresCount: 0,
    wantsMonitoreo: false
  })

  // Group items by category
  const getPrice = (category: string, nameSearch: string) => {
    const item = items.find(i => i.category === category && i.name.toLowerCase().includes(nameSearch))
    return item ? item.price : 0
  }

  const camaraPrice = getPrice('camaras', 'cámara') || 50000
  const camaraInstall = getPrice('camaras', 'instalación') || 25000
  const panelPrice = getPrice('alarmas', 'panel') || 150000
  const sensorPrice = getPrice('alarmas', 'sensor') || 20000
  const monitoreoPrice = getPrice('monitoreo', 'abono') || 15000

  const calculateTotal = () => {
    let total = 0
    if (selections.camarasCount > 0) {
      total += (camaraPrice + camaraInstall) * selections.camarasCount
    }
    if (selections.sensoresCount > 0) {
      total += panelPrice + (sensorPrice * selections.sensoresCount)
    }
    return total
  }

  const total = calculateTotal()

  return (
    <div className="bg-surface border border-border rounded-2xl p-8 card-glow">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-2 flex-1 rounded-full transition-colors ${step >= s ? 'bg-accent' : 'bg-surface-hover border border-border'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <Cctv className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Cámaras de Seguridad</h3>
              <p className="text-muted">¿Cuántas cámaras necesitas instalar?</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 my-8">
            <button 
              onClick={() => setSelections(s => ({...s, camarasCount: Math.max(0, s.camarasCount - 1)}))}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-2xl font-bold hover:bg-surface-hover hover:border-accent transition-colors"
            >
              -
            </button>
            <span className="text-4xl font-black w-16 text-center">{selections.camarasCount}</span>
            <button 
              onClick={() => setSelections(s => ({...s, camarasCount: s.camarasCount + 1}))}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-2xl font-bold hover:bg-surface-hover hover:border-accent transition-colors"
            >
              +
            </button>
          </div>
          
          <button onClick={() => setStep(2)} className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity">
            Siguiente Paso
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <BellRing className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Sistema de Alarma</h3>
              <p className="text-muted">¿Cuántos sensores de movimiento necesitas?</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 my-8">
            <button 
              onClick={() => setSelections(s => ({...s, sensoresCount: Math.max(0, s.sensoresCount - 1)}))}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-2xl font-bold hover:bg-surface-hover hover:border-accent transition-colors"
            >
              -
            </button>
            <span className="text-4xl font-black w-16 text-center">{selections.sensoresCount}</span>
            <button 
              onClick={() => setSelections(s => ({...s, sensoresCount: s.sensoresCount + 1}))}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-2xl font-bold hover:bg-surface-hover hover:border-accent transition-colors"
            >
              +
            </button>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="py-4 px-6 rounded-xl border border-border font-bold hover:bg-surface-hover transition-colors">
              Atrás
            </button>
            <button onClick={() => setStep(3)} className="flex-1 py-4 rounded-xl bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity">
              Siguiente Paso
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Resumen y Monitoreo</h3>
              <p className="text-muted">Deseas agregar monitoreo mensual?</p>
            </div>
          </div>

          <label className="flex items-center justify-between p-4 border border-border rounded-xl cursor-pointer hover:border-accent transition-colors mb-8">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={selections.wantsMonitoreo}
                onChange={(e) => setSelections(s => ({...s, wantsMonitoreo: e.target.checked}))}
                className="w-5 h-5 accent-accent"
              />
              <span className="font-bold">Monitoreo 24/7</span>
            </div>
            <span className="text-accent font-bold">+${monitoreoPrice.toLocaleString()}/mes</span>
          </label>

          <div className="p-6 bg-surface-hover rounded-xl border border-border mb-8">
            <h4 className="font-bold mb-4">Estimado Aproximado:</h4>
            <div className="text-4xl font-black text-accent mb-2">
              ${total.toLocaleString()}
            </div>
            <p className="text-sm text-muted">
              Este valor es estimativo e incluye instalación y equipamiento base. Puede variar según relevamiento técnico en domicilio.
            </p>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(2)} className="py-4 px-6 rounded-xl border border-border font-bold hover:bg-surface-hover transition-colors">
              Atrás
            </button>
            <a 
              href="#contacto" 
              className="flex-1 text-center py-4 rounded-xl bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity"
            >
              Contactar para Relevamiento
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
