"use client"

import React, { useState, useEffect } from 'react'
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
  Loader2
} from 'lucide-react'

interface DashboardMetrics {
  totalCompanies: number
  activeLeads: number
  totalRevenue: number
  conversionRate: number
  pendingFollowUps: number
  completedThisMonth: number
}

export function DashboardMetricsReal() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRealMetrics()
  }, [])

  const fetchRealMetrics = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [companiesRes, leadsRes, followUpsRes] = await Promise.all([
        fetch('/api/companies'),
        fetch('/api/leads'),
        fetch('/api/follow-ups')
      ])

      if (!companiesRes.ok || !leadsRes.ok || !followUpsRes.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const [companiesData, leadsData, followUpsData] = await Promise.all([
        companiesRes.json(),
        leadsRes.json(),
        followUpsRes.json()
      ])

      // Calculate real metrics
      const companies = companiesData.data || []
      const leads = leadsData.data || []
      const followUps = followUpsData.data || []

      const totalRevenue = leads.reduce((sum: number, item: any) => {
        return sum + (item.lead?.value || 0)
      }, 0)

      const activeLeads = leads.filter((item: any) => 
        item.lead?.status === 'active'
      ).length

      const pendingFollowUps = followUps.filter((item: any) => 
        item.followUp?.status === 'pending'
      ).length

      const completedFollowUps = followUps.filter((item: any) => 
        item.followUp?.status === 'completed'
      ).length

      const conversionRate = activeLeads > 0 ? 
        (companies.length / activeLeads) * 100 : 0

      setMetrics({
        totalCompanies: companies.length,
        activeLeads,
        totalRevenue,
        conversionRate: Number(conversionRate.toFixed(1)),
        pendingFollowUps,
        completedThisMonth: completedFollowUps
      })

    } catch (err) {
      console.error('Error fetching dashboard metrics:', err)
      setError('Error loading dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-8 w-8 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <p>{error || 'Failed to load metrics'}</p>
            <button 
              onClick={fetchRealMetrics}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const statsData = [
    {
      title: 'Total Empresas',
      value: metrics.totalCompanies.toString(),
      icon: Building2,
      description: 'Empresas registradas',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Leads Activos',
      value: metrics.activeLeads.toString(),
      icon: UserPlus,
      description: 'En pipeline',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Revenue Potencial',
      value: formatCurrency(metrics.totalRevenue),
      icon: DollarSign,
      description: 'Valor total pipeline',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      featured: true
    },
    {
      title: 'Tasa Conversión',
      value: `${metrics.conversionRate}%`,
      icon: TrendingUp,
      description: 'Leads → Empresas',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Follow-ups Pendientes',
      value: metrics.pendingFollowUps.toString(),
      icon: Calendar,
      description: 'Requieren atención',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'Completados',
      value: metrics.completedThisMonth.toString(),
      icon: Users,
      description: 'Este período',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsData.map((stat, index) => {
        const Icon = stat.icon
        
        return (
          <Card 
            key={index} 
            className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 ${
              stat.featured ? 'ring-2 ring-primary/20 shadow-lg' : ''
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              
              {/* Real-time indicator */}
              <div className="mt-2 flex items-center gap-1">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600">En vivo</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}