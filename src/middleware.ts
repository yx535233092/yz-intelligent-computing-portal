import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-it-in-production'
);

const whiteList = ['/api/auth/login', '/auth/login'];

/**
 * 验证 Token 并返回 Payload
 */
async function getPayload(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * 中件间:(路由守卫)
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. 白名单和静态资源放行
  if (
    whiteList.includes(pathname) || 
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // 2. 特殊处理：通用渲染页放行，由组件内部判断 isPublic
  if (pathname.startsWith('/portal/app/')) {
    return NextResponse.next();
  }

  // 3. 放行获取应用详情的 API (GET 方法)
  if (pathname.match(/^\/api\/applications\/\d+$/) && req.method === 'GET') {
    return NextResponse.next();
  }

  // 4. 获取 Token (优先从 Cookie 获取)
  const token = req.cookies.get('token')?.value || req.headers.get('Authorization')?.split(' ')[1] || '';

  // 5. 无 Token 且访问受限区域
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ message: '请登录后访问' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 6. 验证 Token 有效性
  const payload = await getPayload(token);
  if (!payload) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ message: '登录已过期，请重新登录' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('token');
    return response;
  }

  // 7. 角色权限拦截：/manage 路径仅具有 admin 角色的用户可访问
  if (pathname.startsWith('/manage/') || pathname.startsWith('/api/auth/users')) {
     const roles = (payload.roles as string[]) || [];
     if (!roles.includes('admin')) {
        // 如果是 API 请求，返回 403
        if (pathname.startsWith('/api/')) {
          return NextResponse.json({ message: '权限不足，仅管理员可访问' }, { status: 403 });
        }
        // 如果是页面请求，重定向到首页或错误页
        return NextResponse.redirect(new URL('/', req.url));
     }
  }


  return NextResponse.next();
}

// 配置匹配项
export const config = {
  matcher: ['/api/:path*', '/manage/:path*', '/portal/:path*'],
};
