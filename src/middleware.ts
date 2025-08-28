import { NextRequest, NextResponse } from 'next/server';

/**
 * 中间件:(路由守卫)
 * @param req 请求
 * @returns 响应
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loginUrlReg = /^(\/login)$/;

  // 白名单-登录
  if (loginUrlReg.test(pathname)) {
    return NextResponse.next();
  }

  // 检查是否已登录
  if (!req.cookies.get('token')) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的路径：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - *.webp (webp file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.webp$).*)',
  ],
};
