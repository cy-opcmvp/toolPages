import { GoogleGenAI } from "@google/genai";
import { apiService } from "./apiService";

const getAI = () => {
  const apiKey = apiService.getApiKey();
  if (!apiKey) {
    throw new Error("请先在设置中配置 API Key。Please configure API Key in settings first.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Edits an icon image using Gemini 2.5 Flash Image based on a text prompt.
 * 
 * @param imageBase64 The base64 string of the source image (including data:image/... prefix)
 * @param prompt The user's text instruction
 * @returns The base64 string of the generated image
 */
export const editIconWithGemini = async (imageBase64: string, prompt: string): Promise<string> => {
  try {
    const ai = getAI();
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: base64Data,
            },
          },
          {
            text: `Edit this app icon. ${prompt}. Keep the aspect ratio 3:4. Return only the image.`,
          },
        ],
      },
    });

    // Extract image from response
    // The response structure for image generation usually contains inlineData in the parts
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content returned from Gemini");
    }

    let generatedBase64 = '';

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        generatedBase64 = part.inlineData.data;
        break;
      }
    }

    if (!generatedBase64) {
      throw new Error("No image data generated");
    }

    return `data:image/png;base64,${generatedBase64}`;

  } catch (error) {
    console.error("Error generating icon:", error);
    throw error;
  }
};
