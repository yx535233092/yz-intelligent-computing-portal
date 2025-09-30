import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

// 创建用户
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ message: '创建信息不完整' }, { status: 400 });
    }
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    return NextResponse.json(
      {
        user: newUser,
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

// 获取用户
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error, message: '获取用户失败' },
      { status: 500 }
    );
  }
}

// 更新用户
// export async function PUT(req: NextRequest) {
//   try {
//     const { username, password } = await req.json();
//     const updatedUser = await prisma.user.update({
//       where: { username: username },
//       data: { username, password },
//     });
//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     console.error('更新用户错误:', error);
//     return NextResponse.json({ message: '更新用户失败' }, { status: 500 });
//   }
// }

// 删除用户
// export async function DELETE(req: NextRequest) {
//   try {
//     const { username } = await req.json();
//     await prisma.user.delete({
//       where: { username: username },
//     });
//     return NextResponse.json({ message: '删除用户成功' }, { status: 200 });
//   } catch (error) {
//     console.error('删除用户错误:', error);
//     return NextResponse.json({ message: '删除用户失败' }, { status: 500 });
//   }
// }
