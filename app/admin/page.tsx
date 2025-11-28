import { AdminPanel } from "@/components/AdminPanel"
import { Settings, Shield, AlertTriangle, User } from "lucide-react"
import { useTranslations } from 'next-intl'

export default function AdminPage() {
  const t = useTranslations('admin')

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
              {t('title')}
            </h1>
            <p className="text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-6 rounded-xl bg-secondary/10 border-2 border-secondary/30 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
        <div>
          <p className="font-semibold text-foreground mb-1">
            {t('permissionSystem')}
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            {t('permissionDesc')}
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong className="text-foreground">{t('anyUser')}</strong> {t('anyUserDesc')}</li>
            <li>• <strong className="text-foreground">{t('projectCreator')}</strong> {t('projectCreatorDesc')}</li>
            <li>• <strong className="text-foreground">{t('contractOwner')}</strong> {t('contractOwnerDesc')}</li>
          </ul>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Settings className="w-6 h-6" />}
          label={t('createProjectCard')}
          value={t('anyUser').replace(':', '')}
          description={t('createProjectCardDesc')}
          gradient="from-primary to-primary-dark"
        />
        <StatCard
          icon={<User className="w-6 h-6" />}
          label={t('manageProjectCard')}
          value={t('projectCreator').replace(':', '')}
          description={t('manageProjectCardDesc')}
          gradient="from-secondary to-secondary-dark"
        />
        <StatCard
          icon={<Shield className="w-6 h-6" />}
          label={t('globalControl')}
          value={t('contractOwner').replace(':', '')}
          description={t('globalControlDesc')}
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
