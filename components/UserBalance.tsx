"use client"
import { useAccount } from 'wagmi'
import { useNextProjectId, useUserBalance } from '@/hooks/useSolarContract'
import { Wallet, TrendingUp } from 'lucide-react'

export function UserBalance() {
  const { address, isConnected } = useAccount()
  const { nextProjectId } = useNextProjectId()

  if (!isConnected || !address) {
    return (
      <div className="rounded-2xl border-2 border-card-border bg-card-bg p-8 shadow-lg text-center card-gradient">
        <Wallet className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          Conecta tu Wallet
        </h3>
        <p className="text-muted-foreground">
          Para ver tus tokens, primero conecta tu wallet
        </p>
      </div>
    )
  }

  const projectIds = Array.from({ length: nextProjectId }, (_, i) => i)

  return (
    <div className="rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg card-gradient">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Mis Tokens</h3>
          <p className="text-sm text-muted-foreground">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {projectIds.map((projectId) => (
          <BalanceItem key={projectId} address={address} projectId={projectId} />
        ))}
        {projectIds.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No hay proyectos disponibles
          </p>
        )}
      </div>
    </div>
  )
}

function BalanceItem({ address, projectId }: { address: `0x${string}`, projectId: number }) {
  const { balance } = useUserBalance(address, projectId)

  if (balance === 0) return null

  return (
    <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 hover:border-primary/40 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-white font-bold text-sm">#{projectId}</span>
        </div>
        <div>
          <p className="font-semibold text-foreground">Proyecto Solar #{projectId}</p>
          <p className="text-xs text-muted-foreground">Token de energía solar</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-primary">{balance}</p>
        <p className="text-xs text-muted-foreground">tokens</p>
      </div>
    </div>
  )
}
