import { UserBalance } from "@/components/UserBalance"
import { TrendingUp, Wallet } from "lucide-react"

export default function DashboardPage() {
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

      {/* User Balance */}
      <UserBalance />

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          title="Total Invertido"
          value="Calculando..."
          description="Valor total de tus tokens"
          gradient="from-primary to-primary-dark"
        />
        <InfoCard
          title="Proyectos"
          value="Calculando..."
          description="Número de proyectos en los que inviertes"
          gradient="from-secondary to-secondary-dark"
        />
        <InfoCard
          title="Energía Generada"
          value="Calculando..."
          description="kWh generados por tus inversiones"
          gradient="from-accent to-secondary"
        />
      </div>

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

function InfoCard({
  title,
  value,
  description,
  gradient
}: {
  title: string
  value: string
  description: string
  gradient: string
}) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
      <p className="text-sm opacity-90 mb-2">{title}</p>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-xs opacity-75">{description}</p>
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
