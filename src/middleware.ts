import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const whiteList = ['/api/auth/login'];
/**
 * 中间件:(路由守卫)
 * @param req 请求
 * @returns 响应
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // 白名单和静态资源放行
  if (whiteList.includes(pathname) || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }
  // 接口路由守卫
  if (pathname.startsWith('/api/')) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: '缺失token' }, { status: 401 });
    }
    try {
      const secret = new TextEncoder().encode('secret');
      const decoded = await jwtVerify(token, secret);
      if (decoded) {
        return NextResponse.next();
      } else {
        return NextResponse.json({ message: 'token验证失败' }, { status: 500 });
      }
    } catch (error) {
      return NextResponse.json(
        { error, message: 'token验证失败' },
        { status: 500 }
      );
    }
  }
  // 页面路由守卫
  else {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    try {
      // 验证token
      const secret = new TextEncoder().encode('secret');
      const decoded = await jwtVerify(token, secret);
      if (decoded) {
        return NextResponse.next();
      } else {
        req.cookies.delete('token');
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    } catch (error) {
      // 删除token并重定向至登录页
      req.cookies.delete('token');
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }
}

// 配置匹配项
export const config = {
  matcher: ['/api/:path*', '/manage/:path*', '/portal/:path*'],
};
