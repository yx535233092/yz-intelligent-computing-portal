# ============================================
# Stage 1: 依赖安装阶段
# ============================================
FROM node:20-bookworm-slim AS deps

WORKDIR /app

# 更换国内源 (阿里云) 以加速构建
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources

# 安装必要的系统依赖（用于 Prisma 和原生模块编译）
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖相关文件
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# 使用阿里镜像源加速 npm 安装
RUN npm config set registry https://registry.npmmirror.com

# 安装所有依赖（包括 devDependencies，因为构建需要它们）
# 使用 --legacy-peer-deps 跳过 peer dependency 冲突（ketcher-react 需要 React 18，项目用 React 19）
RUN npm ci --legacy-peer-deps

# 生成 Prisma Client
RUN npx prisma generate

# ============================================
# Stage 2: 构建阶段
# ============================================
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/src/generated ./src/generated

# 复制源代码
COPY . .

# 设置构建时环境变量
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL="file:/app/prisma/sqlite.db"
# 增加 Node.js 内存限制以防止构建时崩溃
ENV NODE_OPTIONS="--max-old-space-size=4096"

# 构建 Next.js 应用
RUN npm run build

# ============================================
# Stage 3: 生产运行阶段
# ============================================
FROM node:20-bookworm-slim AS runner

WORKDIR /app

# 更换国内源 (阿里云) 以加速构建
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources

# 安装运行时必要的系统依赖
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 创建非 root 用户以提高安全性
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="file:/app/prisma/sqlite.db"

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 复制 Prisma 相关文件（用于数据库操作）
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/src/generated ./src/generated

# 复制 prisma 数据库文件
COPY --from=builder /app/prisma/sqlite.db ./prisma/sqlite.db

# 设置目录权限
RUN chown -R nextjs:nodejs /app

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

# 启动应用
CMD ["node", "server.js"]

