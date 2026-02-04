
import React, { useState, useRef } from 'react';
import IconCanvas, { IconCanvasHandle } from './components/IconCanvas';
import Controls from './components/Controls';
import AIPanel from './components/AIPanel';
import ExportPanel from './components/ExportPanel';
import ApiSettings from './components/ApiSettings';
import { IconConfig, GeneratedImage } from './types';
import { editIconWithGemini } from './services/geminiService';

const DEFAULT_CONFIG: IconConfig = {
  contentMode: 'text',
  text: 'P',
  imageSrc: null,
  
  bgColor: '#2962FF',
  bgType: 'solid',
  bgGradientStops: [{ offset: 0, color: '#2962FF' }, { offset: 1, color: '#0039CB' }],
  bgGradientAngle: 135,

  textColor: '#FFFFFF',
  fontSize: 250,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold',
  fontStyle: 'normal',
  
  textPositionX: 0,
  textPositionY: 0,
  letterSpacing: 0,
  lineHeight: 1.0,
  textAlign: 'center',

  borderColor: '#FFFFFF',
  borderWidth: 0,
  borderRadius: 0,
  pattern: 'none',
  patternColor: '#FFFFFF',
  patternLineWidth: 15,
  patternSpacing: 120,
  patternAngle: 0,
  patternOpacity: 0.3,
};

function App() {
  const [config, setConfig] = useState<IconConfig>(DEFAULT_CONFIG);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [showApiSettings, setShowApiSettings] = useState(false);

  const canvasRef = useRef<IconCanvasHandle>(null);

  const handleGenerateAI = async (prompt: string) => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // 1. Get the current canvas state as base64
      const currentImageBase64 = canvasRef.current.getDataUrl();
      
      // 2. Call Gemini API
      const newImageBase64 = await editIconWithGemini(currentImageBase64, prompt);
      
      // 3. Set the result
      setGeneratedImage({
        dataUrl: newImageBase64,
        prompt: prompt
      });

    } catch (err: any) {
      setError(err.message || 'Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-10 bg-[#2962FF] rounded flex items-center justify-center shadow-inner">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">IconGen AI</h1>
          </div>
          <div className="flex items-center gap-4">
             <button
               onClick={() => setShowApiSettings(true)}
               className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 transition-colors"
               title="API 设置 / API Settings"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
               API
             </button>
             <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600 font-medium">v3.2</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Editor Controls */}
          <div className="lg:col-span-4 space-y-6">
            <Controls config={config} onChange={setConfig} />
            <ExportPanel canvasRef={canvasRef} />
          </div>

          {/* Right Column: Preview & AI */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex justify-between items-center">
               <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Live Preview</h3>
               <button 
                  onClick={() => setShowAI(!showAI)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm border ${
                    showAI 
                    ? 'bg-indigo-600 text-white border-indigo-700' 
                    : 'bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50'
                  }`}
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${showAI ? 'text-indigo-200' : 'text-indigo-500'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.191 9.1c.39.244.631.675.584 1.136a1.147 1.147 0 01-.815 1.014l-3.04.94-1.147 3.04a1.147 1.147 0 01-2.138 0l-1.147-3.04-3.04-.94a1.147 1.147 0 01-.815-1.014c-.047-.461.194-.892.584-1.136l3.045-1.9 1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  {showAI ? 'Hide AI Magic' : 'Show AI Magic'}
               </button>
            </div>

            <div className={`grid grid-cols-1 ${showAI ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8 transition-all duration-300`}>
               
               {/* Center: The Canvas */}
               <div className="flex flex-col items-center">
                  <div className={`w-full flex-1 flex items-center justify-center bg-gray-200 rounded-2xl border-2 border-dashed border-gray-300 p-8 min-h-[550px] transition-all`}>
                    <div className="relative group">
                       <IconCanvas ref={canvasRef} config={config} />
                       <div className="absolute -bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 font-medium">
                         3:4 Ratio • High Resolution Output
                       </div>
                    </div>
                  </div>
               </div>

               {/* Right: AI & Result (Conditional) */}
               {showAI && (
                  <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <AIPanel onGenerate={handleGenerateAI} isGenerating={isGenerating} />

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        <strong>Error:</strong> {error}
                      </div>
                    )}

                    {/* AI Result Area */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
                       <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-gray-800">AI Variation</h3>
                          {generatedImage && (
                            <button 
                              onClick={() => handleDownload(generatedImage.dataUrl, 'icon-ai-generated.png')}
                              className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium hover:bg-purple-200 transition-colors"
                            >
                              Download PNG
                            </button>
                          )}
                       </div>
                       
                       <div className="flex-1 min-h-[300px] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 relative">
                          {isGenerating ? (
                             <div className="flex flex-col items-center justify-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-3"></div>
                                <p className="text-indigo-600 text-sm font-medium animate-pulse">Consulting Gemini...</p>
                             </div>
                          ) : generatedImage ? (
                             <img 
                               src={generatedImage.dataUrl} 
                               alt="AI Generated Icon" 
                               className="max-w-full max-h-full object-contain shadow-lg"
                             />
                          ) : (
                             <div className="text-center p-6 text-gray-400">
                                <p className="text-sm">Describe a style change above to see an AI version.</p>
                             </div>
                          )}
                       </div>
                       
                       {generatedImage && (
                          <div className="mt-3 p-2 bg-gray-50 rounded text-[10px] text-gray-500 line-clamp-2 italic">
                             "{generatedImage.prompt}"
                          </div>
                       )}
                    </div>
                  </div>
               )}
            </div>
          </div>
        </div>
      </main>

      {showApiSettings && <ApiSettings onClose={() => setShowApiSettings(false)} />}
    </div>
  );
}

export default App;
