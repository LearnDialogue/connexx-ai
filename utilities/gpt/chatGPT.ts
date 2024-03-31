import { GPT_SYSTEM_ROLE, OPEN_API_KEY } from '@/constants/api';
import OpenAI from 'openai';

export const CHAT_GPT_MODEL = 'gpt-3.5-turbo';

export const OpenAIWrapper = new OpenAI({
  apiKey: OPEN_API_KEY,
});

export const sendMessage = async (message: any, messages: any) => {
  try {
    const response = await OpenAIWrapper.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: GPT_SYSTEM_ROLE,
        },
        ...messages,
        {
          role: 'user',
          content: message.toString(),
        },
      ],
      model: CHAT_GPT_MODEL,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
  }
};
