"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PipelineStage, Company } from '@/lib/schema';
import { X, Save, Plus } from 'lucide-react';

interface NewLeadFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function NewLeadForm({ onClose, onSuccess }: NewLeadFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    probability: '50',
    expectedCloseDate: '',
    source: '',
    priority: 'medium',
    companyId: '',
    companyName: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    pipelineStageId: '',
  });

  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [createNewCompany, setCreateNewCompany] = useState(false);

  useEffect(() => {
    fetchStages();
    fetchCompanies();
  }, []);

  const fetchStages = async () => {
    try {
      const response = await fetch('/api/pipeline-stages');
      const data = await response.json();
      if (data.success) {
        setStages(data.data);
        // Set default stage
        const defaultStage = data.data.find((stage: PipelineStage) => stage.isDefault);
        if (defaultStage) {
          setFormData(prev => ({ ...prev, pipelineStageId: defaultStage.id }));
        }
      }
    } catch (error) {
      console.error('Error fetching stages:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      const data = await response.json();
      if (data.success) {
        setCompanies(data.data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let companyId = formData.companyId;

      // Create new company if needed
      if (createNewCompany && formData.companyName) {
        const companyResponse = await fetch('/api/companies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.companyName,
          }),
        });

        const companyData = await companyResponse.json();
        if (companyData.success) {
          companyId = companyData.data.id;
        }
      }

      // Create contact if provided
      let contactId = '';
      if (formData.contactFirstName && formData.contactLastName && formData.contactEmail) {
        const contactResponse = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyId,
            firstName: formData.contactFirstName,
            lastName: formData.contactLastName,
            email: formData.contactEmail,
            phone: formData.contactPhone,
            isPrimary: true,
          }),
        });

        const contactData = await contactResponse.json();
        if (contactData.success) {
          contactId = contactData.data.id;
        }
      }

      // Create lead
      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          value: formData.value ? parseFloat(formData.value) : null,
          probability: parseInt(formData.probability),
          expectedCloseDate: formData.expectedCloseDate || null,
          source: formData.source,
          priority: formData.priority,
          companyId,
          contactId: contactId || null,
          pipelineStageId: formData.pipelineStageId,
        }),
      });

      const leadData = await leadResponse.json();
      if (leadData.success) {
        onSuccess();
        onClose();
      } else {
        console.error('Error creating lead:', leadData.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Nuevo Lead</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lead Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Información del Lead</h3>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Título *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Ej: Desarrollo web para restaurante"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Descripción</label>
                <Input
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detalles del proyecto o oportunidad"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Valor (CRC)</label>
                  <Input
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    placeholder="500000"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Probabilidad (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.probability}
                    onChange={(e) => handleInputChange('probability', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Fecha esperada de cierre</label>
                  <Input
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={(e) => handleInputChange('expectedCloseDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Etapa del Pipeline *</label>
                  <Select
                    value={formData.pipelineStageId}
                    onValueChange={(value) => handleInputChange('pipelineStageId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar etapa" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: stage.color || '#3b82f6' }}
                            />
                            <span>{stage.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Fuente</label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => handleInputChange('source', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Sitio web</SelectItem>
                      <SelectItem value="referral">Referido</SelectItem>
                      <SelectItem value="cold_call">Llamada fría</SelectItem>
                      <SelectItem value="social_media">Redes sociales</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="event">Evento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Prioridad</label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange('priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Información de la Empresa</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCreateNewCompany(!createNewCompany)}
                >
                  {createNewCompany ? 'Seleccionar existente' : 'Crear nueva'}
                </Button>
              </div>

              {createNewCompany ? (
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre de la empresa *</label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Nombre de la nueva empresa"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium mb-2 block">Seleccionar empresa</label>
                  <Select
                    value={formData.companyId}
                    onValueChange={(value) => handleInputChange('companyId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empresa existente" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-semibold">Contacto Principal (Opcional)</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre</label>
                  <Input
                    value={formData.contactFirstName}
                    onChange={(e) => handleInputChange('contactFirstName', e.target.value)}
                    placeholder="Nombre"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Apellido</label>
                  <Input
                    value={formData.contactLastName}
                    onChange={(e) => handleInputChange('contactLastName', e.target.value)}
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contacto@empresa.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Teléfono</label>
                  <Input
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+506 8888-8888"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Crear Lead
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}