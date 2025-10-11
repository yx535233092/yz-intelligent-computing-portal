# 目录结构优化方案

## 📊 优化概览

本文档提供了完整的目录结构优化方案，遵循 Next.js 15 最佳实践和企业级项目规范。

---

## 🎯 优化后的完整目录结构

```
Intelligent_computing_portal/
├── .husky/                              # Git hooks 配置
├── .vscode/                             # VSCode 配置
│   ├── settings.json                    # 编辑器设置
│   └── extensions.json                  # 推荐插件
│
├── prisma/                              # 数据库 ORM
│   ├── migrations/                      # 数据库迁移文件
│   ├── seeds/                           # 数据库种子文件 [NEW]
│   │   ├── seed.ts
│   │   ├── users.seed.ts
│   │   └── roles.seed.ts
│   └── schema.prisma
│
├── public/                              # 静态资源 [重构]
│   ├── assets/                          # 资源文件 [NEW]
│   │   ├── images/                      # 图片资源
│   │   │   ├── logos/                   # Logo 相关
│   │   │   │   ├── h3c-logo.webp
│   │   │   │   └── logo.webp
│   │   │   ├── icons/                   # 图标
│   │   │   │   ├── empty.svg
│   │   │   │   ├── file.svg
│   │   │   │   ├── globe.svg
│   │   │   │   └── window.svg
│   │   │   ├── cases/                   # 案例图片
│   │   │   │   ├── education/
│   │   │   │   ├── enterprise/
│   │   │   │   ├── government/
│   │   │   │   └── operator/
│   │   │   ├── services/                # 服务配图
│   │   │   │   ├── data-service.jpg
│   │   │   │   ├── chat.webp
│   │   │   │   └── data1-6.png
│   │   │   └── banners/                 # 轮播图
│   │   │       ├── 10.webp
│   │   │       ├── 11.webp
│   │   │       └── ...
│   │   ├── videos/                      # 视频文件
│   │   │   └── 微调视频.mov
│   │   ├── audio/                       # 音频文件
│   │   │   └── audio.wav
│   │   └── documents/                   # 文档资源（示例用）
│   │       └── samples/                 # 示例文档 [NEW]
│   │           ├── pdf/
│   │           ├── excel/
│   │           └── word/
│   │
│   ├── fonts/                           # 字体文件
│   ├── bcmaps/                          # PDF.js 字符映射
│   ├── workers/                         # Web Workers [NEW]
│   │   └── pdf.worker.min.mjs
│   └── favicon.ico
│
├── shell/                               # 部署脚本
│   ├── common_deploy.sh
│   └── deploy.sh
│
├── src/
│   ├── app/                            # Next.js App Router [优化]
│   │   ├── (auth)/                     # 认证路由组 [NEW - 路由组]
│   │   │   ├── layout.tsx
│   │   │   └── login/
│   │   │       ├── page.tsx
│   │   │       ├── components/         # 页面级组件 [NEW]
│   │   │       │   ├── LoginForm.tsx
│   │   │       │   ├── CanvasBackground.tsx
│   │   │       │   └── loginForm.module.css
│   │   │       └── _test_/             # 页面测试 [NEW]
│   │   │           └── login.test.tsx
│   │   │
│   │   ├── (portal)/                   # 门户路由组 [NEW - 路由组]
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                # 门户首页
│   │   │   ├── home/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── services/               # 服务展示 [重命名 service → services]
│   │   │   │   ├── applications/       # 应用服务 [重命名 service-app]
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [slug]/         # 动态路由 [NEW]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── hj-platform/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── ocr-recognize/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── text-translate/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── data/               # 数据服务 [重命名 service-data]
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── acquisition/    # 数据采集 [重命名 data-get]
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── components/
│   │   │   │   │   │       ├── Advantages.tsx
│   │   │   │   │   │       ├── CollectionFlow.tsx
│   │   │   │   │   │       └── ...
│   │   │   │   │   └── processing/     # 数据处理 [重命名 data-process]
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       ├── documents/  # 文档处理
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       ├── excel/      # 表格处理
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       └── media/      # 媒体处理
│   │   │   │   │           └── page.tsx
│   │   │   │   │
│   │   │   │   ├── models/             # 模型服务 [重命名 service-model]
│   │   │   │   │   └── page.tsx
│   │   │   │   │
│   │   │   │   └── knowledge/          # 知识服务 [重命名 service-ts]
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── cases/                  # 案例展示 [重命名 case]
│   │   │   │   ├── page.tsx
│   │   │   │   ├── government/         # 政府行业
│   │   │   │   │   ├── public-security/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── data.ts     # 案例数据
│   │   │   │   │   ├── jiangsu/
│   │   │   │   │   ├── emergency/
│   │   │   │   │   └── business/
│   │   │   │   │
│   │   │   │   ├── enterprise/         # 企业行业
│   │   │   │   │   └── group/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       └── data.ts
│   │   │   │   │
│   │   │   │   ├── education/          # 教育行业
│   │   │   │   │   └── university/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       └── data.ts
│   │   │   │   │
│   │   │   │   └── operator/           # 运营商行业
│   │   │   │       ├── shandong/
│   │   │   │       ├── yunnan/
│   │   │   │       └── document/
│   │   │   │
│   │   │   └── contact/                # 联系我们 [重命名 contact-us]
│   │   │       └── page.tsx
│   │   │
│   │   ├── (admin)/                    # 管理后台路由组 [NEW - 重命名 manage]
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                # 重定向到 dashboard
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── users/                  # 用户管理 [NEW]
│   │   │   │   └── page.tsx
│   │   │   ├── roles/                  # 角色管理
│   │   │   │   └── page.tsx
│   │   │   ├── permissions/            # 权限管理
│   │   │   │   └── page.tsx
│   │   │   ├── profile/                # 个人资料
│   │   │   │   └── page.tsx
│   │   │   └── settings/               # 系统设置 [重命名 theme-config]
│   │   │       └── page.tsx
│   │   │
│   │   ├── (tools)/                    # 工具路由组 [NEW]
│   │   │   └── parser/                 # 解析工具 [重命名 decmer]
│   │   │       ├── page.tsx
│   │   │       └── components/
│   │   │           └── ParseTask.tsx
│   │   │
│   │   ├── api/                        # API 路由
│   │   │   ├── auth/                   # 认证相关
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── permissions/        # 权限查询 [重命名]
│   │   │   │   │   └── route.ts
│   │   │   │   ├── users/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── roles/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── permissions/
│   │   │   │   │       └── route.ts
│   │   │   │   └── token/              # Token 相关 [NEW]
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── applications/           # 应用管理 [重命名 getApplications]
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── files/                  # 文件管理 [NEW]
│   │   │   │   └── [label]/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   └── contact/                # 联系表单 [重命名 submitContact]
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx                  # 根布局
│   │   ├── page.tsx                    # 首页
│   │   ├── not-found.tsx               # 404 页面 [NEW]
│   │   ├── error.tsx                   # 错误页面 [NEW]
│   │   └── loading.tsx                 # 加载页面 [NEW]
│   │
│   ├── components/                     # 组件库 [重构]
│   │   ├── ui/                         # 基础 UI 组件
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── index.ts
│   │   │   │   └── __tests__/
│   │   │   │       └── Button.test.tsx
│   │   │   ├── RouteButton/
│   │   │   │   └── RouteButton.tsx
│   │   │   ├── Loading/                # [NEW]
│   │   │   └── Modal/                  # [NEW]
│   │   │
│   │   ├── common/                     # 通用业务组件
│   │   │   ├── Logo/
│   │   │   │   └── Logo.tsx
│   │   │   ├── FilePreview/
│   │   │   │   └── FilePreview.tsx
│   │   │   ├── Watermark/              # [NEW]
│   │   │   └── LoadingProvider/        # [重命名 LoadingContext]
│   │   │       └── LoadingContext.tsx
│   │   │
│   │   ├── features/                   # 功能模块组件 [重构]
│   │   │   ├── auth/                   # 认证相关 [NEW]
│   │   │   │   └── LoginForm/
│   │   │   │
│   │   │   ├── data-processing/        # 数据处理 [重命名 data-process]
│   │   │   │   ├── FileList/
│   │   │   │   ├── Header/
│   │   │   │   ├── CompareModal/
│   │   │   │   ├── excel/
│   │   │   │   │   ├── ExcelPreview/
│   │   │   │   │   ├── ExcelResult/
│   │   │   │   │   └── ExcelUpload/
│   │   │   │   └── media/
│   │   │   │       ├── AudioPlayer/
│   │   │   │       ├── ContextMenu/
│   │   │   │       ├── CreateMediaTask/
│   │   │   │       └── ...
│   │   │   │
│   │   │   ├── chemical/               # 化学编辑器
│   │   │   │   └── ChemicalEditor/
│   │   │   │       └── ChemicalEditor.tsx
│   │   │   │
│   │   │   ├── cases/                  # 案例展示
│   │   │   │   ├── CaseGrid/
│   │   │   │   └── CaseCarousel/
│   │   │   │
│   │   │   └── navigation/             # 导航相关 [重命名 nav]
│   │   │       └── Nav/
│   │   │           └── Nav.tsx
│   │   │
│   │   └── layouts/                    # 布局组件 [重命名 layout]
│   │       ├── AuthLayout/             # 认证布局
│   │       │   └── AuthLayout.tsx
│   │       ├── PortalLayout/           # 门户布局 [重命名 layout-portal]
│   │       │   ├── PortalLayout.tsx
│   │       │   ├── Header/
│   │       │   ├── Footer/
│   │       │   └── ClientLayout/
│   │       └── AdminLayout/            # 管理后台布局 [重命名 layout-manage]
│   │           ├── AdminLayout.tsx
│   │           ├── Container/
│   │           ├── Header/
│   │           ├── Sidebar/
│   │           └── Menu/
│   │
│   ├── lib/                            # 核心库
│   │   ├── api/                        # API 相关
│   │   │   ├── client/                 # 客户端 API [NEW]
│   │   │   │   ├── auth.ts
│   │   │   │   ├── applications.ts
│   │   │   │   ├── data-processing/
│   │   │   │   │   ├── files.ts
│   │   │   │   │   ├── ocr.ts
│   │   │   │   │   ├── media.ts
│   │   │   │   │   └── translate.ts
│   │   │   │   ├── chemical.ts
│   │   │   │   └── external/           # 外部 API [NEW]
│   │   │   │       └── hj-platform.ts
│   │   │   │
│   │   │   ├── server/                 # 服务端 API [NEW]
│   │   │   │   └── prisma.ts
│   │   │   │
│   │   │   ├── request.ts              # 请求封装
│   │   │   └── config.ts               # API 配置 [NEW]
│   │   │
│   │   ├── db/                         # 数据库 [NEW]
│   │   │   ├── prisma.ts
│   │   │   └── queries/                # 数据库查询 [NEW]
│   │   │       ├── users.ts
│   │   │       ├── roles.ts
│   │   │       └── permissions.ts
│   │   │
│   │   ├── auth/                       # 认证逻辑 [NEW]
│   │   │   ├── jwt.ts
│   │   │   ├── middleware.ts
│   │   │   └── permissions.ts
│   │   │
│   │   ├── store/                      # 状态管理
│   │   │   ├── index.ts
│   │   │   ├── provider.tsx            # [NEW]
│   │   │   ├── hooks.ts                # [NEW]
│   │   │   └── slices/                 # [重命名 features]
│   │   │       ├── user.slice.ts
│   │   │       ├── auth.slice.ts       # [NEW]
│   │   │       └── app.slice.ts        # [NEW]
│   │   │
│   │   ├── utils/                      # 工具函数
│   │   │   ├── format/                 # 格式化工具 [NEW]
│   │   │   │   ├── time.ts
│   │   │   │   ├── number.ts
│   │   │   │   └── string.ts
│   │   │   ├── validation/             # 验证工具 [NEW]
│   │   │   │   └── form.ts
│   │   │   ├── cookies.ts
│   │   │   ├── media.ts                # [重命名 judgementMediaType]
│   │   │   └── file.ts                 # [NEW]
│   │   │
│   │   ├── constants/                  # 常量配置
│   │   │   ├── index.ts
│   │   │   ├── applications.ts
│   │   │   ├── routes.ts               # [NEW]
│   │   │   └── enums.ts                # [NEW]
│   │   │
│   │   └── config/                     # 配置文件 [NEW]
│   │       ├── site.ts                 # 站点配置
│   │       └── navigation.ts           # 导航配置
│   │
│   ├── hooks/                          # 自定义 Hooks
│   │   ├── useInView.ts
│   │   ├── useScrollToTop.ts
│   │   ├── useAuth.ts                  # [NEW]
│   │   ├── useMediaQuery.ts            # [NEW]
│   │   └── useFileUpload.ts            # [NEW]
│   │
│   ├── types/                          # TypeScript 类型定义 [重构]
│   │   ├── index.ts                    # 导出所有类型
│   │   ├── common.ts                   # 通用类型 [NEW]
│   │   ├── api.ts                      # API 类型 [NEW]
│   │   ├── auth/
│   │   │   └── index.ts
│   │   ├── application/
│   │   │   └── index.ts
│   │   ├── data-processing/            # [重命名 data-process]
│   │   │   ├── index.ts
│   │   │   ├── ocr.ts
│   │   │   └── translate.ts
│   │   ├── chemical/
│   │   │   └── index.ts
│   │   ├── excel/
│   │   │   └── index.ts
│   │   └── user/                       # [重命名 profile/manage]
│   │       └── index.ts
│   │
│   ├── styles/                         # 全局样式
│   │   ├── globals.css
│   │   ├── antd-custom.css
│   │   └── themes/                     # 主题样式 [NEW]
│   │       ├── light.css
│   │       └── dark.css
│   │
│   └── middleware.ts                   # Next.js 中间件
│
├── tests/                              # 测试文件 [NEW]
│   ├── unit/                           # 单元测试
│   ├── integration/                    # 集成测试
│   └── e2e/                            # E2E 测试
│
├── docs/                               # 项目文档 [NEW]
│   ├── API.md                          # API 文档
│   ├── ARCHITECTURE.md                 # 架构文档
│   ├── DEPLOYMENT.md                   # 部署文档
│   └── CONTRIBUTING.md                 # 贡献指南
│
├── .env.local                          # 本地环境变量
├── .env.development                    # 开发环境变量
├── .env.production                     # 生产环境变量
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── commitlint.config.js
├── docker-compose.yml
├── Dockerfile
├── ecosystem.config.js
├── eslint.config.mjs
├── jest.config.js
├── jest.setup.js
├── next-env.d.ts
├── next.config.ts
├── nginx.conf
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🔄 主要变更说明

### 1. **App Router 结构优化**

#### 使用路由组 (Route Groups)
```
✅ 优化后：使用路由组清晰分离不同模块
(auth)/     - 认证相关路由
(portal)/   - 门户展示路由  
(admin)/    - 管理后台路由
(tools)/    - 工具类路由
```

**优势：**
- 不影响 URL 结构
- 共享布局更清晰
- 模块边界明确

#### 路由命名规范化
```diff
- /portal/service/service-app/      → /portal/services/applications/
- /portal/service/service-data/     → /portal/services/data/
- /portal/service/service-model/    → /portal/services/models/
- /portal/service/service-ts/       → /portal/services/knowledge/
- /portal/case/                     → /portal/cases/
- /portal/contact-us/               → /portal/contact/
- /manage/                          → /admin/
- /decmer/                          → /tools/parser/
```

### 2. **Public 目录重构**

#### 问题
- 包含大量测试文档和临时文件
- 图片、视频、文档混在一起
- 没有明确的资源分类

#### 解决方案
```
public/
├── assets/
│   ├── images/          # 所有图片按用途分类
│   │   ├── logos/
│   │   ├── icons/
│   │   ├── cases/
│   │   ├── services/
│   │   └── banners/
│   ├── videos/
│   ├── audio/
│   └── documents/       # 仅保留必要的示例文档
│       └── samples/
├── fonts/
├── bcmaps/
└── workers/
```

**建议：**
- 将所有解析示例文档移至 `/tests/fixtures/` 或单独的测试数据目录
- 生产环境的示例文件保留在 `public/assets/documents/samples/`

### 3. **组件架构优化**

```
src/components/
├── ui/                  # 纯 UI 组件（无业务逻辑）
│   ├── Button/
│   ├── Modal/
│   └── Loading/
│
├── common/              # 通用业务组件
│   ├── Logo/
│   ├── FilePreview/
│   └── LoadingProvider/
│
├── features/            # 功能模块组件（按业务领域）
│   ├── auth/
│   ├── data-processing/
│   ├── chemical/
│   ├── cases/
│   └── navigation/
│
└── layouts/             # 布局组件
    ├── AuthLayout/
    ├── PortalLayout/
    └── AdminLayout/
