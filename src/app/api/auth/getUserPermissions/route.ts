import { prisma } from '@/lib/api/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1] || '';
  const decoded = jwt.verify(token, 'secret');
  // 获取用户id
  const { userId } = decoded as { userId: number };
  // 获取用户角色
  const userRole = await prisma.userRole.findMany({
    where: {
      userId,
    },
  });
  // 获取角色id
  const roleIds = userRole.map((role) => role.roleId);
  // 获取角色权限id数组
  const rolePermissions = await prisma.rolePermission.findMany({
    where: {
      roleId: {
        in: roleIds,
      },
    },
  });
  // 获取权限
  const permissions = await prisma.permission.findMany({
    where: {
      id: {
        in: rolePermissions.map((permission) => permission.permissionId),
      },
    },
  });
  const permissionNames = permissions.map((permission) => permission.name);

  return NextResponse.json({
    data: {
      permissions: permissionNames,
    },
  });
}
