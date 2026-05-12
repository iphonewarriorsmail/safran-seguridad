import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 card-glow">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black mb-2">Panel de Administración</h1>
          <p className="text-muted text-sm">Inicia sesión para continuar</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <button
            formAction={login}
            className="w-full bg-accent text-accent-foreground font-bold rounded-lg px-4 py-3 hover:opacity-90 transition-opacity"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
