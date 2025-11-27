"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useContractOwner } from '@/hooks/useSolarContract'
import {
  LayoutDashboard,
  TrendingUp,
  Settings,
  Menu,
  X,
  Home,
  BarChart3
} from 'lucide-react'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { address } = useAccount()
  const { owner } = useContractOwner()

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase()

  const menuItems = [
    {
      name: 'Inicio',
      href: '/',
      icon: Home,
      description: 'Proyectos disponibles',
      showAlways: true
    },
    {
      name: 'Mi Portfolio',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Mis inversiones',
      showAlways: true
    },
    {
      name: 'Métricas',
      href: '/metrics',
      icon: BarChart3,
      description: 'Estadísticas globales',
      showAlways: false, // Solo para owner
      ownerOnly: true
    },
    {
      name: 'Administración',
      href: '/admin',
      icon: Settings,
      description: 'Panel de control',
      showAlways: true
    }
  ]

  // Filtrar items según permisos
  const visibleMenuItems = menuItems.filter(item => item.showAlways || (item.ownerOnly && isOwner))

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden p-3 rounded-xl bg-card-bg border-2 border-card-border shadow-lg hover:shadow-xl transition-all"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-card-bg border-r border-card-border z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 w-72 shadow-xl`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-card-border">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image
                  src="/NikoSun_logo.png"
                  alt="Niko Sun Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Niko Sun
                </h1>
                <p className="text-xs text-muted-foreground">Energía Solar</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {visibleMenuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive
                    ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 shadow-md'
                    : 'hover:bg-muted/10 border-2 border-transparent hover:border-muted/20'
                    }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-all ${isActive
                      ? 'bg-gradient-to-br from-primary to-secondary shadow-lg'
                      : 'bg-muted/20 group-hover:bg-muted/30'
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'
                        }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${isActive ? 'text-foreground' : 'text-muted group-hover:text-foreground'
                        }`}
                    >
                      {item.name}
                      {item.ownerOnly && (
                        <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-accent/20 text-accent">Owner</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-card-border">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <p className="font-semibold text-foreground">Blockchain</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Inversión descentralizada en energía solar renovable
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
