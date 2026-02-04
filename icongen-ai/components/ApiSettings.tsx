import React, { useState, useEffect } from 'react';
import { apiService, AIProvider } from '../services/apiService';

interface ApiSettingsProps {
  onClose: () => void;
}

const ApiSettings: React.FC<ApiSettingsProps> = ({ onClose }) => {
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const config = apiService.getConfig();
    setProvider(config.provider);
    setApiKey(config.apiKey);
  }, []);

  const handleSave = () => {
    apiService.setConfig({ provider, apiKey });
    alert('设置已保存！Settings saved!');
    onClose();
  };

  const handleClear = () => {
    apiService.clearConfig();
    setApiKey('');
    alert('设置已清除！Settings cleared!');
  };

  const providers: { value: AIProvider; label: string; icon: string }[] = [
    { value: 'gemini', label: 'Google Gemini', icon: '🔮' },
    { value: 'openai', label: 'OpenAI GPT-4 Vision', icon: '🤖' },
    { value: 'claude', label: 'Anthropic Claude', icon: '🧠' },
    { value: 'custom', label: '自定义 API / Custom', icon: '⚙️' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">API 设置 / API Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Provider Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              AI 服务商 / AI Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              {providers.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setProvider(p.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    provider === p.value
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{p.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              API 密钥 / API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="输入您的 API Key / Enter your API Key"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-24 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-mono placeholder:text-gray-400"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-700 px-2 py-1"
              >
                {showKey ? '隐藏' : '显示'}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              💡 Key 将保存在浏览器本地存储中 / Key stored in browser localStorage
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={!apiKey}
              className="flex-1 bg-indigo-600 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-indigo-700 active:scale-95"
            >
              保存 / Save
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
            >
              清除 / Clear
            </button>
          </div>

          {/* Help Text */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              📌 <span className="text-gray-700">获取 API Key:</span><br />
              • Gemini: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">aistudio.google.com</a><br />
              • OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">platform.openai.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;
