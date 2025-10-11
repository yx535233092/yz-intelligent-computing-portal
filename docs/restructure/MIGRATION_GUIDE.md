# 目录结构迁移执行指南

> 本指南提供了详细的、分步骤的迁移操作流程，帮助你安全地完成项目重构。

## 📋 迁移前准备

### 1. 备份当前代码
```bash
# 创建备份分支
git checkout -b backup/before-restructure
git push origin backup/before-restructure

# 创建新的开发分支
git checkout -b refactor/directory-restructure
```

### 2. 确保测试通过
```bash
npm run test
npm run lint
npm run build
```

### 3. 记录当前状态
```bash
# 记录当前依赖
npm list --depth=0 > pre-migration-deps.txt

# 记录构建产物大小
npm run build
du -sh .next > pre-migration-build-size.txt
```

---

## 🔄 迁移步骤

### 阶段 1：Public 目录重构（预计时间：30分钟）

#### 1.1 创建新的目录结构
```bash
# 创建资源目录
mkdir -p public/assets/{images/{logos,icons,cases,services,banners},videos,audio,documents/samples}
mkdir -p public/workers
```

#### 1.2 移动图片资源
```bash
# Logo 相关
mv public/h3c-logo.webp public/assets/images/logos/
mv public/h3c-logo.png public/assets/images/logos/
mv public/logo.webp public/assets/images/logos/
mv public/logo.png public/assets/images/logos/

# 图标
mv public/empty.svg public/assets/images/icons/
mv public/file.svg public/assets/images/icons/
mv public/globe.svg public/assets/images/icons/
mv public/window.svg public/assets/images/icons/
mv public/next.svg public/assets/images/icons/
mv public/vercel.svg public/assets/images/icons/

# 服务配图
mv public/data-service.jpg public/assets/images/services/
mv public/chat.webp public/assets/images/services/
mv public/data1.png public/assets/images/services/
mv public/data2.png public/assets/images/services/
mv public/data3.png public/assets/images/services/
mv public/data4.png public/assets/images/services/
mv public/data5.png public/assets/images/services/
mv public/data6.png public/assets/images/services/
mv public/数据集成.webp public/assets/images/services/
mv public/智能问答.webp public/assets/images/services/

# 轮播图
mv public/*.webp public/assets/images/banners/ 2>/dev/null || true

# 案例图片
mkdir -p public/assets/images/cases/{education,enterprise,government,operator}
mv public/教育*.webp public/assets/images/cases/education/ 2>/dev/null || true
mv public/某集团*.webp public/assets/images/cases/enterprise/ 2>/dev/null || true
mv public/某市*.webp public/assets/images/cases/government/ 2>/dev/null || true
mv public/某省*.webp public/assets/images/cases/government/ 2>/dev/null || true
mv public/某水科院*.webp public/assets/images/cases/government/ 2>/dev/null || true
mv public/某石油*.webp public/assets/images/cases/enterprise/ 2>/dev/null || true
mv public/某运营商*.webp public/assets/images/cases/operator/ 2>/dev/null || true
mv public/某高职校*.webp public/assets/images/cases/education/ 2>/dev/null || true
mv public/云南*.webp public/assets/images/cases/operator/ 2>/dev/null || true
mv public/山东*.webp public/assets/images/cases/operator/ 2>/dev/null || true
mv public/江苏*.webp public/assets/images/cases/government/ 2>/dev/null || true
mv public/浙江*.webp public/assets/images/cases/government/ 2>/dev/null || true
mv public/电信*.webp public/assets/images/cases/operator/ 2>/dev/null || true
mv public/运营商*.webp public/assets/images/cases/operator/ 2>/dev/null || true
```

#### 1.3 移动媒体文件
```bash
# 视频
mv public/微调视频.mov public/assets/videos/ 2>/dev/null || true
mv public/*.mp4 public/assets/videos/ 2>/dev/null || true
mv public/*.mov public/assets/videos/ 2>/dev/null || true

# 音频
mv public/audio.wav public/assets/audio/ 2>/dev/null || true

# GIF
mv public/微调.gif public/assets/images/ 2>/dev/null || true
```

#### 1.4 移动 Worker 文件
```bash
mv public/5.4.54pdf.worker.min.mjs public/workers/pdf.worker.min.mjs
```

