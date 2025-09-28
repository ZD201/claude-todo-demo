# Claude Code 项目配置

## 项目信息
- **项目名称**: Claude Demo Todo App
- **类型**: 全栈 Web 应用
- **技术栈**: Node.js + Express.js + 原生前端
- **端口**: 3000

## 项目结构
```
├── server.js          # Express 服务器入口
├── package.json        # 项目依赖配置
├── public/            # 静态文件目录
│   ├── index.html     # 主页面
│   └── script.js      # 前端 JavaScript
└── CLAUDE.md          # Claude Code 配置文件
```

## 开发命令
- **启动开发服务器**: `npm start` 或 `npm run dev`
- **安装依赖**: `npm install`

## 开发规范
- 使用中文注释和变量命名（适合中文用户）
- 保持代码简洁，适合演示用途
- API 路径统一使用 `/api/` 前缀
- 前端使用原生 JavaScript，避免引入复杂框架

## API 端点
- `GET /api/todos` - 获取所有待办事项
- `POST /api/todos` - 创建新待办事项
- `PUT /api/todos/:id` - 更新待办事项状态
- `DELETE /api/todos/:id` - 删除待办事项

## 特殊说明
- 数据存储在内存中（重启服务器会丢失数据）
- 这是一个演示项目，重点展示 Claude Code 的能力
- 前端样式使用渐变背景和现代化设计

## 测试说明
- 可以通过 curl 命令测试 API：
  ```bash
  curl http://localhost:3000/api/todos
  ```
- 在浏览器中访问 http://localhost:3000 测试完整功能

## Claude 工作提示
- 修改代码时保持现有的中文本地化风格
- 添加新功能时遵循 RESTful API 设计
- 前端修改需要考虑响应式设计
- 服务器重启命令：停止当前进程后运行 `npm start`