import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contacts, companies } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db
      .select({
        contact: contacts,
        company: companies,
      })
      .from(contacts)
      .leftJoin(companies, eq(contacts.companyId, companies.id))
      .orderBy(desc(contacts.createdAt))
      .limit(limit)
      .offset(offset);

    if (companyId) {
      query = query.where(eq(contacts.companyId, companyId));
    }

    const result = await query;
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyId,
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      isPrimary,
      notes,
    } = body;

    const contactId = nanoid();

    await db.insert(contacts).values({
      id: contactId,
      companyId,
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      isPrimary: isPrimary || false,
      notes,
    });

    const newContact = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, contactId))
      .limit(1);

    return NextResponse.json({ success: true, data: newContact[0] });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}