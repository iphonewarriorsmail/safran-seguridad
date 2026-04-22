'use server'

import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteStockItem(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('No autorizado')
  }

  await supabase.from('stock_items').delete().eq('id', id)
  revalidatePath('/admin/stock')
}

export async function saveStockItem(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('No autorizado')
  }
  
  const id = formData.get('id') as string

  const precio_stock = parseFloat(formData.get('precio_stock') as string)
  const precio_venta = parseFloat(formData.get('precio_venta') as string)

  if (isNaN(precio_stock) || isNaN(precio_venta)) {
    throw new Error('Valores de precio inválidos')
  }
  
  // Calcular margen en el backend también por seguridad
  const margen = Math.round(((precio_venta - precio_stock) / precio_stock) * 100)

  const item = {
    descripcion: formData.get('descripcion') as string,
    category: formData.get('category') as string,
    marca: formData.get('marca') as string,
    modelo: formData.get('modelo') as string,
    precio_stock: precio_stock,
    precio_venta: precio_venta,
    margen: margen,
    cantidad: parseInt(formData.get('cantidad') as string, 10),
  }

  if (id) {
    await supabase.from('stock_items').update(item).eq('id', id)
  } else {
    await supabase.from('stock_items').insert(item)
  }

  revalidatePath('/admin/stock')
  redirect('/admin/stock')
}
