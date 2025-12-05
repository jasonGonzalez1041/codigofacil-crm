import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { pipelineStages } from '@/lib/schema';
import { asc, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET() {
  try {
    const stages = await db
      .select()
      .from(pipelineStages)
      .orderBy(asc(pipelineStages.order));

    return NextResponse.json({ success: true, data: stages });
  } catch (error) {
    console.error('Error fetching pipeline stages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pipeline stages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color, order } = body;

    const stageId = nanoid();

    await db.insert(pipelineStages).values({
      id: stageId,
      name,
      description,
      color: color || '#3b82f6',
      order,
    });

    const newStage = await db
      .select()
      .from(pipelineStages)
      .where(eq(pipelineStages.id, stageId))
      .limit(1);

    return NextResponse.json({ success: true, data: newStage[0] });
  } catch (error) {
    console.error('Error creating pipeline stage:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create pipeline stage' },
      { status: 500 }
    );
  }
}