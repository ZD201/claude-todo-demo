# Claude Code 配置说明

## 项目级配置

本项目在 `.claude/settings.local.json` 中包含了项目级的 Claude Code 配置。

### API 配置

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "your-api-key-here",
    "ANTHROPIC_BASE_URL": "https://api.anthropic.com",
    "CLAUDE_API_PROXY": "https://your-proxy-url.com"
  },
  "model": "claude-3-5-sonnet-20241022"
}
```

### 使用方法

1. **设置 API 密钥**
   ```json
   "ANTHROPIC_API_KEY": "sk-ant-api03-xxx"
   ```

2. **使用中转服务**（可选）
   ```json
   "ANTHROPIC_BASE_URL": "https://your-proxy.com/v1",
   "CLAUDE_API_PROXY": "https://your-proxy.com"
   ```

3. **切换模型**（可选）
   ```json
   "model": "claude-3-haiku-20240307"
   ```

### 优势

- ✅ **项目隔离**: 每个项目使用独立配置
- ✅ **版本控制**: 可以将配置（除密钥外）加入Git
- ✅ **团队协作**: 团队成员可以共享相同的模型和设置
- ✅ **快速切换**: 不同项目使用不同API或中转服务

### 安全建议

- 🔐 将包含真实API密钥的配置文件加入 `.gitignore`
- 🔐 使用环境变量或密钥管理工具
- 🔐 定期轮换API密钥

### 全局 vs 项目配置

| 配置位置 | 作用域 | 优先级 | 用途 |
|---------|---------|--------|------|
| `~/.claude/` | 全局 | 低 | 默认配置 |
| `./.claude/settings.local.json` | 项目 | 高 | 项目特定配置 |

项目配置会覆盖全局配置。

## 其他配置选项

Claude Code 还支持：

- `hooks`: 工具执行前后的自定义命令
- `permissions`: 工具使用权限控制
- `statusLine`: 自定义状态栏
- `sandbox`: 沙箱安全设置

详见 [Claude Code 官方文档](https://docs.claude.com/en/docs/claude-code)。