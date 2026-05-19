# 智算专业门户

一个面向 AI 智算服务展示、应用承载、数据处理与管理运维的一体化门户项目。项目采用 `Next.js App Router` 构建门户站点与管理后台，结合 `Prisma + PostgreSQL` 提供数据层支持，并通过独立的 `Python` 服务处理 Excel 解析等专项能力。

## 项目定位

本项目主要覆盖以下几类场景：

- 门户展示：展示智能问答、智能文档、智能问数、智能办公等 AI 应用能力
- 应用承载：以统一入口承载多个具体应用，并支持按权限访问
- 数据服务：提供文档、表格、媒体等多模态数据处理能力
- 管理后台：支持应用、用户、角色、权限、访问监控等管理功能
- 业务接入：支持联系咨询、登录认证、权限校验、访问统计等通用业务

## 技术栈

- 前端框架：`Next.js 15`、`React 19`、`TypeScript`
- UI 组件：`Ant Design 5`
- 样式方案：`Tailwind CSS 4`、局部 `CSS Module`
- 状态管理：`Redux Toolkit`、`redux-persist`
- 请求与鉴权：`axios`、`jose`、`jsonwebtoken`、`bcryptjs`
- 数据层：`Prisma`、`PostgreSQL`
- 构建与运行：`Docker`、`Docker Compose`、`PM2`、`Nginx`
- 工具链：`ESLint`、`Prettier`、`Husky`、`lint-staged`、`Jest`
- 文件与解析能力：`pdfjs-dist`、`xlsx`、`exceljs`、`@js-preview/*`
- 额外能力：`ketcher` 化学结构编辑、`three.js`、`@gradio/client`
- Python 服务：`FastAPI` / `Pandas` 的 Excel 解析微服务

## 功能模块

### 门户端

- `首页`：介绍核心场景、案例、能力服务、咨询服务
- `智能应用服务`：展示并承载可跳转的应用列表，支持按场景分类
- `智能文档服务`：文档类 AI 场景介绍与能力展示
- `数据服务`：文档解析、表格识别、媒体处理等多模态能力
- `模型服务`：模型训练、推理、部署相关服务介绍
- `咨询与培训服务`：架构设计、训推指导、应用支撑、专项培训
- `行业案例`：政府、运营商、企业、教育、能源、医疗等案例展示
- `联系咨询`：在线表单提交，进入咨询流程
- `通用应用页`：按 `id` 渲染具体应用详情页

### 管理端

- `仪表盘`：访问量、热门路径、平均使用时长等统计
- `应用管理`：应用增删改查、排序、公开/鉴权配置
- `用户管理`：用户信息、状态、角色关联管理
- `角色管理`：角色维护、权限分配
- `权限管理`：权限项维护与关联查看
- `访问监控`：访问日志、停留时长、IP、浏览器环境等
- `个人中心`：个人信息查看与维护
- `主题配置`：后台主题相关配置入口

### 接口层

项目在 `src/app/api` 下提供了多组 API 路由，主要包括：

- 认证登录与权限：`/api/auth/login`、`/api/auth/getUserPermissions`、`/api/auth/permission`、`/api/auth/users`、`/api/auth/users/roles`、`/api/auth/role`、`/api/auth/role/permissions`
- 应用与页面数据：`/api/applications`、`/api/applications/[id]`、`/api/getApplications`、`/api/getFileListByLabel`
- 业务提交与统计：`/api/submitContact`、`/api/monitoring/visit`、`/api/getAccessToken`

## 本地开发

本地开发保留两种方式：

1. 前端和 Python 服务源码直接跑，基础设施通过 Docker 启动。
2. 上生产环境前，在本地模拟 Docker 启动整套服务。

### 1. 日常开发：源码直跑 + PostgreSQL 走 Docker

适合日常功能开发、页面调试、接口联调和 Python 服务调试。这个模式下，前端和 Python 服务直接运行源码，数据库等基础设施通过 Docker 起。

建议的启动方式：

1. 先启动 PostgreSQL 容器，确保数据库地址可用。
2. 再启动 Python 服务，用于 Excel 解析等后端能力。
3. 最后启动前端开发服务，进行页面开发和接口调试。

推荐的本地流程：

```bash
# 1) 启动 PostgreSQL
docker compose up -d db

# 2) 启动 Python 服务
cd python_service
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 29000

# 3) 启动前端
cd ..
npm install
npm run dev
```

这个模式下需要关注的环境变量主要是：

- `DATABASE_URL`：指向本地 PostgreSQL，通常是 `postgresql://postgres:postgres@localhost:5432/yz-portal`
- `AUTH_SERVICE_URL`：认证服务地址，当前默认是 `http://localhost:20080`
- `NEXT_PUBLIC_API_URL`：前端请求基础路径，当前默认是 `/`

### 2. 联调/上线前验证：本地模拟 Docker

适合在上线前验证容器启动链路、服务依赖关系和整体部署方式。这个模式更接近生产环境，重点是确认 `docker compose` 下各服务能否正常联动，而不是源码级调试。

建议的启动方式：

1. 先准备好镜像或本地构建镜像。
2. 再用 `docker compose up -d` 拉起整套服务。
3. 通过容器日志和对外访问地址确认服务是否正常。

推荐的本地流程：

```bash
docker compose up -d
```

这个模式下主要验证以下内容：

- `web` 前端容器是否能正常启动
- `python-api` 是否能正常提供服务
- `db` 是否能正常初始化并保持健康
- `nginx` 是否能正确转发请求
- 前端、认证服务、数据库、Python 服务之间的调用链是否正常

如果你只是想验证容器编排和服务联动，这种方式会更接近线上环境。

