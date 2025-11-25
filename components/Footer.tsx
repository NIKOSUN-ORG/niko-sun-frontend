import { Sun } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card-bg border-t border-card-border py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Niko Sun
            </span>
          </div>
          <p className="text-muted text-center max-w-2xl">
            Plataforma descentralizada de inversión en energía solar renovable.
            Construida con blockchain para máxima transparencia y seguridad.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>© 2025 Niko Sun</span>
            <span>•</span>
            <span>Todos los derechos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
