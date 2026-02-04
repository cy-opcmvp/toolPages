import React, { useState } from 'react';

interface AIPanelProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const AIPanel: React.FC<AIPanelProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100">
      <h2 className="text-lg font-semibold mb-2 text-indigo-900 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        AI Magic Editor
      </h2>
      <p className="text-sm text-indigo-700 mb-4">
        Powered by Gemini 2.5 Flash Image. Describe how you want to transform your icon.
      </p>

      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Make it look like a 3D metallic neon sign on a brick wall..."
          className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] resize-none text-sm"
          disabled={isGenerating}
        />
        
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all shadow-md
            ${isGenerating || !prompt.trim() 
              ? 'bg-indigo-300 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:transform active:scale-[0.98]'
            }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate with Gemini'
          )}
        </button>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wider">Try:</span>
        {['Cyberpunk style', 'Hand-drawn sketch', 'Realistic glass texture', 'Pixel art'].map((suggestion) => (
          <button 
            key={suggestion}
            onClick={() => setPrompt(suggestion)}
            className="text-xs bg-white border border-indigo-200 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIPanel;
