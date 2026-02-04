export type AIProvider = 'gemini' | 'openai' | 'claude' | 'custom';

export interface ApiConfig {
  provider: AIProvider;
  apiKey: string;
  customEndpoint?: string;
  customModel?: string;
}

const DEFAULT_CONFIG: ApiConfig = {
  provider: 'gemini',
  apiKey: '',
};

class ApiService {
  private config: ApiConfig = DEFAULT_CONFIG;

  setConfig(config: Partial<ApiConfig>) {
    this.config = { ...this.config, ...config };
    localStorage.setItem('apiConfig', JSON.stringify(this.config));
  }

  getConfig(): ApiConfig {
    const saved = localStorage.getItem('apiConfig');
    if (saved) {
      try {
        this.config = JSON.parse(saved);
      } catch {
        // Use default if parse fails
      }
    }
    return { ...this.config };
  }

  getApiKey(): string {
    return this.getConfig().apiKey || process.env.API_KEY || '';
  }

  getProvider(): AIProvider {
    return this.getConfig().provider;
  }

  clearConfig() {
    this.config = DEFAULT_CONFIG;
    localStorage.removeItem('apiConfig');
  }
}

export const apiService = new ApiService();
