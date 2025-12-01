"use client"
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import {
  useCreateProject,
  useUpdateEnergy,
  useDepositRevenue,
  useWithdrawSales,
  useSetProjectStatus,
  useContractOwner,
  usePauseContract,
  useContractPaused,
  useContractBalance,
  useSalesBalance,
  useProjectData,
  useIsProjectCreator,
  useTransferProjectOwnership,
  useSetEnergy,
  useRescueDust,
  useTotalSalesBalance,
  useCreatorProjects,
  useMultipleProjectsData,
  useNextProjectId,
} from '@/hooks/useSolarContract'
import { useToast } from '@/components/Toast'
import { useTranslations } from 'next-intl'
import { getErrorMessage, isUserCausedError } from '@/utils/parseError'
import {
  Settings,
  Plus,
  Zap,
  DollarSign,
  Download,
  Loader2,
  Shield,
  CheckCircle2,
  XCircle,
  Pause,
  Play,
  Send,
  User,
  AlertTriangle,
  Wallet,
  List,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export function AdminPanel() {
  const { address, isConnected } = useAccount()
  const { owner } = useContractOwner()
  const { isPaused } = useContractPaused()
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'revenue' | 'owner'>('create')
  const t = useTranslations('admin')

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase()

  if (!isConnected) {
    return (
      <div className="rounded-2xl border-2 border-card-border bg-card-bg p-8 shadow-lg text-center card-gradient animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Shield className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          {t('title')}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t('connectWallet')}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border-2 border-card-border bg-card-bg shadow-lg overflow-hidden card-gradient animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-white/20">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{t('title')}</h3>
            <p className="text-sm text-white/80">
              {address?.slice(0, 6)}...{address?.slice(-4)}
              {isOwner && <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">Owner</span>}
            </p>
          </div>
        </div>
        {isPaused && (
          <div className="mt-3 p-2 bg-red-500/20 rounded-lg text-white text-sm flex items-center gap-2">
            <Pause className="w-4 h-4" />
            {t('contractPaused')}
          </div>
        )}
      </div>

      <div className="border-b border-border">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 px-4 py-4 font-semibold transition-colors ${activeTab === 'create'
              ? 'bg-primary/10 text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:bg-muted/5'
              }`}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            {t('tabCreate')}
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex-1 px-4 py-4 font-semibold transition-colors ${activeTab === 'manage'
              ? 'bg-primary/10 text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:bg-muted/5'
              }`}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            {t('tabManage')}
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`flex-1 px-4 py-4 font-semibold transition-colors ${activeTab === 'revenue'
              ? 'bg-primary/10 text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:bg-muted/5'
              }`}
          >
            <DollarSign className="w-5 h-5 inline mr-2" />
            {t('tabRevenue')}
          </button>
          {isOwner && (
            <button
              onClick={() => setActiveTab('owner')}
              className={`flex-1 px-4 py-4 font-semibold transition-colors ${activeTab === 'owner'
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:bg-muted/5'
                }`}
            >
              <Shield className="w-5 h-5 inline mr-2" />
              {t('tabOwner')}
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'create' && <CreateProjectForm />}
        {activeTab === 'manage' && <ManageProjectForm />}
        {activeTab === 'revenue' && <RevenueForm />}
        {activeTab === 'owner' && isOwner && <OwnerPanel />}
      </div>
    </div>
  )
}

function CreateProjectForm() {
  const [name, setName] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [price, setPrice] = useState('')
  const [minPurchase, setMinPurchase] = useState('1')
  const [formError, setFormError] = useState<string | null>(null)
  const { createProject, isPending, isSuccess, error } = useCreateProject()
  const { showToast } = useToast()
  const t = useTranslations('createProject')
  const tErrors = useTranslations('errors')

  useEffect(() => {
    if (isSuccess) {
      showToast(t('success', { name }), 'success')
      setName('')
      setTotalSupply('')
      setPrice('')
      setMinPurchase('1')
      setFormError(null)
    }
  }, [isSuccess, name, showToast, t])

  useEffect(() => {
    if (error) {
      const errorMessage = getErrorMessage(error, tErrors)
      if (!isUserCausedError(error)) {
        showToast(errorMessage, 'error')
      }
      setFormError(errorMessage)
    }
  }, [error, showToast, tErrors])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !totalSupply || !price || !minPurchase) return
    const priceWei = parseEther(price)
    createProject(name, Number(totalSupply), priceWei, Number(minPurchase))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t('projectName')}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
          placeholder={t('projectNamePlaceholder')}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t('totalSupply')}
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
            {t('minPurchase')}
          </label>
          <input
            type="number"
            value={minPurchase}
            onChange={(e) => setMinPurchase(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
            placeholder="1"
            min="1"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t('pricePerToken')}
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
            <span>{t('creating')}</span>
          </>
        ) : (
          <>
            <Plus className="w-6 h-6" />
            <span>{t('createButton')}</span>
          </>
        )}
      </button>

      {isSuccess && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <p className="text-sm text-primary font-medium">
            {t('success', { name })}
          </p>
        </div>
      )}

      {formError && !isSuccess && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-500 font-medium">
            {formError}
          </p>
        </div>
      )}
    </form>
  )
}