```

**组件组织原则：**
- 每个组件一个文件夹
- 包含组件文件、样式、类型定义、测试
- 导出通过 index.ts 统一管理

### 4. **API 层重构**

```
src/lib/api/
├── client/              # 客户端 API 调用
│   ├── auth.ts
│   ├── applications.ts
│   ├── data-processing/
│   └── external/        # 外部 API（如浩鲸平台）
│
├── server/              # 服务端 API
│   └── prisma.ts
│
├── request.ts           # 统一请求封装
└── config.ts            # API 配置
```

**变更：**
- 原 `src/apis/` → `src/lib/api/client/`
- 客户端/服务端 API 分离
- 按功能模块组织，而非平铺

### 5. **类型定义优化**

```
src/types/
├── index.ts             # 统一导出
├── common.ts            # 通用类型
├── api.ts               # API 相关类型
├── auth/
├── application/
├── data-processing/     # 重命名 data-process
├── chemical/
├── excel/
└── user/                # 合并 profile/ 和 manage/
```

**改进：**
- 添加 `common.ts` 存放通用类型（Response、Pagination 等）
- 添加 `api.ts` 存放 API 相关类型
- 统一通过 `index.ts` 导出

### 6. **工具函数优化**

```
src/lib/utils/
├── format/              # 格式化工具
│   ├── time.ts
│   ├── number.ts
│   └── string.ts
├── validation/          # 验证工具
├── cookies.ts
├── media.ts            # 重命名 judgementMediaType
└── file.ts
```

### 7. **状态管理优化**

```
src/lib/store/
├── index.ts
├── provider.tsx        # Redux Provider 组件
├── hooks.ts            # 类型安全的 hooks
└── slices/             # 重命名 features
    ├── user.slice.ts
    ├── auth.slice.ts
    └── app.slice.ts
