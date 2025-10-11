import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  const role = await prisma.role.create({
    data: {
      name,
      description,
    },
  });
  return NextResponse.json({ role, message: '创建角色成功' }, { status: 200 });
}

export async function GET() {
  const roles = await prisma.role.findMany({
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  // 格式化数据，将权限信息展平
  const formattedRoles = roles.map((role) => ({
    ...role,
    permissions: role.permissions.map((rp) => rp.permission),
  }));

  return NextResponse.json({ roles: formattedRoles }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, name, description } = await req.json();
  const role = await prisma.role.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });
  return NextResponse.json({ role, message: '更新角色成功' }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const role = await prisma.role.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ role, message: '删除角色成功' }, { status: 200 });
}
