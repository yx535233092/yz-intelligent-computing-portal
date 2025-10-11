# 目录结构优化 - 快速参考

> 📌 本文档提供快速查阅的目录映射和命令速查表

---

## 📁 目录映射速查表

### Public 资源路径

| 旧路径 | 新路径 | 说明 |
|-------|--------|------|
| `/h3c-logo.webp` | `/assets/images/logos/h3c-logo.webp` | Logo |
| `/logo.webp` | `/assets/images/logos/logo.webp` | Logo |
| `/chat.webp` | `/assets/images/services/chat.webp` | 服务图片 |
| `/data1.png` | `/assets/images/services/data1.png` | 服务图片 |
| `/教育1.webp` | `/assets/images/cases/education/教育1.webp` | 案例图片 |
| `/empty.svg` | `/assets/images/icons/empty.svg` | 图标 |
| `/微调视频.mov` | `/assets/videos/微调视频.mov` | 视频 |
| `/audio.wav` | `/assets/audio/audio.wav` | 音频 |
| `/5.4.54pdf.worker.min.mjs` | `/workers/pdf.worker.min.mjs` | Worker |

### 页面路由映射

| 旧路由 | 新路由 | 说明 |
|-------|--------|------|
| `/auth/login` | `/(auth)/login` | 登录页 |
| `/portal/home` | `/(portal)/home` | 门户首页 |
| `/portal/service/service-app` | `/(portal)/services/applications` | 应用服务 |
| `/portal/service/service-data` | `/(portal)/services/data` | 数据服务 |
| `/portal/service/service-data/data-get` | `/(portal)/services/data/acquisition` | 数据采集 |
| `/portal/service/service-data/data-process` | `/(portal)/services/data/processing` | 数据处理 |
| `/portal/service/service-model` | `/(portal)/services/models` | 模型服务 |
| `/portal/service/service-ts` | `/(portal)/services/knowledge` | 知识服务 |
| `/portal/case` | `/(portal)/cases` | 案例展示 |
| `/portal/case/goverment/gongan` | `/(portal)/cases/government/public-security` | 公安案例 |
| `/portal/case/goverment/yingji` | `/(portal)/cases/government/emergency` | 应急案例 |
| `/portal/case/education/gaoxiao` | `/(portal)/cases/education/university` | 高校案例 |
| `/portal/case/enterprise/jituan` | `/(portal)/cases/enterprise/group` | 集团案例 |
| `/portal/contact-us` | `/(portal)/contact` | 联系我们 |
| `/manage` | `/(admin)` | 管理后台 |
| `/manage/dashborad` | `/(admin)/dashboard` | 仪表盘 |
| `/manage/permission` | `/(admin)/permissions` | 权限管理 |
| `/manage/role` | `/(admin)/roles` | 角色管理 |
| `/manage/theme-config` | `/(admin)/settings` | 系统设置 |
| `/decmer` | `/(tools)/parser` | 解析工具 |

### API 路由映射

| 旧路由 | 新路由 | 说明 |
|-------|--------|------|
| `/api/getAccessToken` | `/api/auth/token` | 获取 Token |
| `/api/auth/getUserPermissions` | `/api/auth/permissions` | 获取权限 |
| `/api/getApplications` | `/api/applications` | 获取应用列表 |
| `/api/getFileListByLabel` | `/api/files/[label]` | 获取文件列表 |
| `/api/submitContact` | `/api/contact` | 提交联系表单 |

### 代码路径映射

#### API 层
| 旧路径 | 新路径 | 说明 |
|-------|--------|------|
| `@/apis/login.ts` | `@/lib/api/client/auth.ts` | 登录 API |
| `@/apis/applications.ts` | `@/lib/api/client/applications.ts` | 应用 API |
| `@/apis/chemicalParse.ts` | `@/lib/api/client/chemical.ts` | 化学解析 API |
| `@/apis/data-process/*` | `@/lib/api/client/data-processing/*` | 数据处理 API |
| `@/apis/service-app/hj.ts` | `@/lib/api/client/external/hj-platform.ts` | 浩鲸平台 API |
| `@/lib/api/prisma.ts` | `@/lib/db/prisma.ts` | Prisma 客户端 |

#### 组件层
| 旧路径 | 新路径 | 说明 |
|-------|--------|------|
| `@/components/layout/layout-auth` | `@/components/layouts/AuthLayout` | 认证布局 |
| `@/components/layout/layout-portal` | `@/components/layouts/PortalLayout` | 门户布局 |
| `@/components/layout/layout-manage` | `@/components/layouts/AdminLayout` | 管理后台布局 |
| `@/components/data-process/*` | `@/components/features/data-processing/*` | 数据处理组件 |
| `@/components/features/nav` | `@/components/features/navigation` | 导航组件 |
| `@/components/common/LoadingContext` | `@/components/common/LoadingProvider` | Loading Provider |

