#!/usr/bin/env node
import { db } from '../lib/db';
import { companies, contacts, leads, followUps, pipelineStages } from '../lib/schema';
import { nanoid } from 'nanoid';

async function createSampleData() {
  console.log('🌱 Creating sample data...');

  try {
    // Get pipeline stages
    const stages = await db.select().from(pipelineStages);
    const leadStage = stages.find(s => s.name === 'Lead');
    const qualifiedStage = stages.find(s => s.name === 'Qualified');
    const proposalStage = stages.find(s => s.name === 'Proposal');

    // Create sample companies
    const sampleCompanies = [
      {
        id: nanoid(),
        name: 'TechCorp Solutions',
        industry: 'Technology',
        website: 'https://techcorp.cr',
        phone: '+506 2222-3333',
        city: 'San José',
        country: 'Costa Rica',
        employees: 50,
        revenue: 5000000,
      },
      {
        id: nanoid(),
        name: 'Hotel Vista Mar',
        industry: 'Tourism',
        website: 'https://hotelvistamar.cr',
        phone: '+506 2777-8888',
        city: 'Guanacaste',
        country: 'Costa Rica',
        employees: 25,
        revenue: 2000000,
      },
      {
        id: nanoid(),
        name: 'Café Central',
        industry: 'Food & Beverage',
        phone: '+506 2555-6666',
        city: 'Cartago',
        country: 'Costa Rica',
        employees: 15,
        revenue: 800000,
      },
    ];

    for (const company of sampleCompanies) {
      await db.insert(companies).values(company);
    }

    // Create sample contacts
    const sampleContacts = [
      {
        id: nanoid(),
        companyId: sampleCompanies[0].id,
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        email: 'carlos.rodriguez@techcorp.cr',
        phone: '+506 8888-9999',
        position: 'CTO',
        department: 'Technology',
        isPrimary: true,
      },
      {
        id: nanoid(),
        companyId: sampleCompanies[1].id,
        firstName: 'Maria',
        lastName: 'Gonzalez',
        email: 'maria@hotelvistamar.cr',
        phone: '+506 7777-5555',
        position: 'Gerente General',
        department: 'Management',
        isPrimary: true,
      },
      {
        id: nanoid(),
        companyId: sampleCompanies[2].id,
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'juan@cafecentral.cr',
        phone: '+506 6666-4444',
        position: 'Propietario',
        department: 'Management',
        isPrimary: true,
      },
    ];

    for (const contact of sampleContacts) {
      await db.insert(contacts).values(contact);
    }

    // Create sample leads
    const sampleLeads = [
      {
        id: nanoid(),
        companyId: sampleCompanies[0].id,
        contactId: sampleContacts[0].id,
        pipelineStageId: proposalStage?.id,
        title: 'Sistema ERP personalizado',
        description: 'Desarrollo de sistema ERP para gestión de inventarios y facturación',
        value: 15000000,
        probability: 75,
        expectedCloseDate: '2025-01-15',
        source: 'referral',
        priority: 'high',
        status: 'active',
      },
      {
        id: nanoid(),
        companyId: sampleCompanies[1].id,
        contactId: sampleContacts[1].id,
        pipelineStageId: qualifiedStage?.id,
        title: 'Sistema de reservas online',
        description: 'Plataforma web para gestión de reservas y pagos en línea',
        value: 8500000,
        probability: 60,
        expectedCloseDate: '2025-02-28',
        source: 'website',
        priority: 'high',
        status: 'active',
      },
      {
        id: nanoid(),
        companyId: sampleCompanies[2].id,
        contactId: sampleContacts[2].id,
        pipelineStageId: leadStage?.id,
        title: 'App móvil para pedidos',
        description: 'Aplicación móvil para pedidos a domicilio y recogida',
        value: 4200000,
        probability: 30,
        expectedCloseDate: '2025-03-30',
        source: 'cold_call',
        priority: 'medium',
        status: 'active',
      },
      {
        id: nanoid(),
        companyId: sampleCompanies[0].id,
        contactId: sampleContacts[0].id,
        pipelineStageId: leadStage?.id,
        title: 'Sitio web corporativo',
        description: 'Rediseño completo del sitio web con enfoque moderno',
        value: 2800000,
        probability: 50,
        expectedCloseDate: '2025-02-15',
        source: 'social_media',
        priority: 'medium',
        status: 'active',
      },
    ];

    for (const lead of sampleLeads) {
      await db.insert(leads).values(lead);
    }

    // Create sample follow-ups
    const sampleFollowUps = [
      {
        id: nanoid(),
        leadId: sampleLeads[0].id,
        title: 'Llamada de seguimiento - Propuesta ERP',
        description: 'Revisar dudas sobre la propuesta técnica y cronograma',
        dueDate: '2025-12-06',
        priority: 'high',
        type: 'call',
        status: 'pending',
      },
      {
        id: nanoid(),
        leadId: sampleLeads[1].id,
        title: 'Demo del sistema de reservas',
        description: 'Presentar demo en vivo de la plataforma de reservas',
        dueDate: '2025-12-08',
        priority: 'high',
        type: 'demo',
        status: 'pending',
      },
      {
        id: nanoid(),
        leadId: sampleLeads[2].id,
        title: 'Enviar propuesta inicial',
        description: 'Preparar y enviar propuesta detallada para app móvil',
        dueDate: '2025-12-10',
        priority: 'medium',
        type: 'email',
        status: 'pending',
      },
      {
        id: nanoid(),
        leadId: sampleLeads[0].id,
        title: 'Reunión con equipo técnico',
        description: 'Reunión para alinear requerimientos técnicos específicos',
        dueDate: '2025-12-04',
        priority: 'high',
        type: 'meeting',
        status: 'overdue',
      },
    ];

    for (const followUp of sampleFollowUps) {
      await db.insert(followUps).values(followUp);
    }

    console.log('✅ Sample data created successfully!');
    console.log(`📊 Created:`);
    console.log(`   • ${sampleCompanies.length} companies`);
    console.log(`   • ${sampleContacts.length} contacts`);
    console.log(`   • ${sampleLeads.length} leads`);
    console.log(`   • ${sampleFollowUps.length} follow-ups`);

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
    throw error;
  }
}

// Run the script
createSampleData()
  .then(() => {
    console.log('🎉 Sample data creation completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Sample data creation failed:', error);
    process.exit(1);
  });