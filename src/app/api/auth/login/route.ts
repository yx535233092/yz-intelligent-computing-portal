import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/api/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: '用户名或密码错误' },
        { status: 401 }
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
