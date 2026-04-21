'use server'

import { createClient } from '../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markLeadAsRead(id: string, currentStatus: boolean) {
  const supabase = await createClient()
  await supabase.from('leads').update({ leida: !currentStatus }).eq('id', id)
  revalidatePath('/admin')
}