#### 1.5 处理示例文档
```bash
# 创建测试数据目录（可选）
mkdir -p tests/fixtures/documents/{pdf,excel,word}

# 移动示例文档到测试目录（推荐）
mv public/*解析/ tests/fixtures/documents/pdf/ 2>/dev/null || true
mv public/*.xlsx tests/fixtures/documents/excel/ 2>/dev/null || true
mv public/*.pdf tests/fixtures/documents/pdf/ 2>/dev/null || true

# 或者保留在 public 用于演示（二选一）
# mv public/*解析/ public/assets/documents/samples/
```

#### 1.6 更新图片引用
```bash
# 全局搜索替换（需要手动确认）
# 搜索：/h3c-logo.webp
# 替换：/assets/images/logos/h3c-logo.webp

# 使用 sed 批量替换（macOS）
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|/h3c-logo\.webp|/assets/images/logos/h3c-logo.webp|g' {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|/logo\.webp|/assets/images/logos/logo.webp|g' {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|/chat\.webp|/assets/images/services/chat.webp|g' {} +

# Linux 用户使用：
# find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|/h3c-logo\.webp|/assets/images/logos/h3c-logo.webp|g' {} +
```

#### 1.7 提交更改
```bash
git add public/
git commit -m "refactor: reorganize public directory structure"
```

---

### 阶段 2：API 层重构（预计时间：1小时）

#### 2.1 创建新的 API 目录结构
```bash
mkdir -p src/lib/api/{client,server}
mkdir -p src/lib/api/client/{data-processing,external}
```

#### 2.2 移动和重构 API 文件
```bash
# 移动文件
mv src/apis/applications.ts src/lib/api/client/
mv src/apis/chemicalParse.ts src/lib/api/client/chemical.ts
mv src/apis/login.ts src/lib/api/client/auth.ts

# 数据处理相关
mv src/apis/data-process/* src/lib/api/client/data-processing/

# 外部 API
mv src/apis/service-app/hj.ts src/lib/api/client/external/hj-platform.ts
mv src/apis/service-data/* src/lib/api/client/data-processing/

# 服务端 API
mv src/lib/api/prisma.ts src/lib/api/server/
```

#### 2.3 更新 API 引用
创建统一的导出文件：

```typescript
// src/lib/api/client/index.ts
export * from './auth';
export * from './applications';
export * from './chemical';
export * as dataProcessing from './data-processing';
export * as external from './external';
```

#### 2.4 更新导入语句
```bash
# 搜索并替换导入路径
# 从: import { xxx } from '@/apis/xxx'
# 到: import { xxx } from '@/lib/api/client/xxx'

# 使用 VS Code 或 WebStorm 的全局搜索替换功能
# 搜索: from '@/apis/
# 替换: from '@/lib/api/client/
```

#### 2.5 删除旧目录
```bash
rm -rf src/apis/
```

#### 2.6 提交更改
```bash
git add src/lib/api src/apis
git commit -m "refactor: restructure API layer with client/server separation"
```

---

### 阶段 3：组件结构优化（预计时间：1.5小时）

#### 3.1 创建新的组件目录
```bash
mkdir -p src/components/{ui,common,features,layouts}
mkdir -p src/components/features/{auth,data-processing,chemical,cases,navigation}
```

#### 3.2 移动布局组件
```bash
# 重命名并移动
mv src/components/layout/layout-auth src/components/layouts/AuthLayout
mv src/components/layout/layout-portal src/components/layouts/PortalLayout
mv src/components/layout/layout-manage src/components/layouts/AdminLayout
```

#### 3.3 重组功能组件
```bash
# 数据处理组件
mkdir -p src/components/features/data-processing
mv src/components/data-process/* src/components/features/data-processing/

# 案例组件
mkdir -p src/components/features/cases
mv src/components/features/cases/* src/components/features/cases/

# 导航组件
mkdir -p src/components/features/navigation
mv src/components/features/nav/* src/components/features/navigation/
```

#### 3.4 创建组件索引文件
```typescript
// src/components/ui/index.ts
export { RouteButton } from './RouteButton';

// src/components/common/index.ts
export { Logo } from './Logo';
export { FilePreview } from './FilePreview';
export { LoadingProvider } from './LoadingProvider';

// src/components/features/index.ts
export * from './auth';
export * from './data-processing';
export * from './chemical';
export * from './cases';
export * from './navigation';

// src/components/layouts/index.ts
export { AuthLayout } from './AuthLayout';
export { PortalLayout } from './PortalLayout';
export { AdminLayout } from './AdminLayout';
```

