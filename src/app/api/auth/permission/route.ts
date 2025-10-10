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
  const permissions = await prisma.permission.findMany({
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });

  // 格式化数据，将角色信息展平
  const formattedPermissions = permissions.map((permission) => ({
    ...permission,
    roles: permission.roles.map((pr) => pr.role),
  }));

  return NextResponse.json(
    { permissions: formattedPermissions },
    { status: 200 }
  );
}

export async function PUT(req: NextRequest) {
  const { id, name, description } = await req.json();
  const permission = await prisma.permission.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });
  return NextResponse.json(
    { permission, message: '更新权限成功' },
    { status: 200 }
  );
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
