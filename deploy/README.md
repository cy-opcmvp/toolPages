# ToolPages 部署文档

## 📁 项目结构

```
toolPages/
├── deploy/                    # 部署目录（构建产物）
│   ├── dreamy-cover/          # 抖音封面生成工具
│   │   ├── index.html
│   │   └── assets/
│   └── icongen-ai/            # 图标生成工具
│       ├── index.html
│       └── assets/
├── dreamy-cover/              # 源码目录
├── icongen-ai/                # 源码目录
└── DEPLOY.md                  # 本文档
```

## 🚀 部署方案

### 方案 A：静态托管平台部署

#### 1. GitHub Pages

**部署步骤：**

1. 创建 `gh-pages` 分支：
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r deploy/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

2. 在 GitHub 仓库设置中：
   - 进入 Settings → Pages
   - Source 选择 `gh-pages` 分支
   - 保存后等待部署完成

3. 访问：`https://yourusername.github.io/toolPages/dreamy-cover/`

#### 2. Vercel（推荐）

**部署步骤：**

1. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 在 `deploy/` 目录下创建 `vercel.json`：
   ```json
   {
     "rewrites": [
       {
         "source": "/dreamy-cover/:path*",
         "destination": "/dreamy-cover/:path*"
       },
       {
         "source": "/icongen-ai/:path*",
         "destination": "/icongen-ai/:path*"
       }
     ]
   }
   ```

3. 部署：
   ```bash
   cd deploy
   vercel
   ```

4. 按提示完成部署，访问：`https://your-project.vercel.app`

#### 3. Netlify

**部署步骤：**

1. 在 `deploy/` 目录下创建 `netlify.toml`：
   ```toml
   [[redirects]]
     from = "/dreamy-cover/*"
     to = "/dreamy-cover/:splat"
     status = 200

   [[redirects]]
     from = "/icongen-ai/*"
     to = "/icongen-ai/:splat"
     status = 200
   ```

2. 拖拽 `deploy/` 文件夹到 Netlify 部署页面

3. 或使用 CLI：
   ```bash
   npm install -g netlify-cli
   cd deploy
   netlify deploy --prod
   ```

### 方案 B：本地/服务器部署

#### 1. 简单 HTTP 服务器

```bash
cd deploy
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

访问：`http://localhost:8000/dreamy-cover/`

#### 2. Nginx 部署

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/toolPages/deploy;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
```

#### 3. Docker 部署

创建 `Dockerfile`：
```dockerfile
FROM nginx:alpine
COPY deploy/ /usr/share/nginx/html/
EXPOSE 80
```

构建并运行：
```bash
docker build -t toolpages .
docker run -d -p 80:80 --name toolpages toolpages
```

## 🔧 API 配置说明

两个工具都支持用户在界面中配置 API Key，无需环境变量。

### 支持的 AI 服务商：

1. **Google Gemini**（默认）
   - 获取 API Key：https://aistudio.google.com/app/apikey
   - 模型：gemini-2.5-flash-image

2. **OpenAI GPT-4 Vision**
   - 获取 API Key：https://platform.openai.com/api-keys

3. **Anthropic Claude**
   - 获取 API Key：https://console.anthropic.com/

### API Key 存储位置：

- 浏览器 `localStorage`
- 键名：`apiConfig`
- 用户首次使用时在界面中配置即可

## 🔐 安全建议

1. **不要在前端代码中硬编码 API Key**
2. **建议使用 CORS 代理** 避免直接暴露 API Key
3. **定期轮换 API Key**
4. **设置 API 使用限额** 防止滥用

## 📦 重新构建

如果修改了源码，需要重新构建：

```bash
# 构建 dreamy-cover
cd dreamy-cover
npm run build
cp -r dist/* ../deploy/dreamy-cover/

# 构建 icongen-ai
cd ../icongen-ai
npm run build
cp -r dist/* ../deploy/icongen-ai/

# 重新部署
cd ../deploy
vercel --prod  # 或其他部署命令
```

## 🌐 访问路径

部署后的访问路径：

- Dreamy Cover：`https://your-domain.com/dreamy-cover/`
- IconGen AI：`https://your-domain.com/icongen-ai/`

## 📝 注意事项

1. 两个项目是完全独立的，互不干扰
2. API Key 保存在用户浏览器本地，服务器无法访问
3. 建议使用 HTTPS 部署，保护 API Key 传输安全
4. 如需添加新工具，直接在 `deploy/` 下创建新目录即可

## 🆘 常见问题

### Q: AI 功能不工作？
A: 确保在工具界面中正确配置了 API Key，点击导航栏的 "API" 按钮进行设置。

### Q: 部署后页面 404？
A: 检查服务器配置，确保支持 SPA 路由，或使用绝对路径访问 `/dreamy-cover/index.html`

### Q: 如何添加新工具？
A: 在 `deploy/` 目录下创建新文件夹，放入构建产物即可。门户页面会自动识别。

## 📄 许可证

MIT License
