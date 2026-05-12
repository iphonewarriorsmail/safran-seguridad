'use client'

import { savePost } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BlogForm({ post }: { post?: any }) {
  return (
    <form action={savePost} className="max-w-3xl space-y-6">
      <input type="hidden" name="id" value={post?.id || ''} />
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/blog" className="p-2 border border-border rounded-lg hover:bg-surface-hover transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-black">{post ? 'Editar Artículo' : 'Nuevo Artículo'}</h1>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={post?.title || ''} 
            required 
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input 
            type="text" 
            name="slug" 
            defaultValue={post?.slug || ''} 
            required 
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select 
              name="category" 
              defaultValue={post?.category || 'tips'} 
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none"
            >
              <option value="cámaras">Cámaras</option>
              <option value="alarmas">Alarmas</option>
              <option value="accesos">Control de Acceso</option>
              <option value="tips">Tips de Seguridad</option>
              <option value="normativa">Normativa</option>
              <option value="tendencias">Tendencias</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resumen (Excerpt)</label>
          <textarea 
            name="excerpt" 
            defaultValue={post?.excerpt || ''} 
            required 
            rows={2}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contenido (Soporta Markdown simple)</label>
          <textarea 
            name="content" 
            defaultValue={post?.content || ''} 
            required 
            rows={12}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:border-accent outline-none font-mono text-sm"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/blog" className="px-6 py-2 border border-border rounded-lg hover:bg-surface-hover font-bold">
          Cancelar
        </Link>
        <button type="submit" className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-bold hover:opacity-90">
          Guardar
        </button>
      </div>
    </form>
  )
}
