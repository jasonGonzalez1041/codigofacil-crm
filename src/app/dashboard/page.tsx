import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardStats } from '@/components/dashboard-stats'
import { RecentActivity } from '@/components/recent-activity'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Download, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Calendar,
  Users,
  Building2,
  Target,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 animate-pulse-glow">
              <Sparkles className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Resumen de tu actividad comercial y métricas clave en tiempo real
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hover-lift bg-gradient-to-r from-muted/50 to-muted/30">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="hover-lift bg-gradient-to-r from-muted/50 to-muted/30">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activity - Enhanced */}
        <div className="lg:col-span-2 space-y-6">
          <RecentActivity />
          
          {/* Additional Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover-lift bg-gradient-to-br from-green-50 to-emerald-50 dark:from-card dark:to-card/90 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pipeline Value</p>
                    <p className="text-2xl font-bold text-green-600">$48,500</p>
                  </div>
                  <div className="p-3 bg-green-500 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-card dark:to-card/90 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                    <p className="text-2xl font-bold text-blue-600">78%</p>
                  </div>
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Enhanced Quick Actions */}
          <Card className="hover-lift bg-gradient-to-br from-card to-muted/20 border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start hover-lift bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-card dark:to-card/80 hover:from-blue-100 hover:to-cyan-100 border-blue-200 dark:border-border">
                <Building2 className="h-4 w-4 mr-3 text-blue-500" />
                Agregar Cliente
              </Button>
              <Button variant="outline" className="w-full justify-start hover-lift bg-gradient-to-r from-green-50 to-emerald-50 dark:from-card dark:to-card/80 hover:from-green-100 hover:to-emerald-100 border-green-200 dark:border-border">
                <Plus className="h-4 w-4 mr-3 text-green-500" />
                Crear Lead
              </Button>
              <Button variant="outline" className="w-full justify-start hover-lift bg-gradient-to-r from-purple-50 to-violet-50 dark:from-card dark:to-card/80 hover:from-purple-100 hover:to-violet-100 border-purple-200 dark:border-border">
                <Calendar className="h-4 w-4 mr-3 text-purple-500" />
                Programar Reunión
              </Button>
              <Button variant="outline" className="w-full justify-start hover-lift bg-gradient-to-r from-orange-50 to-red-50 dark:from-card dark:to-card/80 hover:from-orange-100 hover:to-red-100 border-orange-200 dark:border-border">
                <Download className="h-4 w-4 mr-3 text-orange-500" />
                Generar Reporte
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Próximas Tareas */}
          <Card className="hover-lift bg-gradient-to-br from-card to-muted/20 border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Próximas Tareas
                <Badge variant="secondary" className="ml-auto">3</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-sm font-medium">Llamada con TechCorp</p>
                  </div>
                  <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">2:30 PM</Badge>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Seguimiento de propuesta de desarrollo web
                </p>
              </div>
              
              <div className="space-y-3 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <p className="text-sm font-medium">Enviar cotización</p>
                  </div>
                  <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-300">Mañana</Badge>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Hotel Vista Mar - Sistema de reservas
                </p>
              </div>

              <div className="space-y-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <p className="text-sm font-medium">Reunión equipo</p>
                  </div>
                  <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-300">Viernes</Badge>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Review mensual de ventas y objetivos
                </p>
              </div>

              <Button variant="ghost" className="w-full text-sm justify-between group hover:bg-primary/5">
                Ver todas las tareas
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Weekly Stats */}
          <Card className="hover-lift bg-gradient-to-br from-card to-muted/20 border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Esta Semana
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Leads nuevos
                </span>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">12</Badge>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Reuniones
                </span>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">8</Badge>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Propuestas
                </span>
                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">5</Badge>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  Ventas cerradas
                </span>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">3</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}