#### 3.5 更新组件引用
```bash
# 全局替换导入路径
# 从: import { xxx } from '@/components/data-process/xxx'
# 到: import { xxx } from '@/components/features/data-processing/xxx'
```

#### 3.6 删除旧目录
```bash
rm -rf src/components/layout
rm -rf src/components/data-process
```

#### 3.7 提交更改
```bash
git add src/components
git commit -m "refactor: reorganize component architecture"
```

---

### 阶段 4：App Router 重构（预计时间：2小时）

#### 4.1 创建路由组
```bash
mkdir -p src/app/'(auth)'
mkdir -p src/app/'(portal)'
mkdir -p src/app/'(admin)'
mkdir -p src/app/'(tools)'
```

#### 4.2 移动认证相关页面
```bash
mv src/app/auth/login src/app/'(auth)'/login
mv src/app/auth/layout.tsx src/app/'(auth)'/layout.tsx

# 移动登录组件到页面组件目录
mkdir -p src/app/'(auth)'/login/components
mv src/app/'(auth)'/login/LoginForm.tsx src/app/'(auth)'/login/components/
mv src/app/'(auth)'/login/CanvasBackground.tsx src/app/'(auth)'/login/components/
mv src/app/'(auth)'/login/loginForm.module.css src/app/'(auth)'/login/components/
```

#### 4.3 移动门户页面
```bash
# 移动整个 portal 目录
mv src/app/portal/* src/app/'(portal)'/

# 重命名服务目录
mv src/app/'(portal)'/service src/app/'(portal)'/services

# 重命名服务子目录
mv src/app/'(portal)'/services/service-app src/app/'(portal)'/services/applications
mv src/app/'(portal)'/services/service-data src/app/'(portal)'/services/data
mv src/app/'(portal)'/services/service-model src/app/'(portal)'/services/models
mv src/app/'(portal)'/services/service-ts src/app/'(portal)'/services/knowledge

# 重命名数据服务子目录
mv src/app/'(portal)'/services/data/data-get src/app/'(portal)'/services/data/acquisition
mv src/app/'(portal)'/services/data/data-process src/app/'(portal)'/services/data/processing

# 重命名案例目录
mv src/app/'(portal)'/case src/app/'(portal)'/cases

# 重命名案例子目录
mv src/app/'(portal)'/cases/goverment src/app/'(portal)'/cases/government
mv src/app/'(portal)'/cases/government/gongan src/app/'(portal)'/cases/government/public-security
mv src/app/'(portal)'/cases/government/yingji src/app/'(portal)'/cases/government/emergency
mv src/app/'(portal)'/cases/government/yingshang src/app/'(portal)'/cases/government/business
mv src/app/'(portal)'/cases/enterprise/jituan src/app/'(portal)'/cases/enterprise/group
mv src/app/'(portal)'/cases/education/gaoxiao src/app/'(portal)'/cases/education/university
mv src/app/'(portal)'/cases/operator/shandong src/app/'(portal)'/cases/operator/shandong
mv src/app/'(portal)'/cases/operator/yunnan src/app/'(portal)'/cases/operator/yunnan
mv src/app/'(portal)'/cases/operator/wenshu src/app/'(portal)'/cases/operator/document

# 重命名联系我们
mv src/app/'(portal)'/contact-us src/app/'(portal)'/contact
```

#### 4.4 移动管理后台页面
```bash
mv src/app/manage/* src/app/'(admin)'/

# 重命名
mv src/app/'(admin)'/dashborad src/app/'(admin)'/dashboard
mv src/app/'(admin)'/theme-config src/app/'(admin)'/settings
mv src/app/'(admin)'/permission src/app/'(admin)'/permissions
mv src/app/'(admin)'/role src/app/'(admin)'/roles

# 创建用户管理页面（如果不存在）
mkdir -p src/app/'(admin)'/users
```

#### 4.5 移动工具页面
```bash
mkdir -p src/app/'(tools)'/parser
mv src/app/decmer/* src/app/'(tools)'/parser/
```

#### 4.6 更新 API 路由
```bash
# 重命名 API 路由
mv src/app/api/getApplications src/app/api/applications
mv src/app/api/getFileListByLabel src/app/api/files
mv src/app/api/submitContact src/app/api/contact
mv src/app/api/getAccessToken src/app/api/auth/token
mv src/app/api/auth/getUserPermissions src/app/api/auth/permissions
mv src/app/api/auth/permission src/app/api/auth/permissions
```

