"use client"
import { useNextProjectId, useProjectData } from '@/hooks/useSolarContract'
import { BarChart3, Zap, DollarSign, Sun, TrendingUp } from 'lucide-react'

export function ProjectMetrics() {
  const { nextProjectId } = useNextProjectId()

  const projectIds = Array.from({ length: nextProjectId }, (_, i) => i)

  let totalEnergy = 0
  let totalDistributed = 0
  let totalProjects = projectIds.length

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg card-gradient">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Estadísticas Globales</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            icon={<Sun className="w-6 h-6" />}
            label="Proyectos Activos"
            value={totalProjects.toString()}
            gradient="from-primary to-primary-dark"
          />
          <MetricCard
            icon={<Zap className="w-6 h-6" />}
            label="Energía Total Generada"
            value="Calculando..."
            unit="kWh"
            gradient="from-accent to-secondary"
          />
          <MetricCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Total Distribuido"
            value="Calculando..."
            unit="USD"
            gradient="from-secondary to-secondary-dark"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectIds.map((id) => (
          <ProjectMetricCard key={id} projectId={id} />
        ))}
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  gradient
}: {
  icon: React.ReactNode
  label: string
  value: string
  unit?: string
  gradient: string
}) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-white/20">
          {icon}
        </div>
        <TrendingUp className="w-5 h-5 opacity-60" />
      </div>
      <p className="text-sm opacity-90 mb-1">{label}</p>
      <p className="text-3xl font-bold">
        {value} {unit && <span className="text-lg opacity-80">{unit}</span>}
      </p>
    </div>
  )
}

function ProjectMetricCard({ projectId }: { projectId: number }) {
  const { project, metrics, availableTokens } = useProjectData(projectId)

  if (!project || !metrics) return null

  const [totalSupply, minted, priceWei, active] = project as [bigint, bigint, bigint, boolean, bigint]
  const [totalEnergyKwh, totalDistributed, lastUpdate] = metrics as [bigint, bigint, bigint]

  const progress = Number(minted) / Number(totalSupply) * 100

  return (
    <div className="rounded-xl border-2 border-card-border bg-card-bg p-5 shadow-md hover:shadow-lg transition-shadow card-gradient">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">#{projectId}</span>
          </div>
          <div>
            <h4 className="font-bold text-foreground">Proyecto #{projectId}</h4>
            <p className={`text-xs ${active ? 'text-primary' : 'text-muted'}`}>
              {active ? 'Activo' : 'Inactivo'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-primary" />
            <p className="text-xs text-muted-foreground">Energía</p>
          </div>
          <p className="text-lg font-bold text-primary">{Number(totalEnergyKwh)} kWh</p>
        </div>

        <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-secondary" />
            <p className="text-xs text-muted-foreground">Distribuido</p>
          </div>
          <p className="text-lg font-bold text-secondary">${Number(totalDistributed)}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Tokens vendidos</span>
          <span className="font-semibold text-foreground">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {Number(minted)}/{Number(totalSupply)} tokens
        </p>
      </div>
    </div>
  )
}
