import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardStats } from '@/components/dashboard-stats'
import { RecentActivity } from '@/components/recent-activity'
import { Button } from '@/components/ui/button'
import { Plus, Download, Filter } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de tu actividad comercial y métricas clave
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions & Upcoming */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Cliente
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Crear Lead
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Programar Reunión
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </CardContent>
          </Card>

          {/* Próximas Tareas */}
          <Card>
            <CardHeader>
              <CardTitle>Próximas Tareas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Llamada con TechCorp</p>
                  <span className="text-xs text-muted-foreground">2:30 PM</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Seguimiento de propuesta de desarrollo web
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Enviar cotización</p>
                  <span className="text-xs text-muted-foreground">Mañana</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Hotel Vista Mar - Sistema de reservas
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Reunión equipo</p>
                  <span className="text-xs text-muted-foreground">Viernes</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Review mensual de ventas y objetivos
                </p>
              </div>

              <Button variant="link" className="w-full p-0 text-sm">
                Ver todas las tareas →
              </Button>
            </CardContent>
          </Card>

          {/* Stats Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Esta Semana</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Leads nuevos</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reuniones</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Propuestas</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ventas cerradas</span>
                <span className="font-semibold text-green-600">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}