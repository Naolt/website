import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function QuoteStripeCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    quote: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    attribution: 'Chinese Proverb',
    context: 'On Building Your Online Presence',
    ...data,
  }

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: COLORS.black,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 120px 120px 160px',
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Vertical stripe */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 100,
          bottom: 120,
          width: 12,
          background: brand.primaryColor,
          borderRadius: 6,
        }}
      />
      {/* Context / topic label */}
      {d.context && (
        <div
          style={{
            fontSize: 18,
            letterSpacing: 5,
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 600,
            marginBottom: 48,
          }}
        >
          {d.context}
        </div>
      )}
      {/* Quote text */}
      <div
        style={{
          fontSize: 54,
          fontWeight: 600,
          color: COLORS.white,
          lineHeight: 1.45,
          letterSpacing: -0.5,
          marginBottom: 64,
          maxWidth: 760,
        }}
      >
        &ldquo;{d.quote}&rdquo;
      </div>
      {/* Attribution */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: brand.primaryColor,
          letterSpacing: 3,
          textTransform: 'uppercase' as const,
        }}
      >
        &mdash; {d.attribution}
      </div>
    </div>
  )
}

export const quoteStripe: TemplateDefinition = {
  id: 'quote-stripe',
  name: 'Quote Stripe',
  category: 'quote',
  component: QuoteStripeCard,
  defaults: {
    quote: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    attribution: 'Chinese Proverb',
    context: 'On Building Your Online Presence',
  },
  fields: [
    { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'The best time to plant a tree...' },
    { key: 'attribution', label: 'Attribution', type: 'text', placeholder: 'Chinese Proverb' },
    { key: 'context', label: 'Context / Topic', type: 'text', placeholder: 'On Building Your Online Presence' },
  ],
}
