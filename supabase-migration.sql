-- Supabase migration for Aurora Social Editor
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New Query)

-- Chat conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Drafts table
CREATE TABLE IF NOT EXISTS drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  template_id text NOT NULL,
  form_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  brand_overrides jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Disable RLS (internal tool, no auth needed)
ALTER TABLE chat_conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE drafts DISABLE ROW LEVEL SECURITY;

-- API keys table (multiple keys, one active at a time)
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  provider text NOT NULL DEFAULT 'groq',
  api_key text NOT NULL,
  model text NOT NULL,
  base_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE api_keys DISABLE ROW LEVEL SECURITY;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_conversations_updated ON chat_conversations (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_drafts_created ON drafts (created_at DESC);
