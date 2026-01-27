#!/bin/bash

# 设置变量
IMAGE_NAME="yz-portal-h3c"
IMAGE_TAG="latest"
EXPORT_FILE="yz-portal-h3c.tar.gz"
CONFIG_ARCHIVE="project_configs.tar.gz"

echo "🚀 开始构建流程..."

# 1. 构建 AMD64 架构的 Docker 镜像 (即使在 Mac M1/M2 上也能运行)
echo "📦 正在构建 Linux/AMD64 镜像 (显示详细日志，请耐心等待)..."
docker buildx build --platform linux/amd64 -t ${IMAGE_NAME}:${IMAGE_TAG} --progress=plain --load .

if [ $? -ne 0 ]; then
    echo "❌ 镜像构建失败！"
    exit 1
fi

# 2. 导出镜像为压缩包
echo "💾 正在导出应用镜像到 ${EXPORT_FILE}..."
docker save ${IMAGE_NAME}:${IMAGE_TAG} | gzip > ${EXPORT_FILE}

echo "⬇️  正在拉取 AMD64 架构的 Nginx 镜像..."
docker pull --platform linux/amd64 nginx:stable-alpine

echo "💾 正在导出 Nginx 镜像到 nginx-stable-alpine.tar.gz..."
docker save nginx:stable-alpine | gzip > nginx-stable-alpine.tar.gz

# 3. 打包必要的配置文件和数据库
echo "🗂️  正在打包配置文件..."
tar -czvf ${CONFIG_ARCHIVE} \
    docker-compose.yml \
    nginx.prod.conf \
    .env \
    prisma/

echo "✅ 打包完成！"
echo "--------------------------------------------------------"
echo "生成的部署文件："
echo "1. ${EXPORT_FILE} (应用镜像)"
echo "2. nginx-stable-alpine.tar.gz (Nginx 镜像)"
echo "3. ${CONFIG_ARCHIVE} (配置)"
echo "--------------------------------------------------------"
echo "接下来请使用 SCP 上传这些文件到服务器，并在服务器上导入："
echo "docker load < nginx-stable-alpine.tar.gz"

