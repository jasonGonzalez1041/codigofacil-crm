import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  UserPlus, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const stats = [
  {
    title: 'Total Clientes',
    value: '234',
    change: '+12%',
    changeType: 'increase' as const,
    icon: Building2,
    description: 'vs mes anterior',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    title: 'Leads Activos',
    value: '67',
    change: '+8%',
    changeType: 'increase' as const,
    icon: UserPlus,
    description: 'este mes',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
  },
  {
    title: 'Ventas del Mes',
    value: formatCurrency(2840000),
    change: '+23%',
    changeType: 'increase' as const,
    icon: DollarSign,
    description: 'vs mes anterior',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
    featured: true,
  },
  {
    title: 'Tasa Conversión',
    value: '24.5%',
    change: '-3%',
    changeType: 'decrease' as const,
    icon: TrendingUp,
    description: 'leads a clientes',
    gradient: 'from-purple-500 to-violet-500',
    bgGradient: 'from-purple-50 to-violet-50',
  },
  {
    title: 'Reuniones Programadas',
    value: '12',
    change: '+4',
    changeType: 'increase' as const,
    icon: Calendar,
    description: 'esta semana',
    gradient: 'from-rose-500 to-pink-500',
    bgGradient: 'from-rose-50 to-pink-50',
  },
  {
    title: 'Clientes Activos',
    value: '189',
    change: '+5%',
    changeType: 'increase' as const,
    icon: Users,
    description: 'últimos 30 días',
    gradient: 'from-indigo-500 to-blue-500',
    bgGradient: 'from-indigo-50 to-blue-50',
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const isPositive = stat.changeType === 'increase'
        
        return (
          <Card 
            key={index} 
            className={`group relative overflow-hidden hover-lift bg-gradient-to-br ${stat.bgGradient} dark:from-card dark:to-card/90 border-border/50 hover:border-primary/30 transition-all duration-500 animate-scale-in ${stat.featured ? 'ring-2 ring-primary/20 shadow-xl shadow-primary/10' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            
            {/* Featured indicator */}
            {stat.featured && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-white text-xs font-medium">
                  <Zap className="h-3 w-3" />
                  Top
                </div>
              </div>
            )}
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {stat.title}
              </CardTitle>
              <div className={`p-2.5 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant={isPositive ? "default" : "destructive"}
                      className={`flex items-center gap-1 px-2 py-1 font-medium transition-all duration-300 ${
                        isPositive 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {stat.change}
                    </Badge>
                    {stat.featured && (
                      <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 flex items-center gap-1">
                  <span className="w-2 h-2 bg-current rounded-full opacity-50" />
                  {stat.description}
                </p>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: isPositive ? '75%' : '45%',
                    animationDelay: `${index * 200 + 500}ms`
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}