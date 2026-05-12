'use server'

import { createClient } from '../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markLeadAsRead(id: string, currentStatus: boolean) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('No autorizado')
  }

  await supabase.from('leads').update({ is_read: !currentStatus }).eq('id', id)
  revalidatePath('/admin')
}