#### 类型定义
| 旧路径 | 新路径 | 说明 |
|-------|--------|------|
| `@/types/data-process` | `@/types/data-processing` | 数据处理类型 |
| `@/types/profile` | `@/types/user` | 用户类型 |
| `@/types/manage` | `@/types/user` | 合并到用户类型 |
| `@/types/login.ts` | `@/types/auth/` | 合并到认证类型 |

#### 工具函数
| 旧路径 | 新路径 | 说明 |
|-------|--------|------|
| `@/lib/utils/formatTime.ts` | `@/lib/utils/format/time.ts` | 时间格式化 |
| `@/lib/utils/judgementMediaType.ts` | `@/lib/utils/media.ts` | 媒体类型判断 |

#### 状态管理
| 旧路径 | 新路径 | 说明 |
|-------|--------|------|
| `@/lib/store/features` | `@/lib/store/slices` | Redux Slices |
| `@/lib/store/features/userInfoSlice.ts` | `@/lib/store/slices/user.slice.ts` | 用户 Slice |

---

## 🔧 常用命令速查

### 迁移脚本

```bash
# 查看帮助
./scripts/migrate-structure.sh --help

# 执行指定阶段
./scripts/migrate-structure.sh 1          # 阶段 1: Public 目录
./scripts/migrate-structure.sh 2          # 阶段 2: API 层
./scripts/migrate-structure.sh 3          # 阶段 3: 组件结构
./scripts/migrate-structure.sh 4          # 阶段 4: 类型定义

# 执行所有阶段
./scripts/migrate-structure.sh --all

# 跳过备份执行
./scripts/migrate-structure.sh --no-backup 1

# 交互式选择
./scripts/migrate-structure.sh
```

### 批量查找替换

```bash
# 使用 sed 批量替换 (macOS)
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's|旧路径|新路径|g' {} +

# 使用 sed 批量替换 (Linux)
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|旧路径|新路径|g' {} +

# 使用 grep 查找需要更新的文件
grep -r "from '@/apis/" src/

# 查找所有导入路径
grep -rn "from '@/" src/ | grep -E "(apis|data-process|layout)"
```

### Git 操作

```bash
# 创建备份分支
git checkout -b backup/before-restructure-$(date +%Y%m%d)

# 创建开发分支
git checkout -b refactor/directory-restructure

# 分阶段提交
git add public/
git commit -m "refactor: reorganize public directory"

git add src/lib/api
git commit -m "refactor: restructure API layer"

git add src/components
git commit -m "refactor: reorganize components"

# 查看变更文件
git status
git diff --name-only

# 查看变更统计
git diff --stat
```

### 验证和测试

```bash
# 类型检查
npx tsc --noEmit

# ESLint 检查
npm run lint

# 运行测试
npm run test

# 构建检查
npm run build

# 检查构建产物大小
du -sh .next

# 开发服务器
npm run dev
```

---

## 📝 命名规范速查

### 目录命名

```
✅ kebab-case (推荐)
data-processing/
user-profile/
public-security/

❌ 避免
dataProcessing/      (camelCase)
DataProcessing/      (PascalCase)
data_processing/     (snake_case)
```

### 文件命名

```
✅ 组件文件 (PascalCase)
Button.tsx
UserProfile.tsx
LoginForm.tsx

✅ 工具/配置文件 (camelCase)
formatTime.ts
request.ts
config.ts

✅ 类型文件
user.types.ts
api.types.ts
common.ts

✅ 测试文件
Button.test.tsx
formatTime.spec.ts

❌ 避免
button.tsx           (全小写)
User-Profile.tsx     (kebab-case)
FORMAT_TIME.ts       (全大写)
```

### 路由命名

```
✅ 资源名词 + 复数
/services/
/applications/
/users/
/roles/

❌ 避免
/service/            (单数)
/getApplications/    (动词)
/userList/           (冗余后缀)
```

### 组件导出

```typescript
✅ 推荐
// Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// 使用
import { Button } from '@/components/ui/Button';

❌ 避免
// 直接导入组件文件
import { Button } from '@/components/ui/Button/Button';
```

---

## 🎯 导入路径示例

### 使用路径别名

```typescript
// ✅ 推荐 - 使用别名
import { Button } from '@/components/ui';
import { Logo } from '@/components/common';
import { ChemicalEditor } from '@/components/features';
import { AuthLayout } from '@/components/layouts';

import { authApi } from '@/lib/api/client';
import { userQueries } from '@/lib/db/queries';
import { jwt } from '@/lib/auth';

import type { User, ApiResponse } from '@/types';

// ❌ 避免 - 相对路径
import { Button } from '../../../../components/ui';
import { authApi } from '../../../lib/api/client';
```

### 分组导入

```typescript
// ✅ 推荐 - 按来源分组
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Modal } from '@/components/ui';
import { Logo } from '@/components/common';

import { authApi } from '@/lib/api/client';
import { useAppDispatch } from '@/lib/store/hooks';

import type { User } from '@/types';

// ❌ 避免 - 混乱的导入
import { Button } from '@/components/ui';
import { useState } from 'react';
import type { User } from '@/types';
import { Logo } from '@/components/common';
import { useRouter } from 'next/navigation';
```

