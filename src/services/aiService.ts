import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ParsingResult {
  medicalHistory: string;
  medicalRecord: string;
}

export async function analyzeMedicalRecord(base64Image: string, mimeType: string): Promise<ParsingResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              text: `你是一个专业的医疗档案解析助手。请阅读这张病历或医疗报告图片，从中提取关键信息，并将其整理到以下两个字段中：
1. medicalHistory (现病史/健康史): 包含过敏史、目前确诊的疾病、近期的主要症状等。
2. medicalRecord (医嘱记录/既往史): 包含医生建议、用药说明、既往住院史、手术史等。

请以中文回复。如果信息不明确，请根据有限信息进行最合理的概括。不要包含任何除JSON以外的内容。`,
            },
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            medicalHistory: {
              type: Type.STRING,
              description: "提取的现病史和过敏信息",
            },
            medicalRecord: {
              type: Type.STRING,
              description: "提取的既往史、体检和手术记录",
            },
          },
          required: ["medicalHistory", "medicalRecord"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("AI未能生成有效的解析结果");
    }

    return JSON.parse(resultText);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
}
