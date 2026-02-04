
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Github, Info, Globe, Menu, X, ArrowRight, Star, TrendingUp, Clock, Filter, Grid, List, Heart } from 'lucide-react';
import { TOOLS, CATEGORIES } from './data/tools';
import { SortOption, Tool } from './types';
import { useTranslation } from './hooks/useTranslation';
import { useFavorites } from './hooks/useFavorites';

const App: React.FC = () => {
  const { t, lang, toggleLang } = useTranslation();
  const { favorites, toggleFavorite, isFavorite, favoriteCount } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.HOT);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and Sort logic
  const filteredTools = useMemo(() => {
    let result = TOOLS.filter(tool => {
      const matchesSearch =
        tool.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.nameCn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = activeCategory === 'all' ||
        tool.category === activeCategory ||
        (activeCategory === 'favorites' && isFavorite(tool.id));

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case SortOption.NAME_ASC:
        result.sort((a, b) => a.nameEn.localeCompare(b.nameEn));
        break;
      case SortOption.NAME_DESC:
        result.sort((a, b) => b.nameEn.localeCompare(a.nameEn));
        break;
      case SortOption.HOT:
        result.sort((a, b) => b.hot - a.hot);
        break;
      case SortOption.NEWEST:
        result.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy, isFavorite]);

  return (
    <div className="flex flex-col min-h-screen text-slate-100 selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass shadow-xl' : 'py-5 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Star className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AI Tools Hub
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                className="bg-slate-900/50 border border-slate-700/50 rounded-full py-2 pl-10 pr-6 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:w-80 transition-all placeholder:text-slate-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={toggleLang} className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'EN' : '中文'}
            </button>
            <a href="https://github.com/cy-opcmvp/toolPages" target="_blank" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              {t('about')}
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              className="bg-slate-900 border border-slate-700 rounded-xl py-4 px-6 w-full text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <button onClick={toggleLang} className="p-4 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center gap-2">
                <Globe /> {lang === 'en' ? 'English' : '中文'}
              </button>
              <a href="https://github.com" className="p-4 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center gap-2">
                <Github /> GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full blur-[128px] animate-pulse"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-[128px] animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-8 animate-bounce">
            <Star className="w-4 h-4 fill-current" />
            <span>Discover the next generation of AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            {t('heroTitle').split(' / ').map((part, i) => (
              <span key={i} className={i === 0 ? "block mb-2" : "block text-gradient"}>
                {part}
              </span>
            ))}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">12+</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">{t('statsTools')}</div>
            </div>
            <div className="w-px h-12 bg-slate-800 hidden md:block"></div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">100k+</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">{t('statsUsage')}</div>
            </div>
            <div className="w-px h-12 bg-slate-800 hidden md:block"></div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">2,482</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">{t('statsActive')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {t('categories')}
            </h3>
            <div className="flex flex-col gap-1">
              {/* Favorites Button */}
              <button
                onClick={() => setActiveCategory('favorites')}
                className={`px-4 py-2.5 rounded-xl text-left text-sm transition-all flex items-center justify-between group ${activeCategory === 'favorites' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
              >
                <span className="flex items-center gap-2">
                  <Heart className={`w-4 h-4 ${activeCategory === 'favorites' ? 'fill-current' : ''}`} />
                  {lang === 'en' ? 'My Favorites' : '我的收藏'}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === 'favorites' ? 'bg-white/20' : 'bg-slate-800'}`}>
                  {favoriteCount}
                </span>
              </button>

              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-left text-sm transition-all flex items-center justify-between group ${activeCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  {lang === 'en' ? cat.labelEn : cat.labelCn}
                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeCategory === cat.id ? 'bg-white' : 'bg-transparent group-hover:bg-slate-700'}`}></div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {t('sortBy')}
            </h3>
            <select 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value={SortOption.HOT}>{t('sort_hot')}</option>
              <option value={SortOption.NEWEST}>{t('sort_newest')}</option>
              <option value={SortOption.NAME_ASC}>{t('sort_name_asc')}</option>
              <option value={SortOption.NAME_DESC}>{t('sort_name_desc')}</option>
            </select>
          </div>
        </aside>

        {/* Grid Area */}
        <section className="flex-grow">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {activeCategory === 'all' ? (lang === 'en' ? 'All Tools' : '全部工具') : activeCategory}
              <span className="text-slate-500 text-sm font-normal">({filteredTools.length})</span>
            </h2>
            <div className="flex items-center gap-2 p-1 bg-slate-900/50 rounded-lg">
              <button className="p-1.5 rounded bg-indigo-600 text-white shadow-sm"><Grid className="w-4 h-4" /></button>
              <button className="p-1.5 rounded text-slate-500 hover:text-white transition-colors"><List className="w-4 h-4" /></button>
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <div 
                  key={tool.id} 
                  className="group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 border-indigo-500/0 hover:border-indigo-500/30 flex flex-col h-full"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={tool.thumbnail} 
                      alt={tool.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {tool.featured && (
                            <span className="px-2.5 py-1 bg-amber-500 text-[10px] font-bold text-white rounded-lg shadow-lg flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" /> {t('featured')}
                            </span>
                        )}
                        <span className="px-2.5 py-1 bg-indigo-600/80 backdrop-blur-md text-[10px] font-bold text-white rounded-lg shadow-lg">
                            {tool.category}
                        </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                            <TrendingUp className="w-3 h-3 text-red-400" />
                            {tool.hot.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                            <Clock className="w-3 h-3 text-blue-400" />
                            {tool.addedDate}
                        </div>
                    </div>

                    {/* Favorite Button on Thumbnail */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(tool.id);
                      }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-all group/fav z-10"
                      title={isFavorite(tool.id) ? (lang === 'en' ? 'Remove from favorites' : '取消收藏') : (lang === 'en' ? 'Add to favorites' : '添加收藏')}
                    >
                      <Heart className={`w-5 h-5 transition-all ${isFavorite(tool.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-white group-hover/fav:scale-110'}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{tool.icon}</span>
                        <div className="flex gap-1">
                            {tool.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded-md">#{tag}</span>
                            ))}
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                      {lang === 'en' ? tool.nameEn : tool.nameCn}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                      {lang === 'en' ? tool.descriptionEn : tool.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between">
                        <a 
                            href={tool.path}
                            className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/btn"
                        >
                            {t('useNow')}
                            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center glass rounded-3xl">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-700" />
              </div>
              <p className="text-slate-500 font-medium">{t('noResults')}</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="mt-4 text-indigo-400 hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-slate-900 bg-slate-950/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Star className="text-white w-5 h-5 fill-current" />
                </div>
                <span className="text-lg font-bold tracking-tight">AI Tools Portal</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                Empowering creators with cutting-edge AI tools. Join thousands of users making the most of machine learning and generative art every day.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Dreamy Cover</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">IconGen AI</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Featured Tools</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Popular Tools</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Community</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub Source</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Discord Channel</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">API Docs</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-xs">
              &copy; {new Date().getFullYear()} AI Tools Portal. All rights reserved. Built with ❤️ for the AI community.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-600 hover:text-white transition-colors text-xs">Privacy Policy</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors text-xs">Terms of Service</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors text-xs">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
