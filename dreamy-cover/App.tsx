
import React, { useState, useCallback, useRef } from 'react';
import { Orientation, CoverSettings, BackgroundEffect, AIEditResult } from './types';
import { editImageWithGemini } from './services/geminiService';
import { apiService } from './services/apiService';
import SoundWave from './components/SoundWave';
import CoverCanvas from './components/CoverCanvas';
import ApiSettings from './components/ApiSettings';

const PRESET_PALETTES = [
  { name: 'Cyber', primary: '#8a2be2', secondary: '#00ced1' },
  { name: 'Sunset', primary: '#ff4e50', secondary: '#f9d423' },
  { name: 'Emerald', primary: '#11998e', secondary: '#38ef7d' },
  { name: 'Midnight', primary: '#232526', secondary: '#414345' },
  { name: 'Candy', primary: '#ee0979', secondary: '#ff6a00' },
  { name: 'Ocean', primary: '#2193b0', secondary: '#6dd5ed' },
];

const PRESET_EFFECTS: { id: BackgroundEffect; name: string }[] = [
  { id: 'orbs', name: 'Dreamy Orbs' },
  { id: 'mesh', name: 'Fluid Mesh' },
  { id: 'grid', name: 'Retro Grid' },
  { id: 'dust', name: 'Cosmic Dust' },
];

const PRESET_AI_STYLES = [
  { label: '未来科技感', value: 'Futuristic high-tech laboratory with glowing holographic interfaces and blue energy lines' },
  { label: '极简摄影棚', value: 'Professional minimalist studio lighting with soft shadows and clean light gray background' },
  { label: '霓虹赛博', value: 'Vibrant neon cyberpunk city alley with pink and cyan reflections and mist' },
  { label: '柔和抽象', value: 'Soft elegant abstract waves with iridescent gradients and floating glass orbs' },
  { label: '专业博主', value: 'High-end YouTube/Vlog studio setup background with depth of field and warm bokeh' },
];

