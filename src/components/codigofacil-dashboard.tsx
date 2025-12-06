"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building2, 
  Target,
  DollarSign,
  Calendar,
  Activity,
  Plus,
  ArrowRight
} from "lucide-react"
import { getDashboardMetrics } from "@/lib/api"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

interface DashboardMetrics {
  totalLeads: number
  totalCompanies: number
  activeLeads: number
  totalContacts: number
  conversionRate: number
  totalValue: number
  leads: any[]
  companies: any[]
  contacts: any[]
  followUps: any[]
}

export function CodigoFacilDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await getDashboardMetrics()
        setMetrics(data)
      } catch (error) {
        console.error('Error fetching metrics:', error)
        setError('Error cargando datos del dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchMetrics, 300000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16 mb-2"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-500">{error || 'Error cargando datos'}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0
    }).format(value)
  }

  const getRecentActivity = () => {
    const activities = []
    
    // Add recent leads
    if (metrics.leads && metrics.leads.length > 0) {
      activities.push({
        action: 'Lead creado',
        description: `"${metrics.leads[0]?.lead?.title || 'Nuevo lead'}" agregado al pipeline`,
        time: '15 min ago',
        type: 'success'
      })
    }
    
    // Add recent companies
    if (metrics.companies && metrics.companies.length > 0) {
      activities.push({
        action: 'Empresa registrada',
        description: `${metrics.companies[0]?.name || 'Nueva empresa'} agregada al sistema`,
        time: '1 hora ago',
        type: 'info'
      })
    }
    
    // Add recent contacts
    if (metrics.contacts && metrics.contacts.length > 0) {
      const contact = metrics.contacts[0]
      activities.push({
        action: 'Contacto actualizado',
        description: `${contact?.firstName || 'Contacto'} ${contact?.lastName || ''} actualizado`,
        time: '2 horas ago',
        type: 'warning'
      })
    }
    
    return activities.length > 0 ? activities : [
      { action: 'Sistema iniciado', description: 'CRM funcionando correctamente', time: 'ahora', type: 'success' }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard CodigoFacil</h2>
          <p className="text-sm text-gray-600">
            Sistema de gestión para CodigoFacil.com - Desarrollo Web en Costa Rica
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => window.open('/dashboard/leads', '_blank')}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Lead
          </Button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Proyectos Activos
            </CardTitle>
            <Target className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{metrics.totalLeads}</div>
            <p className="text-xs text-gray-500 mt-1">
              <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                {metrics.activeLeads} en desarrollo
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Clientes
            </CardTitle>
            <Building2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{metrics.totalCompanies}</div>
            <p className="text-xs text-gray-500 mt-1">
              Empresas atendidas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Contactos
            </CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{metrics.totalContacts}</div>
            <p className="text-xs text-gray-500 mt-1">
              Personas de contacto
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Valor Total
            </CardTitle>
            <DollarSign className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {formatCurrency(metrics.totalValue)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Pipeline de proyectos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Performance */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Proyectos Recientes</CardTitle>
            <CardDescription className="text-gray-600">
              Última actividad en CodigoFacil CRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getRecentActivity().map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-1 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Resumen</CardTitle>
            <CardDescription className="text-gray-600">
              Estado del negocio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tasa de Conversión</span>
              <span className="font-bold text-gray-900">{metrics.conversionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Seguimientos</span>
              <span className="font-bold text-gray-900">{metrics.followUps.length}</span>
            </div>
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500 mb-2">Estado del sistema</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Funcionando correctamente</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Acciones Rápidas</CardTitle>
            <CardDescription className="text-gray-600">
              Gestiona tu negocio desde CodigoFacil CRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => window.open('/dashboard/leads', '_blank')}
                className="flex items-center justify-start p-4 h-auto bg-blue-600 hover:bg-blue-700"
              >
                <Target className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Nuevo Proyecto</div>
                  <div className="text-xs opacity-90">Agregar lead al pipeline</div>
                </div>
              </Button>
              
              <Button 
                onClick={() => window.open('/dashboard/companies', '_blank')}
                variant="outline" 
                className="flex items-center justify-start p-4 h-auto border-green-200 hover:bg-green-50"
              >
                <Building2 className="mr-3 h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-green-700">Nuevo Cliente</div>
                  <div className="text-xs text-green-600">Registrar empresa</div>
                </div>
              </Button>
              
              <Button 
                onClick={() => window.open('/dashboard/follow-ups', '_blank')}
                variant="outline" 
                className="flex items-center justify-start p-4 h-auto border-orange-200 hover:bg-orange-50"
              >
                <Calendar className="mr-3 h-5 w-5 text-orange-600" />
                <div className="text-left">
                  <div className="font-medium text-orange-700">Seguimiento</div>
                  <div className="text-xs text-orange-600">Programar tarea</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">CodigoFacil.com</h3>
            <p className="text-sm text-gray-600">Desarrollo Web Profesional en Costa Rica</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">¿Necesitas ayuda?</p>
            <p className="text-sm text-gray-600">📱 +506 8646-2423</p>
          </div>
        </div>
      </div>
    </div>
  )
}