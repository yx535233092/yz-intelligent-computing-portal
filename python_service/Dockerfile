# 使用官方 Python 轻量级镜像
FROM --platform=linux/amd64 python:3.9-slim

# 设置工作目录
WORKDIR /app

# 安装系统依赖 (ffmpeg)
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 安装依赖
# 使用清华源加速安装（可选）
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 复制服务代码
COPY . .

# 暴露端口
EXPOSE 9000

# 启动命令
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]
