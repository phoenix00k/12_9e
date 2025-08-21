export interface User {
  id: string;
  email: string;
  tier: 'free' | 'premium';
  created_at: string;
  total_donations: number;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  model: string;
  created_at: string;
}

export interface Donation {
  id: string;
  user_id: string;
  amount: number;
  created_at: string;
  status: 'pending' | 'completed';
}

export interface AIModel {
  id: string;
  name: string;
  provider: 'openrouter' | 'gemini';
  model_id: string;
  description: string;
  strengths: string[];
  free_tier: boolean;
}