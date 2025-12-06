import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { companies } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const company = await db
      .select()
      .from(companies)
      .where(eq(companies.id, id))
      .limit(1);

    if (!company.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Company not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: company[0]
    });
  } catch (error) {
    console.error('Error fetching company:', error);
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

    const updatedCompany = await db
      .update(companies)
      .set({
        ...body,
        updatedAt: new Date().toISOString()
      })
      .where(eq(companies.id, id))
      .returning();

    if (!updatedCompany.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Company not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedCompany[0]
    });
  } catch (error) {
    console.error('Error updating company:', error);
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

    const deletedCompany = await db
      .delete(companies)
      .where(eq(companies.id, id))
      .returning();

    if (!deletedCompany.length) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Company not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { deleted: true, company: deletedCompany[0] }
    });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error' }
    }, { status: 500 });
  }
}