#### 4.7 删除旧目录
```bash
rm -rf src/app/auth
rm -rf src/app/portal
rm -rf src/app/manage
rm -rf src/app/decmer
```

#### 4.8 更新中间件配置
```typescript
// src/middleware.ts
export const config = {
  matcher: [
    '/api/:path*',
    '/(admin)/:path*',  // 更新为新的路由组
    '/(portal)/:path*',
  ],
};
```

#### 4.9 更新内部链接
需要全局搜索并更新所有内部链接：
- `/portal/service/` → `/portal/services/`
- `/portal/case/` → `/portal/cases/`
- `/manage/` → `/admin/`
- `/decmer/` → `/tools/parser/`

#### 4.10 提交更改
```bash
git add src/app
git commit -m "refactor: implement route groups and rename routes"
```

---

### 阶段 5：类型定义优化（预计时间：30分钟）

#### 5.1 创建新的类型文件
```bash
# 创建通用类型文件
touch src/types/common.ts
touch src/types/api.ts
```

#### 5.2 创建 common.ts
```typescript
// src/types/common.ts
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type LoadingState = 'idle' | 'pending' | 'success' | 'error';

export interface SelectOption<T = string> {
  label: string;
  value: T;
}
```

#### 5.3 创建 api.ts
```typescript
// src/types/api.ts
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}
```

#### 5.4 重命名类型目录
```bash
mv src/types/data-process src/types/data-processing
mv src/types/profile src/types/user
```

#### 5.5 合并 manage 类型到 user
```bash
# 合并内容后删除
cat src/types/manage/* >> src/types/user/index.ts
rm -rf src/types/manage
```

#### 5.6 创建统一导出
```typescript
// src/types/index.ts
export * from './common';
export * from './api';
export * from './auth';
export * from './application';
export * from './data-processing';
export * from './chemical';
export * from './excel';
export * from './user';
```

#### 5.7 提交更改
```bash
git add src/types
git commit -m "refactor: optimize type definitions structure"
```

---

### 阶段 6：工具函数优化（预计时间：20分钟）

#### 6.1 创建新的工具目录
```bash
mkdir -p src/lib/utils/{format,validation}
```

#### 6.2 重组工具函数
```bash
# 创建格式化工具
mv src/lib/utils/formatTime.ts src/lib/utils/format/time.ts

# 重命名媒体工具
mv src/lib/utils/judgementMediaType.ts src/lib/utils/media.ts
```

#### 6.3 创建新的工具文件
```typescript
// src/lib/utils/format/number.ts
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('zh-CN').format(num);
};

// src/lib/utils/format/string.ts
export const truncate = (str: string, length: number): string => {
  return str.length > length ? `${str.slice(0, length)}...` : str;
};

// src/lib/utils/file.ts
export const getFileExtension = (filename: string): string => {
  return filename.slice(filename.lastIndexOf('.') + 1);
};

export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};
```

#### 6.4 创建统一导出
```typescript
// src/lib/utils/index.ts
export * from './format/time';
export * from './format/number';
export * from './format/string';
export * from './cookies';
export * from './media';
export * from './file';
```

#### 6.5 提交更改
```bash
git add src/lib/utils
git commit -m "refactor: optimize utils structure"
```

---

### 阶段 7：状态管理优化（预计时间：20分钟）

#### 7.1 重命名 features 为 slices
```bash
mv src/lib/store/features src/lib/store/slices
mv src/lib/store/slices/userInfoSlice.ts src/lib/store/slices/user.slice.ts
```

#### 7.2 创建 Provider 组件
```typescript
// src/lib/store/provider.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from './index';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

#### 7.3 创建类型安全的 hooks
```typescript
// src/lib/store/hooks.ts
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

#### 7.4 更新 store 导出
```typescript
// src/lib/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from './combineReducers';

export const store = configureStore({
  reducer: combineReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
```

#### 7.5 提交更改
```bash
git add src/lib/store
git commit -m "refactor: optimize store structure with typed hooks"
```

---

### 阶段 8：数据库层分离（预计时间：30分钟）

#### 8.1 创建数据库目录
```bash
mkdir -p src/lib/db/queries
```

#### 8.2 移动 Prisma 客户端
```bash
mv src/lib/api/server/prisma.ts src/lib/db/prisma.ts
```

