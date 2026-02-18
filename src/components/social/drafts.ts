const STORAGE_KEY = 'aurora-social-drafts'
const AUTOSAVE_KEY = 'aurora-social-autosave'

export interface Draft {
  id: string
  name: string
  templateId: string
  formData: Record<string, string>
  brandOverrides: { primaryColor: string; fontFamily: string; brandName: string }
  savedAt: number
}

interface AutoSave {
  activeId: string
  formData: Record<string, Record<string, string>>
  brand: { primaryColor: string; fontFamily: string; brandName: string }
  savedAt: number
}

// ── Drafts (explicit save/load) ──

export function loadDrafts(): Draft[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveDraft(draft: Omit<Draft, 'id' | 'savedAt'>): Draft {
  const drafts = loadDrafts()
  const newDraft: Draft = {
    ...draft,
    id: `draft-${Date.now()}`,
    savedAt: Date.now(),
  }
  drafts.unshift(newDraft)
  // Keep max 20 drafts
  if (drafts.length > 20) drafts.length = 20
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
  return newDraft
}

export function deleteDraft(id: string): void {
  const drafts = loadDrafts().filter((d) => d.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

// ── Auto-save (transparent restore on reload) ──

export function autoSave(data: AutoSave): void {
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data))
  } catch {
    // localStorage full — ignore
  }
}

export function loadAutoSave(): AutoSave | null {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
