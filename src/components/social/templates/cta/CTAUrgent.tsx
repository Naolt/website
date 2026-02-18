import type { TemplateDefinition } from '../types'
import { COLORS } from '../types'
import { useBrand } from '../../BrandContext'

function CTAUrgentCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    headline: 'Your Competitors\nAre Already',
    highlight: 'Online.',
    subtext: 'Are you?',
    buttonText: 'Start Now →',
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
        padding: 112,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Diagonal energy lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          opacity: 0.04,
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            ${COLORS.white} 40px,
            ${COLORS.white} 42px
          )`,
        }}
      />
      {/* Large arrow watermark */}
      <div
        style={{
          position: 'absolute',
          right: -40,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 600,
          fontWeight: 900,
          color: brand.primaryColor,
          opacity: 0.08,
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        &rarr;
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Headline */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: COLORS.white,
            lineHeight: 1.05,
            letterSpacing: -2,
            whiteSpace: 'pre-line',
            marginBottom: 8,
          }}
        >
          {d.headline}
        </div>
        {/* Highlight word */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: brand.primaryColor,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 48,
          }}
        >
          {d.highlight}
        </div>
        {/* Subtext */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 64,
            letterSpacing: 2,
          }}
        >
          {d.subtext}
        </div>
        {/* Button */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            background: brand.primaryColor,
            color: COLORS.black,
            padding: '32px 64px',
            borderRadius: 16,
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: 0.6,
          }}
        >
          {d.buttonText}
        </div>
      </div>
    </div>
  )
}

export const ctaUrgent: TemplateDefinition = {
  id: 'cta-urgent',
  name: 'CTA Urgent',
  category: 'cta',
  component: CTAUrgentCard,
  defaults: {
    headline: 'Your Competitors\nAre Already',
    highlight: 'Online.',
    subtext: 'Are you?',
    buttonText: 'Start Now →',
  },
  fields: [
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'Your Competitors\nAre Already' },
    { key: 'highlight', label: 'Highlight', type: 'text', placeholder: 'Online.' },
    { key: 'subtext', label: 'Subtext', type: 'text', placeholder: 'Are you?' },
    { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Start Now →' },
  ],
}
