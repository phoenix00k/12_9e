/*
  # Thanos AI Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `tier` (text, enum: 'free', 'premium')
      - `total_donations` (numeric, default 0)
      - `created_at` (timestamp)
    
    - `chat_messages` 
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `message` (text)
      - `response` (text)
      - `model` (text)
      - `created_at` (timestamp)
    
    - `donations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `amount` (numeric)
      - `status` (text, enum: 'pending', 'completed')
      - `created_at` (timestamp)

    - `ai_models`
      - `id` (uuid, primary key)
      - `name` (text)
      - `provider` (text)
      - `model_id` (text)
      - `description` (text)
      - `strengths` (text array)
      - `free_tier` (boolean)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
  total_donations numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  response text NOT NULL,
  model text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- AI models table
CREATE TABLE IF NOT EXISTS ai_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  provider text NOT NULL,
  model_id text NOT NULL,
  description text NOT NULL,
  strengths text[] DEFAULT '{}',
  free_tier boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Chat messages policies
CREATE POLICY "Users can read own messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Donations policies
CREATE POLICY "Users can read own donations"
  ON donations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own donations"
  ON donations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- AI models policies (public read)
CREATE POLICY "Anyone can read ai_models"
  ON ai_models FOR SELECT
  TO authenticated
  USING (true);

-- Insert default AI models
INSERT INTO ai_models (name, provider, model_id, description, strengths, free_tier) VALUES
  ('DeepSeek', 'openrouter', 'deepseek/deepseek-chat', 'Advanced reasoning and coding capabilities', ARRAY['Code Generation', 'Complex Reasoning', 'Mathematics'], true),
  ('Gemma 2', 'openrouter', 'google/gemma-2-9b-it:free', 'Google''s efficient language model', ARRAY['Fast Responses', 'Efficient', 'Multilingual'], true),
  ('GPT-3.5 Turbo', 'openrouter', 'openai/gpt-3.5-turbo', 'OpenAI''s versatile language model', ARRAY['General Purpose', 'Creative Writing', 'Conversation'], true),
  ('Mistral 7B', 'openrouter', 'mistralai/mistral-7b-instruct:free', 'Efficient and capable open-source model', ARRAY['Instruction Following', 'Efficiency', 'Open Source'], true);