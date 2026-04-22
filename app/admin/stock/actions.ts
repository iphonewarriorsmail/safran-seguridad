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

export async function getStockFormData() {
  const supabase = await createClient()
  
  const [brandsResult, categoriesResult] = await Promise.all([
    supabase.from('brands').select('id, name').order('name'),
    supabase.from('categories').select('id, name').order('name')
  ])

  return {
    brands: brandsResult.data || [],
    categories: categoriesResult.data || []
  }
}

export async function saveStockItem(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('No autorizado')
  }
  
  const id = formData.get('id') as string
  const brandName = formData.get('brand') as string
  const categoryName = formData.get('category') as string

  // 1. Manejar Marca
  let brand_id: number | null = null
  if (brandName) {
    const { data: brandData } = await supabase
      .from('brands')
      .select('id')
      .eq('name', brandName)
      .single()
    
    if (brandData) {
      brand_id = brandData.id
    } else {
      const { data: newBrand } = await supabase
        .from('brands')
        .insert({ name: brandName })
        .select()
        .single()
      brand_id = newBrand?.id || null
    }
  }

  // 2. Manejar Categoría
  let category_id: number | null = null
  if (categoryName) {
    const { data: catData } = await supabase
      .from('categories')
      .select('id')
      .eq('name', categoryName)
      .single()
    
    if (catData) {
      category_id = catData.id
    } else {
      const { data: newCat } = await supabase
        .from('categories')
        .insert({ name: categoryName })
        .select()
        .single()
      category_id = newCat?.id || null
    }
  }

  const cost_price = parseFloat(formData.get('cost_price') as string)
  const sale_price = parseFloat(formData.get('sale_price') as string)

  if (isNaN(cost_price) || isNaN(sale_price)) {
    throw new Error('Valores de precio inválidos')
  }
  
  const margin = Math.round(((sale_price - cost_price) / cost_price) * 100)

  const item = {
    description: formData.get('description') as string,
    brand_id: brand_id,
    category_id: category_id,
    model: formData.get('model') as string,
    cost_price: cost_price,
    sale_price: sale_price,
    margin: margin,
    quantity: parseInt(formData.get('quantity') as string, 10),
  }

  if (id) {
    await supabase.from('stock_items').update(item).eq('id', id)
  } else {
    await supabase.from('stock_items').insert(item)
  }

  revalidatePath('/admin/stock')
  redirect('/admin/stock')
}
