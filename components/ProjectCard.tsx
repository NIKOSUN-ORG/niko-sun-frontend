"use client"
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { formatEther } from 'viem'
import { useMintTokens, useProjectData } from '@/hooks/useSolarContract'
import { Sun, Zap, ShoppingCart, Loader2 } from 'lucide-react'

interface ProjectCardProps {
  projectId: number
}

export function ProjectCard({ projectId }: ProjectCardProps) {
  const { address } = useAccount()
  const { project, metrics, availableTokens, isLoading } = useProjectData(projectId)
  const { mint, isPending, isSuccess } = useMintTokens()
  const [amount, setAmount] = useState(1)

  if (isLoading) {
    return (
      <div className="rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg animate-pulse">
        <div className="h-48 bg-muted/20 rounded-lg"></div>
      </div>
    )
  }

  if (!project) return null

  const projectData = project as { totalSupply: bigint; minted: bigint; priceWei: bigint; active: boolean; createdAt: bigint }
  const { totalSupply, minted, priceWei, active } = projectData

  const metricsData = metrics ? (metrics as { totalEnergyKwh: bigint; totalDistributed: bigint; lastUpdate: bigint }) : null
  const totalEnergyKwh = metricsData ? Number(metricsData.totalEnergyKwh) : 0

  const available = availableTokens ? Number(availableTokens) : Number(totalSupply - minted)
  const progress = Number(minted) / Number(totalSupply) * 100

  const handleMint = () => {
    if (!address || !active) return
    mint(projectId, amount, priceWei)
  }

  const totalCostWei = priceWei * BigInt(amount)
  const totalCost = formatEther(totalCostWei)

  return (
    <div className="group rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] card-gradient">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Proyecto Solar #{projectId}</h3>
            <p className={`text-sm font-medium ${active ? 'text-primary' : 'text-muted'}`}>
              {active ? 'Activo' : 'Inactivo'}
            </p>
          </div>
        </div>
        {metricsData && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              {totalEnergyKwh} kWh
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progreso de venta</span>
            <span className="font-semibold text-foreground">
              {Number(minted)}/{Number(totalSupply)} tokens
            </span>
          </div>
          <div className="h-3 bg-muted/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Precio</p>
            <p className="text-lg font-bold text-primary">{formatEther(priceWei)} ETH</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
            <p className="text-xs text-muted-foreground mb-1">Disponibles</p>
            <p className="text-lg font-bold text-secondary">{available}</p>
          </div>
        </div>

        {active && address && (
          <div className="pt-4 border-t border-border">
            <div className="flex gap-3 mb-3">
              <input
                type="number"
                min="1"
                max={available}
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Math.min(available, Number(e.target.value))))}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none transition-colors"
                placeholder="Cantidad"
              />
              <button
                onClick={handleMint}
                disabled={isPending || available === 0}
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
              Total: <span className="font-bold text-foreground">{totalCost} ETH</span>
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
