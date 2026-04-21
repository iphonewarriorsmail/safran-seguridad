'use client'

import { useState, useEffect } from 'react'
import { saveStockItem } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function StockForm({ item }: { item?: any }) {
  const [precioStock, setPrecioStock] = useState<number>(item?.precio_stock || 0)
  const [precioVenta, setPrecioVenta] = useState<number>(item?.precio_venta || 0)
  const [margen, setMargen] = useState<number>(item?.margen || 0)

  // Handlers para cálculo bidireccional
  const handlePrecioVentaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0
    setPrecioVenta(val)
    if (precioStock > 0) {
      const nuevoMargen = Math.round(((val - precioStock) / precioStock) * 100)
      setMargen(nuevoMargen)
    }
  }

  const handleMargenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0
    setMargen(val)
    if (precioStock > 0) {
      const nuevoVenta = Math.round(precioStock * (1 + val / 100))
      setPrecioVenta(nuevoVenta)
    }
  }

  const handlePrecioStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0
    setPrecioStock(val)
    // Al cambiar el precio de stock, mantenemos el margen actual y recalculamos precio de venta
    const nuevoVenta = Math.round(val * (1 + margen / 100))
    setPrecioVenta(nuevoVenta)
  }

  return (
    <form action={saveStockItem} className="max-w-3xl space-y-6">
      <input type="hidden" name="id" value={item?.id || ''} />
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/stock" className="p-2 border border-border rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-black">{item ? 'Editar Producto' : 'Nuevo Producto'}</h1>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select 
              name="category" 
              defaultValue={item?.category || 'Cámaras'} 
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
            >
              <option value="Cámaras">Cámaras</option>
              <option value="Alarmas">Alarmas</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Cables">Cables</option>
              <option value="Herramientas">Herramientas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input 
              type="text" 
              name="marca" 
              defaultValue={item?.marca || ''} 
              required 
              placeholder="Ej: Hikvision, Dahua..."
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Modelo</label>
          <input 
            type="text" 
            name="modelo" 
            defaultValue={item?.modelo || ''} 
            required 
            placeholder="Ej: DS-2CE56D0T-IRPF"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción Corta</label>
          <input 
            type="text" 
            name="descripcion" 
            defaultValue={item?.descripcion || ''} 
            required 
            placeholder="Cámara Domo Interior 2MP..."
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <label className="block text-sm font-bold text-muted mb-1">Precio Stock ($)</label>
            <input 
              type="number" 
              name="precio_stock" 
              value={precioStock || ''} 
              onChange={handlePrecioStockChange}
              required 
              min="0"
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-accent mb-1">Precio Venta ($)</label>
            <input 
              type="number" 
              name="precio_venta" 
              value={precioVenta || ''} 
              onChange={handlePrecioVentaChange}
              required 
              min="0"
              className="w-full bg-background border border-accent/50 rounded-lg px-4 py-2 focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-emerald-500 mb-1">Margen (%)</label>
            <input 
              type="number" 
              value={margen || ''} 
              onChange={handleMargenChange}
              className="w-full bg-background border border-emerald-500/50 rounded-lg px-4 py-2 focus:border-emerald-500 outline-none text-emerald-500 font-bold"
            />
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-medium mb-1">Cantidad en Stock</label>
          <input 
            type="number" 
            name="cantidad" 
            defaultValue={item?.cantidad || 0} 
            required 
            min="0"
            className="w-full md:w-1/3 bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/stock" className="px-6 py-2 border border-border rounded-lg hover:bg-surface-hover font-bold">
          Cancelar
        </Link>
        <button type="submit" className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-bold hover:opacity-90">
          Guardar Producto
        </button>
      </div>
    </form>
  )
}
