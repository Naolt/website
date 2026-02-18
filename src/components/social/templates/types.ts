import type { FC } from 'react'

// ── Field definition for the editor sidebar ──
export interface FieldDef {
  key: string
  label: string
  type: 'text' | 'textarea'
  placeholder?: string
}

// ── Template categories (used for grouping in the picker) ──
export type TemplateCategory =
  | 'brand'
  | 'service'
  | 'stats'
  | 'testimonial'
  | 'tips'
  | 'cta'
  | 'comparison'
  | 'quote'
  | 'carousel'

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  brand: 'Brand',
  service: 'Service',
  stats: 'Stats',
  testimonial: 'Testimonial',
  tips: 'Tips / Value',
  cta: 'CTA',
  comparison: 'Comparison',
  quote: 'Quote',
  carousel: 'Carousels',
}

// ── Single-slide template ──
export interface TemplateDefinition {
  id: string
  name: string
  category: TemplateCategory
  type?: 'single'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<{ data: any }>
  defaults: Record<string, string>
  fields: FieldDef[]
}

// ── Carousel (multi-slide) template ──
export interface SlideDefinition {
  id: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<{ data: any }>
}

export interface CarouselDefinition {
  id: string
  name: string
  category: TemplateCategory
  type: 'carousel'
  slides: SlideDefinition[]
  defaults: Record<string, string>
  fields: FieldDef[]
}

export type AnyTemplate = TemplateDefinition | CarouselDefinition

export function isCarousel(t: AnyTemplate): t is CarouselDefinition {
  return t.type === 'carousel'
}

// ── Shared design tokens ──
export const COLORS = {
  primary: '#BFFF00',
  black: '#000000',
  white: '#FFFFFF',
} as const

export const FONT_FAMILY = "'Lexend', sans-serif"
export const SLIDE_SIZE = 1080

// ── Brand overrides (per-post customization) ──
export interface BrandOverrides {
  primaryColor: string
  fontFamily: string
  brandName: string
}

export const DEFAULT_BRAND: BrandOverrides = {
  primaryColor: COLORS.primary,
  fontFamily: FONT_FAMILY,
  brandName: 'Aurora Solutions',
}
