"use client"
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { formatEther } from 'viem'
import { useNextProjectId, useUserBalance, useInvestorPortfolio, useClaimMultiple, useProjectData } from '@/hooks/useSolarContract'
import { useToast } from '@/components/Toast'
import { useTranslations } from 'next-intl'
import { getErrorMessage, isUserCausedError } from '@/utils/parseError'
import { Wallet, TrendingUp, Gift, Loader2, Coins, ArrowUpRight, Zap } from 'lucide-react'

export function UserBalance() {
  const { address, isConnected } = useAccount()
  const { nextProjectId } = useNextProjectId()
  const { showToast } = useToast()
  const t = useTranslations('portfolio')
  const tToast = useTranslations('toast')
  const tErrors = useTranslations('errors')
  const [claimFormError, setClaimFormError] = useState<string | null>(null)

  // Los IDs de proyectos empiezan en 1
  const projectIds = Array.from({ length: nextProjectId - 1 }, (_, i) => i + 1)
  const { positions, isLoading: isLoadingPortfolio } = useInvestorPortfolio(address, projectIds)
  const { claimMultiple, isPending: isClaiming, isSuccess: claimSuccess, error: claimError } = useClaimMultiple()

  // Toast notifications
  useEffect(() => {
    if (claimSuccess) {
      showToast(tToast('claimSuccess'), 'success')
      setClaimFormError(null)
    }
  }, [claimSuccess, showToast, tToast])

  useEffect(() => {
    if (claimError) {
      const errorMessage = getErrorMessage(claimError, tErrors)
      if (!isUserCausedError(claimError)) {
        showToast(errorMessage, 'error')
      }
      setClaimFormError(errorMessage)
    }
  }, [claimError, showToast, tErrors])

  if (!isConnected || !address) {
    return (
      <div className="rounded-2xl border-2 border-card-border bg-card-bg p-8 shadow-lg text-center card-gradient animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Wallet className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          {t('connectWallet')}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t('connectWalletDescription')}
        </p>
      </div>
    )
  }

  // Calcular total reclamable
  const totalClaimable = positions?.reduce((acc, pos) => acc + pos.claimableAmount, BigInt(0)) || BigInt(0)
  const projectsWithClaimable = positions?.filter(pos => pos.claimableAmount > BigInt(0)).map(pos => Number(pos.projectId)) || []
  const hasClaimable = totalClaimable > BigInt(0)

  const handleClaimAll = () => {
    if (projectsWithClaimable.length > 0) {
      claimMultiple(projectsWithClaimable)
    }
  }

  return (
    <div className="rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg card-gradient animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">{t('title')}</h3>
          <p className="text-sm text-muted-foreground font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        {positions && positions.filter(p => p.tokenBalance > BigInt(0)).length > 0 && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {positions.filter(p => p.tokenBalance > BigInt(0)).length} {t('projects')}
            </span>
          </div>
        )}
      </div>

      {/* Sección de reclamar todas las recompensas */}
      {hasClaimable && (
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t('totalRewards')}</p>
                <p className="text-2xl font-bold text-green-500">{formatEther(totalClaimable)} tSYS</p>
                <p className="text-xs text-muted-foreground">{t('inProjects', { count: projectsWithClaimable.length })}</p>
              </div>
            </div>
            <button
              onClick={handleClaimAll}
              disabled={isClaiming}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isClaiming ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t('claiming')}</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  <span>{t('claimAll')}</span>
                </>
              )}
            </button>
          </div>
          {claimSuccess && (
            <p className="mt-3 text-sm text-green-500 text-center">{t('claimSuccessMessage')}</p>
          )}
          {claimFormError && !claimSuccess && (
            <p className="mt-3 text-sm text-red-500 text-center">{claimFormError}</p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {isLoadingPortfolio ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full skeleton-shimmer" />
                  <div className="flex-1">
                    <div className="h-4 w-32 rounded skeleton-shimmer mb-2" />
                    <div className="h-3 w-24 rounded skeleton-shimmer" />
                  </div>
                  <div className="text-right">
                    <div className="h-6 w-16 rounded skeleton-shimmer mb-1" />
                    <div className="h-3 w-12 rounded skeleton-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : positions && positions.length > 0 ? (
          positions.filter(pos => pos.tokenBalance > BigInt(0) || pos.claimableAmount > BigInt(0) || pos.totalClaimed > BigInt(0)).map((position, index) => (
            <PortfolioItem key={Number(position.projectId)} position={position} index={index} />
          ))
        ) : projectIds.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/10 flex items-center justify-center">
              <Coins className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">{t('noProjects')}</p>
            <p className="text-muted-foreground">{t('beFirst')}</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/10 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">{t('noInvestments')}</p>
            <p className="text-muted-foreground">{t('exploreProjects')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface InvestorPosition {
  projectId: bigint
  tokenBalance: bigint
  claimableAmount: bigint
  totalClaimed: bigint
}

function PortfolioItem({ position, index }: { position: InvestorPosition, index: number }) {
  const { projectId, tokenBalance, claimableAmount, totalClaimed } = position
  const { project, metadata, isLoading } = useProjectData(Number(projectId))
  const hasClaimable = claimableAmount > BigInt(0)
  const t = useTranslations('portfolio')

  const projectName = metadata?.name || `${t('solarProject')} #${Number(projectId)}`
  const totalEnergyKwh = project?.totalEnergyKwh !== undefined ? Number(project.totalEnergyKwh) : 0
  const totalSupply = project?.totalSupply !== undefined ? Number(project.totalSupply) : 0

  // Calcular la energía proporcional del usuario según sus tokens
  const userEnergyShare = totalSupply > 0 && totalEnergyKwh > 0
    ? (Number(tokenBalance) / totalSupply) * totalEnergyKwh
    : 0

  return (
    <div
      className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 animate-fade-in hover-lift"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
            <span className="text-white font-bold">#{Number(projectId)}</span>
          </div>
          <div>
            <p className="font-semibold text-foreground flex items-center gap-2">
              {projectName}
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </p>
            <p className="text-xs text-muted-foreground">{t('solarEnergyToken')}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{Number(tokenBalance).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{t('tokens')}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-3 gap-3">
        <div className="p-2 rounded-lg bg-background/50">
          <div className="flex items-center gap-1 mb-1">
            <Zap className="w-3 h-3 text-accent" />
            <p className="text-xs text-muted-foreground">{t('myEnergy')}</p>
          </div>
          <p className="text-sm font-bold text-accent">
            {userEnergyShare.toLocaleString(undefined, { maximumFractionDigits: 2 })} kWh
          </p>
        </div>
        <div className="p-2 rounded-lg bg-background/50">
          <p className="text-xs text-muted-foreground">{t('toClaim')}</p>
          <p className={`text-sm font-bold ${hasClaimable ? 'text-green-500' : 'text-muted-foreground'}`}>
            {parseFloat(formatEther(claimableAmount)).toFixed(6)} tSYS
          </p>
        </div>
        <div className="p-2 rounded-lg bg-background/50">
          <p className="text-xs text-muted-foreground">{t('claimed')}</p>
          <p className="text-sm font-bold text-secondary">
            {parseFloat(formatEther(totalClaimed)).toFixed(6)} tSYS
          </p>
        </div>
      </div>

      {totalEnergyKwh > 0 && (
        <div className="mt-2 text-xs text-muted-foreground text-center">
          {t('totalProjectEnergy')}: {totalEnergyKwh.toLocaleString()} kWh
        </div>
      )}
    </div>
  )
}