## 部署方式

### 1. Docker Compose 镜像部署

当前项目的实际部署方式是：

1. 在本地先构建镜像。
2. 将镜像文件和部署必备文件上传到服务器。
3. 服务器执行 `docker load` 导入镜像。
4. 服务器使用 `docker compose` 启动整套服务。

本地构建示例：

```bash
docker build -t h3c-portal-web:latest .
docker build -t h3c-portal-python:latest ./python_service
docker save -o h3c-portal-images.tar h3c-portal-web:latest h3c-portal-python:latest
```

上传到服务器的内容建议至少包含：

- `h3c-portal-images.tar`
- `docker-compose.yml`
- `nginx/nginx.conf`
- `.env` 或 `.env.production`
- `data/postgres_data/` 目录

服务器启动示例：

```bash
docker load -i h3c-portal-images.tar
docker compose up -d
```

对外端口约定：

- `80`：Nginx 入口
- `5432`：PostgreSQL
- `3000`：Web 服务容器内部端口
- `9000`：Python 服务容器内部暴露端口

说明：

- 如果你希望服务器只依赖镜像而不参与源码构建，`docker-compose.yml` 里的 `web` 和 `python-api` 服务需要使用 `image:` 引用已导入的镜像。
- 如果继续使用当前仓库里的 `build:` 配置，`docker compose up -d` 仍可能尝试在服务器侧重新构建镜像。

### 2. Python 数据解析服务

`python_service/README.md` 中描述了独立启动方式，主要用于 Excel 解析。

```bash
cd python_service
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 29000
```

在当前 `docker-compose.yml` 中，该服务以 `python-api` 的形式参与联动部署。

### 3. 当前线上部署状态

线上项目文件夹地址：

- 认证服务 /root/workspace-yx/software/h3c-auth/
- 项目 /root/workspace-yx/software/yz-portal/

目前线上环境只需要启动 `h3c-auth` 和 `yz-portal` 这两个 `docker compose` 项目即可，其他服务不影响当前门户的主流程。

服务器上的服务状态示例：

```bash
docker compose ls
NAME                STATUS              CONFIG FILES
h3c-auth            running(4)          /root/workspace-yx/software/h3c-auth/docker-compose.yml
yz-portal           running(4)          /root/workspace-yx/software/yz-portal/docker-compose.yml
```

其中：

- `h3c-auth`：认证服务
- `yz-portal`：门户主服务

## 必备文件

以下文件/目录是这个项目运行和部署时最关键的部分：

- [package.json](./package.json)：项目脚本、依赖和工具链配置
- [next.config.ts](./next.config.ts)：Next.js 构建与输出配置
- [tsconfig.json](./tsconfig.json)：TypeScript 编译配置
- [.env](./.env)：默认环境变量示例
- [.env.development](./.env.development)：开发环境变量
- [.env.production](./.env.production)：生产环境变量
- [prisma/schema.prisma](./prisma/schema.prisma)：数据库模型定义
- [Dockerfile](./Dockerfile)：Web 服务镜像构建文件
- [python_service/Dockerfile](./python_service/Dockerfile)：Python 服务镜像构建文件
- [docker-compose.yml](./docker-compose.yml)：整套联动部署文件
- [ecosystem.config.js](./ecosystem.config.js)：PM2 启动配置
- [python_service/README.md](./python_service/README.md)：Python 服务说明
- [nginx/nginx.conf](./nginx/nginx.conf)：反向代理配置
- `src/app/`：页面路由与 API 路由
- `src/components/`：通用组件与业务组件
- `src/lib/`：请求封装、状态管理、工具函数
- `src/apis/`：前端调用后端接口的封装层
- `public/`：静态资源、案例图片、文档样例、上传文件
- `data/postgres_data/`：Docker Compose 运行时使用的 PostgreSQL 数据目录
- `data/legacy/`：脚本迁移用的 SQLite 数据文件
- `addtionnal/`：历史备份、导出物、临时产物等非运行必需文件

## 目录结构

```text
.
├─ src/
│  ├─ app/                # Next.js App Router 页面与 API
│  ├─ components/         # 通用组件、布局、业务组件
│  ├─ lib/                # 请求封装、store、工具函数
│  ├─ apis/               # 接口调用封装
│  ├─ hooks/              # 自定义 Hooks
│  ├─ types/              # TypeScript 类型定义
│  └─ styles/             # 全局样式与公共样式
├─ public/                # 图片、PDF、音视频等静态资源
├─ prisma/                # Prisma schema、迁移、数据库相关文件
├─ python_service/        # Python 解析服务
├─ nginx/                 # Nginx 反向代理配置
├─ scripts/               # 数据迁移、校验、初始化脚本
├─ Dockerfile             # Web 镜像构建
├─ docker-compose.yml     # 联合部署
├─ ecosystem.config.js    # PM2 配置
└─ package.json           # 依赖与脚本
```

## 常用脚本

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## 环境变量

当前仓库中常见的环境变量包括：

- `NEXT_PUBLIC_API_URL`
- `DATABASE_URL`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `JWT_SECRET`
- `AUTH_SERVICE_URL`

开发和生产环境建议分开维护，至少保证以下内容正确：

- 数据库连接地址
- JWT 密钥
- 认证服务地址
- 前端 API 基础路径

## 说明

- 项目使用 `App Router`，页面主要集中在 `src/app/`
- 管理端和门户端共用同一套认证与数据层
- 静态资源已经按用途放在 `public/assets`、`public/documents`、`public/uploads`
- 如果要新增功能，优先复用现有的 `apis/`、`components/`、`lib/` 结构
