import { getSupabase } from '../supabase'

export interface SupabaseDraft {
  id: string
  name: string
  template_id: string
  form_data: Record<string, string>
  brand_overrides: { primaryColor: string; fontFamily: string; brandName: string }
  created_at: string
}

export async function getDrafts(): Promise<SupabaseDraft[]> {
  const { data, error } = await getSupabase()
    .from('drafts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) throw error
  return data as SupabaseDraft[]
}

export async function createDraft(draft: {
  name: string
  template_id: string
  form_data: Record<string, string>
  brand_overrides: { primaryColor: string; fontFamily: string; brandName: string }
}): Promise<SupabaseDraft> {
  const { data, error } = await getSupabase()
    .from('drafts')
    .insert(draft)
    .select()
    .single()

  if (error) throw error
  return data as SupabaseDraft
}

export async function deleteDraft(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from('drafts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
