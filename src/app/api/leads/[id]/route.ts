import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, companies, contacts, pipelineStages, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const lead = await db
      .select({
        lead: leads,
        company: companies,
        contact: contacts,
        stage: pipelineStages,
        assignedUser: users
      })
      .from(leads)
      .leftJoin(companies, eq(leads.companyId, companies.id))
      .leftJoin(contacts, eq(leads.contactId, contacts.id))
      .leftJoin(pipelineStages, eq(leads.pipelineStageId, pipelineStages.id))
      .leftJoin(users, eq(leads.assignedTo, users.id))
      .where(eq(leads.id, id))
      .limit(1);

    if (!lead.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lead not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: lead[0]
    });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error' }
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const updatedLead = await db
      .update(leads)
      .set({
        ...body,
        updatedAt: new Date().toISOString()
      })
      .where(eq(leads.id, id))
      .returning();

    if (!updatedLead.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lead not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedLead[0]
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error' }
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deletedLead = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();

    if (!deletedLead.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lead not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { deleted: true, lead: deletedLead[0] }
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error' }
    }, { status: 500 });
  }
}