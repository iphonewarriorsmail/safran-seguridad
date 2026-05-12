import { createClient } from '../../utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { deletePost } from './actions'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">Blog</h1>
        <Link href="/admin/blog/new" className="bg-accent text-accent-foreground font-bold rounded-lg px-4 py-2 flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Nuevo Post
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {error ? (
          <div className="p-6 text-rose-400">
            Error al cargar los artículos. Por favor, verifica que la tabla 'blog_posts' exista en Supabase.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-surface-hover border-b border-border text-sm text-muted">
              <tr>
                <th className="p-4 font-medium">Título</th>
                <th className="p-4 font-medium">Categoría</th>
                <th className="p-4 font-medium">Fecha</th>
                <th className="p-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="p-4 font-medium">{post.title}</td>
                    <td className="p-4">
                      <span className="text-xs font-bold px-2 py-1 rounded-full border border-border">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 text-muted">{new Date(post.created_at).toLocaleDateString()}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}`} className="p-2 text-muted hover:text-accent transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deletePost.bind(null, post.id)}>
                        <button type="submit" className="p-2 text-muted hover:text-rose-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted">No hay artículos publicados.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
