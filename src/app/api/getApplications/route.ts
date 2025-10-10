import { prisma } from '@/lib/api/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const applications = await prisma.application.findMany();
  return NextResponse.json({ applications }, { status: 200 });
}
