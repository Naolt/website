import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function ComparisonStackedCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    beforeLabel: 'Without Us',
    afterLabel: 'With Aurora',
    before1: 'Slow, outdated website',
    before2: 'No mobile optimization',
    before3: 'Zero organic traffic',
    after1: 'Fast, modern platform',
    after2: 'Mobile-first design',
    after3: 'SEO-driven growth',
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
      }}
    >
      {/* Top half - Before (red-tinted) */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(180deg, rgba(255,60,60,0.12) 0%, rgba(255,60,60,0.04) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 100px',
          borderBottom: '2px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
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
              gap: 20,
              marginBottom: 24,
              fontSize: 30,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            <span style={{ color: '#ff4444', fontWeight: 700, fontSize: 32, flexShrink: 0 }}>&times;</span>
            {item}
          </div>
        ))}
      </div>
      {/* Divider */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: COLORS.black,
          border: `2px solid rgba(255,255,255,0.1)`,
          borderRadius: 12,
          padding: '12px 32px',
          zIndex: 2,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        VS
      </div>
      {/* Bottom half - After (primary-tinted) */}
      <div
        style={{
          flex: 1,
          background: `linear-gradient(0deg, rgba(${hexToRgb(brand.primaryColor)},0.12) 0%, rgba(${hexToRgb(brand.primaryColor)},0.04) 100%)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 100px',
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
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
              gap: 20,
              marginBottom: 24,
              fontSize: 30,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            <span style={{ color: brand.primaryColor, fontWeight: 700, fontSize: 32, flexShrink: 0 }}>&check;</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Convert hex colour to comma-separated r,g,b for use in rgba() */
function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `${r},${g},${b}`
}

export const comparisonStacked: TemplateDefinition = {
  id: 'comparison-stacked',
  name: 'Comparison Stacked',
  category: 'comparison',
  component: ComparisonStackedCard,
  defaults: {
    beforeLabel: 'Without Us',
    afterLabel: 'With Aurora',
    before1: 'Slow, outdated website',
    before2: 'No mobile optimization',
    before3: 'Zero organic traffic',
    after1: 'Fast, modern platform',
    after2: 'Mobile-first design',
    after3: 'SEO-driven growth',
  },
  fields: [
    { key: 'beforeLabel', label: 'Before Label', type: 'text', placeholder: 'Without Us' },
    { key: 'afterLabel', label: 'After Label', type: 'text', placeholder: 'With Aurora' },
    { key: 'before1', label: 'Before Point 1', type: 'text', placeholder: 'Slow, outdated website' },
    { key: 'before2', label: 'Before Point 2', type: 'text', placeholder: 'No mobile optimization' },
    { key: 'before3', label: 'Before Point 3', type: 'text', placeholder: 'Zero organic traffic' },
    { key: 'after1', label: 'After Point 1', type: 'text', placeholder: 'Fast, modern platform' },
    { key: 'after2', label: 'After Point 2', type: 'text', placeholder: 'Mobile-first design' },
    { key: 'after3', label: 'After Point 3', type: 'text', placeholder: 'SEO-driven growth' },
  ],
}
