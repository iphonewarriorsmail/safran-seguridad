import { createClient } from '../../utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2, Box } from 'lucide-react'
import { deleteStockItem } from './actions'

export default async function AdminStockPage() {
  const supabase = await createClient()
  const { data: stockItems, error } = await supabase
    .from('stock_items')
    .select('*, brands(name), categories(name)')
    .order('model', { ascending: true })

  // Agrupar por Categoría y luego por Marca
  const groupedStock = stockItems?.reduce((acc: any, item: any) => {
    const categoryName = item.categories?.name || 'Sin Categoría'
    const brandName = item.brands?.name || 'Sin Marca'
    
    if (!acc[categoryName]) acc[categoryName] = {}
    if (!acc[categoryName][brandName]) acc[categoryName][brandName] = []
    acc[categoryName][brandName].push(item)
    return acc
  }, {})

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black">Control de Stock</h1>
          <p className="text-muted">Inventario de equipos, cámaras y accesorios.</p>
        </div>
        <Link href="/admin/stock/new" className="bg-accent text-accent-foreground font-bold rounded-lg px-4 py-2 flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Agregar Producto
        </Link>
      </div>

      {error ? (
        <div className="bg-surface border border-border rounded-2xl p-6 text-rose-400">
          <h3 className="font-bold mb-2">Error de Base de Datos</h3>
          <p className="text-sm opacity-80 mb-4">{error.message}</p>
          <p className="text-sm">
            Si la tabla existe, verifica que:
            <br />1. Tenga habilitado RLS (Row Level Security) y haya políticas de SELECT permitidas.
            <br />2. El nombre de la tabla sea exactamente `stock_items`.
            <br />3. Existan las columnas `category` y `brand`.
          </p>
        </div>
      ) : groupedStock && Object.keys(groupedStock).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedStock).map(([category, brands]: [string, any]) => (
            <div key={category} className="bg-surface border border-border rounded-2xl overflow-hidden">
              <div className="bg-accent/10 px-6 py-4 border-b border-border flex items-center gap-3">
                <Box className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-bold uppercase tracking-wide">{category}</h2>
              </div>
              
              <div className="p-0">
                {Object.entries(brands).map(([brand, items]: [string, any]) => (
                  <div key={brand} className="border-b border-border last:border-0">
                    <div className="bg-surface-hover/50 px-6 py-2 border-b border-border">
                      <span className="font-bold text-sm text-muted uppercase">{brand}</span>
                    </div>
                    <table className="w-full text-left text-sm">
                      <thead className="text-muted hidden md:table-header-group">
                        <tr>
                          <th className="p-4 font-medium w-1/3">Modelo / Descripción</th>
                          <th className="p-4 font-medium">Precio Compra</th>
                          <th className="p-4 font-medium">Precio Venta</th>
                          <th className="p-4 font-medium">Margen</th>
                          <th className="p-4 font-medium text-center">Cantidad</th>
                          <th className="p-4 font-medium text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {items.map((item: any) => (
                          <tr key={item.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="p-4">
                              <p className="font-bold">{item.model}</p>
                              <p className="text-xs text-muted truncate max-w-[200px]">{item.description}</p>
                            </td>
                            <td className="p-4 text-muted">${Number(item.cost_price).toLocaleString()}</td>
                            <td className="p-4 font-bold text-accent">${Number(item.sale_price).toLocaleString()}</td>
                            <td className="p-4 text-emerald-400 font-medium">{item.margin}%</td>
                            <td className="p-4 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.quantity > 5 ? 'bg-emerald-500/10 text-emerald-500' : item.quantity > 0 ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {item.quantity}
                              </span>
                            </td>
                            <td className="p-4 flex justify-end gap-2">
                              <Link href={`/admin/stock/${item.id}`} className="p-2 text-muted hover:text-accent transition-colors">
                                <Edit className="w-4 h-4" />
                              </Link>
                              <form action={deleteStockItem.bind(null, item.id)}>
                                <button type="submit" className="p-2 text-muted hover:text-rose-500 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </form>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl p-12 text-center">
          <Box className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold mb-2">Inventario Vacío</h3>
          <p className="text-muted mb-6">No hay productos registrados en el sistema.</p>
          <Link href="/admin/stock/new" className="bg-accent text-accent-foreground font-bold rounded-lg px-6 py-3 inline-block hover:opacity-90">
            Agregar el primer producto
          </Link>
        </div>
      )}
    </div>
  )
}
