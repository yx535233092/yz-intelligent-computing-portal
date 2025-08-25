#!/bin/bash

REPO_URL_GITEE="https://gitee.com/yx0208/yz-intelligent-computing-portal.git"

echo "--------------------------------"
echo "当前项目列表"
echo "---------------------------------"
echo "1.智算服务平台"
echo "q.退出"
echo "---------------------------------"

read -p "请选择部署项目（输入项目序号）：" project_num

case $project_num in
  q)
    echo "退出"
    ;;
  *)
    read -p "请输入部署路径：" deploy_path
    if [ -d "$deploy_path" ]; then
      echo "部署路径存在，开始拉取仓库代码"
      git clone $REPO_URL_GITEE $deploy_path
      cd $deploy_path
      echo "拉取仓库代码完成"
      echo "开始安装依赖"
      # 详细输出安装过程
      npm install --loglevel verbose
      echo "安装依赖完成"
      echo "开始构建项目"
      npm run build
      echo "构建项目完成"
      echo "开始启动项目"
      npm run start
      echo "启动项目完成"
    else
      echo "部署路径不存在"
    fi
    ;;
esac