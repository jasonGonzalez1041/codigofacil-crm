import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { companies } from '@/lib/schema';
import { eq, desc, ilike } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
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

const createCompanySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(200),
  industry: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  employees: z.number().positive().optional(),
  revenue: z.number().positive().optional(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createCompanySchema.parse(body);
    
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
    } = validatedData;
    
    // Convert string inputs to proper types
    const employeesNum = employees ? parseInt(employees.toString(), 10) : undefined;
    const revenueNum = revenue ? parseFloat(revenue.toString()) : undefined;

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
      employees: employeesNum,
      revenue: revenueNum,
      notes,
    });

    const newCompany = await db
      .select()
      .from(companies)
      .where(eq(companies.id, companyId))
      .limit(1);

    return NextResponse.json({ success: true, data: newCompany[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation error',
          details: error.issues 
        },
        { status: 400 }
      );
    }
    
    console.error('Error creating company:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create company' },
      { status: 500 }
    );
  }
}