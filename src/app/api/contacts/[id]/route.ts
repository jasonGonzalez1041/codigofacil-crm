import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contacts, companies } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const contact = await db
      .select({
        contact: contacts,
        company: companies
      })
      .from(contacts)
      .leftJoin(companies, eq(contacts.companyId, companies.id))
      .where(eq(contacts.id, id))
      .limit(1);

    if (!contact.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Contact not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: contact[0]
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
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

    const updatedContact = await db
      .update(contacts)
      .set({
        ...body,
        updatedAt: new Date().toISOString()
      })
      .where(eq(contacts.id, id))
      .returning();

    if (!updatedContact.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Contact not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedContact[0]
    });
  } catch (error) {
    console.error('Error updating contact:', error);
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

    const deletedContact = await db
      .delete(contacts)
      .where(eq(contacts.id, id))
      .returning();

    if (!deletedContact.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Contact not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { deleted: true, contact: deletedContact[0] }
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error' }
    }, { status: 500 });
  }
}