import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateBatchContent } from '@/lib/gemini'

const requestSchema = z.object({
  theme: z.string().min(1).max(500),
  templates: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      category: z.string(),
      fields: z.array(
        z.object({
          key: z.string(),
          label: z.string(),
          type: z.string(),
          placeholder: z.string().optional(),
        })
      ),
    })
  ),
})

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

    const { theme, templates } = validationResult.data
    const posts = await generateBatchContent(theme, templates)

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Batch generation failed:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate batch content' },
      { status: 500 }
    )
  }
}
