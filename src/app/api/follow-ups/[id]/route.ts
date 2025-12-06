import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { followUps, leads, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const followUp = await db
      .select({
        followUp: followUps,
        lead: leads,
        assignedUser: users
      })
      .from(followUps)
      .leftJoin(leads, eq(followUps.leadId, leads.id))
      .leftJoin(users, eq(followUps.assignedTo, users.id))
      .where(eq(followUps.id, id))
      .limit(1);

    if (!followUp.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Follow-up not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: followUp[0]
    });
  } catch (error) {
    console.error('Error fetching follow-up:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error' }
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedFollowUp = await db
      .update(followUps)
      .set({
        ...body,
        updatedAt: new Date().toISOString()
      })
      .where(eq(followUps.id, id))
      .returning();

    if (!updatedFollowUp.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Follow-up not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedFollowUp[0]
    });
  } catch (error) {
    console.error('Error updating follow-up:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error' }
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const deletedFollowUp = await db
      .delete(followUps)
      .where(eq(followUps.id, id))
      .returning();

    if (!deletedFollowUp.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Follow-up not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { deleted: true, followUp: deletedFollowUp[0] }
    });
  } catch (error) {
    console.error('Error deleting follow-up:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error' }
    }, { status: 500 });
  }
}