#### 8.3 创建查询函数
```typescript
// src/lib/db/queries/users.ts
import { prisma } from '../prisma';
import type { User, Prisma } from '@prisma/client';

export const userQueries = {
  // 查找用户
  findById: async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail: async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
  },

  // 创建用户
  create: async (data: Prisma.UserCreateInput): Promise<User> => {
    return prisma.user.create({ data });
  },

  // 更新用户
  update: async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
    return prisma.user.update({ where: { id }, data });
  },

  // 删除用户
  delete: async (id: string): Promise<User> => {
    return prisma.user.delete({ where: { id } });
  },

  // 列表查询
  findMany: async (params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
  }) => {
    const { skip, take, where } = params;
    return prisma.user.findMany({ skip, take, where });
  },
};

// src/lib/db/queries/roles.ts
import { prisma } from '../prisma';

export const roleQueries = {
  findAll: async () => {
    return prisma.role.findMany({
      include: { permissions: true },
    });
  },

  findById: async (id: string) => {
    return prisma.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
  },
};

// src/lib/db/queries/permissions.ts
import { prisma } from '../prisma';

export const permissionQueries = {
  findAll: async () => {
    return prisma.permission.findMany();
  },

  findByRoleId: async (roleId: string) => {
    return prisma.permission.findMany({
      where: {
        roles: {
          some: { id: roleId },
        },
      },
    });
  },
};
```

#### 8.4 创建统一导出
```typescript
// src/lib/db/queries/index.ts
export * from './users';
export * from './roles';
export * from './permissions';
```

#### 8.5 更新 API 路由使用查询函数
```typescript
// 示例：src/app/api/auth/users/route.ts
import { userQueries } from '@/lib/db/queries';

export async function GET() {
  const users = await userQueries.findMany({});
  return Response.json({ data: users });
}
```

#### 8.6 提交更改
```bash
git add src/lib/db
git commit -m "refactor: separate database layer with query functions"
```

---

### 阶段 9：认证逻辑模块化（预计时间：30分钟）

#### 9.1 创建认证目录
```bash
mkdir -p src/lib/auth
```

#### 9.2 提取 JWT 逻辑
```typescript
// src/lib/auth/jwt.ts
import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

export interface JWTPayload {
  userId: string;
  email: string;
  role?: string;
}

export const jwt = {
  sign: async (payload: JWTPayload): Promise<string> => {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(SECRET);
  },

  verify: async (token: string): Promise<JWTPayload | null> => {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      return payload as JWTPayload;
    } catch {
      return null;
    }
  },
};
```

#### 9.3 提取权限验证逻辑
```typescript
// src/lib/auth/permissions.ts
export interface Permission {
  resource: string;
  action: string;
}

export const checkPermission = (
  userPermissions: Permission[],
  required: Permission
): boolean => {
  return userPermissions.some(
    (p) => p.resource === required.resource && p.action === required.action
  );
};

export const checkPermissions = (
  userPermissions: Permission[],
  required: Permission[]
): boolean => {
  return required.every((req) => checkPermission(userPermissions, req));
};
```

#### 9.4 更新中间件使用新的认证逻辑
```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwt } from '@/lib/auth/jwt';

const whiteList = ['/api/auth/login'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (whiteList.includes(pathname) || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: '缺失token' }, { status: 401 });
    }

    const payload = await jwt.verify(token);
    if (!payload) {
      return NextResponse.json({ message: 'token验证失败' }, { status: 401 });
    }

    return NextResponse.next();
  } else {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/(auth)/login', req.url));
    }

    const payload = await jwt.verify(token);
    if (!payload) {
      req.cookies.delete('token');
      return NextResponse.redirect(new URL('/(auth)/login', req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/api/:path*', '/(admin)/:path*', '/(portal)/:path*'],
};
```

#### 9.5 提交更改
```bash
git add src/lib/auth src/middleware.ts
git commit -m "refactor: modularize authentication logic"
```

---

### 阶段 10：配置文件创建（预计时间：20分钟）

#### 10.1 创建配置目录
```bash
mkdir -p src/lib/config
```

#### 10.2 创建站点配置
```typescript
// src/lib/config/site.ts
export const siteConfig = {
  name: 'H3C 智算服务平台',
  description: '智能计算服务平台门户',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/assets/images/logos/h3c-logo.webp',
  links: {
    github: 'https://github.com/h3c',
  },
  contact: {
    email: 'contact@h3c.com',
    phone: '400-XXX-XXXX',
  },
};
```

