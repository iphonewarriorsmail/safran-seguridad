import Link from 'next/link'
import { logout } from './login/actions'
import { LayoutDashboard, FileText, Calculator, LogOut, Package } from 'lucide-react'
import { createClient } from '../utils/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar - Solo visible si hay usuario logueado */}
      {user && (
        <aside className="w-64 bg-surface border-r border-border p-6 flex flex-col hidden md:flex">
          <div className="mb-8">
            <Link href="/admin" className="text-xl font-black">
              Safra<span className="text-accent">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <FileText className="w-5 h-5" />
              Artículos
            </Link>
            <Link
              href="/admin/calculator"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Calculadora
            </Link>
            <Link
              href="/admin/stock"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <Package className="w-5 h-5" />
              Stock
            </Link>
          </nav>

          <div className="mt-auto">
            <form action={logout}>
              <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors">
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
