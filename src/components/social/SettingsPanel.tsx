'use client'

import { useState, useEffect, useCallback } from 'react'

const PROVIDERS = [
  { id: 'groq', name: 'Groq', baseUrl: 'https://api.groq.com/openai/v1', model: 'llama-3.3-70b-versatile' },
  { id: 'openai', name: 'OpenAI', baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o' },
  { id: 'together', name: 'Together', baseUrl: 'https://api.together.xyz/v1', model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo' },
  { id: 'fireworks', name: 'Fireworks', baseUrl: 'https://api.fireworks.ai/inference/v1', model: 'accounts/fireworks/models/llama-v3p3-70b-instruct' },
  { id: 'custom', name: 'Custom', baseUrl: '', model: '' },
]

interface SavedKey {
  id: string
  name: string
  provider: string
  model: string
  base_url: string
  is_active: boolean
  api_key_masked: string
}

interface SettingsPanelProps {
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [keys, setKeys] = useState<SavedKey[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)

  // Add form state
  const [name, setName] = useState('')
  const [provider, setProvider] = useState('groq')
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('llama-3.3-70b-versatile')
  const [baseUrl, setBaseUrl] = useState('https://api.groq.com/openai/v1')
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const loadKeys = useCallback(async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      setKeys(data.keys || [])
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    loadKeys().finally(() => setLoading(false))
  }, [loadKeys])

  const handleProviderChange = useCallback((id: string) => {
    setProvider(id)
    const preset = PROVIDERS.find((p) => p.id === id)
    if (preset) {
      setBaseUrl(preset.baseUrl)
      setModel(preset.model)
    }
  }, [])

  const handleAdd = useCallback(async () => {
    if (!name.trim() || !apiKey.trim()) return
    setSaving(true)
    setStatus(null)

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, provider, apiKey, model, baseUrl }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to add key')
      }
      setStatus({ type: 'success', message: 'Key added' })
      setName('')
      setApiKey('')
      setShowAdd(false)
      await loadKeys()
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : 'Failed' })
    } finally {
      setSaving(false)
    }
  }, [name, provider, apiKey, model, baseUrl, loadKeys])

  const handleActivate = useCallback(async (id: string) => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'activate', id }),
      })
      await loadKeys()
    } catch { /* ignore */ }
  }, [loadKeys])

  const handleDelete = useCallback(async (id: string) => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      })
      await loadKeys()
    } catch { /* ignore */ }
  }, [loadKeys])

  const labelStyle = {
    display: 'block' as const,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: 500 as const,
    marginBottom: 6,
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: '10px 12px',
    color: '#fff',
    fontSize: 12,
    fontFamily: "'Lexend', sans-serif",
    outline: 'none',
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        fontFamily: "'Lexend', sans-serif",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          width: 460,
          maxHeight: '80vh',
          background: '#111',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: '#BFFF00' }}>
              AI Settings
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
              Manage API keys &middot; activate one at a time
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 20, cursor: 'pointer', padding: '4px 8px', fontFamily: "'Lexend', sans-serif" }}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
              Loading...
            </div>
          ) : (
            <>
              {/* Saved keys list */}
              {keys.length === 0 && !showAdd && (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
                  No API keys saved. Using env variable fallback.
                </div>
              )}

              {keys.map((k) => (
                <div
                  key={k.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: k.is_active ? '1px solid rgba(191,255,0,0.25)' : '1px solid rgba(255,255,255,0.06)',
                    background: k.is_active ? 'rgba(191,255,0,0.05)' : 'rgba(255,255,255,0.02)',
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: k.is_active ? '#BFFF00' : 'rgba(255,255,255,0.7)' }}>
                        {k.name}
                      </span>
                      {k.is_active && (
                        <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(191,255,0,0.15)', color: '#BFFF00', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                          Active
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {!k.is_active && (
                        <button
                          onClick={() => handleActivate(k.id)}
                          style={{
                            padding: '4px 10px', borderRadius: 6,
                            border: '1px solid rgba(191,255,0,0.2)', background: 'rgba(191,255,0,0.08)',
                            color: '#BFFF00', fontSize: 10, fontWeight: 600, fontFamily: "'Lexend', sans-serif",
                            cursor: 'pointer', letterSpacing: 0.5, textTransform: 'uppercase',
                          }}
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(k.id)}
                        style={{
                          padding: '4px 8px', borderRadius: 6,
                          border: '1px solid rgba(255,68,68,0.15)', background: 'rgba(255,68,68,0.05)',
                          color: 'rgba(255,68,68,0.6)', fontSize: 12, fontFamily: "'Lexend', sans-serif",
                          cursor: 'pointer',
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 12 }}>
                    <span>{k.provider}</span>
                    <span>{k.model}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 9 }}>{k.api_key_masked}</span>
                  </div>
                </div>
              ))}

              {/* Status message */}
              {status && (
                <div style={{
                  padding: '10px 14px', borderRadius: 8, marginBottom: 12,
                  background: status.type === 'success' ? 'rgba(191,255,0,0.08)' : 'rgba(255,68,68,0.1)',
                  border: `1px solid ${status.type === 'success' ? 'rgba(191,255,0,0.2)' : 'rgba(255,68,68,0.2)'}`,
                  color: status.type === 'success' ? '#BFFF00' : '#ff6b6b',
                  fontSize: 11,
                }}>
                  {status.message}
                </div>
              )}

              {/* Add new key form */}
              {showAdd ? (
                <div style={{ padding: '16px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
                    Add New Key
                  </div>

                  {/* Name */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g. "Groq Free Tier"' style={inputStyle} />
                  </div>

                  {/* Provider */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Provider</label>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {PROVIDERS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleProviderChange(p.id)}
                          style={{
                            padding: '5px 10px', borderRadius: 6,
                            border: provider === p.id ? '1px solid rgba(191,255,0,0.3)' : '1px solid rgba(255,255,255,0.08)',
                            background: provider === p.id ? 'rgba(191,255,0,0.1)' : 'rgba(255,255,255,0.04)',
                            color: provider === p.id ? '#BFFF00' : 'rgba(255,255,255,0.5)',
                            fontSize: 10, fontWeight: 600, fontFamily: "'Lexend', sans-serif", cursor: 'pointer',
                          }}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* API Key */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>API Key</label>
                    <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Enter API key" style={inputStyle} />
                  </div>

                  {/* Model */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Model</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model name" style={inputStyle} />
                  </div>

                  {/* Base URL */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Base URL</label>
                    <input type="text" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://api.example.com/v1" style={inputStyle} />
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={handleAdd}
                      disabled={saving || !name.trim() || !apiKey.trim()}
                      style={{
                        flex: 1, padding: '10px 0',
                        background: saving || !name.trim() || !apiKey.trim() ? 'rgba(191,255,0,0.3)' : '#BFFF00',
                        color: '#000', border: 'none', borderRadius: 8,
                        fontSize: 12, fontWeight: 700, fontFamily: "'Lexend', sans-serif",
                        cursor: saving || !name.trim() || !apiKey.trim() ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {saving ? 'Saving...' : 'Add Key'}
                    </button>
                    <button
                      onClick={() => { setShowAdd(false); setStatus(null) }}
                      style={{
                        padding: '10px 16px', background: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8, fontSize: 12, fontFamily: "'Lexend', sans-serif", cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setShowAdd(true); setStatus(null) }}
                  style={{
                    width: '100%', padding: '12px 0', marginTop: 4,
                    background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.12)',
                    borderRadius: 10, color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600,
                    fontFamily: "'Lexend', sans-serif", cursor: 'pointer', letterSpacing: 0.5,
                  }}
                >
                  + Add API Key
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
