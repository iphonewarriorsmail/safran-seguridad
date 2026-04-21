'use client'

import { saveCalculatorItem } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CalculatorForm({ item }: { item?: any }) {
  return (
    <form action={saveCalculatorItem} className="max-w-2xl space-y-6">
      <input type="hidden" name="id" value={item?.id || ''} />
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/calculator" className="p-2 border border-border rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-black">{item ? 'Editar Valor' : 'Nuevo Valor de Calculadora'}</h1>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select 
            name="category" 
            defaultValue={item?.category || 'camaras'} 
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          >
            <option value="camaras">Cámaras</option>
            <option value="alarmas">Alarmas</option>
            <option value="monitoreo">Monitoreo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nombre del Servicio/Producto</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={item?.name || ''} 
            required 
            placeholder="Ej: Cámara IP 2MP"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <input 
            type="text" 
            name="description" 
            defaultValue={item?.description || ''} 
            required 
            placeholder="Ej: Alta definición con visión nocturna"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-accent mb-1">Valor en ARS ($)</label>
          <input 
            type="number" 
            name="price" 
            defaultValue={item?.price || ''} 
            required 
            min="0"
            className="w-full md:w-1/2 bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none font-bold"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/calculator" className="px-6 py-2 border border-border rounded-lg hover:bg-surface-hover font-bold">
          Cancelar
        </Link>
        <button type="submit" className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-bold hover:opacity-90">
          Guardar Valor
        </button>
      </div>
    </form>
  )
}
