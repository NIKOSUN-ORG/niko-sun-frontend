"use client"
import { ProjectMetrics } from "@/components/ProjectMetrics"
import { BarChart3, TrendingUp, Shield, Lock } from "lucide-react"
import { useAccount } from 'wagmi'
import { useContractOwner } from '@/hooks/useSolarContract'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function MetricsPage() {
  const t = useTranslations('metrics')
  const { address, isConnected } = useAccount()
  const { owner, isLoading } = useContractOwner()

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase()

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full skeleton-shimmer" />
          <div className="h-6 w-48 mx-auto rounded skeleton-shimmer" />
        </div>
      </div>
    )
  }

  // Si no está conectado o no es owner, mostrar acceso denegado
  if (!isConnected || !isOwner) {
    return (
      <div className="space-y-8">
        <div className="rounded-2xl border-2 border-card-border bg-card-bg p-12 shadow-lg text-center card-gradient animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {t('accessDenied')}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            {t('accessDeniedDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg transition-all"
            >
              {t('goHome')}
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              {t('viewPortfolio')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-secondary shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
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
      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-foreground">
            {t('realTimeData')}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('realTimeDataDesc')}
        </p>
      </div>

      {/* Metrics */}
      <ProjectMetrics />

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-card-bg border-2 border-card-border shadow-md card-gradient">
          <h4 className="text-lg font-bold text-foreground mb-3">
            {t('whatAreMetrics')}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            {t('metricsExplanation')}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card-bg border-2 border-card-border shadow-md card-gradient">
          <h4 className="text-lg font-bold text-foreground mb-3">
            {t('howToUse')}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            {t('howToUseExplanation')}
          </p>
        </div>
      </div>
    </div>
  )
}
