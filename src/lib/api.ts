// API utility functions for frontend data fetching

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost:3002';
    
  const response = await fetch(`${baseUrl}${endpoint}`);
  const result: ApiResponse<T> = await response.json();
  
  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'API request failed');
  }
  
  return result.data;
}

// Dashboard metrics
export async function getDashboardMetrics() {
  const [companies, leads, contacts, followUps] = await Promise.all([
    fetchApi<any[]>('/api/companies'),
    fetchApi<any[]>('/api/leads'), 
    fetchApi<any[]>('/api/contacts'),
    fetchApi<any[]>('/api/follow-ups')
  ]);

  // Calculate metrics
  const activeLeads = leads.filter(lead => lead.lead.status === 'active');
  const wonLeads = leads.filter(lead => lead.lead.status === 'won');
  const totalValue = leads.reduce((sum, lead) => sum + (lead.lead.value || 0), 0);
  const conversionRate = leads.length > 0 ? (wonLeads.length / leads.length) * 100 : 0;

  return {
    totalCompanies: companies.length,
    totalLeads: leads.length,
    activeLeads: activeLeads.length,
    totalContacts: contacts.length,
    totalValue,
    conversionRate: Math.round(conversionRate),
    leads,
    companies,
    contacts,
    followUps
  };
}