```

### 8. **数据库层分离**

```
src/lib/db/
├── prisma.ts           # Prisma 客户端
└── queries/            # 数据库查询逻辑
    ├── users.ts
    ├── roles.ts
    └── permissions.ts
```

**优势：**
- 数据库查询逻辑与 API 路由分离
- 便于复用和测试
- 符合 Repository 模式

### 9. **认证逻辑模块化**

```
src/lib/auth/
├── jwt.ts              # JWT 处理
├── middleware.ts       # 认证中间件逻辑
└── permissions.ts      # 权限验证
```

### 10. **测试文件组织**

```
tests/
├── unit/               # 单元测试
│   ├── utils/
│   └── hooks/
├── integration/        # 集成测试
│   └── api/
└── e2e/                # E2E 测试
    └── portal/

# 组件测试放在组件旁边
src/components/ui/Button/
└── __tests__/
    └── Button.test.tsx
```

---

## 📝 命名规范

### 1. 文件命名
```
✅ 推荐：
- 组件文件：PascalCase (Button.tsx, UserProfile.tsx)
- 工具函数：camelCase (formatTime.ts, validation.ts)
- 类型文件：camelCase (user.types.ts, api.types.ts)
- 常量文件：camelCase (constants.ts, config.ts)
- 测试文件：*.test.ts / *.spec.ts

