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
  ArrowDownRight
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
  },
  {
    title: 'Leads Activos',
    value: '67',
    change: '+8%',
    changeType: 'increase' as const,
    icon: UserPlus,
    description: 'este mes',
  },
  {
    title: 'Ventas del Mes',
    value: formatCurrency(2840000),
    change: '+23%',
    changeType: 'increase' as const,
    icon: DollarSign,
    description: 'vs mes anterior',
  },
  {
    title: 'Tasa Conversión',
    value: '24.5%',
    change: '-3%',
    changeType: 'decrease' as const,
    icon: TrendingUp,
    description: 'leads a clientes',
  },
  {
    title: 'Reuniones Programadas',
    value: '12',
    change: '+4',
    changeType: 'increase' as const,
    icon: Calendar,
    description: 'esta semana',
  },
  {
    title: 'Clientes Activos',
    value: '189',
    change: '+5%',
    changeType: 'increase' as const,
    icon: Users,
    description: 'últimos 30 días',
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <Badge
                  variant={stat.changeType === 'increase' ? 'success' : 'destructive'}
                  className="ml-2 flex items-center gap-1"
                >
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}