"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Filter,
  Users,
  Building2,
  Calendar,
  Loader2,
  RefreshCw,
  Eye,
  Edit,
  ArrowUpDown
} from 'lucide-react'

interface Lead {
  id: string
  title: string
  value: number | null
  status: string
  priority: string
  source: string | null
  createdAt: string
  company?: {
    name: string
    industry?: string
  } | null
  contact?: {
    firstName: string
    lastName: string
    email: string
  } | null
  stage?: {
    name: string
    color?: string
  } | null
}

type ViewMode = 'leads' | 'companies' | 'followups'

export function DataTableReal() {
  const [viewMode, setViewMode] = useState<ViewMode>('leads')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [viewMode])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      let endpoint = '/api/leads'
      if (viewMode === 'companies') endpoint = '/api/companies'
      if (viewMode === 'followups') endpoint = '/api/follow-ups'

      const response = await fetch(endpoint)
      if (!response.ok) throw new Error(`Failed to fetch ${viewMode}`)

      const result = await response.json()
      setData(result.data || [])

    } catch (err) {
      console.error(`Error fetching ${viewMode}:`, err)
      setError(`Error loading ${viewMode}`)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number | null) => {
    if (!value) return '-'
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return 'Fecha inválida'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-emerald-100 text-emerald-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredData = data.filter((item) => {
    const searchTerm = search.toLowerCase()
    
    if (viewMode === 'leads') {
      const lead = item.lead || item
      const companyName = item.company?.name || ''
      const contactName = item.contact ? 
        `${item.contact.firstName} ${item.contact.lastName}` : ''
      
      const matchesSearch = 
        lead.title?.toLowerCase().includes(searchTerm) ||
        companyName.toLowerCase().includes(searchTerm) ||
        contactName.toLowerCase().includes(searchTerm)
        
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
      
      return matchesSearch && matchesStatus
    }
    
    if (viewMode === 'companies') {
      const company = item
      const matchesSearch = 
        company.name?.toLowerCase().includes(searchTerm) ||
        company.industry?.toLowerCase().includes(searchTerm)
        
      return matchesSearch
    }
    
    if (viewMode === 'followups') {
      const followUp = item.followUp || item
      const leadTitle = item.lead?.title || ''
      
      const matchesSearch = 
        followUp.title?.toLowerCase().includes(searchTerm) ||
        leadTitle.toLowerCase().includes(searchTerm)
        
      const matchesStatus = statusFilter === 'all' || followUp.status === statusFilter
      
      return matchesSearch && matchesStatus
    }
    
    return true
  })

  const renderLeadsTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lead</TableHead>
          <TableHead>Empresa</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Prioridad</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((item, index) => {
          const lead = item.lead || item
          return (
            <TableRow key={lead.id || index}>
              <TableCell>
                <div className="font-medium">{lead.title}</div>
                <div className="text-sm text-muted-foreground">
                  {lead.source && `Fuente: ${lead.source}`}
                </div>
              </TableCell>
              <TableCell>
                {item.company ? (
                  <div>
                    <div className="font-medium">{item.company.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.company.industry}
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Sin empresa</span>
                )}
              </TableCell>
              <TableCell>
                {item.contact ? (
                  <div>
                    <div className="font-medium">
                      {item.contact.firstName} {item.contact.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.contact.email}
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Sin contacto</span>
                )}
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {formatCurrency(lead.value)}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(lead.priority)} variant="outline">
                  {lead.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(lead.createdAt)}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )

  const renderCompaniesTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Empresa</TableHead>
          <TableHead>Industria</TableHead>
          <TableHead>Ciudad</TableHead>
          <TableHead>Empleados</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((company, index) => (
          <TableRow key={company.id || index}>
            <TableCell>
              <div className="font-medium">{company.name}</div>
              <div className="text-sm text-muted-foreground">
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline">
                    {company.website}
                  </a>
                )}
              </div>
            </TableCell>
            <TableCell>{company.industry || '-'}</TableCell>
            <TableCell>{company.city || '-'}</TableCell>
            <TableCell>{company.employees || '-'}</TableCell>
            <TableCell>{formatCurrency(company.revenue)}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {formatDate(company.createdAt)}
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderFollowUpsTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seguimiento</TableHead>
          <TableHead>Lead</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Prioridad</TableHead>
          <TableHead>Vencimiento</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((item, index) => {
          const followUp = item.followUp || item
          return (
            <TableRow key={followUp.id || index}>
              <TableCell>
                <div className="font-medium">{followUp.title}</div>
                <div className="text-sm text-muted-foreground">
                  {followUp.description}
                </div>
              </TableCell>
              <TableCell>
                {item.lead ? (
                  <div className="font-medium">{item.lead.title}</div>
                ) : (
                  <span className="text-muted-foreground">Sin lead</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {followUp.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(followUp.status)}>
                  {followUp.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(followUp.priority)} variant="outline">
                  {followUp.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(followUp.dueDate)}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Datos en Tiempo Real
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Actualizar
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'leads' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('leads')}
            >
              <Users className="h-4 w-4 mr-1" />
              Leads
            </Button>
            <Button
              variant={viewMode === 'companies' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('companies')}
            >
              <Building2 className="h-4 w-4 mr-1" />
              Empresas
            </Button>
            <Button
              variant={viewMode === 'followups' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('followups')}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Follow-ups
            </Button>
          </div>
          
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            
            {(viewMode === 'leads' || viewMode === 'followups') && (
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Cargando {viewMode}...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-destructive mb-4">{error}</div>
            <Button onClick={fetchData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="h-8 w-8 mx-auto mb-4 opacity-50" />
            <p>No hay {viewMode} que mostrar</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {viewMode === 'leads' && renderLeadsTable()}
            {viewMode === 'companies' && renderCompaniesTable()}
            {viewMode === 'followups' && renderFollowUpsTable()}
          </div>
        )}
        
        {!loading && !error && filteredData.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Mostrando {filteredData.length} de {data.length} {viewMode}
          </div>
        )}
      </CardContent>
    </Card>
  )
}