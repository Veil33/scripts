# 影视库网站

一个简洁的影视展示网站，支持电影、电视剧、动漫的展示和搜索。

## 技术栈

- **前端**: React + Vite + TypeScript
- **后端**: Node.js + Express + TypeScript
- **数据库**: SQLite

## 功能特性

- ✅ 首页展示影视列表和海报
- ✅ 支持分类筛选：电影 / 电视剧 / 动漫
- ✅ 支持按标题搜索
- ✅ 详情页展示完整信息
- ✅ 响应式布局，适配移动端
- ✅ 简洁的影视海报展示风格

## 项目结构

```
movie-library/
├── frontend/          # React 前端
├── backend/           # Express 后端
├── data/             # SQLite 数据库文件
├── scripts/          # 同步脚本目录（预留）
└── start.sh          # 一键启动脚本
```

## 快速开始

### 1. 安装依赖

```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

### 2. 初始化数据库

```bash
cd backend
npm run build
npm run init-db
```

### 3. 启动服务

#### 方法一：一键启动（推荐）
```bash
cd movie-library
./start.sh
```

#### 方法二：分别启动
```bash
# 启动后端（端口 3001）
cd backend
npm run dev

# 启动前端（端口 3000）
cd frontend
npm run dev
```

### 4. 访问网站

- 前端地址: http://localhost:3000
- 后端API: http://localhost:3001

## API 接口

### 获取影视列表
```
GET /api/items
参数:
  - type: movie|tv|anime (可选)
  - keyword: 搜索关键词 (可选)
```

### 获取影视详情
```
GET /api/items/:id
```

## 数据模型

```typescript
interface MovieItem {
  id: number
  title: string        // 标题
  type: 'movie' | 'tv' | 'anime'  // 类型
  poster: string       // 海报图片URL
  year: number         // 年份
  genres: string       // 类型标签，逗号分隔
  summary: string      // 简介
  rating?: number      // 评分（可选）
  source: string       // 数据来源
  source_id: string    // 源ID
  updated_at: string   // 更新时间
}
```

## 后续扩展

### 数据同步
- 在 `scripts/` 目录下添加同步脚本
- 支持定时任务自动同步外部数据源
- 预留了 `source` 和 `source_id` 字段用于数据关联

### 部署到 Serv00
1. 构建前端: `cd frontend && npm run build`
2. 构建后端: `cd backend && npm run build`
3. 上传 `backend/dist` 和 `frontend/dist` 到 Serv00
4. 配置 SQLite 数据库路径
5. 设置 Node.js 应用端口

## 开发说明

### 代码规范
- TypeScript 严格模式
- 响应式设计优先
- 组件化开发
- CSS 模块化

### 添加新功能
1. 后端：在 `backend/src/routes/` 添加新路由
2. 前端：在 `frontend/src/pages/` 添加新页面
3. 数据库：修改 `backend/src/models/database.ts`

## 注意事项

- 海报图片使用 Unsplash 示例图片，实际使用时需要替换
- 数据库文件位于 `data/movie_library.db`
- 前端通过代理配置访问后端 API
- 支持 CORS 跨域访问

## 许可证

MIT License