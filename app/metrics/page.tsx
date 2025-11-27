"use client"
import { ProjectMetrics } from "@/components/ProjectMetrics"
import { BarChart3, TrendingUp, Shield, Lock } from "lucide-react"
import { useAccount } from 'wagmi'
import { useContractOwner } from '@/hooks/useSolarContract'
import Link from 'next/link'

export default function MetricsPage() {
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
            Acceso Restringido
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Esta sección está reservada únicamente para el propietario del contrato.
            Las métricas y estadísticas globales solo son visibles para el owner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg transition-all"
            >
              Ir al Inicio
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              Ver Mi Portfolio
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
              Métricas y Estadísticas
            </h1>
            <p className="text-muted-foreground">
              Monitorea el rendimiento de todos los proyectos
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-foreground">
            Datos en Tiempo Real
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Todas las métricas se obtienen directamente de la blockchain, garantizando
          transparencia y veracidad de la información mostrada.
        </p>
      </div>

      {/* Metrics */}
      <ProjectMetrics />

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-card-bg border-2 border-card-border shadow-md card-gradient">
          <h4 className="text-lg font-bold text-foreground mb-3">
            ¿Qué son las Métricas?
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Las métricas registran la energía generada por cada proyecto solar
            y los pagos distribuidos a los holders de tokens.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">Energía Total:</strong> kWh generados acumulados
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">Total Distribuido:</strong> Pagos realizados a holders
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">Última Actualización:</strong> Timestamp de la última métrica
              </span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-card-bg border-2 border-card-border shadow-md card-gradient">
          <h4 className="text-lg font-bold text-foreground mb-3">
            Transparencia Blockchain
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Cada métrica es registrada en la blockchain de Syscoin, permitiendo
            que cualquiera pueda verificar la información.
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Verificable</p>
              <p className="text-sm font-semibold text-foreground">
                Todas las transacciones son públicas
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
              <p className="text-xs text-muted-foreground mb-1">Inmutable</p>
              <p className="text-sm font-semibold text-foreground">
                Los registros no pueden ser alterados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
