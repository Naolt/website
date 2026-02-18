import type { AnyTemplate, TemplateCategory } from './types'

// ── Import every template definition (one line per template) ──
import { brandStatement } from './brand/BrandStatement'
import { brandMinimal } from './brand/BrandMinimal'
import { brandSplit } from './brand/BrandSplit'
import { serviceHighlight } from './service/ServiceHighlight'
import { serviceCards } from './service/ServiceCards'
import { serviceBold } from './service/ServiceBold'
import { statsProof } from './stats/StatsProof'
import { statsGrid } from './stats/StatsGrid'
import { statsBanner } from './stats/StatsBanner'
import { testimonial } from './testimonial/Testimonial'
import { testimonialDark } from './testimonial/TestimonialDark'
import { testimonialCard } from './testimonial/TestimonialCard'
import { tipsNumbered } from './tips/Numbered'
import { tipsMagazine } from './tips/Magazine'
import { tipsGrid } from './tips/Grid'
import { tipsWatermark } from './tips/Watermark'
import { ctaPromo } from './cta/CTAPromo'
import { ctaUrgent } from './cta/CTAUrgent'
import { ctaClean } from './cta/CTAClean'
import { comparison } from './comparison/Comparison'
import { comparisonStacked } from './comparison/ComparisonStacked'
import { comparisonCards } from './comparison/ComparisonCards'
import { minimalQuote } from './quote/MinimalQuote'
import { quoteBold } from './quote/QuoteBold'
import { quoteStripe } from './quote/QuoteStripe'

// ── Import carousels ──
import { tipsCarousel } from './carousel/TipsCarousel'
import { serviceCarousel } from './carousel/ServiceCarousel'
import { testimonialCarousel } from './carousel/TestimonialCarousel'
import { comparisonCarousel } from './carousel/ComparisonCarousel'

// ── Master list (order = display order in the picker) ──
export const ALL_TEMPLATES: AnyTemplate[] = [
  brandStatement,
  brandMinimal,
  brandSplit,
  serviceHighlight,
  serviceCards,
  serviceBold,
  statsProof,
  statsGrid,
  statsBanner,
  testimonial,
  testimonialDark,
  testimonialCard,
  tipsNumbered,
  tipsMagazine,
  tipsGrid,
  tipsWatermark,
  ctaPromo,
  ctaUrgent,
  ctaClean,
  comparison,
  comparisonStacked,
  comparisonCards,
  minimalQuote,
  quoteBold,
  quoteStripe,
  // Carousels
  tipsCarousel,
  serviceCarousel,
  testimonialCarousel,
  comparisonCarousel,
]

// ── Lookup by id ──
export const TEMPLATE_BY_ID: Record<string, AnyTemplate> = Object.fromEntries(
  ALL_TEMPLATES.map((t) => [t.id, t])
)

// ── Grouped by category (preserves order within each group) ──
export function getTemplatesByCategory(): { category: TemplateCategory; templates: AnyTemplate[] }[] {
  const seen = new Map<TemplateCategory, AnyTemplate[]>()
  for (const t of ALL_TEMPLATES) {
    if (!seen.has(t.category)) seen.set(t.category, [])
    seen.get(t.category)!.push(t)
  }
  return Array.from(seen.entries()).map(([category, templates]) => ({ category, templates }))
}
