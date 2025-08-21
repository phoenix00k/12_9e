import { AIModel } from '../types';

const OPENROUTER_API_KEY = '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';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const aiModels: AIModel[] = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    provider: 'openrouter',
    model_id: 'deepseek/deepseek-chat',
    description: 'Advanced reasoning and coding capabilities',
    strengths: ['Code Generation', 'Complex Reasoning', 'Mathematics'],
    free_tier: true
  },
  {
    id: 'gemma',
    name: 'Gemma 2',
    provider: 'openrouter',
    model_id: 'google/gemma-2-9b-it:free',
    description: 'Google\'s efficient language model',
    strengths: ['Fast Responses', 'Efficient', 'Multilingual'],
    free_tier: true
  },
  {
    id: 'gpt35',
    name: 'GPT-3.5 Turbo',
    provider: 'openrouter',
    model_id: 'openai/gpt-3.5-turbo',
    description: 'OpenAI\'s versatile language model',
    strengths: ['General Purpose', 'Creative Writing', 'Conversation'],
    free_tier: true
  },
  {
    id: 'mistral',
    name: 'Mistral 7B',
    provider: 'openrouter',
    model_id: 'mistralai/mistral-7b-instruct:free',
    description: 'Efficient and capable open-source model',
    strengths: ['Instruction Following', 'Efficiency', 'Open Source'],
    free_tier: true
  }
];

export const sendMessageToAI = async (message: string, modelId: string): Promise<string> => {
  try {
    const model = aiModels.find(m => m.id === modelId);
    if (!model) throw new Error('Model not found');

    if (model.provider === 'openrouter') {
      const response = await fetch(OPENROUTER_BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model.model_id,
          messages: [{ role: 'user', content: message }],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response received';
    }

    return 'Model provider not implemented yet';
  } catch (error) {
    console.error('AI API Error:', error);
    return 'Sorry, there was an error processing your request.';
  }
};