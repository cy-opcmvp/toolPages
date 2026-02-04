
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  {
    "id": "dreamy-cover",
    "name": "Dreamy Cover",
    "nameEn": "Dreamy Cover & AI Edit",
    "nameCn": "抖音封面生成器",
    "description": "生成梦幻声波美学风格的抖音封面，支持 AI 智能编辑",
    "descriptionEn": "Generate eye-catching Douyin thumbnails with dreamy soundwave aesthetics",
    "category": "图像生成",
    "tags": ["封面", "抖音", "AI", "视频"],
    "icon": "🎨",
    "thumbnail": "https://picsum.photos/seed/dreamy/600/400",
    "path": "/dreamy-cover/",
    "featured": true,
    "hot": 5280,
    "addedDate": "2025-01-15"
  },
  {
    "id": "icongen-ai",
    "name": "IconGen AI",
    "nameEn": "IconGen AI",
    "nameCn": "AI 图标生成器",
    "description": "遵循 3:4 比例指南的应用图标生成器，AI 驱动样式设计",
    "descriptionEn": "Custom app icon generator with 3:4 ratio guidelines, AI-powered styling",
    "category": "图标设计",
    "tags": ["图标", "App", "AI", "设计"],
    "icon": "🔲",
    "thumbnail": "https://picsum.photos/seed/icon/600/400",
    "path": "/icongen-ai/",
    "featured": true,
    "hot": 3420,
    "addedDate": "2025-02-01"
  },
  {
    "id": "ai-editor-pro",
    "name": "AI Edit Pro",
    "nameEn": "AI Photo Editor Pro",
    "nameCn": "AI 高级修图",
    "description": "基于最新模型的图像增强与风格迁移工具",
    "descriptionEn": "Advanced image enhancement and style transfer powered by the latest AI models",
    "category": "AI 编辑",
    "tags": ["修图", "画质增强", "风格化"],
    "icon": "✨",
    "thumbnail": "https://picsum.photos/seed/edit/600/400",
    "path": "/ai-editor/index.html",
    "featured": false,
    "hot": 1240,
    "addedDate": "2025-02-05"
  },
  {
    "id": "vocal-remover",
    "name": "VoiceX",
    "nameEn": "Vocal Remover AI",
    "nameCn": "AI 人声分离",
    "description": "从任意音轨中精准提取或去除人声",
    "descriptionEn": "Extract or remove vocals from any audio track with high precision",
    "category": "音频处理",
    "tags": ["音频", "人声", "后期"],
    "icon": "🎙️",
    "thumbnail": "https://picsum.photos/seed/audio/600/400",
    "path": "/voice-x/index.html",
    "featured": false,
    "hot": 890,
    "addedDate": "2025-02-10"
  }
];

export const CATEGORIES = [
  { id: 'all', labelEn: 'All Tools', labelCn: '全部工具' },
  { id: '图像生成', labelEn: 'Image Generation', labelCn: '图像生成' },
  { id: '图标设计', labelEn: 'Icon Design', labelCn: '图标设计' },
  { id: 'AI 编辑', labelEn: 'AI Editing', labelCn: 'AI 编辑' },
  { id: '音频处理', labelEn: 'Audio Processing', labelCn: '音频处理' }
];
