import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function ComparisonCardsCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    title: 'The Difference',
    beforeLabel: 'Before',
    afterLabel: 'After',
    before1: 'Template website',
    before2: 'Slow load times',
    before3: 'No conversions',
    after1: 'Custom design',
    after2: 'Sub-2s loads',
    after3: '40% more leads',
    ...data,
  }

  const beforeItems = [d.before1, d.before2, d.before3].filter(Boolean)
  const afterItems = [d.after1, d.after2, d.after3].filter(Boolean)

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: COLORS.black,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: brand.fontFamily,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.white,
          letterSpacing: -1,
          marginBottom: 64,
          textAlign: 'center' as const,
        }}
      >
        {d.title}
      </div>
      {/* Cards container */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {/* Before card */}
        <div
          style={{
            flex: 1,
            background: '#0a0a0a',
            borderRadius: 24,
            border: '2px solid rgba(255,68,68,0.35)',
            padding: '56px 48px',
            transform: 'rotate(-1.5deg)',
            maxWidth: 420,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 5,
              textTransform: 'uppercase' as const,
              color: '#ff4444',
              fontWeight: 600,
              marginBottom: 40,
            }}
          >
            {d.beforeLabel}
          </div>
          {beforeItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 28,
                fontSize: 26,
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              <span style={{ color: '#ff4444', fontWeight: 700, fontSize: 28, flexShrink: 0 }}>&times;</span>
              {item}
            </div>
          ))}
        </div>
        {/* After card */}
        <div
          style={{
            flex: 1,
            background: '#0a0a0a',
            borderRadius: 24,
            border: `2px solid ${brand.primaryColor}55`,
            padding: '56px 48px',
            transform: 'rotate(1.5deg)',
            maxWidth: 420,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 5,
              textTransform: 'uppercase' as const,
              color: brand.primaryColor,
              fontWeight: 600,
              marginBottom: 40,
            }}
          >
            {d.afterLabel}
          </div>
          {afterItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 28,
                fontSize: 26,
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <span style={{ color: brand.primaryColor, fontWeight: 700, fontSize: 28, flexShrink: 0 }}>&check;</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const comparisonCards: TemplateDefinition = {
  id: 'comparison-cards',
  name: 'Comparison Cards',
  category: 'comparison',
  component: ComparisonCardsCard,
  defaults: {
    title: 'The Difference',
    beforeLabel: 'Before',
    afterLabel: 'After',
    before1: 'Template website',
    before2: 'Slow load times',
    before3: 'No conversions',
    after1: 'Custom design',
    after2: 'Sub-2s loads',
    after3: '40% more leads',
  },
  fields: [
    { key: 'title', label: 'Title', type: 'text', placeholder: 'The Difference' },
    { key: 'beforeLabel', label: 'Before Label', type: 'text', placeholder: 'Before' },
    { key: 'afterLabel', label: 'After Label', type: 'text', placeholder: 'After' },
    { key: 'before1', label: 'Before Point 1', type: 'text', placeholder: 'Template website' },
    { key: 'before2', label: 'Before Point 2', type: 'text', placeholder: 'Slow load times' },
    { key: 'before3', label: 'Before Point 3', type: 'text', placeholder: 'No conversions' },
    { key: 'after1', label: 'After Point 1', type: 'text', placeholder: 'Custom design' },
    { key: 'after2', label: 'After Point 2', type: 'text', placeholder: 'Sub-2s loads' },
    { key: 'after3', label: 'After Point 3', type: 'text', placeholder: '40% more leads' },
  ],
}
