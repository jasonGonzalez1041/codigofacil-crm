"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Users,
  Building2,
  UserCheck,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  Phone,
  Mail,
  DollarSign
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Clientes',
    href: '/dashboard/clients',
    icon: Building2,
  },
  {
    name: 'Leads',
    href: '/dashboard/leads',
    icon: UserCheck,
  },
  {
    name: 'Contactos',
    href: '/dashboard/contacts',
    icon: Users,
  },
  {
    name: 'Ventas',
    href: '/dashboard/sales',
    icon: DollarSign,
  },
  {
    name: 'Reportes',
    href: '/dashboard/reports',
    icon: BarChart3,
  },
  {
    name: 'Calendario',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    name: 'Email',
    href: '/dashboard/email',
    icon: Mail,
  },
  {
    name: 'Llamadas',
    href: '/dashboard/calls',
    icon: Phone,
  },
  {
    name: 'Documentos',
    href: '/dashboard/documents',
    icon: FileText,
  },
]

const bottomNavigation = [
  {
    name: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('flex h-full w-64 flex-col bg-card border-r', className)}>
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center">
          <Logo size="md" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  isActive && 'bg-secondary font-medium'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t px-3 py-4">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  isActive && 'bg-secondary font-medium'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}