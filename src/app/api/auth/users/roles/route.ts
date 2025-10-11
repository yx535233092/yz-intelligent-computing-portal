import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

// 为用户分配角色
export async function POST(req: NextRequest) {
  try {
    const { userId, roleIds } = await req.json();

    if (!userId || !Array.isArray(roleIds)) {
      return NextResponse.json(
        { message: '参数不完整或格式错误' },
        { status: 400 }
      );
    }

    // 检查用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ message: '用户不存在' }, { status: 404 });
    }

    // 检查所有角色是否存在
    const roles = await prisma.role.findMany({
      where: { id: { in: roleIds } },
    });
    if (roles.length !== roleIds.length) {
      return NextResponse.json({ message: '部分角色不存在' }, { status: 400 });
    }

    // 删除用户现有的所有角色
    await prisma.userRole.deleteMany({
      where: { userId },
    });

    // 添加新的角色
    if (roleIds.length > 0) {
      await prisma.userRole.createMany({
        data: roleIds.map((roleId: number) => ({
          userId,
          roleId,
        })),
      });
    }

    return NextResponse.json({ message: '角色分配成功' }, { status: 200 });
  } catch (error) {
    console.error('分配角色失败:', error);
    return NextResponse.json(
      { error, message: '分配角色失败' },
      { status: 500 }
    );
  }
}

// 获取用户的角色列表
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userIdStr = searchParams.get('userId');

    if (!userIdStr) {
      return NextResponse.json({ message: '缺少用户ID' }, { status: 400 });
    }

    const userId = parseInt(userIdStr, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ message: '用户ID格式错误' }, { status: 400 });
    }

    const userRoles = await prisma.userRole.findMany({
      where: { userId },
      include: {
        role: true,
      },
    });

    const roles = userRoles.map((ur) => ur.role);

    return NextResponse.json({ roles }, { status: 200 });
  } catch (error) {
    console.error('获取用户角色失败:', error);
    return NextResponse.json(
      { error, message: '获取用户角色失败' },
      { status: 500 }
    );
  }
}
