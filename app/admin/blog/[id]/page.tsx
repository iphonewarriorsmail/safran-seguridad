import { createClient } from '../../../utils/supabase/server'
import BlogForm from '../components/BlogForm'
import { notFound } from 'next/navigation'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()

  if (error || !post) {
    notFound()
  }

  return <BlogForm post={post} />
}
