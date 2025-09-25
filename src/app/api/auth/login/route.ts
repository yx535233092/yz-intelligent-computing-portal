import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

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
      return NextResponse.json({ message: '用户不存在' }, { status: 401 });
    }
    // 生成token
    const token = jwt.sign({ userId: user.id }, 'secret');

    return NextResponse.json({ token, message: '登录成功' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '登录失败' }, { status: 500 });
  }
}
