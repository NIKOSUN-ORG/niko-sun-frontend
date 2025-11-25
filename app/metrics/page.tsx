import { ProjectMetrics } from "@/components/ProjectMetrics"
import { BarChart3, TrendingUp } from "lucide-react"

export default function MetricsPage() {
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
