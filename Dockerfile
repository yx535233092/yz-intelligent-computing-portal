# 使用 Node.js 20 基础镜像
FROM node:20-alpine AS deps
WORKDIR /app

# 安装构建原生模块所需的依赖
RUN apk add --no-cache build-base python3

# 复制 package 文件
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# 复制源代码并构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# 运行镜像
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]
