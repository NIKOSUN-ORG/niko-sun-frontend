"use client"
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { formatEther } from 'viem'
import { useMintTokens, useProjectData, useClaimableAmount, useClaimRevenue } from '@/hooks/useSolarContract'
import { useToast } from '@/components/Toast'
import { Sun, Zap, ShoppingCart, Loader2, Gift, CheckCircle, TrendingUp, Coins } from 'lucide-react'

interface ProjectCardProps {
  projectId: number
}

export function ProjectCard({ projectId }: ProjectCardProps) {
  const { address } = useAccount()
  const { project, metadata, availableSupply, isLoading } = useProjectData(projectId)
  const { mint, isPending, isSuccess, error } = useMintTokens()
  const { claimable } = useClaimableAmount(projectId, address)
  const { claimRevenue, isPending: isClaiming, isSuccess: claimSuccess, error: claimError } = useClaimRevenue()
  const { showToast } = useToast()
  const [amount, setAmount] = useState(1)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  // Toast notifications
  useEffect(() => {
    if (isSuccess) {
      showToast(`¡Compraste ${amount} tokens exitosamente!`, 'success')
      setShowSuccessAnimation(true)
      setTimeout(() => setShowSuccessAnimation(false), 2000)
    }
  }, [isSuccess, amount, showToast])

  useEffect(() => {
    if (error) {
      showToast(error.message || 'Error al comprar tokens', 'error')
    }
  }, [error, showToast])

  useEffect(() => {
    if (claimSuccess) {
      showToast('¡Recompensa reclamada exitosamente!', 'success')
    }
  }, [claimSuccess, showToast])

  useEffect(() => {
    if (claimError) {
      showToast('Error al reclamar recompensa', 'error')
    }
  }, [claimError, showToast])

  if (isLoading) {
    return (
      <div className="rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full skeleton-shimmer" />
          <div className="flex-1">
            <div className="h-5 w-32 rounded skeleton-shimmer mb-2" />
            <div className="h-4 w-16 rounded skeleton-shimmer" />
          </div>
        </div>
        <div className="h-3 rounded-full skeleton-shimmer mb-4" />
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="h-20 rounded-lg skeleton-shimmer" />
          <div className="h-20 rounded-lg skeleton-shimmer" />
          <div className="h-20 rounded-lg skeleton-shimmer" />
        </div>
        <div className="h-12 rounded-lg skeleton-shimmer" />
      </div>
    )
  }

  if (!project) return null

  const { totalSupply, minted, priceWei, active, totalEnergyKwh, minPurchase } = project
  const projectName = metadata?.name || `Proyecto Solar #${projectId}`

  const available = availableSupply ? Number(availableSupply) : Number(totalSupply - minted)
  const progress = Number(minted) / Number(totalSupply) * 100

  const handleMint = () => {
    if (!address || !active) return
    mint(projectId, amount, priceWei)
  }

  const handleClaim = () => {
    if (!address) return
    claimRevenue(projectId)
  }

  const totalCostWei = priceWei * BigInt(amount)
  const totalCost = formatEther(totalCostWei)
  const hasClaimable = claimable > BigInt(0)

  return (
    <div className={`group rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift card-gradient animate-fade-in ${showSuccessAnimation ? 'animate-pulse-glow' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform duration-300">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{projectName}</h3>
            <p className={`text-sm font-medium flex items-center gap-1 ${active ? 'text-primary' : 'text-muted'}`}>
              <span className={`w-2 h-2 rounded-full ${active ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
              {active ? 'Activo' : 'Inactivo'}
            </p>
          </div>
        </div>
        {Number(totalEnergyKwh) > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              {Number(totalEnergyKwh).toLocaleString()} kWh
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progreso de venta</span>
            <span className="font-semibold text-foreground">
              {Number(minted).toLocaleString()}/{Number(totalSupply).toLocaleString()} tokens
            </span>
          </div>
          <div className="h-3 bg-muted/20 rounded-full overflow-hidden progress-bar-animated">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">{progress.toFixed(1)}% vendido</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Precio</p>
            <p className="text-lg font-bold text-primary">{formatEther(priceWei)} tSYS</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
            <p className="text-xs text-muted-foreground mb-1">Disponibles</p>
            <p className="text-lg font-bold text-secondary">{available}</p>
          </div>
          <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Mín. Compra</p>
            <p className="text-lg font-bold text-accent">{Number(minPurchase)}</p>
          </div>
        </div>

        {/* Sección de Reclamar Rewards */}
        {address && hasClaimable && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Recompensas disponibles</p>
                  <p className="text-lg font-bold text-green-500">{formatEther(claimable)} tSYS</p>
                </div>
              </div>
              <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isClaiming ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Gift className="w-4 h-4" />
                )}
                Reclamar
              </button>
            </div>
            {claimSuccess && (
              <p className="mt-2 text-xs text-green-500 text-center">¡Recompensa reclamada!</p>
            )}
          </div>
        )}

        {active && address && (
          <div className="pt-4 border-t border-border">
            <div className="flex gap-3 mb-3">
              <input
                type="number"
                min={Number(minPurchase)}
                max={available}
                value={amount}
                onChange={(e) => setAmount(Math.max(Number(minPurchase), Math.min(available, Number(e.target.value))))}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none transition-colors"
                placeholder="Cantidad"
              />
              <button
                onClick={handleMint}
                disabled={isPending || available === 0 || amount < Number(minPurchase)}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Comprando...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Comprar</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Total: <span className="font-bold text-foreground">{totalCost} tSYS</span>
            </p>
            {isSuccess && (
              <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-primary font-medium text-center">
                  ¡Compra exitosa!
                </p>
              </div>
            )}
          </div>
        )}

        {!address && (
          <div className="p-4 rounded-lg bg-muted/10 border border-muted/30">
            <p className="text-sm text-center text-muted-foreground">
              Conecta tu wallet para comprar tokens
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
