# GitHub Pages 部署完整指南

## 📋 目录
1. [首次部署](#首次部署)
2. [后续更新](#后续更新)
3. [常见问题](#常见问题)

---

## 🚀 首次部署

### 步骤 1：创建 GitHub 仓库

```bash
# 在 GitHub 上创建新仓库（不要初始化 README）
# 仓库名建议：tool-pages 或 ai-tools-hub
```

### 步骤 2：初始化本地仓库并推送

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 创建首次提交
git commit -m "Initial commit: AI tools portal with dreamy-cover and icongen-ai"

# 4. 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/cy-opcmvp/tool-pages.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. **Source** 选择：`GitHub Actions`
5. 保存设置

### 步骤 4：等待自动部署

- 推送代码后，GitHub Actions 会自动运行
- 访问 **Actions** 标签页查看部署进度
- 部署完成后，访问：`https://cy-opcmvp.github.io/tool-pages/`

---

## 🔄 后续更新

### 场景 1：修改现有工具（dreamy-cover 或 icongen-ai）

```bash
# 1. 进入项目目录
cd dreamy-cover  # 或 icongen-ai

# 2. 修改代码（编辑文件）
# ...

# 3. 测试修改
npm run dev

# 4. 提交更改
cd ..  # 返回根目录
git add dreamy-cover  # 或 icongen-ai
git commit -m "Fix: 修复 dreamy-cover 的 XXX 问题"
git push
```

**自动部署流程：**
- ✅ 推送代码 → GitHub Actions 自动构建 → 自动部署到 Pages
- ⏱️ 等待 2-3 分钟，访问 GitHub Pages 查看更新

---

### 场景 2：添加新工具（新增页面）

#### 步骤 1：创建新工具项目

```bash
# 在项目根目录下创建新工具
mkdir new-tool
cd new-tool

# 初始化 React + TypeScript + Vite 项目
npm create vite@latest . -- --template react-ts

# 安装依赖
npm install

# 开发你的工具...
```

#### 步骤 2：在门户中注册新工具

编辑 `ai-tools-portal/data/tools.ts`：

```typescript
export const TOOLS: Tool[] = [
  // ... 现有工具

  // 新增工具
  {
    "id": "new-tool",
    "name": "新工具名称",
    "nameEn": "New Tool",
    "nameCn": "新工具中文名",
    "description": "工具描述",
    "descriptionEn": "Tool description",
    "category": "图像生成",  // 或创建新分类
    "tags": ["标签1", "标签2"],
    "icon": "🎯",
    "thumbnail": "https://picsum.photos/seed/new-tool/600/400",
    "path": "/new-tool/",  // 重要：路径必须与目录名一致
    "featured": false,
    "hot": 100,
    "addedDate": "2025-02-05"
  }
];
```

#### 步骤 3：更新 GitHub Actions 工作流

编辑 `.github/workflows/deploy.yml`，添加新工具的构建步骤：

```yaml
# 在 "Build ai-tools-portal" 步骤后添加

      - name: Build new-tool
        run: |
          cd new-tool
          npm install
          npm run build
```

然后在 "Prepare deploy directory" 步骤中添加：

```yaml
      - name: Prepare deploy directory
        run: |
          mkdir -p deploy
          cp -r dreamy-cover/dist deploy/dreamy-cover
          cp -r icongen-ai/dist deploy/icongen-ai
          cp -r new-tool/dist deploy/new-tool  # 新增这一行
          cp -r ai-tools-portal/dist/* deploy/
```

#### 步骤 4：提交并推送

```bash
git add .
git commit -m "Feat: 添加新工具 new-tool"
git push
```

**自动部署：** GitHub Actions 会自动构建并部署所有工具 ✅

---

### 场景 3：仅修改门户页面（ai-tools-portal）

```bash
# 1. 修改门户代码
cd ai-tools-portal

# 2. 编辑文件（例如：修改 App.tsx、tools.ts 等）
# ...

# 3. 测试修改
npm run dev

# 4. 提交更改
cd ..
git add ai-tools-portal
git commit -m "Update: 优化门户页面样式"
git push
```

---

### 场景 4：批量修改多个项目

```bash
# 1. 修改多个项目
# 例如：修改 dreamy-cover、icongen-ai 和 ai-tools-portal

# 2. 一次性提交所有更改
git add .
git commit -m "Feat: 批量更新三个项目"
git push
```

---

## 🛠️ 开发最佳实践

### 本地开发流程

```bash
# 开发特定工具
cd dreamy-cover
npm run dev  # http://localhost:3000

# 开发门户页面
cd ../ai-tools-portal
npm run dev  # http://localhost:3001
```

### 提交信息规范

推荐使用语义化提交信息：

```bash
git commit -m "Feat: 添加新功能"
git commit -m "Fix: 修复 XXX 问题"
git commit -m "Update: 更新文档"
git commit -m "Style: 优化样式"
git commit -m "Refactor: 重构代码"
```

### 本地预览构建结果

```bash
# 构建所有项目
cd dreamy-cover && npm run build && cd ..
cd icongen-ai && npm run build && cd ..
cd ai-tools-portal && npm run build && cd ..

# 复制到 deploy 目录
mkdir -p deploy
cp -r dreamy-cover/dist deploy/dreamy-cover
cp -r icongen-ai/dist deploy/icongen-ai
cp -r ai-tools-portal/dist/* deploy/

# 本地预览
cd deploy
npx serve .
# 访问 http://localhost:3000
```

---

## ❓ 常见问题

### Q1: 部署后页面 404？

**原因：** 路径配置错误

**解决：** 检查 `ai-tools-portal/data/tools.ts` 中的 `path` 字段：
```typescript
// ✅ 正确（带尾部斜杠）
"path": "/dreamy-cover/"

// ❌ 错误
"path": "/dreamy-cover"
"path": "/dreamy-cover/index.html"
```

---

### Q2: GitHub Actions 构建失败？

**解决方法：**
1. 访问仓库的 **Actions** 标签页
2. 点击失败的工作流查看错误日志
3. 常见错误：
   - ❌ 依赖安装失败 → 检查 `package.json`
   - ❌ 构建报错 → 本地运行 `npm run build` 测试
   - ❌ 文件路径错误 → 检查工作流中的路径

---

### Q3: 如何撤销部署？

```bash
# 回退到上一个版本
git log  # 查看提交历史
git reset --hard <上一个提交的 hash>
git push --force
```

---

### Q4: 如何查看部署历史？

- 访问 **Settings** → **Pages**
- 查看 **Deployments** 部分
- 显示最近 30 次部署记录

---

### Q5: 自定义域名配置？

1. 在项目根目录创建 `CNAME` 文件：
   ```
   your-domain.com
   ```

2. 提交并推送：
   ```bash
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

3. 在域名 DNS 设置中添加 CNAME 记录：
   ```
   your-domain.com → cy-opcmvp.github.io
   ```

---

## 📊 部署时间估算

| 操作 | 时间 |
|------|------|
| 推送代码 | ~5 秒 |
| GitHub Actions 构建 | 2-3 分钟 |
| 部署到 Pages | ~30 秒 |
| **总计** | **约 3-4 分钟** |

---

## 🎯 快速参考

### 一键部署命令

```bash
# 修改代码后，只需三步：
git add .
git commit -m "描述你的修改"
git push
```

### 查看部署状态

```bash
# 访问仓库的 Actions 页面
https://github.com/cy-opcmvp/tool-pages/actions

# 访问 GitHub Pages
https://cy-opcmvp.github.io/tool-pages/
```

---

## 📞 需要帮助？

- GitHub Pages 文档：https://docs.github.com/pages
- GitHub Actions 文档：https://docs.github.com/actions

---

**部署愉快！** 🎉
