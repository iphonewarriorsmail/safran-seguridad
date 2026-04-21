'use server'

import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deletePost(id: string) {
  const supabase = await createClient()
  await supabase.from('blog_posts').delete().eq('id', id)
  revalidatePath('/admin/blog')
}

export async function savePost(formData: FormData) {
  const supabase = await createClient()
  
  const post = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    category: formData.get('category') as string,
    content: formData.get('content') as string,
  }

  const id = formData.get('id') as string

  if (id) {
    await supabase.from('blog_posts').update(post).eq('id', id)
  } else {
    await supabase.from('blog_posts').insert(post)
  }

  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}
