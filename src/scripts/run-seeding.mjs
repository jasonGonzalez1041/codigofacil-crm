#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Now import the modules
const { db } = await import('../lib/db.js');
const schema = await import('../lib/schema.js');
const { nanoid } = await import('nanoid');

const { companies, contacts, leads, pipelineStages, followUps, users } = schema;

console.log('🌱 Starting database seeding...\n');

async function seedDatabase() {
  try {
    // 1. Create Pipeline Stages
    console.log('📊 Creating pipeline stages...');
    const stageData = [
      { id: nanoid(), name: 'Lead', description: 'Initial contact or inquiry', order: 1, color: '#3b82f6' },
      { id: nanoid(), name: 'Qualified', description: 'Lead has been qualified', order: 2, color: '#8b5cf6' },
      { id: nanoid(), name: 'Proposal', description: 'Proposal sent to client', order: 3, color: '#f59e0b' },
      { id: nanoid(), name: 'Negotiation', description: 'In negotiation phase', order: 4, color: '#ef4444' },
      { id: nanoid(), name: 'Closed Won', description: 'Deal successfully closed', order: 5, color: '#10b981' },
      { id: nanoid(), name: 'Closed Lost', description: 'Deal lost or cancelled', order: 6, color: '#6b7280' }
    ];

    for (const stage of stageData) {
      await db.insert(pipelineStages).values(stage).onConflictDoNothing();
    }
    console.log('✅ Pipeline stages created');

    // 2. Create Users
    console.log('👥 Creating users...');
    const userData = [
      { 
        id: nanoid(), 
        email: 'admin@codigofacil.com', 
        name: 'Admin CodigoFacil', 
        role: 'admin' 
      },
      { 
        id: nanoid(), 
        email: 'manager@codigofacil.com', 
        name: 'Manager CodigoFacil', 
        role: 'manager' 
      }
    ];

    for (const user of userData) {
      await db.insert(users).values(user).onConflictDoNothing();
    }
    console.log('✅ Users created');

    // 3. Create Companies
    console.log('🏢 Creating companies...');
    const companyData = [
      {
        id: nanoid(),
        name: 'TechCorp Costa Rica',
        industry: 'Technology',
        website: 'https://techcorp.cr',
        phone: '+506 2222-3333',
        city: 'San José',
        country: 'Costa Rica',
        employees: 50,
        revenue: 1000000
      },
      {
        id: nanoid(),
        name: 'EcoSolutions',
        industry: 'Environmental',
        website: 'https://ecosolutions.co.cr',
        phone: '+506 2444-5555',
        city: 'Cartago',
        country: 'Costa Rica',
        employees: 25,
        revenue: 500000
      },
      {
        id: nanoid(),
        name: 'Digital Marketing Plus',
        industry: 'Marketing',
        website: 'https://dmplus.com',
        phone: '+506 2666-7777',
        city: 'Heredia',
        country: 'Costa Rica',
        employees: 15,
        revenue: 300000
      }
    ];

    const insertedCompanies = [];
    for (const company of companyData) {
      const result = await db.insert(companies).values(company).returning();
      insertedCompanies.push(result[0]);
    }
    console.log('✅ Companies created');

    // 4. Create Contacts
    console.log('👤 Creating contacts...');
    const contactData = [
      {
        id: nanoid(),
        companyId: insertedCompanies[0].id,
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        email: 'carlos@techcorp.cr',
        phone: '+506 8888-9999',
        position: 'CEO',
        isPrimary: true
      },
      {
        id: nanoid(),
        companyId: insertedCompanies[1].id,
        firstName: 'Ana',
        lastName: 'Martinez',
        email: 'ana@ecosolutions.co.cr',
        phone: '+506 7777-6666',
        position: 'Directora General',
        isPrimary: true
      },
      {
        id: nanoid(),
        companyId: insertedCompanies[2].id,
        firstName: 'Miguel',
        lastName: 'Hernandez',
        email: 'miguel@dmplus.com',
        phone: '+506 5555-4444',
        position: 'Marketing Manager',
        isPrimary: true
      }
    ];

    const insertedContacts = [];
    for (const contact of contactData) {
      const result = await db.insert(contacts).values(contact).returning();
      insertedContacts.push(result[0]);
    }
    console.log('✅ Contacts created');

    // 5. Create Leads
    console.log('🎯 Creating leads...');
    const leadData = [
      {
        id: nanoid(),
        companyId: insertedCompanies[0].id,
        contactId: insertedContacts[0].id,
        pipelineStageId: stageData[1].id, // Qualified
        title: 'Sistema CRM Personalizado',
        description: 'TechCorp necesita un CRM personalizado para gestionar sus clientes',
        value: 15000000, // 15,000,000 colones
        probability: 75,
        source: 'website',
        priority: 'high'
      },
      {
        id: nanoid(),
        companyId: insertedCompanies[1].id,
        contactId: insertedContacts[1].id,
        pipelineStageId: stageData[2].id, // Proposal
        title: 'Plataforma Web Sostenible',
        description: 'EcoSolutions quiere una web que refleje sus valores ambientales',
        value: 8000000,
        probability: 60,
        source: 'referral',
        priority: 'medium'
      },
      {
        id: nanoid(),
        companyId: insertedCompanies[2].id,
        contactId: insertedContacts[2].id,
        pipelineStageId: stageData[0].id, // Lead
        title: 'Dashboard de Analytics',
        description: 'Dashboard para análisis de campañas de marketing digital',
        value: 5000000,
        probability: 30,
        source: 'social',
        priority: 'medium'
      }
    ];

    const insertedLeads = [];
    for (const lead of leadData) {
      const result = await db.insert(leads).values(lead).returning();
      insertedLeads.push(result[0]);
    }
    console.log('✅ Leads created');

    // 6. Create Follow-ups
    console.log('📅 Creating follow-ups...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const followUpData = [
      {
        id: nanoid(),
        leadId: insertedLeads[0].id,
        title: 'Llamada de seguimiento - TechCorp',
        description: 'Revisar propuesta y resolver dudas técnicas',
        dueDate: tomorrow.toISOString(),
        priority: 'high',
        type: 'call'
      },
      {
        id: nanoid(),
        leadId: insertedLeads[1].id,
        title: 'Reunión presencial - EcoSolutions',
        description: 'Presentar mockups y discutir funcionalidades',
        dueDate: nextWeek.toISOString(),
        priority: 'medium',
        type: 'meeting'
      },
      {
        id: nanoid(),
        leadId: insertedLeads[2].id,
        title: 'Enviar información adicional',
        description: 'Mandar ejemplos de dashboards anteriores',
        dueDate: tomorrow.toISOString(),
        priority: 'low',
        type: 'email'
      }
    ];

    for (const followUp of followUpData) {
      await db.insert(followUps).values(followUp).onConflictDoNothing();
    }
    console.log('✅ Follow-ups created');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • ${stageData.length} pipeline stages`);
    console.log(`   • ${userData.length} users`);
    console.log(`   • ${companyData.length} companies`);
    console.log(`   • ${contactData.length} contacts`);
    console.log(`   • ${leadData.length} leads`);
    console.log(`   • ${followUpData.length} follow-ups`);
    
    return true;
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Run the seeding
seedDatabase()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });