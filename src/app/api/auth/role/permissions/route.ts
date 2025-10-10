import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

// 为角色分配权限
export async function POST(req: NextRequest) {
  const { roleId, permissionIds } = await req.json();

  try {
    // 先删除该角色的所有权限
    await prisma.rolePermission.deleteMany({
      where: {
        roleId,
      },
    });

    // 再添加新的权限
    if (permissionIds && permissionIds.length > 0) {
      await prisma.rolePermission.createMany({
        data: permissionIds.map((permissionId: number) => ({
          roleId,
          permissionId,
        })),
      });
    }

    return NextResponse.json({ message: '权限分配成功' }, { status: 200 });
  } catch (error) {
    console.error('分配权限失败:', error);
    return NextResponse.json({ message: '权限分配失败' }, { status: 500 });
  }
}

// 获取角色的权限列表
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roleId = searchParams.get('roleId');

  if (!roleId) {
    return NextResponse.json({ message: '缺少角色ID' }, { status: 400 });
  }

  const rolePermissions = await prisma.rolePermission.findMany({
    where: {
      roleId: parseInt(roleId),
    },
    include: {
      permission: true,
    },
  });

  const permissions = rolePermissions.map((rp) => rp.permission);

  return NextResponse.json({ permissions }, { status: 200 });
}
