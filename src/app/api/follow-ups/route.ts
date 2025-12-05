import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { followUps, leads, users } from '@/lib/schema';
import { eq, desc, and, lte, gte } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const leadId = searchParams.get('leadId');
    const assignedTo = searchParams.get('assignedTo');
    const overdue = searchParams.get('overdue');

    let conditions = [];

    if (status) {
      conditions.push(eq(followUps.status, status));
    }

    if (leadId) {
      conditions.push(eq(followUps.leadId, leadId));
    }

    if (assignedTo) {
      conditions.push(eq(followUps.assignedTo, assignedTo));
    }

    if (overdue === 'true') {
      const today = new Date().toISOString().split('T')[0];
      conditions.push(
        and(
          lte(followUps.dueDate, today),
          eq(followUps.status, 'pending')
        )
      );
    }

    const result = await db
      .select({
        followUp: followUps,
        lead: leads,
        user: users,
      })
      .from(followUps)
      .leftJoin(leads, eq(followUps.leadId, leads.id))
      .leftJoin(users, eq(followUps.assignedTo, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(followUps.dueDate));

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching follow-ups:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch follow-ups' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      leadId,
      assignedTo,
      title,
      description,
      dueDate,
      priority,
      type,
    } = body;

    const followUpId = nanoid();

    await db.insert(followUps).values({
      id: followUpId,
      leadId,
      assignedTo,
      title,
      description,
      dueDate,
      priority: priority || 'medium',
      type,
      status: 'pending',
    });

    // Fetch the created follow-up with related data
    const newFollowUp = await db
      .select({
        followUp: followUps,
        lead: leads,
        user: users,
      })
      .from(followUps)
      .leftJoin(leads, eq(followUps.leadId, leads.id))
      .leftJoin(users, eq(followUps.assignedTo, users.id))
      .where(eq(followUps.id, followUpId))
      .limit(1);

    return NextResponse.json({ success: true, data: newFollowUp[0] });
  } catch (error) {
    console.error('Error creating follow-up:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create follow-up' },
      { status: 500 }
    );
  }
}