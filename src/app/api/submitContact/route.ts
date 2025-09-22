import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
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
  const userAgent = request.headers.get('user-agent');

  // 获取请求体
  const data = await request.json();
  data.clientIp = clientIp;
  data.userAgent = userAgent;
  data.createTime = new Date().toISOString();

  // 文件保存地址
  const savePath = path.resolve(
    process.cwd(),
    '..',
    'tianjingyidong-contact.json'
  );
  //写入文件
  if (fs.existsSync(savePath)) {
    const existData = fs.readFileSync(savePath, 'utf-8');
    if (existData) {
      const existDataJson = JSON.parse(existData);
      existDataJson.push(data);
      fs.writeFileSync(
        savePath,
        JSON.stringify(existDataJson, null, 2),
        'utf-8'
      );
    } else {
      fs.writeFileSync(savePath, JSON.stringify([data], null, 2), 'utf-8');
    }
  } else {
    return NextResponse.json(
      {
        message: 'file not found',
        clientIp: clientIp,
        userAgent: userAgent,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      message: 'success',
      clientIp: clientIp,
      userAgent: userAgent,
    },
    {
      status: 200,
    }
  );
}
