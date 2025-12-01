"use client"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useReadContracts } from 'wagmi'
import { SOLAR_TOKEN_ABI, SOLAR_TOKEN_ADDRESS } from '@/types/Abi'

// Tipos para el contrato SolarTokenV3Optimized
export interface Project {
  creator: `0x${string}`
  totalSupply: bigint
  minted: bigint
  minPurchase: bigint
  priceWei: bigint  // uint128 en el nuevo contrato
  createdAt: bigint
  active: boolean
  totalEnergyKwh: bigint
  reserved1: bigint  // uint48 en el nuevo contrato
  totalRevenue: bigint
  reserved2: bigint
  rewardPerTokenStored: bigint
}

export interface ProjectMetadata {
  name: string
}

export interface InvestorPosition {
  projectId: bigint
  tokenBalance: bigint
  claimableAmount: bigint
  totalClaimed: bigint
}

// Tipos para paginación
export interface PaginatedPortfolioResult {
  positions: InvestorPosition[]
  total: bigint
  hasMore: boolean
}

export interface PaginatedProjectsResult {
  projectIds: bigint[]
  total: bigint
  hasMore: boolean
}

// Hook para obtener datos completos del proyecto
export function useProjectData(projectId: number | undefined) {
  const { data, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getProject',
    args: projectId !== undefined ? [BigInt(projectId)] : undefined,
  })

  // getProject retorna: (Project, ProjectMetadata, salesBalance, availableSupply)
  const projectData = data as [Project, ProjectMetadata, bigint, bigint] | undefined

  return {
    project: projectData?.[0],
    metadata: projectData?.[1],
    salesBalance: projectData?.[2],
    availableSupply: projectData?.[3],
    isLoading,
    refetch
  }
}

// Hook para obtener el siguiente ID de proyecto
export function useNextProjectId() {
  const { data, isLoading } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'nextProjectId',
  })

  return {
    nextProjectId: data ? Number(data) : 1, // El contrato empieza en 1
    isLoading
  }
}

// Hook para obtener el owner del contrato
export function useContractOwner() {
  const { data, isLoading } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'owner',
  })

  return {
    owner: data as `0x${string}` | undefined,
    isLoading
  }
}

// Hook para verificar si el contrato está pausado
export function useContractPaused() {
  const { data, isLoading } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'paused',
  })

  return {
    isPaused: data as boolean | undefined,
    isLoading
  }
}

// Hook para obtener balance de tokens del usuario
export function useUserBalance(address: `0x${string}` | undefined, projectId: number) {
  const { data: balance, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address && projectId !== undefined ? [address, BigInt(projectId)] : undefined,
  })

  return {
    balance: balance ? Number(balance) : 0,
    refetch
  }
}

// Hook para obtener el monto reclamable por un inversor
export function useClaimableAmount(projectId: number, address: `0x${string}` | undefined) {
  const { data, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getClaimableAmount',
    args: address ? [BigInt(projectId), address] : undefined,
  })

  return {
    claimable: data ? data as bigint : BigInt(0),
    refetch
  }
}

// Hook para obtener el portafolio del inversor
export function useInvestorPortfolio(address: `0x${string}` | undefined, projectIds: number[]) {
  const { data, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getInvestorPortfolio',
    args: address ? [address, projectIds.map(id => BigInt(id))] : undefined,
  })

  return {
    positions: data as InvestorPosition[] | undefined,
    isLoading,
    refetch
  }
}

// Hook para verificar si una dirección es el creador del proyecto
export function useIsProjectCreator(projectId: number, address: `0x${string}` | undefined) {
  const { data, isLoading } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'isProjectCreator',
    args: address ? [BigInt(projectId), address] : undefined,
  })

  return {
    isCreator: data as boolean | undefined,
    isLoading
  }
}

// Hook para obtener el creador del proyecto
export function useProjectCreator(projectId: number) {
  const { data, isLoading } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getProjectCreator',
    args: [BigInt(projectId)],
  })

  return {
    creator: data as `0x${string}` | undefined,
    isLoading
  }
}

