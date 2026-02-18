import { getAIConfig } from './db/settings'

interface AIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string | null
  tool_calls?: { id: string; type: 'function'; function: { name: string; arguments: string } }[]
  tool_call_id?: string
}

interface ToolDef {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: Record<string, unknown>
  }
}

interface CallAIOptions {
  tools?: ToolDef[]
  toolChoice?: 'auto' | 'none'
  temperature?: number
  jsonMode?: boolean
}

interface AIResponse {
  message: {
    content: string | null
    tool_calls?: { id: string; type: 'function'; function: { name: string; arguments: string } }[]
  }
}

export type { AIMessage, ToolDef, CallAIOptions, AIResponse }

export async function callAI(
  messages: AIMessage[],
  options: CallAIOptions = {}
): Promise<AIResponse> {
  const config = await getAIConfig()

  if (!config.apiKey) {
    throw new Error('AI API key not configured. Go to Settings to add one.')
  }

  const body: Record<string, unknown> = {
    model: config.model,
    messages,
    temperature: options.temperature ?? 0.7,
  }

  if (options.tools) {
    body.tools = options.tools
    body.tool_choice = options.toolChoice ?? 'auto'
  }

  if (options.jsonMode) {
    body.response_format = { type: 'json_object' }
  }

  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`AI API error (${res.status}): ${err}`)
  }

  const data = await res.json()
  const choice = data.choices[0]

  return {
    message: {
      content: choice.message.content,
      tool_calls: choice.message.tool_calls,
    },
  }
}
