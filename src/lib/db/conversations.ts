import { getSupabase } from '../supabase'

export interface Conversation {
  id: string
  title: string
  messages: { role: 'user' | 'assistant'; content: string }[]
  created_at: string
  updated_at: string
}

export async function getConversations(): Promise<Conversation[]> {
  const { data, error } = await getSupabase()
    .from('chat_conversations')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return data as Conversation[]
}

export async function getConversation(id: string): Promise<Conversation | null> {
  const { data, error } = await getSupabase()
    .from('chat_conversations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Conversation
}

export async function createConversation(
  title: string,
  messages: { role: 'user' | 'assistant'; content: string }[]
): Promise<Conversation> {
  const { data, error } = await getSupabase()
    .from('chat_conversations')
    .insert({ title, messages })
    .select()
    .single()

  if (error) throw error
  return data as Conversation
}

export async function updateConversation(
  id: string,
  messages: { role: 'user' | 'assistant'; content: string }[]
): Promise<void> {
  const { error } = await getSupabase()
    .from('chat_conversations')
    .update({ messages, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}

export async function deleteConversation(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from('chat_conversations')
    .delete()
    .eq('id', id)

  if (error) throw error
}
