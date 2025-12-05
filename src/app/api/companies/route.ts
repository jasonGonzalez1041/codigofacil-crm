import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { companies } from '@/lib/schema';
import { eq, desc, ilike } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const result = await db
      .select()
      .from(companies)
      .where(search ? ilike(companies.name, `%${search}%`) : undefined)
      .orderBy(desc(companies.createdAt))
      .limit(limit)
      .offset(offset);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      industry,
      website,
      phone,
      address,
      city,
      country,
      employees,
      revenue,
      notes,
    } = body;

    const companyId = nanoid();

    await db.insert(companies).values({
      id: companyId,
      name,
      industry,
      website,
      phone,
      address,
      city,
      country: country || 'Costa Rica',
      employees,
      revenue: revenue ? parseFloat(revenue) : null,
      notes,
    });

    const newCompany = await db
      .select()
      .from(companies)
      .where(eq(companies.id, companyId))
      .limit(1);

    return NextResponse.json({ success: true, data: newCompany[0] });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create company' },
      { status: 500 }
    );
  }
}