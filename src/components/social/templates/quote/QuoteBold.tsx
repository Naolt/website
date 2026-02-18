import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function QuoteBoldCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    quote: 'Design is not just what it looks like. Design is how it works.',
    attribution: 'Steve Jobs',
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
        alignItems: 'center',
        textAlign: 'center' as const,
        padding: 120,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Opening quotation mark watermark */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 60,
          fontSize: 500,
          fontWeight: 900,
          color: COLORS.white,
          opacity: 0.04,
          lineHeight: 1,
          userSelect: 'none' as const,
          fontFamily: 'Georgia, serif',
        }}
      >
        &ldquo;
      </div>
      {/* Closing quotation mark watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          right: 60,
          fontSize: 500,
          fontWeight: 900,
          color: COLORS.white,
          opacity: 0.04,
          lineHeight: 1,
          userSelect: 'none' as const,
          fontFamily: 'Georgia, serif',
        }}
      >
        &rdquo;
      </div>
      {/* Quote text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.white,
            lineHeight: 1.4,
            letterSpacing: -0.5,
            marginBottom: 56,
            maxWidth: 800,
          }}
        >
          &ldquo;{d.quote}&rdquo;
        </div>
        {/* Divider line */}
        <div
          style={{
            width: 60,
            height: 4,
            background: brand.primaryColor,
            margin: '0 auto 32px',
            borderRadius: 2,
          }}
        />
        {/* Attribution */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: brand.primaryColor,
            letterSpacing: 4,
            textTransform: 'uppercase' as const,
          }}
        >
          &mdash; {d.attribution}
        </div>
      </div>
    </div>
  )
}

export const quoteBold: TemplateDefinition = {
  id: 'quote-bold',
  name: 'Quote Bold',
  category: 'quote',
  component: QuoteBoldCard,
  defaults: {
    quote: 'Design is not just what it looks like. Design is how it works.',
    attribution: 'Steve Jobs',
  },
  fields: [
    { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Design is not just what it looks like...' },
    { key: 'attribution', label: 'Attribution', type: 'text', placeholder: 'Steve Jobs' },
  ],
}