function ManageProjectForm() {
  const { address } = useAccount()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [showProjectList, setShowProjectList] = useState(true)
  const [energyDelta, setEnergyDelta] = useState('')
  const [newCreator, setNewCreator] = useState('')
  const [updateFormError, setUpdateFormError] = useState<string | null>(null)
  const [transferFormError, setTransferFormError] = useState<string | null>(null)
  const t = useTranslations('manageProject')
  const tCommon = useTranslations('common')
  const tErrors = useTranslations('errors')
  const { showToast } = useToast()

  // Obtener proyectos del creador
  const { projectIds: creatorProjectIds, isLoading: isLoadingProjects, totalProjects } = useCreatorProjects(address)
  const { projects: creatorProjectsData, isLoading: isLoadingProjectsData } = useMultipleProjectsData(creatorProjectIds)

  const { owner } = useContractOwner()
  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase()

  const { updateEnergy, isPending: isUpdating, isSuccess: updateSuccess, error: updateError } = useUpdateEnergy()
  const { setProjectStatus, isPending: isToggling, isSuccess: toggleSuccess, error: toggleError } = useSetProjectStatus()
  const { transferProjectOwnership, isPending: isTransferring, isSuccess: transferSuccess, error: transferError } = useTransferProjectOwnership()

  // Obtener datos del proyecto seleccionado
  const selectedProject = creatorProjectsData.find(p => p?.id === selectedProjectId)
  const { isCreator } = useIsProjectCreator(selectedProjectId ?? 0, address)
  const canManage = isCreator || isOwner

  // Handle update energy errors
  useEffect(() => {
    if (updateSuccess) {
      setUpdateFormError(null)
      setEnergyDelta('')
    }
  }, [updateSuccess])

  useEffect(() => {
    if (updateError) {
      const errorMessage = getErrorMessage(updateError, tErrors)
      if (!isUserCausedError(updateError)) {
        showToast(errorMessage, 'error')
      }
      setUpdateFormError(errorMessage)
    }
  }, [updateError, tErrors, showToast])

  // Handle transfer errors
  useEffect(() => {
    if (transferSuccess) {
      setTransferFormError(null)
      setNewCreator('')
    }
  }, [transferSuccess])

  useEffect(() => {
    if (transferError) {
      const errorMessage = getErrorMessage(transferError, tErrors)
      if (!isUserCausedError(transferError)) {
        showToast(errorMessage, 'error')
      }
      setTransferFormError(errorMessage)
    }
  }, [transferError, tErrors, showToast])

  // Handle toggle status errors
  useEffect(() => {
    if (toggleError) {
      const errorMessage = getErrorMessage(toggleError, tErrors)
      if (!isUserCausedError(toggleError)) {
        showToast(errorMessage, 'error')
      }
    }
  }, [toggleError, tErrors, showToast])

  const handleUpdateEnergy = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProjectId || !energyDelta) return
    setUpdateFormError(null)
    updateEnergy(selectedProjectId, Number(energyDelta))
  }

  const handleToggleStatus = (active: boolean) => {
    if (!selectedProjectId) return
    setProjectStatus(selectedProjectId, active)
  }

  const handleTransferOwnership = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProjectId || !newCreator) return
    setTransferFormError(null)
    transferProjectOwnership(selectedProjectId, newCreator as `0x${string}`)
  }

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId)
    setShowProjectList(false)
  }

  return (
    <div className="space-y-6">
      {/* Lista de proyectos del creador */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
            <List className="w-5 h-5 text-primary" />
            {t('myProjects')}
          </h4>
          <button
            onClick={() => setShowProjectList(!showProjectList)}
            className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
          >
            {showProjectList ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isLoadingProjects || isLoadingProjectsData ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">{tCommon('loading')}</span>
          </div>
        ) : creatorProjectIds.length === 0 ? (
          <div className="p-6 rounded-lg bg-muted/10 border border-border text-center">
            <p className="text-muted-foreground">{t('noProjectsCreated')}</p>
            <p className="text-sm text-muted-foreground mt-1">{t('createFirstProject')}</p>
          </div>
        ) : (
          <>
            {/* Resumen */}
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-sm font-medium text-primary">
                {t('projectsCount', { count: creatorProjectIds.length })}
              </p>
            </div>

            {/* Lista de proyectos */}
            {showProjectList && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {creatorProjectsData.map((projectData) => {
                  if (!projectData) return null
                  const isSelected = selectedProjectId === projectData.id
                  return (
                    <button
                      key={projectData.id}
                      onClick={() => handleSelectProject(projectData.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-muted/5'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">#{projectData.id}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {projectData.metadata.name || `${t('project')} #${projectData.id}`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {Number(projectData.project.minted)}/{Number(projectData.project.totalSupply)} {t('tokensSold')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${projectData.project.active
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-red-500/20 text-red-500'
                            }`}>
                            {projectData.project.active ? tCommon('active') : tCommon('inactive')}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {Number(projectData.project.totalEnergyKwh).toLocaleString()} kWh
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Proyecto seleccionado */}
      {selectedProjectId && selectedProject && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold">#{selectedProjectId}</span>
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">
                  {selectedProject.metadata.name || `${t('project')} #${selectedProjectId}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.project.active ? `✅ ${tCommon('active')}` : `❌ ${tCommon('inactive')}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setSelectedProjectId(null); setShowProjectList(true) }}
              className="px-3 py-1 rounded-lg text-sm bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              {t('changeProject')}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="p-2 rounded bg-background/50">
              <p className="text-muted-foreground">{t('tokensSold')}</p>
              <p className="font-bold">{Number(selectedProject.project.minted)}/{Number(selectedProject.project.totalSupply)}</p>
            </div>
            <div className="p-2 rounded bg-background/50">
              <p className="text-muted-foreground">{t('energy')}</p>
              <p className="font-bold">{Number(selectedProject.project.totalEnergyKwh).toLocaleString()} kWh</p>
            </div>
            <div className="p-2 rounded bg-background/50">
              <p className="text-muted-foreground">{t('revenue')}</p>
              <p className="font-bold">{formatEther(selectedProject.project.totalRevenue)} tSYS</p>
            </div>
          </div>
        </div>
      )}

      {canManage && selectedProjectId && (
        <>
          {/* Actualizar Energía */}
          <form onSubmit={handleUpdateEnergy} className="space-y-4 border-t border-border pt-6">
            <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              {t('updateEnergy')}
            </h4>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                {t('energyToAdd')}
              </label>
              <input
                type="number"
                value={energyDelta}
                onChange={(e) => setEnergyDelta(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                placeholder="100"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t('updating')}</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>{t('updateButton')}</span>
                </>
              )}
            </button>

            {updateSuccess && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-primary font-medium text-center">
                  ✅ {t('updateEnergy')}
                </p>
              </div>
            )}
            {updateFormError && !updateSuccess && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm text-red-500 font-medium text-center">
                  {updateFormError}
                </p>
              </div>
            )}
          </form>

          {/* Cambiar Estado */}
          {isCreator && (
            <div className="space-y-4 border-t border-border pt-6">
              <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-secondary" />
                {t('changeStatus')}
              </h4>

              <div className="flex gap-4">
                <button
                  onClick={() => handleToggleStatus(true)}
                  disabled={isToggling || selectedProject?.project.active}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  {t('activate')}
                </button>
                <button
                  onClick={() => handleToggleStatus(false)}
                  disabled={isToggling || !selectedProject?.project.active}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  {t('deactivate')}
                </button>
              </div>

              {toggleSuccess && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm text-primary font-medium text-center">
                    ✅ {t('status')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Transferir Ownership del Proyecto */}
          {isCreator && (
            <form onSubmit={handleTransferOwnership} className="space-y-4 border-t border-border pt-6">
              <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                {t('transferOwnership')}
              </h4>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t('newCreator')}
                </label>
                <input
                  type="text"
                  value={newCreator}
                  onChange={(e) => setNewCreator(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                  placeholder="0x..."
                />
              </div>

              <button
                type="submit"
                disabled={isTransferring}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-secondary text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isTransferring ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t('transferring')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('transferButton')}</span>
                  </>
                )}
              </button>

              {transferSuccess && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm text-primary font-medium text-center">
                    ✅ {t('transferOwnership')}
                  </p>
                </div>
              )}
              {transferFormError && !transferSuccess && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-500 font-medium text-center">
                    {transferFormError}
                  </p>
                </div>
              )}
            </form>
          )}
        </>
      )}
    </div>
  )
}

function RevenueForm() {
  const { address } = useAccount()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [showProjectList, setShowProjectList] = useState(true)
  const [revenueAmount, setRevenueAmount] = useState('')
  const [energyKwh, setEnergyKwh] = useState('0')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [depositFormError, setDepositFormError] = useState<string | null>(null)
  const [withdrawFormError, setWithdrawFormError] = useState<string | null>(null)
  const t = useTranslations('revenue')
  const tCommon = useTranslations('common')
  const tManage = useTranslations('manageProject')
  const tErrors = useTranslations('errors')
  const { showToast } = useToast()

  // Obtener proyectos del creador
  const { projectIds: creatorProjectIds, isLoading: isLoadingProjects } = useCreatorProjects(address)
  const { projects: creatorProjectsData, isLoading: isLoadingProjectsData } = useMultipleProjectsData(creatorProjectIds)

  const { owner } = useContractOwner()
  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase()

  const { depositRevenue, isPending: isDepositing, isSuccess: depositSuccess, error: depositError } = useDepositRevenue()
  const { withdrawSales, isPending: isWithdrawing, isSuccess: withdrawSuccess, error: withdrawError } = useWithdrawSales()

  // Datos del proyecto seleccionado
  const selectedProject = creatorProjectsData.find(p => p?.id === selectedProjectId)
  const { salesBalance } = useSalesBalance(selectedProjectId ?? 0)
  const { isCreator } = useIsProjectCreator(selectedProjectId ?? 0, address)

  const canDeposit = isCreator || isOwner
  const canWithdraw = isCreator

  // Handle deposit errors
  useEffect(() => {
    if (depositSuccess) {
      setDepositFormError(null)
      setRevenueAmount('')
      setEnergyKwh('0')
      showToast(t('depositSuccess'), 'success')
    }
  }, [depositSuccess, showToast, t])

  useEffect(() => {
    if (depositError) {
      const errorMessage = getErrorMessage(depositError, tErrors)
      if (!isUserCausedError(depositError)) {
        showToast(errorMessage, 'error')
      }
      setDepositFormError(errorMessage)
    }
  }, [depositError, tErrors, showToast])

  // Handle withdraw errors
  useEffect(() => {
    if (withdrawSuccess) {
      setWithdrawFormError(null)
      setWithdrawAmount('')
      setRecipient('')
      showToast(t('withdrawSuccess'), 'success')
    }
  }, [withdrawSuccess, showToast, t])

  useEffect(() => {
    if (withdrawError) {
      const errorMessage = getErrorMessage(withdrawError, tErrors)
      if (!isUserCausedError(withdrawError)) {
        showToast(errorMessage, 'error')
      }
      setWithdrawFormError(errorMessage)
    }
  }, [withdrawError, tErrors, showToast])

  const handleDepositRevenue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProjectId || !revenueAmount) return
    setDepositFormError(null)
    const amountWei = parseEther(revenueAmount)
    depositRevenue(selectedProjectId, Number(energyKwh), amountWei)
  }

  const handleWithdrawSales = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProjectId || !withdrawAmount || !recipient) return
    setWithdrawFormError(null)
    const amountWei = parseEther(withdrawAmount)
    withdrawSales(selectedProjectId, recipient as `0x${string}`, amountWei)
  }

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId)
    setShowProjectList(false)
  }

  return (
    <div className="space-y-6">
      {/* Lista de proyectos del creador */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
            <List className="w-5 h-5 text-primary" />
            {tManage('myProjects')}
          </h4>
          <button
            onClick={() => setShowProjectList(!showProjectList)}
            className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
          >
            {showProjectList ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isLoadingProjects || isLoadingProjectsData ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">{tCommon('loading')}</span>
          </div>
        ) : creatorProjectIds.length === 0 ? (
          <div className="p-6 rounded-lg bg-muted/10 border border-border text-center">
            <p className="text-muted-foreground">{tManage('noProjectsCreated')}</p>
            <p className="text-sm text-muted-foreground mt-1">{tManage('createFirstProject')}</p>
          </div>
        ) : (
          <>
            {/* Lista de proyectos */}
            {showProjectList && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {creatorProjectsData.map((projectData) => {
                  if (!projectData) return null
                  const isSelected = selectedProjectId === projectData.id
                  const projectSalesBalance = projectData.salesBalance ?? BigInt(0)
                  return (
                    <button
                      key={projectData.id}
                      onClick={() => handleSelectProject(projectData.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-muted/5'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">#{projectData.id}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {projectData.metadata.name || `${tManage('project')} #${projectData.id}`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Revenue: {formatEther(projectData.project.totalRevenue)} tSYS
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-500">
                            {formatEther(projectSalesBalance)} tSYS
                          </p>
                          <p className="text-xs text-muted-foreground">{t('salesBalance')}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Proyecto seleccionado */}
      {selectedProjectId && selectedProject && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">
                  {selectedProject.metadata.name || `${tManage('project')} #${selectedProjectId}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  #{selectedProjectId}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setSelectedProjectId(null); setShowProjectList(true) }}
              className="px-3 py-1 rounded-lg text-sm bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              {tManage('changeProject')}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="p-2 rounded bg-background/50">
              <p className="text-muted-foreground">Revenue Total</p>
              <p className="font-bold text-primary">{formatEther(selectedProject.project.totalRevenue)} tSYS</p>
            </div>
            <div className="p-2 rounded bg-background/50">
              <p className="text-muted-foreground">{t('salesBalance')}</p>
              <p className="font-bold text-green-500">{salesBalance ? formatEther(salesBalance) : '0'} tSYS</p>
            </div>
            <div className="p-2 rounded bg-background/50">
              <p className="text-muted-foreground">{t('energyGenerated')}</p>
              <p className="font-bold">{Number(selectedProject.project.totalEnergyKwh).toLocaleString()} kWh</p>
            </div>
          </div>
        </div>
      )}

      {/* Depositar Revenue */}
      {canDeposit && selectedProjectId && (
        <form onSubmit={handleDepositRevenue} className="space-y-4 border-t border-border pt-6">
          <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            {t('depositRevenue')}
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                {t('amount')}
              </label>
              <input
                type="text"
                value={revenueAmount}
                onChange={(e) => setRevenueAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                placeholder="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                {t('energyGenerated')}
              </label>
              <input
                type="number"
                value={energyKwh}
                onChange={(e) => setEnergyKwh(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isDepositing}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDepositing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('depositing')}</span>
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5" />
                <span>{t('depositButton')}</span>
              </>
            )}
          </button>

          {depositSuccess && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-sm text-primary font-medium text-center">
                ✅ {t('depositSuccess')}
              </p>
            </div>
          )}
          {depositFormError && !depositSuccess && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-red-500 font-medium text-center">
                {depositFormError}
              </p>
            </div>
          )}
        </form>
      )}

      {/* Retirar Ventas */}
      {canWithdraw && selectedProjectId && (
        <form onSubmit={handleWithdrawSales} className="space-y-4 border-t border-border pt-6">
          <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
            <Download className="w-5 h-5 text-secondary" />
            {t('withdrawSales')}
          </h4>
          <p className="text-sm text-muted-foreground">
            {t('salesBalance')}: <span className="font-bold text-green-500">{salesBalance ? formatEther(salesBalance) : '0'} tSYS</span>
          </p>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {t('recipient')}
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
              placeholder="0x..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {t('amountToWithdraw')}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none transition-colors"
                placeholder="0.5"
              />
              <button
                type="button"
                onClick={() => setWithdrawAmount(salesBalance ? formatEther(salesBalance) : '0')}
                className="px-4 py-3 rounded-lg bg-muted/20 text-muted-foreground hover:bg-muted/30 transition-colors font-medium"
              >
                MAX
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isWithdrawing}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isWithdrawing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('withdrawing')}</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{t('withdrawButton')}</span>
              </>
            )}
          </button>

          {withdrawSuccess && (
            <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/30">
              <p className="text-sm text-secondary font-medium text-center">
                ✅ {t('withdrawSuccess')}
              </p>
            </div>
          )}
          {withdrawFormError && !withdrawSuccess && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-red-500 font-medium text-center">
                {withdrawFormError}
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

function OwnerPanel() {
  const { pause, unpause, isPending, isSuccess, error } = usePauseContract()
  const { isPaused } = useContractPaused()
  const { balance } = useContractBalance()
  const { totalSalesBalance } = useTotalSalesBalance()

  // Set Energy
  const [setEnergyProjectId, setSetEnergyProjectId] = useState('')
  const [newTotalEnergy, setNewTotalEnergy] = useState('')
  const [energyReason, setEnergyReason] = useState('')
  const { setEnergy, isPending: isSettingEnergy, isSuccess: setEnergySuccess, error: setEnergyError } = useSetEnergy()

  // Rescue Dust
  const [rescueRecipient, setRescueRecipient] = useState('')
  const { rescueDust, isPending: isRescuing, isSuccess: rescueSuccess, error: rescueError } = useRescueDust()

  const [formError, setFormError] = useState<string | null>(null)
  const [setEnergyFormError, setSetEnergyFormError] = useState<string | null>(null)
  const [rescueFormError, setRescueFormError] = useState<string | null>(null)

  const t = useTranslations('ownerPanel')
  const tErrors = useTranslations('errors')
  const { showToast } = useToast()

  // Handle pause/unpause
  useEffect(() => {
    if (isSuccess) {
      setFormError(null)
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      const errorMessage = getErrorMessage(error, tErrors)
      if (!isUserCausedError(error)) {
        showToast(errorMessage, 'error')
      }
      setFormError(errorMessage)
    }
  }, [error, tErrors, showToast])

  // Handle set energy
  useEffect(() => {
    if (setEnergySuccess) {
      setSetEnergyFormError(null)
      setSetEnergyProjectId('')
      setNewTotalEnergy('')
      setEnergyReason('')
      showToast(t('setEnergySuccess'), 'success')
    }
  }, [setEnergySuccess, showToast, t])

  useEffect(() => {
    if (setEnergyError) {
      const errorMessage = getErrorMessage(setEnergyError, tErrors)
      if (!isUserCausedError(setEnergyError)) {
        showToast(errorMessage, 'error')
      }
      setSetEnergyFormError(errorMessage)
    }
  }, [setEnergyError, tErrors, showToast])

  // Handle rescue dust
  useEffect(() => {
    if (rescueSuccess) {
      setRescueFormError(null)
      setRescueRecipient('')
      showToast(t('rescueDustSuccess'), 'success')
    }
  }, [rescueSuccess, showToast, t])

  useEffect(() => {
    if (rescueError) {
      const errorMessage = getErrorMessage(rescueError, tErrors)
      if (!isUserCausedError(rescueError)) {
        showToast(errorMessage, 'error')
      }
      setRescueFormError(errorMessage)
    }
  }, [rescueError, tErrors, showToast])

  const handleSetEnergy = (e: React.FormEvent) => {
    e.preventDefault()
    if (!setEnergyProjectId || !newTotalEnergy || !energyReason) return
    setSetEnergyFormError(null)
    setEnergy(Number(setEnergyProjectId), Number(newTotalEnergy), energyReason)
  }

  const handleRescueDust = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rescueRecipient) return
    setRescueFormError(null)
    rescueDust(rescueRecipient as `0x${string}`)
  }

  return (
    <div className="space-y-6">
      {/* Contract Status & Pause/Unpause */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/30">
        <h4 className="font-bold text-foreground text-lg mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-secondary" />
          {t('title')}
        </h4>

        <div className="mb-4 p-3 rounded-lg bg-muted/10 text-sm space-y-1">
          <p><span className="font-semibold">{t('contractBalance')}:</span> {balance ? formatEther(balance) : '0'} tSYS</p>
          <p><span className="font-semibold">{t('totalSalesBalance')}:</span> {totalSalesBalance ? formatEther(totalSalesBalance) : '0'} tSYS</p>
          <p><span className="font-semibold">{t('contractStatus')}:</span> {isPaused ? `⏸️ ${t('paused')}` : `▶️ ${t('running')}`}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => pause()}
            disabled={isPending || isPaused}
            className="flex-1 px-6 py-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Pause className="w-6 h-6" />
                <span>{t('pauseContract')}</span>
              </>
            )}
          </button>
          <button
            onClick={() => unpause()}
            disabled={isPending || !isPaused}
            className="flex-1 px-6 py-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Play className="w-6 h-6" />
                <span>{t('resumeContract')}</span>
              </>
            )}
          </button>
        </div>

        {isSuccess && (
          <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <p className="text-sm text-primary font-medium">
              ✅
            </p>
          </div>
        )}

        {formError && !isSuccess && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-500 font-medium">
              {formError}
            </p>
          </div>
        )}
      </div>

      {/* Set Energy (corrección de energía) */}
      <form onSubmit={handleSetEnergy} className="p-6 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h4 className="font-bold text-foreground text-lg">{t('setEnergy')}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{t('setEnergyDesc')}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {t('projectId')}
            </label>
            <input
              type="number"
              value={setEnergyProjectId}
              onChange={(e) => setSetEnergyProjectId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-yellow-500 focus:outline-none transition-colors"
              placeholder="1"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {t('newTotalEnergy')}
            </label>
            <input
              type="number"
              value={newTotalEnergy}
              onChange={(e) => setNewTotalEnergy(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-yellow-500 focus:outline-none transition-colors"
              placeholder="1000"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t('reason')}
          </label>
          <input
            type="text"
            value={energyReason}
            onChange={(e) => setEnergyReason(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-yellow-500 focus:outline-none transition-colors"
            placeholder={t('reasonPlaceholder')}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSettingEnergy}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSettingEnergy ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('settingEnergy')}</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>{t('setEnergyButton')}</span>
            </>
          )}
        </button>

        {setEnergySuccess && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm text-green-500 font-medium text-center">
              ✅ {t('setEnergySuccess')}
            </p>
          </div>
        )}
        {setEnergyFormError && !setEnergySuccess && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-500 font-medium text-center">
              {setEnergyFormError}
            </p>
          </div>
        )}
      </form>

      {/* Rescue Dust */}
      <form onSubmit={handleRescueDust} className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="w-5 h-5 text-purple-500" />
          <h4 className="font-bold text-foreground text-lg">{t('rescueDust')}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{t('rescueDustDesc')}</p>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t('recipient')}
          </label>
          <input
            type="text"
            value={rescueRecipient}
            onChange={(e) => setRescueRecipient(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-medium focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="0x..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isRescuing}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isRescuing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('rescuingDust')}</span>
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" />
              <span>{t('rescueDustButton')}</span>
            </>
          )}
        </button>

        {rescueSuccess && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-sm text-green-500 font-medium text-center">
              ✅ {t('rescueDustSuccess')}
            </p>
          </div>
        )}
        {rescueFormError && !rescueSuccess && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-500 font-medium text-center">
              {rescueFormError}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