// Hook para mintear tokens (compra pública)
export function useMintTokens() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mint = async (projectId: number, amount: number, priceWei: bigint) => {
    const totalCost = priceWei * BigInt(amount)
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'mint',
      args: [BigInt(projectId), BigInt(amount)],
      value: totalCost,
    })
  }

  return {
    mint,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para crear proyecto (cualquier usuario puede crear)
export function useCreateProject() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Nuevo contrato: createProject(name, totalSupply, priceWei, minPurchase)
  const createProject = (name: string, totalSupply: number, priceInWei: bigint, minPurchase: number) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'createProject',
      args: [name, BigInt(totalSupply), priceInWei, BigInt(minPurchase)],
    })
  }

  return {
    createProject,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para crear proyecto para otra dirección (solo owner)
export function useCreateProjectFor() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createProjectFor = (creator: `0x${string}`, name: string, totalSupply: number, priceInWei: bigint, minPurchase: number) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'createProjectFor',
      args: [creator, name, BigInt(totalSupply), priceInWei, BigInt(minPurchase)],
    })
  }

  return {
    createProjectFor,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para actualizar energía (solo projectCreator o owner)
export function useUpdateEnergy() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateEnergy = (projectId: number, energyKwhDelta: number) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'updateEnergy',
      args: [BigInt(projectId), BigInt(energyKwhDelta)],
    })
  }

  return {
    updateEnergy,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para depositar revenue (solo projectCreator o owner)
export function useDepositRevenue() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const depositRevenue = (projectId: number, energyKwhDelta: number, amountWei: bigint) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'depositRevenue',
      args: [BigInt(projectId), BigInt(energyKwhDelta)],
      value: amountWei,
    })
  }

  return {
    depositRevenue,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para retirar ventas (solo projectCreator)
export function useWithdrawSales() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const withdrawSales = (projectId: number, recipient: `0x${string}`, amount: bigint) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'withdrawSales',
      args: [BigInt(projectId), recipient, amount],
    })
  }

  return {
    withdrawSales,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para reclamar revenue de un proyecto
export function useClaimRevenue() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const claimRevenue = (projectId: number) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'claimRevenue',
      args: [BigInt(projectId)],
    })
  }

  return {
    claimRevenue,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para reclamar revenue de múltiples proyectos
export function useClaimMultiple() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const claimMultiple = (projectIds: number[]) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'claimMultiple',
      args: [projectIds.map(id => BigInt(id))],
    })
  }

  return {
    claimMultiple,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para cambiar estado del proyecto (solo projectCreator)
export function useSetProjectStatus() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setProjectStatus = (projectId: number, active: boolean) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'setProjectStatus',
      args: [BigInt(projectId), active],
    })
  }

  return {
    setProjectStatus,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para transferir ownership del proyecto (solo projectCreator)
export function useTransferProjectOwnership() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const transferProjectOwnership = (projectId: number, newCreator: `0x${string}`) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'transferProjectOwnership',
      args: [BigInt(projectId), newCreator],
    })
  }

  return {
    transferProjectOwnership,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para pausar el contrato (solo owner)
export function usePauseContract() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const pause = () => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'pause',
    })
  }

  const unpause = () => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'unpause',
    })
  }

  return {
    pause,
    unpause,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para transferir ownership del contrato (solo owner)
export function useTransferContractOwnership() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const transferOwnership = (newOwner: `0x${string}`) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'transferOwnership',
      args: [newOwner],
    })
  }

  return {
    transferOwnership,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para obtener balance total del contrato
export function useContractBalance() {
  const { data, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getTotalBalance',
  })

  return {
    balance: data as bigint | undefined,
    isLoading,
    refetch
  }
}

// Hook para obtener balance de ventas de un proyecto
export function useSalesBalance(projectId: number) {
  const { data, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getSalesBalance',
    args: [BigInt(projectId)],
  })

  return {
    salesBalance: data as bigint | undefined,
    isLoading,
    refetch
  }
}

// ============ NUEVAS FUNCIONES DEL CONTRATO ============

