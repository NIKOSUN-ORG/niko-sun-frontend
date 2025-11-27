import { AdminPanel } from "@/components/AdminPanel"
import { Settings, Shield, AlertTriangle, User } from "lucide-react"

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
              Gestiona proyectos, deposita revenue y administra el contrato
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-6 rounded-xl bg-secondary/10 border-2 border-secondary/30 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
        <div>
          <p className="font-semibold text-foreground mb-1">
            Sistema de Permisos
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            El contrato utiliza un sistema de permisos basado en roles:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong className="text-foreground">Cualquier usuario:</strong> Puede crear proyectos y convertirse en su creador</li>
            <li>• <strong className="text-foreground">Creador del Proyecto:</strong> Puede gestionar su proyecto, depositar revenue, cambiar estado y retirar ventas</li>
            <li>• <strong className="text-foreground">Owner del Contrato:</strong> Puede pausar/reanudar el contrato y crear proyectos para otros</li>
          </ul>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Settings className="w-6 h-6" />}
          label="Crear Proyecto"
          value="Cualquier usuario"
          description="Crea proyectos solares"
          gradient="from-primary to-primary-dark"
        />
        <StatCard
          icon={<User className="w-6 h-6" />}
          label="Gestionar Proyecto"
          value="Project Creator"
          description="Administra tu proyecto"
          gradient="from-secondary to-secondary-dark"
        />
        <StatCard
          icon={<Shield className="w-6 h-6" />}
          label="Control Global"
          value="Contract Owner"
          description="Pausar/Reanudar contrato"
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
  description,
  gradient
}: {
  icon: React.ReactNode
  label: string
  value: string
  description: string
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
      <p className="text-xs opacity-75 mt-1">{description}</p>
    </div>
  )
}
