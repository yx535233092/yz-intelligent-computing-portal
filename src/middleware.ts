import { NextRequest, NextResponse } from 'next/server';

/**
 * 中间件:(路由守卫)
 * @param req 请求
 * @returns 响应
 */
export async function middleware(req: NextRequest) {
  // 获取服务端req里的token
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl;

  // 不存在token，重定向到登陆页
  if (!token) {
    const loginUrl = new URL('/login', url);
    loginUrl.searchParams.set('message', 'no_token');
    return NextResponse.redirect(loginUrl);
  }

  // 验证token
  try {
    const response = await fetch('http://39.175.132.230:35001/users/own_info', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    console.log('验证token：', response.status === 200 ? '成功' : '失败');

    // 验证成功放行，否则重定向至登陆页
    if (response.status === 200) {
      return NextResponse.next();
    } else {
      // 添加状态参数，提示用户重新登录
      const loginUrl = new URL('/login', url);
      loginUrl.searchParams.set('message', 'token_expired');
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    // 验证失败重定向至登陆页
    console.error('Token验证出错:', error);
    const loginUrl = new URL('/login', url);
    loginUrl.searchParams.set('message', 'token_invalid');
    return NextResponse.redirect(loginUrl);
  }
}

// 配置匹配项
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的路径：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - *.webp (webp file)
     * - login (login page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.webp$|login).*)',
  ],
};
