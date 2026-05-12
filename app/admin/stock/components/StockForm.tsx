'use client'

import { useState, useEffect } from 'react'
import { saveStockItem, getStockFormData } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function StockForm({ item }: { item?: any }) {
  const [costPrice, setCostPrice] = useState<number>(item?.cost_price || 0)
  const [salePrice, setSalePrice] = useState<number>(item?.sale_price || 0)
  const [margin, setMargin] = useState<number>(item?.margin || 0)
  
  const [availableBrands, setAvailableBrands] = useState<{id: number, name: string}[]>([])
  const [availableCategories, setAvailableCategories] = useState<{id: number, name: string}[]>([])

  useEffect(() => {
    async function loadData() {
      const { brands, categories } = await getStockFormData()
      setAvailableBrands(brands)
      setAvailableCategories(categories)
    }
    loadData()
  }, [])

  // Handlers para cálculo bidireccional
  const handleSalePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0
    setSalePrice(val)
    if (costPrice > 0) {
      const newMargin = Math.round(((val - costPrice) / costPrice) * 100)
      setMargin(newMargin)
    }
  }

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0
    setMargin(val)
    if (costPrice > 0) {
      const newSale = Math.round(costPrice * (1 + val / 100))
      setSalePrice(newSale)
    }
  }

  const handleCostPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0
    setCostPrice(val)
    // Al cambiar el precio de stock, mantenemos el margen actual y recalculamos precio de venta
    const newSale = Math.round(val * (1 + margin / 100))
    setSalePrice(newSale)
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
            <input 
              list="categories-list"
              name="category" 
              defaultValue={item?.categories?.name || item?.category || ''} 
              placeholder="Seleccioná o escribí una categoría"
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
            />
            <datalist id="categories-list">
              {availableCategories.map(cat => (
                <option key={cat.id} value={cat.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input 
              list="brands-list"
              type="text" 
              name="brand" 
              defaultValue={item?.brands?.name || item?.brand || ''} 
              required 
              placeholder="Ej: Hikvision, Dahua..."
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
            />
            <datalist id="brands-list">
              {availableBrands.map(brand => (
                <option key={brand.id} value={brand.name} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Modelo</label>
          <input 
            type="text" 
            name="model" 
            defaultValue={item?.model || ''} 
            required 
            placeholder="Ej: DS-2CE56D0T-IRPF"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción Corta</label>
          <input 
            type="text" 
            name="description" 
            defaultValue={item?.description || ''} 
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
              name="cost_price" 
              value={costPrice || ''} 
              onChange={handleCostPriceChange}
              required 
              min="0"
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-accent mb-1">Precio Venta ($)</label>
            <input 
              type="number" 
              name="sale_price" 
              value={salePrice || ''} 
              onChange={handleSalePriceChange}
              required 
              min="0"
              className="w-full bg-background border border-accent/50 rounded-lg px-4 py-2 focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-emerald-500 mb-1">Margen (%)</label>
            <input 
              type="number" 
              value={margin || ''} 
              onChange={handleMarginChange}
              className="w-full bg-background border border-emerald-500/50 rounded-lg px-4 py-2 focus:border-emerald-500 outline-none text-emerald-500 font-bold"
            />
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-medium mb-1">Cantidad en Stock</label>
          <input 
            type="number" 
            name="quantity" 
            defaultValue={item?.quantity || 0} 
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
