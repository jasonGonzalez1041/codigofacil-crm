"use client"

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Enhanced Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Enhanced Mobile sidebar with improved backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex h-full w-64 flex-col bg-card/95 backdrop-blur-xl border-r border-border/50 shadow-2xl animate-slide-in-left">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Enhanced Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background/80 via-muted/10 to-background/90 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          
          {/* Content container with enhanced padding and animations */}
          <div className="container mx-auto p-6 lg:p-8 relative z-10 animate-fade-in">
            <div className="min-h-full">
              {children}
            </div>
          </div>
          
          {/* Floating background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
        </main>
      </div>
    </div>
  )
}