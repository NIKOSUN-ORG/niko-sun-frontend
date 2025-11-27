import { ProjectList } from "@/components/ProjectList"
import { Sun, Zap, TrendingUp, Sparkles } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <div className="inline-flex items-center justify-center rounded-full shadow-xl mb-6 overflow-hidden">
          <Image
            src="/NikoSun_logo.png"
            alt="Niko Sun Logo"
            width={120}
            height={120}
            className="animate-pulse"
            priority
          />
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Niko Sun
        </h1>
        <p className="text-xl sm:text-2xl text-muted max-w-3xl mx-auto mb-8">
          Invierte en energía solar renovable con tokens blockchain.
          Participa en proyectos solares y recibe beneficios por la energía generada.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <FeatureCard
            icon={<Sun className="w-6 h-6" />}
            title="100% Solar"
            description="Energía limpia y renovable"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Tokenizado"
            description="Basado en blockchain"
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Transparente"
            description="Métricas en tiempo real"
          />
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Proyectos Solares Disponibles
              </h2>
              <p className="text-muted-foreground">
                Explora y compra tokens de proyectos de energía solar
              </p>
            </div>
          </div>
        </div>
        <ProjectList />
      </section>

      {/* Info Section */}
      <section className="py-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            ¿Cómo Funciona?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <StepCard
              number="1"
              title="Conecta tu Wallet"
              description="Conecta tu wallet de Ethereum compatible"
            />
            <StepCard
              number="2"
              title="Compra Tokens"
              description="Invierte en proyectos solares comprando tokens"
            />
            <StepCard
              number="3"
              title="Recibe Beneficios"
              description="Obtén retornos por la energía generada"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card-bg border-2 border-card-border shadow-md hover:shadow-lg transition-all hover:scale-105 card-gradient">
      <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary text-white">
        {icon}
      </div>
      <div className="text-left">
        <p className="font-bold text-foreground">{title}</p>
        <p className="text-sm text-muted">{description}</p>
      </div>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
        {number}
      </div>
      <h4 className="text-lg font-bold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
