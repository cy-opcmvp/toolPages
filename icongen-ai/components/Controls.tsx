import React, { useState } from 'react';
import { IconConfig, Preset } from '../types';

interface ControlsProps {
  config: IconConfig;
  onChange: (newConfig: IconConfig) => void;
}

const FONTS = [
  { name: 'Inter (Sans)', value: 'Inter, sans-serif' },
  { name: 'Roboto Mono (Code)', value: '"Roboto Mono", monospace' },
  { name: 'Playfair (Serif)', value: '"Playfair Display", serif' },
  { name: 'Pacifico (Hand)', value: '"Pacifico", cursive' },
  { name: 'System', value: 'sans-serif' },
];

const PATTERNS = [
  { name: 'None', value: 'none' },
  { name: 'Grid', value: 'grid' },
  { name: 'Stripes', value: 'stripes' },
  { name: 'Waves', value: 'waves' },
];

const PRESETS: Preset[] = [
  { 
    name: 'Classic Blue',
    config: {
        bgType: 'solid',
        bgColor: '#2962FF',
        textColor: '#FFFFFF',
        pattern: 'none',
        borderColor: '#FFFFFF',
        borderWidth: 0
    }
  },
  { 
    name: 'Sunset Glow', 
    config: { 
      bgType: 'gradient-linear', 
      bgGradientStops: [{offset: 0, color: '#FF512F'}, {offset: 1, color: '#DD2476'}], 
      bgGradientAngle: 45,
      textColor: '#FFFFFF',
      pattern: 'none',
      borderColor: '#FFFFFF',
      borderWidth: 10
    } 
  },
  { 
    name: 'Ocean Waves', 
    config: { 
      bgType: 'gradient-linear', 
      bgGradientStops: [{offset: 0, color: '#2193b0'}, {offset: 1, color: '#6dd5ed'}], 
      bgGradientAngle: 180,
      textColor: '#FFFFFF',
      pattern: 'waves',
      patternColor: '#FFFFFF',
      patternAngle: 0,
      patternSpacing: 100,
      patternOpacity: 0.2,
      borderColor: '#86efac',
      borderWidth: 0
    } 
  },
  { 
    name: 'Neon Cyber', 
    config: { 
      bgType: 'gradient-radial', 
      bgGradientStops: [{offset: 0, color: '#0F2027'}, {offset: 0.5, color: '#203A43'}, {offset: 1, color: '#2C5364'}], 
      textColor: '#00FFCC',
      pattern: 'grid',
      patternColor: '#00FFCC',
      patternLineWidth: 2,
      patternAngle: 0,
      patternSpacing: 100,
      patternOpacity: 0.4,
      borderColor: '#00FFCC',
      borderWidth: 6
    } 
  },
  {
      name: 'Midnight Dev',
      config: {
          bgType: 'solid',
          bgColor: '#0f172a',
          textColor: '#38bdf8',
          pattern: 'grid',
          patternColor: '#334155',
          patternSpacing: 80,
          patternOpacity: 0.6,
          borderColor: '#1e293b',
          borderWidth: 20
      }
  },
  {
      name: 'Solar Strike',
      config: {
          bgType: 'gradient-linear',
          bgGradientStops: [{offset: 0, color: '#f59e0b'}, {offset: 1, color: '#ef4444'}],
          bgGradientAngle: 135,
          textColor: '#ffffff',
          pattern: 'stripes',
          patternColor: '#ffffff',
          patternAngle: 45,
          patternLineWidth: 8,
          patternOpacity: 0.15,
          borderColor: '#ffffff',
          borderWidth: 0
      }
  },
  {
      name: 'Fresh Mint',
      config: {
          bgType: 'gradient-linear',
          bgGradientStops: [{offset: 0, color: '#34d399'}, {offset: 1, color: '#10b981'}],
          bgGradientAngle: 90,
          textColor: '#ffffff',
          pattern: 'none',
          borderColor: '#ecfdf5',
          borderWidth: 12
      }
  },
  {
      name: 'Purple Haze',
      config: {
          bgType: 'gradient-radial',
          bgGradientStops: [{offset: 0, color: '#d8b4fe'}, {offset: 1, color: '#7e22ce'}],
          textColor: '#ffffff',
          pattern: 'waves',
          patternColor: '#ffffff',
          patternSpacing: 60,
          patternAngle: 15,
          patternOpacity: 0.15,
          borderColor: '#faf5ff',
          borderWidth: 8
      }
  },
  {
      name: 'Slate Heavy',
      config: {
          bgType: 'solid',
          bgColor: '#334155',
          textColor: '#f1f5f9',
          borderColor: '#94a3b8',
          borderWidth: 30,
          pattern: 'none'
      }
  },
  {
      name: 'Gold Rush',
      config: {
          bgType: 'gradient-linear',
          bgGradientStops: [{offset: 0, color: '#fcd34d'}, {offset: 1, color: '#b45309'}],
          bgGradientAngle: 180,
          textColor: '#fffbeb',
          pattern: 'none',
          borderColor: '#78350f',
          borderWidth: 4
      }
  },
  {
      name: 'Arctic Glass',
      config: {
          bgType: 'gradient-linear',
          bgGradientStops: [{offset: 0, color: '#e0f2fe'}, {offset: 1, color: '#38bdf8'}],
          bgGradientAngle: 45,
          textColor: '#0c4a6e',
          pattern: 'waves',
          patternColor: '#ffffff',
          patternSpacing: 120,
          patternAngle: 0,
          patternOpacity: 0.5,
          borderColor: '#ffffff',
          borderWidth: 16
      }
  },
  {
      name: 'Red Alert',
      config: {
          bgType: 'gradient-radial',
          bgGradientStops: [{offset: 0, color: '#ef4444'}, {offset: 0.8, color: '#7f1d1d'}],
          textColor: '#ffffff',
          pattern: 'stripes',
          patternColor: '#000000',
          patternAngle: 90,
          patternSpacing: 40,
          patternOpacity: 0.2,
          borderColor: '#000000',
          borderWidth: 8
      }
  },
  {
      name: 'Candy Pop',
      config: {
          bgType: 'gradient-linear',
          bgGradientStops: [{offset: 0, color: '#f472b6'}, {offset: 1, color: '#22d3ee'}],
          bgGradientAngle: 135,
          textColor: '#ffffff',
          pattern: 'none',
          borderColor: '#ffffff',
          borderWidth: 15
      }
  },
  {
      name: 'Blueprint',
      config: {
          bgType: 'solid',
          bgColor: '#172554',
          textColor: '#ffffff',
          pattern: 'grid',
          patternColor: '#ffffff',
          patternLineWidth: 1,
          patternSpacing: 60,
          patternAngle: 0,
          patternOpacity: 0.4,
          borderColor: '#ffffff',
          borderWidth: 5
      }
  },
  {
      name: 'Mono Thick',
      config: {
          bgType: 'solid',
          bgColor: '#ffffff',
          textColor: '#000000',
          borderColor: '#000000',
          borderWidth: 40,
          pattern: 'none'
      }
  },
  {
      name: 'Espresso',
      config: {
          bgType: 'gradient-linear',
          bgGradientStops: [{offset: 0, color: '#78350f'}, {offset: 1, color: '#451a03'}],
          bgGradientAngle: 180,
          textColor: '#fef3c7',
          pattern: 'waves',
          patternColor: '#d97706',
          patternAngle: 0,
          patternOpacity: 0.2,
          borderColor: '#92400e',
          borderWidth: 2
      }
  }
];

