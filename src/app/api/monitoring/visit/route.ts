import { prisma } from '@/lib/api/prisma';
import { NextRequest, NextResponse } from 'next/server';

// 上报访问记录
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, duration, username, userId } = body;

    const log = await prisma.visitLog.create({
      data: {
        path,
        duration: Math.round(duration),
        username: username || '游客',
        userId: userId ? parseInt(userId) : null,
        ip: req.headers.get('x-forwarded-for') || 'unknown',
        userAgent: req.headers.get('user-agent'),
      },
    });

    return NextResponse.json({ success: true, id: log.id });
  } catch (error) {
    console.error('Save visit log error:', error);
    return NextResponse.json({ message: '保存记录失败' }, { status: 500 });
  }
}

// 获取监控数据
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // 'summary' 或 'detail'
    
    if (type === 'detail') {
      const page = parseInt(searchParams.get('page') || '1');
      const pageSize = parseInt(searchParams.get('pageSize') || '10');
      
      const [total, logs] = await Promise.all([
        prisma.visitLog.count(),
        prisma.visitLog.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' }
        })
      ]);
      
      return NextResponse.json({ data: logs, total });
    }

    // 默认返回统计摘要
    // 1. 获取总访问量
    const totalVisits = await prisma.visitLog.count();

    // 2. 获取平均停留时长
    const avgDurationRes = await prisma.visitLog.aggregate({
      _avg: { duration: true }
    });
    const avgDuration = Math.round(avgDurationRes._avg.duration || 0);

    // 3. 按页面统计访问量 (Top 5)
    const topPages = await prisma.visitLog.groupBy({
      by: ['path'],
      _count: { id: true },
      _avg: { duration: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    });

    // 4. 按业务大类统计 (分析业务重心)
    const categories = [
      { name: '智能应用', pattern: '/portal/service/service-app' },
      { name: '数据服务', pattern: '/portal/service/service-data' },
      { name: '技术支撑', pattern: '/portal/service/service-ts' },
      { name: '模型工程', pattern: '/portal/service/service-model' },
    ];

    const categoryStats = await Promise.all(categories.map(async (cat) => {
      const count = await prisma.visitLog.count({
        where: { path: { startsWith: cat.pattern } }
      });
      return { name: cat.name, value: count };
    }));

    // 5. 活跃用户统计 (去重)
    const activeUsers = await prisma.visitLog.groupBy({
      by: ['username'],
      _count: { id: true }
    });

    // 6. 真实 7 日活跃度
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentLogsCount = await prisma.visitLog.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    });

    // 7. 环比增长计算 (今日 vs 昨日)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayCount = await prisma.visitLog.count({ where: { createdAt: { gte: today } } });
    const yesterdayCount = await prisma.visitLog.count({ 
      where: { createdAt: { gte: yesterday, lt: today } } 
    });
    
    const growthRate = yesterdayCount === 0 ? (todayCount > 0 ? 100 : 0) : Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100);

    return NextResponse.json({
      totalVisits,
      avgDuration,
      topPages,
      categoryStats,
      activeUserCount: activeUsers.length,
      recentLogsCount,
      growthRate,
      successRate: 100 // 基于目前记录，全是成功访问
    });
  } catch (error) {
    console.error('Fetch statistics error:', error);
    return NextResponse.json({ message: '获取统计失败' }, { status: 500 });
  }
}
