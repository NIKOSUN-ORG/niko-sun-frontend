import { AdminPanel } from "@/components/AdminPanel"
import { Settings, Shield, AlertTriangle } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Gestiona proyectos, actualiza métricas y retira fondos
            </p>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="p-6 rounded-xl bg-secondary/10 border-2 border-secondary/30 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
        <div>
          <p className="font-semibold text-foreground mb-1">
            Acceso Restringido
          </p>
          <p className="text-sm text-muted-foreground">
            Solo los usuarios con rol de administrador pueden realizar estas acciones.
            Las transacciones fallarán si no tienes los permisos necesarios.
          </p>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Settings className="w-6 h-6" />}
          label="Proyectos Creados"
          value="Calculando..."
          gradient="from-primary to-primary-dark"
        />
        <StatCard
          icon={<Shield className="w-6 h-6" />}
          label="Última Actualización"
          value="Ahora"
          gradient="from-secondary to-secondary-dark"
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6" />}
          label="Estado"
          value="Activo"
          gradient="from-accent to-secondary"
        />
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  gradient
}: {
  icon: React.ReactNode
  label: string
  value: string
  gradient: string
}) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/20">
          {icon}
        </div>
      </div>
      <p className="text-sm opacity-90 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
