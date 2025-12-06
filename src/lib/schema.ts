import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable, real } from 'drizzle-orm/sqlite-core';

// Companies table
export const companies = sqliteTable('companies', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  industry: text('industry'),
  website: text('website'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  country: text('country').default('Costa Rica'),
  employees: integer('employees'),
  revenue: real('revenue'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Contacts table
export const contacts = sqliteTable('contacts', {
  id: text('id').primaryKey(),
  companyId: text('company_id').references(() => companies.id),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  position: text('position'),
  department: text('department'),
  isPrimary: integer('is_primary', { mode: 'boolean' }).default(false),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Pipeline stages
export const pipelineStages = sqliteTable('pipeline_stages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  order: integer('order').notNull(),
  color: text('color').default('#3b82f6'),
  isDefault: integer('is_default', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Leads table
export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  companyId: text('company_id').references(() => companies.id),
  contactId: text('contact_id').references(() => contacts.id),
  pipelineStageId: text('pipeline_stage_id').references(() => pipelineStages.id),
  title: text('title').notNull(),
  description: text('description'),
  value: real('value'),
  probability: integer('probability').default(50), // 0-100
  expectedCloseDate: text('expected_close_date'),
  source: text('source'), // website, referral, cold_call, etc.
  status: text('status').notNull().default('active'), // active, won, lost, archived
  priority: text('priority').default('medium'), // low, medium, high
  tags: text('tags'), // JSON array of strings
  customFields: text('custom_fields'), // JSON object for additional fields
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Follow-ups table
export const followUps = sqliteTable('follow_ups', {
  id: text('id').primaryKey(),
  leadId: text('lead_id').references(() => leads.id),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: text('due_date').notNull(),
  priority: text('priority').default('medium'), // low, medium, high
  status: text('status').default('pending'), // pending, completed, overdue, cancelled
  type: text('type').notNull(), // call, email, meeting, demo, proposal
  completedAt: text('completed_at'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Type exports
export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type PipelineStage = typeof pipelineStages.$inferSelect;
export type NewPipelineStage = typeof pipelineStages.$inferInsert;
export type FollowUp = typeof followUps.$inferSelect;
export type NewFollowUp = typeof followUps.$inferInsert;