"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Clock, Phone, Mail, Video, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { FollowUp } from '@/lib/schema';

interface FollowUpWithRelations {
  followUp: FollowUp;
  lead?: any;
  user?: any;
}

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<FollowUpWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue' | 'completed'>('all');

  useEffect(() => {
    fetchFollowUps();
  }, [filter]);

  const fetchFollowUps = async () => {
    try {
      let url = '/api/follow-ups';
      
      if (filter === 'pending') {
        url += '?status=pending';
      } else if (filter === 'completed') {
        url += '?status=completed';
      } else if (filter === 'overdue') {
        url += '?overdue=true';
      }

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setFollowUps(data.data);
      }
    } catch (error) {
      console.error('Error fetching follow-ups:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (followUpId: string) => {
    try {
      // TODO: Implement mark as completed API
      console.log('Marking follow-up as completed:', followUpId);
      await fetchFollowUps();
    } catch (error) {
      console.error('Error marking follow-up as completed:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Video className="h-4 w-4" />;
      case 'demo': return <FileText className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string, dueDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    const isOverdue = status === 'pending' && dueDate < today;
    
    if (isOverdue) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOverdue = (status: string, dueDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    return status === 'pending' && dueDate < today;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateOnly = date.toDateString();
    const todayOnly = today.toDateString();
    const tomorrowOnly = tomorrow.toDateString();
    
    if (dateOnly === todayOnly) {
      return 'Hoy';
    } else if (dateOnly === tomorrowOnly) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES');
    }
  };

  const pendingCount = followUps.filter(item => item.followUp.status === 'pending').length;
  const overdueCount = followUps.filter(item => 
    item.followUp.status === 'pending' && 
    item.followUp.dueDate < new Date().toISOString().split('T')[0]
  ).length;
  const completedCount = followUps.filter(item => item.followUp.status === 'completed').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando seguimientos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seguimientos</h1>
          <p className="text-muted-foreground">
            Gestiona tus tareas de seguimiento y actividades pendientes
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Seguimiento
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{followUps.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        <Button
          variant={filter === 'all' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todos ({followUps.length})
        </Button>
        <Button
          variant={filter === 'pending' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pendientes ({pendingCount})
        </Button>
        <Button
          variant={filter === 'overdue' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('overdue')}
          className={overdueCount > 0 ? "border-red-200 text-red-800" : ""}
        >
          Vencidos ({overdueCount})
        </Button>
        <Button
          variant={filter === 'completed' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completados ({completedCount})
        </Button>
      </div>

      {/* Follow-ups List */}
      <div className="space-y-4">
        {followUps.map((item) => (
          <Card 
            key={item.followUp.id} 
            className={`hover:shadow-md transition-shadow ${
              isOverdue(item.followUp.status, item.followUp.dueDate) ? 'border-red-200' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-full ${
                      isOverdue(item.followUp.status, item.followUp.dueDate) ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {getTypeIcon(item.followUp.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{item.followUp.title}</h3>
                      {isOverdue(item.followUp.status, item.followUp.dueDate) && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    
                    {item.followUp.description && (
                      <p className="text-muted-foreground">{item.followUp.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(item.followUp.dueDate)}</span>
                      </div>
                      
                      {item.lead && (
                        <div className="flex items-center space-x-1">
                          <span>Lead:</span>
                          <span className="font-medium">{item.lead.title}</span>
                        </div>
                      )}
                      
                      {item.user && (
                        <div className="flex items-center space-x-1">
                          <span>Asignado a:</span>
                          <span className="font-medium">{item.user.name}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(item.followUp.priority)}>
                        {item.followUp.priority}
                      </Badge>
                      <Badge className={getStatusColor(item.followUp.status, item.followUp.dueDate)}>
                        {isOverdue(item.followUp.status, item.followUp.dueDate) ? 'Vencido' : item.followUp.status}
                      </Badge>
                      <Badge variant="outline">
                        {item.followUp.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {item.followUp.status === 'pending' && (
                    <Button 
                      size="sm"
                      onClick={() => markAsCompleted(item.followUp.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completar
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {followUps.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No hay seguimientos {filter !== 'all' ? filter : 'disponibles'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Crear primer seguimiento
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}