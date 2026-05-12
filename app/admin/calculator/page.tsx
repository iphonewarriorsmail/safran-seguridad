import { createClient } from '../../utils/supabase/server'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { deleteCalculatorItem } from './actions'
import Link from 'next/link'

export default async function AdminCalculatorPage() {
  const supabase = await createClient()
  const { data: items, error } = await supabase.from('calculator_items').select('*').order('category', { ascending: true })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">Valores de Calculadora</h1>
        <Link href="/admin/calculator/new" className="bg-accent text-accent-foreground font-bold rounded-lg px-4 py-2 flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Nuevo Valor
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {error ? (
          <div className="p-6 text-rose-400">
            Error al cargar los valores. Por favor, verifica que la tabla 'calculator_items' exista en Supabase.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-surface-hover border-b border-border text-sm text-muted">
              <tr>
                <th className="p-4 font-medium">Categoría</th>
                <th className="p-4 font-medium">Producto / Servicio</th>
                <th className="p-4 font-medium">Valor ($)</th>
                <th className="p-4 font-medium">Descripción</th>
                <th className="p-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items && items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="p-4 font-medium capitalize">{item.category}</td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 font-bold text-accent">${item.price}</td>
                    <td className="p-4 text-muted text-sm">{item.description}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <Link href={`/admin/calculator/${item.id}`} className="p-2 text-muted hover:text-accent transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deleteCalculatorItem.bind(null, item.id)}>
                        <button type="submit" className="p-2 text-muted hover:text-rose-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-muted">No hay valores configurados.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
