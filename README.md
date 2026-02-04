# ⭐ AI Tools Hub - AI 工具集合

一站式 AI 创作工具平台，包含图像生成、图标设计等多个类别的精选 AI 工具。

## 🎯 项目特色

- 🚀 **零配置部署**：使用 GitHub Actions 自动构建和部署
- 🎨 **精美门户页面**：响应式设计、卡片式布局、流畅动画
- ⭐ **收藏功能**：本地存储，快速访问常用工具
- 🌍 **多语言支持**：中英文无缝切换
- 🔍 **智能搜索**：实时筛选，支持关键词和标签
- 📱 **完美响应式**：桌面、平板、手机全适配

## 🛠️ 包含工具

| 工具 | 描述 | 分类 |
|------|------|------|
| 🎨 **Dreamy Cover** | 抖音封面生成器，梦幻声波美学风格 | 图像生成 |
| 🔲 **IconGen AI** | 应用图标生成器，3:4 比例指南 | 图标设计 |

## 🚀 快速开始

### 首次部署（3 步完成）

```bash
# 1. 推送代码到 GitHub
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/cy-opcmvp/tool-pages.git
git push -u origin main

# 2. 在 GitHub 仓库启用 Pages
# Settings → Pages → Source: GitHub Actions

# 3. 等待 3 分钟，访问你的网站！
# https://cy-opcmvp.github.io/tool-pages/
```

📖 **详细教程**：查看 [QUICKSTART.md](./QUICKSTART.md)

---

## 🔄 后续更新

修改任何代码后，只需 3 条命令：

```bash
git add .
git commit -m "描述你的修改"
git push
```

**就这么简单！** GitHub Actions 会自动构建并部署 ✅

---

## 📂 项目结构

```
toolPages/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── ai-tools-portal/            # 门户首页（React + Vite）
│   ├── App.tsx                 # 主应用组件
│   ├── data/tools.ts           # 工具配置
│   └── hooks/
│       ├── useTranslation.ts   # 国际化
│       └── useFavorites.ts     # 收藏功能
├── dreamy-cover/               # 工具 1：抖音封面生成
│   ├── App.tsx
│   ├── services/
│   │   └── geminiService.ts    # AI API 调用
│   └── components/
│       └── ApiSettings.tsx     # API 设置弹窗
├── icongen-ai/                 # 工具 2：图标生成
│   └── (同上结构)
├── deploy/                     # 自动生成的部署目录（不要修改）
├── DEPLOYMENT_GUIDE.md         # 完整部署指南
├── QUICKSTART.md               # 快速开始指南
└── README.md                   # 本文件
```

---

## 🎯 添加新工具

### 步骤 1：创建工具项目

```bash
mkdir new-tool
cd new-tool
npm create vite@latest . -- --template react-ts
npm install
npm run dev  # 开发你的工具...
```

### 步骤 2：注册到门户

编辑 `ai-tools-portal/data/tools.ts`：

```typescript
{
  "id": "new-tool",
  "nameEn": "New Tool",
  "nameCn": "新工具",
  "path": "/new-tool/",  // 路径必须与目录名一致
  "category": "图像生成",
  "featured": false,
  "hot": 100,
  // ...
}
```

### 步骤 3：更新 GitHub Actions

编辑 `.github/workflows/deploy.yml`，添加构建步骤：

```yaml
- name: Build new-tool
  run: |
    cd new-tool
    npm install
    npm run build
```

### 步骤 4：提交

```bash
git add .
git commit -m "Feat: 添加新工具"
git push
```

✅ 自动部署完成！

---

## 🎨 自定义配置

### 修改网站信息

编辑 `ai-tools-portal/data/tools.ts` 中的 `CATEGORIES` 和 `TOOLS`

### 修改 SEO 信息

编辑 `ai-tools-portal/index.html` 中的 meta 标签

### 修改样式

- TailwindCSS 类名：编辑 `ai-tools-portal/App.tsx`
- 自定义 CSS：编辑 `ai-tools-portal/index.html` 中的 `<style>` 标签

---

## 📚 文档

- 📖 [QUICKSTART.md](./QUICKSTART.md) - 快速开始指南
- 📖 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 完整部署指南
- 📖 [PORTAL_REQUIREMENTS.md](./PORTAL_REQUIREMENTS.md) - 门户页面需求文档
- 📖 [deploy/README.md](./deploy/README.md) - 部署目录说明

---

## 🌐 在线演示

部署后的示例：https://cy-opcmvp.github.io/tool-pages/

---

## 🛠️ 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite 6
- **UI 样式**：TailwindCSS
- **图标库**：Lucide React
- **部署**：GitHub Pages + GitHub Actions
- **AI 服务**：Google Gemini 2.5 Flash Image

---

## 📝 开发命令

```bash
# 开发门户页面
cd ai-tools-portal && npm run dev

# 开发 dreamy-cover
cd dreamy-cover && npm run dev

# 开发 icongen-ai
cd icongen-ai && npm run dev

# 本地构建所有项目
./build-all.sh  # 或手动执行每个项目的 npm run build
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

**⭐ 如果这个项目对你有帮助，请给一个 Star！**
