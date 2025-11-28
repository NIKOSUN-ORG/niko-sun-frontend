"use client"
import { formatEther } from 'viem'
import { useNextProjectId, useProjectData, useContractBalance } from '@/hooks/useSolarContract'
import { useTranslations } from 'next-intl'
import { BarChart3, Zap, DollarSign, Sun, TrendingUp, Loader2, Coins, Users } from 'lucide-react'

export function ProjectMetrics() {
  const { nextProjectId, isLoading: isLoadingProjects } = useNextProjectId()
  const { balance: contractBalance, isLoading: isLoadingBalance } = useContractBalance()
  const t = useTranslations('projectMetrics')

  // Los IDs de proyectos empiezan en 1
  const projectIds = Array.from({ length: nextProjectId - 1 }, (_, i) => i + 1)
  const totalProjects = projectIds.length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg card-gradient">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{t('globalStats')}</h3>
            <p className="text-sm text-muted-foreground">{t('projectDetails')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            icon={<Sun className="w-6 h-6" />}
            label={t('activeProjects')}
            value={isLoadingProjects ? undefined : totalProjects.toString()}
            gradient="from-primary to-primary-dark"
          />
          <MetricCard
            icon={<DollarSign className="w-6 h-6" />}
            label={t('totalRevenue')}
            value={isLoadingBalance ? undefined : (contractBalance ? parseFloat(formatEther(contractBalance)).toFixed(4) : '0')}
            unit="tSYS"
            gradient="from-secondary to-secondary-dark"
          />
          <MetricCard
            icon={<Coins className="w-6 h-6" />}
            label={t('totalProjects')}
            value={isLoadingProjects ? undefined : totalProjects.toString()}
            gradient="from-accent to-secondary"
          />
        </div>
      </div>

      {projectIds.length === 0 && !isLoadingProjects && (
        <div className="rounded-2xl border-2 border-card-border bg-card-bg p-12 shadow-lg text-center card-gradient">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Sun className="w-10 h-10 text-muted-foreground" />
          </div>
          <h4 className="text-xl font-bold text-foreground mb-2">{t('noProjectsYet')}</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t('noProjectsYet')}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectIds.map((id, index) => (
          <ProjectMetricCard key={id} projectId={id} index={index} />
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
  value: string | undefined
  unit?: string
  gradient: string
}) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg hover:shadow-xl hover-lift transition-all`}>
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-white/20">
          {icon}
        </div>
        <TrendingUp className="w-5 h-5 opacity-60" />
      </div>
      <p className="text-sm opacity-90 mb-1">{label}</p>
      {value === undefined ? (
        <div className="h-9 w-24 rounded bg-white/20 skeleton-shimmer" />
      ) : (
        <p className="text-3xl font-bold">
          {value} {unit && <span className="text-lg opacity-80">{unit}</span>}
        </p>
      )}
    </div>
  )
}

function ProjectMetricCard({ projectId, index }: { projectId: number, index: number }) {
  const { project, metadata, salesBalance, isLoading } = useProjectData(projectId)
  const t = useTranslations('projectMetrics')
  const tCommon = useTranslations('common')

  if (isLoading) {
    return (
      <div className="rounded-xl border-2 border-card-border bg-card-bg p-5 shadow-md card-gradient">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full skeleton-shimmer" />
          <div className="flex-1">
            <div className="h-4 w-24 rounded skeleton-shimmer mb-2" />
            <div className="h-3 w-16 rounded skeleton-shimmer" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-20 rounded-lg skeleton-shimmer" />
          <div className="h-20 rounded-lg skeleton-shimmer" />
        </div>
        <div className="h-2 rounded-full skeleton-shimmer" />
      </div>
    )
  }

  if (!project) return null

  const { totalSupply, minted, priceWei, active, totalEnergyKwh, totalRevenue, creator } = project
  const projectName = metadata?.name || `${t('project')} #${projectId}`

  const progress = Number(minted) / Number(totalSupply) * 100

  return (
    <div
      className="rounded-xl border-2 border-card-border bg-card-bg p-5 shadow-md hover:shadow-lg transition-all duration-300 card-gradient hover-lift animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">#{projectId}</span>
          </div>
          <div>
            <h4 className="font-bold text-foreground">{projectName}</h4>
            <p className={`text-xs flex items-center gap-1 ${active ? 'text-primary' : 'text-muted'}`}>
              <span className={`w-2 h-2 rounded-full ${active ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
              {active ? tCommon('active') : tCommon('inactive')}
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>{tCommon('owner')}:</p>
          <p className="font-mono">{creator.slice(0, 6)}...{creator.slice(-4)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-primary" />
            <p className="text-xs text-muted-foreground">{t('energy')}</p>
          </div>
          <p className="text-lg font-bold text-primary">{Number(totalEnergyKwh).toLocaleString()} kWh</p>
        </div>

        <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-secondary" />
            <p className="text-xs text-muted-foreground">{t('totalRevenue')}</p>
          </div>
          <p className="text-lg font-bold text-secondary">{parseFloat(formatEther(totalRevenue)).toFixed(4)} tSYS</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-4 h-4 text-accent" />
            <p className="text-xs text-muted-foreground">{t('supply')}</p>
          </div>
          <p className="text-lg font-bold text-accent">{formatEther(priceWei)} tSYS</p>
        </div>

        <div className="p-3 rounded-lg bg-muted/5 border border-muted/20 hover:bg-muted/10 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t('sold')}</p>
          </div>
          <p className="text-lg font-bold text-foreground">{salesBalance ? parseFloat(formatEther(salesBalance)).toFixed(4) : '0'} tSYS</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">{t('tokensSold')}</span>
          <span className="font-semibold text-foreground">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-muted/20 rounded-full overflow-hidden progress-bar-animated">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {Number(minted).toLocaleString()}/{Number(totalSupply).toLocaleString()} tokens
        </p>
      </div>
    </div>
  )
}
