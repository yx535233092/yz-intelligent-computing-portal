import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import { verifyToken } from '@/lib/api/auth';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: '未授权' }, { status: 401 });
  }

  try {
    // 1. 验证 Token
    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ message: '无效的 Token' }, { status: 401 });
    }

    const userId = payload.userId as number;

    // 2. 从本地数据库获取用户及其角色和权限
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ message: '用户不存在' }, { status: 404 });
    }

    // 3. 提取权限和角色名称
    const roleNames: string[] = [];
    const permissionNamesSet = new Set<string>();

    user.roles.forEach((ur) => {
      roleNames.push(ur.role.name);
      ur.role.permissions.forEach((rp) => {
        permissionNamesSet.add(rp.permission.name);
      });
    });

    return NextResponse.json({
      data: {
        permissions: Array.from(permissionNamesSet),
        roles: roleNames,
      },
    });

  } catch (error) {
    console.error('Permission fetch error:', error);
    return NextResponse.json(
      { message: '服务内部错误' },
      { status: 500 }
    );
  }
}
