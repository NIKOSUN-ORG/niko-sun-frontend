import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./provider"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ToastProvider } from "@/components/Toast"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Niko Sun - Inversión en Energía Solar con Blockchain",
  description: "Invierte en energía solar renovable con tokens blockchain. Participa en proyectos solares y recibe beneficios por la energía generada.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ToastProvider>
            <div className="min-h-screen bg-background">
              <Sidebar />
              <div className="lg:pl-72">
                <Header />
                <main className="pt-20 pb-8 px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto">
                    {children}
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
