import { NextRequest, NextResponse } from 'next/server'
import { getApiKeys, createApiKey, deleteApiKey, activateApiKey } from '@/lib/db/settings'

function maskKey(key: string): string {
  if (key.length <= 8) return '********'
  return key.slice(0, 4) + '****' + key.slice(-4)
}

// GET — list all API keys (keys masked)
export async function GET() {
  try {
    const keys = await getApiKeys()
    return NextResponse.json({
      keys: keys.map((k) => ({
        id: k.id,
        name: k.name,
        provider: k.provider,
        model: k.model,
        base_url: k.base_url,
        is_active: k.is_active,
        api_key_masked: maskKey(k.api_key),
        created_at: k.created_at,
      })),
    })
  } catch {
    return NextResponse.json({ keys: [] })
  }
}

// POST — create a new API key
export async function POST(request: NextRequest) {
  try {
    const { name, provider, apiKey, model, baseUrl } = await request.json()

    if (!name || !apiKey) {
      return NextResponse.json({ error: 'Name and API key are required' }, { status: 400 })
    }

    const key = await createApiKey({
      name,
      provider: provider || 'groq',
      api_key: apiKey,
      model: model || 'llama-3.3-70b-versatile',
      base_url: baseUrl || 'https://api.groq.com/openai/v1',
    })

    return NextResponse.json({ id: key.id })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create key' },
      { status: 500 }
    )
  }
}

// PUT — activate a key or delete a key
export async function PUT(request: NextRequest) {
  try {
    const { action, id } = await request.json()

    if (action === 'activate' && id) {
      await activateApiKey(id)
      return NextResponse.json({ success: true })
    }

    if (action === 'delete' && id) {
      await deleteApiKey(id)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Action failed' },
      { status: 500 }
    )
  }
}
