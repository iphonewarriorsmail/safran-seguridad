import { createClient } from '../utils/supabase/server'
import { Users, TrendingUp, Eye, MailOpen, Mail } from 'lucide-react'
import { markLeadAsRead } from './actions'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch leads (consultas)
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black mb-2">Dashboard</h1>
        <p className="text-muted">Bienvenido de nuevo, {user?.email}</p>
      </div>

      {/* Analytics Mock */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 text-blue-500 rounded-xl">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted font-bold uppercase tracking-wider">Visitas del Mes</p>
            <p className="text-3xl font-black">2,450</p>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted font-bold uppercase tracking-wider">Conversión</p>
            <p className="text-3xl font-black">4.2%</p>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-4">
          <div className="p-4 bg-purple-500/10 text-purple-500 rounded-xl">
            <Eye className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted font-bold uppercase tracking-wider">Página Top</p>
            <p className="text-xl font-black truncate">/camaras-de-seguridad</p>
          </div>
        </div>
      </div>

      {/* Leads Section */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold">Últimas Consultas</h2>
        </div>
        {error ? (
          <div className="p-6 text-rose-400">
            Error al cargar las consultas. Verifica que la tabla 'leads' exista y tenga la columna 'is_read' (boolean).
          </div>
        ) : (
          <div className="divide-y divide-border">
            {leads && leads.length > 0 ? (
              leads.map((lead) => (
                <div key={lead.id} className={`p-6 flex flex-col md:flex-row gap-4 transition-colors ${lead.is_read ? 'opacity-70 bg-surface/50' : 'bg-surface-hover/30'}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{lead.name}</h3>
                      <span className="text-xs bg-border px-2 py-1 rounded-full">{lead.service}</span>
                      <span className="text-xs text-muted">{new Date(lead.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-muted text-sm mb-3">{lead.message}</p>
                    <div className="flex gap-4 text-sm font-medium">
                      <span className="text-accent">📞 {lead.whatsapp}</span>
                      <span className="text-accent">✉️ {lead.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end md:w-32">
                    <form action={markLeadAsRead.bind(null, lead.id, lead.is_read)}>
                      <button 
                        type="submit" 
                        title={lead.is_read ? 'Marcar como no leída' : 'Marcar como leída'}
                        className={`p-3 rounded-xl transition-all ${lead.is_read ? 'text-muted hover:bg-surface-hover hover:text-foreground' : 'bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent'}`}
                      >
                        {lead.is_read ? <MailOpen className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                      </button>
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted">No hay consultas recientes.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