❌ 避免：
- 混合使用 kebab-case 和 camelCase
```

### 2. 目录命名
```
✅ 推荐：
- kebab-case: data-processing/, user-profile/
- 路由组: (auth)/, (portal)/, (admin)/

❌ 避免：
- camelCase: dataProcessing/
- PascalCase: UserProfile/
```

### 3. 路由命名
```
✅ 推荐：
- /services/applications/
- /services/data/processing/
- /admin/users/

❌ 避免：
- /service/service-app/
- /manage/profile/
```

---

## 🚀 迁移步骤

### 阶段 1：准备工作 ✅
1. 创建新的目录结构
2. 备份当前代码
3. 创建迁移脚本

### 阶段 2：Public 目录重构
1. 创建 `public/assets/` 结构
2. 按分类移动图片资源
3. 移动/删除测试文档

### 阶段 3：组件迁移
1. 重构 `components/` 目录结构
2. 统一组件导出方式
3. 更新所有组件引用

### 阶段 4：API 层重构
1. 创建 `lib/api/client/` 和 `lib/api/server/`
2. 迁移 `src/apis/` 到新结构
3. 更新 API 调用引用

### 阶段 5：路由重构
1. 创建路由组
2. 重命名路由目录
3. 更新内部链接

### 阶段 6：类型定义优化
1. 合并和重组类型文件
2. 创建统一导出
3. 更新类型引用

### 阶段 7：测试和验证
1. 运行测试套件
2. 检查所有路由
3. 验证构建

---

## 📚 最佳实践建议

### 1. 组件开发
```typescript
// 组件目录结构示例
components/ui/Button/
├── Button.tsx          // 组件实现
├── Button.module.css   // 样式
├── Button.types.ts     // 类型定义
├── index.ts            // 导出
└── __tests__/
    └── Button.test.tsx // 测试

