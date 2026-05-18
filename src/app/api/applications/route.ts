import { prisma } from '@/lib/api/prisma';
import { NextRequest, NextResponse } from 'next/server';

// 获取应用列表 (支持分页和搜索)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const name = searchParams.get('name') || '';
    const sceneCategory = searchParams.get('sceneCategory');

    const skip = (page - 1) * pageSize;

    const whereCondition: any = {};
    if (name) {
      whereCondition.name = { contains: name }; // 模糊搜索
    }
    if (sceneCategory && sceneCategory !== '全部') {
      whereCondition.sceneCategory = sceneCategory;
    }

    const [total, applications] = await Promise.all([
      prisma.application.count({ where: whereCondition }),
      prisma.application.findMany({
        where: whereCondition,
        skip,
        take: pageSize,
        orderBy: [
          { sortOrder: 'asc' },
          { updatedAt: 'desc' }
        ],
      }),
    ]);

    return NextResponse.json({
      data: applications,
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error('Fetch applications error:', error);
    return NextResponse.json({ message: '获取应用列表失败' }, { status: 500 });
  }
}

// 创建应用
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 简单的校验
    if (!body.name || !body.type) {
      return NextResponse.json({ message: '缺少必要字段' }, { status: 400 });
    }

    const newApp = await prisma.application.create({
      data: {
        name: body.name,
        type: body.type,
        description: body.description || '',
        route: body.route || '',
        url: body.url,
        sceneCategory: body.sceneCategory || '其他',
        industryTag: body.industryTag || '通用',
        icon: body.icon || 'AppstoreOutlined',
        permissionKey: body.permissionKey,
        sortOrder: body.sortOrder || 0,
        needsAuth: body.needsAuth || false,
        isPublic: body.isPublic || false,
        username: body.username,
        password: body.password,
      },
    });

    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json({ message: '创建应用失败' }, { status: 500 });
  }
}
