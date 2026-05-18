import { prisma } from '@/lib/api/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 获取详情
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const appId = parseInt(id);

    const app = await prisma.application.findUnique({
      where: { id: appId },
    });

    if (!app) {
      return NextResponse.json({ message: '应用不存在' }, { status: 404 });
    }

    return NextResponse.json(app);
  } catch (error) {
    return NextResponse.json({ message: '获取应用详情失败' }, { status: 500 });
  }
}

// 更新应用
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const appId = parseInt(id);
    const body = await req.json();

    // 移除不应更新的字段 (如 id, createdAt)
    const { id: _, createdAt, updatedAt, ...updateData } = body;

    const updatedApp = await prisma.application.update({
      where: { id: appId },
      data: updateData,
    });

    return NextResponse.json(updatedApp);
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json({ message: '更新应用失败' }, { status: 500 });
  }
}

// 删除应用
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const appId = parseInt(id);

    await prisma.application.delete({
      where: { id: appId },
    });

    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('Delete application error:', error);
    return NextResponse.json({ message: '删除应用失败' }, { status: 500 });
  }
}
