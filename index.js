const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let todos = [
  { id: 1, text: '欢迎使用 Claude Code！', completed: false },
  { id: 2, text: '体验AI辅助编程', completed: false }
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = req.body.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ success: true });
});

// 阿里云函数计算处理器
exports.handler = async (req, res, context) => {
  return new Promise((resolve, reject) => {
    // 将阿里云的请求转换为 Express 格式
    const mockReq = {
      method: req.method,
      url: req.path + (req.queryString ? '?' + req.queryString : ''),
      headers: req.headers,
      body: req.body
    };

    const mockRes = {
      statusCode: 200,
      headers: {},
      body: '',
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.headers['Content-Type'] = 'application/json';
        this.body = JSON.stringify(data);
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body
        });
      },
      send: function(data) {
        this.body = data;
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body
        });
      }
    };

    // 处理请求
    if (mockReq.url.startsWith('/api/')) {
      // API 请求
      app(mockReq, mockRes);
    } else {
      // 静态文件请求
      const fs = require('fs');
      let filePath = mockReq.url === '/' ? '/index.html' : mockReq.url;
      filePath = path.join(__dirname, 'public', filePath);

      try {
        const content = fs.readFileSync(filePath);
        const ext = path.extname(filePath);
        const contentType = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css'
        }[ext] || 'text/plain';

        resolve({
          statusCode: 200,
          headers: { 'Content-Type': contentType },
          body: content.toString()
        });
      } catch (error) {
        resolve({
          statusCode: 404,
          headers: { 'Content-Type': 'text/plain' },
          body: 'File not found'
        });
      }
    }
  });
};

// 本地开发时的启动
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
}