---

## 🔍 常见问题速查

### Q1: 图片路径更新后 404？

```typescript
// ❌ 错误
<img src="/logo.webp" />

// ✅ 正确
<img src="/assets/images/logos/logo.webp" />

// ✅ 使用 Next.js Image 组件
import Image from 'next/image';
<Image src="/assets/images/logos/logo.webp" width={200} height={50} alt="Logo" />
```

### Q2: 路由组后中间件匹配失败？

```typescript
// ❌ 错误 - middleware.ts
export const config = {
  matcher: ['/api/:path*', '/manage/:path*', '/portal/:path*'],
};

// ✅ 正确 - 更新为路由组路径
export const config = {
  matcher: ['/api/:path*', '/(admin)/:path*', '/(portal)/:path*'],
};
```

### Q3: 导入路径报错找不到模块？

```bash
# 检查 tsconfig.json 路径别名
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# 重启 TypeScript 服务器
# VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"
# 或重启编辑器
```

### Q4: 组件导入报错？

```typescript
// ❌ 错误 - 导入不存在的路径
import { LoginForm } from '@/components/features/auth';

// ✅ 检查是否创建了 index.ts
// src/components/features/auth/index.ts
export { LoginForm } from './LoginForm';

// ✅ 或直接导入
import { LoginForm } from '@/components/features/auth/LoginForm';
```

### Q5: API 调用失败？

```typescript
// ❌ 错误 - 使用旧的 API 路径
const res = await fetch('/api/getApplications');

// ✅ 正确 - 使用新的 API 路径
const res = await fetch('/api/applications');

// ✅ 推荐 - 使用封装的 API 函数
import { applicationsApi } from '@/lib/api/client';
const apps = await applicationsApi.getAll();
```

---

## 📊 迁移进度检查清单

### 阶段 1: Public 目录
- [ ] 创建新的目录结构
- [ ] 移动 Logo 文件
- [ ] 移动图标文件
- [ ] 移动服务配图
- [ ] 移动案例图片
- [ ] 移动媒体文件
- [ ] 移动 Worker 文件
- [ ] 更新代码中的图片引用
- [ ] 测试资源加载
- [ ] 提交更改

### 阶段 2: API 层
- [ ] 创建 lib/api/client 目录
- [ ] 创建 lib/api/server 目录
- [ ] 移动 API 文件
- [ ] 创建统一导出
- [ ] 更新导入路径
- [ ] 测试 API 调用
- [ ] 删除旧目录
- [ ] 提交更改

### 阶段 3: 组件结构
- [ ] 创建新的组件目录
- [ ] 移动布局组件
- [ ] 移动功能组件
- [ ] 创建组件索引
- [ ] 更新组件引用
- [ ] 测试组件渲染
- [ ] 删除旧目录
- [ ] 提交更改

### 阶段 4: App Router
- [ ] 创建路由组
- [ ] 移动认证页面
- [ ] 移动门户页面
- [ ] 移动管理后台页面
- [ ] 移动工具页面
- [ ] 更新 API 路由
- [ ] 更新中间件配置
- [ ] 更新内部链接
- [ ] 测试所有路由
- [ ] 提交更改

### 阶段 5: 类型定义
- [ ] 创建通用类型
- [ ] 重命名类型目录
- [ ] 合并相关类型
- [ ] 创建统一导出
- [ ] 更新类型引用
- [ ] 类型检查通过
- [ ] 提交更改

### 最终验证
- [ ] 所有路由正常访问
- [ ] 所有图片正常显示
- [ ] 所有 API 正常调用
- [ ] TypeScript 类型检查通过
- [ ] ESLint 检查通过
- [ ] 测试套件全部通过
- [ ] 构建成功
- [ ] 性能指标正常
- [ ] 文档已更新

---

## 🚀 快速开始

```bash
# 1. 创建备份
git checkout -b backup/before-restructure
git push origin backup/before-restructure

# 2. 创建开发分支
git checkout -b refactor/directory-restructure

# 3. 运行迁移脚本
./scripts/migrate-structure.sh --all

# 4. 手动更新导入路径
# 使用编辑器的全局搜索替换功能

# 5. 验证
npm run dev
npm run lint
npm run test
npm run build

# 6. 提交
git add .
git commit -m "refactor: complete directory restructure"
git push origin refactor/directory-restructure
```

---

## 📚 相关文档

- [目录结构优化方案](./DIRECTORY_STRUCTURE_OPTIMIZATION.md) - 完整的优化方案
- [迁移执行指南](./MIGRATION_GUIDE.md) - 详细的迁移步骤
- [结构对比文档](./STRUCTURE_COMPARISON.md) - 优化前后对比
- [迁移脚本](./scripts/migrate-structure.sh) - 自动化迁移工具

---

**最后更新:** 2025-10-10  
**版本:** 1.0.0

