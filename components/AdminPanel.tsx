"use client"
import { useState } from 'react'
import { useAccount } from 'wagmi'
import {
  useCreateProject,
  useUpdateMetrics,
  useRecordPayout,
  useWithdraw,
  useSetProjectStatus
} from '@/hooks/useSolarContract'
import {
  Settings,
  Plus,
  Zap,
  DollarSign,
  Download,
  Loader2,
  Shield,
  CheckCircle2,
  XCircle
} from 'lucide-react'

export function AdminPanel() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'create' | 'update' | 'withdraw'>('create')

  if (!isConnected) {
    return (
      <div className="rounded-2xl border-2 border-card-border bg-card-bg p-8 shadow-lg text-center card-gradient">
        <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          Panel de Administración
        </h3>
        <p className="text-muted-foreground">
          Conecta tu wallet para acceder al panel de administración
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border-2 border-card-border bg-card-bg shadow-lg overflow-hidden card-gradient">
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-white/20">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Panel de Administración</h3>
            <p className="text-sm text-white/80">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'create'
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:bg-muted/5'
            }`}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Crear Proyecto
          </button>
          <button
            onClick={() => setActiveTab('update')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'update'
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:bg-muted/5'
            }`}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Actualizar Métricas
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'withdraw'
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:bg-muted/5'
            }`}
          >
            <Download className="w-5 h-5 inline mr-2" />
            Retirar Fondos
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'create' && <CreateProjectForm />}
        {activeTab === 'update' && <UpdateMetricsForm />}
        {activeTab === 'withdraw' && <WithdrawForm />}
      </div>
    </div>
  )
}

function CreateProjectForm() {
  const [totalSupply, setTotalSupply] = useState('')
  const [price, setPrice] = useState('')
  const { createProject, isPending, isSuccess, error } = useCreateProject()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!totalSupply || !price) return
    createProject(Number(totalSupply), price)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Suministro Total de Tokens
        </label>
        <input
          type="number"
          value={totalSupply}
          onChange={(e) => setTotalSupply(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
          placeholder="1000"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Precio por Token (ETH)
        </label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
          placeholder="0.001"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Creando...</span>
          </>
        ) : (
          <>
            <Plus className="w-6 h-6" />
            <span>Crear Proyecto</span>
          </>
        )}
      </button>

      {isSuccess && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <p className="text-sm text-primary font-medium">
            ¡Proyecto creado exitosamente!
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-500 font-medium">
            Error: {error.message}
          </p>
        </div>
      )}
    </form>
  )
}

function UpdateMetricsForm() {
  const [projectId, setProjectId] = useState('')
  const [energyDelta, setEnergyDelta] = useState('')
  const [payoutAmount, setPayoutAmount] = useState('')
  const { updateMetrics, isPending: isUpdating, isSuccess: updateSuccess } = useUpdateMetrics()
  const { recordPayout, isPending: isRecording, isSuccess: payoutSuccess } = useRecordPayout()
  const { setProjectStatus, isPending: isToggling } = useSetProjectStatus()

  const handleUpdateMetrics = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectId || !energyDelta) return
    updateMetrics(Number(projectId), Number(energyDelta))
  }

  const handleRecordPayout = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectId || !payoutAmount) return
    recordPayout(Number(projectId), Number(payoutAmount))
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleUpdateMetrics} className="space-y-4">
        <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Actualizar Energía Generada
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              ID del Proyecto
            </label>
            <input
              type="number"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Energía (kWh)
            </label>
            <input
              type="number"
              value={energyDelta}
              onChange={(e) => setEnergyDelta(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
              placeholder="100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUpdating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Actualizando...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Actualizar Métricas</span>
            </>
          )}
        </button>

        {updateSuccess && (
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
            <p className="text-sm text-primary font-medium text-center">
              ¡Métricas actualizadas!
            </p>
          </div>
        )}
      </form>

      <div className="border-t border-border pt-6">
        <form onSubmit={handleRecordPayout} className="space-y-4">
          <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-secondary" />
            Registrar Pago
          </h4>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Monto Distribuido (USD)
            </label>
            <input
              type="number"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
              placeholder="1000"
            />
          </div>

          <button
            type="submit"
            disabled={isRecording}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRecording ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Registrando...</span>
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5" />
                <span>Registrar Pago</span>
              </>
            )}
          </button>

          {payoutSuccess && (
            <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/30">
              <p className="text-sm text-secondary font-medium text-center">
                ¡Pago registrado exitosamente!
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

function WithdrawForm() {
  const { withdraw, isPending, isSuccess, error } = useWithdraw()

  const handleWithdraw = () => {
    withdraw()
  }

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-lg bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/30">
        <h4 className="font-bold text-foreground text-lg mb-3 flex items-center gap-2">
          <Download className="w-5 h-5 text-secondary" />
          Retirar Fondos del Contrato
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Esta acción retirará todos los fondos del contrato a tu wallet.
          Solo los administradores pueden realizar esta acción.
        </p>

        <button
          onClick={handleWithdraw}
          disabled={isPending}
          className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-secondary to-secondary-dark text-white font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Retirando...</span>
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              <span>Retirar Fondos</span>
            </>
          )}
        </button>

        {isSuccess && (
          <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <p className="text-sm text-primary font-medium">
              ¡Fondos retirados exitosamente!
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-500 font-medium">
              Error: {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
