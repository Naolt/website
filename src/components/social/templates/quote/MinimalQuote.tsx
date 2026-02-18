import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function MinimalQuoteCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    textBefore: 'Your business deserves',
    highlight1: 'world-class',
    textMiddle: 'digital products, not a',
    highlight2: 'world-class',
    textAfter: 'invoice.',
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
        padding: 140,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Corner accents */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 80,
          width: 120,
          height: 120,
          borderTop: '3px solid rgba(191,255,0,0.3)',
          borderLeft: '3px solid rgba(191,255,0,0.3)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          right: 80,
          width: 120,
          height: 120,
          borderBottom: '3px solid rgba(191,255,0,0.3)',
          borderRight: '3px solid rgba(191,255,0,0.3)',
        }}
      />
      {/* Quote */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.45,
            letterSpacing: -0.6,
          }}
        >
          {d.textBefore}
          <br />
          <strong style={{ fontWeight: 700, color: brand.primaryColor }}>{d.highlight1}</strong>{' '}
          {d.textMiddle}
          <br />
          <strong style={{ fontWeight: 700, color: brand.primaryColor }}>{d.highlight2}</strong>{' '}
          {d.textAfter}
        </div>
      </div>
      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 88,
          left: 0,
          right: 0,
          textAlign: 'center' as const,
          fontSize: 20,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: 6,
          textTransform: 'uppercase' as const,
          zIndex: 1,
        }}
      >
        Aurora Solutions
      </div>
    </div>
  )
}

export const minimalQuote: TemplateDefinition = {
  id: 'minimal-quote',
  name: 'Minimal Quote',
  category: 'quote',
  component: MinimalQuoteCard,
  defaults: {
    textBefore: 'Your business deserves',
    highlight1: 'world-class',
    textMiddle: 'digital products, not a',
    highlight2: 'world-class',
    textAfter: 'invoice.',
  },
  fields: [
    { key: 'textBefore', label: 'Text Before', type: 'text', placeholder: 'Your business deserves' },
    { key: 'highlight1', label: 'Highlight 1', type: 'text', placeholder: 'world-class' },
    { key: 'textMiddle', label: 'Text Middle', type: 'text', placeholder: 'digital products, not a' },
    { key: 'highlight2', label: 'Highlight 2', type: 'text', placeholder: 'world-class' },
    { key: 'textAfter', label: 'Text After', type: 'text', placeholder: 'invoice.' },
  ],
}
