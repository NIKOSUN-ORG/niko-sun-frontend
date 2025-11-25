"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Sun } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 z-30 bg-card-bg/90 backdrop-blur-md border-b border-card-border shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo for mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Niko Sun
            </span>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden lg:block flex-1" />

          {/* Connect Button */}
          <div className="ml-auto">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}