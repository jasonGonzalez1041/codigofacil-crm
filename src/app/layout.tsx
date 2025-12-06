import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'CodigoFacil CRM - Sistema de Gestión de Clientes',
  description: 'Sistema CRM moderno para CodigoFacil.com - Gestiona clientes, leads y ventas de manera eficiente',
  keywords: ['CRM', 'CodigoFacil', 'gestión clientes', 'leads', 'ventas', 'Costa Rica'],
  authors: [{ name: 'CodigoFacil Team' }],
  creator: 'CodigoFacil.com',
  publisher: 'CodigoFacil.com',
  robots: 'noindex, nofollow', // Private CRM system
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}