"use client"

import React, { useState } from 'react'
import { 
  Bell, 
  Search, 
  Menu, 
  Settings, 
  User, 
  LogOut, 
  HelpCircle, 
  Moon, 
  Sun, 
  Command, 
  Zap, 
  Activity 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)
  const [notifications] = useState(3)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border/50 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 px-6 sticky top-0 z-50 animate-slide-up">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden hover-glow transition-all duration-300"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menú</span>
      </Button>

      {/* Search with gradient border effect */}
      <div className="flex-1 md:max-w-md">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary transition-colors duration-300" />
            <Input
              placeholder="Buscar clientes, leads, proyectos..."
              className="pl-10 md:w-[320px] bg-muted/50 border-border/50 hover:border-primary/30 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <Command className="h-3 w-3" />K
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with modern styling */}
      <div className="flex items-center gap-2">
        {/* Activity indicator */}
        <div className="hidden lg:flex items-center gap-2 mr-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">En línea</span>
          </div>
        </div>

        {/* Quick action button */}
        <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 hover-lift bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300">
          <Zap className="h-3 w-3" />
          Acción Rápida
        </Button>

        {/* Theme toggle with smooth transition */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="hover-glow transition-all duration-300 hover:bg-primary/10"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-500" />
          ) : (
            <Moon className="h-4 w-4 text-blue-600" />
          )}
          <span className="sr-only">Cambiar tema</span>
        </Button>

        {/* Enhanced notifications */}
        <Button variant="ghost" size="icon" className="relative hover-glow transition-all duration-300 hover:bg-primary/10">
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <>
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center animate-pulse-glow border-2 border-background"
              >
                {notifications}
              </Badge>
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full animate-ping opacity-20" />
            </>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="hover-glow transition-all duration-300 hover:bg-primary/10">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Configuración</span>
        </Button>

        {/* Enhanced user menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover-lift transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-50 transition-opacity duration-300" />
              <Avatar className="h-8 w-8 border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
                <AvatarImage src="/avatars/admin.png" alt="@codigofacil" />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-semibold">
                  CF
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 p-2 glass border-border/50 animate-scale-in" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/30">
                    <AvatarImage src="/avatars/admin.png" alt="@codigofacil" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                      CF
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold leading-none">CodigoFacil Team</p>
                      <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                        Pro
                      </Badge>
                    </div>
                    <p className="text-xs leading-none text-muted-foreground mt-1">
                      equipo@codigofacil.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Activity className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Activo ahora
                  </span>
                  <div className="flex-1" />
                  <div className="text-xs text-muted-foreground">
                    Última actividad: hace 2 min
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="hover:bg-primary/10 rounded-md transition-colors duration-200 cursor-pointer">
              <User className="mr-3 h-4 w-4 text-primary" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/10 rounded-md transition-colors duration-200 cursor-pointer">
              <Settings className="mr-3 h-4 w-4 text-primary" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/10 rounded-md transition-colors duration-200 cursor-pointer">
              <HelpCircle className="mr-3 h-4 w-4 text-primary" />
              <span>Ayuda & Soporte</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="hover:bg-destructive/10 text-destructive rounded-md transition-colors duration-200 cursor-pointer">
              <LogOut className="mr-3 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}