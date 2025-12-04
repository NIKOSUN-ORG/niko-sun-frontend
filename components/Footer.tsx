"use client"
import Image from "next/image"
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-card-bg border-t border-card-border py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/NikoSun_logo.png"
              alt="Niko Sun Logo"
              width={40}
              height={40}
              className="rounded-full shadow-lg"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Niko Sun
            </span>
            <Image
              src="/Flag_of_Peru.svg"
              alt="Perú"
              width={24}
              height={14}
              className="opacity-50 ml-1"
            />
          </div>
          <p className="text-muted text-center max-w-2xl">
            {t('description')}
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground items-center">
            <span>{t('copyright')}</span>
            <span>•</span>
            <span>{t('rights')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
