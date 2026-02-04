
import { GoogleGenAI } from "@google/genai";
import { apiService } from "./apiService";

const getAI = () => {
  const apiKey = apiService.getApiKey();
  if (!apiKey) {
    throw new Error("请先在设置中配置 API Key。Please configure API Key in settings first.");
  }
  return new GoogleGenAI({ apiKey });
};

export async function editImageWithGemini(
  base64Image: string,
  prompt: string,
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "1:1",
  seed?: number,
  mimeType: string = 'image/png'
): Promise<string> {
  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
        // Using a seed can help with consistency between horizontal/vertical generations
        seed: seed,
      },
    });

    let imageUrl = '';
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("AI did not return an edited image part.");
    }

    return imageUrl;
  } catch (error: any) {
    console.error("AI Edit Error:", error);
    throw error;
  }
}