// Hook para setear energía total (solo owner) - permite corregir errores
export function useSetEnergy() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setEnergy = (projectId: number, newTotalEnergy: number, reason: string) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'setEnergy',
      args: [BigInt(projectId), BigInt(newTotalEnergy), reason],
    })
  }

  return {
    setEnergy,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para transferir tokens a otra dirección
export function useTransferTokens() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const transferTokens = (to: `0x${string}`, projectId: number, amount: number) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'transferTokens',
      args: [to, BigInt(projectId), BigInt(amount)],
    })
  }

  return {
    transferTokens,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para rescatar polvo (fondos sin asignar) del contrato - solo owner
export function useRescueDust() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const rescueDust = (recipient: `0x${string}`) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'rescueDust',
      args: [recipient],
    })
  }

  return {
    rescueDust,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
    hash
  }
}

// Hook para obtener el balance total de ventas de todos los proyectos
export function useTotalSalesBalance() {
  const { data, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getTotalSalesBalance',
  })

  return {
    totalSalesBalance: data as bigint | undefined,
    isLoading,
    refetch
  }
}

// Hook para obtener proyectos de un usuario
export function useUserProjects(address: `0x${string}` | undefined) {
  const { data, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getUserProjects',
    args: address ? [address] : undefined,
  })

  return {
    projectIds: data as bigint[] | undefined,
    isLoading,
    refetch
  }
}

// Hook para obtener cantidad de proyectos de un usuario
export function useUserProjectsCount(address: `0x${string}` | undefined) {
  const { data, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getUserProjectsCount',
    args: address ? [address] : undefined,
  })

  return {
    count: data ? Number(data) : 0,
    isLoading,
    refetch
  }
}

// Hook para obtener proyectos de un usuario paginados
export function useUserProjectsPaginated(
  address: `0x${string}` | undefined,
  offset: number,
  limit: number
) {
  const { data, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getUserProjectsPaginated',
    args: address ? [address, BigInt(offset), BigInt(limit)] : undefined,
  })

  const result = data as [bigint[], bigint, boolean] | undefined

  return {
    projectIds: result?.[0],
    total: result?.[1] ? Number(result[1]) : 0,
    hasMore: result?.[2] ?? false,
    isLoading,
    refetch
  }
}

// Hook para obtener proyectos creados por un usuario (donde es el creator)
export function useCreatorProjects(address: `0x${string}` | undefined) {
  const { nextProjectId, isLoading: isLoadingNextId } = useNextProjectId()

  // Crear array de IDs de proyectos para consultar
  const projectIds = Array.from({ length: Math.max(0, nextProjectId - 1) }, (_, i) => i + 1)

  // Consultar los creadores de todos los proyectos en batch
  const contracts = projectIds.map(id => ({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getProjectCreator' as const,
    args: [BigInt(id)] as const,
  }))

  const { data: creatorsData, isLoading: isLoadingCreators, refetch } = useReadContracts({
    contracts: contracts.length > 0 ? contracts : undefined,
  })

  // Filtrar proyectos donde el usuario es el creador
  const creatorProjects: number[] = []
  if (address && creatorsData) {
    creatorsData.forEach((result, index) => {
      if (result.status === 'success') {
        const creator = result.result as `0x${string}`
        if (creator && creator.toLowerCase() === address.toLowerCase()) {
          creatorProjects.push(projectIds[index])
        }
      }
    })
  }

  return {
    projectIds: creatorProjects,
    isLoading: isLoadingNextId || isLoadingCreators,
    refetch,
    totalProjects: nextProjectId - 1
  }
}

// Hook para obtener datos básicos de múltiples proyectos
export function useMultipleProjectsData(projectIds: number[]) {
  const contracts = projectIds.map(id => ({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getProject' as const,
    args: [BigInt(id)] as const,
  }))

  const { data, isLoading, refetch } = useReadContracts({
    contracts: contracts.length > 0 ? contracts : undefined,
  })

  const projects = data?.map((result, index) => {
    if (result.status === 'success') {
      const [project, metadata, salesBalance, availableSupply] = result.result as [Project, ProjectMetadata, bigint, bigint]
      return {
        id: projectIds[index],
        project,
        metadata,
        salesBalance,
        availableSupply
      }
    }
    return null
  }).filter(Boolean) ?? []

  return {
    projects,
    isLoading,
    refetch
  }
}
