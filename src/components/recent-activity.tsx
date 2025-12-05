import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'

const activities = [
  {
    id: 1,
    type: 'client',
    title: 'Nuevo cliente registrado',
    description: 'TechSolutions Inc se registró como cliente',
    user: 'Sistema',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    status: 'success' as const,
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Reunión completada',
    description: 'Presentación de propuesta con Café Central',
    user: 'María García',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
    status: 'success' as const,
  },
  {
    id: 3,
    type: 'lead',
    title: 'Nuevo lead calificado',
    description: 'Distribuidora Norte - Interesado en e-commerce',
    user: 'Carlos Rodríguez',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
    status: 'warning' as const,
  },
  {
    id: 4,
    type: 'sale',
    title: 'Venta cerrada',
    description: '₡850,000 - Desarrollo web completo',
    user: 'Ana López',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 horas atrás
    status: 'success' as const,
  },
  {
    id: 5,
    type: 'follow-up',
    title: 'Seguimiento pendiente',
    description: 'Contactar a Hotel Vista Mar sobre propuesta',
    user: 'Juan Pérez',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 horas atrás
    status: 'destructive' as const,
  },
]

const getActivityIcon = (type: string) => {
  const initials: { [key: string]: string } = {
    client: 'CL',
    meeting: 'ME',
    lead: 'LD',
    sale: 'VE',
    'follow-up': 'SG',
  }
  return initials[type] || 'AC'
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Actividad Reciente
          <Badge variant="outline" className="ml-2">
            {activities.length} eventos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback 
                className={`text-xs ${
                  activity.status === 'success' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' 
                    : activity.status === 'warning'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100'
                    : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'
                }`}
              >
                {getActivityIcon(activity.type)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <Badge 
                  variant={activity.status} 
                  className="text-xs"
                >
                  {activity.status === 'success' ? 'Completado' : 
                   activity.status === 'warning' ? 'En progreso' : 'Pendiente'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{activity.user}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="pt-2">
          <button className="text-sm text-primary hover:underline">
            Ver toda la actividad →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}