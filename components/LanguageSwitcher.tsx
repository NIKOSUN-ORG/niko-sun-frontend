"use client"
import { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
    const t = useTranslations('languageSwitcher')
    const locale = useLocale()
    const [isPending, startTransition] = useTransition()

    const handleChange = (newLocale: string) => {
        startTransition(() => {
            // Set cookie
            document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
            // Reload to apply
            window.location.reload()
        })
    }

    return (
        <div className="relative group">
            <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground"
                disabled={isPending}
            >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium uppercase">{locale}</span>
            </button>

            <div className="absolute right-0 top-full mt-1 py-1 bg-card-bg border border-card-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[120px] z-50">
                <button
                    onClick={() => handleChange('es')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-muted/10 transition-colors flex items-center gap-2 ${locale === 'es' ? 'text-primary font-semibold' : 'text-foreground'}`}
                >
                    <span>🇪🇸</span>
                    {t('spanish')}
                </button>
                <button
                    onClick={() => handleChange('en')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-muted/10 transition-colors flex items-center gap-2 ${locale === 'en' ? 'text-primary font-semibold' : 'text-foreground'}`}
                >
                    <span>🇺🇸</span>
                    {t('english')}
                </button>
            </div>
        </div>
    )
}
