# 星皓 XINHAO · Cloudflare Pages 部署指南

## 架构说明

```
用户浏览器  →  Cloudflare Pages(前端静态文件)
                    ↓ /api/* 请求
              Cloudflare Pages Function(注入 API Key,转发到 NVIDIA)
                    ↓
              NVIDIA NIM API
```

API Key 存在 Cloudflare 环境变量中,前端代码里没有任何密钥。

## 部署步骤

### 1. 推送代码到 GitHub

确保 `.env` 和 `.dev.vars` 已被 `.gitignore` 忽略,不会提交。

### 2. 在 Cloudflare 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 选择你的 GitHub 仓库
4. 构建配置:
   - **Framework preset**: `Vue`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`(默认)

### 3. 设置环境变量(关键!)

在 Pages 项目的 **Settings** → **Environment variables** 中添加:

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NVIDIA_API_KEY` | `nvapi-xxxx` | 你的 NVIDIA API Key |

设置为 **Production** 环境变量。

> **注意**: 环境变量设置后,需要重新部署一次才能生效。
> 在 Deployments 页面点击 **Retry deployment** 即可。

### 4. 部署

点击 **Save and Deploy**,Cloudflare 会自动:
- 运行 `npm run build` 构建前端
- 部署 `dist/` 为静态文件
- 自动识别 `functions/` 目录,部署为 Pages Function
- `_routes.json` 指定只有 `/api/*` 走 Function,其余走静态文件

### 5. 验证

部署完成后:
- 前端页面正常加载
- 在 Playground 发送消息能正常收到回复
- 打开浏览器 F12 → Network,检查请求地址是 `/api/chat/completions`(不再是 NVIDIA 直连)
- 在 Sources 中搜索 `nvapi-`,**应该搜不到任何结果**

## 故障排查

### "Failed to fetch" 错误

这是最常见的部署后问题,按以下顺序排查:

**1. 检查环境变量是否已设置**

最常见的原因:Cloudflare 环境变量 `NVIDIA_API_KEY` 未配置。

- 进入 Cloudflare Dashboard → 你的 Pages 项目 → **Settings** → **Environment variables**
- 确认 `NVIDIA_API_KEY` 已添加,值为 `nvapi-...` 开头的完整 Key
- 确认环境选的是 **Production**
- 设置后必须**重新部署**才会生效

**2. 检查 Functions 是否已部署**

- 在 Cloudflare Dashboard → 你的 Pages 项目 → **Functions** 标签页
- 应该能看到 `/api/*` 路由
- 如果看不到,说明 `functions/` 目录没有正确部署

**3. 检查请求路径**

打开浏览器 F12 → Network,发送一条消息,查看请求:
- 请求 URL 应该是 `https://你的域名/api/chat/completions`
- 如果返回 HTML 而不是 JSON,说明 Function 没生效(静态文件兜底了)

**4. 直接测试 Function**

在浏览器地址栏访问:
```
https://你的域名/api/models
```
- 如果返回 JSON 模型列表 → Function 正常
- 如果返回 "服务器未配置 API Key" → 环境变量未设置
- 如果返回 HTML 页面 → Function 未部署

### 其他常见问题

| 症状 | 原因 | 解决方案 |
|------|------|----------|
| 返回 HTML 而非 JSON | Function 未部署 | 确认 `functions/api/[[path]].js` 已提交到 Git |
| 500 "服务器未配置 API Key" | 环境变量缺失 | 在 Cloudflare Dashboard 添加 `NVIDIA_API_KEY` |
| 502 "代理请求失败" | NVIDIA API 不可达 | 检查 API Key 是否有效 |
| 流式回复不显示 | 响应头编码问题 | 已在最新代码中修复(移除 Content-Encoding) |

## 本地开发

### 方式一:Vite 代理(推荐,日常开发用)

```bash
# 1. 确保 .env 文件存在(已配置 VITE_DEV_API_KEY)
# 2. 启动开发服务器
npm run dev
```

开发环境通过 Vite 代理直连 NVIDIA API,不需要 Cloudflare Function。

### 方式二:Wrangler 本地模拟(测试 Function 用)

```bash
# 1. 安装 wrangler
npm install -g wrangler

# 2. 确保 .dev.vars 文件存在(已配置 NVIDIA_API_KEY)

# 3. 先构建
npm run build

# 4. 本地启动 Pages(包含 Function)
wrangler pages dev dist
```

这样可以在本地完整测试 Cloudflare Function 的行为。

## 安全特性

- **API Key 零暴露**:密钥只存在于 Cloudflare 环境变量,前端代码中没有任何密钥
- **请求头清洗**:转发到 NVIDIA 时只保留 Content-Type / Authorization / Accept,丢弃 Host / CF-* 等内部头
- **响应头清洗**:移除 Content-Encoding / Content-Length 避免浏览器二次解压失败
- **CORS 控制**:支持跨域访问(同源时自动生效)
- **流式透传**:SSE 流式响应完整透传,不影响打字机效果
- **错误兜底**:所有异常都返回带 CORS 头的 JSON 响应,不会出现裸 500