// index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

### 2. API 调用
```typescript
// lib/api/client/users.ts
import { request } from '../request';
import type { User, GetUsersResponse } from '@/types';

export const usersApi = {
  getAll: () => request.get<GetUsersResponse>('/api/users'),
  getById: (id: string) => request.get<User>(`/api/users/${id}`),
  create: (data: CreateUserDto) => request.post<User>('/api/users', data),
};

// 使用
import { usersApi } from '@/lib/api/client/users';

const users = await usersApi.getAll();
```

### 3. 数据库查询
```typescript
// lib/db/queries/users.ts
import { prisma } from '../prisma';

export const userQueries = {
  findById: async (id: string) => {
    return prisma.user.findUnique({ where: { id } });
  },
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },
};
```

### 4. 类型定义
```typescript
// types/common.ts
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

// types/index.ts
export * from './common';
export * from './auth';
export * from './user';
// ...
```

### 5. 环境变量管理
```bash
# .env.local
DATABASE_URL="mysql://..."
NEXT_PUBLIC_API_URL="http://localhost:3000"
JWT_SECRET="your-secret"

# .env.development
NEXT_PUBLIC_API_URL="http://dev.example.com"

# .env.production
NEXT_PUBLIC_API_URL="https://api.example.com"
```

### 6. 路径别名配置
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

