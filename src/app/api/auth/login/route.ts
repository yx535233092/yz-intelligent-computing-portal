import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/api/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // 1. 从本地数据库查找用户
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 2. 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: '用户名或密码错误' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: '账号已被禁用' },
        { status: 403 }
      );
    }

    // 3. 生成 JWT Token
    // 获取角色名称列表
    const roles = user.roles.map(ur => ur.role.name);
    const roleId = user.roles.length > 0 ? user.roles[0].roleId : null;
    
    const token = await signToken({
      userId: user.id,
      username: user.username,
      roles: roles,
      roleId: roleId
    });

    // 4. 适配前端需要的 userInfo 格式
    const userInfo = {
      id: user.id,
      username: user.username,
      isActive: user.isActive,
      roleId: roleId,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { token, userInfo, message: '登录成功' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: '登录服务内部错误' },
      { status: 500 }
    );
  }
}