// Helper Component for Collapsible Sections
const Section = ({ title, children, defaultOpen = false }: { title: string, children?: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600">{title}</h2>
        <svg 
            className={`w-4 h-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="p-5 border-t border-gray-100">{children}</div>}
    </div>
  );
};

const Controls: React.FC<ControlsProps> = ({ config, onChange }) => {
  const handleChange = (key: keyof IconConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const applyPreset = (presetConfig: Partial<IconConfig>) => {
      onChange({ ...config, ...presetConfig });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('imageSrc', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Quick Presets */}
      <Section title="Quick Presets" defaultOpen={true}>
        <div className="grid grid-cols-4 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.config)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all group"
            >
              <div 
                className="w-8 h-8 rounded-full shadow-sm border border-gray-200 group-hover:scale-110 transition-transform overflow-hidden relative box-border"
                style={{
                    background: preset.config.bgType === 'solid' 
                        ? preset.config.bgColor 
                        : `linear-gradient(135deg, ${preset.config.bgGradientStops?.[0]?.color}, ${preset.config.bgGradientStops?.[1]?.color || preset.config.bgGradientStops?.[0]?.color})`,
                    border: preset.config.borderWidth && preset.config.borderWidth > 0 
                        ? `${Math.min(preset.config.borderWidth / 4, 4)}px solid ${preset.config.borderColor}` 
                        : 'none'
                }}
              >
                  {preset.config.pattern && preset.config.pattern !== 'none' && (
                      <div className="absolute inset-0" style={{ 
                          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
                          backgroundSize: '4px 4px',
                          opacity: preset.config.patternOpacity || 0.3 
                      }}></div>
                  )}
              </div>
              <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">{preset.name}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* 2. Content (Text vs Image) */}
      <Section title="Content" defaultOpen={true}>
        <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
            <button 
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${config.contentMode === 'text' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleChange('contentMode', 'text')}
            >
                Text
            </button>
            <button 
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${config.contentMode === 'image' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleChange('contentMode', 'image')}
            >
                Image / Texture
            </button>
        </div>

        {config.contentMode === 'text' ? (
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Text Content</label>
                    <textarea
                        value={config.text}
                        onChange={(e) => handleChange('text', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg min-h-[80px]"
                        placeholder="Type text..."
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Supports multiple lines</p>
                </div>
                
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Color</label>
                        <div className="flex items-center gap-2 border border-gray-200 rounded p-1">
                            <input
                                type="color"
                                value={config.textColor}
                                onChange={(e) => handleChange('textColor', e.target.value)}
                                className="h-6 w-8 rounded cursor-pointer border-0 p-0 overflow-hidden"
                            />
                            <span className="text-xs font-mono text-gray-500">{config.textColor}</span>
                        </div>
                    </div>
                     <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Font</label>
                        <select 
                            value={config.fontFamily}
                            onChange={(e) => handleChange('fontFamily', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm bg-white"
                        >
                            {FONTS.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="font-semibold text-gray-700">Size</span>
                        <span>{config.fontSize}px</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="500"
                        value={config.fontSize}
                        onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Spacing</span>
                            <span>{config.letterSpacing}px</span>
                        </div>
                        <input
                            type="range"
                            min="-50"
                            max="100"
                            value={config.letterSpacing}
                            onChange={(e) => handleChange('letterSpacing', Number(e.target.value))}
                            className="w-full accent-blue-600 h-1"
                        />
                    </div>
                     <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Line Height</span>
                            <span>{config.lineHeight}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={config.lineHeight}
                            onChange={(e) => handleChange('lineHeight', Number(e.target.value))}
                            className="w-full accent-blue-600 h-1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                         <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Pos X</span>
                            <span>{config.textPositionX}</span>
                        </div>
                        <input
                            type="range"
                            min="-300"
                            max="300"
                            value={config.textPositionX}
                            onChange={(e) => handleChange('textPositionX', Number(e.target.value))}
                            className="w-full accent-blue-600 h-1"
                        />
                    </div>
                    <div>
                         <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Pos Y</span>
                            <span>{config.textPositionY}</span>
                        </div>
                        <input
                            type="range"
                            min="-300"
                            max="300"
                            value={config.textPositionY}
                            onChange={(e) => handleChange('textPositionY', Number(e.target.value))}
                            className="w-full accent-blue-600 h-1"
                        />
                    </div>
                </div>
                
                 <div className="flex items-center gap-2 justify-center pt-2">
                   <button 
                     onClick={() => handleChange('fontWeight', config.fontWeight === 'bold' ? 'normal' : 'bold')}
                     className={`px-3 py-1 rounded text-xs border ${config.fontWeight === 'bold' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-200'}`}
                   >
                     Bold
                   </button>
                   <button 
                     onClick={() => handleChange('fontStyle', config.fontStyle === 'italic' ? 'normal' : 'italic')}
                     className={`px-3 py-1 rounded text-xs border ${config.fontStyle === 'italic' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-200'}`}
                   >
                     Italic
                   </button>
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {config.imageSrc ? (
                        <div className="flex flex-col items-center">
                            <img src={config.imageSrc} alt="Uploaded" className="h-16 w-16 object-contain mb-2 rounded shadow-sm border" />
                            <span className="text-xs text-blue-600 font-medium">Click to change image</span>
                        </div>
                    ) : (
                        <div className="text-gray-500">
                             <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m0 0v4a4 4 0 004 4h20a4 4 0 004-4V28m-4-4h-4m-12 4h12a4 4 0 004-4V12a4 4 0 00-4-4h-4m-12 8v-2m4 4h12m-12-4h12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-xs font-medium">Upload Image / Logo</span>
                        </div>
                    )}
                </div>
                 {config.imageSrc && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-xs font-semibold text-gray-700 mb-1">Scale</label>
                             <input
                                type="range"
                                min="50"
                                max="500"
                                value={config.fontSize} // Reusing fontSize for image scale
                                onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                                className="w-full accent-blue-600 h-1"
                             />
                        </div>
                         <div>
                             <label className="block text-xs font-semibold text-gray-700 mb-1">Pos Y</label>
                             <input
                                type="range"
                                min="-300"
                                max="300"
                                value={config.textPositionY}
                                onChange={(e) => handleChange('textPositionY', Number(e.target.value))}
                                className="w-full accent-blue-600 h-1"
                             />
                        </div>
                    </div>
                )}
            </div>
        )}
      </Section>

      {/* 3. Background */}
      <Section title="Background">
        <div className="space-y-4">
             <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                <button 
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${config.bgType === 'solid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleChange('bgType', 'solid')}
                >
                    Solid
                </button>
                <button 
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${config.bgType.startsWith('gradient') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleChange('bgType', 'gradient-linear')}
                >
                    Gradient
                </button>
            </div>

            {config.bgType === 'solid' ? (
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Background Color</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={config.bgColor}
                            onChange={(e) => handleChange('bgColor', e.target.value)}
                            className="h-8 w-full rounded cursor-pointer border border-gray-200 p-1"
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex gap-2 mb-2">
                        <button 
                             onClick={() => handleChange('bgType', 'gradient-linear')}
                             className={`flex-1 text-[10px] py-1 border rounded ${config.bgType === 'gradient-linear' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200'}`}
                        >
                            Linear
                        </button>
                         <button 
                             onClick={() => handleChange('bgType', 'gradient-radial')}
                             className={`flex-1 text-[10px] py-1 border rounded ${config.bgType === 'gradient-radial' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200'}`}
                        >
                            Radial
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                         <label className="text-xs font-semibold text-gray-700">Colors</label>
                         {/* Simple color picker for just 2 stops for this UI iteration */}
                    </div>
                    
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <span className="text-[10px] text-gray-500">Start</span>
                             <input
                                type="color"
                                value={config.bgGradientStops[0]?.color || '#ffffff'}
                                onChange={(e) => {
                                    const newStops = [...config.bgGradientStops];
                                    newStops[0] = { ...newStops[0], color: e.target.value };
                                    handleChange('bgGradientStops', newStops);
                                }}
                                className="h-8 w-full rounded cursor-pointer border border-gray-200 p-1"
                            />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] text-gray-500">End</span>
                             <input
                                type="color"
                                value={config.bgGradientStops[config.bgGradientStops.length - 1]?.color || '#000000'}
                                onChange={(e) => {
                                    const newStops = [...config.bgGradientStops];
                                    newStops[newStops.length - 1] = { ...newStops[newStops.length - 1], color: e.target.value };
                                    handleChange('bgGradientStops', newStops);
                                }}
                                className="h-8 w-full rounded cursor-pointer border border-gray-200 p-1"
                            />
                        </div>
                    </div>

                    {config.bgType === 'gradient-linear' && (
                        <div>
                             <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Angle</span>
                                <span>{config.bgGradientAngle}°</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={config.bgGradientAngle}
                                onChange={(e) => handleChange('bgGradientAngle', Number(e.target.value))}
                                className="w-full accent-blue-600 h-1"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
      </Section>

      {/* 4. Pattern */}
      <Section title="Pattern">
          <div>
            <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
               {PATTERNS.map(p => (
                 <button
                   key={p.value}
                   onClick={() => handleChange('pattern', p.value)}
                   className={`flex-1 text-[10px] py-1.5 rounded-md transition-all ${config.pattern === p.value ? 'bg-white text-blue-600 shadow-sm font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   {p.name}
                 </button>
               ))}
            </div>

            {config.pattern !== 'none' && (
              <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-3">
                 <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-600">Color</label>
                    <input
                      type="color"
                      value={config.patternColor}
                      onChange={(e) => handleChange('patternColor', e.target.value)}
                      className="h-6 w-6 rounded-full cursor-pointer border border-gray-200 p-0 overflow-hidden"
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                           <span>Opacity</span>
                           <span>{Math.round((config.patternOpacity || 0.3) * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="1"
                          step="0.05"
                          value={config.patternOpacity || 0.3}
                          onChange={(e) => handleChange('patternOpacity', Number(e.target.value))}
                          className="w-full accent-blue-600 h-1"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                           <span>Angle</span>
                           <span>{config.patternAngle || 0}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={config.patternAngle || 0}
                          onChange={(e) => handleChange('patternAngle', Number(e.target.value))}
                          className="w-full accent-blue-600 h-1"
                        />
                     </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                           <span>Thickness</span>
                           <span>{config.patternLineWidth}px</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="50"
                          value={config.patternLineWidth}
                          onChange={(e) => handleChange('patternLineWidth', Number(e.target.value))}
                          className="w-full accent-blue-600 h-1"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                           <span>Spacing</span>
                           <span>{config.patternSpacing}px</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="300"
                          value={config.patternSpacing}
                          onChange={(e) => handleChange('patternSpacing', Number(e.target.value))}
                          className="w-full accent-blue-600 h-1"
                        />
                     </div>
                 </div>
              </div>
            )}
          </div>
      </Section>

      {/* 5. Border & Shape */}
      <Section title="Border & Shape">
         <div className="space-y-4">
             <div>
                 <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-700">Border Width</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.borderColor}
                        onChange={(e) => handleChange('borderColor', e.target.value)}
                        className="h-5 w-5 rounded-full cursor-pointer border border-gray-200 p-0 overflow-hidden"
                        title="Border Color"
                      />
                      <span className="text-xs text-gray-500">{config.borderWidth}px</span>
                    </div>
                 </div>
                 <input
                  type="range"
                  min="0"
                  max="200"
                  value={config.borderWidth}
                  onChange={(e) => handleChange('borderWidth', Number(e.target.value))}
                  className="w-full accent-blue-600 h-1"
                />
             </div>

             <div>
                <div className="flex justify-between mb-1">
                   <label className="block text-xs font-semibold text-gray-700">Corner Radius</label>
                   <span className="text-xs text-gray-500">{config.borderRadius}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.borderRadius}
                  onChange={(e) => handleChange('borderRadius', Number(e.target.value))}
                  className="w-full accent-blue-600 h-1"
                />
             </div>
         </div>
      </Section>

    </div>
  );
};

export default Controls;