---

## 🔍 代码质量检查清单

### 迁移完成后检查：

- [ ] 所有路由正常访问
- [ ] 所有 API 调用正常
- [ ] 图片资源正确加载
- [ ] 所有测试通过
- [ ] 构建成功（`npm run build`）
- [ ] ESLint 无错误
- [ ] TypeScript 类型检查通过
- [ ] 无 console 错误或警告
- [ ] 性能指标正常
- [ ] SEO 元数据正确

---

## 📖 参考文档

- [Next.js App Router 官方文档](https://nextjs.org/docs/app)
- [Next.js 项目结构最佳实践](https://nextjs.org/docs/getting-started/project-structure)
- [React 组件设计模式](https://reactpatterns.com/)
- [TypeScript 最佳实践](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

## 💡 额外建议

### 1. 考虑引入的工具

#### 代码生成器
```bash
# Plop.js - 组件模板生成
npm install --save-dev plop
```

#### API 类型自动生成
```bash
# 如果后端提供 OpenAPI/Swagger
npm install --save-dev openapi-typescript
```

#### 路径别名辅助
```bash
# 自动生成路径别名
npm install --save-dev tsconfig-paths
```

### 2. Git 提交建议

建议将重构拆分为多个小的 commit：
```
feat: restructure public assets directory
feat: reorganize component architecture  
feat: refactor API layer structure
feat: implement route groups
feat: optimize type definitions
refactor: rename routes for consistency
docs: update README with new structure
```

### 3. 文档更新

迁移完成后需要更新的文档：
- [ ] README.md - 项目结构说明
- [ ] ARCHITECTURE.md - 架构文档
- [ ] API.md - API 文档
- [ ] 组件文档（Storybook）

### 4. 性能优化建议

```typescript
// 使用动态导入优化首屏加载
const ChemicalEditor = dynamic(
  () => import('@/components/features/chemical/ChemicalEditor'),
  { ssr: false }
);

// 图片优化
import Image from 'next/image';

<Image
  src="/assets/images/logos/h3c-logo.webp"
  alt="H3C Logo"
  width={200}
  height={50}
  priority
/>
```

---

## ⚠️ 注意事项

1. **渐进式迁移**：不要一次性重构所有代码，按模块逐步迁移
2. **保持向后兼容**：迁移期间可能需要保留旧路由的重定向
3. **测试覆盖**：每完成一个模块迁移都要进行测试
4. **团队沟通**：确保团队成员了解新的目录结构和命名规范
5. **文档同步**：及时更新项目文档

---

## 🎯 预期收益

### 1. 开发体验提升
- 文件查找更快速
- 模块边界更清晰
- 代码复用更容易

### 2. 维护成本降低
- 目录结构更直观
- 命名规范统一
- 易于新人上手

### 3. 代码质量提升
- 更好的类型安全
- 更清晰的依赖关系
- 更容易进行测试

### 4. 性能优化空间
- 更细粒度的代码分割
- 更好的 Tree Shaking
- 更优化的构建产物

---

**最后更新时间：** 2025-10-10
**版本：** 1.0.0

