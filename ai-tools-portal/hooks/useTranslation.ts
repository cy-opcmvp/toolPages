
import { useState, useCallback } from 'react';
import { Language } from '../types';

const translations = {
  en: {
    heroTitle: "AI Tools Collection",
    heroSubtitle: "One-click access to all your creative AI tools",
    searchPlaceholder: "Search tools...",
    statsTools: "Tools",
    statsUsage: "Total Usage",
    statsActive: "Online Now",
    sortBy: "Sort by",
    categories: "Categories",
    useNow: "Use Now",
    featured: "Featured",
    hot: "Hot",
    about: "About",
    github: "GitHub",
    noResults: "No tools found matching your search.",
    sort_hot: "Most Popular",
    sort_newest: "Newest",
    sort_name_asc: "Name (A-Z)",
    sort_name_desc: "Name (Z-A)",
  },
  cn: {
    heroTitle: "AI 工具集合",
    heroSubtitle: "一键访问所有 AI 创作工具",
    searchPlaceholder: "搜索工具...",
    statsTools: "工具数量",
    statsUsage: "累计使用",
    statsActive: "当前在线",
    sortBy: "排序方式",
    categories: "全部分类",
    useNow: "立即使用",
    featured: "推荐",
    hot: "热门",
    about: "关于",
    github: "GitHub",
    noResults: "未找到符合条件的工具。",
    sort_hot: "最热门",
    sort_newest: "最新添加",
    sort_name_asc: "名称 (A-Z)",
    sort_name_desc: "名称 (Z-A)",
  }
};

export function useTranslation() {
  const [lang, setLang] = useState<Language>('cn');

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[lang][key];
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'cn' : 'en');

  return { t, lang, toggleLang, setLang };
}
