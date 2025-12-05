"use client"

import React from 'react'
import { Bell, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="flex flex-1 items-center justify-center px-6 lg:ml-6 lg:justify-start">
        <div className="w-full max-w-lg lg:max-w-xs">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Buscar clientes, leads..."
              type="search"
            />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            variant="destructive"
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
          >
            3
          </Badge>
        </Button>

        {/* User menu */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right text-sm md:block">
            <p className="font-medium">Admin CodigoFacil</p>
            <p className="text-muted-foreground">admin@codigofacil.com</p>
          </div>
          <Avatar>
            <AvatarImage src="/avatars/admin.png" alt="Admin" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              CF
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}