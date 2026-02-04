# 🚀 快速开始 - GitHub Pages 部署

## 第一次部署（只需做一次）

### 1️⃣ 在 GitHub 创建仓库
- 访问 https://github.com/new
- 仓库名：`tool-pages`（或其他名称）
- **不要**勾选 "Initialize this repository with a README"
- 点击 "Create repository"

### 2️⃣ 推送代码到 GitHub

复制粘贴以下命令（替换 `cy-opcmvp`）：

```bash
# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: AI tools portal"

# 添加远程仓库
git remote add origin https://github.com/cy-opcmvp/tool-pages.git

# 推送
git branch -M main
git push -u origin main
```

### 3️⃣ 启用 GitHub Pages

1. 访问你的仓库：https://github.com/cy-opcmvp/tool-pages
2. 点击 **Settings**（⚙️）
3. 左侧菜单点击 **Pages**
4. **Build and deployment** → **Source** 选择：`GitHub Actions`
5. 保存

### 4️⃣ 等待部署完成

- 访问 **Actions** 标签页，查看部署进度
- 等待 2-3 分钟，绿色 ✅ 表示成功
- 访问：https://cy-opcmvp.github.io/tool-pages/

---

## 🔄 以后更新代码（超级简单）

### 修改任何项目后，只需 3 条命令：

```bash
git add .
git commit -m "描述你的修改"
git push
```

**就这么简单！** GitHub Actions 会自动构建并部署 ✅

---

## 📝 修改场景示例

### 场景 1：修改 dreamy-cover

```bash
# 1. 编辑代码
cd dreamy-cover
# ... 修改文件 ...

# 2. 提交
cd ..
git add dreamy-cover
git commit -m "Fix: 修复封面生成问题"
git push
```

### 场景 2：添加新工具

```bash
# 1. 创建新工具目录
mkdir new-tool
cd new-tool
npm create vite@latest . -- --template react-ts
# ... 开发新工具 ...

# 2. 在 ai-tools-portal/data/tools.ts 添加配置

# 3. 更新 .github/workflows/deploy.yml

# 4. 提交
cd ..
git add .
git commit -m "Feat: 添加新工具 new-tool"
git push
```

### 场景 3：修改门户页面

```bash
# 1. 编辑门户代码
cd ai-tools-portal
# ... 修改 App.tsx 或其他文件 ...

# 2. 提交
cd ..
git add ai-tools-portal
git commit -m "Update: 优化门户页面"
git push
```

---

## 🎯 部署流程图

```
推送代码 (git push)
    ↓
GitHub Actions 自动触发
    ↓
构建 3 个项目
    ├─ dreamy-cover
    ├─ icongen-ai
    └─ ai-tools-portal
    ↓
复制到 deploy 目录
    ↓
部署到 GitHub Pages
    ↓
✅ 完成！（3 分钟）
```

---

## 📞 遇到问题？

- 查看详细文档：[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- 查看 Actions 日志：https://github.com/cy-opcmvp/tool-pages/actions
- 本地测试构建：
  ```bash
  cd dreamy-cover && npm run build
  cd icongen-ai && npm run build
  cd ai-tools-portal && npm run build
  ```

---

**现在开始部署吧！** 🚀
