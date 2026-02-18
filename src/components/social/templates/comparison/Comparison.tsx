import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function ComparisonCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    leftLabel: 'Without Aurora',
    leftPoints: 'Slow, outdated website\nInconsistent branding\nNo mobile experience\nLost leads and revenue',
    rightLabel: 'With Aurora',
    rightPoints: 'Fast, modern platform\nCohesive brand identity\nMobile-first design\nConversions that scale',
    brandName: 'Aurora Solutions',
    ...data,
  }
  const leftList = d.leftPoints.split('\n').filter(Boolean)
  const rightList = d.rightPoints.split('\n').filter(Boolean)

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: COLORS.black,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Left side */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '50%',
          background: '#070707',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 72px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 6,
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 600,
            marginBottom: 48,
          }}
        >
          {d.leftLabel}
        </div>
        {leftList.map((point, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 20,
              marginBottom: 36,
              fontSize: 26,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            <span style={{ color: '#ff4444', fontWeight: 700, fontSize: 28, flexShrink: 0 }}>&times;</span>
            {point}
          </div>
        ))}
      </div>
      {/* Right side */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 72px',
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 6,
            textTransform: 'uppercase' as const,
            color: brand.primaryColor,
            fontWeight: 600,
            marginBottom: 48,
          }}
        >
          {d.rightLabel}
        </div>
        {rightList.map((point, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 20,
              marginBottom: 36,
              fontSize: 26,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <span style={{ color: brand.primaryColor, fontWeight: 700, fontSize: 28, flexShrink: 0 }}>&check;</span>
            {point}
          </div>
        ))}
      </div>
      {/* VS badge */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: brand.primaryColor,
          color: COLORS.black,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 2,
          padding: '16px 24px',
          borderRadius: 12,
          zIndex: 2,
          textTransform: 'uppercase' as const,
        }}
      >
        VS
      </div>
      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 88,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: 4,
            textTransform: 'uppercase' as const,
          }}
        >
          {d.brandName} &mdash; aurorasolve.com
        </span>
      </div>
    </div>
  )
}

export const comparison: TemplateDefinition = {
  id: 'comparison',
  name: 'Comparison / Before-After',
  category: 'comparison',
  component: ComparisonCard,
  defaults: {
    leftLabel: 'Without Aurora',
    leftPoints: 'Slow, outdated website\nInconsistent branding\nNo mobile experience\nLost leads and revenue',
    rightLabel: 'With Aurora',
    rightPoints: 'Fast, modern platform\nCohesive brand identity\nMobile-first design\nConversions that scale',
    brandName: 'Aurora Solutions',
  },
  fields: [
    { key: 'leftLabel', label: 'Left Label', type: 'text', placeholder: 'Without Aurora' },
    { key: 'leftPoints', label: 'Left Points (one per line)', type: 'textarea', placeholder: 'Slow, outdated website...' },
    { key: 'rightLabel', label: 'Right Label', type: 'text', placeholder: 'With Aurora' },
    { key: 'rightPoints', label: 'Right Points (one per line)', type: 'textarea', placeholder: 'Fast, modern platform...' },
    { key: 'brandName', label: 'Brand Name', type: 'text', placeholder: 'Aurora Solutions' },
  ],
}
