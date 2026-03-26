#!/bin/bash

# 影视库网站启动脚本

echo "正在启动影视库网站..."

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null; then
    echo "错误: 未安装 Node.js"
    exit 1
fi

# 检查是否安装了 npm
if ! command -v npm &> /dev/null; then
    echo "错误: 未安装 npm"
    exit 1
fi

# 初始化数据库
echo "正在初始化数据库..."
cd backend
npm run build
npm run init-db

# 启动后端服务器
echo "正在启动后端服务器..."
npm run dev &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动前端开发服务器
cd ../frontend
echo "正在启动前端开发服务器..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "影视库网站已启动！"
echo "前端地址: http://localhost:3000"
echo "后端API: http://localhost:3001"
echo ""
echo "按 Ctrl+C 停止服务"

# 捕获 Ctrl+C 并停止所有服务
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# 等待任意子进程退出
wait