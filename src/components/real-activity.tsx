"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { 
  Building2, 
  UserPlus, 
  Calendar, 
  CheckCircle,
  AlertTriangle,
  Loader2,
  RefreshCw
} from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'lead' | 'company' | 'follow-up'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'warning'
  entityName?: string
}

export function RealActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRealActivity()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchRealActivity, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchRealActivity = async () => {
    try {
      // Fetch recent data from all endpoints
      const [leadsRes, companiesRes, followUpsRes] = await Promise.all([
        fetch('/api/leads?limit=10'),
        fetch('/api/companies?limit=5'),
        fetch('/api/follow-ups?limit=10')
      ])

      if (!leadsRes.ok || !companiesRes.ok || !followUpsRes.ok) {
        throw new Error('Failed to fetch activity data')
      }

      const [leadsData, companiesData, followUpsData] = await Promise.all([
        leadsRes.json(),
        companiesRes.json(),
        followUpsRes.json()
      ])

      const recentActivities: ActivityItem[] = []

      // Process leads
      const leadsArray = Array.isArray(leadsData.data) ? leadsData.data : []
      leadsArray.slice(0, 5).forEach((item: any) => {
        const lead = item.lead
        if (lead) {
          recentActivities.push({
            id: `lead-${lead.id}`,
            type: 'lead',
            title: lead.title,
            description: `Lead creado - Valor: ${lead.value ? `₡${lead.value.toLocaleString()}` : 'Sin valor'}`,
            timestamp: lead.createdAt,
            status: lead.status === 'active' ? 'success' : 'pending',
            entityName: item.company?.name
          })
        }
      })

      // Process companies  
      const companiesArray = Array.isArray(companiesData.data) ? companiesData.data : []
      companiesArray.slice(0, 3).forEach((company: any) => {
        recentActivities.push({
          id: `company-${company.id}`,
          type: 'company',
          title: `Nueva empresa: ${company.name}`,
          description: `${company.industry || 'Industria no especificada'} - ${company.city || 'Ubicación no especificada'}`,
          timestamp: company.createdAt,
          status: 'success',
          entityName: company.name
        })
      })

      // Process follow-ups
      const followUpsArray = Array.isArray(followUpsData.data) ? followUpsData.data : []
      followUpsArray.slice(0, 5).forEach((item: any) => {
        const followUp = item.followUp
        if (followUp) {
          recentActivities.push({
            id: `followup-${followUp.id}`,
            type: 'follow-up',
            title: followUp.title,
            description: `${followUp.type} - ${followUp.status === 'pending' ? 'Pendiente' : 'Completado'}`,
            timestamp: followUp.createdAt,
            status: followUp.status === 'completed' ? 'success' : 
                   followUp.status === 'pending' ? 'pending' : 'warning',
            entityName: item.lead?.title
          })
        }
      })

      // Sort by timestamp (most recent first)
      recentActivities.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )

      setActivities(recentActivities.slice(0, 10))
      setError(null)

    } catch (err) {
      console.error('Error fetching real activity:', err)
      setError('Error loading recent activity')
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead': return 'LD'
      case 'company': return 'EM'
      case 'follow-up': return 'SG'
      default: return 'AC'
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100'
      case 'pending':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100'
    }
  }

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'success': return 'default'
      case 'warning': return 'destructive'
      case 'pending': return 'secondary'
      default: return 'outline'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true, 
        locale: es 
      })
    } catch {
      return 'Fecha inválida'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Cargando actividad reciente...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start space-x-3 animate-pulse">
              <div className="h-8 w-8 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">
            Error en Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={fetchRealActivity}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <RefreshCw className="h-4 w-4" />
            Reintentar
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Actividad Reciente
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {activities.length} eventos
            </Badge>
            <button 
              onClick={fetchRealActivity}
              className="p-1 hover:bg-muted rounded-sm transition-colors"
              title="Actualizar"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No hay actividad reciente</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`text-xs ${getActivityColor(activity.status)}`}>
                  {getActivityIcon(activity.type)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <Badge 
                    variant={getBadgeVariant(activity.status)} 
                    className="text-xs"
                  >
                    {activity.status === 'success' ? 'Completado' : 
                     activity.status === 'warning' ? 'Atención' : 'Pendiente'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                {activity.entityName && (
                  <p className="text-xs text-muted-foreground">
                    📋 {activity.entityName}
                  </p>
                )}
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{formatTimeAgo(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          ))
        )}
        
        {activities.length > 0 && (
          <div className="pt-2 border-t">
            <button className="text-sm text-primary hover:underline w-full text-left">
              Ver toda la actividad →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}