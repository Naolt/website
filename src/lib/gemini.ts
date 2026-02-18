import { callAI } from './ai'

interface TemplateInfo {
  id: string
  name: string
  category: string
  fields: { key: string; label: string; type: string; placeholder?: string }[]
}

interface GenerateResult {
  templateId: string
  content: Record<string, string>
}

export async function generatePostContent(
  topic: string,
  templates: TemplateInfo[]
): Promise<GenerateResult> {
  const templateDescriptions = templates
    .map(
      (t) =>
        `- ID: "${t.id}" | Name: "${t.name}" | Category: ${t.category}\n  Fields: ${t.fields.map((f) => `${f.key} (${f.label}${f.placeholder ? `, e.g. "${f.placeholder}"` : ''})`).join(', ')}`
    )
    .join('\n')

  const systemPrompt = `You are a social media content strategist for Aurora Solutions, a tech agency based in Addis Ababa that offers web development, mobile apps, branding, and marketing services.

Your task: Given a topic, pick the best template and generate compelling content for an Instagram post (1080x1080).

AVAILABLE TEMPLATES:
${templateDescriptions}

BRAND VOICE:
- Professional but approachable
- Confident, not arrogant
- Data-driven when possible
- Use short, punchy lines
- For multi-line fields (tips, features, points), use \\n to separate items
- Keep text concise — this is for a visual post, not a blog

CAROUSELS:
- Templates with IDs starting with "carousel-" are multi-slide carousels (swipeable Instagram posts)
- Choose a carousel when the topic naturally fits multiple slides (e.g. tips list, service breakdown, client story, before/after)
- For carousel fields with multiple items (tips, problems, solutions), use \\n to separate each item

RULES:
1. Pick the single best template for the given topic — consider carousels for topics that benefit from multiple slides
2. Generate content for ALL fields of that template
3. Match the tone and length to the template type (e.g. tips should be short actionable items, quotes should be memorable)
4. Always keep "Aurora Solutions" as the brand name unless the topic suggests otherwise
5. Return ONLY valid JSON, no markdown fences, no explanation

OUTPUT FORMAT (strict JSON):
{"templateId": "the-template-id", "content": {"fieldKey1": "value1", "fieldKey2": "value2"}}`

  const { message } = await callAI(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `TOPIC: ${topic}` },
    ],
    { temperature: 0.7, jsonMode: true }
  )

  const text = (message.content || '').trim()

  // Strip markdown fences if present
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
  const parsed = JSON.parse(cleaned) as GenerateResult

  if (!parsed.templateId || !parsed.content) {
    throw new Error('Invalid response structure from AI')
  }

  return parsed
}

export interface BatchPost {
  day: string
  templateId: string
  content: Record<string, string>
  caption: string
}

export async function generateBatchContent(
  theme: string,
  templates: TemplateInfo[]
): Promise<BatchPost[]> {
  const templateDescriptions = templates
    .map(
      (t) =>
        `- ID: "${t.id}" | Name: "${t.name}" | Category: ${t.category}\n  Fields: ${t.fields.map((f) => `${f.key} (${f.label})`).join(', ')}`
    )
    .join('\n')

  const systemPrompt = `You are a social media content strategist for Aurora Solutions, a tech agency based in Addis Ababa that offers web development, mobile apps, branding, and marketing services.

Your task: Given a weekly theme, plan 5 diverse Instagram posts — one for each weekday (Monday-Friday). Use a VARIETY of different templates for a balanced content mix.

AVAILABLE TEMPLATES:
${templateDescriptions}

BRAND VOICE:
- Professional but approachable
- Confident, not arrogant
- Data-driven when possible
- Use short, punchy lines
- For multi-line fields (tips, features, points), use \\n to separate items

RULES:
1. Create exactly 5 posts, one per weekday
2. Use at least 3 different template types across the week
3. Mix content types: educational, social proof, promotional, inspirational
4. Generate content for ALL fields of each chosen template
5. Include a short Instagram caption for each post (2-3 lines + hashtags)
6. Return ONLY valid JSON, no markdown fences

OUTPUT FORMAT (strict JSON):
{"posts": [{"day": "Monday", "templateId": "the-id", "content": {"field1": "value1"}, "caption": "Instagram caption..."}, ...]}`

  const { message } = await callAI(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `WEEKLY THEME: ${theme}` },
    ],
    { temperature: 0.8, jsonMode: true }
  )

  const text = (message.content || '').trim()
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
  const parsed = JSON.parse(cleaned)

  if (!parsed.posts || !Array.isArray(parsed.posts)) {
    throw new Error('Invalid batch response structure from AI')
  }

  return parsed.posts as BatchPost[]
}
