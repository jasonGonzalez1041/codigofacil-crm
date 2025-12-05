"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Lead, PipelineStage } from '@/lib/schema';
import { NewLeadForm } from '@/components/forms/new-lead-form';

interface LeadWithRelations extends Lead {
  company?: any;
  contact?: any;
  stage?: PipelineStage;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);

  useEffect(() => {
    fetchLeads();
    fetchStages();
  }, [selectedStage]);

  const fetchLeads = async () => {
    try {
      const url = selectedStage 
        ? `/api/leads?stage=${selectedStage}`
        : '/api/leads';
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStages = async () => {
    try {
      const response = await fetch('/api/pipeline-stages');
      const data = await response.json();
      if (data.success) {
        setStages(data.data);
      }
    } catch (error) {
      console.error('Error fetching stages:', error);
    }
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
    }).format(value);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando leads...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Gestiona tus oportunidades de venta y pipeline
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm" onClick={() => setShowNewLeadForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>
      </div>

      {/* Pipeline Stages Filter */}
      <div className="flex space-x-2 overflow-x-auto">
        <Button
          variant={selectedStage === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedStage(null)}
        >
          Todos ({leads.length})
        </Button>
        {stages.map((stage) => (
          <Button
            key={stage.id}
            variant={selectedStage === stage.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStage(stage.id)}
            style={{
              backgroundColor: selectedStage === stage.id ? stage.color : undefined,
            }}
          >
            {stage.name}
          </Button>
        ))}
      </div>

      {/* Leads Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((item) => (
          <Card key={item.lead.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{item.lead.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {item.company?.name || 'Sin empresa'}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Valor</span>
                <span className="font-bold">{formatCurrency(item.lead.value)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Probabilidad</span>
                <span className="text-sm">{item.lead.probability}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Contacto</span>
                <span className="text-sm">
                  {item.contact ? `${item.contact.firstName} ${item.contact.lastName}` : 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Etapa</span>
                <Badge 
                  variant="secondary"
                  style={{
                    backgroundColor: item.stage?.color + '20',
                    color: item.stage?.color,
                  }}
                >
                  {item.stage?.name || 'Sin etapa'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Prioridad</span>
                <Badge className={getPriorityColor(item.lead.priority)}>
                  {item.lead.priority}
                </Badge>
              </div>

              {item.lead.expectedCloseDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cierre esperado</span>
                  <span className="text-sm">
                    {new Date(item.lead.expectedCloseDate).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Creado: {new Date(item.lead.createdAt).toLocaleDateString('es-ES')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leads.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No hay leads disponibles
            </p>
            <Button onClick={() => setShowNewLeadForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear primer lead
            </Button>
          </CardContent>
        </Card>
      )}

      {/* New Lead Form Modal */}
      {showNewLeadForm && (
        <NewLeadForm
          onClose={() => setShowNewLeadForm(false)}
          onSuccess={() => {
            fetchLeads();
            setShowNewLeadForm(false);
          }}
        />
      )}
    </div>
  );
}