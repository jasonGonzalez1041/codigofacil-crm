import { db } from './db';
import { pipelineStages, users } from './schema';
import { nanoid } from 'nanoid';

export async function seedDatabase() {
  console.log('🌱 Seeding database...');

  // Seed default pipeline stages
  const stages = [
    { name: 'Lead', description: 'Initial contact made', order: 1, color: '#6b7280' },
    { name: 'Qualified', description: 'Lead has been qualified', order: 2, color: '#3b82f6' },
    { name: 'Proposal', description: 'Proposal sent to client', order: 3, color: '#f59e0b' },
    { name: 'Negotiation', description: 'In negotiation phase', order: 4, color: '#ef4444' },
    { name: 'Closed Won', description: 'Deal successfully closed', order: 5, color: '#10b981' },
    { name: 'Closed Lost', description: 'Deal was lost', order: 6, color: '#6b7280' },
  ];

  for (const stage of stages) {
    await db.insert(pipelineStages).values({
      id: nanoid(),
      ...stage,
      isDefault: stage.name === 'Lead',
    }).onConflictDoNothing();
  }

  // Seed default admin user
  await db.insert(users).values({
    id: nanoid(),
    email: 'admin@codigofacil.com',
    name: 'Admin CodigoFacil',
    role: 'admin',
  }).onConflictDoNothing();

  console.log('✅ Database seeded successfully!');
}