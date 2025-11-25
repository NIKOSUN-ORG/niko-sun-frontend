"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { syscoin,syscoinTestnet } from "wagmi/chains"

export default getDefaultConfig({
  appName: "TSender",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [syscoinTestnet],
  ssr: false,
})