const App: React.FC = () => {
  const [tab, setTab] = useState<'generator' | 'ai-edit'>('generator');
  const [showApiSettings, setShowApiSettings] = useState(false);

  const [settings, setSettings] = useState<CoverSettings>({
    title: '标题一\n标题二',
    subtitle: '副标题',
    orientation: 'vertical',
    primaryColor: '#8a2be2',
    secondaryColor: '#00ced1',
    glowIntensity: 30,
    waveSpeed: 1,
    titleFontSize: 120,
    titleLetterSpacing: 5,
    titleLineHeight: 1.2,
    titleOffsetY: 0,
    subtitleFontSize: 50,
    subtitleOffsetY: 60,
    textAlign: 'center',
    backgroundEffect: 'orbs',
  });
  const [previewUrl, setPreviewUrl] = useState('');

  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedResult, setEditedResult] = useState<AIEditResult>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = (url?: string, filename?: string) => {
    const targetUrl = url || previewUrl;
    if (!targetUrl) return;
    const link = document.createElement('a');
    link.download = filename || `cover-${settings.orientation}-${Date.now()}.png`;
    link.href = targetUrl;
    link.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setEditedResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIEdit = async () => {
    if (!sourceImage || !editPrompt) return;
    setIsEditing(true);
    setEditedResult(null);

    try {
      const base64Data = sourceImage.split(',')[1];
      
      // We generate ONE master background at 1:1 ratio.
      // This ensures 100% consistency across any crop factor.
      const masterPrompt = `Generate a high-impact, professional background based on this theme: ${editPrompt}`;
      
      const result = await editImageWithGemini(
        base64Data, 
        masterPrompt,
        "1:1" // Master square format
      );

      setEditedResult(result);
    } catch (error) {
      alert("AI Edit failed: " + (error as Error).message);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden selection:bg-indigo-500/30">
      <nav className="sticky top-0 z-50 glass-effect border-b border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase">Dreamy Cover</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowApiSettings(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            title="API 设置 / API Settings"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            API
          </button>
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
            {(['generator', 'ai-edit'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${tab === t ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                {t === 'generator' ? 'Design' : 'AI Edit'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-10">
        {tab === 'generator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <div className="glass-effect rounded-3xl p-8 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
                
                <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Style Presets</h3>
                   <div className="grid grid-cols-3 gap-3">
                      {PRESET_PALETTES.map(p => (
                        <button 
                          key={p.name} 
                          onClick={() => setSettings({...settings, primaryColor: p.primary, secondaryColor: p.secondary})}
                          className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all"
                        >
                          <div className="flex gap-1">
                             <div className="w-4 h-4 rounded-full" style={{backgroundColor: p.primary}} />
                             <div className="w-4 h-4 rounded-full" style={{backgroundColor: p.secondary}} />
                          </div>
                          <span className="text-[10px] font-bold text-gray-500 group-hover:text-white uppercase tracking-wider">{p.name}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Background Engine</h3>
                   <div className="grid grid-cols-2 gap-3">
                      {PRESET_EFFECTS.map(e => (
                        <button 
                          key={e.id} 
                          onClick={() => setSettings({...settings, backgroundEffect: e.id})}
                          className={`py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${settings.backgroundEffect === e.id ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
                        >
                          {e.name}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Content</h3>
                  <textarea 
                    value={settings.title}
                    onChange={(e) => setSettings({...settings, title: e.target.value})}
                    placeholder="Enter Title"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none h-24 text-sm font-black tracking-tight"
                  />
                  <input 
                    type="text"
                    value={settings.subtitle}
                    onChange={(e) => setSettings({...settings, subtitle: e.target.value})}
                    placeholder="Enter Subtitle"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  />
                </div>

                <div className="space-y-6 pt-4 border-t border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Layout & Type</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase"><span>Size</span> <span>{settings.titleFontSize}px</span></div>
                       <input type="range" min="40" max="300" value={settings.titleFontSize} onChange={(e) => setSettings({...settings, titleFontSize: parseInt(e.target.value)})} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase"><span>Vertical</span> <span>{settings.titleOffsetY}px</span></div>
                       <input type="range" min="-500" max="500" value={settings.titleOffsetY} onChange={(e) => setSettings({...settings, titleOffsetY: parseInt(e.target.value)})} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                    </div>
                  </div>
                </div>

                <button onClick={() => handleDownload()} className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-gray-200 transition-all active:scale-95">
                  Export Image
                </button>
              </div>
            </section>

            <section className="flex flex-col items-center justify-center">
              {/* No transitions for instant orientation change */}
              <div className={`w-full max-w-lg ${settings.orientation === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'}`}>
                <CoverCanvas settings={settings} onExport={(url) => setPreviewUrl(url)} />
              </div>
              <div className="mt-8 flex gap-4">
                 {(['horizontal', 'vertical'] as Orientation[]).map(o => (
                   <button key={o} onClick={() => setSettings({...settings, orientation: o})} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${settings.orientation === o ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}>
                     {o} Mode
                   </button>
                 ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
            <header className="text-center space-y-4">
              <h2 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400">AI CONSISTENT EDIT</h2>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Single Generation • Multi-format Consistency</p>
            </header>

            <div className="glass-effect rounded-[2.5rem] p-8 space-y-8">
              {!sourceImage ? (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-[2rem] h-80 flex flex-col items-center justify-center gap-4 hover:border-indigo-500/50 hover:bg-white/5 transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">Upload Base Image</span>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-center">
                    <div className="w-full max-w-xs space-y-2">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Reference Source</h4>
                      <img src={sourceImage} className="rounded-2xl w-full h-48 object-cover border border-white/10 shadow-2xl grayscale" alt="Original" />
                      <button onClick={() => setSourceImage(null)} className="w-full text-[10px] text-red-400 font-black uppercase tracking-widest mt-2 hover:text-red-300 transition-colors">Replace Reference</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Horizontal Visualization */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]"></span>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-400">16:9 Landscape Video</h4>
                        </div>
                        {editedResult && (
                          <button onClick={() => handleDownload(editedResult, 'cover-horizontal.png')} className="text-[10px] font-bold text-white/50 hover:text-white transition-colors">Export 16:9</button>
                        )}
                      </div>
                      <div className="relative aspect-video w-full bg-black/40 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
                        {isEditing ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] animate-pulse">Neural Rendering...</span>
                          </div>
                        ) : editedResult ? (
                          <img src={editedResult} className="w-full h-full object-cover" alt="Horizontal Preview" />
                        ) : (
                          <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Awaiting Style</span>
                        )}
                      </div>
                    </div>

                    {/* Vertical Visualization */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></span>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">9:16 Portrait Video</h4>
                        </div>
                        {editedResult && (
                          <button onClick={() => handleDownload(editedResult, 'cover-vertical.png')} className="text-[10px] font-bold text-white/50 hover:text-white transition-colors">Export 9:16</button>
                        )}
                      </div>
                      <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto bg-black/40 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
                        {isEditing ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] animate-pulse">Neural Rendering...</span>
                          </div>
                        ) : editedResult ? (
                          <img src={editedResult} className="w-full h-full object-cover" alt="Vertical Preview" />
                        ) : (
                          <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Awaiting Style</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Prompt / 描述词</h3>
                   <input 
                    type="text"
                    placeholder="输入风格描述 (例如: 赛博朋克实验室，蓝色发光导管)"
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm placeholder:text-gray-600 font-medium"
                  />
                </div>

                <div className="space-y-2">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Style Presets / 风格预设</h3>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {PRESET_AI_STYLES.map(style => (
                        <button 
                          key={style.label} 
                          onClick={() => setEditPrompt(style.value)}
                          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-center group"
                        >
                          <span className="text-xs font-bold text-gray-300 group-hover:text-white mb-1">{style.label}</span>
                          <span className="text-[8px] font-medium text-gray-600 uppercase tracking-tighter">Preset</span>
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <button disabled={!sourceImage || !editPrompt || isEditing} onClick={handleAIEdit} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 disabled:opacity-20 transition-all active:scale-[0.98]">
                {isEditing ? 'Generating Master Consistency...' : 'Generate Consistent Backgrounds (生成同步背景)'}
              </button>
            </div>
          </div>
        )}
      </main>

      {showApiSettings && <ApiSettings onClose={() => setShowApiSettings(false)} />}
    </div>
  );
};

export default App;
