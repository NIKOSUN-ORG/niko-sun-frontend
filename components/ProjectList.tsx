"use client"
import { useNextProjectId } from '@/hooks/useSolarContract'
import { ProjectCard } from './ProjectCard'
import { Loader2, Sun, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ProjectList() {
  const { nextProjectId, isLoading } = useNextProjectId()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border-2 border-card-border bg-card-bg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full skeleton-shimmer" />
              <div className="flex-1">
                <div className="h-5 w-32 rounded skeleton-shimmer mb-2" />
                <div className="h-4 w-16 rounded skeleton-shimmer" />
              </div>
            </div>
            <div className="h-3 rounded-full skeleton-shimmer mb-4" />
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="h-20 rounded-lg skeleton-shimmer" />
              <div className="h-20 rounded-lg skeleton-shimmer" />
              <div className="h-20 rounded-lg skeleton-shimmer" />
            </div>
            <div className="h-12 rounded-lg skeleton-shimmer" />
          </div>
        ))}
      </div>
    )
  }

  // Los IDs de proyectos empiezan en 1 y van hasta nextProjectId - 1
  const projectIds = Array.from({ length: nextProjectId - 1 }, (_, i) => i + 1)

  if (projectIds.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl border-2 border-dashed border-card-border bg-card-bg/50 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Sun className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          No hay proyectos disponibles
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Aún no se han creado proyectos solares. ¿Tienes un proyecto de energía solar? ¡Sé el primero en crearlo!
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg transition-all"
        >
          Crear Proyecto <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectIds.map((id) => (
        <ProjectCard key={id} projectId={id} />
      ))}
    </div>
  )
}
