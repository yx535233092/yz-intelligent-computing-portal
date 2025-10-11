import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/api/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // 查找用户
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 检查用户是否被禁用
    if (!user.isActive) {
      return NextResponse.json(
        { message: '该账号已被禁用，请联系管理员' },
        { status: 403 }
      );
    }

    // 生成token
    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '24h' });
    const { password: _, ...userInfo } = user;
    return NextResponse.json(
      { token, userInfo, message: '登录成功' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, message: '登录失败' }, { status: 500 });
  }
}
