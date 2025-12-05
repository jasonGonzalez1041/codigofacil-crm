import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, companies, contacts, pipelineStages } from '@/lib/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const result = await db
      .select({
        lead: leads,
        company: companies,
        contact: contacts,
        stage: pipelineStages,
      })
      .from(leads)
      .leftJoin(companies, eq(leads.companyId, companies.id))
      .leftJoin(contacts, eq(leads.contactId, contacts.id))
      .leftJoin(pipelineStages, eq(leads.pipelineStageId, pipelineStages.id))
      .where(stage ? eq(leads.pipelineStageId, stage) : undefined)
      .orderBy(desc(leads.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      value,
      probability,
      expectedCloseDate,
      source,
      priority,
      companyId,
      contactId,
      pipelineStageId,
      assignedTo,
    } = body;

    const leadId = nanoid();

    await db.insert(leads).values({
      id: leadId,
      title,
      description,
      value: value ? parseFloat(value) : null,
      probability: probability || 50,
      expectedCloseDate,
      source,
      priority: priority || 'medium',
      companyId,
      contactId,
      pipelineStageId,
      assignedTo,
      status: 'active',
    });

    // Fetch the created lead with related data
    const newLead = await db
      .select({
        lead: leads,
        company: companies,
        contact: contacts,
        stage: pipelineStages,
      })
      .from(leads)
      .leftJoin(companies, eq(leads.companyId, companies.id))
      .leftJoin(contacts, eq(leads.contactId, contacts.id))
      .leftJoin(pipelineStages, eq(leads.pipelineStageId, pipelineStages.id))
      .where(eq(leads.id, leadId))
      .limit(1);

    return NextResponse.json({ success: true, data: newLead[0] });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}