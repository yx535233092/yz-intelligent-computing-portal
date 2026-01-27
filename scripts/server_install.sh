#!/bin/bash

# 服务器部署脚本
# 请将此脚本与 yz-portal-h3c.tar.gz 和 project_configs.tar.gz 放在同一目录下运行

IMAGE_FILE="yz-portal-h3c.tar.gz"
CONFIG_FILE="project_configs.tar.gz"

echo "🚀 开始服务器部署..."

# 1. 解压配置文件
if [ -f "$CONFIG_FILE" ]; then
    echo "📂 解压配置文件..."
    tar -xzvf "$CONFIG_FILE"
else
    echo "❌ 未找到配置文件: $CONFIG_FILE"
    exit 1
fi

# 2. 导入 Docker 镜像
if [ -f "$IMAGE_FILE" ]; then
    echo "🐳 正在导入 Docker 镜像 (可能需要几分钟)..."
    gunzip -c "$IMAGE_FILE" | docker load
else
    echo "⚠️  未找到镜像包: $IMAGE_FILE (将尝试从仓库拉取或构建，但这可能会失败)"
fi

# 3. 设置权限
echo "🔒 设置 Prisma 目录权限..."
# 确保容器内的非 root 用户可以写入 SQLite 数据库
chmod -R 777 prisma

# 4. 启动服务
echo "▶️  启动 Docker 服务..."
# 停止旧服务（如果有）
docker compose down
# 启动新服务
docker compose up -d

echo "✅ 部署完成！"
echo "请检查服务状态: docker compose ps"
