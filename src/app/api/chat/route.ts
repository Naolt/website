import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { callAI, type AIMessage } from '@/lib/ai'

// ── Types ──

export interface ChatAction {
  type: 'select_template' | 'fill_content' | 'plan_week'
  templateId?: string
  content?: Record<string, string>
  posts?: { day: string; templateId: string; content: Record<string, string>; caption: string }[]
}

// ── Tool definitions (OpenAI-compatible format) ──

const tools = [
  {
    type: 'function' as const,
    function: {
      name: 'select_template',
      description: 'Select a template to use for the current post. Call this when the user wants a specific template type.',
      parameters: {
        type: 'object',
        properties: {
          templateId: { type: 'string', description: 'The template ID to select' },
        },
        required: ['templateId'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'fill_content',
      description: 'Fill in content fields for a template. Always call select_template first, then fill_content with the generated text.',
      parameters: {
        type: 'object',
        properties: {
          templateId: { type: 'string', description: 'The template ID to fill content for' },
          content: {
            type: 'object',
            description: 'Key-value pairs mapping field keys to their content text',
            additionalProperties: { type: 'string' },
          },
        },
        required: ['templateId', 'content'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'plan_week',
      description: 'Generate a week of 5 diverse Instagram posts (Monday-Friday). Use this when the user wants a content plan or weekly schedule.',
      parameters: {
        type: 'object',
        properties: {
          posts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                day: { type: 'string' },
                templateId: { type: 'string' },
                content: { type: 'object', additionalProperties: { type: 'string' } },
                caption: { type: 'string' },
              },
              required: ['day', 'templateId', 'content', 'caption'],
            },
          },
        },
        required: ['posts'],
      },
    },
  },
]

// ── Request validation ──

const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })),
  templates: z.array(z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    fields: z.array(z.object({
      key: z.string(),
      label: z.string(),
      type: z.string(),
      placeholder: z.string().optional(),
    })),
  })),
  currentTemplateId: z.string().optional(),
})

// ── System prompt builder ──

function buildSystemPrompt(
  templates: { id: string; name: string; category: string; fields: { key: string; label: string; type: string; placeholder?: string }[] }[],
  currentTemplateId?: string,
): string {
  const templateDescriptions = templates
    .map(
      (t) =>
        `- ID: "${t.id}" | Name: "${t.name}" | Category: ${t.category}\n  Fields: ${t.fields.map((f) => `${f.key} (${f.label}${f.placeholder ? `, e.g. "${f.placeholder}"` : ''})`).join(', ')}`
    )
    .join('\n')

  return `You are an AI social media content strategist for Aurora Solutions, a tech agency based in Addis Ababa that offers web development, mobile apps, branding, and marketing services.

You help users create Instagram posts (1080x1080) by selecting templates and generating compelling content. You have access to tools to directly control the editor.

AVAILABLE TEMPLATES:
${templateDescriptions}

${currentTemplateId ? `Currently selected template: "${currentTemplateId}"` : 'No template currently selected.'}

BRAND VOICE:
- Professional but approachable
- Confident, not arrogant
- Data-driven when possible
- Use short, punchy lines
- For multi-line fields (tips, features, points), use \\n to separate items
- Keep text concise — this is for a visual post, not a blog

CAROUSELS:
- Templates with IDs starting with "carousel-" are multi-slide carousels (swipeable Instagram posts)
- Choose a carousel when the topic naturally fits multiple slides

BEHAVIOR:
1. When the user asks to create a post, use select_template then fill_content tools to update the editor directly
2. When asked to tweak or change specific content, use fill_content with just the changed fields
3. When asked to plan a week of content, use plan_week tool
4. Keep your chat responses short and helpful — the user can see the preview updating live
5. If the user asks a question about strategy, answer conversationally without using tools
6. Always generate content for ALL fields of the chosen template when creating new content`
}

// ── Tool-calling loop using callAI ──

async function chatWithTools(messages: AIMessage[]): Promise<{ text: string; toolCalls: { name: string; args: Record<string, unknown> }[] }> {
  const allToolCalls: { name: string; args: Record<string, unknown> }[] = []
  let currentMessages = [...messages]

  // Tool-calling loop (max 3 iterations to prevent infinite loops)
  for (let i = 0; i < 3; i++) {
    const { message } = await callAI(currentMessages, { tools, toolChoice: 'auto' })

    // If no tool calls, we're done — return the text
    if (!message.tool_calls || message.tool_calls.length === 0) {
      return { text: message.content || '', toolCalls: allToolCalls }
    }

    // Process tool calls
    currentMessages.push({
      role: 'assistant',
      content: message.content,
      tool_calls: message.tool_calls,
    })

    for (const toolCall of message.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments)
      allToolCalls.push({ name: toolCall.function.name, args })

      // Add tool result to continue the conversation
      currentMessages.push({
        role: 'tool',
        content: JSON.stringify({ success: true, action: toolCall.function.name }),
        tool_call_id: toolCall.id,
      })
    }
  }

  // If we hit max iterations, return what we have
  return { text: 'Done! Check the preview.', toolCalls: allToolCalls }
}

// ── Route handler ──

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validationResult = requestSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { messages, templates, currentTemplateId } = validationResult.data

    const aiMessages: AIMessage[] = [
      { role: 'system', content: buildSystemPrompt(templates, currentTemplateId) },
      ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ]

    const { text, toolCalls } = await chatWithTools(aiMessages)

    // Convert tool calls to client-side actions
    const actions: ChatAction[] = toolCalls.map((tc) => {
      switch (tc.name) {
        case 'select_template':
          return { type: 'select_template' as const, templateId: tc.args.templateId as string }
        case 'fill_content':
          return { type: 'fill_content' as const, templateId: tc.args.templateId as string, content: tc.args.content as Record<string, string> }
        case 'plan_week':
          return { type: 'plan_week' as const, posts: tc.args.posts as ChatAction['posts'] }
        default:
          return { type: 'select_template' as const }
      }
    })

    return NextResponse.json({ reply: text, actions })
  } catch (error) {
    console.error('Chat failed:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Chat failed' },
      { status: 500 }
    )
  }
}
