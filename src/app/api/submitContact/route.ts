import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export async function POST(request: NextRequest) {
  try {
    // 获取客户端IP地址的多种方式
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');

    // 优先使用 Cloudflare 的真实IP，然后是 x-real-ip，最后是 x-forwarded-for
    let clientIp = cfConnectingIp || realIp || forwarded;

    // 如果 x-forwarded-for 包含多个IP（逗号分隔），取第一个
    if (clientIp && clientIp.includes(',')) {
      clientIp = clientIp.split(',')[0].trim();
    }

    // 获取用户客户端
    const userAgent = request.headers.get('user-agent') || '';

    // 获取请求体
    const body = await request.json();
    const { name, company, email, phone, service, message, loginUser } = body;

    // 简单的校验
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ message: '缺少必要字段' }, { status: 400 });
    }

    // 写入数据库
    await prisma.contact.create({
      data: {
        name,
        company,
        email,
        phone,
        service,
        message,
        loginUser,
        clientIp: clientIp || null,
        userAgent: userAgent || null,
      },
    });

    return NextResponse.json(
      {
        message: 'success',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Submit contact error:', error);
    return NextResponse.json({ message: '提交失败' }, { status: 500 });
  }
}