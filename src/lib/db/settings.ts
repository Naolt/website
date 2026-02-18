import { getSupabase } from '../supabase'

export interface ApiKey {
  id: string
  name: string
  provider: string
  api_key: string
  model: string
  base_url: string
  is_active: boolean
  created_at: string
}

export interface AIConfig {
  provider: string
  apiKey: string
  model: string
  baseUrl: string
}

export const PROVIDER_DEFAULTS: Record<string, { baseUrl: string; model: string }> = {
  groq: { baseUrl: 'https://api.groq.com/openai/v1', model: 'llama-3.3-70b-versatile' },
  openai: { baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o' },
  together: { baseUrl: 'https://api.together.xyz/v1', model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo' },
  fireworks: { baseUrl: 'https://api.fireworks.ai/inference/v1', model: 'accounts/fireworks/models/llama-v3p3-70b-instruct' },
}

export async function getApiKeys(): Promise<ApiKey[]> {
  const { data, error } = await getSupabase()
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as ApiKey[]
}

export async function createApiKey(key: {
  name: string
  provider: string
  api_key: string
  model: string
  base_url: string
}): Promise<ApiKey> {
  const { data, error } = await getSupabase()
    .from('api_keys')
    .insert(key)
    .select()
    .single()

  if (error) throw error
  return data as ApiKey
}

export async function deleteApiKey(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from('api_keys')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function activateApiKey(id: string): Promise<void> {
  // Deactivate all keys first
  const { error: deactivateError } = await getSupabase()
    .from('api_keys')
    .update({ is_active: false })
    .eq('is_active', true)

  if (deactivateError) throw deactivateError

  // Activate the chosen key
  const { error } = await getSupabase()
    .from('api_keys')
    .update({ is_active: true })
    .eq('id', id)

  if (error) throw error
}

export async function getAIConfig(): Promise<AIConfig> {
  try {
    const { data, error } = await getSupabase()
      .from('api_keys')
      .select('*')
      .eq('is_active', true)
      .single()

    if (error || !data) throw new Error('No active key')

    return {
      provider: data.provider,
      apiKey: data.api_key,
      model: data.model,
      baseUrl: data.base_url,
    }
  } catch {
    // Fallback to env vars
    return {
      provider: 'groq',
      apiKey: process.env.GROQ_API_KEY || '',
      model: 'llama-3.3-70b-versatile',
      baseUrl: 'https://api.groq.com/openai/v1',
    }
  }
}
