import type { TemplateDefinition } from '../types'
import { COLORS, FONT_FAMILY } from '../types'
import { useBrand } from '../../BrandContext'

function BrandStatementCard({ data }: { data: Record<string, string> }) {
  const brand = useBrand()
  const d = {
    headline: 'Premium\nEngineering.',
    highlightLine: 'Fraction of\nthe Cost.',
    subtitle: 'Web. Mobile. Branding. Marketing.\nOne team. Global standards.',
    eyebrow: 'Aurora Solutions',
    locationLeft: 'aurorasolve.com',
    locationRight: 'Addis Ababa',
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
        justifyContent: 'flex-end',
        padding: 112,
        fontFamily: brand.fontFamily,
      }}
    >
      {/* Orb */}
      <div
        style={{
          position: 'absolute',
          top: -240,
          right: -240,
          width: 840,
          height: 840,
          background:
            'radial-gradient(circle, rgba(191,255,0,0.18) 0%, rgba(191,255,0,0.04) 40%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '108px 108px',
        }}
      />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase' as const,
            color: brand.primaryColor,
            fontWeight: 600,
            marginBottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <span
            style={{
              width: 48,
              height: 3,
              background: brand.primaryColor,
              display: 'inline-block',
            }}
          />
          {d.eyebrow}
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            color: COLORS.white,
            letterSpacing: -2,
            whiteSpace: 'pre-line',
          }}
        >
          {d.headline}
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            color: brand.primaryColor,
            letterSpacing: -2,
            whiteSpace: 'pre-line',
          }}
        >
          {d.highlightLine}
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.45)',
            marginTop: 40,
            lineHeight: 1.6,
            fontWeight: 300,
            whiteSpace: 'pre-line',
          }}
        >
          {d.subtitle}
        </div>
      </div>
      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 112px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 20,
            letterSpacing: 4,
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 500,
          }}
        >
          {d.locationLeft}
        </span>
        <div
          style={{
            width: 12,
            height: 12,
            background: brand.primaryColor,
            borderRadius: '50%',
          }}
        />
        <span
          style={{
            fontSize: 20,
            letterSpacing: 4,
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 500,
          }}
        >
          {d.locationRight}
        </span>
      </div>
    </div>
  )
}

export const brandStatement: TemplateDefinition = {
  id: 'brand-statement',
  name: 'Brand Statement',
  category: 'brand',
  component: BrandStatementCard,
  defaults: {
    headline: 'Premium\nEngineering.',
    highlightLine: 'Fraction of\nthe Cost.',
    subtitle: 'Web. Mobile. Branding. Marketing.\nOne team. Global standards.',
    eyebrow: 'Aurora Solutions',
    locationLeft: 'aurorasolve.com',
    locationRight: 'Addis Ababa',
  },
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'Aurora Solutions' },
    { key: 'headline', label: 'Headline', type: 'textarea', placeholder: 'Premium\nEngineering.' },
    { key: 'highlightLine', label: 'Highlight Line', type: 'textarea', placeholder: 'Fraction of\nthe Cost.' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Web. Mobile. Branding...' },
    { key: 'locationLeft', label: 'Footer Left', type: 'text', placeholder: 'aurorasolve.com' },
    { key: 'locationRight', label: 'Footer Right', type: 'text', placeholder: 'Addis Ababa' },
  ],
}
