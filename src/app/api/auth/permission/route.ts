import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  const permission = await prisma.permission.create({
    data: {
      name,
      description,
    },
  });
  return NextResponse.json(
    { permission, message: '创建权限成功' },
    { status: 200 }
  );
}

export async function GET() {
  const permissions = await prisma.permission.findMany();
  return NextResponse.json({ permissions }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const permission = await prisma.permission.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(
    { permission, message: '删除权限成功' },
    { status: 200 }
  );
}
