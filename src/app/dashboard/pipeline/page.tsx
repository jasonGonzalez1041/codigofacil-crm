"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, DollarSign, TrendingUp } from 'lucide-react';
import { PipelineStage } from '@/lib/schema';

interface LeadWithRelations {
  lead: any;
  company?: any;
  contact?: any;
  stage?: PipelineStage;
}

export default function PipelinePage() {
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [leadsByStage, setLeadsByStage] = useState<Record<string, LeadWithRelations[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStages();
    fetchLeads();
  }, []);

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

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      if (data.success) {
        // Group leads by stage
        const grouped = data.data.reduce((acc: Record<string, LeadWithRelations[]>, item: LeadWithRelations) => {
          const stageId = item.lead.pipelineStageId || 'unassigned';
          if (!acc[stageId]) {
            acc[stageId] = [];
          }
          acc[stageId].push(item);
          return acc;
        }, {});
        setLeadsByStage(grouped);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const calculateStageValue = (stageId: string) => {
    const leads = leadsByStage[stageId] || [];
    return leads.reduce((total, item) => total + (item.lead.value || 0), 0);
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    
    // TODO: Implement stage update API call
    console.log(`Moving lead ${leadId} to stage ${stageId}`);
    
    // For now, refresh the data
    await fetchLeads();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando pipeline...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground">
            Vista kanban de tus oportunidades de venta
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Lead
        </Button>
      </div>

      {/* Pipeline Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                Object.values(leadsByStage)
                  .flat()
                  .reduce((total, item) => total + (item.lead.value || 0), 0)
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(leadsByStage).flat().length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Promedio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                Object.values(leadsByStage).flat().length > 0
                  ? Object.values(leadsByStage)
                      .flat()
                      .reduce((total, item) => total + (item.lead.value || 0), 0) /
                    Object.values(leadsByStage).flat().length
                  : 0
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa Conversión</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* TODO: Calculate conversion rate */}
              85%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Columns */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="min-w-[300px] flex-shrink-0"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <Card className="h-full">
              <CardHeader 
                className="pb-3"
                style={{ borderLeft: `4px solid ${stage.color}` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {leadsByStage[stage.id]?.length || 0} leads
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {formatCurrency(calculateStageValue(stage.id))}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                {(leadsByStage[stage.id] || []).map((item) => (
                  <Card
                    key={item.lead.id}
                    className="p-3 cursor-move hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.lead.id)}
                  >
                    <div className="space-y-2">
                      <div className="font-medium text-sm">{item.lead.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.company?.name || 'Sin empresa'}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">
                          {formatCurrency(item.lead.value)}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={
                            item.lead.priority === 'high' 
                              ? 'border-red-200 text-red-800'
                              : item.lead.priority === 'medium'
                              ? 'border-yellow-200 text-yellow-800'
                              : 'border-green-200 text-green-800'
                          }
                        >
                          {item.lead.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.contact 
                          ? `${item.contact.firstName} ${item.contact.lastName}`
                          : 'Sin contacto'
                        }
                      </div>
                    </div>
                  </Card>
                ))}
                
                {(!leadsByStage[stage.id] || leadsByStage[stage.id].length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No hay leads en esta etapa</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar lead
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}