#### 10.3 创建导航配置
```typescript
// src/lib/config/navigation.ts
export const navigationConfig = {
  main: [
    {
      title: '首页',
      href: '/portal/home',
    },
    {
      title: '服务',
      href: '/portal/services',
      children: [
        { title: '应用服务', href: '/portal/services/applications' },
        { title: '数据服务', href: '/portal/services/data' },
        { title: '模型服务', href: '/portal/services/models' },
        { title: '知识服务', href: '/portal/services/knowledge' },
      ],
    },
    {
      title: '案例',
      href: '/portal/cases',
    },
    {
      title: '联系我们',
      href: '/portal/contact',
    },
  ],
  admin: [
    { title: '仪表盘', href: '/admin/dashboard', icon: 'Dashboard' },
    { title: '用户管理', href: '/admin/users', icon: 'Users' },
    { title: '角色管理', href: '/admin/roles', icon: 'Shield' },
    { title: '权限管理', href: '/admin/permissions', icon: 'Lock' },
    { title: '个人资料', href: '/admin/profile', icon: 'User' },
    { title: '系统设置', href: '/admin/settings', icon: 'Settings' },
  ],
};
```

#### 10.4 提交更改
```bash
git add src/lib/config
git commit -m "feat: add site and navigation configuration"
```

---

## ✅ 验证和测试

### 1. 运行开发服务器
```bash
npm run dev
```

### 2. 检查所有路由
访问并测试以下路由：
- [ ] `/` - 首页
- [ ] `/(auth)/login` - 登录页
- [ ] `/(portal)/home` - 门户首页
- [ ] `/(portal)/services/applications` - 应用服务
- [ ] `/(portal)/services/data` - 数据服务
- [ ] `/(portal)/cases` - 案例展示
- [ ] `/(portal)/contact` - 联系我们
- [ ] `/(admin)/dashboard` - 管理后台
- [ ] `/(tools)/parser` - 解析工具

### 3. 检查资源加载
- [ ] 所有图片正常显示
- [ ] Logo 正确加载
- [ ] 图标正确显示
- [ ] 视频和音频文件可访问

### 4. 运行测试
```bash
# 单元测试
npm run test

# 类型检查
npx tsc --noEmit

# ESLint 检查
npm run lint

# 构建测试
npm run build
```

### 5. 性能检查
```bash
# 检查构建产物大小
npm run build
du -sh .next

# 对比迁移前的大小
diff pre-migration-build-size.txt <(du -sh .next)
```

---

## 🔧 常见问题处理

### 问题 1：路由 404
**原因：** 中间件配置未更新路由组
**解决：**
```typescript
// src/middleware.ts
export const config = {
  matcher: ['/api/:path*', '/(admin)/:path*', '/(portal)/:path*'],
};
```

### 问题 2：图片无法显示
**原因：** 图片路径未更新
**解决：** 全局搜索旧的图片路径并替换

### 问题 3：类型错误
**原因：** 导入路径未更新
**解决：** 使用 IDE 的"查找所有引用"功能更新导入

### 问题 4：API 调用失败
**原因：** API 路径更改
**解决：** 更新 API 路由配置和调用路径

---

## 📊 迁移完成检查清单

### 代码质量
- [ ] 所有 TypeScript 类型检查通过
- [ ] ESLint 无错误
- [ ] Prettier 格式化完成
- [ ] 所有测试通过

### 功能验证
- [ ] 所有页面可访问
- [ ] 登录功能正常
- [ ] 权限系统正常
- [ ] API 调用正常
- [ ] 文件上传/下载正常

### 资源检查
- [ ] 图片正常显示
- [ ] 字体加载正常
- [ ] 样式应用正确
- [ ] 视频/音频可播放

### 性能指标
- [ ] 首屏加载时间 < 3s
- [ ] 构建产物大小合理
- [ ] Lighthouse 评分良好

### 文档更新
- [ ] README.md 已更新
- [ ] API 文档已更新
- [ ] 组件文档已更新
- [ ] 部署文档已更新

---

## 🎉 完成

恭喜！你已经完成了目录结构的优化。现在你的项目具有：

✅ 清晰的模块划分
✅ 统一的命名规范
✅ 更好的可维护性
✅ 更高的开发效率

### 下一步建议

1. **团队培训**：向团队成员介绍新的目录结构
2. **文档完善**：补充详细的开发文档
3. **持续优化**：根据实际使用情况继续优化
4. **监控改进**：跟踪性能指标和开发效率提升

---

**祝你开发顺利！** 🚀

