"use client"
import { useNextProjectId } from '@/hooks/useSolarContract'
import { ProjectCard } from './ProjectCard'
import { Loader2 } from 'lucide-react'

export function ProjectList() {
  const { nextProjectId, isLoading } = useNextProjectId()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  const projectIds = Array.from({ length: nextProjectId }, (_, i) => i)

  if (projectIds.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">
          No hay proyectos disponibles todavía
        </p>
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
