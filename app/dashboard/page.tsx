"use client"
import { UserBalance } from "@/components/UserBalance"
import { TrendingUp, Wallet, ArrowRight, Coins, Zap, FolderKanban } from "lucide-react"
import { useAccount } from 'wagmi'
import { useNextProjectId, useInvestorPortfolio } from '@/hooks/useSolarContract'
import { formatEther } from 'viem'
import Link from 'next/link'

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const { nextProjectId } = useNextProjectId()

  // Obtener IDs de proyectos
  const projectIds = Array.from({ length: nextProjectId - 1 }, (_, i) => i + 1)
  const { positions } = useInvestorPortfolio(address, projectIds)

  // Calcular estadísticas
  const totalTokens = positions?.reduce((acc, pos) => acc + Number(pos.tokenBalance), 0) || 0
  const totalClaimable = positions?.reduce((acc, pos) => acc + pos.claimableAmount, BigInt(0)) || BigInt(0)
  const totalClaimed = positions?.reduce((acc, pos) => acc + pos.totalClaimed, BigInt(0)) || BigInt(0)
  const projectsWithTokens = positions?.filter(pos => pos.tokenBalance > BigInt(0)).length || 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark shadow-lg">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Mi Portfolio
            </h1>
            <p className="text-muted-foreground">
              Revisa tus inversiones en tokens solares
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats - Solo si está conectado */}
      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <QuickStatCard
            icon={<Coins className="w-5 h-5" />}
            label="Mis Tokens"
            value={totalTokens.toString()}
            color="text-primary"
          />
          <QuickStatCard
            icon={<FolderKanban className="w-5 h-5" />}
            label="Proyectos"
            value={projectsWithTokens.toString()}
            color="text-secondary"
          />
          <QuickStatCard
            icon={<Zap className="w-5 h-5" />}
            label="Por Reclamar"
            value={`${formatEther(totalClaimable)} tSYS`}
            color="text-green-500"
          />
          <QuickStatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Total Reclamado"
            value={`${formatEther(totalClaimed)} tSYS`}
            color="text-accent"
          />
        </div>
      )}

      {/* CTA para usuarios sin inversiones */}
      {isConnected && projectsWithTokens === 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">¡Comienza a invertir!</h3>
              <p className="text-muted-foreground">Aún no tienes tokens de ningún proyecto. Explora los proyectos disponibles y haz tu primera inversión.</p>
            </div>
            <Link href="/" className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-bold flex items-center gap-2 hover:shadow-lg transition-all whitespace-nowrap">
              Ver Proyectos <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}

      {/* User Balance */}
      <UserBalance />

      {/* Benefits Section */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">
            Beneficios de tu Inversión
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BenefitItem
            title="Energía Limpia"
            description="Contribuyes a la generación de energía solar renovable"
          />
          <BenefitItem
            title="Transparencia Total"
            description="Todas las métricas son verificables en blockchain"
          />
          <BenefitItem
            title="Retornos"
            description="Recibe beneficios por la energía generada"
          />
          <BenefitItem
            title="Liquidez"
            description="Tus tokens son transferibles en cualquier momento"
          />
        </div>
      </div>
    </div>
  )
}

function QuickStatCard({
  icon,
  label,
  value,
  color
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="p-4 rounded-xl bg-card-bg border-2 border-card-border shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-muted/10 ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`text-lg font-bold ${color}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

function BenefitItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
