'use server'

import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteCalculatorItem(id: string) {
  const supabase = await createClient()
  await supabase.from('calculator_items').delete().eq('id', id)
  revalidatePath('/admin/calculator')
  revalidatePath('/calculadora')
}

export async function saveCalculatorItem(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string

  const item = {
    category: formData.get('category') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
  }

  if (id) {
    await supabase.from('calculator_items').update(item).eq('id', id)
  } else {
    await supabase.from('calculator_items').insert(item)
  }

  revalidatePath('/admin/calculator')
  revalidatePath('/calculadora')
  redirect('/admin/calculator')
}
