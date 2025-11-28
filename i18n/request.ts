import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

// Importar mensajes estáticamente
import esMessages from '../messages/es.json'
import enMessages from '../messages/en.json'

export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'

const messages = {
    es: esMessages,
    en: enMessages
}

export default getRequestConfig(async () => {
    // Intentar obtener el locale de las cookies
    const cookieStore = await cookies()
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value

    // Si hay cookie válida, usarla
    if (localeCookie && locales.includes(localeCookie as Locale)) {
        return {
            locale: localeCookie as Locale,
            messages: messages[localeCookie as Locale]
        }
    }

    // Si no hay cookie, intentar detectar del header Accept-Language
    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language')

    let detectedLocale: Locale = defaultLocale

    if (acceptLanguage) {
        const preferredLocale = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
        if (locales.includes(preferredLocale as Locale)) {
            detectedLocale = preferredLocale as Locale
        }
    }

    return {
        locale: detectedLocale,
        messages: messages[detectedLocale]
    }
})
