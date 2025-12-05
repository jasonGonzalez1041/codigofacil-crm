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
  DollarSign,
  GitBranch,
  Target,
  Zap,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    badge: null,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Leads',
    href: '/dashboard/leads',
    icon: UserCheck,
    badge: '12',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Pipeline',
    href: '/dashboard/pipeline',
    icon: GitBranch,
    badge: null,
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    name: 'Seguimientos',
    href: '/dashboard/follow-ups',
    icon: Target,
    badge: '5',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    name: 'Clientes',
    href: '/dashboard/clients',
    icon: Building2,
    badge: null,
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    name: 'Contactos',
    href: '/dashboard/contacts',
    icon: Users,
    badge: null,
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    name: 'Ventas',
    href: '/dashboard/sales',
    icon: DollarSign,
    badge: '3',
    gradient: 'from-green-500 to-lime-500'
  },
  {
    name: 'Reportes',
    href: '/dashboard/reports',
    icon: BarChart3,
    badge: null,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Calendario',
    href: '/dashboard/calendar',
    icon: Calendar,
    badge: null,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Comunicación',
    href: '/dashboard/communication',
    icon: Mail,
    badge: null,
    gradient: 'from-slate-500 to-gray-500',
    subItems: [
      { name: 'Email', href: '/dashboard/email', icon: Mail },
      { name: 'Llamadas', href: '/dashboard/calls', icon: Phone }
    ]
  },
  {
    name: 'Documentos',
    href: '/dashboard/documents',
    icon: FileText,
    badge: null,
    gradient: 'from-violet-500 to-purple-500'
  },
]

const bottomNavigation = [
  {
    name: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings,
    gradient: 'from-gray-500 to-slate-500'
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('flex h-full w-64 flex-col bg-gradient-to-b from-card/95 to-card border-r border-border/50 backdrop-blur-xl animate-slide-in-left', className)}>
      {/* Enhanced Logo Section */}
      <div className="flex h-16 items-center border-b border-border/50 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <Link href="/dashboard" className="flex items-center group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
              <Logo size="md" />
            </div>
          </div>
        </Link>
      </div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          
          return (
            <div key={item.name} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 group relative overflow-hidden transition-all duration-300 hover-lift',
                    isActive 
                      ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-lg shadow-primary/10' 
                      : 'hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:border-primary/20'
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-r-full animate-pulse" />
                  )}
                  
                  {/* Icon with gradient background on active */}
                  <div className={cn(
                    'relative p-1.5 rounded-md transition-all duration-300',
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                      : 'group-hover:bg-gradient-to-r group-hover:from-primary/10 group-hover:to-accent/10'
                  )}>
                    <Icon className={cn(
                      'h-4 w-4 transition-colors duration-300',
                      isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'
                    )} />
                  </div>
                  
                  <span className={cn(
                    'font-medium transition-colors duration-300',
                    isActive ? 'text-primary' : 'group-hover:text-primary'
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Badge */}
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        'ml-auto text-xs px-2 py-0.5 transition-all duration-300',
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  
                  {/* Sparkle effect for active item */}
                  {isActive && (
                    <Sparkles className="h-3 w-3 text-primary/60 animate-pulse ml-auto" />
                  )}
                </Button>
              </Link>
              
              {/* Sub-items */}
              {item.subItems && isActive && (
                <div className="ml-6 mt-1 space-y-1 animate-slide-up">
                  {item.subItems.map((subItem) => (
                    <Link key={subItem.name} href={subItem.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        <subItem.icon className="h-3 w-3" />
                        {subItem.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Enhanced Quick Actions */}
      <div className="px-3 py-3 border-t border-border/50">
        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
          <Zap className="h-4 w-4 mr-2" />
          Nuevo Lead
        </Button>
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="border-t border-border/50 px-3 py-3 bg-gradient-to-r from-muted/30 to-muted/50">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-3 group transition-all duration-300',
                  isActive 
                    ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary' 
                    : 'hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5'
                )}
              >
                <div className={cn(
                  'p-1.5 rounded-md transition-all duration-300',
                  isActive 
                    ? `bg-gradient-to-r ${item.gradient}` 
                    : 'group-hover:bg-gradient-to-r group-hover:from-primary/10 group-hover:to-accent/10'
                )}>
                  <Icon className={cn(
                    'h-4 w-4 transition-colors duration-300',
                    isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'
                  )} />
                </div>
                <span className={cn(
                  'font-medium transition-colors duration-300',
                  isActive ? 'text-primary' : 'group-hover:text-primary'
                )}>
                  {item.name}
                </span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}