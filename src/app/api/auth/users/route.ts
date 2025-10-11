import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import bcrypt from 'bcryptjs';

// 创建用户
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ message: '创建信息不完整' }, { status: 400 });
    }

    // 检查用户名是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return NextResponse.json({ message: '用户名已存在' }, { status: 400 });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    // 不返回密码字段
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: '创建用户成功',
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error, message: '创建用户失败' },
      { status: 500 }
    );
  }
}

// 获取用户列表
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 转换数据格式，便于前端使用，同时移除密码字段
    const formattedUsers = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        roles: user.roles.map((ur) => ur.role),
      };
    });

    return NextResponse.json({ users: formattedUsers }, { status: 200 });
  } catch (error) {
    console.error('获取用户失败:', error);
    return NextResponse.json(
      { error, message: '获取用户失败' },
      { status: 500 }
    );
  }
}

// 更新用户
export async function PUT(req: NextRequest) {
  try {
    const { id, username, password, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ message: '缺少用户ID' }, { status: 400 });
    }

    // 检查用户是否存在
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json({ message: '用户不存在' }, { status: 404 });
    }

    // 如果更新用户名，检查新用户名是否已被其他用户使用
    if (username && username !== existingUser.username) {
      const userWithSameName = await prisma.user.findUnique({
        where: { username },
      });
      if (userWithSameName) {
        return NextResponse.json(
          { message: '用户名已被使用' },
          { status: 400 }
        );
      }
    }

    // 构建更新数据
    const updateData: {
      username?: string;
      password?: string;
      isActive?: boolean;
    } = {};
    if (username) updateData.username = username;
    // 如果提供了新密码，进行加密
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (typeof isActive === 'boolean') updateData.isActive = isActive;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    // 不返回密码字段
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = updatedUser;
    const formattedUser = {
      ...userWithoutPassword,
      roles: updatedUser.roles.map((ur) => ur.role),
    };

    return NextResponse.json(
      {
        user: formattedUser,
        message: '更新用户成功',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('更新用户错误:', error);
    return NextResponse.json({ message: '更新用户失败' }, { status: 500 });
  }
}

// 删除用户
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: '缺少用户ID' }, { status: 400 });
    }

    // 检查用户是否存在
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json({ message: '用户不存在' }, { status: 404 });
    }

    // 先删除用户角色关联
    await prisma.userRole.deleteMany({
      where: { userId: id },
    });

    // 删除用户
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: '删除用户成功' }, { status: 200 });
  } catch (error) {
    console.error('删除用户错误:', error);
    return NextResponse.json({ message: '删除用户失败' }, { status: 500 });
  }
}
