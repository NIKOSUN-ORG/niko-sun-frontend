"use client"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { SOLAR_TOKEN_ABI, SOLAR_TOKEN_ADDRESS } from '@/types/Abi'
import { parseEther, formatEther } from 'viem'

export function useProjectData(projectId: number | undefined) {
  const { data: project, isLoading, refetch } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getProject',
    args: projectId !== undefined ? [BigInt(projectId)] : undefined,
  })

  const { data: metrics } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'getMetrics',
    args: projectId !== undefined ? [BigInt(projectId)] : undefined,
  })

  const { data: availableTokens } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'availableTokens',
    args: projectId !== undefined ? [BigInt(projectId)] : undefined,
  })

  return {
    project,
    metrics,
    availableTokens,
    isLoading,
    refetch
  }
}

export function useNextProjectId() {
  const { data, isLoading } = useReadContract({
    address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
    abi: SOLAR_TOKEN_ABI,
    functionName: 'nextProjectId',
  })

  return {
    nextProjectId: data ? Number(data) : 0,
    isLoading
  }
}

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

export function useCreateProject() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createProject = (totalSupply: number, priceInEth: string) => {
    const priceWei = parseEther(priceInEth)
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'createProject',
      args: [BigInt(totalSupply), BigInt(priceWei)],
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

export function useUpdateMetrics() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateMetrics = (projectId: number, energyDelta: number) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'updateMetrics',
      args: [BigInt(projectId), BigInt(energyDelta)],
    })
  }

  return {
    updateMetrics,
    isPending: isPending || isConfirming,
    isSuccess,
    error
  }
}

export function useRecordPayout() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const recordPayout = (projectId: number, amount: number) => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'recordPayout',
      args: [BigInt(projectId), BigInt(amount)],
    })
  }

  return {
    recordPayout,
    isPending: isPending || isConfirming,
    isSuccess,
    error
  }
}

export function useWithdraw() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const withdraw = () => {
    writeContract({
      address: SOLAR_TOKEN_ADDRESS as `0x${string}`,
      abi: SOLAR_TOKEN_ABI,
      functionName: 'withdraw',
    })
  }

  return {
    withdraw,
    isPending: isPending || isConfirming,
    isSuccess,
    error
  }
}

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
    error
  }
}
